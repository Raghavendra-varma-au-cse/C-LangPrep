'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CODE_MONKEY_100_PUZZLES, PuzzleCard } from '@/data/puzzles/codeMonkeyPuzzles';
import {
  Sparkles,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  Play,
  CheckCircle2,
  Award,
  HelpCircle,
  Trophy,
  ChevronLeft,
  ChevronRight,
  Flame,
  Lightbulb
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLearningContext } from '@/context/LearningContext';

export const CodeMonkeyPuzzleGame: React.FC = () => {
  const { state, addBananas, markMissionComplete, setLevel } = useLearningContext();
  const [currentLevel, setCurrentLevel] = useState<number>(state.currentLevelId || 1);
  const [completedLevels, setCompletedLevels] = useState<Set<number>>(new Set(state.completedMissions));

  // Active puzzle
  const activePuzzle: PuzzleCard =
    CODE_MONKEY_100_PUZZLES[currentLevel - 1] || CODE_MONKEY_100_PUZZLES[0];

  // User arrangement state
  const [userPieces, setUserPieces] = useState<{ id: string; code: string; hint: string }[]>(
    activePuzzle.shuffledPieces
  );
  const [showHint, setShowHint] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ success: boolean; msg: string } | null>(null);

  // When level changes, reset puzzle pieces
  const handleLoadLevel = (lvlNum: number) => {
    const p = CODE_MONKEY_100_PUZZLES[lvlNum - 1];
    if (p) {
      setCurrentLevel(lvlNum);
      setLevel(lvlNum);
      setUserPieces([...p.shuffledPieces]);
      setShowHint(false);
      setFeedback(null);
    }
  };

  const handleMovePiece = (fromIdx: number, toIdx: number) => {
    if (toIdx < 0 || toIdx >= userPieces.length) return;
    const copy = [...userPieces];
    const [moved] = copy.splice(fromIdx, 1);
    copy.splice(toIdx, 0, moved);
    setUserPieces(copy);
    setFeedback(null);
  };

  const handleVerifySolution = () => {
    const isCorrect = userPieces.every(
      (piece, idx) => piece.id === activePuzzle.correctSequenceIds[idx]
    );

    if (isCorrect) {
      setFeedback({
        success: true,
        msg: `Awesome job! 🍌 You fixed the ${activePuzzle.title}! You earned +${activePuzzle.rewardPoints} Bananas!`
      });
      addBananas(activePuzzle.rewardPoints);
      markMissionComplete(currentLevel);
      setCompletedLevels((prev) => new Set([...prev, currentLevel]));
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.8 } });
    } else {
      setFeedback({
        success: false,
        msg: 'Not quite in the right order yet! Remember: we always open the toolbox (#include) first, then main, then instructions, then return 0!'
      });
    }
  };

  const handleResetOrder = () => {
    setUserPieces([...activePuzzle.shuffledPieces]);
    setFeedback(null);
    setShowHint(false);
  };

  return (
    <div className="bg-white border-2 border-[#ede3d2] rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b-2 border-[#ede3d2]">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#fdf5ea] border border-[#f3d4b1] flex items-center justify-center p-2 shadow-2xs">
            <img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/c-academy-icon.svg`} alt="C Academy Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl md:text-2xl font-black text-[#2b2520]">
                C Logic Puzzle Architect (100+ Missions)
              </h2>
              <span className="text-xs bg-[#fdf5ea] text-[#e57e25] border border-[#f3d4b1] px-2.5 py-0.5 rounded-full font-bold">
                Level {currentLevel} of 100
              </span>
            </div>
            <p className="text-xs text-[#7d7065] font-medium mt-0.5">
              Arrange the shuffled C code lines into the correct order to solve real-world machine puzzles!
            </p>
          </div>
        </div>

        {/* Banana Bank Badge */}
        <div className="flex items-center gap-3 bg-[#fdf5ea] border-2 border-[#e57e25] px-4 py-2 rounded-2xl">
          <span className="text-2xl">🍌</span>
          <div>
            <div className="text-[10px] uppercase font-black text-[#e57e25]">Banana Bank</div>
            <div className="text-lg font-black text-[#2b2520]">{state.totalBananas} Bananas</div>
          </div>
        </div>
      </div>

      {/* Level Selection Bar with 100 Missions Drawer */}
      <div className="bg-[#fcf7ee] border-2 border-[#ebdcc4] p-4 rounded-2xl space-y-2">
        <div className="flex items-center justify-between text-xs font-black text-[#7d7065]">
          <span>Jump to Any Mission (1 to 100):</span>
          <span>{completedLevels.size}/100 Solved</span>
        </div>

        {/* Quick pagination for 100 levels */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {CODE_MONKEY_100_PUZZLES.slice(0, 30).map((p) => {
            const isCurrent = p.levelNumber === currentLevel;
            const isDone = completedLevels.has(p.levelNumber);
            return (
              <button
                key={p.id}
                onClick={() => handleLoadLevel(p.levelNumber)}
                className={`w-9 h-9 rounded-xl font-black text-xs shrink-0 transition cursor-pointer border-2 flex items-center justify-center ${isCurrent
                    ? 'bg-[#f48c06] text-white border-[#b75700] shadow-sm scale-105'
                    : isDone
                      ? 'bg-[#2a9d8f] text-white border-[#1b635b]'
                      : 'bg-white text-[#7d7065] border-[#ede3d2] hover:bg-[#faf4ea]'
                  }`}
              >
                {p.levelNumber}
              </button>
            );
          })}
          <span className="text-xs text-[#7d7065] font-black px-2">... up to 100</span>
        </div>
      </div>

      {/* Active Mission Story Card */}
      <div className="bg-[#fcf7ee] border-2 border-[#ebdcc4] rounded-2xl p-5 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-3xl">{activePuzzle.themeIcon}</span>
            <div>
              <span className="text-[10px] font-black uppercase text-[#e57e25] tracking-wider">
                {activePuzzle.tier} &bull; Concept: {activePuzzle.conceptTeached}
              </span>
              <h3 className="text-lg font-black text-[#2b2520]">{activePuzzle.title}</h3>
            </div>
          </div>
          <span className="px-3 py-1 bg-white border border-[#ebdcc4] rounded-full text-xs font-bold text-[#2a9d8f]">
            Reward: +{activePuzzle.rewardPoints} 🍌
          </span>
        </div>

        <p className="text-sm text-[#3d3630] font-medium leading-relaxed">
          {activePuzzle.themeStory}
        </p>

        <div className="p-3 bg-white border-2 border-dashed border-[#ebdcc4] rounded-xl text-xs font-mono text-[#2b2520] flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-[#e57e25] shrink-0" />
          <span>Goal: {activePuzzle.goalDescription}</span>
        </div>
      </div>

      {/* Interactive Drag & Re-order Puzzle Area */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-black text-[#7d7065]">
          <span>Re-order the code blocks using &uarr; and &darr; arrows:</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowHint(!showHint)}
              className="text-xs text-[#e57e25] font-bold hover:underline cursor-pointer"
            >
              {showHint ? 'Hide Clues' : '💡 Need a Clue?'}
            </button>
            <button
              onClick={handleResetOrder}
              className="text-xs text-[#7d7065] font-bold hover:underline cursor-pointer flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              Reset Order
            </button>
          </div>
        </div>

        {/* Puzzle Blocks */}
        <div className="space-y-2">
          {userPieces.map((piece, idx) => (
            <motion.div
              key={piece.id}
              layout
              className="p-4 bg-white border-2 border-[#ede3d2] hover:border-[#f48c06] rounded-2xl flex items-center justify-between gap-3 shadow-2xs transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-[#fcf7ee] border border-[#ebdcc4] text-xs font-black flex items-center justify-center text-[#e57e25]">
                  {idx + 1}
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

              {/* Up / Down Re-order Buttons */}
              <div className="flex items-center gap-1">
                <button
                  disabled={idx === 0}
                  onClick={() => handleMovePiece(idx, idx - 1)}
                  className="p-2 rounded-xl bg-[#fcf7ee] hover:bg-[#ede3d2] disabled:opacity-20 text-[#2b2520] cursor-pointer transition"
                  title="Move Up"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <button
                  disabled={idx === userPieces.length - 1}
                  onClick={() => handleMovePiece(idx, idx + 1)}
                  className="p-2 rounded-xl bg-[#fcf7ee] hover:bg-[#ede3d2] disabled:opacity-20 text-[#2b2520] cursor-pointer transition"
                  title="Move Down"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Feedback Message */}
      {feedback && (
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`p-4 rounded-2xl border-2 text-sm font-black flex items-center gap-3 ${feedback.success
              ? 'bg-[#eaf6f4] text-[#2a9d8f] border-[#2a9d8f]'
              : 'bg-[#fdf0ec] text-[#e76f51] border-[#e76f51]'
            }`}
        >
          {feedback.success ? <CheckCircle2 className="w-6 h-6 shrink-0" /> : <Flame className="w-6 h-6 shrink-0" />}
          <span>{feedback.msg}</span>
        </motion.div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t-2 border-[#ede3d2]">
        <button
          onClick={() => handleLoadLevel(Math.max(1, currentLevel - 1))}
          disabled={currentLevel === 1}
          className="px-5 py-2.5 rounded-xl text-sm font-bold bg-[#fcf7ee] hover:bg-[#ede3d2] disabled:opacity-30 text-[#7d7065] cursor-pointer flex items-center gap-1.5"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous Mission
        </button>

        <button
          onClick={handleVerifySolution}
          className="friendly-button-amber px-8 py-3 text-sm flex items-center gap-2 cursor-pointer"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>Test My Code Order!</span>
        </button>

        <button
          onClick={() => handleLoadLevel(Math.min(100, currentLevel + 1))}
          disabled={currentLevel === 100}
          className="px-5 py-2.5 rounded-xl text-sm font-bold bg-[#fcf7ee] hover:bg-[#ede3d2] disabled:opacity-30 text-[#7d7065] cursor-pointer flex items-center gap-1.5"
        >
          <span>Next Mission</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
