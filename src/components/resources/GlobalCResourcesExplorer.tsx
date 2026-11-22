'use client';

import React, { useState } from 'react';
import { EXTERNAL_C_RESOURCES, ExternalResource } from '@/data/resources/externalResources';
import {
  Compass,
  ExternalLink,
  Search,
  Sparkles,
  BookOpen,
  Code2,
  Terminal,
  Trophy,
  Cpu,
  Layers,
  CheckCircle2,
  Bookmark
} from 'lucide-react';

export const GlobalCResourcesExplorer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    '1. Visual & Block Logic',
    '2. Online C Compilers',
    '3. Concept Guides & Tutorials',
    '4. Practice & Problem Solving'
  ];

  const filtered = EXTERNAL_C_RESOURCES.filter((res) => {
    const matchesTab = activeTab === 'All' || res.category === activeTab;
    const matchesQuery =
      res.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.howToUse.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesQuery;
  });

  return (
    <div className="bg-white border-2 border-[#ede3d2] rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b-2 border-[#ede3d2]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-3xl">🌐</span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl md:text-2xl font-black text-[#2b2520]">
                  Curated Global C Learning &amp; Practice Ecosystem
                </h2>
                <span className="text-xs bg-[#fdf5ea] text-[#e57e25] border border-[#f3d4b1] px-2.5 py-0.5 rounded-full font-bold">
                  Curated Web Platforms
                </span>
              </div>
              <p className="text-xs text-[#7d7065] font-medium mt-0.5">
                From visual logic blocks (CodeMonkey, Blockly) to zero-install cloud compilers, official references, and competitive programming arenas.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-[#7d7065] bg-[#fcf7ee] border border-[#ebdcc4] px-3.5 py-2 rounded-2xl">
          <Bookmark className="w-4 h-4 text-[#e57e25]" />
          <span>{EXTERNAL_C_RESOURCES.length} Verified External Platforms</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#fcf7ee] border-2 border-[#ebdcc4] p-4 rounded-2xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5 text-xs font-black">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-3 py-1.5 rounded-xl border-2 transition cursor-pointer ${
                  activeTab === cat
                    ? 'bg-[#e57e25] text-white border-[#b45309] shadow-xs'
                    : 'bg-white text-[#7d7065] border-[#ede3d2] hover:bg-[#faf4ea]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#7d7065] absolute left-2.5 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search resource or platform..."
              className="px-3 py-1.5 pl-8 text-xs bg-white border-2 border-[#ede3d2] rounded-xl focus:outline-none focus:border-[#f48c06] w-56 text-[#2b2520]"
            />
          </div>
        </div>
      </div>

      {/* Resource Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className={`bg-[#fcf7ee] border-2 rounded-2xl p-5 flex flex-col justify-between space-y-3 transition hover:shadow-md ${
              item.isImportant ? 'border-[#e57e25] ring-2 ring-[#e57e25]/20 bg-[#fffdfa]' : 'border-[#ebdcc4]'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-black uppercase text-[#7d7065] tracking-wider truncate">
                  {item.category.split('. ')[1]}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.badgeColor}`}>
                  {item.badge}
                </span>
              </div>

              <h3 className="text-base font-black text-[#2b2520] flex items-center justify-between">
                <span>{item.name}</span>
              </h3>

              <p className="text-xs text-[#57534e] mt-1.5 leading-relaxed font-medium">
                {item.description}
              </p>

              <div className="mt-3 p-2.5 bg-white border border-[#ebdcc4] rounded-xl text-xs space-y-1">
                <div className="text-[10px] font-bold uppercase text-[#d97706] flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Recommended Usage:
                </div>
                <p className="text-[11px] text-[#57534e] leading-relaxed">
                  {item.howToUse}
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-[#ebdcc4] flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#a8a29e] truncate max-w-[160px]">
                {item.url.replace('https://', '')}
              </span>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="friendly-button-amber px-3.5 py-1.5 text-xs flex items-center gap-1.5 shadow-2xs font-bold"
              >
                <span>Visit Platform</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
