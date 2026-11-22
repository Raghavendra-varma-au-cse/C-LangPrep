'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Repeat, Play, RotateCcw, StepForward, ArrowRight } from 'lucide-react';

interface LoopStep {
  i: number;
  condition: string;
  conditionMet: boolean;
  runningSum: number;
  action: string;
}

const TRACE_STEPS: LoopStep[] = [
  { i: 1, condition: '1 <= 5', conditionMet: true, runningSum: 1, action: 'sum = 0 + 1 = 1; loop continues' },
  { i: 2, condition: '2 <= 5', conditionMet: true, runningSum: 3, action: 'sum = 1 + 2 = 3; loop continues' },
  { i: 3, condition: '3 <= 5', conditionMet: true, runningSum: 6, action: 'sum = 3 + 3 = 6; loop continues' },
  { i: 4, condition: '4 <= 5', conditionMet: true, runningSum: 10, action: 'sum = 6 + 4 = 10; loop continues' },
  { i: 5, condition: '5 <= 5', conditionMet: true, runningSum: 15, action: 'sum = 10 + 5 = 15; loop continues' },
  { i: 6, condition: '6 <= 5', conditionMet: false, runningSum: 15, action: 'Condition FALSE! Jumps out of loop.' }
];

export const LoopTraceVisualizer: React.FC = () => {
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);

  const step = TRACE_STEPS[currentStepIdx];

  const handleNext = () => {
    if (currentStepIdx < TRACE_STEPS.length - 1) {
      setCurrentStepIdx(currentStepIdx + 1);
    }
  };

  const handleReset = () => {
    setCurrentStepIdx(0);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-slate-100 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2 text-amber-400">
            <Repeat className="w-5 h-5 text-amber-400" />
            Loop Execution & CPU Register Tracer
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Step through <code className="text-amber-300 font-mono">for (int i = 1; i &lt;= 5; i++)</code> line-by-line to see how registers update.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded border border-slate-700 transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
          <button
            onClick={handleNext}
            disabled={currentStepIdx >= TRACE_STEPS.length - 1}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-500 disabled:opacity-40 text-white rounded text-xs font-semibold cursor-pointer transition"
          >
            <StepForward className="w-3.5 h-3.5" />
            Next Step
          </button>
        </div>
      </div>

      {/* Hardware Registers Display */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-lg text-center">
          <div className="text-[10px] font-mono text-slate-500 uppercase">Loop Counter Register (i)</div>
          <div className="text-2xl font-bold font-mono text-amber-400 mt-1">{step.i}</div>
        </div>
        <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-lg text-center">
          <div className="text-[10px] font-mono text-slate-500 uppercase">Accumulator (sum)</div>
          <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">{step.runningSum}</div>
        </div>
        <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-lg text-center">
          <div className="text-[10px] font-mono text-slate-500 uppercase">Condition Evaluation</div>
          <div className={`text-base font-bold font-mono mt-1 ${step.conditionMet ? 'text-emerald-400' : 'text-rose-400'}`}>
            {step.condition} &rarr; {step.conditionMet ? 'TRUE (1)' : 'FALSE (0)'}
          </div>
        </div>
        <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-lg text-center">
          <div className="text-[10px] font-mono text-slate-500 uppercase">Execution Status</div>
          <div className="text-xs font-semibold text-slate-300 mt-2">
            Step {currentStepIdx + 1} of {TRACE_STEPS.length}
          </div>
        </div>
      </div>

      {/* Action Explanation */}
      <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-xl text-xs font-mono">
        <div className="text-slate-400 mb-1 flex items-center gap-1.5">
          <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
          CPU Execution Step:
        </div>
        <div className="text-slate-200 text-sm font-sans mt-1">
          {step.action}
        </div>
      </div>
    </div>
  );
};
