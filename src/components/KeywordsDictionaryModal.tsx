'use client';

import React, { useState } from 'react';
import { ADVANCED_C_KEYWORDS, AdvancedCKeyword } from '@/data/keywords/advancedKeywords';
import { KeyRound, Search, X, Cpu, AlertTriangle, Sparkles, Play, BookOpen, Layers } from 'lucide-react';
import { useLearningContext } from '@/context/LearningContext';

export const KeywordsDictionaryModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose
}) => {
  const { updateActiveCode } = useLearningContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [expandedKeyword, setExpandedKeyword] = useState<string | null>(null);

  if (!isOpen) return null;

  const categories = ['All', 'Control Flow', 'Data Type', 'Storage Class', 'Type Qualifier', 'Compound Type', 'Operator / Other'];

  const filtered = ADVANCED_C_KEYWORDS.filter((k) => {
    const matchesCat = activeCategory === 'All' || k.category === activeCategory;
    const matchesSearch =
      k.keyword.toLowerCase().includes(searchTerm.toLowerCase()) ||
      k.oneLiner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      k.hardwareSiliconMeaning.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleTestInCompiler = (code: string) => {
    updateActiveCode(code);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/60 backdrop-blur-xs">
      <div className="bg-[#fffdf9] border-2 border-[#ede3d2] rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl text-[#2b2520] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b-2 border-[#ede3d2] bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#fdf5ea] border border-[#f3d4b1] flex items-center justify-center text-xl">
              🔑
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg md:text-xl font-black text-[#2b2520]">
                  The 32 ISO C Keywords Deep Encyclopedia
                </h3>
                <span className="text-xs bg-[#eaf6f4] text-[#2a9d8f] border border-[#2a9d8f] px-2.5 py-0.5 rounded-full font-bold">
                  32 Standard Keywords
                </span>
              </div>
              <p className="text-xs text-[#7d7065] font-medium mt-0.5">
                Hardware silicon behaviors &bull; Compilable code examples &bull; Common student traps &bull; Interview insights
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-[#ede3d2] text-[#7d7065] hover:text-[#2b2520] cursor-pointer transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Category Filter Pills */}
        <div className="p-4 border-b border-[#ede3d2] bg-[#fcf7ee] space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-[#7d7065] absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search keyword (e.g. volatile, static, struct, register, sizeof)..."
              className="w-full bg-white border border-[#ebdcc4] rounded-xl pl-10 pr-4 py-2 text-xs font-mono text-[#2b2520] placeholder-[#a8a29e] focus:outline-none focus:border-[#f48c06]"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 rounded-xl text-xs font-bold shrink-0 transition cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#e57e25] text-white shadow-xs'
                    : 'bg-white hover:bg-[#ebdcc4] text-[#7d7065] border border-[#ebdcc4]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* List Grid */}
        <div className="p-5 overflow-y-auto space-y-3.5 flex-1 bg-[#fffdf9]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filtered.map((item) => {
              const isExpanded = expandedKeyword === item.keyword;
              return (
                <div
                  key={item.keyword}
                  className={`p-4 rounded-2xl border-2 transition-all ${
                    isExpanded
                      ? 'bg-white border-[#e57e25] shadow-md md:col-span-2'
                      : 'bg-white hover:bg-[#fcf7ee] border-[#ede3d2]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-base font-black text-[#e57e25] bg-[#fdf5ea] px-2.5 py-0.5 rounded-lg border border-[#f3d4b1]">
                        {item.keyword}
                      </span>
                      <span className="text-[10px] font-bold text-[#457b9d] uppercase px-2 py-0.5 bg-[#edf4f8] border border-[#c2d9e5] rounded">
                        {item.category}
                      </span>
                    </div>

                    <button
                      onClick={() => setExpandedKeyword(isExpanded ? null : item.keyword)}
                      className="text-xs text-[#e57e25] font-black hover:underline cursor-pointer"
                    >
                      {isExpanded ? 'Collapse' : 'Deep Dive & Example \u2192'}
                    </button>
                  </div>

                  <p className="text-xs text-[#2b2520] font-medium leading-relaxed mb-2">
                    {item.oneLiner}
                  </p>

                  {/* Hardware Silicon Note */}
                  <div className="p-2.5 bg-[#fcf7ee] border border-[#ebdcc4] rounded-xl text-[11px] text-[#57534e] space-y-1">
                    <div className="font-black text-[#d97706] flex items-center gap-1 uppercase text-[10px]">
                      <Cpu className="w-3.5 h-3.5" /> Silicon / CPU Hardware Action:
                    </div>
                    <p className="leading-relaxed font-sans">{item.hardwareSiliconMeaning}</p>
                  </div>

                  {/* Expanded View with Code Example, Pitfall, and Interview Tip */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-[#ede3d2] space-y-3">
                      <div>
                        <div className="flex items-center justify-between text-xs font-bold text-[#57534e] mb-1 font-mono">
                          <span>Compilable C Code Example:</span>
                          <button
                            onClick={() => handleTestInCompiler(item.compilableExample)}
                            className="flex items-center gap-1 text-[11px] font-black text-[#2a9d8f] hover:underline cursor-pointer"
                          >
                            <Play className="w-3 h-3 fill-current" />
                            <span>Load into Live Compiler</span>
                          </button>
                        </div>
                        <div className="bg-[#2b2520] text-[#f4eedb] p-3 rounded-xl font-mono text-xs overflow-x-auto shadow-inner">
                          <pre>{item.compilableExample}</pre>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div className="p-3 bg-[#fdf0ec] border border-[#f5b8a9] rounded-xl text-[#9c2c12] space-y-1">
                          <div className="font-black flex items-center gap-1 text-[11px] uppercase">
                            <AlertTriangle className="w-3.5 h-3.5" /> Common Student Trap:
                          </div>
                          <p className="leading-relaxed">{item.commonPitfall}</p>
                        </div>

                        <div className="p-3 bg-[#eaf6f4] border border-[#b2ded8] rounded-xl text-[#1b635b] space-y-1">
                          <div className="font-black flex items-center gap-1 text-[11px] uppercase">
                            <Sparkles className="w-3.5 h-3.5" /> Job Interview Tip:
                          </div>
                          <p className="leading-relaxed">{item.interviewTip}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-[#7d7065] text-xs font-mono">
              No C keywords match &quot;{searchTerm}&quot;
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t-2 border-[#ede3d2] bg-white flex items-center justify-between text-xs font-bold text-[#7d7065]">
          <span>Tip: Click &quot;Load into Live Compiler&quot; on any keyword to run its code live.</span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#fcf7ee] hover:bg-[#ede3d2] text-[#2b2520] border border-[#ebdcc4] rounded-xl font-black cursor-pointer transition"
          >
            Close Encyclopedia
          </button>
        </div>
      </div>
    </div>
  );
};
