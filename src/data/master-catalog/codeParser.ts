export interface ParsedCodeLine {
  lineNum: number;
  rawText: string;
  kind: 'header' | 'main' | 'declaration' | 'calculation' | 'condition' | 'loop' | 'print' | 'return' | 'other';
  detectedVars: { name: string; value: string; type: string }[];
  narration: string;
  memoryBoxImpact?: { name: string; value: string; color: string };
  outputContribution?: string;
}

export function parseCustomCCode(cCode: string): ParsedCodeLine[] {
  const lines = cCode.split('\n');
  const parsed: ParsedCodeLine[] = [];
  const memoryState: Record<string, string> = {};

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
      narration = 'Preprocessor Directive: Loads the standard input/output library toolbox.';
    }
    // 2. Main entry
    else if (trimmed.includes('main(')) {
      kind = 'main';
      narration = 'Operating System Entry: The OS invokes main() and sets up the primary thread stack frame.';
    }
    // 3. Variable Declaration / Assignment: int x = 15; or float y = 2.5;
    else if (/^(int|float|double|char|long|short|unsigned)\s+([a-zA-Z0-9_]+)\s*=\s*([^;]+);/.test(trimmed)) {
      const match = trimmed.match(/^(int|float|double|char|long|short|unsigned)\s+([a-zA-Z0-9_]+)\s*=\s*([^;]+);/);
      if (match) {
        const type = match[1];
        const varName = match[2];
        const valExpr = match[3].trim();
        kind = 'declaration';
        narration = `Creates a labeled box "${varName}" on the stack and places ${valExpr} inside it.`;
        memoryState[varName] = valExpr;
        memoryImpact = {
          name: varName,
          value: valExpr,
          color: 'bg-emerald-100 border-emerald-300 text-emerald-900'
        };
        detectedVars.push({ name: varName, value: valExpr, type });
      }
    }
    // 4. Arithmetic / Re-assignment: total = a + b;
    else if (/^([a-zA-Z0-9_]+)\s*=\s*([^;]+);/.test(trimmed) && !trimmed.startsWith('return')) {
      const match = trimmed.match(/^([a-zA-Z0-9_]+)\s*=\s*([^;]+);/);
      if (match) {
        const varName = match[1];
        const expr = match[2].trim();
        kind = 'calculation';
        narration = `CPU Arithmetic Unit calculates: ${expr} and saves result directly into box "${varName}".`;
        memoryState[varName] = expr;
        memoryImpact = {
          name: varName,
          value: expr,
          color: 'bg-amber-100 border-amber-300 text-amber-900 font-bold'
        };
      }
    }
    // 5. Conditions: if (x > 10)
    else if (trimmed.startsWith('if') || trimmed.startsWith('else if')) {
      kind = 'condition';
      narration = `Branch Decision: CPU compares variables in registers and sets Zero Flag (ZF) to choose path.`;
    }
    // 6. Loops: for(...) or while(...)
    else if (trimmed.startsWith('for') || trimmed.startsWith('while')) {
      kind = 'loop';
      narration = `Repetition Loop: The CPU tests loop condition and will repeat body until condition evaluates to 0.`;
    }
    // 7. Printf output: printf("Hello %d", x);
    else if (trimmed.includes('printf(')) {
      kind = 'print';
      const quoteMatch = trimmed.match(/"([^"]*)"/);
      const text = quoteMatch ? quoteMatch[1] : 'Output';
      narration = `Standard Output Syscall: Sends formatted text "${text}" to the terminal monitor screen.`;
      outputContribution = text.replace(/\\n/g, '\n');
    }
    // 8. Return 0;
    else if (trimmed.startsWith('return')) {
      kind = 'return';
      narration = `Function Complete: Places exit code into RAX/EAX register and returns control to OS.`;
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
