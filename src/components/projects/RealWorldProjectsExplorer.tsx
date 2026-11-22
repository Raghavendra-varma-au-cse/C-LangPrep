'use client';

import React, { useState } from 'react';
import { REAL_WORLD_C_PROJECTS, RealWorldProject } from '@/data/projects/realWorldProjects';
import {
  Flame,
  Play,
  Terminal,
  Cpu,
  Database,
  GitBranch,
  Layers,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLearningContext } from '@/context/LearningContext';
import { requestCompileC } from '@/lib/apiCompilerClient';

export const RealWorldProjectsExplorer: React.FC = () => {
  const { updateActiveCode } = useLearningContext();
  const [selectedProject, setSelectedProject] = useState<RealWorldProject>(REAL_WORLD_C_PROJECTS[0]);
  const [code, setCode] = useState<string>(REAL_WORLD_C_PROJECTS[0].code);
  const [simOutput, setSimOutput] = useState<string>('');
  const [simStderr, setSimStderr] = useState<string>('');
  const [exitCode, setExitCode] = useState<number | null>(null);
  const [isCompiling, setIsCompiling] = useState<boolean>(false);

  const handleSelect = (proj: RealWorldProject) => {
    setSelectedProject(proj);
    setCode(proj.code);
    setSimOutput('');
    setSimStderr('');
    setExitCode(null);
  };

  const handleRunSimulation = async () => {
    setIsCompiling(true);
    setSimOutput('');
    setSimStderr('');
    setExitCode(null);

    try {
      const data = await requestCompileC(code);
      setExitCode(data.exitCode ?? 0);

      if (data.exitCode === 0) {
        setSimOutput(data.stdout || selectedProject.expectedSimulationOutput);
        setSimStderr('');
        confetti({ particleCount: 60, spread: 70, origin: { y: 0.85 } });
      } else {
        setSimStderr(data.stderr || data.error || 'Compiler error in system code.');
        setSimOutput(data.stdout || '');
      }
    } catch (err: any) {
      setSimStderr(`Simulation network failure: ${err.message}`);
      setExitCode(1);
    } finally {
      setIsCompiling(false);
    }
  };

  const handleReset = () => {
    setCode(selectedProject.code);
    setSimOutput('');
    setSimStderr('');
    setExitCode(null);
  };

  const handleSyncToAcademy = () => {
    updateActiveCode(code);
    confetti({ particleCount: 30, spread: 45, origin: { y: 0.85 } });
  };

  return (
    <div className="bg-white border-2 border-[#ede3d2] rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b-2 border-[#ede3d2]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-3xl">🔥</span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl md:text-2xl font-black text-[#2b2520]">
                  Real-World Systems Engineered in C
                </h3>
                <span className="text-xs bg-[#fdf5ea] text-[#e57e25] border border-[#f3d4b1] px-2.5 py-0.5 rounded-full font-bold">
                  Production Architectures
                </span>
              </div>
              <p className="text-xs text-[#7d7065] font-medium mt-0.5">
                Explore the actual C architecture powering Redis, Git, Linux Kernel CFS, SQLite 4KB pages, and DOOM 3D raycasting.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleSyncToAcademy}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#eaf6f4] hover:bg-[#b2ded8] text-[#2a9d8f] border border-[#b2ded8] cursor-pointer transition"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sync to Visualizers</span>
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#fcf7ee] hover:bg-[#ede3d2] text-[#7d7065] border border-[#ede3d2] cursor-pointer transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Code
          </button>
          <button
            onClick={handleRunSimulation}
            disabled={isCompiling}
            className="friendly-button-amber px-5 py-2.5 text-xs flex items-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>{isCompiling ? 'Compiling C Engine...' : 'Run Real-World Project'}</span>
          </button>
        </div>
      </div>

      {/* Project Selector Pills */}
      <div className="p-4 bg-[#fcf7ee] border-2 border-[#ebdcc4] rounded-2xl flex items-center gap-2 overflow-x-auto">
        <span className="text-[11px] font-black text-[#7d7065] shrink-0 uppercase tracking-wider">
          Choose System:
        </span>
        {REAL_WORLD_C_PROJECTS.map((proj) => {
          const isSelected = proj.id === selectedProject.id;
          return (
            <button
              key={proj.id}
              onClick={() => handleSelect(proj)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 cursor-pointer transition flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-[#e57e25] text-white shadow-xs'
                  : 'bg-white text-[#7d7065] hover:bg-[#ebdcc4] border border-[#ebdcc4]'
              }`}
            >
              <span>{proj.title.split('. ')[1].split(' (')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Project Deep Dive Card */}
      <div className="p-5 bg-[#fcf7ee] border-2 border-[#ebdcc4] rounded-2xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-lg bg-[#fdf5ea] text-[#e57e25] border border-[#f3d4b1]">
              Domain: {selectedProject.industryDomain}
            </span>
            <span className="text-xs text-[#7d7065] font-medium">
              Industry Standard: <strong className="text-[#2b2520]">{selectedProject.realWorldProduct}</strong>
            </span>
          </div>
        </div>

        <h4 className="text-base font-black text-[#2b2520]">{selectedProject.title}</h4>
        <p className="text-xs text-[#57534e] leading-relaxed font-medium">
          {selectedProject.tagline}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
          <div className="bg-white border border-[#ebdcc4] p-3.5 rounded-xl space-y-1">
            <div className="text-[#d97706] font-bold text-xs uppercase flex items-center gap-1">
              <span>The Engineering Problem:</span>
            </div>
            <p className="text-[#57534e] leading-relaxed text-xs">
              {selectedProject.problemSolved}
            </p>
          </div>
          <div className="bg-white border border-[#ebdcc4] p-3.5 rounded-xl space-y-1">
            <div className="text-[#2a9d8f] font-bold text-xs uppercase flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5" />
              <span>Hardware / Silicon Mental Model:</span>
            </div>
            <p className="text-[#57534e] leading-relaxed text-xs">
              {selectedProject.hardwareMentalModel}
            </p>
          </div>
        </div>
      </div>

      {/* Editor & Console Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Code Editor (7 cols) */}
        <div className="lg:col-span-7 flex flex-col bg-[#fcf7ee] border-2 border-[#ebdcc4] rounded-2xl p-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#ebdcc4] text-xs font-bold text-[#57534e] mb-2 font-mono">
            <span>Editor: {selectedProject.id}.c</span>
            <span className="text-[#e57e25]">Editable System C Implementation</span>
          </div>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 w-full bg-white p-4 font-mono text-xs text-[#2b2520] rounded-xl border border-[#ebdcc4] leading-relaxed focus:outline-none resize-none min-h-[340px]"
            spellCheck={false}
          />
        </div>

        {/* Console & Architectural Notes (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-[#2b2520] text-white rounded-2xl p-4 font-mono text-xs space-y-4">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-700 text-slate-400 text-[11px] mb-3">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                Live Engine stdout
              </span>
              <span className={exitCode === null || exitCode === 0 ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                exit code {exitCode !== null ? exitCode : 0}
              </span>
            </div>

            {simStderr ? (
              <div className="p-3 bg-rose-950/60 border border-rose-800 rounded-xl text-rose-300 whitespace-pre-wrap">
                <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-rose-400 mb-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> Compiler Diagnostics:
                </div>
                {simStderr}
              </div>
            ) : simOutput ? (
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-emerald-400 whitespace-pre leading-relaxed overflow-x-auto shadow-inner">
                {simOutput}
              </div>
            ) : (
              <div className="py-16 text-center text-slate-500 text-xs">
                Click &quot;Run Real-World Project&quot; to compile and see the production engine in action.
              </div>
            )}
          </div>

          {/* Under the hood highlights */}
          <div className="pt-3 border-t border-slate-700 space-y-2">
            <div className="text-[11px] text-amber-300 font-bold flex items-center gap-1.5 font-sans">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Under The Hood Production Highlights:
            </div>
            <div className="space-y-1.5">
              {selectedProject.underTheHoodNotes.map((note, idx) => (
                <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-300 font-sans">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2a9d8f] shrink-0 mt-0.5" />
                  <span>{note}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
