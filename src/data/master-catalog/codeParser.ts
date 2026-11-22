export interface ParsedCodeLine {
  lineNum: number;
  rawText: string;
  kind: 'header' | 'main' | 'declaration' | 'calculation' | 'condition' | 'loop' | 'print' | 'return' | 'other';
  detectedVars: { name: string; value: string; type: string }[];
  narration: string;
  memoryBoxImpact?: { name: string; value: string; color: string };
  outputContribution?: string;
}

/**
 * Safely evaluates C arithmetic expressions, constants, and variables from the simulated memory frame.
 */
function evalCExpression(expr: string, memoryState: Record<string, any>): any {
  if (!expr) return '';
  let cleaned = expr.trim();

  // Strip trailing C float / long literals: 96.72f, 100L, 50UL
  cleaned = cleaned.replace(/([0-9]+(?:\.[0-9]+)?)[fFlLuU]+\b/g, '$1');

  // Handle character literal: 'A' -> 65
  const charMatch = cleaned.match(/^'([^'\\]|\\.)'$/);
  if (charMatch) {
    const ch = charMatch[1];
    if (ch.startsWith('\\')) {
      if (ch === '\\n') return 10;
      if (ch === '\\0') return 0;
      if (ch === '\\t') return 9;
    }
    return ch.charCodeAt(0);
  }

  // Handle string literal: "Hello" -> Hello
  if (cleaned.startsWith('"') && cleaned.endsWith('"')) {
    return cleaned.slice(1, -1);
  }

  // Handle sizeof(...)
  cleaned = cleaned.replace(/sizeof\s*\(\s*float\s*\)/g, '4');
  cleaned = cleaned.replace(/sizeof\s*\(\s*double\s*\)/g, '8');
  cleaned = cleaned.replace(/sizeof\s*\(\s*int\s*\)/g, '4');
  cleaned = cleaned.replace(/sizeof\s*\(\s*char\s*\)/g, '1');
  cleaned = cleaned.replace(/sizeof\s*\(\s*size_t\s*\)/g, '4');
  cleaned = cleaned.replace(/sizeof\s*\(\s*short\s*\)/g, '2');
  cleaned = cleaned.replace(/sizeof\s*\(\s*long\s+long\s*\)/g, '8');
  cleaned = cleaned.replace(/sizeof\s*\(\s*long\s*\)/g, '4');
  cleaned = cleaned.replace(/sizeof\s*\(\s*([a-zA-Z0-9_]+)\s*\)/g, (match, v) => {
    if (memoryState[v] !== undefined && typeof memoryState[v] === 'number') {
      return String(memoryState[v]).includes('.') ? '4' : '4';
    }
    return '4';
  });

  // Handle type cast: (float)x -> x, (int)x -> x
  cleaned = cleaned.replace(/\((?:float|double|int|char|long|unsigned)\)\s*/g, '');

  // Substitute variables from memory state
  const tokens = cleaned.split(/([+\-*/%() \t])/);
  const resolved = tokens.map(tok => {
    const t = tok.trim();
    if (!t) return tok;
    if (memoryState[t] !== undefined) {
      const val = memoryState[t];
      return typeof val === 'number' ? String(val) : String(val).replace(/([0-9]+(?:\.[0-9]+)?)[fFlLuU]+\b/g, '$1');
    }
    return tok;
  }).join('');

  // Evaluate arithmetic if safe expression
  if (/^[0-9.+\-*/%() \t]+$/.test(resolved)) {
    try {
      // eslint-disable-next-line no-new-func
      const result = Function(`'use strict'; return (${resolved})`)();
      if (typeof result === 'number' && !isNaN(result)) {
        return Math.round(result * 1000000) / 1000000;
      }
    } catch {
      // fallback to original expression if eval fails
    }
  }

  // Check if it resolves directly to a stored variable
  if (memoryState[cleaned] !== undefined) {
    return memoryState[cleaned];
  }

  return cleaned;
}

/**
 * Formats a printf statement with real evaluated argument values.
 */
