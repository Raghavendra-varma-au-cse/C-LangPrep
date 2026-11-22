'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ADVANCED_C_KEYWORDS, AdvancedCKeyword } from '@/data/keywords/advancedKeywords';
import { 
  C_STANDARD_LIBRARIES, 
  C_MACRO_DEFINITIONS, 
  CLibraryModule, 
  CMacroDefinition 
} from '@/data/keywords/cStandardLibraries';
import { useLearningContext } from '@/context/LearningContext';
import {
  KeyRound,
  Search,
  Cpu,
  Play,
  RotateCcw,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  XCircle,
  Terminal,
  BookOpen,
  Layers,
  ArrowRight,
  Library,
  FileCode,
  Sliders
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { requestCompileC } from '@/lib/apiCompilerClient';

export const KeywordsEncyclopediaExplorer: React.FC = () => {
  const { updateActiveCode } = useLearningContext();
  const [mainSection, setMainSection] = useState<'keywords' | 'libraries' | 'definitions'>('keywords');

  // Search & Filters
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Active selections
  const [selectedKeyword, setSelectedKeyword] = useState<AdvancedCKeyword>(ADVANCED_C_KEYWORDS[0]);
  const [selectedLibrary, setSelectedLibrary] = useState<CLibraryModule>(C_STANDARD_LIBRARIES[0]);
  const [selectedMacro, setSelectedMacro] = useState<CMacroDefinition>(C_MACRO_DEFINITIONS[0]);

  // Code editor and execution state
  const [activeCode, setActiveCode] = useState<string>(ADVANCED_C_KEYWORDS[0].compilableExample);
  const [testResult, setTestResult] = useState<{ isSuccess: boolean; output: string } | null>(null);
  const [isTesting, setIsTesting] = useState<boolean>(false);

  const keywordCategories = [
    'All',
    'Control Flow',
    'Data Type',
    'Storage Class',
    'Type Qualifier',
    'Compound Type',
    'Operator / Other'
  ];

  // Filtering
  const filteredKeywords = ADVANCED_C_KEYWORDS.filter((k) => {
    const matchesCat = activeCategory === 'All' || k.category === activeCategory;
    const matchesSearch =
      k.keyword.toLowerCase().includes(searchTerm.toLowerCase()) ||
      k.oneLiner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      k.hardwareSiliconMeaning.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const filteredLibraries = C_STANDARD_LIBRARIES.filter((lib) => {
    return (
      lib.header.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lib.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lib.oneLiner.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const filteredMacros = C_MACRO_DEFINITIONS.filter((m) => {
    return (
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.oneLiner.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleSelectKeyword = (item: AdvancedCKeyword) => {
    setSelectedKeyword(item);
    setActiveCode(item.compilableExample);
    setTestResult(null);
  };

  const handleSelectLibrary = (item: CLibraryModule) => {
    setSelectedLibrary(item);
    setActiveCode(item.compilableExample);
    setTestResult(null);
  };

  const handleSelectMacro = (item: CMacroDefinition) => {
    setSelectedMacro(item);
    setActiveCode(item.compilableExample);
    setTestResult(null);
  };

  const handleRunVerification = async () => {
    setIsTesting(true);
    setTestResult(null);

    // Sync to global academy context
    updateActiveCode(activeCode);

    try {
      const data = await requestCompileC(activeCode);

      if (data.exitCode === 0) {
        setTestResult({
          isSuccess: true,
          output: `Compilation & Execution PASSED (exit code 0):\n${data.stdout ? data.stdout : '[Program completed with zero diagnostics errors]'}`
        });
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.85 } });
      } else {
        const errorMsg = data.stderr || data.error || 'Compiler diagnostic tripped.';
        setTestResult({
          isSuccess: false,
          output: `Compiler Diagnostic (exit code ${data.exitCode ?? 1}):\n${errorMsg}`
        });
      }
    } catch (err: any) {
      setTestResult({
        isSuccess: false,
        output: `Execution error: ${err.message}`
      });
    } finally {
      setIsTesting(false);
    }
  };

  const handleResetCode = () => {
    if (mainSection === 'keywords') setActiveCode(selectedKeyword.compilableExample);
    else if (mainSection === 'libraries') setActiveCode(selectedLibrary.compilableExample);
    else setActiveCode(selectedMacro.compilableExample);
    setTestResult(null);
  };

  return (
    <div className="bg-white border-2 border-[#ede3d2] rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b-2 border-[#ede3d2]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-3xl">🔑</span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl md:text-2xl font-black text-[#2b2520]">
                  C Keywords, Standard Libraries &amp; Macro Definitions
                </h2>
                <span className="text-xs bg-[#eaf6f4] text-[#2a9d8f] border border-[#2a9d8f] px-2.5 py-0.5 rounded-full font-bold">
                  Complete ISO C Reference
                </span>
              </div>
              <p className="text-xs text-[#7d7065] font-medium mt-0.5">
                Master all 32 ISO C keywords, standard header libraries (&lt;stdio.h&gt;, &lt;stdlib.h&gt;, &lt;string.h&gt;), and core preprocessor definitions with genuine WebAssembly compilation.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleResetCode}
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#fcf7ee] hover:bg-[#ede3d2] text-[#7d7065] border border-[#ede3d2] cursor-pointer transition flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Code
          </button>
        </div>
      </div>

      {/* Primary Section Switcher */}
      <div className="flex flex-wrap gap-2 pb-1 border-b border-[#ebdcc4]">
        <button
          onClick={() => {
            setMainSection('keywords');
            setActiveCode(selectedKeyword.compilableExample);
            setTestResult(null);
          }}
          className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-2 cursor-pointer ${
            mainSection === 'keywords'
              ? 'bg-[#7c3aed] text-white shadow-sm'
              : 'bg-[#fcf7ee] text-[#7d7065] hover:bg-[#ede3d2] border border-[#ede3d2]'
          }`}
        >
          <KeyRound className="w-4 h-4" />
          <span>1. 32 Standard Keywords (auto, static, volatile...)</span>
        </button>

        <button
          onClick={() => {
            setMainSection('libraries');
            setActiveCode(selectedLibrary.compilableExample);
            setTestResult(null);
          }}
          className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-2 cursor-pointer ${
            mainSection === 'libraries'
              ? 'bg-[#0284c7] text-white shadow-sm'
              : 'bg-[#fcf7ee] text-[#7d7065] hover:bg-[#ede3d2] border border-[#ede3d2]'
          }`}
        >
          <Library className="w-4 h-4" />
          <span>2. Standard Libraries (&lt;stdio.h&gt;, &lt;stdlib.h&gt;, &lt;string.h&gt;...)</span>
        </button>

        <button
          onClick={() => {
            setMainSection('definitions');
            setActiveCode(selectedMacro.compilableExample);
            setTestResult(null);
          }}
          className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-2 cursor-pointer ${
            mainSection === 'definitions'
              ? 'bg-[#d97706] text-white shadow-sm'
              : 'bg-[#fcf7ee] text-[#7d7065] hover:bg-[#ede3d2] border border-[#ede3d2]'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>3. Preprocessor &amp; Core Definitions (#define, NULL, EOF...)</span>
        </button>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-[#fcf7ee] border-2 border-[#ebdcc4] p-4 rounded-2xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          {mainSection === 'keywords' && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {keywordCategories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition cursor-pointer ${
                      isActive
                        ? 'bg-[#7c3aed] text-white shadow-xs'
                        : 'bg-white hover:bg-[#ebdcc4] text-[#7d7065] border border-[#ebdcc4]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          )}

          {mainSection === 'libraries' && (
            <span className="text-xs font-bold text-[#0284c7]">
              C Standard Library Headers (ISO/IEC 9899)
            </span>
          )}

          {mainSection === 'definitions' && (
            <span className="text-xs font-bold text-[#d97706]">
              Essential Preprocessor Directives &amp; Standard Constants
            </span>
          )}

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#7d7065] absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search reference..."
              className="bg-white border-2 border-[#ede3d2] rounded-xl pl-8 pr-3 py-1.5 text-xs font-mono text-[#2b2520] placeholder-[#a8a29e] focus:outline-none focus:border-[#7c3aed] w-56"
            />
          </div>
        </div>

        {/* Item Selector Pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {mainSection === 'keywords' &&
            filteredKeywords.map((item) => {
              const isSelected = item.keyword === selectedKeyword.keyword;
              return (
                <button
                  key={item.keyword}
                  onClick={() => handleSelectKeyword(item)}
                  className={`px-3 py-1.5 rounded-xl font-mono text-xs font-black transition cursor-pointer border-2 ${
                    isSelected
                      ? 'bg-[#7c3aed] text-white border-[#5b21b6] shadow-xs scale-105'
                      : 'bg-white text-[#57534e] border-[#ede3d2] hover:bg-[#faf4ea]'
                  }`}
                >
                  {item.keyword}
                </button>
              );
            })}

          {mainSection === 'libraries' &&
            filteredLibraries.map((item) => {
              const isSelected = item.id === selectedLibrary.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectLibrary(item)}
                  className={`px-3 py-1.5 rounded-xl font-mono text-xs font-black transition cursor-pointer border-2 ${
                    isSelected
                      ? 'bg-[#0284c7] text-white border-[#0369a1] shadow-xs scale-105'
                      : 'bg-white text-[#57534e] border-[#ede3d2] hover:bg-[#faf4ea]'
                  }`}
                >
                  {item.header}
                </button>
              );
            })}

          {mainSection === 'definitions' &&
            filteredMacros.map((item) => {
              const isSelected = item.id === selectedMacro.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectMacro(item)}
                  className={`px-3 py-1.5 rounded-xl font-mono text-xs font-black transition cursor-pointer border-2 ${
                    isSelected
                      ? 'bg-[#d97706] text-white border-[#b45309] shadow-xs scale-105'
                      : 'bg-white text-[#57534e] border-[#ede3d2] hover:bg-[#faf4ea]'
                  }`}
                >
                  {item.name.split(' ')[0]}
                </button>
              );
            })}
        </div>
      </div>

      {/* Deep Dive Card */}
      {mainSection === 'keywords' && (
        <div className="bg-[#fcf7ee] border-2 border-[#ebdcc4] rounded-2xl p-5 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <span className="font-mono text-2xl font-black bg-[#2b2520] text-[#f4eedb] px-3.5 py-1 rounded-xl shadow-xs">
                {selectedKeyword.keyword}
              </span>
              <div>
                <span className="text-[10px] font-black uppercase text-[#7c3aed] tracking-wider">
                  Category: {selectedKeyword.category}
                </span>
                <h3 className="text-base font-bold text-[#2b2520]">{selectedKeyword.oneLiner}</h3>
              </div>
            </div>

            <span className="text-xs bg-white border border-[#ebdcc4] px-3 py-1 rounded-xl font-mono text-[#7d7065]">
              ISO C Standard Keyword
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="bg-white border border-[#ebdcc4] p-3.5 rounded-xl space-y-1">
              <div className="text-[#2a9d8f] font-bold text-xs uppercase flex items-center gap-1.5">
                <Cpu className="w-4 h-4" />
                What Physically Happens in Silicon / CPU Registers:
              </div>
              <p className="text-[#57534e] leading-relaxed">
                {selectedKeyword.hardwareSiliconMeaning}
              </p>
            </div>

            <div className="bg-white border border-[#ebdcc4] p-3.5 rounded-xl space-y-1">
              <div className="text-[#d97706] font-bold text-xs uppercase flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4" />
                Senior Systems Engineer Interview Insight:
              </div>
              <p className="text-[#57534e] leading-relaxed">
                {selectedKeyword.interviewTip}
              </p>
            </div>
          </div>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-900 font-bold">Common Student Trap: </strong>
              <span className="text-amber-800">{selectedKeyword.commonPitfall}</span>
            </div>
          </div>
        </div>
      )}

      {mainSection === 'libraries' && (
        <div className="bg-[#fcf7ee] border-2 border-[#ebdcc4] rounded-2xl p-5 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <span className="font-mono text-2xl font-black bg-[#0284c7] text-white px-3.5 py-1 rounded-xl shadow-xs">
                {selectedLibrary.header}
              </span>
              <div>
                <span className="text-[10px] font-black uppercase text-[#0284c7] tracking-wider">
                  Domain: {selectedLibrary.category}
                </span>
                <h3 className="text-base font-bold text-[#2b2520]">{selectedLibrary.title}</h3>
              </div>
            </div>
          </div>

          <p className="text-xs text-[#57534e] font-medium leading-relaxed">
            {selectedLibrary.oneLiner}
          </p>

          <div className="bg-white border border-[#ebdcc4] p-3.5 rounded-xl space-y-1 text-xs">
            <div className="text-[#2a9d8f] font-bold uppercase flex items-center gap-1.5">
              <Cpu className="w-4 h-4" />
              OS Kernel &amp; Hardware Role:
            </div>
            <p className="text-[#57534e] leading-relaxed">{selectedLibrary.osSiliconRole}</p>
          </div>

          {/* Key functions table */}
          <div className="space-y-1.5">
            <div className="text-[11px] font-black uppercase text-[#7d7065]">
              Core Functions in {selectedLibrary.header}:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-mono">
              {selectedLibrary.keyFunctions.map((fn) => (
                <div key={fn.name} className="p-2.5 bg-white border border-[#ebdcc4] rounded-xl space-y-0.5">
                  <div className="font-bold text-[#0284c7]">{fn.name}</div>
                  <div className="text-[10px] text-slate-500">{fn.signature}</div>
                  <div className="text-[11px] text-[#57534e] font-sans mt-0.5">{fn.purpose}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-900 font-bold">Safety Guideline / Pitfall: </strong>
              <span className="text-amber-800">{selectedLibrary.commonPitfall}</span>
            </div>
          </div>
        </div>
      )}

      {mainSection === 'definitions' && (
        <div className="bg-[#fcf7ee] border-2 border-[#ebdcc4] rounded-2xl p-5 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <span className="font-mono text-2xl font-black bg-[#d97706] text-white px-3.5 py-1 rounded-xl shadow-xs">
                {selectedMacro.name.split(' ')[0]}
              </span>
              <div>
                <span className="text-[10px] font-black uppercase text-[#d97706] tracking-wider">
                  Type: {selectedMacro.category}
                </span>
                <h3 className="text-base font-bold text-[#2b2520]">{selectedMacro.name}</h3>
              </div>
            </div>
            <span className="text-xs bg-white border border-[#ebdcc4] px-3 py-1 rounded-xl font-mono text-[#7d7065]">
              Syntax: {selectedMacro.syntax}
            </span>
          </div>

          <p className="text-xs text-[#57534e] font-medium leading-relaxed">
            {selectedMacro.oneLiner}
          </p>

          <div className="bg-white border border-[#ebdcc4] p-3.5 rounded-xl space-y-1 text-xs">
            <div className="text-[#2a9d8f] font-bold uppercase flex items-center gap-1.5">
              <Cpu className="w-4 h-4" />
              Preprocessor Textual Replacement Mechanics:
            </div>
            <p className="text-[#57534e] leading-relaxed">{selectedMacro.preprocessorBehavior}</p>
          </div>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-900 font-bold">Golden Rule &amp; Common Bug: </strong>
              <span className="text-amber-800">{selectedMacro.pitfallOrRule}</span>
            </div>
          </div>
        </div>
      )}

      {/* Editor & Compiler Execution Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Code Editor (7 cols) */}
        <div className="lg:col-span-7 flex flex-col bg-[#fcf7ee] border-2 border-[#ebdcc4] rounded-2xl p-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#ebdcc4] text-xs font-bold text-[#57534e] mb-2 font-mono">
            <span>Live Compilable C Example</span>
            <span className="text-[#e57e25]">Editable</span>
          </div>

          <textarea
            value={activeCode}
            onChange={(e) => setActiveCode(e.target.value)}
            className="flex-1 w-full bg-white p-3 font-mono text-xs text-[#2b2520] rounded-xl border border-[#ebdcc4] leading-relaxed focus:outline-none resize-none min-h-[260px]"
            spellCheck={false}
          />

          <div className="mt-3 flex items-center justify-between">
            <span className="text-[11px] text-[#7d7065] font-bold">
              Tested on genuine WebAssembly C engine
            </span>
            <button
              onClick={handleRunVerification}
              disabled={isTesting}
              className="friendly-button-amber px-6 py-2.5 text-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{isTesting ? 'Compiling in C Engine...' : 'Run Live Code'}</span>
            </button>
          </div>
        </div>

        {/* Terminal Output (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-[#2b2520] text-white rounded-2xl p-4 font-mono text-xs min-h-[260px]">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-700 text-slate-400 text-[10px] mb-2">
              <span className="flex items-center gap-1">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                Live Execution Console
              </span>
              <span>exit code 0</span>
            </div>

            {testResult ? (
              <div
                className={`p-3 rounded-xl border ${testResult.isSuccess
                  ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                  : 'bg-rose-950/60 border-rose-500 text-rose-300'
                  }`}
              >
                <div className="flex items-center gap-1.5 font-bold mb-1">
                  {testResult.isSuccess ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-400" />
                  )}
                  <span>{testResult.isSuccess ? 'EXECUTION SUCCESS' : 'DIAGNOSTIC ERROR'}</span>
                </div>
                <pre className="whitespace-pre-wrap font-mono text-[11px] max-h-[160px] overflow-y-auto">
                  {testResult.output}
                </pre>
              </div>
            ) : (
              <div className="py-14 text-center text-slate-500 text-xs flex flex-col items-center justify-center gap-2">
                <KeyRound className="w-6 h-6 text-slate-600" />
                <span>Click &quot;Run Live Code&quot; to test in the WebAssembly engine!</span>
              </div>
            )}
          </div>

          <div className="mt-4 pt-2 border-t border-slate-700 text-[10px] text-slate-400 font-sans flex items-center justify-between">
            <span>Hardware Architecture: x86-64 / ARM64</span>
            <span>ISO C11 Standard</span>
          </div>
        </div>
      </div>
    </div>
  );
};
