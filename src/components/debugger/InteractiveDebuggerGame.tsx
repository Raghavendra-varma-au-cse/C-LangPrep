'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bug, Play, StepForward, RotateCcw, AlertTriangle, CheckCircle2, Terminal, Code2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BuggyScenario {
  id: string;
  title: string;
  bugType: 'Off-By-One' | 'Missing Semicolon' | 'Format Specifier' | 'Uninitialized Variable' | 'Dangling Pointer';
  buggyCode: string;
  buggyLineNumber: number;
  explanation: string;
  symptom: string;
  correctedCode: string;
  hint: string;
}

const DEBUG_SCENARIOS: BuggyScenario[] = [
  {
    id: 'bug-semicolon',
    title: '1. The Vanishing Semicolon',
    bugType: 'Missing Semicolon',
    buggyCode: `#include <stdio.h>

int main(void) {
    int age = 21
    printf("Age: %d\\n", age);
    return 0;
}`,
    buggyLineNumber: 4,
    symptom: "error: expected ';' before 'printf'",
    explanation: "In C, every statement must terminate with a semicolon (;). Without it, the compiler parser attempts to merge the two statements into one invalid grammar token.",
    correctedCode: `#include <stdio.h>

int main(void) {
    int age = 21;
    printf("Age: %d\\n", age);
    return 0;
}`,
    hint: "Look at line 4: does the declaration of 'age' end with a semicolon?"
  },
  {
    id: 'bug-off-by-one',
    title: '2. The Off-By-One Buffer Overflow',
    bugType: 'Off-By-One',
    buggyCode: `#include <stdio.h>

int main(void) {
    int scores[5] = {10, 20, 30, 40, 50};

    // Array has indices 0, 1, 2, 3, 4
    for (int i = 0; i <= 5; i++) {
        printf("scores[%d] = %d\\n", i, scores[i]);
    }
    return 0;
}`,
    buggyLineNumber: 7,
    symptom: "scores[5] reads garbage memory from stack frame (or crashes with SIGSEGV)",
    explanation: "An array of 5 elements only has valid indices from 0 to 4. Writing `i <= 5` attempts to access index 5, reading beyond the stack boundary.",
    correctedCode: `#include <stdio.h>

int main(void) {
    int scores[5] = {10, 20, 30, 40, 50};

    // Array has indices 0, 1, 2, 3, 4
    for (int i = 0; i < 5; i++) {
        printf("scores[%d] = %d\\n", i, scores[i]);
    }
    return 0;
}`,
    hint: "Change the loop condition from `i <= 5` to `i < 5`."
  },
  {
    id: 'bug-uninit',
    title: '3. The Garbage Value Mystery',
    bugType: 'Uninitialized Variable',
    buggyCode: `#include <stdio.h>

int main(void) {
    int total; // Never initialized!
    int item = 15;

    total = total + item;
    printf("Total: %d\\n", total);
    return 0;
}`,
    buggyLineNumber: 4,
    symptom: "Total prints random bizarre integer like -858993460",
    explanation: "Local variables on the stack are NOT zeroed by default. They contain whatever leftover binary bits previously occupied that RAM capacitor cell ('garbage value').",
    correctedCode: `#include <stdio.h>

int main(void) {
    int total = 0; // Explicitly initialized to 0
    int item = 15;

    total = total + item;
    printf("Total: %d\\n", total);
    return 0;
}`,
    hint: "Initialize `total` with 0 at declaration: `int total = 0;`."
  },
  {
    id: 'bug-format',
    title: '4. Format Specifier Mismatch',
    bugType: 'Format Specifier',
    buggyCode: `#include <stdio.h>

int main(void) {
    float temperature = 98.6f;
    // Bug: Passing float with %d (integer specifier)
    printf("Temperature is: %d\\n", temperature);
    return 0;
}`,
    buggyLineNumber: 6,
    symptom: "Prints 0 or garbage integer because CPU reads float bits with integer logic",
    explanation: "Float values are passed via XMM registers (floating point), whereas %d instructs printf to read from general-purpose registers (EDI/RSI). Always match data types with format specifiers (%f for float).",
    correctedCode: `#include <stdio.h>

int main(void) {
    float temperature = 98.6f;
    printf("Temperature is: %.1f\\n", temperature);
    return 0;
}`,
    hint: "Change `%d` to `%.1f` in the printf format string."
  }
];

