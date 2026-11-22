import { MasterCurriculumItem, MasteryTier } from './types';
import { TIER_1_LEVELS } from './tier1Levels';
import { TIER_2_LEVELS } from './tier2Levels';
import { TIER_3_LEVELS } from './tier3Levels';
import { TIER_4_LEVELS } from './tier4Levels';
import { TIER_5_LEVELS } from './tier5Levels';

export type { MasterCurriculumItem, MasteryTier };

// Complete 150-Level C Master Curriculum
// Tier 1: 1-30 (Variables, Data Types, Format I/O, Operators, Logic)
// Tier 2: 31-60 (If-Else, Switch, Nested Branches, Loops)
// Tier 3: 61-90 (1D & 2D Arrays, Strings, Functions, Stack Frames, Scope)
// Tier 4: 91-120 (Pointers, Dynamic Memory malloc/free, Structs, Unions, Bitfields, Function Pointers)
// Tier 5: 121-150 (Linked Lists, Stacks, Queues, Binary Trees, Sorting, Searching, Hash Tables, DAA)
export const MASTER_CURRICULUM_150: MasterCurriculumItem[] = [
  ...TIER_1_LEVELS,
  ...TIER_2_LEVELS,
  ...TIER_3_LEVELS,
  ...TIER_4_LEVELS,
  ...TIER_5_LEVELS
];
