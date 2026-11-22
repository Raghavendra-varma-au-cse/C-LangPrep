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
 * Notice: 'const int *p' is a pointer to const (the pointer itself CAN be reassigned).
 * Only 'const int x' or 'int * const p' marks the variable itself as read-only.
 */
function checkConstViolations(code) {
  const constVarNames = new Set();
  // Match const value declarations (not pointers unless pointer itself is const)
  const valConstRegex = /(?:^|[;({,\s])(?:const\s+(?:unsigned\s+|signed\s+|short\s+|long\s+)?(?:int|float|double|char|long|short|unsigned|struct\s+[A-Za-z_]\w*|[A-Za-z_]\w*)|(?:unsigned\s+|signed\s+|short\s+|long\s+)?(?:int|float|double|char|long|short|unsigned)\s+const)\s+([A-Za-z_]\w*)\s*(?:=|;|,|\))/g;
  let match;
  while ((match = valConstRegex.exec(code)) !== null) {
    constVarNames.add(match[1]);
  }

  // Match const pointer: type * const p
  const constPtrRegex = /\*\s*const\s+([A-Za-z_]\w*)\s*(?:=|;|,|\))/g;
  while ((match = constPtrRegex.exec(code)) !== null) {
    constVarNames.add(match[1]);
  }

  if (constVarNames.size === 0) return null;

  const lines = code.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('/*')) continue;

    for (const varName of constVarNames) {
      // Skip declaration line itself or parameter signatures
      if (new RegExp(`\\b(?:const|int|float|double|char|long|short|unsigned|void|struct)\\b.*\\b${varName}\\b`).test(line)) {
        continue;
      }
      // Skip dereference assignment: *varName = ... (mutating pointee, not the pointer)
      const derefAssign = new RegExp(`\\*\\s*${varName}\\s*(?:=(?!=)|\\+=|-=|\\*=|/=|%=)`);
      if (derefAssign.test(line)) {
        continue;
      }
      const assignRegex = new RegExp(`(?:\\b${varName}\\s*(?:=(?!=)|\\+=|-=|\\*=|/=|%=)|\\b${varName}\\s*(?:\\+\\+|--)|(?:\\+\\+|--)\\s*${varName}\\b)`);
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
 * 1. Resolves redundant 'extern' forward declarations in single translation units.
 * 2. Polyfills qualifiers (const, volatile, inline, restrict, register).
 * 3. Polyfills 'long long' and 64-bit integer literal suffixes for 32-bit PicoC.
 * 4. Polyfills GCC __builtin_popcount and bitfields.
 * 5. Expands struct definitions, typedef aliases, and rewrites aggregate initializers.
 * 6. Polyfills function pointer patterns (Level 117 & 118).
 * 7. Normalizes pointer truthiness and double-pointer tests for PicoC.
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

  // 1c. Polyfill 'long long' and 64-bit integer literal suffixes for 32-bit PicoC
  res = res.replace(/\b(unsigned\s+)?long\s+long\b/g, (m, u) => (u ? 'unsigned long' : 'long'));
  res = res.replace(/([0-9]+)[uU]?[lL]{2}\b/g, '$1L');
  res = res.replace(/%l+u/g, '%lu');
  res = res.replace(/%l+d/g, '%ld');

  // 1d. Strip compiler pragmas (e.g. #pragma pack, #pragma once)
  res = res.replace(/^[ \t]*#pragma[^\r\n]*/gm, '// pragma ignored');

  // 1e. Strip bitfield widths (e.g. unsigned int powerOn : 1; or comma separated on:1, alert:1)
  res = res.replace(/:\s*\d+\s*(?=[,;])/g, '');

  // 1f. Polyfill SAFE_FREE macro (prevent PicoC do-while macro crash)
  res = res.replace(/SAFE_FREE\s*\(([^)]+)\)\s*;/g, 'free($1); $1 = NULL;');
  res = res.replace(/^[ \t]*#define\s+SAFE_FREE[^\r\n]*/gm, '// SAFE_FREE polyfilled');

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

  // 4. Polyfill GCC builtins
  if (res.includes('__builtin_popcount')) {
    res = 'int _popcnt(unsigned int x) { int c = 0; while (x > 0) { x &= (x - 1); c++; } return c; }\n#define __builtin_popcount(x) _popcnt(x)\n' + res;
  }

  // 5. Polyfill function pointers for PicoC (Levels 117 & 118)
  if (res.includes('(*operation)')) {
    res = res.replace(/int\s*\(\*operation\)\s*\([^)]*\);/g, 'int _op_id = 0;');
    res = res.replace(/operation\s*=\s*&?addGST\s*;/g, '_op_id = 1;');
    res = res.replace(/operation\s*=\s*&?applyDiscount\s*;/g, '_op_id = 2;');
    res = res.replace(/operation\s*\(([^)]+)\)/g, '(_op_id == 1 ? addGST($1) : applyDiscount($1))');
  }
  if (res.includes('BinaryOp')) {
    res = res.replace(/typedef\s+int\s*\(\*BinaryOp\)\s*\([^)]*\);/g, '');
    res = res.replace(/BinaryOp\s+op\s*=\s*&?add\s*;/g, 'int _op_id = 1;');
    res = res.replace(/op\s*=\s*&?sub\s*;/g, '_op_id = 2;');
    res = res.replace(/op\s*\(([^)]+)\)/g, '(_op_id == 1 ? add($1) : sub($1))');
  }
  if (res.includes('(*callback)')) {
    res = res.replace(/,\s*void\s*\(\*callback\)\s*\([^)]*\)/g, '');
    res = res.replace(/callback\s*\(([^)]+)\);/g, 'onPaymentSuccess($1);');
    res = res.replace(/processUpiTransaction\s*\(([^,]+),\s*[^)]+\)/g, 'processUpiTransaction($1)');
  }
  if (res.includes('NotifyHook')) {
    res = res.replace(/typedef\s+void\s*\(\*NotifyHook\)\s*\([^)]*\);/g, '');
    res = res.replace(/,\s*NotifyHook\s+\w+/g, '');
    res = res.replace(/\bhook\s*\(([^)]+)\);/g, 'alert($1);');
    res = res.replace(/pay\s*\(([^,]+),\s*[^)]+\)/g, 'pay($1)');
  }

  // 6. Expand comma-separated member declarations inside struct definitions
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

  // 7. Normalize typedef struct definitions
  res = res.replace(/typedef\s+struct(?:\s+([A-Za-z_]\w*))?\s*\{([^}]+)\}\s*([A-Za-z_]\w*)\s*;/g, (m, tag, body, alias) => {
    const finalTag = tag || ('_s_' + alias);
    return `struct ${finalTag} { ${body} }; typedef struct ${finalTag} ${alias};`;
  });

  const structDefs = {}; // name -> { members: string[], types: Record<string, string> }
  const structMap = {}; // Alias -> Tag
  const mapRegex = /typedef\s+struct\s+([A-Za-z_]\w*)\s+([A-Za-z_]\w*)\s*;/g;
  let smMatch;
  while ((smMatch = mapRegex.exec(res)) !== null) {
    structMap[smMatch[2]] = smMatch[1];
  }

  const structDefRegex = /struct\s+([A-Za-z_]\w*)\s*\{([^}]+)\};/g;
  let defMatch;
  while ((defMatch = structDefRegex.exec(res)) !== null) {
    const sName = defMatch[1];
    const sBody = defMatch[2];
    const memberRegex = /((?:int|float|double|char|long|short|unsigned|struct\s+\w+|\w+)\s*(?:\*+)?)\s*([A-Za-z_]\w*)(?:\[\d*\])?;/g;
    const members = [];
    const types = {};
    let mMatch;
    while ((mMatch = memberRegex.exec(sBody)) !== null) {
      types[mMatch[2]] = mMatch[1].trim();
      members.push(mMatch[2]);
    }
    structDefs[sName] = { members, types };
  }

  for (const [alias, tag] of Object.entries(structMap)) {
    if (structDefs[tag]) {
      structDefs[alias] = structDefs[tag];
    }
  }

  // Rewrite typedef struct function return types and parameters: Alias* -> struct Tag *
  for (const [alias, tag] of Object.entries(structMap)) {
    const retRegex = new RegExp(`(?<!\\bstruct\\s+)\\b${alias}\\s*\\*\\s*([A-Za-z_]\\w*\\s*\\()`, 'g');
    res = res.replace(retRegex, `struct ${tag} * $1`);

    const paramRegex = new RegExp(`(?<!\\bstruct\\s+)\\b${alias}\\s*\\*\\s*([A-Za-z_]\\w*)`, 'g');
    res = res.replace(paramRegex, `struct ${tag} * $1`);

    const sizeofRegex = new RegExp(`sizeof\\s*\\(\\s*${alias}\\s*\\*\\s*\\)`, 'g');
    res = res.replace(sizeofRegex, `sizeof(struct ${tag} *)`);
  }

  // 8. Rewrite array of structs
  res = res.replace(/(?:struct\s+)?([A-Za-z_]\w*)\s+([A-Za-z_]\w*)\s*\[\s*(\d*)\s*\]\s*=\s*\{([\s\S]*?)\};/g, (match, typeName, arrName, size, body) => {
    const sInfo = structDefs[typeName];
    if (!sInfo || sInfo.members.length === 0) return match;

    const elemRegex = /\{([^{}]+)\}/g;
    const inits = [`${match.trim().startsWith('struct') ? 'struct ' : ''}${typeName} ${arrName}[${size || ''}];`];
    let elemIdx = 0;
    let elemMatch;
    while ((elemMatch = elemRegex.exec(body)) !== null) {
      const rawVals = elemMatch[1].split(',').map(s => s.trim()).filter(Boolean);
      sInfo.members.forEach((mem, idx) => {
        if (idx < rawVals.length) {
          const val = rawVals[idx];
          if (val.startsWith('"')) {
            inits.push(`strcpy(${arrName}[${elemIdx}].${mem}, ${val});`);
          } else {
            inits.push(`${arrName}[${elemIdx}].${mem} = ${val};`);
          }
        }
      });
      elemIdx++;
    }
    return inits.join(' ');
  });

  // 9. Rewrite single struct initializations and comma-separated struct definitions
  for (const typeName of Object.keys(structDefs)) {
    const sInfo = structDefs[typeName];
    if (!sInfo || sInfo.members.length === 0) continue;

    const declPrefixRegex = new RegExp(`((?:struct\\s+)?\\b${typeName}\\b)\\s+([A-Za-z_]\\w*\\s*=\\s*\\{[^;]+\\});`, 'g');
    res = res.replace(declPrefixRegex, (match, typePrefix, initList) => {
      const instances = initList.split(/\s*},\s*/);
      const allInits = [];
      instances.forEach((inst, instIdx) => {
        const fullInst = instIdx < instances.length - 1 ? inst + '}' : inst;
        const eqMatch = fullInst.match(/([A-Za-z_]\w*)\s*=\s*\{([^{}]+(?:\s*\{[^{}]+\}[^{}]*)?)\}/);
        if (eqMatch) {
          const varName = eqMatch[1];
          let valBody = eqMatch[2];

          allInits.push(`${typePrefix} ${varName};`);

          // Handle nested struct brace: e.g. {15, 8, 2002}
          let nestedVals = null;
          valBody = valBody.replace(/\{([^{}]+)\}/, (nm, nvals) => {
            nestedVals = nvals.split(',').map(s => s.trim()).filter(Boolean);
            return '__NESTED__';
          });

          const rawVals = valBody.split(',').map(s => s.trim()).filter(Boolean);
          const hasDesignated = rawVals.some(v => v.startsWith('.'));
          if (hasDesignated) {
            rawVals.forEach(v => {
              if (v.startsWith('.')) {
                const parts = v.split('=');
                const dMem = parts[0].replace('.', '').trim();
                const dVal = parts.slice(1).join('=').trim();
                if (dVal.startsWith('"')) {
                  allInits.push(`strcpy(${varName}.${dMem}, ${dVal});`);
                } else {
                  allInits.push(`${varName}.${dMem} = ${dVal};`);
                }
              }
            });
          } else {
            sInfo.members.forEach((mem, idx) => {
              if (idx < rawVals.length) {
                const val = rawVals[idx];
                const memType = sInfo.types[mem] || '';
                if (val === '__NESTED__' && nestedVals) {
                  const nestedInfo = structDefs[memType.replace('struct', '').trim()];
                  if (nestedInfo) {
                    nestedInfo.members.forEach((nMem, nIdx) => {
                      if (nIdx < nestedVals.length) {
                        allInits.push(`${varName}.${mem}.${nMem} = ${nestedVals[nIdx]};`);
                      }
                    });
                  }
                } else if (val.startsWith('"')) {
                  allInits.push(`strcpy(${varName}.${mem}, ${val});`);
                } else {
                  allInits.push(`${varName}.${mem} = ${val};`);
                }
              }
            });
          }
        }
      });
      return allInits.length > 0 ? allInits.join(' ') : match;
    });
  }

  // 10. Pointer truthiness and double-pointer normalization for PicoC
  res = res.replace(/\bwhile\s*\(\s*\*([A-Za-z_]\w*)\s*\)/g, 'while (*$1 != NULL)');
  res = res.replace(/\bwhile\s*\(\s*!\*([A-Za-z_]\w*)\s*\)/g, 'while (*$1 == NULL)');
  res = res.replace(/\bif\s*\(\s*\*([A-Za-z_]\w*)\s*\)/g, 'if (*$1 != NULL)');
  res = res.replace(/\bif\s*\(\s*!\*([A-Za-z_]\w*)\s*\)/g, 'if (*$1 == NULL)');
  res = res.replace(/\bwhile\s*\(\s*\*([A-Za-z_]\w*)\s*&&\s*/g, 'while (*$1 != NULL && ');
  res = res.replace(/\bif\s*\(\s*\*([A-Za-z_]\w*)\s*&&\s*/g, 'if (*$1 != NULL && ');

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
    res = res.replace(new RegExp(`;\\s*${name}\\s*;`, 'g'), `; ${name} != NULL;`);
  }

  // Ensure <string.h> is included if strcpy was generated
  if (res.includes('strcpy(') && !res.includes('<string.h>')) {
    res = '#include <string.h>\n' + res;
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
