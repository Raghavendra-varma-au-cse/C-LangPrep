export type MasteryTier = 
  | 'tier-1-foundation'      // 1-30: Variables, Data Types, Format I/O, Operators, Logic
  | 'tier-2-decisions'       // 31-60: If-Else, Switch, Nested Branches, Loops (for, while, do)
  | 'tier-3-structures'      // 61-90: 1D & 2D Arrays, Strings, Functions, Stack Frames, Scope
  | 'tier-4-lowlevel'        // 91-120: Pointers, Pointer Arithmetic, Dynamic Memory (malloc/free), Structs, Unions
  | 'tier-5-ds-daa';         // 121-150: Linked Lists, Stacks, Queues, Binary Trees, Sorting, Searching, Hash Tables, DAA

export interface MasterCurriculumItem {
  id: number;
  slug: string;
  tier: MasteryTier;
  tierLabel: string;
  title: string;
  category: string;
  themeIcon: string;
  
  // Real life intuition
  realLifeAnalogy: {
    story: string;
    physicalConcept: string;
    ruleOfThumb: string;
  };

  // Multiple ways of coding this problem
  codingApproaches: {
    beginnerFriendly: {
      name: string;
      description: string;
      code: string;
    };
    optimizedPro: {
      name: string;
      description: string;
      code: string;
    };
  };

  // Under-the-hood silicon & memory view
  hardwareDissection: {
    memorySegment: 'stack' | 'heap' | 'data' | 'rodata' | 'text';
    cpuRegisters: string[];
    assemblyNotes: string;
    ramFootprint: string;
  };

  // Code puzzle (shuffled blocks to solve)
  puzzleBlocks: {
    pieces: { id: string; code: string; hint: string }[];
    correctOrder: string[];
  };

  // Standard interactive input & output
  expectedOutput: string;
  cKeywordsUsed: string[];
  daaComplexity?: {
    timeComplexity: string;
    spaceComplexity: string;
    algorithmClass: string;
  };
}