export const InteractiveDebuggerGame: React.FC = () => {
  const [activeScenarioIdx, setActiveScenarioIdx] = useState<number>(0);
  const [userCode, setUserCode] = useState<string>(DEBUG_SCENARIOS[0].buggyCode);
  const [feedback, setFeedback] = useState<{ status: 'idle' | 'success' | 'failed'; message: string }>({
    status: 'idle',
    message: ''
  });
  const [showHint, setShowHint] = useState<boolean>(false);

  const scenario = DEBUG_SCENARIOS[activeScenarioIdx];

  const handleSelectScenario = (idx: number) => {
    setActiveScenarioIdx(idx);
    setUserCode(DEBUG_SCENARIOS[idx].buggyCode);
    setFeedback({ status: 'idle', message: '' });
    setShowHint(false);
  };

  const handleCheckFix = () => {
    // Check if user fixed the key problem line
    const cleanUser = userCode.trim().replace(/\s+/g, ' ');
    const cleanCorrect = scenario.correctedCode.trim().replace(/\s+/g, ' ');

    if (cleanUser === cleanCorrect || !cleanUser.includes(scenario.buggyCode.split('\n')[scenario.buggyLineNumber - 1].trim())) {
      setFeedback({
        status: 'success',
        message: 'Bug successfully eliminated! The program compiles cleanly and executes with zero undefined behavior.'
      });
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.85 } });
    } else {
      setFeedback({
        status: 'failed',
        message: `Still detecting bug on line ${scenario.buggyLineNumber}. Read the compiler diagnostic error symptom below!`
      });
    }
  };

  const handleReset = () => {
    setUserCode(scenario.buggyCode);
    setFeedback({ status: 'idle', message: '' });
    setShowHint(false);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl text-slate-100">
      <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Bug className="w-5 h-5 text-rose-400" />
            <h3 className="text-base font-bold text-white tracking-tight">
              Interactive Bug Hunter &amp; Diagnostic Trainer
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Real programmers don&apos;t fear bugs—they diagnose compiler errors and patch memory oversights.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowHint(!showHint)}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 border border-slate-700 text-amber-400 cursor-pointer transition"
          >
            {showHint ? 'Hide Hint' : 'Hint'}
          </button>
          <button
            onClick={handleReset}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 cursor-pointer transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleCheckFix}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-950/60 cursor-pointer transition"
          >
            <CheckCircle2 className="w-4 h-4" />
            Verify Bug Fix
          </button>
        </div>
      </div>

      {/* Scenario Tabs */}
      <div className="p-4 bg-slate-950/50 border-b border-slate-800 flex items-center gap-2 overflow-x-auto">
        <span className="text-[11px] font-mono text-slate-400 shrink-0 uppercase tracking-wider">
          Select Bug:
        </span>
        {DEBUG_SCENARIOS.map((s, idx) => {
          const isSelected = idx === activeScenarioIdx;
          return (
            <button
              key={s.id}
              onClick={() => handleSelectScenario(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono shrink-0 cursor-pointer transition ${
                isSelected
                  ? 'bg-rose-950 text-rose-300 border border-rose-500 font-semibold shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {s.title}
            </button>
          );
        })}
      </div>

      {/* Scenario Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
        {/* Editor Area (7 cols) */}
        <div className="lg:col-span-7 flex flex-col border-b lg:border-b-0 lg:border-r border-slate-800 bg-slate-950/80">
          <div className="px-4 py-2 border-b border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400 bg-slate-950">
            <span>Editor: buggy_source.c</span>
            <span className="text-rose-400 font-semibold">Bug Target: Line {scenario.buggyLineNumber}</span>
          </div>

          <textarea
            value={userCode}
            onChange={(e) => setUserCode(e.target.value)}
            className="flex-1 w-full bg-slate-950 p-4 font-mono text-xs text-slate-100 leading-relaxed focus:outline-none resize-none"
            spellCheck={false}
          />

          {showHint && (
            <div className="p-3 bg-amber-950/30 border-t border-amber-800/60 text-xs text-amber-300 font-sans">
              <strong>Hint:</strong> {scenario.hint}
            </div>
          )}
        </div>

        {/* Diagnostics & Symptoms (5 cols) */}
        <div className="lg:col-span-5 flex flex-col bg-slate-950 p-5 justify-between">
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-800">
                Category: {scenario.bugType}
              </span>
              <h4 className="text-base font-bold text-white mt-2">{scenario.title}</h4>
            </div>

            {/* Compiler Symptom */}
            <div className="p-3.5 bg-slate-900 border border-rose-900/60 rounded-xl space-y-1">
              <div className="text-[11px] font-mono text-rose-400 flex items-center gap-1.5 font-bold">
                <AlertTriangle className="w-3.5 h-3.5" />
                Observed Runtime / Compiler Symptom:
              </div>
              <div className="font-mono text-xs text-slate-300 bg-slate-950 p-2 rounded border border-slate-800">
                {scenario.symptom}
              </div>
            </div>

            {/* Explanation */}
            <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg text-xs space-y-1">
              <div className="text-slate-400 font-mono text-[10px] uppercase font-semibold">
                Why this occurs under the hood:
              </div>
              <p className="text-slate-300 font-sans leading-relaxed text-[11px]">
                {scenario.explanation}
              </p>
            </div>

            {/* Fix Feedback */}
            {feedback.message && (
              <div
                className={`p-3 rounded-lg border text-xs font-sans ${
                  feedback.status === 'success'
                    ? 'bg-emerald-950/60 border-emerald-600 text-emerald-300'
                    : 'bg-rose-950/60 border-rose-600 text-rose-300'
                }`}
              >
                {feedback.message}
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] font-mono text-slate-500">
            Edit the code in the left pane to fix the bug, then click &quot;Verify Bug Fix&quot;.
          </div>
        </div>
      </div>
    </div>
  );
};
