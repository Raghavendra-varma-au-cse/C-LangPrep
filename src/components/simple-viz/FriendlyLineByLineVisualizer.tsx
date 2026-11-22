'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLearningContext } from '@/context/LearningContext';
import { parseCustomCCode, ParsedCodeLine } from '@/data/master-catalog/codeParser';
import {
  Play,
  StepForward,
  RotateCcw,
  Box,
  CheckCircle,
  Info,
  Sparkles,
  Edit3,
  Cpu,
  AlertTriangle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { requestCompileC } from '@/lib/apiCompilerClient';

export const FriendlyLineByLineVisualizer: React.FC = () => {
  const { currentItem, state, updateActiveCode } = useLearningContext();

  // The student can edit this code live!
  const [editableCode, setEditableCode] = useState<string>(state.activeCode);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);

  // Real C engine execution state
  const [isRunningReal, setIsRunningReal] = useState<boolean>(false);
  const [realOutput, setRealOutput] = useState<string | null>(null);
  const [realError, setRealError] = useState<string | null>(null);
  const [realExitCode, setRealExitCode] = useState<number | null>(null);
  const [realTelemetry, setRealTelemetry] = useState<{ memoryBytes: number; cpuCycles: number } | null>(null);

  // Synchronize when global active code changes (e.g. from Level switch or Block Builder)
  useEffect(() => {
    setEditableCode(state.activeCode);
    setActiveStepIdx(0);
    setRealOutput(null);
    setRealError(null);
    setRealExitCode(null);

    let isCancelled = false;
    const runAsync = async () => {
      try {
        const data = await requestCompileC(state.activeCode);
        if (!isCancelled) {
          setRealExitCode(data.exitCode ?? 0);
          setRealTelemetry({
            memoryBytes: data.memoryUsageBytes || 1024,
            cpuCycles: data.cpuCyclesEstimated || 120
          });
          if (data.exitCode === 0) {
            setRealOutput(data.stdout || null);
          } else {
            setRealError(data.stderr || data.error || null);
          }
        }
      } catch {
        // silent fallback to step-by-step parsed simulation
      }
    };
    runAsync();

    return () => {
      isCancelled = true;
    };
  }, [state.activeCode]);

  // When user edits code, parse it dynamically on the fly
  const parsedSteps: ParsedCodeLine[] = useMemo(() => {
    const res = parseCustomCCode(editableCode);
    return res.length > 0 ? res : parseCustomCCode(currentItem.codingApproaches.beginnerFriendly.code);
  }, [editableCode, currentItem]);

  const activeStep = parsedSteps[activeStepIdx] || parsedSteps[0];

  // Accumulate memory boxes up to the current active step
  const accumulatedBoxes = useMemo(() => {
    const boxes: Record<string, { name: string; value: string; color: string }> = {};
    for (let i = 0; i <= activeStepIdx && i < parsedSteps.length; i++) {
      const step = parsedSteps[i];
      if (step.memoryBoxImpact) {
        boxes[step.memoryBoxImpact.name] = step.memoryBoxImpact;
      }
    }
    return Object.values(boxes);
  }, [activeStepIdx, parsedSteps]);

  // Accumulate screen output up to current step
  const accumulatedOutput = useMemo(() => {
    let out = '';
    for (let i = 0; i <= activeStepIdx && i < parsedSteps.length; i++) {
      if (parsedSteps[i].outputContribution) {
        out += parsedSteps[i].outputContribution;
      }
    }
    return out || (activeStepIdx === parsedSteps.length - 1 ? currentItem.expectedOutput : '');
  }, [activeStepIdx, parsedSteps, currentItem]);

  const handleNextStep = () => {
    if (activeStepIdx < parsedSteps.length - 1) {
      setActiveStepIdx(activeStepIdx + 1);
    } else {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.85 } });
    }
  };

  const handleReset = () => {
    setActiveStepIdx(0);
    setRealOutput(null);
    setRealError(null);
    setRealExitCode(null);
  };

  const handleApplyUserEdits = () => {
    updateActiveCode(editableCode);
    setActiveStepIdx(0);
    setIsEditing(false);
  };

  const handleRunRealEngine = async () => {
    setIsRunningReal(true);
    setRealOutput(null);
    setRealError(null);
    setRealExitCode(null);

    try {
      const data = await requestCompileC(editableCode);
      setRealExitCode(data.exitCode ?? 0);
      setRealTelemetry({
        memoryBytes: data.memoryUsageBytes || 1024,
        cpuCycles: data.cpuCyclesEstimated || 120
      });

      if (data.exitCode === 0) {
        setRealOutput(data.stdout || '[Program executed quietly with 0 errors]');
        confetti({ particleCount: 45, spread: 55, origin: { y: 0.85 } });
      } else {
        setRealError(data.stderr || data.error || 'Syntax or Runtime Error');
      }
    } catch (err: any) {
      setRealError(`Execution failure: ${err.message}`);
    } finally {
      setIsRunningReal(false);
    }
  };

  return (
    <div className="bg-white border-2 border-[#ede3d2] rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b-2 border-[#ede3d2]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-[#fdf5ea] text-[#e57e25] border border-[#f3d4b1] mb-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Synchronized with Level {currentItem.id}: {currentItem.title.split(': ')[1]}
          </div>
          <h3 className="text-xl md:text-2xl font-black text-[#2b2520]">
            Dynamic Code Dissector &amp; Memory Visualizer
          </h3>
          <p className="text-xs text-[#7d7065] font-medium mt-0.5">
            Edit the C code live or step line-by-line! Watch memory boxes and hardware telemetry change in real-time.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#fcf7ee] hover:bg-[#ede3d2] text-[#2b2520] border border-[#ede3d2] cursor-pointer transition"
          >
            <Edit3 className="w-3.5 h-3.5 text-[#e57e25]" />
            <span>{isEditing ? 'Close Editor' : 'Edit Code Live'}</span>
          </button>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#fcf7ee] hover:bg-[#ede3d2] text-[#7d7065] border border-[#ede3d2] cursor-pointer transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Restart
          </button>

          <button
            onClick={handleNextStep}
            disabled={activeStepIdx >= parsedSteps.length - 1}
            className="friendly-button-amber px-4 py-2 text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <StepForward className="w-4 h-4" />
            <span>Next Line &rarr;</span>
          </button>

          <button
            onClick={handleRunRealEngine}
            disabled={isRunningReal}
            className="px-4 py-2 rounded-xl text-xs font-black bg-[#2a9d8f] hover:bg-[#21867a] text-white flex items-center gap-1.5 cursor-pointer shadow-sm transition disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>{isRunningReal ? 'Compiling...' : 'Run Real C Engine'}</span>
          </button>
        </div>
      </div>

      {/* Live Editable Code Drawer (Allows Student to write ANYTHING!) */}
      {isEditing && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="p-4 bg-[#fcf7ee] border-2 border-[#ebdcc4] rounded-2xl space-y-3"
        >
          <div className="flex items-center justify-between text-xs font-black text-[#7d7065]">
            <span>Type any custom C code below. The visualizer and real C engine will parse and run it!</span>
            <button
              onClick={handleApplyUserEdits}
              className="px-4 py-1.5 bg-[#2a9d8f] text-white rounded-xl text-xs font-black cursor-pointer shadow-2xs hover:bg-[#1b635b]"
            >
              Apply &amp; Re-Visualize!
            </button>
          </div>
          <textarea
            value={editableCode}
            onChange={(e) => setEditableCode(e.target.value)}
            rows={8}
            className="w-full bg-white border border-[#ebdcc4] rounded-xl p-3 font-mono text-xs text-[#2b2520] leading-relaxed focus:outline-none focus:border-[#f48c06]"
            spellCheck={false}
          />
        </motion.div>
      )}

      {/* Main Split: Code Listing & Memory Boxes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Code Listing with Line Highlight (5 cols) */}
        <div className="lg:col-span-5 bg-[#fcf7ee] border-2 border-[#ebdcc4] rounded-2xl p-4 font-mono text-xs flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-black text-[#7d7065] uppercase pb-2 border-b border-[#ebdcc4] mb-3 flex items-center justify-between">
              <span>Program Source Code</span>
              <span className="text-[#e57e25]">Line {activeStep?.lineNum || 1} of {parsedSteps.length}</span>
            </div>

            <div className="space-y-1 bg-white p-3 rounded-xl border border-[#ebdcc4] overflow-x-auto max-h-[380px]">
              {parsedSteps.map((step, idx) => {
                const isActive = idx === activeStepIdx;
                return (
                  <div
                    key={idx}
                    onClick={() => setActiveStepIdx(idx)}
                    className={`p-1.5 rounded-lg transition-all cursor-pointer flex items-start gap-2 ${
                      isActive
                        ? 'bg-[#fdf5ea] border-l-4 border-[#e57e25] text-[#2b2520] font-black shadow-2xs'
                        : 'text-[#7d7065] hover:bg-[#faf4ea]'
                    }`}
                  >
                    <span className="text-slate-400 select-none text-[10px] w-4 text-right">
                      {step.lineNum}
                    </span>
                    <pre className="whitespace-pre-wrap">{step.rawText}</pre>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#ebdcc4] text-[10px] text-[#7d7065] font-sans">
            Click any line above to jump directly to that step in the computer&apos;s execution!
          </div>
        </div>

        {/* Right: Computer Memory Boxes & Action Narration (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          {/* Action Narration Box */}
          <div className="bg-[#fcf7ee] border-2 border-[#ebdcc4] rounded-2xl p-5 space-y-2">
            <div className="text-xs font-black text-[#d97706] uppercase flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              What the Computer Does at Line #{activeStep?.lineNum || 1}:
            </div>
            <h4 className="text-base font-black text-[#2b2520] font-mono bg-white p-2.5 rounded-xl border border-[#ebdcc4]">
              <code>{activeStep?.rawText}</code>
            </h4>
            <p className="text-sm text-[#57534e] leading-relaxed font-medium">
              {activeStep?.narration}
            </p>
          </div>

          {/* Computer Memory (RAM) Storage Boxes */}
          <div className="p-5 bg-white border-2 border-[#ede3d2] rounded-2xl space-y-3">
            <div className="text-xs font-black text-[#7d7065] uppercase flex items-center gap-1.5">
              <Box className="w-4 h-4 text-[#2a9d8f]" />
              Inside Computer RAM (Stack Frame Storage):
            </div>

            {accumulatedBoxes.length === 0 ? (
              <div className="p-6 text-center text-xs text-[#a8a29e] bg-[#fcf7ee] rounded-xl border border-dashed border-[#ebdcc4]">
                No variables allocated yet. Click &quot;Next Line&quot; to watch variables pop into RAM!
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {accumulatedBoxes.map((box) => (
                  <motion.div
                    key={box.name}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`p-3.5 rounded-2xl border-2 text-center shadow-2xs ${box.color}`}
                  >
                    <div className="text-[10px] font-mono uppercase opacity-75">
                      Box &quot;{box.name}&quot;
                    </div>
                    <div className="text-xl font-black font-mono mt-1 truncate">
                      {box.value}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Real C Engine Telemetry Badge */}
          {realTelemetry && (
            <div className="flex items-center gap-4 px-4 py-2 bg-[#fcf7ee] rounded-xl border border-[#ebdcc4] text-xs font-mono text-[#57534e]">
              <span className="flex items-center gap-1 font-bold text-[#2a9d8f]">
                <Box className="w-3.5 h-3.5" /> Stack/RAM: {realTelemetry.memoryBytes} Bytes
              </span>
              <span className="flex items-center gap-1 font-bold text-[#e57e25]">
                <Cpu className="w-3.5 h-3.5" /> ALU Cycles: ~{realTelemetry.cpuCycles}
              </span>
            </div>
          )}

          {/* Terminal Monitor Screen Output */}
          <div className="p-4 bg-[#2b2520] text-white rounded-2xl font-mono text-xs">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1 flex items-center justify-between pb-1 border-b border-slate-700">
              <span>Terminal Screen (stdout):</span>
              <span className={realExitCode === null || realExitCode === 0 ? 'text-emerald-400' : 'text-rose-400'}>
                exit code {realExitCode !== null ? realExitCode : 0}
              </span>
            </div>

            {realError ? (
              <div className="p-3 bg-rose-950/60 border border-rose-800 rounded-xl text-rose-300 whitespace-pre-wrap">
                <div className="flex items-center gap-1 text-xs font-bold text-rose-400 mb-1">
                  <AlertTriangle className="w-4 h-4" /> Real C Engine Compiler Diagnostic:
                </div>
                {realError}
              </div>
            ) : (
              <div className="text-emerald-400 min-h-[24px] pt-1 whitespace-pre-wrap">
                {realOutput !== null
                  ? realOutput
                  : accumulatedOutput
                  ? accumulatedOutput
                  : '> [Click "Run Real C Engine" or "Next Line" to see output]'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
