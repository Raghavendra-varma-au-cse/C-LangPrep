'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Locate, ArrowRight, Eye, Edit3, ShieldAlert } from 'lucide-react';

export const PointerInspectorVisualizer: React.FC = () => {
  const [targetValue, setTargetValue] = useState<number>(42);
  const [pointerOffset, setPointerOffset] = useState<number>(0); // 0 means pointing to target, 1 means +1 offset
  const [newValueInput, setNewValueInput] = useState<string>('99');

  const targetAddress = '0x7FFF10';
  const nextAddress = '0x7FFF14';
  const currentPointingAddress = pointerOffset === 0 ? targetAddress : nextAddress;

  const handleDereferenceWrite = () => {
    const num = parseInt(newValueInput, 10);
    if (!isNaN(num) && pointerOffset === 0) {
      setTargetValue(num);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-slate-100 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2 text-rose-400">
            <Locate className="w-5 h-5 text-rose-400" />
            Pointers &amp; Address Dereferencing Inspector
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            A pointer is just an integer that stores another variable&apos;s memory coordinate. Dereferencing (<code className="text-rose-300 font-mono">*ptr</code>) visits and updates the target box.
          </p>
        </div>
      </div>

      {/* Visual Memory Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Pointer Variable */}
        <div className="p-4 rounded-xl border border-rose-500/50 bg-rose-950/20">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span>Pointer Variable: <code className="text-rose-400 font-bold">int *ptr</code></span>
            <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded">Address: 0x7FFF28 (8 Bytes)</span>
          </div>

          <div className="p-3 bg-slate-950/90 border border-dashed border-rose-600/60 rounded-lg text-center my-3">
            <div className="text-[10px] text-slate-400 font-mono">Value Stored Inside ptr:</div>
            <div className="text-xl font-bold font-mono text-rose-400 mt-1">{currentPointingAddress}</div>
            <div className="text-[10px] text-slate-500 font-mono mt-1">Points to: {pointerOffset === 0 ? 'target' : 'Unknown Adjacent RAM'}</div>
          </div>

          <div className="flex items-center justify-between gap-2 mt-4 text-xs font-mono">
            <button
              onClick={() => setPointerOffset(0)}
              className={`flex-1 py-1.5 px-2 rounded border cursor-pointer ${
                pointerOffset === 0
                  ? 'bg-rose-600 text-white border-rose-500 font-semibold'
                  : 'bg-slate-800 text-slate-300 border-slate-700'
              }`}
            >
              ptr = &amp;target
            </button>
            <button
              onClick={() => setPointerOffset(1)}
              className={`flex-1 py-1.5 px-2 rounded border cursor-pointer ${
                pointerOffset === 1
                  ? 'bg-amber-600 text-white border-amber-500 font-semibold'
                  : 'bg-slate-800 text-slate-300 border-slate-700'
              }`}
            >
              ptr = ptr + 1 (+4B)
            </button>
          </div>
        </div>

        {/* Target Memory Slot */}
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span>Target Memory Box: <code className="text-emerald-400 font-bold">int target</code></span>
            <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded">Address: {targetAddress} (4 Bytes)</span>
          </div>

          <div className="p-3 bg-slate-900 border border-slate-700 rounded-lg text-center my-3">
            <div className="text-[10px] text-slate-400 font-mono">Payload in DRAM Cell:</div>
            <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">{targetValue}</div>
            <div className="text-[10px] text-slate-500 font-mono mt-1">&amp;target == 0x7FFF10</div>
          </div>

          {pointerOffset === 0 ? (
            <div className="flex items-center gap-2 mt-3">
              <input
                type="number"
                value={newValueInput}
                onChange={(e) => setNewValueInput(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-white font-mono w-28 focus:outline-none focus:border-rose-500"
              />
              <button
                onClick={handleDereferenceWrite}
                className="px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded text-xs font-semibold cursor-pointer flex items-center gap-1"
              >
                <Edit3 className="w-3.5 h-3.5" />
                *ptr = value;
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 p-2 bg-amber-950/40 border border-amber-800/60 rounded text-amber-300 text-xs">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>Warning: Pointer shifted past target! Dereferencing adjacent memory leads to undefined behavior.</span>
            </div>
          )}
        </div>
      </div>

      {/* Code Analogy Strip */}
      <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl text-xs font-mono">
        <div className="text-slate-400 mb-1">Code &amp; Memory Translation:</div>
        <div className="text-slate-200 font-mono text-xs leading-relaxed">
          <span className="text-slate-500">// 1. Reading address:</span><br />
          <span className="text-emerald-400">printf(&quot;%p&quot;, (void*)ptr);</span> &rarr; Prints <span className="text-rose-400">{currentPointingAddress}</span><br />
          <span className="text-slate-500">// 2. Dereferencing to read:</span><br />
          <span className="text-emerald-400">printf(&quot;%d&quot;, *ptr);</span> &rarr; {pointerOffset === 0 ? `Reads ${targetValue} from target` : 'Reads garbage bits from 0x7FFF14'}<br />
          <span className="text-slate-500">// 3. Dereferencing to write:</span><br />
          <span className="text-rose-400">*ptr = {newValueInput};</span> &rarr; Directly alters memory at address {currentPointingAddress}!
        </div>
      </div>
    </div>
  );
};
