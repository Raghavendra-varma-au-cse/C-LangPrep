'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, FileCode, Layers, Link2, Play, CheckCircle, ArrowRight, RefreshCw } from 'lucide-react';

interface Stage {
  id: string;
  name: string;
  tool: string;
  input: string;
  output: string;
  description: string;
  hardwareView: string;
}

const STAGES: Stage[] = [
  {
    id: 'source',
    name: '1. Source Code',
    tool: 'Editor / IDE',
    input: 'hello.c',
    output: 'Raw ASCII C code with #include, #define',
    description: 'Human-readable source text stored on disk. Still contains preprocessor directives and comments.',
    hardwareView: 'Stored as file bytes on disk (e.g. ASCII characters in flash memory).'
  },
  {
    id: 'preprocessor',
    name: '2. Preprocessor',
    tool: 'cpp / gcc -E',
    input: 'hello.c',
    output: 'hello.i (Expanded C Source)',
    description: 'Strips comments, replaces #include with full header declarations, and expands #define macros.',
    hardwareView: 'Massive in-memory text expansion (~800 to 20,000 lines of standard declarations).'
  },
  {
    id: 'compiler',
    name: '3. Compiler',
    tool: 'cc1 / gcc -S',
    input: 'hello.i',
    output: 'hello.s (x86-64 / ARM Assembly)',
    description: 'Parses Abstract Syntax Tree (AST), performs type checks, semantic analysis, and generates native CPU assembly instructions.',
    hardwareView: 'Generates symbolic CPU mnemonics: mov, add, sub, lea, call, jmp, ret.'
  },
  {
    id: 'assembler',
    name: '4. Assembler',
    tool: 'as / gcc -c',
    input: 'hello.s',
    output: 'hello.o (Relocatable Machine Code)',
    description: 'Converts assembly instructions into pure machine binary opcodes (ELF or PE format) with symbol relocation tables.',
    hardwareView: 'Pure 0s and 1s binary bytes (e.g. 0x48 0x89 0xE5 for mov rbp, rsp). Undefined external references leave placeholder holes.'
  },
  {
    id: 'linker',
    name: '5. Linker',
    tool: 'ld / gcc',
    input: 'hello.o + libc.a / libc.so',
    output: 'program.exe / a.out',
    description: 'Combines your object files with C standard library (libc) implementations. Resolves function calls like printf into actual executable virtual memory addresses.',
    hardwareView: 'Final executable binary loaded by OS kernel into Virtual Address Space (.text, .rodata, .data segments).'
  }
];

export const CompilationPipelineVisualizer: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const handleRunFullPipeline = () => {
    setIsRunning(true);
    setActiveStage(0);
    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current < STAGES.length) {
        setActiveStage(current);
      } else {
        clearInterval(interval);
        setIsRunning(false);
      }
    }, 1200);
  };

  const current = STAGES[activeStage];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-slate-100 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2 text-indigo-400">
            <Cpu className="w-5 h-5 text-indigo-400" />
            Under The Hood: Compilation & Linking Pipeline
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Click any phase or run the full pipeline to see how C code transforms into machine voltage instructions.
          </p>
        </div>
        <button
          onClick={handleRunFullPipeline}
          disabled={isRunning}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
        >
          {isRunning ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-white" />}
          {isRunning ? 'Compiling...' : 'Run Pipeline'}
        </button>
      </div>

      {/* Stepper Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-6">
        {STAGES.map((stage, idx) => {
          const isActive = idx === activeStage;
          const isPassed = idx < activeStage;
          return (
            <button
              key={stage.id}
              onClick={() => setActiveStage(idx)}
              className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                isActive
                  ? 'bg-indigo-950/60 border-indigo-500 text-white shadow-md shadow-indigo-950/50'
                  : isPassed
                  ? 'bg-slate-800/80 border-slate-700 text-slate-300'
                  : 'bg-slate-900/50 border-slate-800 text-slate-500 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono mb-1">
                <span>{stage.name.split('.')[0]}</span>
                {isPassed && <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />}
              </div>
              <div className="font-semibold text-xs truncate">{stage.name.split('. ')[1]}</div>
              <div className="text-[10px] text-slate-400 font-mono mt-1 truncate">{stage.tool}</div>
            </button>
          );
        })}
      </div>

      {/* Active Stage Details */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950/70 border border-slate-800 p-5 rounded-lg"
        >
          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-900/50 text-indigo-300 border border-indigo-700/50">
                Phase {activeStage + 1} of 5: {current.tool}
              </span>
              <h4 className="text-base font-bold text-slate-100 mt-2">{current.name}</h4>
              <p className="text-sm text-slate-300 mt-1 leading-relaxed">{current.description}</p>
            </div>

            <div className="bg-slate-900/90 rounded border border-slate-800 p-3 text-xs space-y-2 font-mono">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Input Artifact:</span>
                <span className="text-amber-400">{current.input}</span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-800 pt-2">
                <span className="text-slate-400">Produced Output:</span>
                <span className="text-emerald-400 font-semibold">{current.output}</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800/80 rounded p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                <Layers className="w-4 h-4 text-amber-400" />
                Physical Hardware & Memory Behavior
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">{current.hardwareView}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Need more details?</span>
              <div className="flex items-center gap-1 text-indigo-400 font-semibold">
                <span>Inspect Object Symbols</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
