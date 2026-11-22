const fs = require('fs');
const path = require('path');

const sourceFilePath = process.argv[2];

if (!sourceFilePath || !fs.existsSync(sourceFilePath)) {
  process.stderr.write('Error: No source file provided to C Engine worker.\n');
  process.exit(1);
}

const rawSourceCode = fs.readFileSync(sourceFilePath, 'utf8');

// Optional stdin file passed as second argument
const stdinFilePath = process.argv[3];
let userStdin = '';
if (stdinFilePath && fs.existsSync(stdinFilePath)) {
  try {
    userStdin = fs.readFileSync(stdinFilePath, 'utf8');
  } catch (e) {}
}

/**
 * Validates 'const' immutability rules.
 * If a program attempts to reassign, increment, or modify a variable declared with 'const',
 * emit a genuine ISO C compiler diagnostic error.
 */
function checkConstViolations(code) {
  const constVarNames = new Set();
  const constDeclRegex = /(?:const\s+(?:unsigned\s+|signed\s+|short\s+|long\s+)?(?:int|float|double|char|long|short|unsigned|struct\s+\w+|\w+)|\b(?:int|float|double|char|long|short|unsigned)\s+const)\s+\*?\s*([A-Za-z_]\w*)/g;
  let match;
  while ((match = constDeclRegex.exec(code)) !== null) {
    constVarNames.add(match[1]);
  }

  if (constVarNames.size === 0) return null;

  const lines = code.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    if (trimmed.startsWith('//') || trimmed.startsWith('/*')) continue;

    for (const varName of constVarNames) {
      if (line.includes('const') && line.includes(varName)) continue;
      const assignRegex = new RegExp(`(?:\\b${varName}\\s*(?:=[^=]|\\+=|-=|\\*=|/=|%=|\\+\\+|--)|(?:\\+\\+|--)\\s*${varName}\\b)`);
      if (assignRegex.test(line)) {
        const col = line.indexOf(varName) + 1;
        return `file.c:${i + 1}:${col}: error: assignment of read-only variable '${varName}'\nHint: Variables qualified with 'const' are read-only and cannot be reassigned after declaration.`;
      }
    }
  }
  return null;
}

// 0. Static const check before preprocessing
const constErr = checkConstViolations(rawSourceCode);
if (constErr) {
  process.stderr.write(constErr + '\n');
  process.exit(1);
}

/**
 * Preprocessor & Sanitizer for Embedded PicoC C Interpreter:
 * 1. Strips unsupported type qualifiers (const, volatile, inline, restrict, register)
 *    so statements like `const struct Vector3D *v` do not trigger "'const' is undefined".
 * 2. Resolves redundant 'extern' forward declarations in single translation units.
 * 3. Polyfills common modern C headers: <stdbool.h>, <stdint.h>, <inttypes.h>.
 * 4. Rewrites struct aggregate initializers `struct Name var = { val1, val2, ... };`
 *    into field-by-field assignments.
 */
