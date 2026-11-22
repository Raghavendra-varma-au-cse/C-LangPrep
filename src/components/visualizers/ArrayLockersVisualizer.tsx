'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Grid, Hash, ArrowDown } from 'lucide-react';

interface LockerItem {
  index: number;
  value: number;
  offsetBytes: number;
  address: string;
}

export const ArrayLockersVisualizer: React.FC = () => {
  const baseAddress = 0x2000;
  const elementSize = 4; // 4 bytes for int

  const [scores, setScores] = useState<number[]>([85, 92, 78, 96, 64]);
  const [selectedIndex, setSelectedIndex] = useState<number>(1);
  const [editVal, setEditVal] = useState<string>('92');

  const lockers: LockerItem[] = scores.map((val, idx) => ({
    index: idx,
    value: val,
    offsetBytes: idx * elementSize,
    address: `0x${(baseAddress + idx * elementSize).toString(16).toUpperCase()}`
  }));

  const selected = lockers[selectedIndex];

  const handleUpdate = () => {
    const num = parseInt(editVal, 10);
    if (!isNaN(num)) {
      const copy = [...scores];
      copy[selectedIndex] = num;
      setScores(copy);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-slate-100 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2 text-violet-400">
            <Grid className="w-5 h-5 text-violet-400" />
            Contiguous Memory: Numbered Lockers in RAM
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Why does indexing start at 0? Because index is the distance offset: <code className="text-violet-300 font-mono">Address = Base + (index &times; 4)</code>.
          </p>
        </div>
      </div>

      {/* Lockers Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
        {lockers.map((item) => {
          const isSelected = item.index === selectedIndex;
          return (
            <motion.div
              key={item.index}
              whileHover={{ y: -2 }}
              onClick={() => {
                setSelectedIndex(item.index);
                setEditVal(String(item.value));
              }}
              className={`p-3.5 rounded-xl border text-center cursor-pointer transition-all ${
                isSelected
                  ? 'bg-violet-950/50 border-violet-500 shadow-lg ring-1 ring-violet-500'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="text-[10px] font-mono text-slate-400 mb-1 flex items-center justify-center gap-1">
                <Hash className="w-2.5 h-2.5 text-violet-400" />
                {item.address}
              </div>
              <div className="text-xs font-mono text-violet-300 font-semibold">
                scores[{item.index}]
              </div>

              {/* Locker Box */}
              <div className="my-2 py-2 px-3 bg-slate-900 border border-dashed border-slate-700 rounded-lg">
                <div className="text-xl font-bold font-mono text-white">{item.value}</div>
              </div>

              <div className="text-[10px] text-slate-500 font-mono">
                +{item.offsetBytes} bytes
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Math Breakdown */}
      <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-slate-800 mb-3 text-xs font-mono">
          <div className="text-slate-300">
            Selected Locker: <span className="text-violet-400 font-bold">scores[{selected.index}]</span> (Value: {selected.value})
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={editVal}
              onChange={(e) => setEditVal(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded px-3 py-1 text-xs text-white font-mono w-24 focus:outline-none focus:border-violet-500"
            />
            <button
              onClick={handleUpdate}
              className="px-3 py-1 bg-violet-600 hover:bg-violet-500 text-white rounded text-xs font-semibold cursor-pointer"
            >
              Store in Locker
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="space-y-1.5">
            <div className="text-slate-400">Mathematical Address Calculation:</div>
            <div className="p-2.5 bg-slate-900 border border-slate-800 rounded text-violet-300 leading-relaxed">
              Base Address = 0x2000<br />
              Offset = {selected.index} &times; sizeof(int) = {selected.index} &times; 4 = +{selected.offsetBytes} bytes<br />
              Target Address = 0x2000 + {selected.offsetBytes} = <strong className="text-emerald-400">{selected.address}</strong>
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="text-slate-400">Under The Hood Pointer Equivalence:</div>
            <p className="text-slate-300 font-sans text-[11px] leading-relaxed">
              In C, writing <code className="text-violet-400 font-mono">scores[{selected.index}]</code> is translated by the compiler into <code className="text-amber-400 font-mono">*(scores + {selected.index})</code>. The array name <code className="font-mono text-slate-200">scores</code> is simply a pointer to the 0th locker!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
