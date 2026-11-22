'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, ShieldCheck, Database, FileText, ArrowDown, ArrowUp, Cpu, Info } from 'lucide-react';

interface SegmentInfo {
  id: string;
  name: string;
  virtualAddressRange: string;
  direction: 'down' | 'up' | 'fixed';
  protection: string;
  description: string;
  whatLivesHere: string[];
  hardwareDetails: string;
}

const MEMORY_SEGMENTS: SegmentInfo[] = [
  {
    id: 'kernel',
    name: 'Kernel Space (High Memory)',
    virtualAddressRange: '0xFFFF800000000000 - 0xFFFFFFFFFFFFFFFF',
    direction: 'fixed',
    protection: 'Ring 0 (Supervisor Only - Read/Write by OS Kernel)',
    description: 'Reserved for OS kernel code, page tables, hardware drivers, and interrupt service routines. User programs attempting to read or write here trigger an instant SIGSEGV (Segmentation Fault).',
    whatLivesHere: [
      'OS Kernel code and scheduler',
      'Device driver binaries',
      'Physical page frame allocators',
      'Interrupt Vector Table (IVT)'
    ],
    hardwareDetails: 'Enforced by CPU MMU (Memory Management Unit) hardware privilege level rings.'
  },
  {
    id: 'stack',
    name: 'User Stack Segment',
    virtualAddressRange: '0x7FFFFFFFE000 (Grows Downward &darr;)',
    direction: 'down',
    protection: 'Ring 3 (Read / Write / No Execute via DEP/NX bit)',
    description: 'Stores function call stack frames, return addresses, saved registers, and local automatic variables. Stack pointer (RSP) decrements as functions are called and increments as functions return.',
    whatLivesHere: [
      'Local variables (e.g., int age, char buffer[64])',
      'Function parameters passed to subroutines',
      'CPU Return Addresses (where to jump after ret)',
      'Saved Frame Pointer (RBP)'
    ],
    hardwareDetails: 'Fastest memory access (L1 cache hits). Bounded in size (default 8MB on Linux, 1MB on Windows). Exceeding this limit causes Stack Overflow.'
  },
  {
    id: 'gap',
    name: 'Unmapped Virtual Address Space (The Gap)',
    virtualAddressRange: 'Dynamically sized between Stack and Heap',
    direction: 'fixed',
    protection: 'Unmapped (No physical RAM mapped)',
    description: 'The vast empty chasm in 64-bit address space. Allows the Stack to grow downward and the Heap to grow upward without colliding.',
    whatLivesHere: ['Shared memory libraries (.so / .dll) mapped via mmap()'],
    hardwareDetails: 'Pages are demand-paged by the OS page-fault handler upon first access.'
  },
  {
    id: 'heap',
    name: 'Heap Segment',
    virtualAddressRange: '0x0000000100000000 (Grows Upward &uarr;)',
    direction: 'up',
    protection: 'Ring 3 (Read / Write / No Execute)',
    description: 'Dynamic memory allocated at runtime via malloc(), calloc(), and realloc(). Managed by the C runtime allocator and extended via the brk() and sbrk() kernel syscalls.',
    whatLivesHere: [
      'Dynamically sized arrays (int *arr = malloc(n * sizeof(int)))',
      'Linked lists, Binary Trees, Graph nodes',
      'Long-lived buffers that survive function returns'
    ],
    hardwareDetails: 'Must be explicitly released with free(). Forgetting to free causes memory leaks; using after free causes use-after-free exploits.'
  },
  {
    id: 'bss',
    name: '.bss Segment (Block Started by Symbol)',
    virtualAddressRange: 'Static segment adjacent to Data',
    direction: 'fixed',
    protection: 'Ring 3 (Read / Write)',
    description: 'Stores uninitialized global and static variables. Does NOT take physical space in the executable file on disk—the OS loader simply allocates zeroed RAM pages at process startup.',
    whatLivesHere: [
      'Uninitialized globals: int global_counter;',
      'Static uninitialized variables: static int runs;',
      'All variables here are guaranteed to start at 0 / NULL'
    ],
    hardwareDetails: 'Zeroed page optimization: OS maps copy-on-write zero pages to save physical DRAM.'
  },
  {
    id: 'data',
    name: '.data Segment (Initialized Data)',
    virtualAddressRange: 'Static segment adjacent to Text',
    direction: 'fixed',
    protection: 'Ring 3 (Read / Write)',
    description: 'Stores explicitly initialized global and static variables. Stored directly within the compiled ELF/PE binary file on disk and loaded into RAM at execution start.',
    whatLivesHere: [
      'Initialized globals: int max_users = 500;',
      'Static initialized variables: static int initialized = 1;'
    ],
    hardwareDetails: 'Persists in memory for the entire lifecycle of the program process.'
  },
  {
    id: 'rodata',
    name: '.rodata Segment (Read-Only Data)',
    virtualAddressRange: 'Static read-only segment',
    direction: 'fixed',
    protection: 'Ring 3 (Read Only)',
    description: 'Stores constant global values, string literals, and switch jump tables. Writing to this segment triggers an immediate MMU hardware write fault (Segmentation Fault).',
    whatLivesHere: [
      'String literals: printf("Hello World\\n"); ("Hello World\\n" is in .rodata)',
      'const qualified variables: const double PI = 3.14159;'
    ],
    hardwareDetails: 'Hardware write-protected by the MMU page table entry flags.'
  },
  {
    id: 'text',
    name: '.text Segment (Code / Machine Instructions)',
    virtualAddressRange: '0x0000000000400000 (Low Memory)',
    direction: 'fixed',
    protection: 'Ring 3 (Read / Execute - No Write)',
    description: 'Contains the raw compiled machine binary opcodes executed by the CPU instruction pipeline. Marked read-only to prevent programs from accidentally or maliciously modifying their own code.',
    whatLivesHere: [
      'Machine code opcodes for all functions: main(), printf(), myFunc()',
      'CPU Instructions: MOV, ADD, JMP, CALL, RET'
    ],
    hardwareDetails: 'Cached directly in the CPU L1 Instruction Cache (L1i) for blazing throughput.'
  }
];

