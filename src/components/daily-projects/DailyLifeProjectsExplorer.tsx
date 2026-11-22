'use client';

import React, { useState } from 'react';
import { DAILY_LIFE_PROJECTS, DailyProject } from '@/data/daily-projects/dailyProjects';
import { useLearningContext } from '@/context/LearningContext';
import { Coffee, CreditCard, Compass, Phone, Play, RotateCcw, CheckCircle, Sparkles, ArrowRight, Edit3 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { requestCompileC } from '@/lib/apiCompilerClient';

export const DailyLifeProjectsExplorer: React.FC = () => {
  const { currentItem, updateActiveCode } = useLearningContext();
  const [selectedProj, setSelectedProj] = useState<DailyProject>(DAILY_LIFE_PROJECTS[0]);
  const [code, setCode] = useState<string>(DAILY_LIFE_PROJECTS[0].cCode);
  const [output, setOutput] = useState<string>('');
  const [stderr, setStderr] = useState<string>('');
  const [exitCode, setExitCode] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const handleSelect = (proj: DailyProject) => {
    setSelectedProj(proj);
    setCode(proj.cCode);
    setOutput('');
    setStderr('');
    setExitCode(null);
  };

  const handleRun = async () => {
    setIsRunning(true);
    setOutput('');
    setStderr('');
    setExitCode(null);
    // Push active editable code into global learning context
    updateActiveCode(code);

    try {
      const data = await requestCompileC(code);
      setExitCode(data.exitCode ?? 0);

      if (data.exitCode === 0) {
        setOutput(data.stdout || selectedProj.expectedOutput);
        setStderr('');
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.85 } });
      } else {
        setStderr(data.stderr || data.error || 'Syntax error encountered during machine run.');
        setOutput(data.stdout || '');
      }
    } catch (err: any) {
      setStderr(`Connection error: ${err.message}`);
      setExitCode(1);
    } finally {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setCode(selectedProj.cCode);
    setOutput('');
    setStderr('');
    setExitCode(null);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Coffee': return <Coffee className="w-4 h-4 text-amber-700" />;
      case 'CreditCard': return <CreditCard className="w-4 h-4 text-emerald-700" />;
      case 'Compass': return <Compass className="w-4 h-4 text-sky-700" />;
      case 'Phone': return <Phone className="w-4 h-4 text-indigo-700" />;
      default: return <Sparkles className="w-4 h-4 text-amber-600" />;
    }
  };

  return (
    <div className="bg-white border-2 border-[#ede3d2] rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b-2 border-[#ede3d2]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-[#fdf5ea] text-[#e57e25] border border-[#f3d4b1] mb-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Synchronized with Mission #{currentItem.id}
          </div>
          <h3 className="text-xl md:text-2xl font-black text-[#2b2520]">
            Everyday Machines in C (Fully Editable &amp; Interactive)
          </h3>
          <p className="text-xs text-[#7d7065] font-medium mt-0.5">
            Change coffee prices, discount rules, ATM pins, or signal timers in real C code and watch the machine react!
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#fcf7ee] hover:bg-[#ede3d2] text-[#7d7065] border border-[#ede3d2] cursor-pointer transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Code
          </button>
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="friendly-button-amber px-6 py-2.5 text-xs flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <Play className="w-4 h-4 fill-white" />
            {isRunning ? 'Running Machine...' : 'Compile & Test Machine'}
          </button>
        </div>
      </div>

      {/* Project Selector Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {DAILY_LIFE_PROJECTS.map((proj) => {
          const isSelected = proj.id === selectedProj.id;
          return (
            <button
              key={proj.id}
              onClick={() => handleSelect(proj)}
              className={`p-3.5 rounded-2xl border-2 text-left cursor-pointer transition ${
                isSelected
                  ? 'bg-[#fdf5ea] border-[#e57e25] shadow-xs'
                  : 'bg-white hover:bg-[#fcf7ee] border-[#ede3d2]'
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                {getIcon(proj.icon)}
                <span className="font-bold text-xs text-[#2b2520] truncate">
                  {proj.title.split('. ')[1]}
                </span>
              </div>
              <div className="text-[11px] text-[#7d7065] line-clamp-2 leading-relaxed">
                {proj.realLifeStory}
              </div>
            </button>
          );
        })}
      </div>

      {/* Story & Logic Steps Strip */}
      <div className="p-5 bg-[#fcf7ee] border-2 border-[#ebdcc4] rounded-2xl space-y-3">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-[#d97706] block mb-1">
            Everyday Machine Scenario:
          </span>
          <p className="text-sm text-[#2b2520] font-medium leading-relaxed">
            {selectedProj.realLifeStory}
          </p>
        </div>

        <div className="pt-2 border-t border-[#ebdcc4]">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#7d7065] block mb-1.5">
            How The Machine Thinks (Logic Sequence):
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            {selectedProj.logicSequence.map((step, idx) => (
              <div key={idx} className="p-2.5 bg-white border border-[#ebdcc4] rounded-xl text-[#57534e]">
                {step}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Editor & Machine Terminal Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Code View (7 cols) */}
        <div className="lg:col-span-7 flex flex-col bg-[#fcf7ee] border-2 border-[#ebdcc4] rounded-2xl p-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#ebdcc4] text-xs font-bold text-[#57534e] mb-2 font-mono">
            <span>C Source Code ({selectedProj.id}.c)</span>
            <span className="text-[#e57e25]">Editable C Code</span>
          </div>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 w-full bg-white p-3 font-mono text-xs text-[#2b2520] rounded-xl border border-[#ebdcc4] leading-relaxed focus:outline-none resize-none min-h-[300px]"
            spellCheck={false}
          />

          <div className="mt-3 flex flex-wrap gap-1.5 items-center">
            <span className="text-[11px] font-bold text-[#7d7065] mr-1">Concepts:</span>
            {selectedProj.cConceptsTaught.map((c, i) => (
              <span key={i} className="px-2 py-0.5 rounded-lg bg-white border border-[#ebdcc4] text-[10px] font-medium text-[#57534e]">
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Machine Screen Output (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-[#2b2520] text-white rounded-2xl p-4 font-mono text-xs">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-700 text-slate-400 text-[11px] mb-3">
              <span>Live Terminal Output</span>
              <span className={exitCode === null || exitCode === 0 ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                exit code {exitCode !== null ? exitCode : 0}
              </span>
            </div>

            {stderr ? (
              <div className="p-3 bg-rose-950/60 border border-rose-800 rounded-xl text-rose-300 whitespace-pre-wrap">
                <div className="text-[10px] uppercase font-bold text-rose-400 mb-1">C Engine Diagnostics:</div>
                {stderr}
              </div>
            ) : output ? (
              <pre className="text-emerald-400 whitespace-pre leading-relaxed overflow-x-auto">
                {output}
              </pre>
            ) : (
              <div className="py-20 text-center text-slate-500 text-xs">
                Edit the numbers in code &amp; click &quot;Compile &amp; Test Machine&quot;!
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-700 text-[11px] text-slate-400 font-sans">
            <strong className="text-amber-400 font-mono">Student Tip:</strong> Notice how modifying variables like prices or PINs immediately alters the machine&apos;s behavior.
          </div>
        </div>
      </div>
    </div>
  );
};
