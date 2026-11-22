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
 * Preprocessor & Sanitizer for Embedded PicoC C Interpreter:
 * 1. Strips unsupported type qualifiers (const, volatile, inline, restrict, register)
 *    so statements like `const struct Vector3D *v` do not trigger "'const' is undefined".
 * 2. Polyfills common modern C headers: <stdbool.h>, <stdint.h>, <inttypes.h>.
 * 3. Rewrites struct aggregate initializers `struct Name var = { val1, val2, ... };`
 *    into field-by-field assignments so PicoC doesn't throw "can't assign struct from array initializer".
 * 4. Injects simulated keyboard input stream if scanf is called.
 */
function preprocessCForPicoC(code, stdinInput) {
  let res = code;

  // 1. Remove unsupported qualifiers without altering semantics
  res = res.replace(/\b(const|volatile|inline|restrict|register)\b/g, ' ');

  // 1b. Strip compiler pragmas (e.g. #pragma pack, #pragma once)
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
  // PicoC requires each struct member to terminate with a semicolon: e.g.
  // `struct StudentNode *left, *right;` -> `struct StudentNode *left; struct StudentNode *right;`
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
  // Find all struct definitions and their members
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
  // In standard C, `if (ptr)` evaluates whether ptr is non-NULL.
  // PicoC strictly requires integer conditions and rejects `char*` without explicit `!= NULL`.
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

let outputLines = [];
let hasError = false;

// Intercept process.exit so Emscripten abort/exit doesn't terminate before flushing diagnostics
const originalExit = process.exit.bind(process);
let flushed = false;

function flushOutputs(exitCode) {
  if (flushed) return;
  flushed = true;
  const isErr = hasError || (exitCode !== 0 && exitCode !== undefined);
  const text = outputLines.join('\n').trim();
  if (isErr) {
    if (text) process.stderr.write(text + '\n');
  } else {
    if (text) process.stdout.write(text + '\n');
  }
}

process.exit = function(code) {
  flushOutputs(code);
  originalExit(code);
};

process.on('exit', (code) => {
  flushOutputs(code);
});

try {
  const { runC } = require('picoc-js');

  runC(sanitizedCode, (output) => {
    if (typeof output === 'string') {
      outputLines.push(output);
      if (
        output.includes('expected') ||
        output.includes('error:') ||
        output.includes('Error:') ||
        output.includes('undefined') ||
        output.includes('undeclared') ||
        output.includes('not recognized') ||
        output.includes('invalid') ||
        output.includes('unknown') ||
        output.includes('not expected')
      ) {
        hasError = true;
      }
    }
  });

  setTimeout(() => {
    process.exit(hasError ? 1 : 0);
  }, 120);
} catch (err) {
  outputLines.push(err.message || String(err));
  hasError = true;
  process.exit(1);
}