export const VirtualMemoryMapVisualizer: React.FC = () => {
  const [selectedSegmentId, setSelectedSegmentId] = useState<string>('stack');

  const selected = MEMORY_SEGMENTS.find((s) => s.id === selectedSegmentId) || MEMORY_SEGMENTS[1];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-bold flex items-center gap-2 text-indigo-400">
            <Layers className="w-5 h-5 text-indigo-400" />
            Under The Hood: 64-Bit Virtual Memory Address Space
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Every running C program is given its own 48-bit / 64-bit Virtual Address Space by the OS and Hardware MMU.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Memory Tower (5 cols) */}
        <div className="lg:col-span-5 flex flex-col space-y-1.5 font-mono text-xs">
          <div className="text-[10px] text-slate-500 uppercase tracking-wider text-center pb-1">
            High Memory Address (0xFFFFFFFFFFFFFFFF)
          </div>

          {MEMORY_SEGMENTS.map((seg) => {
            const isSelected = seg.id === selectedSegmentId;
            let bgClass = 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700';

            if (seg.id === 'kernel') bgClass = isSelected ? 'bg-rose-950/70 border-rose-500 text-rose-300' : 'bg-rose-950/30 border-rose-900/60 text-rose-400';
            else if (seg.id === 'stack') bgClass = isSelected ? 'bg-sky-950/70 border-sky-500 text-sky-300' : 'bg-sky-950/30 border-sky-900/60 text-sky-400';
            else if (seg.id === 'gap') bgClass = isSelected ? 'bg-slate-900/90 border-slate-600 text-slate-400' : 'bg-slate-950/40 border-slate-800/60 text-slate-500';
            else if (seg.id === 'heap') bgClass = isSelected ? 'bg-emerald-950/70 border-emerald-500 text-emerald-300' : 'bg-emerald-950/30 border-emerald-900/60 text-emerald-400';
            else if (seg.id === 'data' || seg.id === 'bss') bgClass = isSelected ? 'bg-amber-950/70 border-amber-500 text-amber-300' : 'bg-amber-950/30 border-amber-900/60 text-amber-400';
            else if (seg.id === 'text' || seg.id === 'rodata') bgClass = isSelected ? 'bg-indigo-950/70 border-indigo-500 text-indigo-300' : 'bg-indigo-950/30 border-indigo-900/60 text-indigo-400';

            return (
              <button
                key={seg.id}
                onClick={() => setSelectedSegmentId(seg.id)}
                className={`p-3 rounded-lg border text-left cursor-pointer transition flex items-center justify-between ${bgClass} ${
                  isSelected ? 'shadow-lg ring-1 ring-white/20' : ''
                }`}
              >
                <div className="flex items-center gap-2">
                  {seg.direction === 'down' && <ArrowDown className="w-3.5 h-3.5 text-sky-400 shrink-0" />}
                  {seg.direction === 'up' && <ArrowUp className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                  <span className="font-semibold text-xs">{seg.name}</span>
                </div>
                <span className="text-[10px] opacity-75 truncate max-w-[120px] font-mono">
                  {seg.virtualAddressRange.split(' ')[0]}
                </span>
              </button>
            );
          })}

          <div className="text-[10px] text-slate-500 uppercase tracking-wider text-center pt-1">
            Low Memory Address (0x0000000000000000)
          </div>
        </div>

        {/* Detailed Segment Inspector (7 cols) */}
        <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
              className="space-y-4"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-900/50 text-indigo-300 border border-indigo-700/50">
                    Segment Detail
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    Virtual Address: {selected.virtualAddressRange}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-white mt-2">{selected.name}</h4>
                <div className="text-xs font-mono text-amber-400 mt-0.5">
                  Protection: {selected.protection}
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {selected.description}
              </p>

              {/* What lives here */}
              <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-lg space-y-2">
                <div className="text-xs font-semibold text-slate-200 flex items-center gap-1.5 font-mono">
                  <Database className="w-3.5 h-3.5 text-indigo-400" />
                  What Physical Data Lives Here:
                </div>
                <div className="space-y-1">
                  {selected.whatLivesHere.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <span className="text-indigo-400 font-mono">&rarr;</span>
                      <span className="font-mono text-[11px]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hardware MMU Behavior */}
              <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-lg text-xs space-y-1">
                <div className="text-slate-400 font-mono text-[11px] flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                  Hardware Architecture &amp; Silicon Notes:
                </div>
                <p className="text-slate-300 font-sans text-[11px] leading-relaxed">
                  {selected.hardwareDetails}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] font-mono text-slate-500 flex items-center justify-between">
            <span>Segment Selected: {selected.name}</span>
            <span>MMU Virtual Page Translation</span>
          </div>
        </div>
      </div>
    </div>
  );
};
