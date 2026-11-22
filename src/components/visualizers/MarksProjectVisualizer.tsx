'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle, XCircle, ArrowRight, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

export const MarksProjectVisualizer: React.FC = () => {
  const [studentName, setStudentName] = useState<string>('Alex Johnson');
  const [mathMarks, setMathMarks] = useState<number>(85);
  const [scienceMarks, setScienceMarks] = useState<number>(78);
  const [englishMarks, setEnglishMarks] = useState<number>(65);

  const total = mathMarks + scienceMarks + englishMarks;
  const average = total / 3.0;
  const isPassed = mathMarks >= 35 && scienceMarks >= 35 && englishMarks >= 35;

  const handleTriggerCelebration = () => {
    if (isPassed) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 }
      });
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-slate-100 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2 text-teal-400">
            <Award className="w-5 h-5 text-teal-400" />
            Mastery Capstone: Student Marks Engine Terminal
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Synthesize Variables, Data Types, Arithmetic, and Multi-condition Evaluation in one unified project.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Terminal Controls */}
        <div className="space-y-4 bg-slate-950/70 border border-slate-800 p-4 rounded-xl">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-2">
            scanf() Input Stream Simulation
          </div>

          <div>
            <label className="text-xs text-slate-300 font-mono block mb-1">Student Name (char array / string):</label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-teal-500"
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-[11px] text-slate-300 font-mono block mb-1">Math (int):</label>
              <input
                type="number"
                min="0"
                max="100"
                value={mathMarks}
                onChange={(e) => setMathMarks(parseInt(e.target.value, 10) || 0)}
                className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-white font-mono focus:outline-none focus:border-teal-500"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-300 font-mono block mb-1">Science (int):</label>
              <input
                type="number"
                min="0"
                max="100"
                value={scienceMarks}
                onChange={(e) => setScienceMarks(parseInt(e.target.value, 10) || 0)}
                className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-white font-mono focus:outline-none focus:border-teal-500"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-300 font-mono block mb-1">English (int):</label>
              <input
                type="number"
                min="0"
                max="100"
                value={englishMarks}
                onChange={(e) => setEnglishMarks(parseInt(e.target.value, 10) || 0)}
                className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-white font-mono focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>

          <div className="text-[11px] text-slate-400 font-mono pt-2">
            Rule: Minimum passing threshold is <span className="text-amber-400 font-bold">35 marks</span> in each subject.
          </div>
        </div>

        {/* Formatted Console Report */}
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex flex-col justify-between font-mono text-xs">
          <div>
            <div className="flex items-center justify-between text-slate-500 pb-2 border-b border-slate-800 text-[10px]">
              <span>stdout (Standard Terminal Output)</span>
              <span>exit code 0</span>
            </div>

            <div className="mt-3 space-y-1 text-slate-300">
              <div className="text-teal-400 font-bold">========================================</div>
              <div className="text-center font-bold text-slate-100">OFFICIAL GRADE REPORT</div>
              <div className="text-teal-400 font-bold">========================================</div>
              <div>Student Name : <span className="text-white font-semibold">{studentName}</span></div>
              <div>Math Score   : <span className={mathMarks >= 35 ? 'text-emerald-400' : 'text-rose-400 font-bold'}>{mathMarks}/100</span></div>
              <div>Science Score: <span className={scienceMarks >= 35 ? 'text-emerald-400' : 'text-rose-400 font-bold'}>{scienceMarks}/100</span></div>
              <div>English Score: <span className={englishMarks >= 35 ? 'text-emerald-400' : 'text-rose-400 font-bold'}>{englishMarks}/100</span></div>
              <div className="border-t border-slate-800 pt-1 mt-1">Total Marks   : <span className="text-amber-400 font-bold">{total} / 300</span></div>
              <div>Average Score : <span className="text-sky-400 font-bold">{average.toFixed(2)}%</span></div>
              <div className="border-t border-slate-800 pt-1 mt-1 flex items-center justify-between">
                <span>Final Decision:</span>
                <span className={`px-2 py-0.5 rounded font-bold text-xs ${isPassed ? 'bg-emerald-950 text-emerald-400 border border-emerald-600' : 'bg-rose-950 text-rose-400 border border-rose-600'}`}>
                  {isPassed ? 'PASSED & CERTIFIED' : 'FAILED (SUBJECT < 35)'}
                </span>
              </div>
              <div className="text-teal-400 font-bold">========================================</div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex justify-end">
            <button
              onClick={handleTriggerCelebration}
              className="px-3 py-1.5 bg-teal-600 hover:bg-teal-500 text-white rounded text-xs font-semibold cursor-pointer transition flex items-center gap-1.5"
            >
              Verify &amp; Celebrate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
