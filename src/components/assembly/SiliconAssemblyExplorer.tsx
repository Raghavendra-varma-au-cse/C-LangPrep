'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Binary, ArrowRight, Cpu, Eye, Sparkles, Layers, RefreshCw } from 'lucide-react';

interface MappingItem {
  id: string;
  title: string;
  cCode: string;
  assemblyOpcodes: {
    asmLine: string;
    explanation: string;
    hardwareImpact: string;
  }[];
  cpuRegistersUsed: string[];
  takeaway: string;
}

const DISASSEMBLY_SNIPPETS: MappingItem[] = [
  {
    id: 'add-arithmetic',
    title: '1. Integer Addition: c = a + b',
    cCode: `int add(int a, int b) {
    int sum = a + b;
    return sum;
}`,
    assemblyOpcodes: [
      {
        asmLine: 'push    rbp',
        explanation: 'Saves caller base pointer onto Stack frame.',
        hardwareImpact: 'RSP decrements by 8 bytes; old RBP written to stack.'
      },
      {
        asmLine: 'mov     rbp, rsp',
        explanation: 'Establishes new Stack Frame baseline for add().',
        hardwareImpact: 'RBP now points to current stack head.'
      },
      {
        asmLine: 'mov     DWORD PTR [rbp-4], edi',
        explanation: 'Stores 1st argument (a) from register EDI into stack slot.',
        hardwareImpact: 'DRAM stack memory at [RBP-4] updated with variable a.'
      },
      {
        asmLine: 'mov     DWORD PTR [rbp-8], esi',
        explanation: 'Stores 2nd argument (b) from register ESI into stack slot.',
        hardwareImpact: 'DRAM stack memory at [RBP-8] updated with variable b.'
      },
      {
        asmLine: 'mov     edx, DWORD PTR [rbp-4]',
        explanation: 'Loads a into temporary ALU register EDX.',
        hardwareImpact: 'EDX register loaded with a.'
      },
      {
        asmLine: 'mov     eax, DWORD PTR [rbp-8]',
        explanation: 'Loads b into primary accumulator register EAX.',
        hardwareImpact: 'EAX register loaded with b.'
      },
      {
        asmLine: 'add     eax, edx',
        explanation: 'ALU hardware adds EDX into EAX: EAX = a + b.',
        hardwareImpact: 'ALU executes integer adder logic circuits in 1 clock cycle.'
      },
      {
        asmLine: 'pop     rbp; ret',
        explanation: 'Restores old RBP frame and pops return address into RIP.',
        hardwareImpact: 'CPU jumps back to caller; return value ready in EAX register!'
      }
    ],
    cpuRegistersUsed: ['RBP', 'RSP', 'EDI (param 1)', 'ESI (param 2)', 'EAX (return reg)', 'EDX'],
    takeaway: 'Function return values in C are placed into CPU register EAX/RAX.'
  },
  {
    id: 'if-branch',
    title: '2. Branch Condition: if (x > 10) return 1; else return 0;',
    cCode: `int checkLimit(int x) {
    if (x > 10) {
        return 1;
    }
    return 0;
}`,
    assemblyOpcodes: [
      {
        asmLine: 'cmp     DWORD PTR [rbp-4], 10',
        explanation: 'ALU performs subtraction (x - 10) without writing result, setting EFLAGS.',
        hardwareImpact: 'Zero Flag (ZF) and Sign Flag (SF) set in CPU EFLAGS register.'
      },
      {
        asmLine: 'jle     .L2',
        explanation: 'Jump if Less or Equal: If x <= 10, jumps over the "return 1" branch.',
        hardwareImpact: 'Branch predictor checks history; modifies Instruction Pointer (RIP).'
      },
      {
        asmLine: 'mov     eax, 1',
        explanation: 'Condition was TRUE! Loads 1 into return register EAX.',
        hardwareImpact: 'EAX = 1'
      },
      {
        asmLine: 'jmp     .L3',
        explanation: 'Unconditional jump to function epilogue (skips false branch).',
        hardwareImpact: 'RIP jumps straight to exit.'
      },
      {
        asmLine: '.L2: mov eax, 0',
        explanation: 'Target label for False branch: Loads 0 into return register EAX.',
        hardwareImpact: 'EAX = 0'
      },
      {
        asmLine: '.L3: ret',
        explanation: 'Returns control to caller with EAX holding 1 or 0.',
        hardwareImpact: 'Pops return RIP.'
      }
    ],
    cpuRegistersUsed: ['EFLAGS (ZF, SF, OF)', 'EDI (param x)', 'EAX (result)', 'RIP (Instruction Pointer)'],
    takeaway: 'If-else statements compile into hardware CMP comparisons followed by conditional jump (JLE/JNE/JE) instructions.'
  },
  {
    id: 'pointer-dereference',
    title: '3. Pointer Mutation: *ptr = 99;',
    cCode: `void updateMemory(int *ptr) {
    *ptr = 99;
}`,
    assemblyOpcodes: [
      {
        asmLine: 'mov     QWORD PTR [rbp-8], rdi',
        explanation: 'RDI contains the 64-bit memory address passed as pointer.',
        hardwareImpact: 'Pointer variable stored in local stack frame.'
      },
      {
        asmLine: 'mov     rax, QWORD PTR [rbp-8]',
        explanation: 'Loads 64-bit target address into pointer register RAX.',
        hardwareImpact: 'RAX now contains target memory address (e.g. 0x7FFEE4).'
      },
      {
        asmLine: 'mov     DWORD PTR [rax], 99',
        explanation: 'Indirect Memory Store: Writes 4-byte integer 99 directly into RAM at [RAX].',
        hardwareImpact: 'Memory bus sends 99 across data bus into the capacitor cells at address in RAX!'
      },
      {
        asmLine: 'ret',
        explanation: 'Returns void to caller.',
        hardwareImpact: 'Stack frame popped.'
      }
    ],
    cpuRegistersUsed: ['RDI (64-bit address param)', 'RAX (64-bit address register)', 'RSP', 'RBP'],
    takeaway: 'Dereferencing (*ptr) compiles into indirect bracket addressing: mov [rax], value.'
  }
];

