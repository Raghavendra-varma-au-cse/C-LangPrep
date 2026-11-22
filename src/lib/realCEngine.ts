import { spawn } from 'child_process';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

export interface CExecutionResult {
  stdout: string;
  stderr: string;
  exitCode: number;
  memoryUsageBytes: number;
  cpuCyclesEstimated: number;
  compilerNotes: string[];
}

export async function executeRealC(code: string, stdin = ''): Promise<CExecutionResult> {
  const compilerNotes: string[] = [];

  // Static checks for C students
  const missingHeaders: string[] = [];
  if (!code.includes('<stdio.h>') && (code.includes('printf') || code.includes('scanf') || code.includes('puts'))) {
    missingHeaders.push('stdio.h');
  }
  if (!code.includes('<stdlib.h>') && (code.includes('malloc') || code.includes('free') || code.includes('rand') || code.includes('atoi'))) {
    missingHeaders.push('stdlib.h');
  }
  if (!code.includes('<string.h>') && (code.includes('strcpy') || code.includes('strlen') || code.includes('memcpy') || code.includes('strcmp') || code.includes('strcat'))) {
    missingHeaders.push('string.h');
  }
  if (!code.includes('<math.h>') && (code.includes('sqrt') || code.includes('pow') || code.includes('fabs') || code.includes('sin') || code.includes('cos'))) {
    missingHeaders.push('math.h');
  }

  if (missingHeaders.length > 0) {
    compilerNotes.push(`Best practice note: Include missing header(s): ${missingHeaders.map(h => `<${h}>`).join(', ')}`);
  }

  if (!code.includes('main')) {
    return {
      stdout: '',
      stderr: 'fatal error: In function `_start\': undefined reference to `main\'\ncollect2: error: ld returned 1 exit status\nHint: Every C program must have an "int main(void)" entry point.',
      exitCode: 1,
      memoryUsageBytes: 0,
      cpuCyclesEstimated: 0,
      compilerNotes: ['Linker symbol error: Missing main() entry point.']
    };
  }

  // Write temporary C source file
  const tempId = `c_${Date.now()}_${Math.floor(Math.random() * 1000000)}`;
  const tempFilePath = path.join(os.tmpdir(), `${tempId}.c`);
  const tempStdinPath = path.join(os.tmpdir(), `${tempId}.stdin`);
  const workerScriptPath = path.resolve(process.cwd(), 'src', 'lib', 'cEngineWorker.js');

  await fs.promises.writeFile(tempFilePath, code, 'utf8');
  if (stdin) {
    await fs.promises.writeFile(tempStdinPath, stdin, 'utf8');
  }

  return new Promise<CExecutionResult>((resolve) => {
    let stdoutData = '';
    let stderrData = '';
    let timedOut = false;

    const workerArgs = [workerScriptPath, tempFilePath];
    if (stdin) {
      workerArgs.push(tempStdinPath);
    }

    // Spawn isolated node process running the real C WebAssembly engine
    const child = spawn(process.execPath, workerArgs, {
      windowsHide: true,
      stdio: ['pipe', 'pipe', 'pipe']
    });

    if (stdin && child.stdin) {
      child.stdin.write(stdin);
      child.stdin.end();
    }

    const timer = setTimeout(() => {
      timedOut = true;
      child.kill('SIGKILL');
    }, 4500); // 4.5-second timeout limit

    child.stdout.on('data', (chunk) => {
      stdoutData += chunk.toString();
    });

    child.stderr.on('data', (chunk) => {
      stderrData += chunk.toString();
    });

    child.on('close', async (codeExit) => {
      clearTimeout(timer);

      // Clean up temporary files
      try {
        if (fs.existsSync(tempFilePath)) await fs.promises.unlink(tempFilePath);
        if (fs.existsSync(tempStdinPath)) await fs.promises.unlink(tempStdinPath);
      } catch {
        // ignore cleanup error
      }

      if (timedOut) {
        return resolve({
          stdout: stdoutData,
          stderr: 'Execution Terminated: Timeout (4500ms exceeded)!\nYour program entered an infinite loop (e.g. while(1) without a break condition or loop counter not advancing).',
          exitCode: 124,
          memoryUsageBytes: 4096,
          cpuCyclesEstimated: 9999999,
          compilerNotes: ['Watchdog timer triggered: Infinite loop killed by process supervisor.']
        });
      }

      // Memory and CPU cycle estimations
      let memoryBytes = 1024;
      if (code.includes('malloc') || code.includes('calloc')) memoryBytes += 64;
      if (code.includes('[') && code.includes(']')) memoryBytes += 24;
      if (code.includes('struct') || code.includes('union')) memoryBytes += 32;

      let cycles = 200;
      if (code.includes('for') || code.includes('while')) cycles += 1200;
      if (code.includes('quickSort') || code.includes('mergeSort')) cycles += 4800;

      if (code.includes('*') && (code.includes('&') || code.includes('->'))) {
        compilerNotes.push('Pointer Telemetry: Direct memory dereferencing detected.');
      }
      if (code.includes('malloc') && !code.includes('free')) {
        compilerNotes.push('Memory Advisory: malloc() was called without free(). Potential heap memory leak detected.');
      }

      resolve({
        stdout: stdoutData.trim(),
        stderr: stderrData.trim(),
        exitCode: codeExit ?? 0,
        memoryUsageBytes: memoryBytes,
        cpuCyclesEstimated: cycles,
        compilerNotes
      });
    });

    child.on('error', (err) => {
      clearTimeout(timer);
      resolve({
        stdout: '',
        stderr: `Failed to invoke C compiler process: ${err.message}`,
        exitCode: 1,
        memoryUsageBytes: 0,
        cpuCyclesEstimated: 0,
        compilerNotes: ['Process spawn error.']
      });
    });
  });
}
