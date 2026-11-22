'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MASTER_CURRICULUM_150, MasterCurriculumItem, MasteryTier } from '@/data/master-catalog/master150Curriculum';
import {
  Sparkles,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  Play,
  CheckCircle2,
  Cpu,
  Layers,
  Terminal,
  Code2,
  BookOpen,
  Award,
  Search,
  Filter,
  Lightbulb,
  TreeDeciduous,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Flame,
  AlertTriangle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLearningContext } from '@/context/LearningContext';
import { requestCompileC } from '@/lib/apiCompilerClient';

export const UnifiedMasteryExplorer: React.FC = () => {
  const { currentItem, setLevel, markMissionComplete, updateActiveCode } = useLearningContext();

  const [activeTierFilter, setActiveTierFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeSubTab, setActiveSubTab] = useState<'intuition' | 'multiple-ways' | 'silicon' | 'puzzle-solve' | 'live-compile'>('intuition');

  // Puzzle State for current item (deterministic initial state for Next.js SSR)
  const [puzzlePieces, setPuzzlePieces] = useState<{ id: string; code: string; hint: string }[]>(
    [...currentItem.puzzleBlocks.pieces].reverse()
  );
  const [puzzleFeedback, setPuzzleFeedback] = useState<{ success: boolean; message: string } | null>(null);
  const [showHint, setShowHint] = useState<boolean>(false);

  // Live Compiler State for current item
  const [customCode, setCustomCode] = useState<string>(currentItem.codingApproaches.beginnerFriendly.code);
  const [compileOutput, setCompileOutput] = useState<string>('');
  const [compileStderr, setCompileStderr] = useState<string>('');
  const [compileExitCode, setCompileExitCode] = useState<number | null>(null);
  const [compilerNotes, setCompilerNotes] = useState<string[]>([]);
  const [isCompiling, setIsCompiling] = useState<boolean>(false);

  // When changing item, sync all tabs
  const handleSelectItem = (item: MasterCurriculumItem) => {
    setLevel(item.id);
    setPuzzlePieces([...item.puzzleBlocks.pieces].reverse());
    setPuzzleFeedback(null);
    setShowHint(false);
    setCustomCode(item.codingApproaches.beginnerFriendly.code);
    setCompileOutput('');
    setCompileStderr('');
    setCompileExitCode(null);
    setCompilerNotes([]);
    updateActiveCode(item.codingApproaches.beginnerFriendly.code);
  };

  const handlePrevLevel = () => {
    const prevId = currentItem.id > 1 ? currentItem.id - 1 : 150;
    const prevItem = MASTER_CURRICULUM_150.find((i) => i.id === prevId);
    if (prevItem) handleSelectItem(prevItem);
  };

  const handleNextLevel = () => {
    const nextId = currentItem.id < 150 ? currentItem.id + 1 : 1;
    const nextItem = MASTER_CURRICULUM_150.find((i) => i.id === nextId);
    if (nextItem) handleSelectItem(nextItem);
  };

  const handleMovePiece = (fromIdx: number, toIdx: number) => {
    if (toIdx < 0 || toIdx >= puzzlePieces.length) return;
    const copy = [...puzzlePieces];
    const [moved] = copy.splice(fromIdx, 1);
    copy.splice(toIdx, 0, moved);
    setPuzzlePieces(copy);
    setPuzzleFeedback(null);
  };

  const handleCheckPuzzle = () => {
    const isCorrect = puzzlePieces.every(
      (p, i) => p.id === currentItem.puzzleBlocks.correctOrder[i]
    );

    if (isCorrect) {
      setPuzzleFeedback({
        success: true,
        message: `Outstanding! 🎉 You solved Mission #${currentItem.id}! The code logic flows properly (+50 Bananas earned).`
      });
      markMissionComplete(currentItem.id);
      confetti({ particleCount: 70, spread: 65, origin: { y: 0.8 } });
    } else {
      setPuzzleFeedback({
        success: false,
        message: 'Order mismatch! Remember the golden sequence: #include first -> main() -> variables -> computation -> return 0!'
      });
    }
  };

  const handleRunCompiler = async () => {
    setIsCompiling(true);
    setCompileOutput('');
    setCompileStderr('');
    setCompileExitCode(null);
    setCompilerNotes([]);
    updateActiveCode(customCode);

    try {
      const data = await requestCompileC(customCode);
      setCompileExitCode(data.exitCode ?? 0);
      setCompilerNotes(data.compilerNotes || []);

      if (data.exitCode === 0) {
        setCompileOutput(data.stdout || '[Program executed successfully with exit code 0]');
        setCompileStderr('');
        confetti({ particleCount: 45, spread: 55, origin: { y: 0.85 } });
      } else {
        setCompileStderr(data.stderr || data.error || 'Compiler or Runtime Diagnostics Error');
        setCompileOutput(data.stdout || '');
      }
    } catch (err: any) {
      setCompileStderr(`Execution request failed: ${err.message}`);
      setCompileExitCode(1);
    } finally {
      setIsCompiling(false);
    }
  };

  // Filter items
  const filteredItems = MASTER_CURRICULUM_150.filter((item) => {
    const matchesTier = activeTierFilter === 'all' || item.tier === activeTierFilter;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTier && matchesSearch;
  });

  return (
    <div className="bg-white border-2 border-[#ede3d2] rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b-2 border-[#ede3d2]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-3xl">🧭</span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl md:text-2xl font-black text-[#2b2520]">
                  The 150-Level C Mastery &amp; Data Structures Curriculum
                </h2>
                <span className="text-xs bg-[#fdf5ea] text-[#e57e25] border border-[#f3d4b1] px-2.5 py-0.5 rounded-full font-bold">
                  Level {currentItem.id} of 150
                </span>
              </div>
              <p className="text-xs text-[#7d7065] font-medium mt-0.5">
                Every level includes: Everyday Analogy &bull; Multiple Ways of Coding &bull; Hardware Dissection &bull; Block Puzzle &bull; Live Compiler
              </p>
            </div>
          </div>
        </div>

        {/* Tier Stats Badge */}
        <div className="flex items-center gap-2 bg-[#fcf7ee] border-2 border-[#ebdcc4] px-4 py-2 rounded-2xl text-xs font-bold text-[#7d7065]">
          <Award className="w-4 h-4 text-[#e57e25]" />
          <span>Curriculum Scope: 1 to 150 Levels Complete</span>
        </div>
      </div>

      {/* Filter and Search Drawer */}
      <div className="bg-[#fcf7ee] border-2 border-[#ebdcc4] p-4 rounded-2xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* Tier Tabs */}
          <div className="flex flex-wrap gap-1.5 text-xs font-black">
            <button
              onClick={() => setActiveTierFilter('all')}
              className={`px-3 py-1.5 rounded-xl border-2 transition cursor-pointer ${
                activeTierFilter === 'all'
                  ? 'bg-[#f48c06] text-white border-[#b75700]'
                  : 'bg-white text-[#7d7065] border-[#ede3d2] hover:bg-[#faf4ea]'
              }`}
            >
              All (1-150)
            </button>
            <button
              onClick={() => setActiveTierFilter('tier-1-foundation')}
              className={`px-3 py-1.5 rounded-xl border-2 transition cursor-pointer ${
                activeTierFilter === 'tier-1-foundation'
                  ? 'bg-[#f48c06] text-white border-[#b75700]'
                  : 'bg-white text-[#7d7065] border-[#ede3d2] hover:bg-[#faf4ea]'
              }`}
            >
              1. Foundations (1-30)
            </button>
            <button
              onClick={() => setActiveTierFilter('tier-2-decisions')}
              className={`px-3 py-1.5 rounded-xl border-2 transition cursor-pointer ${
                activeTierFilter === 'tier-2-decisions'
                  ? 'bg-[#f48c06] text-white border-[#b75700]'
                  : 'bg-white text-[#7d7065] border-[#ede3d2] hover:bg-[#faf4ea]'
              }`}
            >
              2. Decisions &amp; Loops (31-60)
            </button>
            <button
              onClick={() => setActiveTierFilter('tier-3-structures')}
              className={`px-3 py-1.5 rounded-xl border-2 transition cursor-pointer ${
                activeTierFilter === 'tier-3-structures'
                  ? 'bg-[#f48c06] text-white border-[#b75700]'
                  : 'bg-white text-[#7d7065] border-[#ede3d2] hover:bg-[#faf4ea]'
              }`}
            >
              3. Arrays &amp; Functions (61-90)
            </button>
            <button
              onClick={() => setActiveTierFilter('tier-4-lowlevel')}
              className={`px-3 py-1.5 rounded-xl border-2 transition cursor-pointer ${
                activeTierFilter === 'tier-4-lowlevel'
                  ? 'bg-[#f48c06] text-white border-[#b75700]'
                  : 'bg-white text-[#7d7065] border-[#ede3d2] hover:bg-[#faf4ea]'
              }`}
            >
              4. Pointers &amp; Heap (91-120)
            </button>
            <button
              onClick={() => setActiveTierFilter('tier-5-ds-daa')}
              className={`px-3 py-1.5 rounded-xl border-2 transition cursor-pointer ${
                activeTierFilter === 'tier-5-ds-daa'
                  ? 'bg-[#f48c06] text-white border-[#b75700]'
                  : 'bg-white text-[#7d7065] border-[#ede3d2] hover:bg-[#faf4ea]'
              }`}
            >
              5. Data Structures &amp; DAA (121-150)
            </button>
          </div>

          {/* Quick Search */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topic or level..."
              className="px-3 py-1.5 pl-8 text-xs bg-white border-2 border-[#ede3d2] rounded-xl focus:outline-none focus:border-[#f48c06] w-48 text-[#2b2520]"
            />
            <Search className="w-3.5 h-3.5 text-[#7d7065] absolute left-2.5 top-2.5" />
          </div>
        </div>

        {/* Level Horizontal Grid Scroller & Stepper */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-[#7d7065] pt-1">
            <div className="flex items-center gap-2">
              <span>Select Mission ({filteredItems.length} Available):</span>
              <select
                value={currentItem.id}
                onChange={(e) => {
                  const targetItem = MASTER_CURRICULUM_150.find(i => i.id === Number(e.target.value));
                  if (targetItem) handleSelectItem(targetItem);
                }}
                className="bg-white border border-[#ebdcc4] text-[#2b2520] font-bold rounded-lg px-2 py-1 text-xs cursor-pointer focus:outline-none focus:border-[#f48c06]"
              >
                {MASTER_CURRICULUM_150.map(item => (
                  <option key={item.id} value={item.id}>
                    Level {item.id}: {item.title.split(': ')[1] || item.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrevLevel}
                className="px-2.5 py-1 rounded-lg text-xs font-bold bg-white hover:bg-[#ede3d2] text-[#7d7065] border border-[#ede3d2] cursor-pointer transition flex items-center gap-1"
                title="Go to previous mission"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev Level</span>
              </button>
              <button
                onClick={handleNextLevel}
                className="px-2.5 py-1 rounded-lg text-xs font-bold bg-[#fdf5ea] hover:bg-[#faebd7] text-[#e57e25] border border-[#f3d4b1] cursor-pointer transition flex items-center gap-1"
                title="Go to next mission"
              >
                <span>Next Level</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-h-24 flex-wrap">
            {filteredItems.map((item) => {
              const isSelected = item.id === currentItem.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectItem(item)}
                  className={`w-9 h-9 rounded-xl font-black text-xs shrink-0 transition cursor-pointer border-2 flex items-center justify-center ${
                    isSelected
                      ? 'bg-[#f48c06] text-white border-[#b75700] shadow-sm scale-105 ring-2 ring-[#f48c06]/30'
                      : 'bg-white text-[#7d7065] border-[#ede3d2] hover:bg-[#faf4ea]'
                  }`}
                  title={item.title}
                >
                  {item.id}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Current Level Header Card */}
      <div className="bg-[#fcf7ee] border-2 border-[#ebdcc4] rounded-2xl p-5 space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-3xl">{currentItem.themeIcon}</span>
            <div>
              <span className="text-[10px] font-black uppercase text-[#e57e25] tracking-wider">
                {currentItem.tierLabel}
              </span>
              <h3 className="text-lg md:text-xl font-black text-[#2b2520]">
                {currentItem.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevLevel}
              className="p-1.5 rounded-xl bg-white hover:bg-[#ede3d2] text-[#7d7065] border border-[#ebdcc4] cursor-pointer transition"
              title="Previous Mission"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold font-mono px-2 py-1 bg-white border border-[#ebdcc4] rounded-xl text-[#e57e25]">
              #{currentItem.id} / 150
            </span>
            <button
              onClick={handleNextLevel}
              className="p-1.5 rounded-xl bg-[#fdf5ea] hover:bg-[#faebd7] text-[#e57e25] border border-[#f3d4b1] cursor-pointer transition"
              title="Next Mission"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {currentItem.daaComplexity && (
              <div className="hidden sm:flex items-center gap-2 text-xs font-mono font-bold bg-white px-3 py-1.5 rounded-xl border border-[#ebdcc4]">
                <span className="text-[#2a9d8f]">Time: {currentItem.daaComplexity.timeComplexity}</span>
                <span className="text-slate-300">|</span>
                <span className="text-[#e57e25]">Space: {currentItem.daaComplexity.spaceComplexity}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sync Tabs (All pages sync to this level!) */}
      <div className="flex border-b-2 border-[#ede3d2] gap-1 overflow-x-auto text-xs font-black">
        <button
          onClick={() => setActiveSubTab('intuition')}
          className={`pb-3 px-4 border-b-4 transition cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'intuition'
              ? 'border-[#f48c06] text-[#e57e25]'
              : 'border-transparent text-[#7d7065] hover:text-[#2b2520]'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          1. Real-Life Intuition
        </button>

        <button
          onClick={() => setActiveSubTab('multiple-ways')}
          className={`pb-3 px-4 border-b-4 transition cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'multiple-ways'
              ? 'border-[#f48c06] text-[#e57e25]'
              : 'border-transparent text-[#7d7065] hover:text-[#2b2520]'
          }`}
        >
          <Code2 className="w-4 h-4" />
          2. Multiple Ways of Coding
        </button>

        <button
          onClick={() => setActiveSubTab('silicon')}
          className={`pb-3 px-4 border-b-4 transition cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'silicon'
              ? 'border-[#f48c06] text-[#e57e25]'
              : 'border-transparent text-[#7d7065] hover:text-[#2b2520]'
          }`}
        >
          <Cpu className="w-4 h-4" />
          3. Hardware Dissection
        </button>

        <button
          onClick={() => setActiveSubTab('puzzle-solve')}
          className={`pb-3 px-4 border-b-4 transition cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'puzzle-solve'
              ? 'border-[#f48c06] text-[#e57e25]'
              : 'border-transparent text-[#7d7065] hover:text-[#2b2520]'
          }`}
        >
          <Layers className="w-4 h-4" />
          4. Code Monkey Puzzle
        </button>

        <button
          onClick={() => setActiveSubTab('live-compile')}
          className={`pb-3 px-4 border-b-4 transition cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'live-compile'
              ? 'border-[#f48c06] text-[#e57e25]'
              : 'border-transparent text-[#7d7065] hover:text-[#2b2520]'
          }`}
        >
          <Terminal className="w-4 h-4" />
          5. Live Execution
        </button>
      </div>

      {/* Tab Panels */}
      <AnimatePresence mode="wait">
        {/* 1. Real-Life Intuition */}
        {activeSubTab === 'intuition' && (
          <motion.div
            key="intuition"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="space-y-4"
          >
            <div className="bg-[#fcf7ee] border-2 border-[#ebdcc4] rounded-2xl p-6 space-y-3">
              <div className="text-sm font-black text-[#d97706] flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                Everyday Story &amp; Mental Model:
              </div>
              <p className="text-base text-[#3d3630] font-medium leading-relaxed">
                {currentItem.realLifeAnalogy.story}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border-2 border-[#ede3d2] p-4 rounded-2xl space-y-1">
                <div className="text-xs font-black text-[#2a9d8f] uppercase">
                  Physical Computer Concept:
                </div>
                <p className="text-sm text-[#57534e] leading-relaxed">
                  {currentItem.realLifeAnalogy.physicalConcept}
                </p>
              </div>

              <div className="bg-white border-2 border-[#ede3d2] p-4 rounded-2xl space-y-1">
                <div className="text-xs font-black text-[#e57e25] uppercase">
                  Golden Rule of Thumb:
                </div>
                <p className="text-sm text-[#57534e] leading-relaxed">
                  {currentItem.realLifeAnalogy.ruleOfThumb}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* 2. Multiple Ways of Coding */}
        {activeSubTab === 'multiple-ways' && (
          <motion.div
            key="multiple-ways"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Approach A */}
            <div className="bg-[#fcf7ee] border-2 border-[#ebdcc4] p-5 rounded-2xl space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black uppercase text-[#2a9d8f] bg-white px-2 py-0.5 rounded-full border border-[#ebdcc4]">
                  Approach 1: Beginner-Friendly &amp; Clear
                </span>
                <h4 className="text-base font-black text-[#2b2520] mt-1.5">
                  {currentItem.codingApproaches.beginnerFriendly.name}
                </h4>
                <p className="text-xs text-[#7d7065] mt-0.5 mb-3">
                  {currentItem.codingApproaches.beginnerFriendly.description}
                </p>
                <div className="bg-[#2b2520] text-[#f4eedb] p-3.5 rounded-xl font-mono text-xs overflow-x-auto shadow-inner">
                  <pre>{currentItem.codingApproaches.beginnerFriendly.code}</pre>
                </div>
              </div>
              <button
                onClick={() => {
                  setCustomCode(currentItem.codingApproaches.beginnerFriendly.code);
                  setActiveSubTab('live-compile');
                }}
                className="w-full py-2 bg-white hover:bg-[#ede3d2] border-2 border-[#ebdcc4] text-[#2b2520] rounded-xl text-xs font-black cursor-pointer transition"
              >
                Load into Live Compiler &rarr;
              </button>
            </div>

            {/* Approach B */}
            <div className="bg-[#fcf7ee] border-2 border-[#ebdcc4] p-5 rounded-2xl space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black uppercase text-[#e57e25] bg-white px-2 py-0.5 rounded-full border border-[#ebdcc4]">
                  Approach 2: High-Performance / Professional C
                </span>
                <h4 className="text-base font-black text-[#2b2520] mt-1.5">
                  {currentItem.codingApproaches.optimizedPro.name}
                </h4>
                <p className="text-xs text-[#7d7065] mt-0.5 mb-3">
                  {currentItem.codingApproaches.optimizedPro.description}
                </p>
                <div className="bg-[#2b2520] text-[#f4eedb] p-3.5 rounded-xl font-mono text-xs overflow-x-auto shadow-inner">
                  <pre>{currentItem.codingApproaches.optimizedPro.code}</pre>
                </div>
              </div>
              <button
                onClick={() => {
                  setCustomCode(currentItem.codingApproaches.optimizedPro.code);
                  setActiveSubTab('live-compile');
                }}
                className="w-full py-2 bg-white hover:bg-[#ede3d2] border-2 border-[#ebdcc4] text-[#2b2520] rounded-xl text-xs font-black cursor-pointer transition"
              >
                Load into Live Compiler &rarr;
              </button>
            </div>
          </motion.div>
        )}

        {/* 3. Hardware Dissection */}
        {activeSubTab === 'silicon' && (
          <motion.div
            key="silicon"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white border-2 border-[#ede3d2] p-4 rounded-2xl space-y-1">
                <div className="text-xs font-black text-[#2a9d8f] uppercase">
                  Primary RAM Segment:
                </div>
                <div className="text-lg font-black text-[#2b2520]">
                  .{currentItem.hardwareDissection.memorySegment} segment
                </div>
              </div>

              <div className="bg-white border-2 border-[#ede3d2] p-4 rounded-2xl space-y-1">
                <div className="text-xs font-black text-[#e57e25] uppercase">
                  Memory Footprint:
                </div>
                <div className="text-sm font-bold text-[#57534e]">
                  {currentItem.hardwareDissection.ramFootprint}
                </div>
              </div>

              <div className="bg-white border-2 border-[#ede3d2] p-4 rounded-2xl space-y-1">
                <div className="text-xs font-black text-[#457b9d] uppercase">
                  CPU Registers Involved:
                </div>
                <div className="flex flex-wrap gap-1">
                  {currentItem.hardwareDissection.cpuRegisters.map((reg, rIdx) => (
                    <span key={rIdx} className="px-2 py-0.5 bg-[#edf4f8] border border-[#c2d9e5] text-[11px] font-mono font-bold text-[#457b9d] rounded">
                      {reg}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-[#fcf7ee] border-2 border-[#ebdcc4] p-5 rounded-2xl space-y-2">
              <div className="text-xs font-black text-[#d97706] uppercase flex items-center gap-1.5">
                <Cpu className="w-4 h-4" />
                Assembly &amp; CPU Silicon Logic:
              </div>
              <p className="text-sm font-mono text-[#2b2520] bg-white p-3 rounded-xl border border-[#ebdcc4] leading-relaxed">
                {currentItem.hardwareDissection.assemblyNotes}
              </p>
            </div>
          </motion.div>
        )}

        {/* 4. Code Monkey Puzzle */}
        {activeSubTab === 'puzzle-solve' && (
          <motion.div
            key="puzzle-solve"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between text-xs font-black text-[#7d7065]">
              <span>Re-order the code blocks for Mission #{currentItem.id}:</span>
              <button
                onClick={() => setShowHint(!showHint)}
                className="text-[#e57e25] hover:underline cursor-pointer"
              >
                {showHint ? 'Hide Clues' : '💡 Need a Clue?'}
              </button>
            </div>

            <div className="space-y-2">
              {puzzlePieces.map((piece, pIdx) => (
                <div
                  key={piece.id}
                  className="p-4 bg-white border-2 border-[#ede3d2] hover:border-[#f48c06] rounded-2xl flex items-center justify-between gap-3 shadow-2xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-[#fcf7ee] border border-[#ebdcc4] text-xs font-black flex items-center justify-center text-[#e57e25]">
                      {pIdx + 1}
                    </span>
                    <div>
                      <pre className="font-mono text-xs md:text-sm text-[#2b2520] font-bold whitespace-pre-wrap">
                        {piece.code}
                      </pre>
                      {showHint && (
                        <div className="text-[11px] text-[#2a9d8f] font-sans font-bold mt-1">
                          💡 Clue: {piece.hint}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      disabled={pIdx === 0}
                      onClick={() => handleMovePiece(pIdx, pIdx - 1)}
                      className="p-2 rounded-xl bg-[#fcf7ee] hover:bg-[#ede3d2] disabled:opacity-20 text-[#2b2520] cursor-pointer"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      disabled={pIdx === puzzlePieces.length - 1}
                      onClick={() => handleMovePiece(pIdx, pIdx + 1)}
                      className="p-2 rounded-xl bg-[#fcf7ee] hover:bg-[#ede3d2] disabled:opacity-20 text-[#2b2520] cursor-pointer"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {puzzleFeedback && (
              <div
                className={`p-4 rounded-2xl border-2 text-sm font-black flex items-center gap-3 ${
                  puzzleFeedback.success
                    ? 'bg-[#eaf6f4] text-[#2a9d8f] border-[#2a9d8f]'
                    : 'bg-[#fdf0ec] text-[#e76f51] border-[#e76f51]'
                }`}
              >
                {puzzleFeedback.success ? <CheckCircle2 className="w-6 h-6 shrink-0" /> : <Flame className="w-6 h-6 shrink-0" />}
                <span>{puzzleFeedback.message}</span>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                onClick={handleCheckPuzzle}
                className="friendly-button-amber px-8 py-3 text-sm flex items-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Verify Puzzle Sequence!</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* 5. Live Compiler */}
        {activeSubTab === 'live-compile' && (
          <motion.div
            key="live-compile"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
          >
            <div className="lg:col-span-7 flex flex-col bg-[#fcf7ee] border-2 border-[#ebdcc4] rounded-2xl p-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#ebdcc4] text-xs font-bold text-[#57534e] mb-2 font-mono">
                <span>Editor (Level {currentItem.id}.c)</span>
                <span className="text-[#e57e25]">Editable C Code</span>
              </div>
              <textarea
                value={customCode}
                onChange={(e) => setCustomCode(e.target.value)}
                className="flex-1 w-full bg-white p-3 font-mono text-xs text-[#2b2520] rounded-xl border border-[#ebdcc4] leading-relaxed focus:outline-none resize-none min-h-[280px]"
                spellCheck={false}
              />
              <div className="mt-3 flex justify-end">
                <button
                  onClick={handleRunCompiler}
                  disabled={isCompiling}
                  className="friendly-button-amber px-6 py-2.5 text-xs flex items-center gap-2 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>{isCompiling ? 'Compiling...' : 'Run & Execute'}</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between bg-[#2b2520] text-white rounded-2xl p-4 font-mono text-xs">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-700 text-slate-400 text-[11px] mb-3">
                  <span>Terminal Console (Level {currentItem.id})</span>
                  <span className={compileExitCode === null || compileExitCode === 0 ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                    exit code {compileExitCode !== null ? compileExitCode : 0}
                  </span>
                </div>

                {compileStderr ? (
                  <div className="p-3 bg-rose-950/60 border border-rose-800 rounded-xl text-rose-300 text-xs whitespace-pre-wrap font-mono">
                    <div className="flex items-center gap-1.5 text-rose-400 font-bold mb-1.5">
                      <AlertTriangle className="w-4 h-4" />
                      <span>C Compiler / Runtime Diagnostic:</span>
                    </div>
                    {compileStderr}
                  </div>
                ) : compileOutput ? (
                  <pre className="text-emerald-400 whitespace-pre leading-relaxed overflow-x-auto">
                    {compileOutput}
                  </pre>
                ) : (
                  <div className="py-20 text-center text-slate-500 text-xs">
                    Press &quot;Run &amp; Execute&quot; to see real C compilation output!
                  </div>
                )}

                {compilerNotes.length > 0 && (
                  <div className="mt-3 p-2.5 bg-amber-950/40 border border-amber-800/60 rounded-xl text-[11px] text-amber-300 space-y-1">
                    <div className="font-bold flex items-center gap-1">
                      <Lightbulb className="w-3.5 h-3.5" /> Compiler Diagnostic Notes:
                    </div>
                    {compilerNotes.map((note, nIdx) => (
                      <div key={nIdx}>&bull; {note}</div>
                    ))}
                  </div>
                )}
              </div>
              <div className="mt-4 pt-3 border-t border-slate-700 text-[11px] text-slate-400 font-sans">
                <strong className="text-amber-400 font-mono">Mission Expected Target:</strong> {currentItem.expectedOutput}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