export const SiliconAssemblyExplorer: React.FC = () => {
  const [selectedSnippetIdx, setSelectedSnippetIdx] = useState<number>(0);
  const [activeAsmIdx, setActiveAsmIdx] = useState<number>(0);

  const currentSnippet = DISASSEMBLY_SNIPPETS[selectedSnippetIdx];
  const activeOpcode = currentSnippet.assemblyOpcodes[activeAsmIdx] || currentSnippet.assemblyOpcodes[0];

  const handleSelectSnippet = (idx: number) => {
    setSelectedSnippetIdx(idx);
    setActiveAsmIdx(0);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl text-slate-100">
      <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-bold text-white tracking-tight">
              C to x86-64 Assembly Disassembly Visualizer
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Click any assembly instruction to see exactly which CPU registers, flags, and buses fire in silicon.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {DISASSEMBLY_SNIPPETS.map((snip, idx) => {
            const isSelected = idx === selectedSnippetIdx;
            return (
              <button
                key={snip.id}
                onClick={() => handleSelectSnippet(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono shrink-0 cursor-pointer transition ${
                  isSelected
                    ? 'bg-indigo-950 text-indigo-300 border border-indigo-500 font-semibold shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {snip.title.split('. ')[1].split(':')[0]}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
        {/* Left C Code & Register Strip (4 cols) */}
        <div className="lg:col-span-4 bg-slate-950/80 border-b lg:border-b-0 lg:border-r border-slate-800 p-4 space-y-4 flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>High-Level C Code</span>
              <span className="text-indigo-400">gcc -O0 -S</span>
            </div>
            <pre className="p-3 bg-slate-900 border border-slate-800 rounded-lg font-mono text-xs text-indigo-300 leading-relaxed overflow-x-auto">
              {currentSnippet.cCode}
            </pre>
          </div>

          <div className="space-y-2">
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
              Hardware Registers Involved:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {currentSnippet.cpuRegistersUsed.map((reg, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-amber-400"
                >
                  {reg}
                </span>
              ))}
            </div>
          </div>

          <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg text-xs">
            <div className="font-semibold text-emerald-400 flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              Key Hardware Rule:
            </div>
            <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
              {currentSnippet.takeaway}
            </p>
          </div>
        </div>

        {/* Center Assembly Opcode Stream (4 cols) */}
        <div className="lg:col-span-4 bg-slate-950 border-b lg:border-b-0 lg:border-r border-slate-800 p-4 font-mono text-xs flex flex-col">
          <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>x86-64 Assembly Opcodes</span>
            <span className="text-slate-500">Click row to inspect</span>
          </div>

          <div className="space-y-1.5 flex-1">
            {currentSnippet.assemblyOpcodes.map((op, idx) => {
              const isActive = idx === activeAsmIdx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveAsmIdx(idx)}
                  className={`p-2.5 rounded-lg border cursor-pointer transition flex items-center justify-between ${
                    isActive
                      ? 'bg-indigo-950/70 border-indigo-500 text-white shadow-md'
                      : 'bg-slate-900/60 border-slate-800/80 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span className="font-bold text-amber-300">{op.asmLine}</span>
                  <ArrowRight className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-400' : 'text-slate-600'}`} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Hardware Silicon Breakdown (4 cols) */}
        <div className="lg:col-span-4 bg-slate-950/90 p-5 flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeAsmIdx}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
              className="space-y-4"
            >
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-900/50 text-indigo-300 border border-indigo-700/50">
                  Instruction Inspector
                </span>
                <div className="mt-2 font-mono text-sm text-amber-300 bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                  <code>{activeOpcode.asmLine}</code>
                </div>
              </div>

              <div className="p-3.5 bg-slate-900/80 border border-slate-800 rounded-xl space-y-1">
                <div className="text-xs font-semibold text-slate-200 font-mono flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-indigo-400" />
                  What this instruction does:
                </div>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  {activeOpcode.explanation}
                </p>
              </div>

              <div className="p-3.5 bg-slate-900/80 border border-slate-800 rounded-xl space-y-1">
                <div className="text-xs font-semibold text-emerald-400 font-mono flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-emerald-400" />
                  Hardware &amp; Silicon Impact:
                </div>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  {activeOpcode.hardwareImpact}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] font-mono text-slate-500 flex items-center justify-between">
            <span>Instruction {activeAsmIdx + 1} of {currentSnippet.assemblyOpcodes.length}</span>
            <span>Bare-Metal Intel/AMD Silicon</span>
          </div>
        </div>
      </div>
    </div>
  );
};
