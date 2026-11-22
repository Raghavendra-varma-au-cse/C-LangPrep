'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SMART_TRICK_QUESTIONS, SmartTrickQuestion } from '@/data/ai-tutor/smartTrickQuestions';
import { useLearningContext } from '@/context/LearningContext';
import {
  Brain,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Award,
  ChevronRight,
  Cpu,
  Terminal,
  Filter
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const SmartTrickTutorModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose
}) => {
  const { addBananas, updateActiveCode } = useLearningContext();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [currentTrickIdx, setCurrentTrickIdx] = useState<number>(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);

  if (!isOpen) return null;

  const filteredQuestions = activeCategory === 'all'
    ? SMART_TRICK_QUESTIONS
    : SMART_TRICK_QUESTIONS.filter(q => q.category === activeCategory);

  const trick = filteredQuestions[currentTrickIdx] || filteredQuestions[0];
  const isCorrect = selectedOpt === trick.correctIdx;

  const handleSelectOption = (idx: number) => {
    if (hasAnswered) return;
    setSelectedOpt(idx);
    setHasAnswered(true);

    if (idx === trick.correctIdx) {
      addBananas(50);
      confetti({ particleCount: 65, spread: 60, origin: { y: 0.8 } });
    }
  };

  const handleNextTrick = () => {
    setSelectedOpt(null);
    setHasAnswered(false);
    setCopiedNotification(false);
    setCurrentTrickIdx((prev) => (prev + 1) % filteredQuestions.length);
  };

  const handleLoadToCompiler = () => {
    if (trick.codeSnippet) {
      updateActiveCode(trick.codeSnippet);
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white border-2 border-[#ede3d2] rounded-3xl w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl text-[#2b2520] overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b-2 border-[#ede3d2] bg-[#fcf7ee] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-3xl">🧠</span>
            <div>
              <h3 className="text-base md:text-lg font-black text-[#2b2520] flex items-center gap-2">
                <span>Smart C Detective: Hidden Traps &amp; Logic Design</span>
                <span className="text-xs bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded-full font-bold">
                  {filteredQuestions.length} Traps
                </span>
              </h3>
              <p className="text-xs text-[#7d7065] font-medium">
                Master the sneaky edge-cases, undefined behaviors, and hardware traps that confuse 90% of C students!
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-xs font-black text-[#7d7065] hover:text-[#2b2520] p-2 rounded-xl hover:bg-[#ede3d2] cursor-pointer"
          >
            ✕ Close
          </button>
        </div>

        {/* Category Tabs */}
        <div className="px-5 py-2.5 bg-[#fdfaf3] border-b border-[#ede3d2] flex items-center gap-1.5 overflow-x-auto">
          <span className="text-[10px] font-black uppercase text-[#7d7065] flex items-center gap-1 mr-1">
            <Filter className="w-3 h-3" /> Filter:
          </span>
          {[
            { id: 'all', label: 'All Traps' },
            { id: 'control-flow', label: 'Control Flow' },
            { id: 'types-arithmetic', label: 'Types & Math' },
            { id: 'pointers-memory', label: 'Pointers & RAM' },
            { id: 'preprocessor-macro', label: 'Macros & Preprocessor' },
            { id: 'structs-hardware', label: 'Structs & Hardware' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setCurrentTrickIdx(0);
                setSelectedOpt(null);
                setHasAnswered(false);
              }}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer shrink-0 ${
                activeCategory === cat.id
                  ? 'bg-amber-500 text-white shadow-2xs'
                  : 'bg-white text-[#7d7065] hover:bg-[#ede3d2] border border-[#ede3d2]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-black uppercase text-[#e57e25] bg-[#fdf5ea] px-3 py-1 rounded-full border border-[#f3d4b1]">
              Trap #{currentTrickIdx + 1}: {trick.topic}
            </span>
            <span className="text-xs font-bold text-[#2a9d8f] flex items-center gap-1">
              <Award className="w-4 h-4" />
              Reward: +50 Bananas
            </span>
          </div>

          <h4 className="text-base md:text-lg font-black text-[#2b2520]">{trick.question}</h4>

          {trick.codeSnippet && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                <span>C Source Snippet</span>
                <button
                  onClick={handleLoadToCompiler}
                  className="flex items-center gap-1 text-[11px] font-bold text-amber-700 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-300 px-2.5 py-1 rounded-lg cursor-pointer transition"
                >
                  <Terminal className="w-3 h-3" />
                  <span>{copiedNotification ? '✓ Synced to Live Compiler!' : 'Test Trap in Live Compiler'}</span>
                </button>
              </div>
              <div className="bg-[#2b2520] text-[#f4eedb] p-4 rounded-2xl font-mono text-xs overflow-x-auto shadow-inner leading-relaxed">
                <pre>{trick.codeSnippet}</pre>
              </div>
            </div>
          )}

          <div className="p-3.5 bg-[#fdf5ea] border border-[#f3d4b1] rounded-2xl text-xs text-[#b45309] font-medium flex items-center gap-2">
            <span className="text-base">💡</span>
            <div>
              <strong>Detective Hint:</strong> {trick.trickTrap}
            </div>
          </div>

          {/* Options */}
          <div className="space-y-2.5 pt-2">
            {trick.options.map((opt, oIdx) => {
              const isSelected = selectedOpt === oIdx;
              const isTheCorrectOne = oIdx === trick.correctIdx;
              let style = 'bg-[#fcf7ee] border-2 border-[#ede3d2] text-[#2b2520] hover:border-[#f48c06]';

              if (hasAnswered) {
                if (isTheCorrectOne) {
                  style = 'bg-[#eaf6f4] border-2 border-[#2a9d8f] text-[#2a9d8f] font-bold';
                } else if (isSelected) {
                  style = 'bg-[#fdf0ec] border-2 border-[#e76f51] text-[#e76f51] font-bold';
                } else {
                  style = 'opacity-40 border-[#ede3d2] bg-white';
                }
              }

              return (
                <button
                  key={oIdx}
                  onClick={() => handleSelectOption(oIdx)}
                  disabled={hasAnswered}
                  className={`w-full p-3.5 rounded-2xl text-left text-xs font-semibold transition cursor-pointer flex items-center justify-between ${style}`}
                >
                  <span className="pr-2">{opt}</span>
                  {hasAnswered && isTheCorrectOne && <CheckCircle2 className="w-5 h-5 text-[#2a9d8f] shrink-0" />}
                  {hasAnswered && isSelected && !isTheCorrectOne && <XCircle className="w-5 h-5 text-[#e76f51] shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Post-Answer Explanation */}
          {hasAnswered && (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`p-4 rounded-2xl border-2 space-y-2 text-xs ${
                isCorrect
                  ? 'bg-[#eaf6f4] border-[#2a9d8f] text-[#1b635b]'
                  : 'bg-[#fdf0ec] border-[#e76f51] text-[#9b3a22]'
              }`}
            >
              <div className="font-black text-sm flex items-center gap-1.5">
                {isCorrect ? '🎯 Detective Win! You caught the trap!' : '⚠️ Trap Triggered! Here is why:'}
              </div>
              <p className="leading-relaxed font-medium">{trick.explanation}</p>
              <div className="pt-2 border-t border-black/10 font-mono text-[11px] flex items-center gap-1.5">
                <Cpu className="w-4 h-4 shrink-0" />
                <span>Hardware reality: {trick.hardwareReality}</span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t-2 border-[#ede3d2] bg-[#fcf7ee] flex items-center justify-between">
          <span className="text-xs text-[#7d7065] font-bold">
            Trick {currentTrickIdx + 1} of {filteredQuestions.length}
          </span>
          <button
            onClick={handleNextTrick}
            className="friendly-button-amber px-5 py-2 text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <span>Next Detective Challenge</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
