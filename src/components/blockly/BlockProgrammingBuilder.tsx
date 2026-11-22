'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Puzzle, Play, RotateCcw, Check, Sparkles, AlertTriangle, 
  Terminal, ArrowUp, ArrowDown, Award, HelpCircle, Layers, Code,
  BookOpen, ChevronRight, Zap
} from 'lucide-react';
import { useLearningContext } from '@/context/LearningContext';
import confetti from 'canvas-confetti';
import { requestCompileC } from '@/lib/apiCompilerClient';
import { 
  INDIAN_NATIVE_BLOCKS, 
  PRESET_BLOCK_PIPELINES, 
  BlockItem, 
  BlockPresetPipeline 
} from '@/data/master-catalog/indianBlocks';

export const BlockProgrammingBuilder: React.FC = () => {
  const { currentItem, setLevel, updateActiveCode, markMissionComplete } = useLearningContext();

  const [builderMode, setBuilderMode] = useState<'mission-puzzle' | 'freeform'>('mission-puzzle');
  
  // Mission Puzzle State (Code Monkey Mode)
  const [missionPieces, setMissionPieces] = useState<{ id: string; code: string; hint: string }[]>(
    [...currentItem.puzzleBlocks.pieces].reverse()
  );
  const [puzzleSolved, setPuzzleSolved] = useState<boolean>(false);
  const [puzzleError, setPuzzleError] = useState<string | null>(null);
  const [showHint, setShowHint] = useState<boolean>(false);

  // Freeform Pipeline State
  const [freeformPipeline, setFreeformPipeline] = useState<BlockItem[]>([
    INDIAN_NATIVE_BLOCKS[0], // Samosa count
    INDIAN_NATIVE_BLOCKS[1], // Samosa rate
    INDIAN_NATIVE_BLOCKS[2], // Chai count
    INDIAN_NATIVE_BLOCKS[3], // Chai rate
    INDIAN_NATIVE_BLOCKS[10], // Subtotal
    INDIAN_NATIVE_BLOCKS[11], // 18% GST
    INDIAN_NATIVE_BLOCKS[12], // Grand Total
    INDIAN_NATIVE_BLOCKS[34]  // Print invoice
  ]);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');

  // Execution State
  const [simStep, setSimStep] = useState<number>(-1);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [executionOutput, setExecutionOutput] = useState<string>('');
  const [executionStderr, setExecutionStderr] = useState<string>('');
  const [executionExitCode, setExecutionExitCode] = useState<number | null>(null);

  // Sync puzzle pieces whenever the global level changes
  useEffect(() => {
    setMissionPieces([...currentItem.puzzleBlocks.pieces].reverse());
    setPuzzleSolved(false);
    setPuzzleError(null);
    setShowHint(false);
    setExecutionOutput('');
    setExecutionStderr('');
    setExecutionExitCode(null);
    setSimStep(-1);
  }, [currentItem.id]);

  // Handle puzzle piece movement
  const handleMovePiece = (fromIdx: number, toIdx: number) => {
    if (toIdx < 0 || toIdx >= missionPieces.length) return;
    const copy = [...missionPieces];
    const [moved] = copy.splice(fromIdx, 1);
    copy.splice(toIdx, 0, moved);
    setMissionPieces(copy);
    setPuzzleSolved(false);
    setPuzzleError(null);
  };

  // Verify Puzzle Solution
  const handleVerifyPuzzle = () => {
    const isCorrect = missionPieces.every(
      (p, i) => p.id === currentItem.puzzleBlocks.correctOrder[i]
    );

    if (isCorrect) {
      setPuzzleSolved(true);
      setPuzzleError(null);
      markMissionComplete(currentItem.id);
      confetti({ particleCount: 75, spread: 70, origin: { y: 0.75 } });
      handleRunPuzzleCode();
    } else {
      setPuzzleSolved(false);
      setPuzzleError('Order mismatch! Follow the golden flow: Header #include -> Function signature -> Variables -> Computations -> Return.');
    }
  };

  // Compile and run the puzzle code
  const handleRunPuzzleCode = async () => {
    const puzzleCode = missionPieces.map(p => p.code).join('\n');
    updateActiveCode(puzzleCode);
    setIsExecuting(true);
    setExecutionOutput('');
    setExecutionStderr('');
    setExecutionExitCode(null);

    try {
      const res = await fetch('/api/compile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: puzzleCode })
      });
      const data = await res.json();
      setExecutionExitCode(data.exitCode ?? 0);

      if (res.ok && data.exitCode === 0) {
        setExecutionOutput(data.stdout || '[Program executed quietly with exit code 0]');
        setExecutionStderr('');
      } else {
        setExecutionStderr(data.stderr || data.error || 'Syntax execution error.');
        setExecutionOutput(data.stdout || '');
      }
    } catch (err: any) {
      setExecutionStderr(`Execution error: ${err.message}`);
      setExecutionExitCode(1);
    } finally {
      setIsExecuting(false);
    }
  };

  // Freeform handlers
  const handleAddFreeformBlock = (block: BlockItem) => {
    setFreeformPipeline([...freeformPipeline, block]);
    setExecutionOutput('');
    setExecutionStderr('');
  };

  const handleRemoveFreeformBlock = (idx: number) => {
    const copy = [...freeformPipeline];
    copy.splice(idx, 1);
    setFreeformPipeline(copy);
    setExecutionOutput('');
    setExecutionStderr('');
  };

  const handleLoadPreset = (preset: BlockPresetPipeline) => {
    const selectedBlocks = preset.blockIds
      .map(id => INDIAN_NATIVE_BLOCKS.find(b => b.id === id))
      .filter((b): b is BlockItem => Boolean(b));
    setFreeformPipeline(selectedBlocks);
    setExecutionOutput('');
    setExecutionStderr('');
    confetti({ particleCount: 30, spread: 45, origin: { y: 0.85 } });
  };

  const handleRunFreeformCode = () => {
    setIsExecuting(true);
    setSimStep(0);
    setExecutionOutput('');
    setExecutionStderr('');
    setExecutionExitCode(null);

    let step = 0;
    const interval = setInterval(async () => {
      step++;
      if (step < freeformPipeline.length) {
        setSimStep(step);
      } else {
        clearInterval(interval);
        const generatedCode = `#include <stdio.h>\n\nint main(void) {\n${freeformPipeline.map(b => '    ' + b.cEquivalent).join('\n')}\n    return 0;\n}`;
        updateActiveCode(generatedCode);

        try {
          const data = await requestCompileC(generatedCode);
          setExecutionExitCode(data.exitCode ?? 0);

          if (data.exitCode === 0) {
            setExecutionOutput(data.stdout || '[Program executed quietly with exit code 0]');
            setExecutionStderr('');
            confetti({ particleCount: 50, spread: 60, origin: { y: 0.85 } });
          } else {
            setExecutionStderr(data.stderr || data.error || 'Block syntax sequence error.');
            setExecutionOutput(data.stdout || '');
          }
        } catch (err: any) {
          setExecutionStderr(`Execution error: ${err.message}`);
          setExecutionExitCode(1);
        } finally {
          setIsExecuting(false);
        }
      }
    }, 450);
  };

  const handleReset = () => {
    setSimStep(-1);
    if (builderMode === 'mission-puzzle') {
      setMissionPieces([...currentItem.puzzleBlocks.pieces].reverse());
      setPuzzleSolved(false);
      setPuzzleError(null);
    } else {
      setFreeformPipeline([
        INDIAN_NATIVE_BLOCKS[0],
        INDIAN_NATIVE_BLOCKS[1],
        INDIAN_NATIVE_BLOCKS[2],
        INDIAN_NATIVE_BLOCKS[3],
        INDIAN_NATIVE_BLOCKS[10],
        INDIAN_NATIVE_BLOCKS[11],
        INDIAN_NATIVE_BLOCKS[12],
        INDIAN_NATIVE_BLOCKS[34]
      ]);
    }
    setExecutionOutput('');
    setExecutionStderr('');
    setExecutionExitCode(null);
  };

  const filteredBlocks = activeCategoryFilter === 'all'
    ? INDIAN_NATIVE_BLOCKS
    : INDIAN_NATIVE_BLOCKS.filter(b => b.category === activeCategoryFilter);

  return (
    <div className="bg-white border-2 border-[#ede3d2] rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b-2 border-[#ede3d2]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-[#fdf5ea] text-[#e57e25] border border-[#f3d4b1] mb-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Synchronized with Mission #{currentItem.id}: {currentItem.title.split(': ')[1] || currentItem.title}
          </div>
          <h3 className="text-xl md:text-2xl font-black text-[#2b2520]">
            Visual Block-to-C Logic Builder
          </h3>
          <p className="text-xs text-[#7d7065] font-medium mt-0.5">
            Stack and arrange colored logic blocks like Lego pieces. Watch natural logic transform into real, compilable C code!
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Mode Switcher Tabs */}
          <div className="flex bg-[#fcf7ee] border border-[#ede3d2] p-1 rounded-2xl">
            <button
              onClick={() => { setBuilderMode('mission-puzzle'); handleReset(); }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                builderMode === 'mission-puzzle'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'text-[#7d7065] hover:text-[#2b2520]'
              }`}
            >
              <Puzzle className="w-3.5 h-3.5" />
              <span>Mission Puzzle (Code Monkey)</span>
            </button>
            <button
              onClick={() => { setBuilderMode('freeform'); handleReset(); }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                builderMode === 'freeform'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'text-[#7d7065] hover:text-[#2b2520]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Freeform Block Lab</span>
            </button>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold bg-[#fcf7ee] hover:bg-[#ede3d2] text-[#7d7065] border border-[#ede3d2] cursor-pointer transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>
      </div>

      {/* MODE 1: MISSION PUZZLE (CODE MONKEY MODE) */}
      {builderMode === 'mission-puzzle' && (
        <div className="space-y-6">
          <div className="p-4 bg-amber-50/70 border-2 border-amber-200/80 rounded-2xl flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-black text-amber-900 block flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-600" />
                Level {currentItem.id} Puzzle Challenge: Solve the Code Sequence
              </span>
              <p className="text-[11px] text-amber-800 mt-0.5">
                Rearrange the shuffled C code blocks into their proper logical order. Click &quot;Verify &amp; Run Puzzle&quot; to test your solution on the real C engine and claim +50 points!
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Mission Selector Quick Switcher */}
              <div className="flex items-center gap-1 bg-white border border-amber-300 rounded-xl px-2 py-1 text-xs">
                <span className="text-[10px] text-amber-800 font-bold">Mission:</span>
                <select
                  value={currentItem.id}
                  onChange={(e) => setLevel(Number(e.target.value))}
                  className="bg-transparent font-black text-amber-900 focus:outline-none cursor-pointer"
                >
                  {Array.from({ length: 150 }, (_, i) => i + 1).map((lvl) => (
                    <option key={lvl} value={lvl}>
                      #{lvl}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => setShowHint(!showHint)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-white text-amber-900 border border-amber-300 hover:bg-amber-100 cursor-pointer transition"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{showHint ? 'Hide Hints' : 'Show Hints'}</span>
              </button>
              <button
                onClick={handleVerifyPuzzle}
                disabled={isExecuting}
                className="friendly-button-amber px-4 py-2 text-xs flex items-center gap-1.5 cursor-pointer shadow-sm disabled:opacity-50"
              >
                <Check className="w-4 h-4 text-white" />
                <span>{isExecuting ? 'Compiling...' : 'Verify & Run Puzzle'}</span>
              </button>
            </div>
          </div>

          {/* Feedback Banner */}
          {puzzleSolved && (
            <div className="p-4 bg-emerald-50 border-2 border-emerald-300 rounded-2xl flex items-center gap-3 text-emerald-900 text-xs font-bold">
              <span className="text-xl">🎉</span>
              <div>
                <div className="font-black text-emerald-800 text-sm">Puzzle Solved Successfully! (+50 Points Earned)</div>
                <div className="text-emerald-700 font-medium mt-0.5">
                  The code sequence is 100% correct and executed on the real C compiler below with exit code 0.
                </div>
              </div>
            </div>
          )}

          {puzzleError && (
            <div className="p-3.5 bg-rose-50 border-2 border-rose-300 rounded-2xl flex items-center gap-2 text-rose-800 text-xs font-medium">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{puzzleError}</span>
            </div>
          )}

          {/* Grid: Shuffled Puzzle Pieces (Left) & Real Code Preview / Terminal (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 7 cols: Interactive Reorderable Puzzle Pieces */}
            <div className="lg:col-span-7 bg-[#fcf7ee] border-2 border-[#ebdcc4] rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between text-xs font-black text-[#7d7065] pb-2 border-b border-[#ebdcc4]">
                <span>Arrange Code Blocks ({missionPieces.length} Pieces):</span>
                <span className="text-[#e57e25]">Top-to-Bottom Execution Flow</span>
              </div>

              <div className="space-y-3">
                {missionPieces.map((piece, idx) => (
                  <motion.div
                    key={piece.id}
                    layout
                    className="p-3.5 rounded-2xl border-2 bg-white border-[#ebdcc4] shadow-2xs hover:border-amber-400 flex items-center justify-between gap-3 transition"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center font-black text-xs text-amber-900 shrink-0">
                        {idx + 1}
                      </span>
                      <div>
                        <pre className="font-mono text-xs font-bold text-[#2b2520] whitespace-pre-wrap leading-relaxed">
                          {piece.code}
                        </pre>
                        {showHint && (
                          <div className="text-[10px] text-amber-700 font-medium mt-1 flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-flex">
                            <span>💡 Hint:</span> {piece.hint}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => handleMovePiece(idx, idx - 1)}
                        disabled={idx === 0}
                        title="Move Up"
                        className="p-1.5 rounded-lg border border-[#ede3d2] hover:bg-[#ede3d2] text-[#7d7065] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleMovePiece(idx, idx + 1)}
                        disabled={idx === missionPieces.length - 1}
                        title="Move Down"
                        className="p-1.5 rounded-lg border border-[#ede3d2] hover:bg-[#ede3d2] text-[#7d7065] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right 5 cols: Live Code & Real C Engine Terminal Output */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              <div className="bg-[#2b2520] text-[#f4eedb] p-5 rounded-2xl font-mono text-xs shadow-inner">
                <div className="flex items-center justify-between pb-2 border-b border-slate-700 text-slate-400 text-[11px] mb-2 font-sans">
                  <span className="font-bold text-amber-300 flex items-center gap-1">
                    <Code className="w-3.5 h-3.5" />
                    Assembled C Code
                  </span>
                  <span className="text-emerald-400">Mission #{currentItem.id}</span>
                </div>

                <pre className="py-2 overflow-x-auto text-emerald-300 whitespace-pre-wrap leading-relaxed">
                  {missionPieces.map(p => p.code).join('\n')}
                </pre>
              </div>

              {/* Terminal */}
              <div className="bg-[#2b2520] text-white p-4 rounded-2xl font-mono text-xs space-y-2">
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-700 text-slate-400 text-[11px] font-sans">
                  <span className="flex items-center gap-1">
                    <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Real C Engine Terminal Output</span>
                  </span>
                  <span className={executionExitCode === null || executionExitCode === 0 ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                    exit code {executionExitCode !== null ? executionExitCode : 0}
                  </span>
                </div>

                {executionStderr ? (
                  <div className="p-2.5 bg-rose-950/60 border border-rose-800 rounded-xl text-rose-300 whitespace-pre-wrap">
                    <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-rose-400 mb-1">
                      <AlertTriangle className="w-3.5 h-3.5" /> Compiler Diagnostics:
                    </div>
                    {executionStderr}
                  </div>
                ) : executionOutput ? (
                  <pre className="text-emerald-400 whitespace-pre leading-relaxed overflow-x-auto">
                    {executionOutput}
                  </pre>
                ) : (
                  <div className="py-4 text-center text-slate-500 text-xs font-sans">
                    Rearrange the blocks above and click &quot;Verify &amp; Run Puzzle&quot; to test your solution!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: FREEFORM BLOCK LAB */}
      {builderMode === 'freeform' && (
        <div className="space-y-6">
          {/* Preset Workflows Bar */}
          <div className="p-4 bg-[#fdf5ea] border-2 border-[#f3d4b1] rounded-2xl flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#e57e25]" />
              <span className="text-xs font-black text-[#b45309]">Load Ready-to-Run Preset Workflows:</span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {PRESET_BLOCK_PIPELINES.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handleLoadPreset(preset)}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white text-[#7d7065] hover:bg-[#ede3d2] hover:text-[#2b2520] border border-[#ebdcc4] cursor-pointer transition shadow-2xs"
                >
                  {preset.title}
                </button>
              ))}
            </div>
          </div>

          {/* Available Blocks Palette */}
          <div className="p-4 bg-[#fcf7ee] border-2 border-[#ebdcc4] rounded-2xl space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-[11px] font-black text-[#7d7065] uppercase tracking-wider block">
                Click any block below to append it to your program chain ({filteredBlocks.length} blocks available):
              </span>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-1">
                {['all', 'input', 'calc', 'decision', 'loop', 'array', 'string', 'function', 'pointer', 'struct', 'output'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategoryFilter(cat)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition cursor-pointer ${
                      activeCategoryFilter === cat
                        ? 'bg-amber-500 text-white shadow-2xs'
                        : 'bg-white text-[#7d7065] hover:bg-[#ede3d2] border border-[#ede3d2]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 max-h-56 overflow-y-auto p-1">
              {filteredBlocks.map((block) => (
                <button
                  key={block.id}
                  onClick={() => handleAddFreeformBlock(block)}
                  className={`px-3 py-2 rounded-xl text-xs font-black border-2 shadow-2xs hover:scale-105 active:scale-95 transition cursor-pointer flex items-center gap-1.5 ${block.color}`}
                >
                  <Puzzle className="w-3.5 h-3.5" />
                  <span>{block.label}</span>
                  <span className="text-[10px] opacity-60 ml-1">+ Add</span>
                </button>
              ))}
            </div>
          </div>

          {/* Workspace: Visual Pipeline (Left) & Real C Translation / Terminal (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Pipeline (7 cols) */}
            <div className="lg:col-span-7 bg-[#fcf7ee] border-2 border-[#ebdcc4] rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between text-xs font-black text-[#7d7065] pb-2 border-b border-[#ebdcc4]">
                <span>Your Custom Program Chain ({freeformPipeline.length} Blocks):</span>
                <button
                  onClick={handleRunFreeformCode}
                  disabled={isExecuting || freeformPipeline.length === 0}
                  className="friendly-button-amber px-4 py-1.5 text-xs flex items-center gap-1.5 cursor-pointer shadow-sm disabled:opacity-50"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>{isExecuting ? 'Simulating...' : 'Run & Sync C Code'}</span>
                </button>
              </div>

              <div className="space-y-3">
                {freeformPipeline.map((block, idx) => {
                  const isExecutingThis = simStep === idx;
                  return (
                    <motion.div
                      key={`${block.id}-${idx}`}
                      layout
                      className={`p-3.5 rounded-2xl border-2 flex items-center justify-between transition-all ${block.color} ${
                        isExecutingThis
                          ? 'scale-105 ring-4 ring-[#f48c06] shadow-md'
                          : 'hover:shadow-xs'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-white/80 border flex items-center justify-center font-bold text-xs text-[#2b2520]">
                          {idx + 1}
                        </span>
                        <div>
                          <div className="font-black text-sm">{block.label}</div>
                          <div className="text-[11px] opacity-80 mt-0.5">
                            {block.plainEnglish}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleRemoveFreeformBlock(idx)}
                        className="text-xs text-red-600 hover:text-red-800 font-black px-2 py-1 rounded hover:bg-white/50 cursor-pointer"
                      >
                        ✕
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Right Live C Code Translation & Terminal Output (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              <div className="bg-[#2b2520] text-[#f4eedb] p-5 rounded-2xl font-mono text-xs shadow-inner">
                <div className="flex items-center justify-between pb-2 border-b border-slate-700 text-slate-400 text-[11px] mb-2 font-sans">
                  <span className="font-bold text-amber-300">Synchronized C Code</span>
                  <span className="text-emerald-400">Valid ISO C11</span>
                </div>

                <div className="space-y-1 py-1 overflow-x-auto leading-relaxed">
                  <span className="text-slate-500">// Auto-generated from your visual blocks</span>
                  <div className="text-purple-400">#include &lt;stdio.h&gt;</div>
                  <div className="text-blue-400">int main(void) &#123;</div>

                  <div className="pl-4 space-y-1 my-1 border-l-2 border-amber-500/40">
                    {freeformPipeline.map((b, i) => (
                      <div
                        key={i}
                        className={`transition-colors rounded px-1 whitespace-pre-wrap ${
                          simStep === i ? 'bg-amber-400/20 text-amber-300 font-bold' : 'text-slate-200'
                        }`}
                      >
                        {b.cEquivalent}
                      </div>
                    ))}
                    <div className="text-slate-300">return 0;</div>
                  </div>

                  <div className="text-blue-400">&#125;</div>
                </div>
              </div>

              {/* Real C Engine Execution Output */}
              <div className="bg-[#2b2520] text-white p-4 rounded-2xl font-mono text-xs space-y-2">
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-700 text-slate-400 text-[11px] font-sans">
                  <span className="flex items-center gap-1">
                    <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Real C Engine Terminal Output</span>
                  </span>
                  <span className={executionExitCode === null || executionExitCode === 0 ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                    exit code {executionExitCode !== null ? executionExitCode : 0}
                  </span>
                </div>

                {executionStderr ? (
                  <div className="p-2.5 bg-rose-950/60 border border-rose-800 rounded-xl text-rose-300 whitespace-pre-wrap">
                    <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-rose-400 mb-1">
                      <AlertTriangle className="w-3.5 h-3.5" /> Compiler Diagnostics:
                    </div>
                    {executionStderr}
                  </div>
                ) : executionOutput ? (
                  <pre className="text-emerald-400 whitespace-pre leading-relaxed overflow-x-auto">
                    {executionOutput}
                  </pre>
                ) : (
                  <div className="py-4 text-center text-slate-500 text-xs font-sans">
                    Click &quot;Run &amp; Sync C Code&quot; to execute these blocks on the real C engine!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
