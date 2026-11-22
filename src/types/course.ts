export interface CodeLineExplanation {
  lineNum: number;
  code: string;
  underTheHood: string;
  realWorldAnalogy: string;
  memoryImpact?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface InteractiveTask {
  id: string;
  title: string;
  problemStatement: string;
  initialCode: string;
  expectedOutput: string;
  hint: string;
  solution: string;
}

export interface LessonModule {
  id: string;
  moduleNumber: number;
  title: string;
  subtitle: string;
  category: 'foundations' | 'memory' | 'control-flow' | 'modular' | 'low-level' | 'mastery-project';
  realWorldAnalogy: {
    story: string;
    diagramConcept: string;
    keyTakeaway: string;
  };
  whyItMatters: string;
  underTheHoodArchitecture: {
    whatHappensInHardware: string;
    compilerPhase: string;
    memoryLayout: 'stack' | 'heap' | 'data-segment' | 'text-segment' | 'registers';
    details: string[];
  };
  sampleCode: {
    code: string;
    lines: CodeLineExplanation[];
  };
  interactiveDemoType: 'pipeline' | 'memory-box' | 'condition-flow' | 'loop-trace' | 'array-lockers' | 'pointer-inspector' | 'struct-memory' | 'marks-project';
  keywordsCovered: string[];
  quiz: QuizQuestion[];
  tasks: InteractiveTask[];
}
