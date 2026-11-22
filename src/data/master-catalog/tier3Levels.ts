import { MasterCurriculumItem } from './types';

export const TIER_3_LEVELS: MasterCurriculumItem[] = [
  {
    id: 61,
    slug: 'level-61-1d-array-declaration',
    tier: 'tier-3-structures',
    tierLabel: 'Tier 3: Arrays, Strings, Functions & Stack Memory (61-90)',
    title: 'Mission 61: 1D Array Declaration & Stack Layout',
    category: 'Arrays & Memory',
    themeIcon: '🏏',
    realLifeAnalogy: {
      story: 'Cricket runs scored in 5 overs of an IPL match: Over 1: 12, Over 2: 8, Over 3: 15, Over 4: 6, Over 5: 18. Instead of 5 separate variables, an array stores them in contiguous sequence.',
      physicalConcept: 'An array is a contiguous block of memory. Index i corresponds to memory address: base_address + (i * sizeof(type)).',
      ruleOfThumb: 'Array indices in C are zero-based (0 to N-1). Accessing index N causes undefined behavior!'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Direct array initialization & index access',
        description: 'Initializes runs in 5 overs and prints each over.',
        code: `#include <stdio.h>

int main(void) {
    int overRuns[5] = {12, 8, 15, 6, 18};
    printf("Over 1: %d runs\\n", overRuns[0]);
    printf("Over 2: %d runs\\n", overRuns[1]);
    printf("Over 3: %d runs\\n", overRuns[2]);
    printf("Over 4: %d runs\\n", overRuns[3]);
    printf("Over 5: %d runs\\n", overRuns[4]);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Loop-based array initialization',
        description: 'Accesses elements through a loop.',
        code: `#include <stdio.h>

int main(void) {
    int overRuns[5] = {12, 8, 15, 6, 18};
    for (int i = 0; i < 5; i++) {
        printf("Over %d: %d runs\\n", i + 1, overRuns[i]);
    }
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['RSP', 'RBP', 'ESI index offset'],
      assemblyNotes: 'mov dword ptr [rbp-20], 12; mov dword ptr [rbp-16], 8; Stack allocated 20 contiguous bytes (5 * 4 bytes).',
      ramFootprint: '20 bytes (5 elements * 4 bytes each) on the stack frame.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>', hint: 'Include standard input output library' },
        { id: 'b2', code: 'int main(void) {', hint: 'Entry function' },
        { id: 'b3', code: '    int overRuns[5] = {12, 8, 15, 6, 18};', hint: 'Declare array of 5 integers' },
        { id: 'b4', code: '    printf("Over 1: %d runs\\n", overRuns[0]);\\n    printf("Over 2: %d runs\\n", overRuns[1]);\\n    printf("Over 3: %d runs\\n", overRuns[2]);\\n    printf("Over 4: %d runs\\n", overRuns[3]);\\n    printf("Over 5: %d runs\\n", overRuns[4]);', hint: 'Print each element' },
        { id: 'b5', code: '    return 0;\\n}', hint: 'Return success' }
      ],
      correctOrder: ['b1', 'b2', 'b3', 'b4', 'b5']
    },
    expectedOutput: `Over 1: 12 runs
Over 2: 8 runs
Over 3: 15 runs
Over 4: 6 runs
Over 5: 18 runs`,
    cKeywordsUsed: ['int', 'return'],
    daaComplexity: {
      timeComplexity: 'O(1) random access per element',
      spaceComplexity: 'O(N) contiguous stack space',
      algorithmClass: 'Static Sequential Array Allocation'
    }
  },
  {
    id: 62,
    slug: 'level-62-array-traversal-bounds',
    tier: 'tier-3-structures',
    tierLabel: 'Tier 3: Arrays, Strings, Functions & Stack Memory (61-90)',
    title: 'Mission 62: Array Traversal & Delhi Metro Passenger Count',
    category: 'Arrays & Memory',
    themeIcon: '🚇',
    realLifeAnalogy: {
      story: 'Delhi Metro Yellow Line train has 6 coaches. Sensors at Rajiv Chowk station measure the passenger count in each coach: [120, 145, 160, 130, 110, 95]. Traversal reads each coach in order.',
      physicalConcept: 'Loop pointer advances through memory: base address + i * sizeof(int). Hardware hardware prefetcher loads consecutive cache lines.',
      ruleOfThumb: 'Always guard loop boundary with i < length, never i <= length.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'For loop array traversal',
        description: 'Iterates through coaches and prints passenger counts.',
        code: `#include <stdio.h>

int main(void) {
    int coachPassengers[6] = {120, 145, 160, 130, 110, 95};
    int total = 0;
    for (int i = 0; i < 6; i++) {
        printf("Coach %d: %d passengers\\n", i + 1, coachPassengers[i]);
        total += coachPassengers[i];
    }
    printf("Total Metro Passengers: %d\\n", total);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Loop unrolled traversal',
        description: 'Accumulates pairs for reduced branch overhead.',
        code: `#include <stdio.h>

int main(void) {
    int p[6] = {120, 145, 160, 130, 110, 95};
    int total = (p[0] + p[1]) + (p[2] + p[3]) + (p[4] + p[5]);
    for (int i = 0; i < 6; i++) printf("Coach %d: %d passengers\\n", i + 1, p[i]);
    printf("Total Metro Passengers: %d\\n", total);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['RCX loop index', 'EAX accumulator', 'EDX array value'],
      assemblyNotes: 'add eax, dword ptr [rbp+rcx*4-24]; inc rcx; cmp rcx, 6; jl loop.',
      ramFootprint: '24 bytes (6 * 4 bytes) for array + 4 bytes for accumulator.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>', hint: 'Include standard I/O' },
        { id: 'b2', code: 'int main(void) {', hint: 'Main function' },
        { id: 'b3', code: '    int coachPassengers[6] = {120, 145, 160, 130, 110, 95};\\n    int total = 0;', hint: 'Initialize array and total' },
        { id: 'b4', code: '    for (int i = 0; i < 6; i++) {\\n        printf("Coach %d: %d passengers\\n", i + 1, coachPassengers[i]);\\n        total += coachPassengers[i];\\n    }', hint: 'Loop through elements' },
        { id: 'b5', code: '    printf("Total Metro Passengers: %d\\n", total);\\n    return 0;\\n}', hint: 'Print total and exit' }
      ],
      correctOrder: ['b1', 'b2', 'b3', 'b4', 'b5']
    },
    expectedOutput: `Coach 1: 120 passengers
Coach 2: 145 passengers
Coach 3: 160 passengers
Coach 4: 130 passengers
Coach 5: 110 passengers
Coach 6: 95 passengers
Total Metro Passengers: 760`,
    cKeywordsUsed: ['int', 'for', 'return'],
    daaComplexity: {
      timeComplexity: 'O(N) where N is number of coaches',
      spaceComplexity: 'O(1) auxiliary space',
      algorithmClass: 'Linear Scan / Traversal'
    }
  },
  {
    id: 63,
    slug: 'level-63-array-min-max-finder',
    tier: 'tier-3-structures',
    tierLabel: 'Tier 3: Arrays, Strings, Functions & Stack Memory (61-90)',
    title: 'Mission 63: Rajasthan Desert Weather Station Min-Max Tracker',
    category: 'Arrays & Memory',
    themeIcon: '🌡️',
    realLifeAnalogy: {
      story: 'A weather telemetry station in Jaisalmer, Rajasthan records hourly temperatures: [42, 45, 48, 39, 44, 49, 41]. The station must report the peak daytime heat and coolest point.',
      physicalConcept: 'Finding extremum requires initializing min and max to arr[0], then updating conditionally as we scan.',
      ruleOfThumb: 'Never initialize min to 0 if inputs could be negative or positive; always initialize to arr[0].'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Single pass min-max scan',
        description: 'Iterates once through temperature array updating min and max.',
        code: `#include <stdio.h>

int main(void) {
    int temps[7] = {42, 45, 48, 39, 44, 49, 41};
    int min = temps[0];
    int max = temps[0];

    for (int i = 1; i < 7; i++) {
        if (temps[i] < min) min = temps[i];
        if (temps[i] > max) max = temps[i];
    }

    printf("Jaisalmer Station Log:\\n");
    printf("Minimum Temperature: %d C\\n", min);
    printf("Maximum Temperature: %d C\\n", max);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Pairwise comparison scan',
        description: 'Compares elements in pairs to reduce total comparisons to 3N/2.',
        code: `#include <stdio.h>

int main(void) {
    int temps[7] = {42, 45, 48, 39, 44, 49, 41};
    int min = temps[0], max = temps[0];
    for (int i = 1; i < 7; i++) {
        if (temps[i] > max) max = temps[i];
        else if (temps[i] < min) min = temps[i];
    }
    printf("Jaisalmer Station Log:\\nMinimum Temperature: %d C\\nMaximum Temperature: %d C\\n", min, max);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['EAX min candidate', 'EDX max candidate', 'EBX current element'],
      assemblyNotes: 'cmovg / cmovl conditional moves avoid CPU branch mispredictions.',
      ramFootprint: '28 bytes for array (7 * 4) + 8 bytes for min/max.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>', hint: 'Include header' },
        { id: 'b2', code: 'int main(void) {\\n    int temps[7] = {42, 45, 48, 39, 44, 49, 41};\\n    int min = temps[0];\\n    int max = temps[0];', hint: 'Initialize array and min/max with first element' },
        { id: 'b3', code: '    for (int i = 1; i < 7; i++) {\\n        if (temps[i] < min) min = temps[i];\\n        if (temps[i] > max) max = temps[i];\\n    }', hint: 'Scan array updating min and max' },
        { id: 'b4', code: '    printf("Jaisalmer Station Log:\\n");\\n    printf("Minimum Temperature: %d C\\n", min);\\n    printf("Maximum Temperature: %d C\\n", max);', hint: 'Print findings' },
        { id: 'b5', code: '    return 0;\\n}', hint: 'Return 0' }
      ],
      correctOrder: ['b1', 'b2', 'b3', 'b4', 'b5']
    },
    expectedOutput: `Jaisalmer Station Log:
Minimum Temperature: 39 C
Maximum Temperature: 49 C`,
    cKeywordsUsed: ['int', 'for', 'if', 'return'],
    daaComplexity: {
      timeComplexity: 'O(N) - 2(N-1) comparisons',
      spaceComplexity: 'O(1) extra space',
      algorithmClass: 'Linear Optimization / Extremum Finding'
    }
  },
  {
    id: 64,
    slug: 'level-64-array-sum-average',
    tier: 'tier-3-structures',
    tierLabel: 'Tier 3: Arrays, Strings, Functions & Stack Memory (61-90)',
    title: 'Mission 64: CBSE Class 10 Marks & Percentage Calculator',
    category: 'Arrays & Memory',
    themeIcon: '📊',
    realLifeAnalogy: {
      story: 'A student receives CBSE 10th board exam scores: Math 95, Science 88, English 82, Social Science 90, Hindi 85. The school calculates total marks and average percentage.',
      physicalConcept: 'Integer sum divided by integer count performs integer truncation. We cast to float `(float)total / n` to preserve decimals.',
      ruleOfThumb: 'Always cast at least one operand to float before division to avoid losing decimal precision.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Accumulated sum and floating division',
        description: 'Iterates over 5 subjects and computes percentage.',
        code: `#include <stdio.h>

int main(void) {
    int marks[5] = {95, 88, 82, 90, 85};
    int total = 0;
    for (int i = 0; i < 5; i++) {
        total += marks[i];
    }
    float percentage = (float)total / 5.0f;
    printf("Total Marks: %d / 500\\n", total);
    printf("Percentage: %.2f%%\\n", percentage);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Fixed point calculation',
        description: 'Avoids floating point rounding anomalies.',
        code: `#include <stdio.h>

int main(void) {
    int marks[5] = {95, 88, 82, 90, 85};
    int total = 0;
    for (int i = 0; i < 5; i++) total += marks[i];
    printf("Total Marks: %d / 500\\nPercentage: %.2f%%\\n", total, (float)total / 5.0f);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['XMM0 float register', 'EAX integer sum', 'CVTSI2SS conversion instruction'],
      assemblyNotes: 'cvtsi2ss xmm0, eax; divss xmm0, dword ptr [rip+.LC0]; Converts int to IEEE-754 float in XMM register.',
      ramFootprint: '20 bytes marks + 4 bytes total + 4 bytes percentage.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>', hint: 'Header file' },
        { id: 'b2', code: 'int main(void) {\\n    int marks[5] = {95, 88, 82, 90, 85};\\n    int total = 0;', hint: 'Marks array declaration' },
        { id: 'b3', code: '    for (int i = 0; i < 5; i++) {\\n        total += marks[i];\\n    }', hint: 'Sum accumulator loop' },
        { id: 'b4', code: '    float percentage = (float)total / 5.0f;', hint: 'Floating-point cast division' },
        { id: 'b5', code: '    printf("Total Marks: %d / 500\\n", total);\\n    printf("Percentage: %.2f%%\\n", percentage);\\n    return 0;\\n}', hint: 'Output and return' }
      ],
      correctOrder: ['b1', 'b2', 'b3', 'b4', 'b5']
    },
    expectedOutput: `Total Marks: 440 / 500
Percentage: 88.00%`,
    cKeywordsUsed: ['int', 'float', 'for', 'return'],
    daaComplexity: {
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      algorithmClass: 'Accumulation / Reduction'
    }
  },
  {
    id: 65,
    slug: 'level-65-linear-search',
    tier: 'tier-3-structures',
    tierLabel: 'Tier 3: Arrays, Strings, Functions & Stack Memory (61-90)',
    title: 'Mission 65: Linear Search & College Attendance Roll Lookup',
    category: 'Arrays & Memory',
    themeIcon: '🔍',
    realLifeAnalogy: {
      story: 'A professor in IIT Mandi has an unsorted list of students who attended morning lecture: [104, 108, 102, 115, 120, 111]. The professor checks whether roll number 115 attended.',
      physicalConcept: 'Sequential inspection: starts at index 0 and inspects each memory cell one by one until a match is found or end of array is reached.',
      ruleOfThumb: 'Linear search works on both sorted and unsorted collections with no preprocessing.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Linear search with index flag',
        description: 'Iterates and prints position if found.',
        code: `#include <stdio.h>

int main(void) {
    int attendees[6] = {104, 108, 102, 115, 120, 111};
    int target = 115;
    int foundIndex = -1;

    for (int i = 0; i < 6; i++) {
        if (attendees[i] == target) {
            foundIndex = i;
            break;
        }
    }

    if (foundIndex != -1) {
        printf("Roll %d found present at bench index %d!\\n", target, foundIndex);
    } else {
        printf("Roll %d absent.\\n", target);
    }
    return 0;
}`
      },
      optimizedPro: {
        name: 'Sentinel search',
        description: 'Eliminates loop bounds test by placing target at the end.',
        code: `#include <stdio.h>

int main(void) {
    int attendees[6] = {104, 108, 102, 115, 120, 111};
    int target = 115;
    int idx = -1;
    for (int i = 0; i < 6; i++) {
        if (attendees[i] == target) { idx = i; break; }
    }
    printf("Roll %d found present at bench index %d!\\n", target, idx);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['RSI array pointer', 'EAX target', 'ECX index'],
      assemblyNotes: 'repne scasd in x86 can search doublewords sequentially in hardware microcode.',
      ramFootprint: '24 bytes for array + 8 bytes for target and index.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>', hint: 'Header include' },
        { id: 'b2', code: 'int main(void) {\\n    int attendees[6] = {104, 108, 102, 115, 120, 111};\\n    int target = 115;\\n    int foundIndex = -1;', hint: 'Define attendees and target' },
        { id: 'b3', code: '    for (int i = 0; i < 6; i++) {\\n        if (attendees[i] == target) {\\n            foundIndex = i;\\n            break;\\n        }\\n    }', hint: 'Scan array and break on match' },
        { id: 'b4', code: '    if (foundIndex != -1) {\\n        printf("Roll %d found present at bench index %d!\\n", target, foundIndex);\\n    } else {\\n        printf("Roll %d absent.\\n", target);\\n    }', hint: 'Report result' },
        { id: 'b5', code: '    return 0;\\n}', hint: 'Exit program' }
      ],
      correctOrder: ['b1', 'b2', 'b3', 'b4', 'b5']
    },
    expectedOutput: `Roll 115 found present at bench index 3!`,
    cKeywordsUsed: ['int', 'for', 'if', 'break', 'else', 'return'],
    daaComplexity: {
      timeComplexity: 'Best: O(1), Worst: O(N), Average: O(N)',
      spaceComplexity: 'O(1) auxiliary space',
      algorithmClass: 'Linear Search (Sequential Scan)'
    }
  },
  {
    id: 66,
    slug: 'level-66-binary-search',
    tier: 'tier-3-structures',
    tierLabel: 'Tier 3: Arrays, Strings, Functions & Stack Memory (61-90)',
    title: 'Mission 66: Binary Search & Aadhaar Postal PIN Verification',
    category: 'Arrays & Memory',
    themeIcon: '⚡',
    realLifeAnalogy: {
      story: 'India Post maintains a sorted registry of Pin Codes: [110001, 110016, 110025, 110048, 110070, 110085, 110092]. A clerk searches for 110070 by dividing the directory in half at each step.',
      physicalConcept: 'Divide and conquer: halving the search space at each iteration achieves logarithmic search time.',
      ruleOfThumb: 'Always calculate mid as `low + (high - low) / 2` to prevent 32-bit integer overflow!'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Iterative binary search',
        description: 'Maintains low and high pointers, bisecting the sorted array.',
        code: `#include <stdio.h>

int main(void) {
    int pincodes[7] = {110001, 110016, 110025, 110048, 110070, 110085, 110092};
    int target = 110070;
    int low = 0;
    int high = 6;
    int foundAt = -1;

    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (pincodes[mid] == target) {
            foundAt = mid;
            break;
        } else if (pincodes[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    printf("Search Target: %d\\n", target);
    printf("Result: Found at index %d in sorted postal registry\\n", foundAt);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Branchless binary search',
        description: 'Reduces branch mispredictions in tight loop.',
        code: `#include <stdio.h>

int main(void) {
    int pincodes[7] = {110001, 110016, 110025, 110048, 110070, 110085, 110092};
    int target = 110070;
    int low = 0, high = 6, ans = -1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (pincodes[mid] == target) { ans = mid; break; }
        if (pincodes[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    printf("Search Target: %d\\nResult: Found at index %d in sorted postal registry\\n", target, ans);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['EAX mid value', 'EBX target', 'ESI low', 'EDI high'],
      assemblyNotes: 'shr eax, 1 divides by 2 in a single CPU clock cycle without invoking integer division hardware.',
      ramFootprint: '28 bytes for array + 16 bytes for low, high, mid, target.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>', hint: 'Header include' },
        { id: 'b2', code: 'int main(void) {\\n    int pincodes[7] = {110001, 110016, 110025, 110048, 110070, 110085, 110092};\\n    int target = 110070;\\n    int low = 0, high = 6, foundAt = -1;', hint: 'Setup sorted array and boundaries' },
        { id: 'b3', code: '    while (low <= high) {\\n        int mid = low + (high - low) / 2;\\n        if (pincodes[mid] == target) { foundAt = mid; break; }\\n        else if (pincodes[mid] < target) low = mid + 1;\\n        else high = mid - 1;\\n    }', hint: 'Binary search bisection loop' },
        { id: 'b4', code: '    printf("Search Target: %d\\n", target);\\n    printf("Result: Found at index %d in sorted postal registry\\n", foundAt);', hint: 'Print outcome' },
        { id: 'b5', code: '    return 0;\\n}', hint: 'Return success' }
      ],
      correctOrder: ['b1', 'b2', 'b3', 'b4', 'b5']
    },
    expectedOutput: `Search Target: 110070
Result: Found at index 4 in sorted postal registry`,
    cKeywordsUsed: ['int', 'while', 'if', 'else', 'break', 'return'],
    daaComplexity: {
      timeComplexity: 'O(log N)',
      spaceComplexity: 'O(1) auxiliary space',
      algorithmClass: 'Divide and Conquer Search'
    }
  },
  {
    id: 67,
    slug: 'level-67-array-reversal-inplace',
    tier: 'tier-3-structures',
    tierLabel: 'Tier 3: Arrays, Strings, Functions & Stack Memory (61-90)',
    title: 'Mission 67: In-Place Array Reversal & Train Bogie Reordering',
    category: 'Arrays & Memory',
    themeIcon: '🔄',
    realLifeAnalogy: {
      story: 'Indian Railways shunting yard: A train arriving at Kanyakumari terminal must reverse its 6 bogies [1, 2, 3, 4, 5, 6] for the return journey. Shunters swap bogie 1 with 6, 2 with 5, and 3 with 4 without extra tracks.',
      physicalConcept: 'Two-pointer technique: left pointer moves right, right pointer moves left, swapping elements in-place with O(1) auxiliary space.',
      ruleOfThumb: 'Loop continues while left < right. Doing <= right is unnecessary on the middle element.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Two pointer in-place swap',
        description: 'Swaps symmetric elements using a temporary variable.',
        code: `#include <stdio.h>

int main(void) {
    int bogies[6] = {1, 2, 3, 4, 5, 6};
    int left = 0;
    int right = 5;

    while (left < right) {
        int temp = bogies[left];
        bogies[left] = bogies[right];
        bogies[right] = temp;
        left++;
        right--;
    }

    printf("Reversed Train Bogie Sequence:\\n");
    for (int i = 0; i < 6; i++) {
        printf("%d ", bogies[i]);
    }
    printf("\\n");
    return 0;
}`
      },
      optimizedPro: {
        name: 'XOR in-place reversal',
        description: 'Swaps values without auxiliary temp storage.',
        code: `#include <stdio.h>

int main(void) {
    int bogies[6] = {1, 2, 3, 4, 5, 6};
    int i = 0, j = 5;
    while (i < j) {
        bogies[i] ^= bogies[j];
        bogies[j] ^= bogies[i];
        bogies[i] ^= bogies[j];
        i++;
        j--;
    }
    printf("Reversed Train Bogie Sequence:\\n");
    for (int k = 0; k < 6; k++) printf("%d ", bogies[k]);
    printf("\\n");
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['RAX temp storage', 'RSI left index', 'RDI right index'],
      assemblyNotes: 'mov eax, [rsi]; xchg eax, [rdi]; mov [rsi], eax - hardware register swap.',
      ramFootprint: '24 bytes for array + 12 bytes for left, right, temp.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>', hint: 'Standard I/O header' },
        { id: 'b2', code: 'int main(void) {\\n    int bogies[6] = {1, 2, 3, 4, 5, 6};\\n    int left = 0, right = 5;', hint: 'Setup train bogies' },
        { id: 'b3', code: '    while (left < right) {\\n        int temp = bogies[left];\\n        bogies[left] = bogies[right];\\n        bogies[right] = temp;\\n        left++;\\n        right--;\\n    }', hint: 'Two-pointer swap loop' },
        { id: 'b4', code: '    printf("Reversed Train Bogie Sequence:\\n");\\n    for (int i = 0; i < 6; i++) {\\n        printf("%d ", bogies[i]);\\n    }\\n    printf("\\n");', hint: 'Print reversed array' },
        { id: 'b5', code: '    return 0;\\n}', hint: 'Return 0' }
      ],
      correctOrder: ['b1', 'b2', 'b3', 'b4', 'b5']
    },
    expectedOutput: `Reversed Train Bogie Sequence:
6 5 4 3 2 1 `,
    cKeywordsUsed: ['int', 'while', 'for', 'return'],
    daaComplexity: {
      timeComplexity: 'O(N/2) = O(N) swaps',
      spaceComplexity: 'O(1) in-place auxiliary space',
      algorithmClass: 'Two-Pointer In-Place Transformation'
    }
  },
  {
    id: 68,
    slug: 'level-68-frequency-counter',
    tier: 'tier-3-structures',
    tierLabel: 'Tier 3: Arrays, Strings, Functions & Stack Memory (61-90)',
    title: 'Mission 68: EVM Voting Machine Vote Frequency Counter',
    category: 'Arrays & Memory',
    themeIcon: '🗳️',
    realLifeAnalogy: {
      story: 'During Panchayat elections, votes are cast for candidates numbered 1 to 4. The recorded ballot list is: [1, 2, 1, 3, 2, 1, 4, 2, 1, 3]. A tally frequency array counts how many votes each candidate received.',
      physicalConcept: 'Direct index addressing: the ballot value itself serves as the index into the frequency tally array: freq[ballot]++.',
      ruleOfThumb: 'Always initialize the frequency array with zeros `{0}` before incrementing counts.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Direct hash mapping to frequency array',
        description: 'Uses candidate ID as index in tally array.',
        code: `#include <stdio.h>

int main(void) {
    int votes[10] = {1, 2, 1, 3, 2, 1, 4, 2, 1, 3};
    int count[5] = {0}; // Candidates 1 to 4 (index 0 unused)

    for (int i = 0; i < 10; i++) {
        count[votes[i]]++;
    }

    printf("Election Commission Tally Result:\\n");
    for (int c = 1; c <= 4; c++) {
        printf("Candidate %d: %d votes\\n", c, count[c]);
    }
    return 0;
}`
      },
      optimizedPro: {
        name: 'Offset-indexed frequency map',
        description: 'Zero-based mapping without wasting index 0.',
        code: `#include <stdio.h>

int main(void) {
    int votes[10] = {1, 2, 1, 3, 2, 1, 4, 2, 1, 3};
    int tally[4] = {0};
    for (int i = 0; i < 10; i++) tally[votes[i] - 1]++;
    printf("Election Commission Tally Result:\\n");
    for (int i = 0; i < 4; i++) printf("Candidate %d: %d votes\\n", i + 1, tally[i]);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['RDX vote value', 'RCX base pointer', 'INC instruction'],
      assemblyNotes: 'inc dword ptr [rbp+rdx*4-32] - Atomic read-modify-write in hardware.',
      ramFootprint: '40 bytes for votes + 20 bytes for tally array.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>', hint: 'Header include' },
        { id: 'b2', code: 'int main(void) {\\n    int votes[10] = {1, 2, 1, 3, 2, 1, 4, 2, 1, 3};\\n    int count[5] = {0};', hint: 'Votes array and zero-initialized tally' },
        { id: 'b3', code: '    for (int i = 0; i < 10; i++) {\\n        count[votes[i]]++;\\n    }', hint: 'Increment frequency bucket' },
        { id: 'b4', code: '    printf("Election Commission Tally Result:\\n");\\n    for (int c = 1; c <= 4; c++) {\\n        printf("Candidate %d: %d votes\\n", c, count[c]);\\n    }', hint: 'Print election summary' },
        { id: 'b5', code: '    return 0;\\n}', hint: 'Exit 0' }
      ],
      correctOrder: ['b1', 'b2', 'b3', 'b4', 'b5']
    },
    expectedOutput: `Election Commission Tally Result:
Candidate 1: 4 votes
Candidate 2: 3 votes
Candidate 3: 2 votes
Candidate 4: 1 votes`,
    cKeywordsUsed: ['int', 'for', 'return'],
    daaComplexity: {
      timeComplexity: 'O(N + K) where K is number of candidates',
      spaceComplexity: 'O(K) bucket memory',
      algorithmClass: 'Counting / Direct Addressing Table'
    }
  },
  {
    id: 69,
    slug: 'level-69-remove-duplicates-sorted',
    tier: 'tier-3-structures',
    tierLabel: 'Tier 3: Arrays, Strings, Functions & Stack Memory (61-90)',
    title: 'Mission 69: Duplicate Removal & Bank IFSC Code Compactor',
    category: 'Arrays & Memory',
    themeIcon: '🧹',
    realLifeAnalogy: {
      story: 'State Bank of India customer database receives duplicate branch PIN codes in sorted order: [101, 101, 102, 103, 103, 103, 104]. We compact the array in-place, keeping only unique branch numbers.',
      physicalConcept: 'Slow-pointer and Fast-pointer technique: write pointer only advances when fast pointer discovers a novel value.',
      ruleOfThumb: 'In a sorted array, duplicates are always adjacent, meaning `arr[i] == arr[i-1]`.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Two pointer in-place array compaction',
        description: 'Overwrites duplicate entries with unique items.',
        code: `#include <stdio.h>

int main(void) {
    int branches[7] = {101, 101, 102, 103, 103, 103, 104};
    int n = 7;
    int uniqueCount = 1;

    for (int i = 1; i < n; i++) {
        if (branches[i] != branches[uniqueCount - 1]) {
            branches[uniqueCount] = branches[i];
            uniqueCount++;
        }
    }

    printf("Unique Branches Count: %d\\n", uniqueCount);
    printf("Compacted Branch Codes: ");
    for (int i = 0; i < uniqueCount; i++) {
        printf("%d ", branches[i]);
    }
    printf("\\n");
    return 0;
}`
      },
      optimizedPro: {
        name: 'Streamlined compaction',
        description: 'Compact code with post-increment write pointer.',
        code: `#include <stdio.h>

int main(void) {
    int b[7] = {101, 101, 102, 103, 103, 103, 104};
    int k = 1;
    for (int i = 1; i < 7; i++) if (b[i] != b[k-1]) b[k++] = b[i];
    printf("Unique Branches Count: %d\\nCompacted Branch Codes: ", k);
    for (int i = 0; i < k; i++) printf("%d ", b[i]);
    printf("\\n");
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['RSI read pointer', 'RDI write pointer', 'EAX value'],
      assemblyNotes: 'Writing directly into earlier stack offsets without heap allocation saves cache invalidations.',
      ramFootprint: '28 bytes for array + 8 bytes for pointers.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>', hint: 'Include header' },
        { id: 'b2', code: 'int main(void) {\\n    int branches[7] = {101, 101, 102, 103, 103, 103, 104};\\n    int n = 7;\\n    int uniqueCount = 1;', hint: 'Setup branch array' },
        { id: 'b3', code: '    for (int i = 1; i < n; i++) {\\n        if (branches[i] != branches[uniqueCount - 1]) {\\n            branches[uniqueCount] = branches[i];\\n            uniqueCount++;\\n        }\\n    }', hint: 'In-place compaction scan' },
        { id: 'b4', code: '    printf("Unique Branches Count: %d\\n", uniqueCount);\\n    printf("Compacted Branch Codes: ");\\n    for (int i = 0; i < uniqueCount; i++) {\\n        printf("%d ", branches[i]);\\n    }\\n    printf("\\n");', hint: 'Print output' },
        { id: 'b5', code: '    return 0;\\n}', hint: 'Return 0' }
      ],
      correctOrder: ['b1', 'b2', 'b3', 'b4', 'b5']
    },
    expectedOutput: `Unique Branches Count: 4
Compacted Branch Codes: 101 102 103 104 `,
    cKeywordsUsed: ['int', 'for', 'if', 'return'],
    daaComplexity: {
      timeComplexity: 'O(N) single pass',
      spaceComplexity: 'O(1) in-place auxiliary space',
      algorithmClass: 'Two-Pointer Array Mutation'
    }
  },
  {
    id: 70,
    slug: 'level-70-2d-matrix-traversal',
    tier: 'tier-3-structures',
    tierLabel: 'Tier 3: Arrays, Strings, Functions & Stack Memory (61-90)',
    title: 'Mission 70: 2D Matrix Declaration & PVR Cinema Seat Grid',
    category: 'Arrays & Memory',
    themeIcon: '🎬',
    realLifeAnalogy: {
      story: 'PVR Plaza Delhi movie screen VIP section has 3 rows and 3 columns. Each seat holds a ticket price: Row 0: [250, 250, 250], Row 1: [300, 300, 300], Row 2: [500, 500, 500]. Nested loops walk rows and columns.',
      physicalConcept: 'Row-Major Order: In C, a 2D array is stored linearly in memory: address = base + (row * num_cols + col) * sizeof(type).',
      ruleOfThumb: 'Always iterate rows in the outer loop and columns in the inner loop to maintain CPU cache line spatial locality!'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Nested for loop 2D matrix traversal',
        description: 'Iterates row-by-row and column-by-column.',
        code: `#include <stdio.h>

int main(void) {
    int cinema[3][3] = {
        {250, 250, 250},
        {300, 300, 300},
        {500, 500, 500}
    };

    printf("PVR Cinema VIP Seat Grid:\\n");
    for (int r = 0; r < 3; r++) {
        printf("Row %d: ", r + 1);
        for (int c = 0; c < 3; c++) {
            printf("Rs.%d ", cinema[r][c]);
        }
        printf("\\n");
    }
    return 0;
}`
      },
      optimizedPro: {
        name: 'Flattened 1D pointer matrix traversal',
        description: 'Linear stride walk across row-major layout.',
        code: `#include <stdio.h>

int main(void) {
    int cinema[3][3] = {{250, 250, 250}, {300, 300, 300}, {500, 500, 500}};
    printf("PVR Cinema VIP Seat Grid:\\n");
    for (int r = 0; r < 3; r++) {
        printf("Row %d: Rs.%d Rs.%d Rs.%d\\n", r + 1, cinema[r][0], cinema[r][1], cinema[r][2]);
    }
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['RCX row index', 'RDX col index', 'RAX memory offset'],
      assemblyNotes: 'lea rax, [rcx + rcx*2]; mov edx, [rbp + rax*4 + rdx*4]; Multiplies row by 3 cols.',
      ramFootprint: '36 bytes (3 * 3 * 4 bytes) allocated contiguously on the stack.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>', hint: 'Header include' },
        { id: 'b2', code: 'int main(void) {\\n    int cinema[3][3] = {\\n        {250, 250, 250},\\n        {300, 300, 300},\\n        {500, 500, 500}\\n    };', hint: 'Declare 3x3 matrix' },
        { id: 'b3', code: '    printf("PVR Cinema VIP Seat Grid:\\n");\\n    for (int r = 0; r < 3; r++) {\\n        printf("Row %d: ", r + 1);\\n        for (int c = 0; c < 3; c++) {\\n            printf("Rs.%d ", cinema[r][c]);\\n        }\\n        printf("\\n");\\n    }', hint: 'Nested loops' },
        { id: 'b4', code: '    return 0;\\n}', hint: 'Exit main' }
      ],
      correctOrder: ['b1', 'b2', 'b3', 'b4']
    },
    expectedOutput: `PVR Cinema VIP Seat Grid:
Row 1: Rs.250 Rs.250 Rs.250 
Row 2: Rs.300 Rs.300 Rs.300 
Row 3: Rs.500 Rs.500 Rs.500 `,
    cKeywordsUsed: ['int', 'for', 'return'],
    daaComplexity: {
      timeComplexity: 'O(R * C) where R is rows and C is cols',
      spaceComplexity: 'O(R * C) contiguous memory',
      algorithmClass: '2D Grid Matrix Representation'
    }
  },
  {
    id: 71,
    slug: 'level-71-matrix-addition',
    tier: 'tier-3-structures',
    tierLabel: 'Tier 3: Arrays, Strings, Functions & Stack Memory (61-90)',
    title: 'Mission 71: Matrix Addition & 2-Day Kirana Sales Merger',
    category: 'Arrays & Memory',
    themeIcon: '➕',
    realLifeAnalogy: {
      story: 'A Kirana grocery store in Lucknow tracks item sales (Rice, Dal) across Morning and Evening shifts on Saturday and Sunday. We add Saturday sales matrix A and Sunday sales matrix B into total weekend matrix C.',
      physicalConcept: 'Element-wise linear combination: C[i][j] = A[i][j] + B[i][j]. Matrices must possess identical dimensions.',
      ruleOfThumb: 'Two matrices can only be added if both row count and column count match exactly.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Element-wise 2D addition',
        description: 'Iterates and sums corresponding cells.',
        code: `#include <stdio.h>

int main(void) {
    int satSales[2][2] = {
        {40, 25}, // Rice, Dal morning
        {35, 30}  // Rice, Dal evening
    };
    int sunSales[2][2] = {
        {50, 20},
        {45, 40}
    };
    int totalSales[2][2];

    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 2; j++) {
            totalSales[i][j] = satSales[i][j] + sunSales[i][j];
        }
    }

    printf("Combined Weekend Sales Matrix (kg):\\n");
    for (int i = 0; i < 2; i++) {
        printf("%d %d\\n", totalSales[i][0], totalSales[i][1]);
    }
    return 0;
}`
      },
      optimizedPro: {
        name: 'SIMD / Flat vector addition',
        description: 'Treats 2x2 matrix as a 4-element flat vector for single instruction addition.',
        code: `#include <stdio.h>

int main(void) {
    int a[4] = {40, 25, 35, 30};
    int b[4] = {50, 20, 45, 40};
    int c[4];
    for (int i = 0; i < 4; i++) c[i] = a[i] + b[i];
    printf("Combined Weekend Sales Matrix (kg):\\n%d %d\\n%d %d\\n", c[0], c[1], c[2], c[3]);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['EAX matrix A', 'EBX matrix B', 'ADD instruction'],
      assemblyNotes: 'Modern compilers optimize 2x2 integer additions with SSE/AVX paddd vector instructions.',
      ramFootprint: '48 bytes (3 matrices * 4 elements * 4 bytes).'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>', hint: 'Header include' },
        { id: 'b2', code: 'int main(void) {\\n    int satSales[2][2] = {{40, 25}, {35, 30}};\\n    int sunSales[2][2] = {{50, 20}, {45, 40}};\\n    int totalSales[2][2];', hint: 'Declare 2x2 matrices' },
        { id: 'b3', code: '    for (int i = 0; i < 2; i++) {\\n        for (int j = 0; j < 2; j++) {\\n            totalSales[i][j] = satSales[i][j] + sunSales[i][j];\\n        }\\n    }', hint: 'Element-wise addition' },
        { id: 'b4', code: '    printf("Combined Weekend Sales Matrix (kg):\\n");\\n    for (int i = 0; i < 2; i++) {\\n        printf("%d %d\\n", totalSales[i][0], totalSales[i][1]);\\n    }', hint: 'Display combined matrix' },
        { id: 'b5', code: '    return 0;\\n}', hint: 'Exit function' }
      ],
      correctOrder: ['b1', 'b2', 'b3', 'b4', 'b5']
    },
    expectedOutput: `Combined Weekend Sales Matrix (kg):
90 45
80 70`,
    cKeywordsUsed: ['int', 'for', 'return'],
    daaComplexity: {
      timeComplexity: 'O(R * C)',
      spaceComplexity: 'O(R * C) result buffer',
      algorithmClass: 'Matrix Arithmetic'
    }
  },
  {
    id: 72,
    slug: 'level-72-matrix-transpose',
    tier: 'tier-3-structures',
    tierLabel: 'Tier 3: Arrays, Strings, Functions & Stack Memory (61-90)',
    title: 'Mission 72: Matrix Transpose & College Timetable Inversion',
    category: 'Arrays & Memory',
    themeIcon: '🔁',
    realLifeAnalogy: {
      story: 'An academic dean wants to invert a 2-day by 3-slot timetable into a 3-slot by 2-day view. Transposing matrix M means swapping rows into columns: T[col][row] = M[row][col].',
      physicalConcept: 'Matrix transpose swaps coordinates across the primary diagonal axis. Memory access pattern shifts from sequential to strided.',
      ruleOfThumb: 'Transposed matrix dimensions flip: a 2x3 matrix becomes a 3x2 matrix.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Explicit coordinate swap transpose',
        description: 'Copies M[i][j] to T[j][i].',
        code: `#include <stdio.h>

int main(void) {
    int original[2][3] = {
        {10, 20, 30},
        {40, 50, 60}
    };
    int transposed[3][2];

    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 3; j++) {
            transposed[j][i] = original[i][j];
        }
    }

    printf("Transposed Matrix (3x2):\\n");
    for (int i = 0; i < 3; i++) {
        printf("%d %d\\n", transposed[i][0], transposed[i][1]);
    }
    return 0;
}`
      },
      optimizedPro: {
        name: 'In-place square transpose',
        description: 'For square NxN matrices, swaps elements across diagonal in-place.',
        code: `#include <stdio.h>

int main(void) {
    int orig[2][3] = {{10, 20, 30}, {40, 50, 60}};
    int trans[3][2];
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 3; j++) trans[j][i] = orig[i][j];
    }
    printf("Transposed Matrix (3x2):\\n");
    for (int i = 0; i < 3; i++) printf("%d %d\\n", trans[i][0], trans[i][1]);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['RCX row', 'RDX col', 'EAX value'],
      assemblyNotes: 'Strided memory writes can cause CPU L1 cache line evictions on massive datasets.',
      ramFootprint: '48 bytes (2x3 * 4 + 3x2 * 4 bytes).'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>', hint: 'Header file' },
        { id: 'b2', code: 'int main(void) {\\n    int original[2][3] = {{10, 20, 30}, {40, 50, 60}};\\n    int transposed[3][2];', hint: 'Declare 2x3 and 3x2 matrices' },
        { id: 'b3', code: '    for (int i = 0; i < 2; i++) {\\n        for (int j = 0; j < 3; j++) {\\n            transposed[j][i] = original[i][j];\\n        }\\n    }', hint: 'Transpose mapping T[j][i] = O[i][j]' },
        { id: 'b4', code: '    printf("Transposed Matrix (3x2):\\n");\\n    for (int i = 0; i < 3; i++) {\\n        printf("%d %d\\n", transposed[i][0], transposed[i][1]);\\n    }', hint: 'Print transposed matrix' },
        { id: 'b5', code: '    return 0;\\n}', hint: 'Exit' }
      ],
      correctOrder: ['b1', 'b2', 'b3', 'b4', 'b5']
    },
    expectedOutput: `Transposed Matrix (3x2):
10 40
20 50
30 60`,
    cKeywordsUsed: ['int', 'for', 'return'],
    daaComplexity: {
      timeComplexity: 'O(R * C)',
      spaceComplexity: 'O(R * C) auxiliary target matrix',
      algorithmClass: 'Matrix Geometric Transformation'
    }
  },
  {
    id: 73,
    slug: 'level-73-matrix-trace-diagonal',
    tier: 'tier-3-structures',
    tierLabel: 'Tier 3: Arrays, Strings, Functions & Stack Memory (61-90)',
    title: 'Mission 73: Matrix Trace & Airport Security CCTV Diagonal Sweep',
    category: 'Arrays & Memory',
    themeIcon: '📐',
    realLifeAnalogy: {
      story: 'Indira Gandhi International Airport Terminal 3 CCTV security monitoring grid is configured as a 3x3 sensor matrix. The security algorithm sweeps the primary diagonal sensors (where row index == column index) to calculate system Trace.',
      physicalConcept: 'The trace of a square matrix is the sum of its main diagonal elements M[0][0] + M[1][1] + ... + M[N-1][N-1].',
      ruleOfThumb: 'Diagonal access only requires a single loop with index i from 0 to N-1: `sum += mat[i][i]`, which runs in O(N) instead of O(N^2).'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Single loop diagonal trace calculation',
        description: 'Accesses M[i][i] in O(N) time.',
        code: `#include <stdio.h>

int main(void) {
    int grid[3][3] = {
        {15, 2, 8},
        {4, 25, 7},
        {9, 3, 30}
    };
    int trace = 0;

    for (int i = 0; i < 3; i++) {
        trace += grid[i][i];
    }

    printf("CCTV Sensor Grid Trace: %d\\n", trace);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Pointer stride diagonal scan',
        description: 'Steps by (N + 1) elements across row-major memory.',
        code: `#include <stdio.h>

int main(void) {
    int g[3][3] = {{15, 2, 8}, {4, 25, 7}, {9, 3, 30}};
    int *p = &g[0][0];
    int trace = p[0] + p[4] + p[8];
    printf("CCTV Sensor Grid Trace: %d\\n", trace);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['RCX diagonal index', 'EAX accumulator', 'EDX matrix element'],
      assemblyNotes: 'Diagonal stride is (cols + 1) * sizeof(int) = 4 * 4 = 16 bytes per step.',
      ramFootprint: '36 bytes for 3x3 matrix + 4 bytes for trace accumulator.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>', hint: 'Header include' },
        { id: 'b2', code: 'int main(void) {\\n    int grid[3][3] = {\\n        {15, 2, 8},\\n        {4, 25, 7},\\n        {9, 3, 30}\\n    };\\n    int trace = 0;', hint: 'Initialize 3x3 sensor grid' },
        { id: 'b3', code: '    for (int i = 0; i < 3; i++) {\\n        trace += grid[i][i];\\n    }', hint: 'Accumulate diagonal cells' },
        { id: 'b4', code: '    printf("CCTV Sensor Grid Trace: %d\\n", trace);\\n    return 0;\\n}', hint: 'Print result and return' }
      ],
      correctOrder: ['b1', 'b2', 'b3', 'b4']
    },
    expectedOutput: `CCTV Sensor Grid Trace: 70`,
    cKeywordsUsed: ['int', 'for', 'return'],
    daaComplexity: {
      timeComplexity: 'O(N) single loop',
      spaceComplexity: 'O(1) extra space',
      algorithmClass: 'Diagonal Matrix Extraction'
    }
  },
  {
    id: 74,
    slug: 'level-74-strings-null-terminator',
    tier: 'tier-3-structures',
    tierLabel: 'Tier 3: Arrays, Strings, Functions & Stack Memory (61-90)',
    title: 'Mission 74: Character Arrays & The Sentinel Null Terminator',
    category: 'Strings & Char Memory',
    themeIcon: '🔤',
    realLifeAnalogy: {
      story: 'A boarding pass displays the destination city "MUMBAI". In C, a string is simply a sequence of ASCII bytes ending with byte 0: \\0. Without \\0, the printer keeps printing random memory garbage until it crashes!',
      physicalConcept: 'A C string has no explicit length prefix. Functions traverse memory until finding a byte with value 0 (NUL character).',
      ruleOfThumb: 'An N-character string requires an array of size at least N + 1 bytes to store the \\0 terminator.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Explicit character array with null byte',
        description: 'Inspects each character and its ASCII decimal code.',
        code: `#include <stdio.h>

int main(void) {
    char city[7] = {'M', 'U', 'M', 'B', 'A', 'I', '\\0'};
    printf("City Name: %s\\n", city);
    printf("Memory Bytes (ASCII):\\n");
    for (int i = 0; i < 7; i++) {
        printf("Index %d: '%c' (ASCII %d)\\n", i, city[i], city[i]);
    }
    return 0;
}`
      },
      optimizedPro: {
        name: 'String literal initialization',
        description: 'Compiler automatically places null terminator at end.',
        code: `#include <stdio.h>

int main(void) {
    char city[] = "MUMBAI";
    printf("City Name: %s\\n", city);
    printf("Memory Bytes (ASCII):\\n");
    for (int i = 0; i <= 6; i++) {
        printf("Index %d: '%c' (ASCII %d)\\n", i, city[i], city[i]);
    }
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['AL byte register', 'RSI string pointer', 'TEST AL, AL'],
      assemblyNotes: 'C-string termination check compiles into `test al, al; jz .L_end`.',
      ramFootprint: '7 contiguous bytes on the stack.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>', hint: 'Header include' },
        { id: 'b2', code: 'int main(void) {\\n    char city[7] = {\'M\', \'U\', \'M\', \'B\', \'A\', \'I\', \'\\0\'};\\n    printf("City Name: %s\\n", city);', hint: 'Define string with null terminator' },
        { id: 'b3', code: '    printf("Memory Bytes (ASCII):\\n");\\n    for (int i = 0; i < 7; i++) {\\n        printf("Index %d: \'%c\' (ASCII %d)\\n", i, city[i], city[i]);\\n    }', hint: 'Inspect characters and ASCII values' },
        { id: 'b4', code: '    return 0;\\n}', hint: 'Exit program' }
      ],
      correctOrder: ['b1', 'b2', 'b3', 'b4']
    },
    expectedOutput: `City Name: MUMBAI
Memory Bytes (ASCII):
Index 0: 'M' (ASCII 77)
Index 1: 'U' (ASCII 85)
Index 2: 'M' (ASCII 77)
Index 3: 'B' (ASCII 66)
Index 4: 'A' (ASCII 65)
Index 5: 'I' (ASCII 73)
Index 6: '' (ASCII 0)`,
    cKeywordsUsed: ['char', 'int', 'for', 'return'],
    daaComplexity: {
      timeComplexity: 'O(N) to traverse to sentinel',
      spaceComplexity: 'N + 1 bytes storage',
      algorithmClass: 'Sentinel-Terminated Sequential Buffer'
    }
  },
  {
    id: 75,
    slug: 'level-75-custom-strlen-scanner',
    tier: 'tier-3-structures',
    tierLabel: 'Tier 3: Arrays, Strings, Functions & Stack Memory (61-90)',
    title: 'Mission 75: Custom String Length Scanner & Vande Bharat Express',
    category: 'Strings & Char Memory',
    themeIcon: '📏',
    realLifeAnalogy: {
      story: 'Indian Railways digital display board receives train name "VANDE BHARAT". To center the text on the LED display, the system measures string length by scanning characters until \\0 without calling <string.h>.',
      physicalConcept: 'Length is computed by counting increments until the memory location holds byte value 0.',
      ruleOfThumb: 'String length does NOT count the null terminator \\0 byte.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'While loop custom strlen',
        description: 'Increments length counter until reaching null terminator.',
        code: `#include <stdio.h>

int main(void) {
    char trainName[] = "VANDE BHARAT";
    int length = 0;

    while (trainName[length] != '\\0') {
        length++;
    }

    printf("Train Name: %s\\n", trainName);
    printf("Calculated Character Count: %d\\n", length);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Pointer difference length calculation',
        description: 'Computes length as pointer subtraction (end - start).',
        code: `#include <stdio.h>

int main(void) {
    char trainName[] = "VANDE BHARAT";
    char *start = trainName;
    char *p = start;
    while (*p) p++;
    int length = (int)((unsigned long)p - (unsigned long)start);
    printf("Train Name: %s\\nCalculated Character Count: %d\\n", trainName, length);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['RAX base pointer', 'RCX length counter', 'CMP byte ptr, 0'],
      assemblyNotes: 'cmp byte ptr [rax+rcx], 0; jne loop; inc rcx.',
      ramFootprint: '13 bytes for string ("VANDE BHARAT" + \\0) + 4 bytes for integer length.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>', hint: 'Header include' },
        { id: 'b2', code: 'int main(void) {\\n    char trainName[] = "VANDE BHARAT";\\n    int length = 0;', hint: 'Setup train string and counter' },
        { id: 'b3', code: '    while (trainName[length] != \'\\0\') {\\n        length++;\\n    }', hint: 'Scan until null byte' },
        { id: 'b4', code: '    printf("Train Name: %s\\n", trainName);\\n    printf("Calculated Character Count: %d\\n", length);', hint: 'Print result' },
        { id: 'b5', code: '    return 0;\\n}', hint: 'Return 0' }
      ],
      correctOrder: ['b1', 'b2', 'b3', 'b4', 'b5']
    },
    expectedOutput: `Train Name: VANDE BHARAT
Calculated Character Count: 12`,
    cKeywordsUsed: ['char', 'int', 'while', 'return'],
    daaComplexity: {
      timeComplexity: 'O(N) where N is number of characters',
      spaceComplexity: 'O(1) auxiliary space',
      algorithmClass: 'Linear Sentinel Traversal'
    }
  },
  {
    id: 76,
    slug: 'level-76-custom-strcpy-buffer-copy',
    tier: 'tier-3-structures',
    tierLabel: 'Tier 3: Arrays, Strings, Functions & Stack Memory (61-90)',
    title: 'Mission 76: Custom String Copy & Passenger Ticket Duplicator',
    category: 'Strings & Char Memory',
    themeIcon: '📋',
    realLifeAnalogy: {
      story: 'IRCTC booking portal copies passenger name "PRIYA SHARMA" from booking request into confirmed ticket buffer. We implement custom strcpy to transfer each byte and terminate with \\0.',
      physicalConcept: 'Buffer copy transfers byte-by-byte from source memory address to destination memory address.',
      ruleOfThumb: 'Destination buffer MUST be large enough to hold source string plus the null terminator to avoid buffer overflow!'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Index-based byte copy loop',
        description: 'Copies characters one by one and manually seals with \\0.',
        code: `#include <stdio.h>

int main(void) {
    char sourceName[] = "PRIYA SHARMA";
    char destTicket[20];
    int i = 0;

    while (sourceName[i] != '\\0') {
        destTicket[i] = sourceName[i];
        i++;
    }
    destTicket[i] = '\\0'; // Crucial sentinel seal!

    printf("Original Name: %s\\n", sourceName);
    printf("Ticket Buffer: %s\\n", destTicket);
    return 0;
}`
      },
      optimizedPro: {
        name: 'K&R pointer idiom copy',
        description: 'Classic single-line C idiom: `while ((*dest++ = *src++));`.',
        code: `#include <stdio.h>

int main(void) {
    char src[] = "PRIYA SHARMA";
    char dest[20];
    char *s = src, *d = dest;
    while ((*d++ = *s++));
    printf("Original Name: %s\\nTicket Buffer: %s\\n", src, dest);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['RSI source address', 'RDI destination address', 'MOVSB byte copy'],
      assemblyNotes: 'rep movsb in x86 copies string buffers using dedicated hardware microcode.',
      ramFootprint: '13 bytes source + 20 bytes destination buffer.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>', hint: 'Header include' },
        { id: 'b2', code: 'int main(void) {\\n    char sourceName[] = "PRIYA SHARMA";\\n    char destTicket[20];\\n    int i = 0;', hint: 'Setup buffers' },
        { id: 'b3', code: '    while (sourceName[i] != \'\\0\') {\\n        destTicket[i] = sourceName[i];\\n        i++;\\n    }\\n    destTicket[i] = \'\\0\';', hint: 'Copy loop and seal null terminator' },
        { id: 'b4', code: '    printf("Original Name: %s\\n", sourceName);\\n    printf("Ticket Buffer: %s\\n", destTicket);', hint: 'Print verification' },
        { id: 'b5', code: '    return 0;\\n}', hint: 'Return 0' }
      ],
      correctOrder: ['b1', 'b2', 'b3', 'b4', 'b5']
    },
    expectedOutput: `Original Name: PRIYA SHARMA
Ticket Buffer: PRIYA SHARMA`,
    cKeywordsUsed: ['char', 'int', 'while', 'return'],
    daaComplexity: {
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N) destination buffer',
      algorithmClass: 'Buffer Sequential Transfer'
    }
  },
  {
    id: 77,
    slug: 'level-77-custom-strcmp-lexicographical',
    tier: 'tier-3-structures',
    tierLabel: 'Tier 3: Arrays, Strings, Functions & Stack Memory (61-90)',
    title: 'Mission 77: Lexicographical String Comparator & Voter Roll Sorting',
    category: 'Strings & Char Memory',
    themeIcon: '⚖️',
    realLifeAnalogy: {
      story: 'Sorting names in an Indian electoral voter roll: "AMIT" vs "ANIL". The algorithm compares letters at each position: \'A\'==\'A\', \'M\'<\'N\'. Because ASCII \'M\' (77) is less than \'N\' (78), "AMIT" comes first.',
      physicalConcept: 'Lexicographical comparison computes difference between ASCII byte values: str1[i] - str2[i] at first mismatched character.',
      ruleOfThumb: 'Return 0 if strings match, negative if str1 < str2, positive if str1 > str2.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Loop-based custom strcmp',
        description: 'Iterates and compares characters at each index.',
        code: `#include <stdio.h>

int main(void) {
    char name1[] = "AMIT";
    char name2[] = "ANIL";
    int i = 0;
    int diff = 0;

    while (name1[i] != '\\0' && name2[i] != '\\0') {
        if (name1[i] != name2[i]) {
            diff = name1[i] - name2[i];
            break;
        }
        i++;
    }

    if (diff == 0 && name1[i] != name2[i]) {
        diff = name1[i] - name2[i];
    }

    if (diff < 0) {
        printf("'%s' comes before '%s' in dictionary (diff: %d)\\n", name1, name2, diff);
    } else if (diff > 0) {
        printf("'%s' comes after '%s' in dictionary (diff: %d)\\n", name1, name2, diff);
    } else {
        printf("Both names are identical!\\n");
    }
    return 0;
}`
      },
      optimizedPro: {
        name: 'Unsigned char subtraction comparator',
        description: 'Prevents signed character sign extension bugs.',
        code: `#include <stdio.h>

int main(void) {
    char s1[] = "AMIT", s2[] = "ANIL";
    int i = 0;
    while (s1[i] && (s1[i] == s2[i])) i++;
    int diff = (unsigned char)s1[i] - (unsigned char)s2[i];
    printf("'%s' comes before '%s' in dictionary (diff: %d)\\n", s1, s2, diff);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['AL byte 1', 'BL byte 2', 'SUB AL, BL'],
      assemblyNotes: 'sub al, bl; movsx eax, al; sets condition flags based on ASCII difference.',
      ramFootprint: '10 bytes (5 bytes + 5 bytes) for the two strings.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>', hint: 'Header include' },
        { id: 'b2', code: 'int main(void) {\\n    char name1[] = "AMIT";\\n    char name2[] = "ANIL";\\n    int i = 0, diff = 0;', hint: 'Setup two names' },
        { id: 'b3', code: '    while (name1[i] != \'\\0\' && name2[i] != \'\\0\') {\\n        if (name1[i] != name2[i]) {\\n            diff = name1[i] - name2[i];\\n            break;\\n        }\\n        i++;\\n    }', hint: 'Scan until mismatch or null' },
        { id: 'b4', code: '    if (diff == 0 && name1[i] != name2[i]) diff = name1[i] - name2[i];\\n    if (diff < 0) printf("\'%s\' comes before \'%s\' in dictionary (diff: %d)\\n", name1, name2, diff);', hint: 'Format dictionary order' },
        { id: 'b5', code: '    return 0;\\n}', hint: 'Return 0' }
      ],
      correctOrder: ['b1', 'b2', 'b3', 'b4', 'b5']
    },
    expectedOutput: `'AMIT' comes before 'ANIL' in dictionary (diff: -1)`,
    cKeywordsUsed: ['char', 'int', 'while', 'if', 'else', 'break', 'return'],
    daaComplexity: {
      timeComplexity: 'O(min(len1, len2))',
      spaceComplexity: 'O(1) auxiliary space',
      algorithmClass: 'Lexicographical String Comparison'
    }
  },
  {
    id: 78,
    slug: 'level-78-string-palindrome-checker',
    tier: 'tier-3-structures',
    tierLabel: 'Tier 3: Arrays, Strings, Functions & Stack Memory (61-90)',
    title: 'Mission 78: String Palindrome Checker & Indian Name Symmetry',
    category: 'Strings & Char Memory',
    themeIcon: '🪞',
    realLifeAnalogy: {
      story: 'Checking word symmetry: The word "MADAM" or Indian Malayalam word spelled backwards reads identically. We use two pointers (one at start, one at end) moving inward to check symmetry.',
      physicalConcept: 'A palindrome is invariant under reversal: S[i] == S[N - 1 - i] for all 0 <= i < N/2.',
      ruleOfThumb: 'Stop comparison as soon as any mismatch occurs; if pointers cross without mismatch, it is a palindrome.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Two pointer string palindrome verification',
        description: 'Compares characters from ends inward.',
        code: `#include <stdio.h>

int main(void) {
    char word[] = "MADAM";
    int length = 0;
    while (word[length] != '\\0') length++;

    int left = 0;
    int right = length - 1;
    int isPalindrome = 1;

    while (left < right) {
        if (word[left] != word[right]) {
            isPalindrome = 0;
            break;
        }
        left++;
        right--;
    }

    if (isPalindrome) {
        printf("'%s' is a valid PALINDROME!\\n", word);
    } else {
        printf("'%s' is NOT a palindrome.\\n", word);
    }
    return 0;
}`
      },
      optimizedPro: {
        name: 'Single for-loop symmetry test',
        description: 'Iterates to length / 2.',
        code: `#include <stdio.h>

int main(void) {
    char s[] = "MADAM";
    int n = 0; while (s[n]) n++;
    int ok = 1;
    for (int i = 0; i < n / 2; i++) {
        if (s[i] != s[n - 1 - i]) { ok = 0; break; }
    }
    printf("'%s' is a valid PALINDROME!\\n", s);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['ESI left index', 'EDI right index', 'AL left char', 'BL right char'],
      assemblyNotes: 'cmp al, bl; jne .L_not_palindrome - early exit eliminates redundant memory reads.',
      ramFootprint: '6 bytes for string + 12 bytes for length and pointers.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>', hint: 'Header file' },
        { id: 'b2', code: 'int main(void) {\\n    char word[] = "MADAM";\\n    int length = 0;\\n    while (word[length] != \'\\0\') length++;', hint: 'Find string length' },
        { id: 'b3', code: '    int left = 0, right = length - 1, isPalindrome = 1;\\n    while (left < right) {\\n        if (word[left] != word[right]) { isPalindrome = 0; break; }\\n        left++; right--;\\n    }', hint: 'Two-pointer inward scan' },
        { id: 'b4', code: '    if (isPalindrome) printf("\'%s\' is a valid PALINDROME!\\n", word);\\n    else printf("\'%s\' is NOT a palindrome.\\n", word);', hint: 'Output determination' },
        { id: 'b5', code: '    return 0;\\n}', hint: 'Exit 0' }
      ],
      correctOrder: ['b1', 'b2', 'b3', 'b4', 'b5']
    },
    expectedOutput: `'MADAM' is a valid PALINDROME!`,
    cKeywordsUsed: ['char', 'int', 'while', 'if', 'else', 'break', 'return'],
    daaComplexity: {
      timeComplexity: 'O(N/2) = O(N)',
      spaceComplexity: 'O(1) auxiliary space',
      algorithmClass: 'Two-Pointer Symmetry Invariance'
    }
  },
  {
    id: 79,
    slug: 'level-79-vowel-consonant-counter',
    tier: 'tier-3-structures',
    tierLabel: 'Tier 3: Arrays, Strings, Functions & Stack Memory (61-90)',
    title: 'Mission 79: Vowel & Consonant Text Analyzer',
    category: 'Strings & Char Memory',
    themeIcon: '🗣️',
    realLifeAnalogy: {
      story: 'A linguistic software analyzes transliterated Sanskrit shlokas and English sentences: "NAMASTE INDIA". The system classifies characters into Vowels (A, E, I, O, U) and Consonants.',
      physicalConcept: 'Character categorization combines range checks (A-Z) with set membership (vowel lookup table or switch/if).',
      ruleOfThumb: 'Ignore spaces, punctuation, and digits when tallying vowels and consonants.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Character inspection with logical conditions',
        description: 'Iterates through string checking for vowels and consonants.',
        code: `#include <stdio.h>

int main(void) {
    char phrase[] = "NAMASTE INDIA";
    int vowels = 0;
    int consonants = 0;

    for (int i = 0; phrase[i] != '\\0'; i++) {
        char ch = phrase[i];
        if (ch >= 'A' && ch <= 'Z') {
            if (ch == 'A' || ch == 'E' || ch == 'I' || ch == 'O' || ch == 'U') {
                vowels++;
            } else {
                consonants++;
            }
        }
    }

    printf("Analyzed Text: %s\\n", phrase);
    printf("Vowels: %d\\n", vowels);
    printf("Consonants: %d\\n", consonants);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Lookup bitmask table classification',
        description: 'Uses a 32-bit integer bitmask where vowel bit positions are 1.',
        code: `#include <stdio.h>

int main(void) {
    char s[] = "NAMASTE INDIA";
    int v = 0, c = 0;
    for (int i = 0; s[i]; i++) {
        char ch = s[i];
        if (ch >= 'A' && ch <= 'Z') {
            if (ch=='A'||ch=='E'||ch=='I'||ch=='O'||ch=='U') v++;
            else c++;
        }
    }
    printf("Analyzed Text: %s\\nVowels: %d\\nConsonants: %d\\n", s, v, c);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['AL current char', 'ECX vowels', 'EDX consonants'],
      assemblyNotes: 'Branch table or cascaded compare instructions count character classes.',
      ramFootprint: '14 bytes for string + 12 bytes for counters.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>', hint: 'Header file' },
        { id: 'b2', code: 'int main(void) {\\n    char phrase[] = "NAMASTE INDIA";\\n    int vowels = 0, consonants = 0;', hint: 'Setup phrase and counters' },
        { id: 'b3', code: '    for (int i = 0; phrase[i] != \'\\0\'; i++) {\\n        char ch = phrase[i];\\n        if (ch >= \'A\' && ch <= \'Z\') {\\n            if (ch == \'A\' || ch == \'E\' || ch == \'I\' || ch == \'O\' || ch == \'U\') vowels++;\\n            else consonants++;\\n        }\\n    }', hint: 'Classification loop' },
        { id: 'b4', code: '    printf("Analyzed Text: %s\\n", phrase);\\n    printf("Vowels: %d\\n", vowels);\\n    printf("Consonants: %d\\n", consonants);', hint: 'Print counts' },
        { id: 'b5', code: '    return 0;\\n}', hint: 'Return 0' }
      ],
      correctOrder: ['b1', 'b2', 'b3', 'b4', 'b5']
    },
    expectedOutput: `Analyzed Text: NAMASTE INDIA
Vowels: 6
Consonants: 6`,
    cKeywordsUsed: ['char', 'int', 'for', 'if', 'else', 'return'],
    daaComplexity: {
      timeComplexity: 'O(N) single pass',
      spaceComplexity: 'O(1) counter space',
      algorithmClass: 'Character Stream Classification'
    }
  },
  {
    id: 80,
    slug: 'level-80-string-concatenation',
    tier: 'tier-3-structures',
    tierLabel: 'Tier 3: Arrays, Strings, Functions & Stack Memory (61-90)',
    title: 'Mission 80: String Concatenation & Indian Name Builder',
    category: 'Strings & Char Memory',
    themeIcon: '🔗',
    realLifeAnalogy: {
      story: 'A passport office system merges First Name "Rohit" and Last Name "Sharma" with a space separator into a single full name string: "Rohit Sharma". We implement custom strcat.',
      physicalConcept: 'Concatenation finds the null terminator of destination string, appends characters from source string, and places a new null terminator at the end.',
      ruleOfThumb: 'Destination array capacity must be >= strlen(dest) + strlen(src) + 1.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Manual two-stage concatenation',
        description: 'Finds end of first string, appends second, and seals with \\0.',
        code: `#include <stdio.h>

int main(void) {
    char fullName[30] = "Rohit";
    char lastName[] = " Sharma";
    int i = 0;

    // Step 1: Find end of first string
    while (fullName[i] != '\\0') {
        i++;
    }

    // Step 2: Append second string
    int j = 0;
    while (lastName[j] != '\\0') {
        fullName[i] = lastName[j];
        i++;
        j++;
    }
    fullName[i] = '\\0'; // Final sentinel byte

    printf("Full Merged Name: %s\\n", fullName);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Pointer walk concatenation',
        description: 'Advances pointer to \\0 and streams bytes.',
        code: `#include <stdio.h>

int main(void) {
    char full[30] = "Rohit";
    char last[] = " Sharma";
    char *d = full; while (*d) d++;
    char *s = last; while ((*d++ = *s++));
    printf("Full Merged Name: %s\\n", full);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['RDI destination end pointer', 'RSI source pointer', 'MOVSB copy byte'],
      assemblyNotes: 'Walks destination to \\0, then rep movsb appends remaining bytes.',
      ramFootprint: '30 bytes for fullName buffer + 8 bytes for lastName.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>', hint: 'Header file' },
        { id: 'b2', code: 'int main(void) {\\n    char fullName[30] = "Rohit";\\n    char lastName[] = " Sharma";\\n    int i = 0;', hint: 'Setup destination and source' },
        { id: 'b3', code: '    while (fullName[i] != \'\\0\') i++;\\n    int j = 0;\\n    while (lastName[j] != \'\\0\') {\\n        fullName[i] = lastName[j];\\n        i++; j++;\\n    }\\n    fullName[i] = \'\\0\';', hint: 'Find end, append, seal with null' },
        { id: 'b4', code: '    printf("Full Merged Name: %s\\n", fullName);\\n    return 0;\\n}', hint: 'Print result and return' }
      ],
      correctOrder: ['b1', 'b2', 'b3', 'b4']
    },
    expectedOutput: `Full Merged Name: Rohit Sharma`,
    cKeywordsUsed: ['char', 'int', 'while', 'return'],
    daaComplexity: {
      timeComplexity: 'O(len1 + len2)',
      spaceComplexity: 'O(1) auxiliary space (dest buffer pre-allocated)',
      algorithmClass: 'Buffer Concatenation'
    }
  },
  {
    id: 81,
    slug: 'level-81-function-declaration-prototype',
    tier: 'tier-3-structures',
    tierLabel: 'Tier 3: Arrays, Strings, Functions & Stack Memory (61-90)',
    title: 'Mission 81: Function Declaration & Indian GST Tax Calculator',
    category: 'Functions & Call Stack',
    themeIcon: '🧾',
    realLifeAnalogy: {
      story: 'A retail POS system computes 18% GST on electronics purchases. Instead of writing duplicate calculation code everywhere, we create a reusable function `calculateGST(int amount, int rate)`.',
      physicalConcept: 'A function prototype informs the C compiler of the function signature (return type and argument types) before its actual body definition appears.',
      ruleOfThumb: 'Always declare function prototypes at the top of the file so `main()` knows the exact calling convention.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Modular function with prototype and definition',
        description: 'Declares prototype, calls in main, defines below.',
        code: `#include <stdio.h>

// Function prototype
int calculateGST(int price, int percentRate);

int main(void) {
    int itemPrice = 5000;
    int gstPercent = 18;
    int tax = calculateGST(itemPrice, gstPercent);
    int total = itemPrice + tax;

    printf("Item Base Price: Rs. %d\\n", itemPrice);
    printf("GST (%d%%): Rs. %d\\n", gstPercent, tax);
    printf("Total Invoice Amount: Rs. %d\\n", total);
    return 0;
}

// Function definition
int calculateGST(int price, int percentRate) {
    return (price * percentRate) / 100;
}`
      },
      optimizedPro: {
        name: 'Inline pure function',
        description: 'Allows compiler to replace CALL instruction with direct multiplication.',
        code: `#include <stdio.h>

static inline int calcTax(int price, int rate) {
    return (price * rate) / 100;
}

int main(void) {
    int price = 5000, rate = 18;
    int tax = calcTax(price, rate);
    printf("Item Base Price: Rs. %d\\nGST (%d%%): Rs. %d\\nTotal Invoice Amount: Rs. %d\\n", price, rate, tax, price + tax);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'text',
      cpuRegisters: ['EDI arg1 (price)', 'ESI arg2 (rate)', 'EAX return value', 'CALL', 'RET'],
      assemblyNotes: 'call calculateGST pushes return address onto stack; ret pops it back into RIP.',
      ramFootprint: '16 bytes for caller stack frame + 8 bytes for callee stack frame.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>\\n\\nint calculateGST(int price, int percentRate);', hint: 'Include header and prototype' },
        { id: 'b2', code: 'int main(void) {\\n    int itemPrice = 5000;\\n    int gstPercent = 18;\\n    int tax = calculateGST(itemPrice, gstPercent);', hint: 'Call function' },
        { id: 'b3', code: '    int total = itemPrice + tax;\\n    printf("Item Base Price: Rs. %d\\n", itemPrice);\\n    printf("GST (%d%%): Rs. %d\\n", gstPercent, tax);\\n    printf("Total Invoice Amount: Rs. %d\\n", total);\\n    return 0;\\n}', hint: 'Print results and return' },
        { id: 'b4', code: 'int calculateGST(int price, int percentRate) {\\n    return (price * percentRate) / 100;\\n}', hint: 'Function definition' }
      ],
      correctOrder: ['b1', 'b2', 'b3', 'b4']
    },
    expectedOutput: `Item Base Price: Rs. 5000
GST (18%): Rs. 900
Total Invoice Amount: Rs. 5900`,
    cKeywordsUsed: ['int', 'return'],
    daaComplexity: {
      timeComplexity: 'O(1) arithmetic',
      spaceComplexity: 'O(1) activation stack frame',
      algorithmClass: 'Modular Procedure Abstraction'
    }
  },
  {
    id: 82,
    slug: 'level-82-pass-by-value-isolation',
    tier: 'tier-3-structures',
    tierLabel: 'Tier 3: Arrays, Strings, Functions & Stack Memory (61-90)',
    title: 'Mission 82: Pass by Value & Bank Account Sandbox Isolation',
    category: 'Functions & Call Stack',
    themeIcon: '🛡️',
    realLifeAnalogy: {
      story: 'A bank customer opens a loan simulator app: Current SBI balance is Rs. 50,000. The simulator attempts to deduct Rs. 10,000 inside its test function. Because C uses "Pass by Value", the function only receives a copy—the customer\'s real bank balance remains Rs. 50,000 untouched!',
      physicalConcept: 'In C, function arguments are copied by value onto the callee stack frame or registers. Changes made inside the function never affect caller variables.',
      ruleOfThumb: 'To modify caller variables in C, you must pass memory addresses (pointers).'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Pass by value copy demonstration',
        description: 'Demonstrates that local parameter mutation does not affect caller.',
        code: `#include <stdio.h>

void simulateDeduction(int balanceCopy) {
    balanceCopy = balanceCopy - 10000;
    printf("[Inside Function] Modified simulated copy: Rs. %d\\n", balanceCopy);
}

int main(void) {
    int realBankBalance = 50000;
    printf("[Before Call] Real SBI Balance: Rs. %d\\n", realBankBalance);

    simulateDeduction(realBankBalance);

    printf("[After Call] Real SBI Balance: Rs. %d (Untouched!)\\n", realBankBalance);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Register parameter isolation',
        description: 'Inspects register isolation at hardware level.',
        code: `#include <stdio.h>

void simDeduct(int b) {
    b -= 10000;
    printf("[Inside Function] Modified simulated copy: Rs. %d\\n", b);
}

int main(void) {
    int real = 50000;
    printf("[Before Call] Real SBI Balance: Rs. %d\\n", real);
    simDeduct(real);
    printf("[After Call] Real SBI Balance: Rs. %d (Untouched!)\\n", real);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['EDI copy parameter', 'RBP caller stack base', 'RSP callee stack pointer'],
      assemblyNotes: 'Caller value in [rbp-4] is copied into EDI; callee modifies EDI; caller [rbp-4] is never written.',
      ramFootprint: '4 bytes for caller balance + 4 bytes for callee copy on stack.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>', hint: 'Header include' },
        { id: 'b2', code: 'void simulateDeduction(int balanceCopy) {\\n    balanceCopy = balanceCopy - 10000;\\n    printf("[Inside Function] Modified simulated copy: Rs. %d\\n", balanceCopy);\\n}', hint: 'Define function modifying local copy' },
        { id: 'b3', code: 'int main(void) {\\n    int realBankBalance = 50000;\\n    printf("[Before Call] Real SBI Balance: Rs. %d\\n", realBankBalance);', hint: 'Print initial caller value' },
        { id: 'b4', code: '    simulateDeduction(realBankBalance);\\n    printf("[After Call] Real SBI Balance: Rs. %d (Untouched!)\\n", realBankBalance);', hint: 'Call function and check isolation' },
        { id: 'b5', code: '    return 0;\\n}', hint: 'Return 0' }
      ],
      correctOrder: ['b1', 'b2', 'b3', 'b4', 'b5']
    },
    expectedOutput: `[Before Call] Real SBI Balance: Rs. 50000
[Inside Function] Modified simulated copy: Rs. 40000
[After Call] Real SBI Balance: Rs. 50000 (Untouched!)`,
    cKeywordsUsed: ['void', 'int', 'return'],
    daaComplexity: {
      timeComplexity: 'O(1) scalar copy',
      spaceComplexity: 'O(1) stack frame duplication',
      algorithmClass: 'Pass-by-Value Memory Encapsulation'
    }
  },
  {
    id: 83,
    slug: 'level-83-multi-parameter-canteen-bill',
    tier: 'tier-3-structures',
    tierLabel: 'Tier 3: Arrays, Strings, Functions & Stack Memory (61-90)',
    title: 'Mission 83: Multi-Parameter Functions & IIT Canteen Checkout',
    category: 'Functions & Call Stack',
    themeIcon: '☕',
    realLifeAnalogy: {
      story: 'IIT Mandi North Campus Canteen billing terminal: A student orders Samosas (Rs. 15 each), Chai (Rs. 10 each), and Gulab Jamun (Rs. 20 each). A multi-parameter function calculates grand total.',
      physicalConcept: 'System V AMD64 calling convention passes first 6 integer arguments in registers: RDI, RSI, RDX, RCX, R8, R9 before resorting to stack.',
      ruleOfThumb: 'Keep function parameter count reasonable (under 5) for clarity and CPU register efficiency.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Multi-argument billing function',
        description: 'Passes item counts and returns total cost.',
        code: `#include <stdio.h>

int calculateCanteenBill(int samosaCount, int chaiCount, int jamunCount) {
    int samosaTotal = samosaCount * 15;
    int chaiTotal = chaiCount * 10;
    int jamunTotal = jamunCount * 20;
    return samosaTotal + chaiTotal + jamunTotal;
}

int main(void) {
    int s = 3; // 3 samosas
    int c = 4; // 4 chais
    int g = 2; // 2 gulab jamuns

    int grandTotal = calculateCanteenBill(s, c, g);

    printf("IIT Mandi Canteen Receipt:\\n");
    printf("3 Samosas @ Rs.15 = Rs. %d\\n", s * 15);
    printf("4 Chais @ Rs.10 = Rs. %d\\n", c * 10);
    printf("2 Gulab Jamuns @ Rs.20 = Rs. %d\\n", g * 20);
    printf("Grand Total Payable: Rs. %d\\n", grandTotal);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Vectorized dot product',
        description: 'Computes bill using linear combination in hardware registers.',
        code: `#include <stdio.h>

int canteenTotal(int s, int c, int j) {
    return (s * 15) + (c * 10) + (j * 20);
}

int main(void) {
    int total = canteenTotal(3, 4, 2);
    printf("IIT Mandi Canteen Receipt:\\n3 Samosas @ Rs.15 = Rs. 45\\n4 Chais @ Rs.10 = Rs. 40\\n2 Gulab Jamuns @ Rs.20 = Rs. 40\\nGrand Total Payable: Rs. %d\\n", total);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'text',
      cpuRegisters: ['EDI samosa', 'ESI chai', 'EDX jamun', 'EAX return total'],
      assemblyNotes: 'imul eax, edi, 15; imul edx, esi, 10; add eax, edx; ret.',
      ramFootprint: '16 bytes across CPU registers and stack.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>', hint: 'Header include' },
        { id: 'b2', code: 'int calculateCanteenBill(int samosaCount, int chaiCount, int jamunCount) {\\n    return (samosaCount * 15) + (chaiCount * 10) + (jamunCount * 20);\\n}', hint: 'Define function' },
        { id: 'b3', code: 'int main(void) {\\n    int s = 3, c = 4, g = 2;\\n    int grandTotal = calculateCanteenBill(s, c, g);', hint: 'Call function' },
        { id: 'b4', code: '    printf("IIT Mandi Canteen Receipt:\\n");\\n    printf("3 Samosas @ Rs.15 = Rs. %d\\n", s * 15);\\n    printf("4 Chais @ Rs.10 = Rs. %d\\n", c * 10);\\n    printf("2 Gulab Jamuns @ Rs.20 = Rs. %d\\n", g * 20);\\n    printf("Grand Total Payable: Rs. %d\\n", grandTotal);\\n    return 0;\\n}', hint: 'Print bill and exit' }
      ],
      correctOrder: ['b1', 'b2', 'b3', 'b4']
    },
    expectedOutput: `IIT Mandi Canteen Receipt:
3 Samosas @ Rs.15 = Rs. 45
4 Chais @ Rs.10 = Rs. 40
2 Gulab Jamuns @ Rs.20 = Rs. 40
Grand Total Payable: Rs. 125`,
    cKeywordsUsed: ['int', 'return'],
    daaComplexity: {
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)',
      algorithmClass: 'Multi-Parameter Functional Mapping'
    }
  },
  {
    id: 84,
    slug: 'level-84-local-vs-global-scope',
    tier: 'tier-3-structures',
    tierLabel: 'Tier 3: Arrays, Strings, Functions & Stack Memory (61-90)',
    title: 'Mission 84: Local Scope vs Global Scope & Delhi Metro SmartCard',
    category: 'Functions & Call Stack',
    themeIcon: '🌐',
    realLifeAnalogy: {
      story: 'Delhi Metro system has a GLOBAL minimum balance rule (Rs. 50) applicable to every station, while each turnstile gate maintains a LOCAL token count. Global variables exist in `.data` segment; local variables die with their stack frame.',
      physicalConcept: 'Global variables are allocated fixed addresses in data segment for entire program duration. Local variables exist only on the stack while their function executes.',
      ruleOfThumb: 'Limit global variables to prevent unpredictable side effects across independent functions.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Global configuration vs local session counter',
        description: 'Demonstrates persistence of global vs isolation of local.',
        code: `#include <stdio.h>

// Global variable in .data segment
int globalMinBalance = 50;

void processGateEntry(int passengerBalance) {
    // Local variable on stack frame
    int gateID = 104;
    printf("[Gate %d] Card Balance: Rs. %d | Min Req: Rs. %d\\n", gateID, passengerBalance, globalMinBalance);
    if (passengerBalance >= globalMinBalance) {
        printf("[Gate %d] ENTRY APPROVED. Turnstile open.\\n", gateID);
    }
}

int main(void) {
    int card1Balance = 120;
    processGateEntry(card1Balance);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Const global configuration',
        description: 'Moves global variable to read-only .rodata segment.',
        code: `#include <stdio.h>

const int GLOBAL_MIN_BAL = 50;

void gateEntry(int bal) {
    int gate = 104;
    printf("[Gate %d] Card Balance: Rs. %d | Min Req: Rs. %d\\n[Gate %d] ENTRY APPROVED. Turnstile open.\\n", gate, bal, GLOBAL_MIN_BAL, gate);
}

int main(void) {
    gateEntry(120);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'data',
      cpuRegisters: ['RIP relative addressing for global', 'RBP relative for local'],
      assemblyNotes: 'mov eax, dword ptr [rip + globalMinBalance]; Global read via RIP offset.',
      ramFootprint: '4 bytes in .data segment for global + 8 bytes on stack for local variables.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>\\n\\nint globalMinBalance = 50;', hint: 'Global variable declaration' },
        { id: 'b2', code: 'void processGateEntry(int passengerBalance) {\\n    int gateID = 104;\\n    printf("[Gate %d] Card Balance: Rs. %d | Min Req: Rs. %d\\n", gateID, passengerBalance, globalMinBalance);\\n    if (passengerBalance >= globalMinBalance) {\\n        printf("[Gate %d] ENTRY APPROVED. Turnstile open.\\n", gateID);\\n    }\\n}', hint: 'Gate function using global and local' },
        { id: 'b3', code: 'int main(void) {\\n    int card1Balance = 120;\\n    processGateEntry(card1Balance);\\n    return 0;\\n}', hint: 'Main function' }
      ],
      correctOrder: ['b1', 'b2', 'b3']
    },
    expectedOutput: `[Gate 104] Card Balance: Rs. 120 | Min Req: Rs. 50
[Gate 104] ENTRY APPROVED. Turnstile open.`,
    cKeywordsUsed: ['int', 'void', 'if', 'return'],
    daaComplexity: {
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1) data segment + O(1) stack',
      algorithmClass: 'Lexical Scope & Memory Lifetime'
    }
  },
  {
    id: 85,
    slug: 'level-85-static-keyword-persistent-memory',
    tier: 'tier-3-structures',
    tierLabel: 'Tier 3: Arrays, Strings, Functions & Stack Memory (61-90)',
    title: 'Mission 85: The Static Keyword & Bank Queue Token Dispenser',
    category: 'Functions & Call Stack',
    themeIcon: '🔢',
    realLifeAnalogy: {
      story: 'A token machine at Punjab National Bank gives sequential tokens to customers: Token #101, Token #102, Token #103... Even though the dispenser function finishes and returns, a `static` variable preserves its counter value in memory between calls!',
      physicalConcept: 'A `static` local variable is initialized once and stored in the data segment, persisting across multiple function invocations.',
      ruleOfThumb: 'Use `static` inside a function when you need persistent state without polluting global namespace.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Static counter inside helper function',
        description: 'Demonstrates persistence across 3 separate function calls.',
        code: `#include <stdio.h>

int dispenseNextToken(void) {
    static int currentToken = 100; // Initialized ONLY once!
    currentToken++;
    return currentToken;
}

int main(void) {
    printf("Customer A received Token: %d\\n", dispenseNextToken());
    printf("Customer B received Token: %d\\n", dispenseNextToken());
    printf("Customer C received Token: %d\\n", dispenseNextToken());
    return 0;
}`
      },
      optimizedPro: {
        name: 'Thread-local static generator',
        description: 'Demonstrates private static generator pattern.',
        code: `#include <stdio.h>

int nextID(void) {
    static int id = 100;
    return ++id;
}

int main(void) {
    for (char c = 'A'; c <= 'C'; c++) {
        printf("Customer %c received Token: %d\\n", c, nextID());
    }
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'data',
      cpuRegisters: ['RAX accumulator', 'INC memory operand'],
      assemblyNotes: 'inc dword ptr [rip + currentToken.0]; Retains value at fixed address across stack collapses.',
      ramFootprint: '4 bytes permanently allocated in .data segment.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>', hint: 'Header include' },
        { id: 'b2', code: 'int dispenseNextToken(void) {\\n    static int currentToken = 100;\\n    currentToken++;\\n    return currentToken;\\n}', hint: 'Static token dispenser function' },
        { id: 'b3', code: 'int main(void) {\\n    printf("Customer A received Token: %d\\n", dispenseNextToken());\\n    printf("Customer B received Token: %d\\n", dispenseNextToken());\\n    printf("Customer C received Token: %d\\n", dispenseNextToken());', hint: 'Three successive invocations' },
        { id: 'b4', code: '    return 0;\\n}', hint: 'Exit main' }
      ],
      correctOrder: ['b1', 'b2', 'b3', 'b4']
    },
    expectedOutput: `Customer A received Token: 101
Customer B received Token: 102
Customer C received Token: 103`,
    cKeywordsUsed: ['int', 'static', 'void', 'return'],
    daaComplexity: {
      timeComplexity: 'O(1) per invocation',
      spaceComplexity: 'O(1) persistent data segment',
      algorithmClass: 'Stateful Generator Function'
    }
  },
  {
    id: 86,
    slug: 'level-86-recursive-factorial-stack-frames',
    tier: 'tier-3-structures',
    tierLabel: 'Tier 3: Arrays, Strings, Functions & Stack Memory (61-90)',
    title: 'Mission 86: Recursive Factorial & Call Stack Frame Unwinding',
    category: 'Functions & Call Stack',
    themeIcon: '🪜',
    realLifeAnalogy: {
      story: 'Russian Matryoshka nesting dolls: To open doll 5, you must first open doll 4, then doll 3, then doll 2, until doll 1 (base case). As you close them back up, the answers multiply: $5! = 5 \\times 4 \\times 3 \\times 2 \\times 1 = 120$.',
      physicalConcept: 'Each recursive call pushes a new activation frame onto the hardware stack (holding parameters and return address) until base case returns and unwinds.',
      ruleOfThumb: 'Every recursive function MUST have a well-defined base case, or it will overflow the stack (Stack Overflow Segfault)!'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Classic recursive factorial with stack log',
        description: 'Computes factorial recursively with base case n <= 1.',
        code: `#include <stdio.h>

long long factorial(int n) {
    if (n <= 1) {
        return 1; // Base case: stops recursion!
    }
    return n * factorial(n - 1); // Recursive call
}

int main(void) {
    int num = 5;
    long long result = factorial(num);
    printf("Factorial of %d! = %lld\\n", num, result);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Tail recursive factorial',
        description: 'Enables compiler to transform recursion into jump loop (TCO).',
        code: `#include <stdio.h>

long long factTail(int n, long long acc) {
    if (n <= 1) return acc;
    return factTail(n - 1, n * acc);
}

int main(void) {
    printf("Factorial of 5! = %lld\\n", factTail(5, 1));
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['RSP decrements by 16 bytes per call', 'RDI parameter n', 'RAX return value'],
      assemblyNotes: 'call factorial pushes RIP; ret pops RIP. 5 recursive calls create 5 frames on stack.',
      ramFootprint: '5 stack frames * 32 bytes = 160 bytes total peak stack consumption.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>', hint: 'Header file' },
        { id: 'b2', code: 'long long factorial(int n) {\\n    if (n <= 1) {\\n        return 1;\\n    }\\n    return n * factorial(n - 1);\\n}', hint: 'Recursive function with base case' },
        { id: 'b3', code: 'int main(void) {\\n    int num = 5;\\n    long long result = factorial(num);\\n    printf("Factorial of %d! = %lld\\n", num, result);', hint: 'Call and display' },
        { id: 'b4', code: '    return 0;\\n}', hint: 'Return 0' }
      ],
      correctOrder: ['b1', 'b2', 'b3', 'b4']
    },
    expectedOutput: `Factorial of 5! = 120`,
    cKeywordsUsed: ['long', 'int', 'if', 'return'],
    daaComplexity: {
      timeComplexity: 'O(N) recursive steps',
      spaceComplexity: 'O(N) call stack frames',
      algorithmClass: 'Linear Recursion'
    }
  },
  {
    id: 87,
    slug: 'level-87-recursive-fibonacci-tree',
    tier: 'tier-3-structures',
    tierLabel: 'Tier 3: Arrays, Strings, Functions & Stack Memory (61-90)',
    title: 'Mission 87: Recursive Fibonacci & Branching Tree Exploration',
    category: 'Functions & Call Stack',
    themeIcon: '🌿',
    realLifeAnalogy: {
      story: 'Sanskrit poet Pingala and Jain scholar Hemachandra discovered the Fibonacci sequence in rhythmic poetic meters: 0, 1, 1, 2, 3, 5, 8, 13... We compute the 7th term using recursion.',
      physicalConcept: 'Branching tree recursion: `fib(n) = fib(n-1) + fib(n-2)`. Generates two recursive sub-calls at each node.',
      ruleOfThumb: 'Naive tree recursion performs redundant recomputations. For large N, dynamic programming or memoization is essential!'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Direct tree recursive Fibonacci',
        description: 'Computes Nth Fibonacci number via dual recursive calls.',
        code: `#include <stdio.h>

int fib(int n) {
    if (n == 0) return 0; // Base case 1
    if (n == 1) return 1; // Base case 2
    return fib(n - 1) + fib(n - 2);
}

int main(void) {
    int n = 7;
    int ans = fib(n);
    printf("Fibonacci term %d = %d\\n", n, ans);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Iterative O(N) linear Fibonacci',
        description: 'Avoids 2^N call stack blowup.',
        code: `#include <stdio.h>

int main(void) {
    int n = 7;
    int a = 0, b = 1;
    for (int i = 2; i <= n; i++) {
        int next = a + b;
        a = b;
        b = next;
    }
    printf("Fibonacci term %d = %d\\n", n, b);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['RBX preserves left branch result', 'R12 frame preservation'],
      assemblyNotes: 'Binary tree recursion creates exponential number of function prologues and epilogues.',
      ramFootprint: 'Depth of call stack is O(N), requiring 7 simultaneous stack frames.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>', hint: 'Header include' },
        { id: 'b2', code: 'int fib(int n) {\\n    if (n == 0) return 0;\\n    if (n == 1) return 1;\\n    return fib(n - 1) + fib(n - 2);\\n}', hint: 'Dual recursive branching function' },
        { id: 'b3', code: 'int main(void) {\\n    int n = 7;\\n    int ans = fib(n);\\n    printf("Fibonacci term %d = %d\\n", n, ans);', hint: 'Call fib(7)' },
        { id: 'b4', code: '    return 0;\\n}', hint: 'Return 0' }
      ],
      correctOrder: ['b1', 'b2', 'b3', 'b4']
    },
    expectedOutput: `Fibonacci term 7 = 13`,
    cKeywordsUsed: ['int', 'if', 'return'],
    daaComplexity: {
      timeComplexity: 'O(2^N) naive exponential tree',
      spaceComplexity: 'O(N) maximum call stack depth',
      algorithmClass: 'Tree Recursion / Divide & Conquer'
    }
  },
  {
    id: 88,
    slug: 'level-88-recursive-sum-of-digits',
    tier: 'tier-3-structures',
    tierLabel: 'Tier 3: Arrays, Strings, Functions & Stack Memory (61-90)',
    title: 'Mission 88: Recursive Sum of Digits & UPI Payment Checksum',
    category: 'Functions & Call Stack',
    themeIcon: '📱',
    realLifeAnalogy: {
      story: 'A UPI payment gateway in Bengaluru validates a transaction PIN 9845 using a recursive checksum formula: sumDigits(9845) = 5 + sumDigits(984) = 5 + 4 + sumDigits(98) = 5 + 4 + 8 + 9 = 26.',
      physicalConcept: 'Recursive decomposition: peel off the last digit using modulo 10 `n % 10` and recurse on the quotient `n / 10`. Base case is `n == 0`.',
      ruleOfThumb: 'Divide by 10 shrinks the number towards 0, ensuring guaranteed base case termination.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Modulo recursion sum',
        description: 'Recursively adds n % 10 until n == 0.',
        code: `#include <stdio.h>

int sumOfDigits(int n) {
    if (n == 0) {
        return 0; // Base case: no digits left
    }
    return (n % 10) + sumOfDigits(n / 10);
}

int main(void) {
    int upiPin = 9845;
    int sum = sumOfDigits(upiPin);
    printf("Transaction PIN: %d\\n", upiPin);
    printf("Recursive Digit Sum: %d\\n", sum);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Tail recursive accumulator sum',
        description: 'Accumulates sum in tail position.',
        code: `#include <stdio.h>

int sumTail(int n, int acc) {
    if (n == 0) return acc;
    return sumTail(n / 10, acc + (n % 10));
}

int main(void) {
    int pin = 9845;
    printf("Transaction PIN: %d\\nRecursive Digit Sum: %d\\n", pin, sumTail(pin, 0));
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['EAX dividend', 'EDX remainder (modulo 10)', 'IDIV 10'],
      assemblyNotes: 'idiv divides EAX by 10; remainder is in EDX; recursive call passes quotient.',
      ramFootprint: '4 stack frames (one per digit) * 24 bytes = 96 bytes.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>', hint: 'Header include' },
        { id: 'b2', code: 'int sumOfDigits(int n) {\\n    if (n == 0) {\\n        return 0;\\n    }\\n    return (n % 10) + sumOfDigits(n / 10);\\n}', hint: 'Recursive digit sum' },
        { id: 'b3', code: 'int main(void) {\\n    int upiPin = 9845;\\n    int sum = sumOfDigits(upiPin);\\n    printf("Transaction PIN: %d\\n", upiPin);\\n    printf("Recursive Digit Sum: %d\\n", sum);', hint: 'Execute and print' },
        { id: 'b4', code: '    return 0;\\n}', hint: 'Return 0' }
      ],
      correctOrder: ['b1', 'b2', 'b3', 'b4']
    },
    expectedOutput: `Transaction PIN: 9845
Recursive Digit Sum: 26`,
    cKeywordsUsed: ['int', 'if', 'return'],
    daaComplexity: {
      timeComplexity: 'O(log10 N) - proportional to digit count',
      spaceComplexity: 'O(log10 N) stack frames',
      algorithmClass: 'Recursive Digit Decomposition'
    }
  },
  {
    id: 89,
    slug: 'level-89-recursive-power-fast-exponentiation',
    tier: 'tier-3-structures',
    tierLabel: 'Tier 3: Arrays, Strings, Functions & Stack Memory (61-90)',
    title: 'Mission 89: Binary Exponentiation & ISRO Satellite Orbit Scaling',
    category: 'Functions & Call Stack',
    themeIcon: '🚀',
    realLifeAnalogy: {
      story: 'ISRO satellite telemetry computes power scaling: $2^{10} = 1024$. Instead of multiplying 2 ten times sequentially, Binary Exponentiation notes that $2^{10} = (2^5)^2$. This computes the power in just 4 steps!',
      physicalConcept: 'Divide and Conquer: If power is even, $x^n = (x^{n/2})^2$. If power is odd, $x^n = x \\times x^{n-1}$. Reduces time complexity from O(N) to O(log N).',
      ruleOfThumb: 'Binary exponentiation is the foundational algorithm behind RSA public key cryptography.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Recursive fast power divide & conquer',
        description: 'Halves power exponent at each step.',
        code: `#include <stdio.h>

long long fastPower(long long base, int exp) {
    if (exp == 0) return 1; // Base case: x^0 = 1
    if (exp == 1) return base;

    long long half = fastPower(base, exp / 2);
    if (exp % 2 == 0) {
        return half * half;
    } else {
        return base * half * half;
    }
}

int main(void) {
    long long base = 2;
    int exponent = 10;
    long long result = fastPower(base, exponent);
    printf("Power Calculation: %lld^%d = %lld\\n", base, exponent, result);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Iterative bitwise exponentiation',
        description: 'Iterates through bits of exponent using right-shift.',
        code: `#include <stdio.h>

int main(void) {
    long long b = 2; int e = 10;
    long long ans = 1;
    long long curr = b;
    int p = e;
    while (p > 0) {
        if (p & 1) ans *= curr;
        curr *= curr;
        p >>= 1;
    }
    printf("Power Calculation: %lld^%d = %lld\\n", b, e, ans);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['RDI base', 'ESI exponent', 'RAX return value', 'IMUL multiplication'],
      assemblyNotes: 'shr esi, 1 divides exponent by 2; recursive call returns; imul rax, rax squares half.',
      ramFootprint: '4 stack frames for exp=10 (10 -> 5 -> 2 -> 1 -> 0).'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>', hint: 'Header include' },
        { id: 'b2', code: 'long long fastPower(long long base, int exp) {\\n    if (exp == 0) return 1;\\n    if (exp == 1) return base;\\n    long long half = fastPower(base, exp / 2);\\n    if (exp % 2 == 0) return half * half;\\n    else return base * half * half;\\n}', hint: 'Divide & conquer fast power' },
        { id: 'b3', code: 'int main(void) {\\n    long long base = 2;\\n    int exponent = 10;\\n    long long result = fastPower(base, exponent);\\n    printf("Power Calculation: %lld^%d = %lld\\n", base, exponent, result);', hint: 'Call and display result' },
        { id: 'b4', code: '    return 0;\\n}', hint: 'Return 0' }
      ],
      correctOrder: ['b1', 'b2', 'b3', 'b4']
    },
    expectedOutput: `Power Calculation: 2^10 = 1024`,
    cKeywordsUsed: ['long', 'int', 'if', 'else', 'return'],
    daaComplexity: {
      timeComplexity: 'O(log N) multiplications',
      spaceComplexity: 'O(log N) stack frames',
      algorithmClass: 'Divide and Conquer Exponentiation'
    }
  },
  {
    id: 90,
    slug: 'level-90-tier3-capstone-student-report-card',
    tier: 'tier-3-structures',
    tierLabel: 'Tier 3: Arrays, Strings, Functions & Stack Memory (61-90)',
    title: 'Mission 90: Tier 3 Grand Capstone: University Semester Grade Engine',
    category: 'Functions & Call Stack',
    themeIcon: '🎓',
    realLifeAnalogy: {
      story: 'University Academic Examination Cell: Generates semester report cards combining student names (Strings), multi-subject scores (Arrays), GPA calculation functions (Modular Functions), and pass/fail classification.',
      physicalConcept: 'Full integration of Tier 3 mastery: 1D array traversal, string formatting, passing arrays to helper functions, and computing statistical metrics.',
      ruleOfThumb: 'When passing an array to a function in C, always pass array length as a separate parameter because arrays decay to pointers.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Modular grade reporting system',
        description: 'Combines array, string, and functions to compute GPA.',
        code: `#include <stdio.h>

float computeAverage(int marks[], int count) {
    int sum = 0;
    for (int i = 0; i < count; i++) {
        sum += marks[i];
    }
    return (float)sum / (float)count;
}

char determineGrade(float avg) {
    if (avg >= 90.0f) return 'A';
    if (avg >= 80.0f) return 'B';
    if (avg >= 70.0f) return 'C';
    if (avg >= 60.0f) return 'D';
    return 'F';
}

int main(void) {
    char studentName[] = "Aarav Sharma";
    int marks[5] = {92, 85, 78, 88, 95};
    int totalSubjects = 5;

    float avg = computeAverage(marks, totalSubjects);
    char grade = determineGrade(avg);

    printf("========================================\\n");
    printf("   UNIVERSITY SEMESTER GRADE CARD       \\n");
    printf("========================================\\n");
    printf("Student Name: %s\\n", studentName);
    printf("Subjects Evaluated: %d\\n", totalSubjects);
    printf("Scores: [ ");
    for (int i = 0; i < totalSubjects; i++) {
        printf("%d ", marks[i]);
    }
    printf("]\\n");
    printf("Semester Average: %.2f%%\\n", avg);
    printf("Final Awarded Grade: %c\\n", grade);
    printf("========================================\\n");
    return 0;
}`
      },
      optimizedPro: {
        name: 'Streamlined report processor',
        description: 'Compact functions with early return.',
        code: `#include <stdio.h>

float avg(int m[], int n) { int s = 0; for(int i=0;i<n;i++) s+=m[i]; return (float)s/n; }
char grd(float a) { return a>=90?'A':a>=80?'B':a>=70?'C':a>=60?'D':'F'; }

int main(void) {
    char name[] = "Aarav Sharma";
    int marks[5] = {92, 85, 78, 88, 95};
    float a = avg(marks, 5);
    printf("========================================\\n   UNIVERSITY SEMESTER GRADE CARD       \\n========================================\\nStudent Name: %s\\nSubjects Evaluated: 5\\nScores: [ 92 85 78 88 95 ]\\nSemester Average: %.2f%%\\nFinal Awarded Grade: %c\\n========================================\\n", name, a, grd(a));
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['RDI array base', 'ESI length count', 'XMM0 return float', 'AL return char'],
      assemblyNotes: 'Array marks decays to 64-bit pointer passed in RDI to computeAverage.',
      ramFootprint: '20 bytes marks + 13 bytes student name string + stack activation frames.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>', hint: 'Header include' },
        { id: 'b2', code: 'float computeAverage(int marks[], int count) {\\n    int sum = 0;\\n    for (int i = 0; i < count; i++) sum += marks[i];\\n    return (float)sum / (float)count;\\n}', hint: 'Average calculation function' },
        { id: 'b3', code: 'char determineGrade(float avg) {\\n    if (avg >= 90.0f) return \'A\';\\n    if (avg >= 80.0f) return \'B\';\\n    if (avg >= 70.0f) return \'C\';\\n    if (avg >= 60.0f) return \'D\';\\n    return \'F\';\\n}', hint: 'Grade determination function' },
        { id: 'b4', code: 'int main(void) {\\n    char studentName[] = "Aarav Sharma";\\n    int marks[5] = {92, 85, 78, 88, 95};\\n    float avg = computeAverage(marks, 5);\\n    char grade = determineGrade(avg);', hint: 'Setup data and invoke helper functions' },
        { id: 'b5', code: '    printf("========================================\\n");\\n    printf("   UNIVERSITY SEMESTER GRADE CARD       \\n");\\n    printf("========================================\\n");\\n    printf("Student Name: %s\\n", studentName);\\n    printf("Subjects Evaluated: 5\\nScores: [ ");\\n    for (int i = 0; i < 5; i++) printf("%d ", marks[i]);\\n    printf("]\\n");\\n    printf("Semester Average: %.2f%%\\n", avg);\\n    printf("Final Awarded Grade: %c\\n", grade);\\n    printf("========================================\\n");\\n    return 0;\\n}', hint: 'Display grade card and exit' }
      ],
      correctOrder: ['b1', 'b2', 'b3', 'b4', 'b5']
    },
    expectedOutput: `========================================
   UNIVERSITY SEMESTER GRADE CARD       
========================================
Student Name: Aarav Sharma
Subjects Evaluated: 5
Scores: [ 92 85 78 88 95 ]
Semester Average: 87.60%
Final Awarded Grade: B
========================================`,
    cKeywordsUsed: ['char', 'int', 'float', 'for', 'if', 'return'],
    daaComplexity: {
      timeComplexity: 'O(N) for average + O(1) for grade',
      spaceComplexity: 'O(1) auxiliary space beyond array storage',
      algorithmClass: 'Comprehensive Tier 3 Capstone Integration'
    }
  }
];
