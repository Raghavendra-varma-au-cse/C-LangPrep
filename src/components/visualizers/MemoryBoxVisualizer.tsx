'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Box, Binary, Hash, RefreshCcw } from 'lucide-react';

interface VariableBox {
  name: string;
  type: 'char' | 'short' | 'int' | 'float' | 'double';
  bytes: number;
  value: string | number;
  address: string;
  binaryRepresentation: string;
}

const DEFAULT_VARIABLES: VariableBox[] = [
  {
    name: 'grade',
    type: 'char',
    bytes: 1,
    value: "'A'",
    address: '0x7FFEE0',
    binaryRepresentation: '01000001 (ASCII 65)'
  },
  {
    name: 'age',
    type: 'int',
    bytes: 4,
    value: '20',
    address: '0x7FFEE4',
    binaryRepresentation: '00000000 00000000 00000000 00010100'
  },
  {
    name: 'gpa',
    type: 'float',
    bytes: 4,
    value: '3.85',
    address: '0x7FFEE8',
    binaryRepresentation: '01000000 01110110 01100110 01100110'
  },
  {
    name: 'timestamp',
    type: 'double',
    bytes: 8,
    value: '1732252800.0',
    address: '0x7FFEF0',
    binaryRepresentation: '01000001 11011001 11001101 ... (64 bits)'
  }
];

export const MemoryBoxVisualizer: React.FC = () => {
  const [variables, setVariables] = useState<VariableBox[]>(DEFAULT_VARIABLES);
  const [selectedIdx, setSelectedIdx] = useState<number>(1);
  const [customValue, setCustomValue] = useState<string>('25');

  const selectedVar = variables[selectedIdx];

  const handleUpdateValue = () => {
    if (!customValue.trim()) return;
    const updated = [...variables];
    const target = updated[selectedIdx];

    if (target.type === 'int') {
      const num = parseInt(customValue, 10) || 0;
      target.value = num;
      // Convert to 32-bit binary representation
      const bin = (num >>> 0).toString(2).padStart(32, '0');
      target.binaryRepresentation = `${bin.slice(0, 8)} ${bin.slice(8, 16)} ${bin.slice(16, 24)} ${bin.slice(24, 32)}`;
    } else if (target.type === 'char') {
      const char = customValue[0] || 'A';
      target.value = `'${char}'`;
      const ascii = char.charCodeAt(0);
      target.binaryRepresentation = `${ascii.toString(2).padStart(8, '0')} (ASCII ${ascii})`;
    } else {
      target.value = customValue;
    }
    setVariables(updated);
  };

  const handleReset = () => {
    setVariables(DEFAULT_VARIABLES);
    setCustomValue('25');
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-slate-100 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2 text-emerald-400">
            <Box className="w-5 h-5 text-emerald-400" />
            Interactive RAM Memory Boxes
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            A variable is a physical labeled container in RAM with an exact byte size and hexadecimal memory address.
          </p>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded border border-slate-700 transition cursor-pointer"
        >
          <RefreshCcw className="w-3.5 h-3.5" />
          Reset Memory
        </button>
      </div>

      {/* Visual Memory Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {variables.map((v, idx) => {
          const isSelected = idx === selectedIdx;
          return (
            <motion.div
              key={v.name}
              whileHover={{ scale: 1.02 }}
              onClick={() => {
                setSelectedIdx(idx);
                setCustomValue(String(v.value).replace(/'/g, ''));
              }}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                isSelected
                  ? 'bg-emerald-950/40 border-emerald-500 shadow-lg shadow-emerald-950/40 ring-1 ring-emerald-500'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                <span className="flex items-center gap-1 text-slate-400">
                  <Hash className="w-3 h-3 text-emerald-400" />
                  {v.address}
                </span>
                <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] uppercase font-semibold">
                  {v.bytes} {v.bytes === 1 ? 'Byte' : 'Bytes'}
                </span>
              </div>

              {/* The "Box" representation */}
              <div className="border border-dashed border-slate-700 bg-slate-900/80 rounded-lg p-3 text-center my-2">
                <div className="text-[11px] font-mono text-indigo-400">{v.type} {v.name};</div>
                <div className="text-xl font-bold text-white mt-1 font-mono tracking-tight">{String(v.value)}</div>
              </div>

              <div className="text-[10px] text-slate-500 font-mono truncate mt-2">
                &amp;{v.name} = {v.address}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Interactive Controller / Deep Dive */}
      <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-slate-800 mb-3">
          <div className="text-xs font-mono text-slate-300">
            Selected: <span className="text-emerald-400 font-bold">{selectedVar.type} {selectedVar.name}</span> (Size: {selectedVar.bytes} Bytes at Address <span className="text-amber-400">{selectedVar.address}</span>)
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={customValue}
              onChange={(e) => setCustomValue(e.target.value)}
              placeholder="New value"
              className="bg-slate-900 border border-slate-700 rounded px-3 py-1 text-xs text-white font-mono focus:outline-none focus:border-emerald-500 w-32"
            />
            <button
              onClick={handleUpdateValue}
              className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-semibold cursor-pointer"
            >
              Write to RAM
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div>
            <div className="text-slate-400 flex items-center gap-1.5 mb-1">
              <Binary className="w-3.5 h-3.5 text-indigo-400" />
              Raw Silicon Bit Pattern (Registers / DRAM):
            </div>
            <div className="p-2.5 bg-slate-900 border border-slate-800 rounded text-indigo-300 break-all leading-relaxed">
              {selectedVar.binaryRepresentation}
            </div>
          </div>
          <div>
            <div className="text-slate-400 mb-1">How C handles this in hardware:</div>
            <p className="text-slate-300 font-sans leading-relaxed text-[11px]">
              When you write <code className="text-emerald-400 font-mono">{selectedVar.name} = {String(selectedVar.value)}</code>, the CPU loads this numeric pattern into a CPU register and uses a hardware <code className="text-amber-400 font-mono">MOV</code> instruction to write across the data bus into memory cell <code className="text-amber-400 font-mono">{selectedVar.address}</code>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
