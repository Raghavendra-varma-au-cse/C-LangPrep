'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ERROR_LAB_SCENARIOS, 
  ERROR_CATEGORIES, 
  ErrorCategory, 
  ErrorLabScenario 
} from '@/data/error-lab/errorCatalog';
import {
  AlertTriangle,
  Bug,
  CheckCircle2,
  Cpu,
  FileCode,
  Flame,
  FolderTree,
  Lightbulb,
  Play,
  RotateCcw,
  Sparkles,
  Terminal,
  XCircle,
  HelpCircle,
  ListChecks,
  Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { requestCompileC } from '@/lib/apiCompilerClient';

export const ErrorLabVisualizer: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ErrorCategory | 'all'>('all');
  const [selectedId, setSelectedId] = useState<string>(ERROR_LAB_SCENARIOS[0].id);

  // Filtered scenarios
  const filteredScenarios = activeCategory === 'all' 
    ? ERROR_LAB_SCENARIOS 
    : ERROR_LAB_SCENARIOS.filter(s => s.category === activeCategory);

  // Active scenario
  const scenario = ERROR_LAB_SCENARIOS.find(s => s.id === selectedId) || ERROR_LAB_SCENARIOS[0];

  const [activeCode, setActiveCode] = useState<string>(scenario.errorCodeSnippet);
  const [testResult, setTestResult] = useState<{ isSuccess: boolean; output: string } | null>(null);
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const [activeMultiFileIdx, setActiveMultiFileIdx] = useState<number>(0);
  const [resolvedBugs, setResolvedBugs] = useState<Record<string, boolean>>({});

  const handleSelectScenario = (item: ErrorLabScenario) => {
    setSelectedId(item.id);
    setActiveCode(item.errorCodeSnippet);
    setTestResult(null);
    setActiveMultiFileIdx(0);
    setResolvedBugs({});
  };

  const handleCategoryChange = (cat: ErrorCategory | 'all') => {
    setActiveCategory(cat);
    const firstMatching = cat === 'all' 
      ? ERROR_LAB_SCENARIOS[0] 
      : ERROR_LAB_SCENARIOS.find(s => s.category === cat) || ERROR_LAB_SCENARIOS[0];
    handleSelectScenario(firstMatching);
  };

  const handleRunVerification = async () => {
    setIsTesting(true);
    setTestResult(null);

    try {
      const data = await requestCompileC(activeCode);

      if (data.exitCode === 0) {
        setTestResult({
          isSuccess: true,
          output: `Compilation & Execution PASSED with exit code 0!\n${data.stdout ? 'stdout:\n' + data.stdout : 'Clean compilation with zero diagnostics errors.'}`
        });
        // Auto-mark all bugs as resolved on clean execution
        if (scenario.bugsList) {
          const allResolved: Record<string, boolean> = {};
          scenario.bugsList.forEach(b => { allResolved[b.id] = true; });
          setResolvedBugs(allResolved);
        }
        confetti({ particleCount: 70, spread: 70, origin: { y: 0.8 } });
      } else {
        const errorMsg = data.stderr || scenario.symptomText;
        setTestResult({
          isSuccess: false,
          output: `${scenario.phaseInPipeline} HALTED (exit code ${data.exitCode ?? 1}):\n${errorMsg}`
        });
      }
    } catch (_) {
      setTestResult({
        isSuccess: false,
        output: `${scenario.phaseInPipeline} HALTED:\n${scenario.symptomText}`
      });
    } finally {
      setIsTesting(false);
    }
  };

  const handleAutoFix = () => {
    setActiveCode(scenario.fixedCodeSnippet);
    setTestResult(null);
    if (scenario.bugsList) {
      const allResolved: Record<string, boolean> = {};
      scenario.bugsList.forEach(b => { allResolved[b.id] = true; });
      setResolvedBugs(allResolved);
    }
  };

  const handleReset = () => {
    setActiveCode(scenario.errorCodeSnippet);
    setTestResult(null);
    setResolvedBugs({});
  };

  const toggleBugResolved = (bugId: string) => {
    setResolvedBugs(prev => ({ ...prev, [bugId]: !prev[bugId] }));
  };

  const lineCount = activeCode.split('\n').length;

  return (
    <div className="bg-white border-2 border-[#ede3d2] rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b-2 border-[#ede3d2]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-3xl">🩺</span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl md:text-2xl font-black text-[#2b2520]">
                  C Error Doctor &amp; Diagnostic Lab
                </h2>
                <span className="text-xs bg-[#fdf0ec] text-[#e76f51] border border-[#f5b8a9] px-2.5 py-0.5 rounded-full font-bold">
                  Syntax &bull; Compile &bull; Linker &bull; Runtime &bull; Multi-File &bull; Multi-Bug
                </span>
              </div>
              <p className="text-xs text-[#7d7065] font-medium mt-0.5">
                Hunt down complex compiler errors, trace segmentation faults in silicon, resolve multi-file linking conflicts, and fix multi-bug large codebase files.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleAutoFix}
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#eaf6f4] hover:bg-[#b2ded8] text-[#2a9d8f] border border-[#b2ded8] cursor-pointer transition flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Show Doctor&apos;s Solution</span>
          </button>
          <button
            onClick={handleReset}
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-[#fcf7ee] hover:bg-[#ede3d2] text-[#7d7065] border border-[#ede3d2] cursor-pointer transition flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Bug
          </button>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2 pb-2">
        {ERROR_CATEGORIES.map(cat => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 cursor-pointer ${
                isActive
                  ? 'bg-[#2b2520] text-white border-[#2b2520] shadow-sm'
                  : 'bg-[#fcf7ee] text-[#57534e] border-[#ebdcc4] hover:bg-[#ebdcc4]'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Scenario Selector Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {filteredScenarios.map((item) => {
          const isSelected = item.id === scenario.id;
          return (
            <button
              key={item.id}
              onClick={() => handleSelectScenario(item)}
              className={`p-2.5 rounded-2xl border-2 text-left cursor-pointer transition flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#fdf5ea] border-[#e57e25] shadow-xs ring-1 ring-[#e57e25]'
                  : 'bg-white hover:bg-[#fcf7ee] border-[#ede3d2]'
              }`}
            >
              <div>
                <div className="text-[9px] font-black uppercase text-[#e57e25] truncate">
                  {item.categoryLabel}
                </div>
                <div className="text-xs font-bold text-[#2b2520] line-clamp-2 mt-0.5">
                  {item.title}
                </div>
              </div>
              {item.isMultiError && (
                <span className="mt-1.5 inline-block text-[9px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded-md border border-amber-300">
                  {item.bugsList?.length || 3} Bugs in File
                </span>
              )}
              {item.isMultiFile && (
                <span className="mt-1.5 inline-block text-[9px] bg-blue-100 text-blue-800 font-bold px-1.5 py-0.5 rounded-md border border-blue-300">
                  Multi-File / Header
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Active Scenario Card Header */}
      <div className="bg-[#fcf7ee] border-2 border-[#ebdcc4] rounded-2xl p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="text-3xl">
              {scenario.category === 'multi-error-challenge' ? '🕵️‍♂️' : scenario.category === 'multi-file-linking' ? '🔗' : '⚠️'}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase text-[#e76f51] tracking-wider">
                  Pipeline Stage: {scenario.phaseInPipeline}
                </span>
                {scenario.isMultiError && (
                  <span className="text-[10px] bg-amber-200 text-amber-900 font-bold px-2 py-0.5 rounded-md">
                    Large Code File Investigation
                  </span>
                )}
                {scenario.isMultiFile && (
                  <span className="text-[10px] bg-blue-200 text-blue-900 font-bold px-2 py-0.5 rounded-md">
                    Multi-File Linker Unit
                  </span>
                )}
              </div>
              <h3 className="text-lg md:text-xl font-black text-[#2b2520]">{scenario.title}</h3>
            </div>
          </div>
          <span className="text-xs font-mono font-bold px-3 py-1 bg-white border border-[#ebdcc4] rounded-xl text-[#7d7065]">
            Target Line: #{scenario.errorLineNum}
          </span>
        </div>

        {/* Real life mental analogy */}
        <div className="p-3.5 bg-white border border-[#ebdcc4] rounded-xl text-xs space-y-1">
          <div className="font-bold text-[#d97706] flex items-center gap-1.5">
            <Lightbulb className="w-4 h-4" />
            Real-Life Mental Model &amp; Analogy:
          </div>
          <p className="text-[#3d3630] font-medium leading-relaxed">
            {scenario.realWorldAnalogy}
          </p>
        </div>

        {/* Observed symptom text */}
        <div className="p-3 bg-[#2b2520] text-[#f4eedb] rounded-xl font-mono text-xs space-y-1">
          <div className="text-rose-400 font-bold uppercase text-[10px] flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5" />
            Observed Diagnostic Error / Terminal Crash Log:
          </div>
          <div className="text-rose-300 whitespace-pre-wrap">{scenario.symptomText}</div>
        </div>

        {/* Multi-Bug Interactive Checklist if present */}
        {scenario.isMultiError && scenario.bugsList && (
          <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-amber-900">
              <span className="flex items-center gap-1.5">
                <ListChecks className="w-4 h-4 text-amber-700" />
                Multi-Bug Diagnostic Checklist (Find and fix all {scenario.bugsList.length} errors):
              </span>
              <span className="bg-amber-200 px-2 py-0.5 rounded-md text-[11px]">
                {Object.values(resolvedBugs).filter(Boolean).length} of {scenario.bugsList.length} fixed
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {scenario.bugsList.map((bug) => {
                const isChecked = !!resolvedBugs[bug.id];
                return (
                  <div 
                    key={bug.id} 
                    onClick={() => toggleBugResolved(bug.id)}
                    className={`p-2.5 rounded-lg border text-xs cursor-pointer transition flex items-start gap-2 ${
                      isChecked 
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-900' 
                        : 'bg-white border-amber-200 text-amber-950 hover:bg-amber-100/50'
                    }`}
                  >
                    <input 
                      type="checkbox" 
                      checked={isChecked} 
                      onChange={() => {}} 
                      className="mt-0.5 rounded cursor-pointer"
                    />
                    <div>
                      <div className="font-bold">Line #{bug.line}: {bug.description}</div>
                      <div className="text-[10px] text-amber-700 font-mono mt-0.5">Hint: {bug.hint}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Multi-File Architecture Tabs if present */}
        {scenario.isMultiFile && scenario.files && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-blue-900">
              <span className="flex items-center gap-1.5">
                <FolderTree className="w-4 h-4 text-blue-700" />
                Multi-File Architecture Breakdown:
              </span>
              <span className="text-[11px] text-blue-700">Inspect simulated project structure</span>
            </div>
            <div className="flex gap-2">
              {scenario.files.map((file, idx) => (
                <button
                  key={file.fileName}
                  onClick={() => setActiveMultiFileIdx(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold border transition ${
                    activeMultiFileIdx === idx
                      ? 'bg-blue-600 text-white border-blue-700'
                      : 'bg-white text-blue-900 border-blue-200 hover:bg-blue-100'
                  }`}
                >
                  {file.fileName} ({file.role})
                </button>
              ))}
            </div>
            <div className="p-2.5 bg-white border border-blue-200 rounded-lg font-mono text-[11px] text-slate-700">
              <span className="text-blue-600 font-bold">Role: {scenario.files[activeMultiFileIdx].role}</span>
              <pre className="mt-1 whitespace-pre-wrap">{scenario.files[activeMultiFileIdx].content}</pre>
            </div>
          </div>
        )}
      </div>

      {/* Editor & Diagnostics Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Editor Area (7 cols) */}
        <div className="lg:col-span-7 flex flex-col bg-[#fcf7ee] border-2 border-[#ebdcc4] rounded-2xl p-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#ebdcc4] text-xs font-bold text-[#57534e] mb-2 font-mono">
            <span className="flex items-center gap-1.5">
              <FileCode className="w-4 h-4 text-[#e57e25]" />
              Source Code (Fix the bug on line #{scenario.errorLineNum})
            </span>
            <span className="text-[#e57e25] bg-white px-2 py-0.5 rounded border border-[#ebdcc4]">
              {lineCount} Lines &bull; Editable
            </span>
          </div>

          <div className="relative flex-1 flex flex-col">
            <textarea
              value={activeCode}
              onChange={(e) => setActiveCode(e.target.value)}
              className="flex-1 w-full bg-white p-3 font-mono text-xs text-[#2b2520] rounded-xl border border-[#ebdcc4] leading-relaxed focus:outline-none resize-none min-h-[300px]"
              spellCheck={false}
            />
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            <span className="text-[11px] text-[#7d7065] font-bold">
              Tip: {scenario.preventionTip}
            </span>
            <button
              onClick={handleRunVerification}
              disabled={isTesting}
              className="friendly-button-amber px-6 py-2.5 text-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{isTesting ? 'Diagnosing with Real C Engine...' : 'Test Diagnostic Run'}</span>
            </button>
          </div>
        </div>

        {/* Hardware & Result View (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          {/* Under the hood dissection */}
          <div className="bg-white border-2 border-[#ede3d2] p-4 rounded-2xl space-y-2">
            <div className="text-xs font-black text-[#2a9d8f] uppercase flex items-center gap-1.5">
              <Cpu className="w-4 h-4" />
              What Physically Happens in Silicon / Compiler:
            </div>
            <p className="text-xs text-[#57534e] leading-relaxed">
              {scenario.underTheHoodDissection}
            </p>
          </div>

          {/* Test Result Terminal Box */}
          <div className="p-4 bg-[#2b2520] text-white rounded-2xl font-mono text-xs flex-1 flex flex-col justify-between min-h-[220px]">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-700 text-slate-400 text-[10px] mb-2">
                <span className="flex items-center gap-1">
                  <Terminal className="w-3.5 h-3.5" />
                  Real C Engine Verification
                </span>
                <span>Signal Status</span>
              </div>
              {testResult ? (
                <div className={`p-3 rounded-xl border ${testResult.isSuccess ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300' : 'bg-rose-950/60 border-rose-500 text-rose-300'}`}>
                  <div className="flex items-center gap-1.5 font-bold mb-1">
                    {testResult.isSuccess ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <XCircle className="w-4 h-4 text-rose-400" />}
                    <span>{testResult.isSuccess ? 'PASS - BUG RESOLVED' : 'FAIL - DIAGNOSTIC TRIPPED'}</span>
                  </div>
                  <pre className="whitespace-pre-wrap font-mono text-[11px] max-h-[160px] overflow-y-auto">{testResult.output}</pre>
                </div>
              ) : (
                <div className="py-14 text-center text-slate-500 text-xs flex flex-col items-center justify-center gap-2">
                  <Cpu className="w-6 h-6 text-slate-600" />
                  <span>Click &quot;Test Diagnostic Run&quot; to test your fix in the live compiler!</span>
                </div>
              )}
            </div>

            <div className="mt-4 pt-2 border-t border-slate-700 text-[10px] text-slate-400 font-sans flex items-center justify-between">
              <span>Verified via Real C WebAssembly Engine</span>
              <span>exit code 0 required</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
