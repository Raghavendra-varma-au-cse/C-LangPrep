import { evaluateCClientSide, FallbackCompileResult } from './clientFallbackCompiler';

export interface CompileApiResponse {
  stdout: string;
  stderr: string;
  exitCode: number;
  memoryUsageBytes?: number;
  cpuCyclesEstimated?: number;
  compilerNotes?: string[];
  error?: string;
}

export async function requestCompileC(code: string, stdin = ''): Promise<CompileApiResponse> {
  try {
    const res = await fetch('/api/compile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, stdin })
    });

    if (res.ok) {
      return await res.json();
    }

    // If 404 (static deployment like GitHub Pages without Node.js backend)
    if (res.status === 404 || res.status === 405) {
      return evaluateCClientSide(code, stdin);
    }

    const data = await res.json();
    return data;
  } catch (err: any) {
    // Network or static fetch failure fallback
    return evaluateCClientSide(code, stdin);
  }
}
