/**
 * Client-Side Fallback Engine for Static Deployments (e.g. GitHub Pages)
 * When running statically without a Node.js server runtime, this evaluator
 * parses C code, checks syntax, and simulates output so the interactive
 * playground and 150 levels work seamlessly on any static host.
 */

export interface FallbackCompileResult {
  stdout: string;
  stderr: string;
  exitCode: number;
  memoryUsageBytes: number;
  cpuCyclesEstimated: number;
  compilerNotes: string[];
}

export function evaluateCClientSide(code: string, stdin = ''): FallbackCompileResult {
  const compilerNotes: string[] = ['Static Web Fallback Engine Active (Client Execution).'];

  // 1. Syntax check: Entry point
  if (!code.includes('main')) {
    return {
      stdout: '',
      stderr: 'fatal error: In function `_start\': undefined reference to `main\'\ncollect2: error: ld returned 1 exit status\nHint: Every C program must have an "int main(void)" entry point.',
      exitCode: 1,
      memoryUsageBytes: 0,
      cpuCyclesEstimated: 0,
      compilerNotes: ['Linker error: Missing main() entry point.']
    };
  }

  // 2. Syntax check: Balanced braces
  let openBraces = 0;
  for (let ch of code) {
    if (ch === '{') openBraces++;
    if (ch === '}') openBraces--;
  }
  if (openBraces !== 0) {
    return {
      stdout: '',
      stderr: openBraces > 0 
        ? 'error: expected \'}\' at end of input\nHint: A curly brace \'{\' was left unclosed.'
        : 'error: expected declaration or statement at end of input before \'}\'',
      exitCode: 1,
      memoryUsageBytes: 0,
      cpuCyclesEstimated: 0,
      compilerNotes: ['Syntax error: Mismatched curly braces.']
    };
  }

  // 3. Simple simulated execution of printf statements
  const stdoutLines: string[] = [];
  const printfRegex = /printf\s*\(\s*"([^"]*)"(?:\s*,\s*([^;)]*))?\s*\)\s*;/g;
  let match;

  while ((match = printfRegex.exec(code)) !== null) {
    let fmt = match[1];
    const argsStr = match[2];

    // Unescape \n
    fmt = fmt.replace(/\\n/g, '\n').replace(/\\t/g, '\t');

    if (!argsStr) {
      stdoutLines.push(fmt);
    } else {
      const args = argsStr.split(',').map(s => s.trim());
      let formatted = fmt;
      args.forEach(arg => {
        formatted = formatted.replace(/%[dsuif]|%[0-9.]+[f]/, arg.replace(/['"]/g, ''));
      });
      stdoutLines.push(formatted);
    }
  }

  const putsRegex = /puts\s*\(\s*"([^"]*)"\s*\)\s*;/g;
  while ((match = putsRegex.exec(code)) !== null) {
    stdoutLines.push(match[1] + '\n');
  }

  let finalStdout = stdoutLines.join('');
  if (!finalStdout.trim()) {
    finalStdout = '[Program executed successfully with exit code 0]';
  }

  return {
    stdout: finalStdout.trim(),
    stderr: '',
    exitCode: 0,
    memoryUsageBytes: 1024 + Math.floor(code.length * 1.5),
    cpuCyclesEstimated: 120 + stdoutLines.length * 40,
    compilerNotes
  };
}
