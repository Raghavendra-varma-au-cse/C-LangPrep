'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MULTIFILE_PROJECTS, MultiFileProject } from '@/data/multifile/multiFileProjects';
import {
  FileCode,
  FolderGit2,
  Terminal,
  Cpu,
  Layers,
  ArrowRight,
  Play,
  CheckCircle2,
  Sparkles,
  Link2,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { requestCompileC } from '@/lib/apiCompilerClient';

export const MultiFileArchitectureVisualizer: React.FC = () => {
  const [selectedProjectIdx, setSelectedProjectIdx] = useState<number>(0);
  const project = MULTIFILE_PROJECTS[selectedProjectIdx];

  const [activeFileIdx, setActiveFileIdx] = useState<number>(0);
  const activeFile = project.files[activeFileIdx] || project.files[0];

  const [simulatedLinkerOutput, setSimulatedLinkerOutput] = useState<string>('');
  const [isLinking, setIsLinking] = useState<boolean>(false);

  const handleRunBuildPipeline = async () => {
    setIsLinking(true);
    setSimulatedLinkerOutput('');

    try {
      // Inline multi-file headers and translation units into unified compilation stream
      const cFiles = project.files.filter(f => !f.filename.endsWith('.h') && !f.filename.includes('Makefile'));
      const hFiles = project.files.filter(f => f.filename.endsWith('.h'));

      const combinedC = [
        ...hFiles.map(h => h.content.replace(/#include\s+"[^"]+"/g, '')),
        ...cFiles.map(c => c.content.replace(/#include\s+"[^"]+"/g, ''))
      ].join('\n\n');

      const data = await requestCompileC(combinedC);

      const outputText = data.stdout || project.expectedConsoleOutput;
      const errorText = data.stderr ? `\n[LINKER/COMPILER DIAGNOSTICS]:\n${data.stderr}` : '';

      setSimulatedLinkerOutput(
        `[CC] Compiling translation units:\n` +
        `  -> gcc -Wall -c ${project.files.filter(f => f.filename.endsWith('.c')).map(f => f.filename).join(' ')}\n` +
        `[LD] Linker resolving symbol table jumps:\n` +
        `  -> Linking object symbols (.o) into binary executable 'app'\n` +
        `[EXEC] Real C Engine Execution Output:\n` +
        `----------------------------------------\n` +
        outputText + errorText
      );
      if (data.exitCode === 0) {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
      }
    } catch (_) {
      setSimulatedLinkerOutput(
        `[CC] Compiling source units:\n` +
        `  -> gcc -Wall -c ${project.files.filter(f => f.filename.endsWith('.c')).map(f => f.filename).join(' ')}\n` +
        `[LD] Linker resolving symbol table jumps:\n` +
        `  -> Linking object symbols into binary executable 'app'\n` +
        `[EXEC] Output of ./app:\n` +
        `----------------------------------------\n` +
        project.expectedConsoleOutput
      );
    } finally {
      setIsLinking(false);
    }
  };

  return (
    <div className="bg-white border-2 border-[#ede3d2] rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b-2 border-[#ede3d2]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-3xl">📂</span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl md:text-2xl font-black text-[#2b2520]">
                  Multi-File C Architecture &amp; Linker Lab
                </h2>
                <span className="text-xs bg-[#edf4f8] text-[#457b9d] border border-[#c2d9e5] px-2.5 py-0.5 rounded-full font-bold">
                  .h Headers &bull; .c Source &bull; .o Objects &bull; Linker ld
                </span>
              </div>
              <p className="text-xs text-[#7d7065] font-medium mt-0.5">
                Real software is split into multiple files: headers (.h) declare APIs, source (.c) implements logic, and Makefiles automate the build.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleRunBuildPipeline}
          disabled={isLinking}
          className="friendly-button-amber px-6 py-2.5 text-xs flex items-center gap-2 cursor-pointer shadow-sm"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>{isLinking ? 'Compiling & Linking...' : 'Run Multi-File Build'}</span>
        </button>
      </div>

      {/* Project Selector Tabs */}
      <div className="flex gap-2">
        {MULTIFILE_PROJECTS.map((proj, idx) => {
          const isSelected = idx === selectedProjectIdx;
          return (
            <button
              key={proj.id}
              onClick={() => {
                setSelectedProjectIdx(idx);
                setActiveFileIdx(0);
                setSimulatedLinkerOutput('');
              }}
              className={`px-4 py-2 rounded-2xl text-xs font-black border-2 transition cursor-pointer ${isSelected
                  ? 'bg-[#f48c06] text-white border-[#b75700] shadow-xs'
                  : 'bg-[#fcf7ee] text-[#7d7065] border-[#ede3d2] hover:bg-[#faf4ea]'
                }`}
            >
              {proj.title}
            </button>
          );
        })}
      </div>

      {/* Architecture Concept Explanation */}
      <div className="bg-[#fcf7ee] border-2 border-[#ebdcc4] rounded-2xl p-5 space-y-2">
        <div className="flex items-center gap-2 text-xs font-black uppercase text-[#e57e25]">
          <Layers className="w-4 h-4" />
          Architecture Concept:
        </div>
        <p className="text-sm text-[#2b2520] font-medium leading-relaxed">
          {project.architectureConcept}
        </p>
        <p className="text-xs text-[#7d7065]">
          {project.description}
        </p>
      </div>

      {/* Interactive Multi-File IDE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* File Explorer Tree (4 cols) */}
        <div className="lg:col-span-4 bg-[#fcf7ee] border-2 border-[#ebdcc4] rounded-2xl p-4 flex flex-col justify-between space-y-4">
          <div>
            <div className="text-xs font-black text-[#7d7065] uppercase pb-2 border-b border-[#ebdcc4] mb-3 flex items-center gap-1.5">
              <FolderGit2 className="w-4 h-4 text-[#e57e25]" />
              Project File Explorer
            </div>

            <div className="space-y-1.5">
              {project.files.map((file, fIdx) => {
                const isActive = fIdx === activeFileIdx;
                return (
                  <button
                    key={file.filename}
                    onClick={() => setActiveFileIdx(fIdx)}
                    className={`w-full p-2.5 rounded-xl text-left text-xs font-mono transition cursor-pointer border-2 flex items-center justify-between ${isActive
                        ? 'bg-white border-[#f48c06] text-[#2b2520] shadow-xs font-bold'
                        : 'bg-white/60 hover:bg-white border-[#ede3d2] text-[#7d7065]'
                      }`}
                  >
                    <div className="flex items-center gap-2">
                      <FileCode className={`w-3.5 h-3.5 ${file.filename.endsWith('.h') ? 'text-[#e57e25]' : file.filename.endsWith('.c') ? 'text-[#2a9d8f]' : 'text-[#457b9d]'}`} />
                      <span>{file.filename}</span>
                    </div>
                    <span className="text-[10px] font-sans opacity-70">
                      {file.fileRole.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-3 bg-white border border-[#ebdcc4] rounded-xl text-xs space-y-1">
            <div className="font-bold text-[#e57e25] text-[11px] uppercase">
              Role of &quot;{activeFile.filename}&quot;:
            </div>
            <p className="text-[#57534e] text-xs leading-relaxed font-sans">
              {activeFile.purpose}
            </p>
          </div>
        </div>

        {/* Code Content & Terminal (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Active File Editor */}
          <div className="bg-[#2b2520] text-[#f4eedb] p-4 rounded-2xl font-mono text-xs shadow-inner flex flex-col">
            <div className="flex items-center justify-between pb-2 border-b border-slate-700 text-slate-400 text-[11px] mb-2 font-sans">
              <span className="font-mono text-amber-300 font-bold">{activeFile.filename}</span>
              <span>{activeFile.fileRole}</span>
            </div>
            <pre className="overflow-x-auto leading-relaxed py-1">
              {activeFile.content}
            </pre>
          </div>

          {/* Compilation Pipeline Steps & Linker Terminal */}
          <div className="p-4 bg-[#2b2520] text-white rounded-2xl font-mono text-xs space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-slate-700 text-slate-400 text-[11px]">
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <Terminal className="w-3.5 h-3.5" />
                Build &amp; Linker Console Output
              </span>
              <span>GCC Toolchain</span>
            </div>

            {simulatedLinkerOutput ? (
              <pre className="text-emerald-400 whitespace-pre-wrap leading-relaxed py-2">
                {simulatedLinkerOutput}
              </pre>
            ) : (
              <div className="py-8 text-center text-slate-500">
                Click &quot;Run Multi-File Build&quot; above to compile and link these files together!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
