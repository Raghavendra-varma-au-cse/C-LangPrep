'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UnifiedMasteryExplorer } from '@/components/unified/UnifiedMasteryExplorer';
import { ErrorLabVisualizer } from '@/components/error-lab/ErrorLabVisualizer';
import { MultiFileArchitectureVisualizer } from '@/components/multifile/MultiFileArchitectureVisualizer';
import { BlockProgrammingBuilder } from '@/components/blockly/BlockProgrammingBuilder';
import { FriendlyLineByLineVisualizer } from '@/components/simple-viz/FriendlyLineByLineVisualizer';
import { DailyLifeProjectsExplorer } from '@/components/daily-projects/DailyLifeProjectsExplorer';
import { RealWorldProjectsExplorer } from '@/components/projects/RealWorldProjectsExplorer';
import { LiveInteractivePlayground } from '@/components/LiveInteractivePlayground';
import { KeywordsEncyclopediaExplorer } from '@/components/keywords/KeywordsEncyclopediaExplorer';
import { GlobalCResourcesExplorer } from '@/components/resources/GlobalCResourcesExplorer';
import { KeywordsDictionaryModal } from '@/components/KeywordsDictionaryModal';
import { SmartTrickTutorModal } from '@/components/ai-tutor/SmartTrickTutorModal';
import { DesktopDownloadModal } from '@/components/desktop/DesktopDownloadModal';
import { LearningProvider, useLearningContext } from '@/context/LearningContext';

import {
  Compass,
  Puzzle,
  Tv,
  Coffee,
  Terminal,
  Flame,
  KeyRound,
  AlertTriangle,
  FolderGit2,
  Brain,
  Award,
  Globe,
  Laptop
} from 'lucide-react';

