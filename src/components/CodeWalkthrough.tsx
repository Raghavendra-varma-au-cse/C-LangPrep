'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CodeLineExplanation } from '@/types/course';
import { Code, Eye, Layers, HelpCircle, Check, Info } from 'lucide-react';

interface CodeWalkthroughProps {
  lines: CodeLineExplanation[];
}

export const CodeWalkthrough: React.FC<CodeWalkthroughProps> = ({ lines }) => {
  const [activeLineIdx, setActiveLineIdx] = useState<number>(0);

  const activeLine = lines[activeLineIdx] || lines[0];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl text-slate-100">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-slate-950 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Code className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
            Interactive Line-By-Line Silicon Inspector
          </span>
        </div>
        <span className="text-[11px] text-slate-400 font-mono">
          Click any line to dissect its hardware &amp; real-world meaning
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Code View (7 cols) */}
        <div className="lg:col-span-7 font-mono text-xs overflow-x-auto bg-slate-950/80 p-4 border-b lg:border-b-0 lg:border-r border-slate-800">
          <div className="space-y-1">
            {lines.map((line, idx) => {
              const isActive = idx === activeLineIdx;
              return (
                <div
                  key={line.lineNum}
                  onClick={() => setActiveLineIdx(idx)}
                  className={`flex items-start gap-3 px-3 py-1.5 rounded cursor-pointer transition-colors ${
                    isActive
                      ? 'bg-indigo-950/70 border-l-2 border-indigo-400 text-white font-semibold'
                      : 'hover:bg-slate-900/60 text-slate-300'
                  }`}
                >
                  <span className="text-slate-600 select-none text-[10px] w-5 text-right font-mono">
                    {line.lineNum}
                  </span>
                  <pre className="font-mono text-xs whitespace-pre break-all">{line.code}</pre>
                </div>
              );
            })}
          </div>
        </div>

        {/* Deep Breakdown Panel (5 cols) */}
        <div className="lg:col-span-5 p-5 bg-slate-900/90 flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeLine.lineNum}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
              className="space-y-4"
            >
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-900/50 text-indigo-300 border border-indigo-700/50">
                  Line {activeLine.lineNum} Analysis
                </span>
                <div className="mt-2 font-mono text-xs text-amber-300 bg-slate-950 p-2 rounded border border-slate-800">
                  <code>{activeLine.code}</code>
                </div>
              </div>

              {/* Real World Analogy */}
              <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-3">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 mb-1">
                  <Eye className="w-3.5 h-3.5 text-emerald-400" />
                  Real-World Mental Model
                </div>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  {activeLine.realWorldAnalogy}
                </p>
              </div>

              {/* Under the Hood Silicon */}
              <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-3">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-sky-400 mb-1">
                  <Layers className="w-3.5 h-3.5 text-sky-400" />
                  What Happens in Hardware / Compiler
                </div>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  {activeLine.underTheHood}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-500 font-mono flex items-center justify-between">
            <span>Inspecting {activeLineIdx + 1} of {lines.length} lines</span>
            <span>Zero Memorization Policy</span>
          </div>
        </div>
      </div>
    </div>
  );
};