function preprocessCForPicoC(code, stdinInput) {
  let res = code;

  // 1. Resolve 'extern' forward declarations in single-unit compilation sandbox
  res = res.replace(/^[ \t]*extern\s+((?:const\s+)?(?:unsigned\s+|signed\s+|short\s+|long\s+)?(?:struct\s+\w+|\w+)\s+\*?\s*([A-Za-z_]\w*))\s*;/gm, (match, fullDecl, varName) => {
    const restOfCode = res.replace(match, '');
    const defRegex = new RegExp(`\\b${varName}\\s*(?:=|;|\\[)`);
    if (defRegex.test(restOfCode)) {
      return `// extern ${varName}; (forward declaration)`;
    }
    return `${fullDecl} = 0; // extern symbol resolved in sandbox`;
  });

  // 1b. Remove unsupported qualifiers without altering semantics
  res = res.replace(/\b(const|volatile|inline|restrict|register)\b/g, ' ');

  // 1c. Strip compiler pragmas (e.g. #pragma pack, #pragma once)
  res = res.replace(/^[ \t]*#pragma[^\r\n]*/gm, '// pragma ignored');

  // 2. Polyfill <stdbool.h>
  res = res.replace(/#include\s+<stdbool\.h>/g, 'typedef int bool;\n#define true 1\n#define false 0');

  // 3. Polyfill <stdint.h>, <inttypes.h>, <stddef.h> and size_t
  res = res.replace(/#include\s+<(?:stdint|inttypes|stddef)\.h>/g, 
    'typedef int int32_t;\ntypedef unsigned int uint32_t;\ntypedef short int16_t;\ntypedef unsigned short uint16_t;\ntypedef char int8_t;\ntypedef unsigned char uint8_t;\ntypedef long int64_t;\ntypedef unsigned long uint64_t;\ntypedef unsigned int size_t;'
  );

  // Guarantee size_t is always defined even if stddef.h was omitted
  if (!/\btypedef\s+[^;]*\bsize_t\b/.test(res)) {
    res = 'typedef unsigned int size_t;\n' + res;
  }

  // 3b. Expand comma-separated member declarations inside struct definitions
  res = res.replace(/((?:typedef\s+)?struct(?:\s+[A-Za-z_]\w*)?\s*\{)([^}]+)(\})/g, (all, open, body, close) => {
    const lines = body.split(';');
    const newLines = [];
    for (let line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('/*')) {
        if (trimmed) newLines.push(trimmed);
        continue;
      }
      if (trimmed.includes(',')) {
        const m = trimmed.match(/^((?:struct\s+\w+|union\s+\w+|enum\s+\w+|(?:unsigned|signed|short|long)\s+\w+|\w+))\s+([\s\S]+)$/);
        if (m) {
          const baseType = m[1].trim();
          const decls = m[2].split(',').map(d => d.trim()).filter(Boolean);
          if (decls.length > 1) {
            decls.forEach(d => newLines.push(`${baseType} ${d}`));
            continue;
          }
        }
      }
      newLines.push(trimmed);
    }
    return open + '\n    ' + newLines.join(';\n    ') + ';\n' + close;
  });

  // 4. Transform struct initializers: struct Name var = { ... };
  const structDefs = {};
  const structDefRegex = /struct\s+([A-Za-z_]\w*)\s*\{([^}]+)\};/g;
  let defMatch;
  while ((defMatch = structDefRegex.exec(res)) !== null) {
    const sName = defMatch[1];
    const sBody = defMatch[2];
    const memberRegex = /(?:int|float|double|char|long|short|unsigned|struct\s+\w+|\w+)\s+(?:\*+)?([A-Za-z_]\w*)(?:\[\d*\])?;/g;
    const members = [];
    let mMatch;
    while ((mMatch = memberRegex.exec(sBody)) !== null) {
      members.push(mMatch[1]);
    }
    structDefs[sName] = members;
  }

  // Rewrite struct initialization instances
  res = res.replace(/struct\s+([A-Za-z_]\w*)\s+([A-Za-z_]\w*)\s*=\s*\{([^{}]+)\};/g, (match, sName, varName, valStr) => {
    const members = structDefs[sName];
    if (!members || members.length === 0) return match;
    const rawVals = valStr.split(',').map(s => s.trim()).filter(Boolean);
    const inits = [`struct ${sName} ${varName};`];
    members.forEach((mem, idx) => {
      if (idx < rawVals.length) {
        let val = rawVals[idx];
        if (val.startsWith('.')) {
          const parts = val.split('=');
          const dMem = parts[0].replace('.', '').trim();
          const dVal = parts.slice(1).join('=').trim();
          inits.push(`${varName}.${dMem} = ${dVal};`);
        } else {
          inits.push(`${varName}.${mem} = ${val};`);
        }
      }
    });
    return inits.join(' ');
  });

  // 5. Normalize pointer truthiness tests for PicoC
  const pointerNames = new Set();
  const ptrVarRegex = /(?:int|char|float|double|void|struct\s+\w+|\w+)\s*\*\s*([A-Za-z_]\w*)/g;
  let pMatch;
  while ((pMatch = ptrVarRegex.exec(res)) !== null) {
    pointerNames.add(pMatch[1]);
  }
  const ptrFuncRegex = /(?:int|char|float|double|void|struct\s+\w+|\w+)\s*\*\s*([A-Za-z_]\w*)\s*\(/g;
  while ((pMatch = ptrFuncRegex.exec(res)) !== null) {
    pointerNames.add(pMatch[1]);
  }

  for (const name of pointerNames) {
    res = res.replace(new RegExp(`\\bif\\s*\\(\\s*${name}\\s*\\)`, 'g'), `if (${name} != NULL)`);
    res = res.replace(new RegExp(`\\bif\\s*\\(\\s*!${name}\\s*\\)`, 'g'), `if (${name} == NULL)`);
    res = res.replace(new RegExp(`\\bwhile\\s*\\(\\s*${name}\\s*\\)`, 'g'), `while (${name} != NULL)`);
    res = res.replace(new RegExp(`\\bwhile\\s*\\(\\s*!${name}\\s*\\)`, 'g'), `while (${name} == NULL)`);
  }

  return res;
}

const sanitizedCode = preprocessCForPicoC(rawSourceCode, userStdin);

const programOutputs = [];
const compilerErrors = [];
let hasCompilerError = false;

function isPicoCCompilerDiagnostic(text) {
  return (
    /(?:file\.c|\.c):\d+:(?:\d+:)?\s+/i.test(text) ||
    /^\s*\^\s*$/.test(text) ||
    text.includes('file.c:') ||
    text.includes('undefined variable') ||
    text.includes('undeclared') ||
    text.includes('can\'t assign') ||
    text.includes('semicolon expected') ||
    text.includes('expression expected')
  );
}

// Intercept process.exit so Emscripten abort/exit doesn't terminate before flushing diagnostics
const originalExit = process.exit.bind(process);
let flushed = false;

function flushOutputs(exitCode) {
  if (flushed) return;
  flushed = true;

  if (hasCompilerError) {
    const errText = compilerErrors.join('\n').trim();
    if (errText) process.stderr.write(errText + '\n');
  } else {
    const stdoutText = programOutputs.join('\n').trim();
    if (stdoutText) process.stdout.write(stdoutText + '\n');
  }
}

process.exit = function(code) {
  flushOutputs(code);
  originalExit(hasCompilerError ? 1 : code);
};

process.on('exit', (code) => {
  flushOutputs(code);
});

try {
  const { runC } = require('picoc-js');

  runC(sanitizedCode, (output) => {
    if (typeof output === 'string') {
      if (isPicoCCompilerDiagnostic(output)) {
        compilerErrors.push(output);
        hasCompilerError = true;
      } else {
        programOutputs.push(output);
      }
    }
  });

  setTimeout(() => {
    process.exit(hasCompilerError ? 1 : 0);
  }, 120);
} catch (err) {
  compilerErrors.push(err.message || String(err));
  hasCompilerError = true;
  process.exit(1);
}