function AcademyAppContent() {
  const { state } = useLearningContext();
  const [activeTab, setActiveTab] = useState<'mastery-150' | 'error-lab' | 'multifile' | 'blocks' | 'line-by-line' | 'daily' | 'real-world' | 'playground' | 'keywords' | 'resources'>('mastery-150');
  const [isDictionaryOpen, setIsDictionaryOpen] = useState<boolean>(false);
  const [isDetectiveOpen, setIsDetectiveOpen] = useState<boolean>(false);
  const [isDownloadOpen, setIsDownloadOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-[#fffdf9] text-[#2b2520] flex flex-col font-sans selection:bg-[#f48c06] selection:text-white pb-12">
      {/* Friendly Warm Cream Header */}
      <header className="bg-white border-b-2 border-[#ede3d2] px-4 md:px-8 py-3.5 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#fdf5ea] border border-[#f3d4b1] flex items-center justify-center p-1.5 shadow-2xs shrink-0">
              <img src="/c-academy-icon.svg" alt="C Academy Icon" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-black text-[#2b2520] tracking-tight flex items-center gap-2">
                <span>The Complete C Engineering Academy</span>
                <span className="text-xs bg-[#fdf5ea] text-[#e57e25] border border-[#f3d4b1] px-2.5 py-0.5 rounded-full font-bold">
                  Level {state.currentLevelId}/150
                </span>
              </h1>
              <p className="text-xs text-[#7d7065] font-medium">
                {state.activeTopic} &bull; Fully Synchronized Across All Pages
              </p>
            </div>
          </div>

          {/* Banana Score & Smart Detective & Desktop App Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsDownloadOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black bg-[#2b2520] hover:bg-[#433b35] text-white cursor-pointer transition shadow-2xs"
            >
              <Laptop className="w-4 h-4 text-[#e57e25]" />
              <span className="hidden sm:inline">Desktop App</span>
              <span className="text-[10px] bg-[#e57e25] text-white px-1.5 py-0.2 rounded font-bold">.exe / .dmg</span>
            </button>

            <button
              onClick={() => setIsDetectiveOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black bg-[#fdf5ea] hover:bg-[#faebd7] border-2 border-[#e57e25] text-[#b45309] cursor-pointer transition shadow-2xs"
            >
              <Brain className="w-4 h-4 text-[#e57e25]" />
              <span>Smart C Detective (Traps)</span>
            </button>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black bg-[#eaf6f4] border-2 border-[#2a9d8f] text-[#2a9d8f]">
              <span className="text-base">🍌</span>
              <span>{state.totalBananas} Bananas</span>
            </div>
          </div>

          {/* Navigation Hub */}
          <div className="w-full flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-[#ede3d2]">
            <button
              onClick={() => setActiveTab('mastery-150')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${activeTab === 'mastery-150'
                  ? 'bg-[#f48c06] text-white shadow-sm'
                  : 'bg-[#fcf7ee] text-[#7d7065] hover:bg-[#ede3d2] border border-[#ede3d2]'
                }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>150-Level Journey</span>
            </button>

            <button
              onClick={() => setActiveTab('error-lab')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${activeTab === 'error-lab'
                  ? 'bg-[#e76f51] text-white shadow-sm'
                  : 'bg-[#fcf7ee] text-[#7d7065] hover:bg-[#ede3d2] border border-[#ede3d2]'
                }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Error Doctor Lab</span>
            </button>

            <button
              onClick={() => setActiveTab('multifile')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${activeTab === 'multifile'
                  ? 'bg-[#457b9d] text-white shadow-sm'
                  : 'bg-[#fcf7ee] text-[#7d7065] hover:bg-[#ede3d2] border border-[#ede3d2]'
                }`}
            >
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Multi-File Linking</span>
            </button>

            <button
              onClick={() => setActiveTab('blocks')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${activeTab === 'blocks'
                  ? 'bg-[#d97706] text-white shadow-sm'
                  : 'bg-[#fcf7ee] text-[#7d7065] hover:bg-[#ede3d2] border border-[#ede3d2]'
                }`}
            >
              <Puzzle className="w-3.5 h-3.5" />
              <span>Visual Block Builder</span>
            </button>

            <button
              onClick={() => setActiveTab('line-by-line')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${activeTab === 'line-by-line'
                  ? 'bg-[#0d9488] text-white shadow-sm'
                  : 'bg-[#fcf7ee] text-[#7d7065] hover:bg-[#ede3d2] border border-[#ede3d2]'
                }`}
            >
              <Tv className="w-3.5 h-3.5" />
              <span>Line-by-Line Story</span>
            </button>

            <button
              onClick={() => setActiveTab('daily')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${activeTab === 'daily'
                  ? 'bg-[#c2410c] text-white shadow-sm'
                  : 'bg-[#fcf7ee] text-[#7d7065] hover:bg-[#ede3d2] border border-[#ede3d2]'
                }`}
            >
              <Coffee className="w-3.5 h-3.5" />
              <span>Everyday Machines</span>
            </button>

            <button
              onClick={() => setActiveTab('real-world')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${activeTab === 'real-world'
                  ? 'bg-[#2b2520] text-white shadow-sm'
                  : 'bg-[#fcf7ee] text-[#7d7065] hover:bg-[#ede3d2] border border-[#ede3d2]'
                }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>Systems (Redis/Git/DOOM)</span>
            </button>

            <button
              onClick={() => setActiveTab('playground')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${activeTab === 'playground'
                  ? 'bg-[#2a9d8f] text-white shadow-sm'
                  : 'bg-[#fcf7ee] text-[#7d7065] hover:bg-[#ede3d2] border border-[#ede3d2]'
                }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Live C Compiler</span>
            </button>

            <button
              onClick={() => setActiveTab('keywords')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${activeTab === 'keywords'
                  ? 'bg-[#7c3aed] text-white shadow-sm'
                  : 'bg-[#fcf7ee] text-[#7d7065] hover:bg-[#ede3d2] border border-[#ede3d2]'
                }`}
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>32 Keywords &amp; Libs</span>
            </button>

            <button
              onClick={() => setActiveTab('resources')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${activeTab === 'resources'
                  ? 'bg-[#059669] text-white shadow-sm'
                  : 'bg-[#fcf7ee] text-[#7d7065] hover:bg-[#ede3d2] border border-[#ede3d2]'
                }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Global Resources</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto w-full px-4 pt-6 space-y-6">
        <AnimatePresence mode="wait">
          {activeTab === 'mastery-150' && (
            <motion.div
              key="mastery-150"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              <UnifiedMasteryExplorer />
            </motion.div>
          )}

          {activeTab === 'error-lab' && (
            <motion.div
              key="error-lab"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              <ErrorLabVisualizer />
            </motion.div>
          )}

          {activeTab === 'multifile' && (
            <motion.div
              key="multifile"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              <MultiFileArchitectureVisualizer />
            </motion.div>
          )}

          {activeTab === 'blocks' && (
            <motion.div
              key="blocks"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              <BlockProgrammingBuilder />
            </motion.div>
          )}

          {activeTab === 'line-by-line' && (
            <motion.div
              key="line-by-line"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              <FriendlyLineByLineVisualizer />
            </motion.div>
          )}

          {activeTab === 'daily' && (
            <motion.div
              key="daily"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              <DailyLifeProjectsExplorer />
            </motion.div>
          )}

          {activeTab === 'real-world' && (
            <motion.div
              key="real-world"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              <RealWorldProjectsExplorer />
            </motion.div>
          )}

          {activeTab === 'playground' && (
            <motion.div
              key="playground"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              <LiveInteractivePlayground />
            </motion.div>
          )}

          {activeTab === 'keywords' && (
            <motion.div
              key="keywords"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              <KeywordsEncyclopediaExplorer />
            </motion.div>
          )}

          {activeTab === 'resources' && (
            <motion.div
              key="resources"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              <GlobalCResourcesExplorer />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Sleek, Synchronized Footer with Legal Clarity */}
      <footer className="mt-8 py-3.5 border-t-2 border-[#ede3d2] text-xs text-[#7d7065] bg-white shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-[#fdf5ea] border border-[#f3d4b1] flex items-center justify-center p-1 shrink-0">
              <img src="/c-academy-icon.svg" alt="C Academy Logo" className="w-full h-full object-contain" />
            </div>
            <span className="font-bold text-[#2b2520]">The Complete C Engineering Academy</span>
            <span className="text-slate-300 hidden sm:inline">&bull;</span>
            <span className="hidden sm:inline text-[#7d7065]">
              Original Architecture &bull; MIT License &bull; Free & Open-Source
            </span>
          </div>
          <div className="flex items-center gap-2 text-[#7d7065]">
            <span>Developed with lots of ☕ coffee by</span>
            <a
              href="https://raghavendravarma.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#e57e25] hover:text-[#c46210] hover:underline transition-colors"
            >
              Raghavendra Varma
            </a>
          </div>
        </div>
      </footer>

      {/* Global Modals */}
      <KeywordsDictionaryModal
        isOpen={isDictionaryOpen}
        onClose={() => setIsDictionaryOpen(false)}
      />
      <SmartTrickTutorModal
        isOpen={isDetectiveOpen}
        onClose={() => setIsDetectiveOpen(false)}
      />
      <DesktopDownloadModal
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
      />
    </div>
  );
}

export default function Home() {
  return (
    <LearningProvider>
      <AcademyAppContent />
    </LearningProvider>
  );
}
