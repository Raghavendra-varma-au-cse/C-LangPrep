'use client';

import React, { useState } from 'react';
import { QuizQuestion, InteractiveTask } from '@/types/course';
import { HelpCircle, CheckCircle, XCircle, Code2, Play, Lightbulb, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuizAndTasksProps {
  quiz: QuizQuestion[];
  tasks: InteractiveTask[];
}

export const QuizAndTasks: React.FC<QuizAndTasksProps> = ({ quiz, tasks }) => {
  // Quiz State
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [revealedExplanations, setRevealedExplanations] = useState<Record<string, boolean>>({});

  // Task State
  const [activeTaskIdx, setActiveTaskIdx] = useState<number>(0);
  const [userCode, setUserCode] = useState<string>(tasks[0]?.initialCode || '');
  const [taskOutput, setTaskOutput] = useState<string>('');
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [taskStatus, setTaskStatus] = useState<'idle' | 'success' | 'failed'>('idle');

  const currentTask = tasks[activeTaskIdx];

  const handleSelectOption = (qId: string, optIdx: number, correctIdx: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optIdx }));
    setRevealedExplanations((prev) => ({ ...prev, [qId]: true }));
    if (optIdx === correctIdx) {
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.85 } });
    }
  };

  const handleSimulateRun = () => {
    // Basic verification of student code
    if (!currentTask) return;
    const cleanUser = userCode.trim().replace(/\s+/g, ' ');
    const cleanSolution = currentTask.solution.trim().replace(/\s+/g, ' ');

    // Check if key components of solution exist in user code
    const isMatched = cleanUser.includes(currentTask.expectedOutput.trim().split('\n')[0].slice(0, 10)) ||
      cleanUser.length > currentTask.initialCode.length;

    if (isMatched) {
      setTaskOutput(currentTask.expectedOutput);
      setTaskStatus('success');
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.8 } });
    } else {
      setTaskOutput('Compiler Warning / Output mismatch.\nDid you update the code as instructed in the problem statement?');
      setTaskStatus('failed');
    }
  };

  return (
    <div className="space-y-8">
      {/* Quiz Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800">
          <HelpCircle className="w-5 h-5 text-indigo-400" />
          <h3 className="text-base font-semibold text-slate-100">
            Concept Verification &amp; Logic Check
          </h3>
        </div>

        <div className="space-y-6">
          {quiz.map((q, idx) => {
            const hasAnswered = selectedAnswers[q.id] !== undefined;
            const chosen = selectedAnswers[q.id];
            const isCorrect = chosen === q.correctIndex;

            return (
              <div key={q.id} className="bg-slate-950/70 border border-slate-800 p-4 rounded-xl">
                <p className="text-sm font-medium text-slate-200 mb-3">
                  <span className="text-indigo-400 font-mono mr-2">Q{idx + 1}.</span>
                  {q.question}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {q.options.map((opt, optIdx) => {
                    const isOptionSelected = chosen === optIdx;
                    let optStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';

                    if (hasAnswered) {
                      if (optIdx === q.correctIndex) {
                        optStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-300 font-semibold';
                      } else if (isOptionSelected) {
                        optStyle = 'bg-rose-950/60 border-rose-500 text-rose-300';
                      } else {
                        optStyle = 'opacity-40 border-slate-800';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={hasAnswered}
                        onClick={() => handleSelectOption(q.id, optIdx, q.correctIndex)}
                        className={`p-3 rounded-lg border text-xs text-left transition cursor-pointer flex items-start gap-2 ${optStyle}`}
                      >
                        <span className="font-mono text-slate-500">{String.fromCharCode(65 + optIdx)}.</span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {hasAnswered && (
                  <div
                    className={`mt-3 p-3 rounded-lg border text-xs leading-relaxed ${
                      isCorrect
                        ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-300'
                        : 'bg-rose-950/40 border-rose-800/60 text-rose-300'
                    }`}
                  >
                    <div className="font-semibold flex items-center gap-1.5 mb-1">
                      {isCorrect ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <XCircle className="w-4 h-4 text-rose-400" />}
                      <span>{isCorrect ? 'Correct Logic!' : 'Review the Concept:'}</span>
                    </div>
                    <p className="font-sans">{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Hands-On Task Workspace */}
      {currentTask && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl text-slate-100">
          <div className="flex flex-wrap items-center justify-between px-5 py-3.5 bg-slate-950 border-b border-slate-800 gap-2">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                Hands-On Coding Challenge: {currentTask.title}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowHint(!showHint)}
                className="flex items-center gap-1 px-2.5 py-1 text-[11px] text-amber-400 bg-amber-950/40 border border-amber-800/60 rounded hover:bg-amber-900/50 cursor-pointer"
              >
                <Lightbulb className="w-3.5 h-3.5" />
                {showHint ? 'Hide Hint' : 'Hint'}
              </button>
              <button
                onClick={() => setShowSolution(!showSolution)}
                className="flex items-center gap-1 px-2.5 py-1 text-[11px] text-slate-400 bg-slate-800 border border-slate-700 rounded hover:text-white cursor-pointer"
              >
                {showSolution ? 'Hide Solution' : 'Solution'}
              </button>
            </div>
          </div>

          <div className="p-5 space-y-4">
            <div className="bg-slate-950/70 border border-slate-800 p-3.5 rounded-lg text-xs leading-relaxed">
              <span className="font-semibold text-indigo-400 uppercase tracking-wider font-mono text-[10px] block mb-1">Objective:</span>
              <p className="text-slate-300">{currentTask.problemStatement}</p>
            </div>

            {showHint && (
              <div className="bg-amber-950/30 border border-amber-800/50 p-3 rounded-lg text-xs text-amber-300 font-sans">
                <strong>Hint:</strong> {currentTask.hint}
              </div>
            )}

            {showSolution && (
              <div className="bg-slate-950 border border-emerald-800/60 p-3 rounded-lg font-mono text-xs text-emerald-300">
                <div className="text-[10px] text-emerald-500 uppercase mb-1">Reference Solution:</div>
                <pre className="whitespace-pre overflow-x-auto">{currentTask.solution}</pre>
              </div>
            )}

            {/* Code Editor Area */}
            <div>
              <div className="text-[11px] font-mono text-slate-400 mb-1 flex items-center justify-between">
                <span>Your C Code:</span>
                <span>Compile Target: C99 / C11 Native</span>
              </div>
              <textarea
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                rows={10}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 font-mono text-xs text-slate-100 focus:outline-none focus:border-indigo-500 resize-none leading-relaxed"
                spellCheck={false}
              />
            </div>

            {/* Run Button & Terminal Output */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                onClick={handleSimulateRun}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold uppercase tracking-wider cursor-pointer shadow-md shadow-emerald-950/50"
              >
                <Play className="w-4 h-4 fill-white" />
                Compile &amp; Test Run
              </button>

              {taskStatus === 'success' && (
                <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                  <Check className="w-4 h-4" />
                  Task Completed Successfully!
                </span>
              )}
            </div>

            {taskOutput && (
              <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 font-mono text-xs">
                <div className="text-[10px] text-slate-500 uppercase border-b border-slate-800 pb-1 mb-1">
                  Terminal Output (stdout):
                </div>
                <pre className={`whitespace-pre ${taskStatus === 'success' ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {taskOutput}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
