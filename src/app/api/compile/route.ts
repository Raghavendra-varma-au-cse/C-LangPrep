import { NextRequest, NextResponse } from 'next/server';
import { executeRealC } from '@/lib/realCEngine';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { code, stdin = '' } = body;

    if (!code || typeof code !== 'string') {
      return NextResponse.json(
        { error: 'Invalid request: "code" must be a non-empty string.' },
        { status: 400 }
      );
    }

    // Execute using genuine C Engine (PicoC WASM in sandboxed child process)
    const result = await executeRealC(code, stdin);

    // If real execution yielded stdout or stderr, return it immediately
    if (result.stdout.length > 0 || result.stderr.length > 0 || result.exitCode !== 0) {
      return NextResponse.json(result);
    }

    // Fallback: If code had empty output but succeeded (e.g., quiet main with return 0),
    // provide an educational note so the student understands why nothing printed.
    return NextResponse.json({
      stdout: '[Program executed successfully with exit code 0. No printf output was generated.]\nHint: Use printf("Hello, World!\\n"); to display text on the console.',
      stderr: '',
      exitCode: 0,
      memoryUsageBytes: result.memoryUsageBytes,
      cpuCyclesEstimated: result.cpuCyclesEstimated,
      compilerNotes: result.compilerNotes
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        stdout: '',
        stderr: `Runtime Server Exception: ${err.message || 'Unknown error'}`,
        exitCode: 1,
        compilerNotes: ['Execution engine failure. Verify C syntax.']
      },
      { status: 500 }
    );
  }
}
