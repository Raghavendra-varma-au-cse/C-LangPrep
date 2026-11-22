'use client';

import React, { useState, useEffect } from 'react';
import { C_EXAMPLES_CATALOG, CExample } from '@/data/examples/cCatalog';
import {
  Play,
  RotateCcw,
  Terminal,
  Code2,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Cpu,
  Box,
  Keyboard,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLearningContext } from '@/context/LearningContext';
import { requestCompileC } from '@/lib/apiCompilerClient';

export const LiveInteractivePlayground: React.FC = () => {
  const { state, currentItem, updateActiveCode } = useLearningContext();

  const [selectedExample, setSelectedExample] = useState<CExample>(C_EXAMPLES_CATALOG[0]);
  const [code, setCode] = useState<string>(state.activeCode || C_EXAMPLES_CATALOG[0].code);
  const [stdin, setStdin] = useState<string>(C_EXAMPLES_CATALOG[0].input || '');
  const [output, setOutput] = useState<string>('');
  const [stderr, setStderr] = useState<string>('');
  const [exitCode, setExitCode] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [compilerNotes, setCompilerNotes] = useState<string[]>([]);
  const [telemetry, setTelemetry] = useState<{ memoryBytes: number; cpuCycles: number } | null>(null);

  // Sync when active code in global context changes
  useEffect(() => {
    if (state.activeCode) {
      setCode(state.activeCode);
    }
  }, [state.activeCode]);

  const handleSelectExample = (ex: CExample) => {
    setSelectedExample(ex);
    setCode(ex.code);
    setStdin(ex.input || '');
    setOutput('');
    setStderr('');
    setExitCode(null);
    setCompilerNotes([]);
    setTelemetry(null);
    updateActiveCode(ex.code);
  };

  const handleLoadCurriculumCode = () => {
    setCode(currentItem.codingApproaches.beginnerFriendly.code);
    updateActiveCode(currentItem.codingApproaches.beginnerFriendly.code);
    setOutput('');
    setStderr('');
    setExitCode(null);
    confetti({ particleCount: 30, spread: 45, origin: { y: 0.85 } });
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput('');
    setStderr('');
    setExitCode(null);
    setCompilerNotes([]);
    setTelemetry(null);

    // Sync edited code back into global context
    updateActiveCode(code);

    try {
      const data = await requestCompileC(code, stdin);
      setExitCode(data.exitCode ?? 0);
      setCompilerNotes(data.compilerNotes || []);

      if (data.memoryUsageBytes) {
        setTelemetry({
          memoryBytes: data.memoryUsageBytes,
          cpuCycles: data.cpuCyclesEstimated || 120
        });
      }

      if (data.exitCode === 0) {
        setOutput(data.stdout || '[Program executed quietly with 0 errors]');
        setStderr('');
        confetti({ particleCount: 50, spread: 55, origin: { y: 0.85 } });
      } else {
        setStderr(data.stderr || data.error || 'Compiler error detected.');
        setOutput(data.stdout || '');
      }
    } catch (err: any) {
      setStderr(`Execution failure: ${err.message}`);
      setExitCode(1);
    } finally {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setCode(selectedExample.code);
    setStdin(selectedExample.input || '');
    setOutput('');
    setStderr('');
    setExitCode(null);
    setCompilerNotes([]);
    setTelemetry(null);
  };

  return (
    <div className="bg-white border-2 border-[#ede3d2] rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b-2 border-[#ede3d2]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-3xl">💻</span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl md:text-2xl font-black text-[#2b2520]">
                  Live C Compiler &amp; Silicon Execution Sandbox
                </h3>
                <span className="text-xs bg-[#eaf6f4] text-[#2a9d8f] border border-[#2a9d8f] px-2.5 py-0.5 rounded-full font-bold">
                  Genuine PicoC WebAssembly Engine
                </span>
              </div>
              <p className="text-xs text-[#7d7065] font-medium mt-0.5">
                Write, compile, inspect silicon memory footprints, and execute real C programs with genuine compiler diagnostics.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleLoadCurriculumCode}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#fdf5ea] hover:bg-[#faebd7] text-[#e57e25] border border-[#f3d4b1] cursor-pointer transition shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Load Mission #{currentItem.id} Code</span>
          </button>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#fcf7ee] hover:bg-[#ede3d2] text-[#7d7065] border border-[#ede3d2] cursor-pointer transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Code
          </button>

          <button
            onClick={handleRunCode}
            disabled={isRunning}
            className="friendly-button-amber px-5 py-2.5 text-xs flex items-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>{isRunning ? 'Compiling in WebAssembly...' : 'Run & Compile Code'}</span>
          </button>
        </div>
      </div>

      {/* Catalog Selector */}
      <div className="p-4 bg-[#fcf7ee] border-2 border-[#ebdcc4] rounded-2xl flex items-center gap-2 overflow-x-auto">
        <span className="text-[11px] font-black text-[#7d7065] shrink-0 uppercase tracking-wider">
          Preset Templates:
        </span>
        {C_EXAMPLES_CATALOG.map((ex) => {
          const isSelected = ex.id === selectedExample.id;
          return (
            <button
              key={ex.id}
              onClick={() => handleSelectExample(ex)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 cursor-pointer transition ${
                isSelected
                  ? 'bg-[#e57e25] text-white shadow-xs'
                  : 'bg-white text-[#7d7065] hover:bg-[#ebdcc4] border border-[#ebdcc4]'
              }`}
            >
              {ex.title}
            </button>
          );
        })}
      </div>

      {/* Main Sandbox Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Code Editor (7 cols) */}
        <div className="lg:col-span-7 flex flex-col bg-[#fcf7ee] border-2 border-[#ebdcc4] rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#ebdcc4] text-xs font-bold text-[#57534e] font-mono">
            <span>Editor: main.c (ISO C11 Standard)</span>
            <span className="text-[#e57e25]">Editable C Code</span>
          </div>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full bg-white p-4 font-mono text-xs text-[#2b2520] rounded-xl border border-[#ebdcc4] leading-relaxed focus:outline-none resize-none min-h-[300px]"
            spellCheck={false}
          />

          {/* Keyboard Stdin Input Area */}
          <div className="p-3 bg-white border border-[#ebdcc4] rounded-xl space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-[#57534e]">
              <span className="flex items-center gap-1.5">
                <Keyboard className="w-3.5 h-3.5 text-[#e57e25]" />
                <span>Standard Input (stdin / Keyboard Input for scanf):</span>
              </span>
              <span className="text-[10px] text-slate-400 font-normal">Optional</span>
            </div>
            <input
              type="text"
              value={stdin}
              onChange={(e) => setStdin(e.target.value)}
              placeholder="e.g. 25 Raghavendra (separate inputs by space or newline)"
              className="w-full px-3 py-2 text-xs font-mono bg-[#fcf7ee] border border-[#ebdcc4] rounded-lg focus:outline-none focus:border-[#e57e25]"
            />
            <p className="text-[10px] text-[#7d7065]">
              Values typed here are fed directly into <code>scanf()</code> or <code>fgets()</code> when your C program executes.
            </p>
          </div>

          <div className="p-3 bg-white border border-[#ebdcc4] rounded-xl text-xs">
            <div className="font-bold text-[#d97706] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Concept: {selectedExample.conceptCovered}
            </div>
            <p className="text-[11px] text-[#57534e] mt-0.5">{selectedExample.description}</p>
          </div>
        </div>

        {/* Terminal Output & Compiler Notes (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-[#2b2520] text-white rounded-2xl p-4 font-mono text-xs space-y-4">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-700 text-slate-400 text-[11px] mb-3">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                Terminal Console (stdout / stderr)
              </span>
              <span className={exitCode === null || exitCode === 0 ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                exit code {exitCode !== null ? exitCode : 0}
              </span>
            </div>

            {stderr && (
              <div className="p-3 bg-rose-950/60 border border-rose-800 rounded-xl text-rose-300 whitespace-pre-wrap">
                <div className="flex items-center gap-1 font-bold mb-1 text-rose-400 text-xs font-sans">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Real C Engine Compiler Diagnostics:
                </div>
                {stderr}
              </div>
            )}

            {output && (
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-emerald-400 whitespace-pre leading-relaxed overflow-x-auto shadow-inner mt-2">
                {output}
              </div>
            )}

            {!output && !stderr && (
              <div className="py-16 text-center text-slate-500 text-xs font-sans">
                Press &quot;Run &amp; Compile Code&quot; to execute through the real C engine.
              </div>
            )}
          </div>

          {/* Telemetry and Notes */}
          <div className="space-y-3 pt-3 border-t border-slate-700">
            {telemetry && (
              <div className="flex items-center gap-4 text-[11px] text-slate-300 font-mono">
                <span className="flex items-center gap-1 text-[#2a9d8f] font-bold">
                  <Box className="w-3.5 h-3.5" /> RAM Allocation: {telemetry.memoryBytes} Bytes
                </span>
                <span className="flex items-center gap-1 text-amber-400 font-bold">
                  <Cpu className="w-3.5 h-3.5" /> ALU Cycles: ~{telemetry.cpuCycles}
                </span>
              </div>
            )}

            {compilerNotes.length > 0 && (
              <div className="space-y-1 text-[11px] font-sans text-slate-400">
                <div className="text-amber-300 uppercase text-[10px] font-bold flex items-center gap-1">
                  <Cpu className="w-3 h-3 text-amber-400" />
                  Compiler Telemetry Notes:
                </div>
                {compilerNotes.map((note, idx) => (
                  <div key={idx} className="text-slate-300 flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2a9d8f] shrink-0 mt-0.5" />
                    <span>{note}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
