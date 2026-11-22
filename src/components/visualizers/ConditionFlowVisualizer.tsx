'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GitBranch, Play, CheckCircle2, XCircle } from 'lucide-react';

export const ConditionFlowVisualizer: React.FC = () => {
  const [score, setScore] = useState<number>(75);
  const [evaluatedBranch, setEvaluatedBranch] = useState<'A' | 'Pass' | 'Fail'>('Pass');

  const evaluateCondition = (val: number) => {
    setScore(val);
    if (val >= 90) {
      setEvaluatedBranch('A');
    } else if (val >= 50) {
      setEvaluatedBranch('Pass');
    } else {
      setEvaluatedBranch('Fail');
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-slate-100 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2 text-sky-400">
            <GitBranch className="w-5 h-5 text-sky-400" />
            Control Flow & CPU Branch Evaluation
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Slide the score to watch how the CPU evaluates comparison flags (CMP) and executes conditional jumps (JGE/JL).
          </p>
        </div>
      </div>

      {/* Interactive Slider */}
      <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-xl mb-6">
        <div className="flex items-center justify-between text-xs font-mono mb-2">
          <span className="text-slate-400">Test Input Value: <code className="text-sky-400 font-bold">score = {score}</code></span>
          <span className="text-slate-500">Range: 0 to 100</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={score}
          onChange={(e) => evaluateCondition(parseInt(e.target.value, 10))}
          className="w-full accent-sky-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
        />
        <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
          <span>0 (Fail)</span>
          <span>50 (Pass Threshold)</span>
          <span>90 (Distinction A)</span>
          <span>100</span>
        </div>
      </div>

      {/* Flow Tree Representation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Branch 1 */}
        <div
          className={`p-4 rounded-xl border transition-all ${
            evaluatedBranch === 'A'
              ? 'bg-emerald-950/40 border-emerald-500 shadow-lg ring-1 ring-emerald-500'
              : 'bg-slate-950/40 border-slate-800 opacity-60'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <span className="text-slate-400">if (score &gt;= 90)</span>
            {evaluatedBranch === 'A' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <XCircle className="w-4 h-4 text-slate-600" />
            )}
          </div>
          <div className="text-sm font-bold text-white mb-1">Grade: A (Distinction)</div>
          <div className="text-[11px] font-mono text-slate-400">
            Assembly: <code className="text-emerald-300">CMP score, 90; JL else_if</code>
          </div>
          {evaluatedBranch === 'A' && (
            <div className="mt-3 text-[11px] text-emerald-400 font-sans bg-emerald-950/60 p-2 rounded border border-emerald-800/50">
              Condition met ({score} &ge; 90). CPU executes body, then skips remaining else branches via JMP end.
            </div>
          )}
        </div>

        {/* Branch 2 */}
        <div
          className={`p-4 rounded-xl border transition-all ${
            evaluatedBranch === 'Pass'
              ? 'bg-sky-950/40 border-sky-500 shadow-lg ring-1 ring-sky-500'
              : 'bg-slate-950/40 border-slate-800 opacity-60'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <span className="text-slate-400">else if (score &gt;= 50)</span>
            {evaluatedBranch === 'Pass' ? (
              <CheckCircle2 className="w-4 h-4 text-sky-400" />
            ) : (
              <XCircle className="w-4 h-4 text-slate-600" />
            )}
          </div>
          <div className="text-sm font-bold text-white mb-1">Grade: Pass (Certified)</div>
          <div className="text-[11px] font-mono text-slate-400">
            Assembly: <code className="text-sky-300">CMP score, 50; JL else_fail</code>
          </div>
          {evaluatedBranch === 'Pass' && (
            <div className="mt-3 text-[11px] text-sky-400 font-sans bg-sky-950/60 p-2 rounded border border-sky-800/50">
              Evaluated after Branch 1 failed. {score} &ge; 50 is True. Executes Pass block and exits switch.
            </div>
          )}
        </div>

        {/* Branch 3 */}
        <div
          className={`p-4 rounded-xl border transition-all ${
            evaluatedBranch === 'Fail'
              ? 'bg-rose-950/40 border-rose-500 shadow-lg ring-1 ring-rose-500'
              : 'bg-slate-950/40 border-slate-800 opacity-60'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <span className="text-slate-400">else (Fallback)</span>
            {evaluatedBranch === 'Fail' ? (
              <CheckCircle2 className="w-4 h-4 text-rose-400" />
            ) : (
              <XCircle className="w-4 h-4 text-slate-600" />
            )}
          </div>
          <div className="text-sm font-bold text-white mb-1">Grade: Needs Improvement</div>
          <div className="text-[11px] font-mono text-slate-400">
            Assembly: <code className="text-rose-300">Default fallthrough block</code>
          </div>
          {evaluatedBranch === 'Fail' && (
            <div className="mt-3 text-[11px] text-rose-400 font-sans bg-rose-950/60 p-2 rounded border border-rose-800/50">
              Both previous conditions evaluated to 0 (False). CPU enters the default safety branch.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