function formatCPrintf(codeLine: string, memoryState: Record<string, any>): string | undefined {
  const match = codeLine.match(/printf\s*\(\s*"([^"]*)"(?:\s*,\s*([\s\S]*?))?\s*\)\s*;/);
  if (!match) return undefined;

  let fmt = match[1];
  const argsRaw = match[2];

  // Unescape standard C escape sequences
  fmt = fmt.replace(/\\n/g, '\n').replace(/\\t/g, '\t').replace(/\\"/g, '"');

  if (!argsRaw) {
    return fmt.replace(/%%/g, '%');
  }

  // Split arguments cleanly respecting parentheses and nested function calls
  const args: string[] = [];
  let current = '';
  let parenDepth = 0;
  for (let i = 0; i < argsRaw.length; i++) {
    const ch = argsRaw[i];
    if (ch === '(') parenDepth++;
    else if (ch === ')') parenDepth--;
    else if (ch === ',' && parenDepth === 0) {
      args.push(current.trim());
      current = '';
      continue;
    }
    current += ch;
  }
  if (current.trim()) args.push(current.trim());

  let argIdx = 0;
  // Match %-flags-width.precision-type and %%
  const formatted = fmt.replace(/%(?:(\d+)?\.(\d+))?([fdiusclxX]|zu|lld|ld|lf)|%%/g, (spec, width, prec, type) => {
    if (spec === '%%') return '%';
    if (argIdx >= args.length) return spec;

    const rawArg = args[argIdx++];
    const val = evalCExpression(rawArg, memoryState);

    // Floating-point specifiers
    if (type === 'f' || type === 'lf') {
      const num = Number(val);
      if (!isNaN(num)) {
        const p = prec !== undefined ? parseInt(prec, 10) : 2;
        return num.toFixed(p);
      }
      return String(val);
    }

    // Integer specifiers
    if (['d', 'i', 'u', 'zu', 'ld', 'lld'].includes(type)) {
      const num = Number(val);
      if (!isNaN(num)) {
        return String(Math.floor(num));
      }
      return String(val);
    }

    // Character specifier
    if (type === 'c') {
      const num = Number(val);
      if (!isNaN(num)) {
        return String.fromCharCode(num);
      }
      return String(val).replace(/['"]/g, '');
    }

    // String specifier
    if (type === 's') {
      return String(val).replace(/^["']|["']$/g, '');
    }

    // Hex specifiers
    if (type === 'x') {
      const num = Number(val);
      return !isNaN(num) ? num.toString(16) : String(val);
    }
    if (type === 'X') {
      const num = Number(val);
      return !isNaN(num) ? num.toString(16).toUpperCase() : String(val);
    }

    return String(val).replace(/['"]/g, '');
  });

  return formatted;
}

export function parseCustomCCode(cCode: string): ParsedCodeLine[] {
  const lines = cCode.split('\n');
  const parsed: ParsedCodeLine[] = [];
  const memoryState: Record<string, any> = {};

  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    if (!trimmed) return;

    const lineNum = idx + 1;
    let kind: ParsedCodeLine['kind'] = 'other';
    let narration = 'The CPU executes this statement sequentially.';
    let memoryImpact: ParsedCodeLine['memoryBoxImpact'] = undefined;
    let outputContribution: string | undefined = undefined;
    const detectedVars: ParsedCodeLine['detectedVars'] = [];

    // 1. Header include
    if (trimmed.startsWith('#include')) {
      kind = 'header';
      narration = 'Preprocessor Directive: Loads standard C headers and symbol prototypes into translation unit.';
    }
    // 2. Preprocessor define
    else if (trimmed.startsWith('#define')) {
      kind = 'header';
      const defMatch = trimmed.match(/^#define\s+([A-Za-z_]\w*)\s+(.*)$/);
      if (defMatch) {
        const name = defMatch[1];
        const val = evalCExpression(defMatch[2], memoryState);
        memoryState[name] = val;
        narration = `Macro Definition: Replaces symbolic constant ${name} with value ${val} during preprocessing.`;
      }
    }
    // 3. Main entry
    else if (trimmed.includes('main(')) {
      kind = 'main';
      narration = 'Operating System Entry: The OS invokes main() and sets up the primary thread stack frame.';
    }
    // 4. Variable Declaration / Assignment: int x = 15; or float petrolRate = 96.72f, liters = 3.5f;
    else if (/^(?:const\s+)?(?:unsigned\s+|signed\s+|short\s+|long\s+)?(int|float|double|char|long|short|unsigned|size_t)\s+([\s\S]+);$/.test(trimmed)) {
      const match = trimmed.match(/^(?:const\s+)?(?:unsigned\s+|signed\s+|short\s+|long\s+)?(int|float|double|char|long|short|unsigned|size_t)\s+([\s\S]+);$/);
      if (match) {
        const type = match[1];
        const declarationsPart = match[2];
        kind = 'declaration';

        const parts = declarationsPart.split(',').map(s => s.trim()).filter(Boolean);
        const assignedVars: string[] = [];

        parts.forEach(part => {
          const eqIdx = part.indexOf('=');
          if (eqIdx !== -1) {
            const varName = part.substring(0, eqIdx).trim().replace(/^\*+/, '');
            const rawExpr = part.substring(eqIdx + 1).trim();
            const evaluatedVal = evalCExpression(rawExpr, memoryState);
            memoryState[varName] = evaluatedVal;
            const displayVal = typeof evaluatedVal === 'number' && type === 'float'
              ? evaluatedVal.toFixed(2)
              : String(evaluatedVal);

            detectedVars.push({ name: varName, value: displayVal, type });
            assignedVars.push(`${varName} = ${displayVal}`);
            memoryImpact = {
              name: varName,
              value: displayVal,
              color: 'bg-emerald-100 border-emerald-300 text-emerald-900 font-bold'
            };
          } else {
            const varName = part.trim().replace(/^\*+/, '');
            memoryState[varName] = 0;
            detectedVars.push({ name: varName, value: '0', type });
          }
        });

        narration = `Allocates stack memory for ${parts.length} variable(s): ${assignedVars.join(', ')}.`;
      }
    }
    // 5. Arithmetic / Re-assignment: total = a + b; or total = petrolRate * liters;
    else if (/^([a-zA-Z0-9_]+)\s*=\s*([^;]+);/.test(trimmed) && !trimmed.startsWith('return')) {
      const match = trimmed.match(/^([a-zA-Z0-9_]+)\s*=\s*([^;]+);/);
      if (match) {
        const varName = match[1];
        const expr = match[2].trim();
        kind = 'calculation';
        const evaluatedVal = evalCExpression(expr, memoryState);
        memoryState[varName] = evaluatedVal;
        const displayVal = typeof evaluatedVal === 'number' && String(evaluatedVal).includes('.')
          ? evaluatedVal.toFixed(2)
          : String(evaluatedVal);

        narration = `CPU Arithmetic Unit calculates: ${expr} and saves result directly into box "${varName}" (${displayVal}).`;
        memoryImpact = {
          name: varName,
          value: displayVal,
          color: 'bg-amber-100 border-amber-300 text-amber-900 font-bold'
        };
      }
    }
    // 6. Conditions: if (x > 10)
    else if (trimmed.startsWith('if') || trimmed.startsWith('else if')) {
      kind = 'condition';
      narration = 'Branch Decision: CPU compares variables in registers and sets Zero Flag (ZF) to choose execution path.';
    }
    // 7. Loops: for(...) or while(...)
    else if (trimmed.startsWith('for') || trimmed.startsWith('while')) {
      kind = 'loop';
      narration = 'Repetition Loop: The CPU tests loop condition register and will cycle through body until condition is false.';
    }
    // 8. Printf output: printf("Petrol Bill: Rs. %.2f (Rupees)\n", total);
    else if (trimmed.includes('printf(')) {
      kind = 'print';
      const formatted = formatCPrintf(trimmed, memoryState);
      if (formatted !== undefined) {
        outputContribution = formatted;
        const summary = formatted.replace(/\n/g, ' ').trim();
        narration = `Standard Output Syscall: Writes formatted stream "${summary}" to terminal stdout.`;
      } else {
        const quoteMatch = trimmed.match(/"([^"]*)"/);
        const text = quoteMatch ? quoteMatch[1] : 'Output';
        outputContribution = text.replace(/\\n/g, '\n');
        narration = `Standard Output Syscall: Sends formatted text "${text}" to the terminal monitor screen.`;
      }
    }
    // 9. Puts output: puts("Hello");
    else if (trimmed.includes('puts(')) {
      kind = 'print';
      const quoteMatch = trimmed.match(/"([^"]*)"/);
      if (quoteMatch) {
        outputContribution = quoteMatch[1] + '\n';
        narration = `Puts Syscall: Writes string "${quoteMatch[1]}" followed by an automated newline to stdout.`;
      }
    }
    // 10. Return 0;
    else if (trimmed.startsWith('return')) {
      kind = 'return';
      const retMatch = trimmed.match(/return\s+([^;]+);/);
      const exitCode = retMatch ? evalCExpression(retMatch[1], memoryState) : 0;
      narration = `Function Complete: Places exit code ${exitCode} into RAX/EAX register and returns control to OS supervisor.`;
    }

    parsed.push({
      lineNum,
      rawText: trimmed,
      kind,
      detectedVars,
      narration,
      memoryBoxImpact: memoryImpact,
      outputContribution
    });
  });

  return parsed;
}
