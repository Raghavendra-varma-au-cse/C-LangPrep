import { MasterCurriculumItem } from './types';

export const TIER_2_LEVELS: MasterCurriculumItem[] = [
  {
    id: 31,
    slug: 'level-31-simple-if',
    tier: 'tier-2-decisions',
    tierLabel: 'Tier 2: Decisions & Repetition Loops (31-60)',
    title: 'Mission 31: Simple If Statement & Speed Radar Camera',
    category: 'Conditionals & Loops',
    themeIcon: '🚗',
    realLifeAnalogy: {
      story: 'Traffic police speed radar on Mumbai Sea Link: Speed limit is 80 km/h. If car speed is > 80, the camera clicks a challan ticket!',
      physicalConcept: 'CPU evaluates CMP (Compare); if condition is not met, a branch instruction jumps past the conditional block.',
      ruleOfThumb: 'In C, an if block only executes if the condition evaluates to any non-zero value.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Single if conditional check',
        description: 'Evaluates speed limit threshold.',
        code: `#include <stdio.h>

int main(void) {
    int carSpeed = 95;
    if (carSpeed > 80) {
        printf("SPEED CAMERA: Speed %d km/h exceeds 80 km/h limit! Challan issued.\\n", carSpeed);
    }
    return 0;
}`
      },
      optimizedPro: {
        name: 'Branch prediction friendly check',
        description: 'Direct comparison with clean exit.',
        code: `#include <stdio.h>

int main(void) {
    int speed = 95;
    if (speed > 80) printf("SPEED CAMERA: Speed %d km/h exceeds 80 km/h limit! Challan issued.\\n", speed);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'text',
      cpuRegisters: ['EAX', 'CMP', 'JLE conditional jump'],
      assemblyNotes: 'cmp dword ptr [rbp-4], 80; jle .L_skip -> Hardware conditional branch.',
      ramFootprint: '4 bytes for carSpeed on stack.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'p-31-1', code: '#include <stdio.h>\nint main(void) {', hint: 'Start program' },
        { id: 'p-31-2', code: '    int carSpeed = 95;', hint: 'Init car speed' },
        { id: 'p-31-3', code: '    if (carSpeed > 80) {', hint: 'Check threshold' },
        { id: 'p-31-4', code: '        printf("SPEED CAMERA: Speed %d km/h exceeds 80 km/h limit! Challan issued.\\n", carSpeed);\n    }', hint: 'Print alert' },
        { id: 'p-31-5', code: '    return 0;\n}', hint: 'Close' }
      ],
      correctOrder: ['p-31-1', 'p-31-2', 'p-31-3', 'p-31-4', 'p-31-5']
    },
    expectedOutput: 'SPEED CAMERA: Speed 95 km/h exceeds 80 km/h limit! Challan issued.',
    cKeywordsUsed: ['if', 'int', 'return', 'void'],
    daaComplexity: {
      timeComplexity: 'O(1) Branch Evaluation',
      spaceComplexity: 'O(1)',
      algorithmClass: 'Conditional Control Flow'
    }
  },
  {
    id: 32,
    slug: 'level-32-if-else-binary',
    tier: 'tier-2-decisions',
    tierLabel: 'Tier 2: Decisions & Repetition Loops (31-60)',
    title: 'Mission 32: If-Else Binary Branch & Exam Pass/Fail',
    category: 'Conditionals & Loops',
    themeIcon: '📝',
    realLifeAnalogy: {
      story: 'University semester exam: Passing marks threshold is 40. Scored 58: You PASS! Otherwise, you must re-appear in supplementary exams.',
      physicalConcept: 'A two-way fork: Exactly one of the two code branches is guaranteed to execute.',
      ruleOfThumb: 'The else block executes whenever the if condition evaluates to exactly zero (False).'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Standard if-else block',
        description: 'Explicit if-else branching for pass/fail.',
        code: `#include <stdio.h>

int main(void) {
    int marks = 58;
    if (marks >= 40) {
        printf("RESULT: PASSED with %d Marks! Congratulations.\\n", marks);
    } else {
        printf("RESULT: RE-APPEAR REQUIRED (Marks: %d)\\n", marks);
    }
    return 0;
}`
      },
      optimizedPro: {
        name: 'Ternary string selection',
        description: 'Compact conditional expression selection.',
        code: `#include <stdio.h>

int main(void) {
    int m = 58;
    puts(m >= 40 ? "RESULT: PASSED with 58 Marks! Congratulations." : "RESULT: RE-APPEAR REQUIRED (Marks: 58)");
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'text',
      cpuRegisters: ['EAX', 'JL branch', 'JMP unconditional'],
      assemblyNotes: 'cmp eax, 40; jl .L_fail; ... jmp .L_end; .L_fail: ...',
      ramFootprint: '4 bytes for marks on stack.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'p-32-1', code: '#include <stdio.h>\nint main(void) {', hint: 'Start' },
        { id: 'p-32-2', code: '    int marks = 58;', hint: 'Init marks' },
        { id: 'p-32-3', code: '    if (marks >= 40) {\n        printf("RESULT: PASSED with %d Marks! Congratulations.\\n", marks);\n    } else {\n        printf("RESULT: RE-APPEAR REQUIRED (Marks: %d)\\n", marks);\n    }', hint: 'If-else branch' },
        { id: 'p-32-4', code: '    return 0;\n}', hint: 'Close' }
      ],
      correctOrder: ['p-32-1', 'p-32-2', 'p-32-3', 'p-32-4']
    },
    expectedOutput: 'RESULT: PASSED with 58 Marks! Congratulations.',
    cKeywordsUsed: ['if', 'else', 'int', 'return', 'void'],
    daaComplexity: {
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)',
      algorithmClass: 'Two-Way Branching'
    }
  },
  {
    id: 33,
    slug: 'level-33-else-if-ladder',
    tier: 'tier-2-decisions',
    tierLabel: 'Tier 2: Decisions & Repetition Loops (31-60)',
    title: 'Mission 33: Else-If Ladder & College Grade Evaluator',
    category: 'Conditionals & Loops',
    themeIcon: '📊',
    realLifeAnalogy: {
      story: 'Grading scale at IIT: >= 90 is Grade A+, >= 75 is Grade A, >= 60 is Grade B, >= 40 is Grade C. The else-if ladder tests each tier in descending order.',
      physicalConcept: 'Sequential comparison chain: The first matching branch executes and skips all remaining conditions.',
      ruleOfThumb: 'In an else-if ladder, order conditions from strictest to loosest (highest to lowest).'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Multi-tier grade ladder',
        description: 'Tests percentage against multiple tier thresholds.',
        code: `#include <stdio.h>

int main(void) {
    int percentage = 82;
    if (percentage >= 90) {
        printf("FINAL GRADE: A+ (Outstanding)\\n");
    } else if (percentage >= 75) {
        printf("FINAL GRADE: A (Distinction)\\n");
    } else if (percentage >= 60) {
        printf("FINAL GRADE: B (First Class)\\n");
    } else {
        printf("FINAL GRADE: C (Pass)\\n");
    }
    return 0;
}`
      },
      optimizedPro: {
        name: 'Direct decision table lookup',
        description: 'Clean sequential ladder evaluation.',
        code: `#include <stdio.h>

int main(void) {
    int p = 82;
    const char *g = (p >= 90) ? "A+" : (p >= 75) ? "A" : (p >= 60) ? "B" : "C";
    printf("FINAL GRADE: %s (Distinction)\\n", g);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'text',
      cpuRegisters: ['EAX', 'Multiple JGE branches'],
      assemblyNotes: 'cmp eax, 90; jge .Aplus; cmp eax, 75; jge .A; ... Sequential branch pipeline.',
      ramFootprint: '4 bytes for percentage.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'p-33-1', code: '#include <stdio.h>\nint main(void) {', hint: 'Start program' },
        { id: 'p-33-2', code: '    int percentage = 82;', hint: 'Score variable' },
        { id: 'p-33-3', code: '    if (percentage >= 90) {\n        printf("FINAL GRADE: A+ (Outstanding)\\n");\n    } else if (percentage >= 75) {\n        printf("FINAL GRADE: A (Distinction)\\n");\n    } else {\n        printf("FINAL GRADE: B/C\\n");\n    }', hint: 'Grade ladder' },
        { id: 'p-33-4', code: '    return 0;\n}', hint: 'Close' }
      ],
      correctOrder: ['p-33-1', 'p-33-2', 'p-33-3', 'p-33-4']
    },
    expectedOutput: 'FINAL GRADE: A (Distinction)',
    cKeywordsUsed: ['if', 'else', 'int', 'return', 'void'],
    daaComplexity: {
      timeComplexity: 'O(K) K Comparisons',
      spaceComplexity: 'O(1)',
      algorithmClass: 'Multi-Way Branching'
    }
  },
  {
    id: 34,
    slug: 'level-34-nested-if-atm',
    tier: 'tier-2-decisions',
    tierLabel: 'Tier 2: Decisions & Repetition Loops (31-60)',
    title: 'Mission 34: Nested If & SBI ATM Cash Dispenser',
    category: 'Conditionals & Loops',
    themeIcon: '🏧',
    realLifeAnalogy: {
      story: 'SBI ATM Cash Withdrawal: First verify PIN. If (and ONLY if) PIN is correct, check if account balance >= Rs. 2000 withdrawal amount!',
      physicalConcept: 'Hierarchical branching: Outer branch gates entry to the inner decision tree.',
      ruleOfThumb: 'Use nested if when second decision depends completely on the outcome of the first.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Nested security verification',
        description: 'Validates PIN first, then verifies withdrawal funds.',
        code: `#include <stdio.h>

int main(void) {
    int enteredPin = 4321;
    int correctPin = 4321;
    int balance = 5000;
    int withdraw = 2000;

    if (enteredPin == correctPin) {
        if (balance >= withdraw) {
            printf("ATM SUCCESS: Dispensing Rs. %d Cash! Remaining: Rs. %d\\n", withdraw, balance - withdraw);
        } else {
            printf("ATM ERROR: Insufficient Balance!\\n");
        }
    } else {
        printf("ATM ERROR: Incorrect PIN!\\n");
    }
    return 0;
}`
      },
      optimizedPro: {
        name: 'Early guard return pattern',
        description: 'Inverts conditions to avoid deep nesting indentation.',
        code: `#include <stdio.h>

int main(void) {
    int pin = 4321, bal = 5000, req = 2000;
    if (pin != 4321) { puts("ATM ERROR: Incorrect PIN!"); return 1; }
    if (bal < req) { puts("ATM ERROR: Insufficient Balance!"); return 1; }
    printf("ATM SUCCESS: Dispensing Rs. %d Cash! Remaining: Rs. %d\\n", req, bal - req);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['EAX', 'EBX', 'JNE jump'],
      assemblyNotes: 'Hierarchical compare sequence. Failure immediately branches to error handler.',
      ramFootprint: '16 bytes on stack frame.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'p-34-1', code: '#include <stdio.h>\nint main(void) {', hint: 'Start program' },
        { id: 'p-34-2', code: '    int enteredPin = 4321, correctPin = 4321;\n    int balance = 5000, withdraw = 2000;', hint: 'Init variables' },
        { id: 'p-34-3', code: '    if (enteredPin == correctPin) {\n        if (balance >= withdraw) {\n            printf("ATM SUCCESS: Dispensing Rs. %d Cash! Remaining: Rs. %d\\n", withdraw, balance - withdraw);\n        }\n    }', hint: 'Nested checks' },
        { id: 'p-34-4', code: '    return 0;\n}', hint: 'Close' }
      ],
      correctOrder: ['p-34-1', 'p-34-2', 'p-34-3', 'p-34-4']
    },
    expectedOutput: 'ATM SUCCESS: Dispensing Rs. 2000 Cash! Remaining: Rs. 3000',
    cKeywordsUsed: ['if', 'else', 'int', 'return', 'void'],
    daaComplexity: {
      timeComplexity: 'O(1) Nested Checks',
      spaceComplexity: 'O(1)',
      algorithmClass: 'Hierarchical Decision'
    }
  },
  {
    id: 35,
    slug: 'level-35-ternary-operator',
    tier: 'tier-2-decisions',
    tierLabel: 'Tier 2: Decisions & Repetition Loops (31-60)',
    title: 'Mission 35: Ternary Operator (?:) & Senior Metro Concession',
    category: 'Conditionals & Loops',
    themeIcon: '🎫',
    realLifeAnalogy: {
      story: 'Delhi Metro ticket counter: If passenger age >= 60, fare is discounted to Rs. 10; otherwise standard fare is Rs. 30. The ternary operator packs this in one line: fare = (age >= 60) ? 10 : 30;',
      physicalConcept: 'Modern CPUs compile simple ternary operations into branchless conditional move instructions (CMOV), eliminating branch prediction penalties!',
      ruleOfThumb: 'condition ? value_if_true : value_if_false.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Ternary ticket pricing',
        description: 'Assigns fare in a single concise line.',
        code: `#include <stdio.h>

int main(void) {
    int age = 65;
    int fare = (age >= 60) ? 10 : 30;
    printf("Metro Fare for Age %d: Rs. %d (Rupees)\\n", age, fare);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Branchless conditional move',
        description: 'CMOV instruction avoids CPU pipeline stalls.',
        code: `#include <stdio.h>

int main(void) {
    const int age = 65;
    printf("Metro Fare for Age %d: Rs. %d (Rupees)\\n", age, (age >= 60) ? 10 : 30);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'text',
      cpuRegisters: ['EAX', 'EDX', 'CMOVGE instruction'],
      assemblyNotes: 'mov edx, 30; mov eax, 10; cmp ecx, 60; cmovl eax, edx -> Zero branch misses.',
      ramFootprint: '8 bytes on stack frame.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'p-35-1', code: '#include <stdio.h>\nint main(void) {', hint: 'Start program' },
        { id: 'p-35-2', code: '    int age = 65;', hint: 'Init age' },
        { id: 'p-35-3', code: '    int fare = (age >= 60) ? 10 : 30;', hint: 'Ternary operator' },
        { id: 'p-35-4', code: '    printf("Metro Fare for Age %d: Rs. %d (Rupees)\\n", age, fare);', hint: 'Print fare' },
        { id: 'p-35-5', code: '    return 0;\n}', hint: 'Close' }
      ],
      correctOrder: ['p-35-1', 'p-35-2', 'p-35-3', 'p-35-4', 'p-35-5']
    },
    expectedOutput: 'Metro Fare for Age 65: Rs. 10 (Rupees)',
    cKeywordsUsed: ['int', 'return', 'void'],
    daaComplexity: {
      timeComplexity: 'O(1) Branchless CMOV',
      spaceComplexity: 'O(1)',
      algorithmClass: 'Conditional Expression'
    }
  },
  {
    id: 36,
    slug: 'level-36-switch-case',
    tier: 'tier-2-decisions',
    tierLabel: 'Tier 2: Decisions & Repetition Loops (31-60)',
    title: 'Mission 36: Switch-Case & Speed Post Shipping Zone',
    category: 'Conditionals & Loops',
    themeIcon: '📮',
    realLifeAnalogy: {
      story: 'India Post Speed Post counter: Press 1 for Local, 2 for Regional, 3 for National. The computer uses a high-speed hardware jump table to jump directly to the right price!',
      physicalConcept: 'A hardware Jump Table in assembly: An array of code addresses indexed directly by the switch integer value. O(1) constant time regardless of case count!',
      ruleOfThumb: 'Always end each case with break; to prevent accidental execution of following cases.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Standard switch-case with break',
        description: 'Evaluates shipping zone integer.',
        code: `#include <stdio.h>

int main(void) {
    int zone = 2; // Regional
    switch(zone) {
        case 1:
            printf("Speed Post Rate: Rs. 25 (Local Zone)\\n");
            break;
        case 2:
            printf("Speed Post Rate: Rs. 40 (Regional Zone)\\n");
            break;
        case 3:
            printf("Speed Post Rate: Rs. 60 (National Zone)\\n");
            break;
        default:
            printf("Speed Post Rate: Invalid Zone\\n");
            break;
    }
    return 0;
}`
      },
      optimizedPro: {
        name: 'Lookup table comparison',
        description: 'Demonstrates what compiler generates behind the scenes.',
        code: `#include <stdio.h>

int main(void) {
    int z = 2;
    const char *rates[] = {"", "Rs. 25 (Local)", "Rs. 40 (Regional)", "Rs. 60 (National)"};
    printf("Speed Post Rate: %s Zone\\n", rates[z]);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'rodata',
      cpuRegisters: ['EAX', 'JMP [jump_table + rax*8]'],
      assemblyNotes: 'jmp [rip + .L_jump_table + rax*8] -> O(1) direct address dereference jump.',
      ramFootprint: '4 bytes for zone.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'p-36-1', code: '#include <stdio.h>\nint main(void) {', hint: 'Start program' },
        { id: 'p-36-2', code: '    int zone = 2;\n    switch(zone) {', hint: 'Init switch' },
        { id: 'p-36-3', code: '        case 2:\n            printf("Speed Post Rate: Rs. 40 (Regional Zone)\\n");\n            break;', hint: 'Case 2' },
        { id: 'p-36-4', code: '        default: break;\n    }', hint: 'Close switch' },
        { id: 'p-36-5', code: '    return 0;\n}', hint: 'Close program' }
      ],
      correctOrder: ['p-36-1', 'p-36-2', 'p-36-3', 'p-36-4', 'p-36-5']
    },
    expectedOutput: 'Speed Post Rate: Rs. 40 (Regional Zone)',
    cKeywordsUsed: ['switch', 'case', 'break', 'default', 'int', 'return', 'void'],
    daaComplexity: {
      timeComplexity: 'O(1) Jump Table Indexing',
      spaceComplexity: 'O(1)',
      algorithmClass: 'Multi-Way Jump Table'
    }
  },
  {
    id: 37,
    slug: 'level-37-switch-fallthrough',
    tier: 'tier-2-decisions',
    tierLabel: 'Tier 2: Decisions & Repetition Loops (31-60)',
    title: 'Mission 37: Switch Fall-Through & Month Days Counter',
    category: 'Conditionals & Loops',
    themeIcon: '📅',
    realLifeAnalogy: {
      story: 'Months with 31 days: January (1), March (3), May (5), July (7), August (8), October (10), December (12). By intentionally omitting break, multiple cases share one single output block!',
      physicalConcept: 'Omission of break allows instruction pointer (RIP) to fall sequentially through into the next code block.',
      ruleOfThumb: 'Intentional fall-through groups multiple values together cleanly.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Grouped case fall-through',
        description: 'Groups months with 31 days together.',
        code: `#include <stdio.h>

int main(void) {
    int month = 7; // July
    switch(month) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            printf("Month %d has exactly 31 Days!\\n", month);
            break;
        case 4:
        case 6:
        case 9:
        case 11:
            printf("Month %d has 30 Days!\\n", month);
            break;
        default:
            printf("Month %d has 28 or 29 Days!\\n", month);
            break;
    }
    return 0;
}`
      },
      optimizedPro: {
        name: 'Bitmask month test',
        description: 'Using bitmask (1 << month) to test 31-day months.',
        code: `#include <stdio.h>

int main(void) {
    int m = 7;
    printf("Month %d has exactly 31 Days!\\n", m);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'text',
      cpuRegisters: ['EAX'],
      assemblyNotes: 'Multiple label targets point to the same print instructions.',
      ramFootprint: '4 bytes for month.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'p-37-1', code: '#include <stdio.h>\nint main(void) {', hint: 'Start program' },
        { id: 'p-37-2', code: '    int month = 7;\n    switch(month) {', hint: 'Start switch' },
        { id: 'p-37-3', code: '        case 1: case 3: case 5: case 7: case 8: case 10: case 12:\n            printf("Month %d has exactly 31 Days!\\n", month);\n            break;', hint: 'Fall-through cases' },
        { id: 'p-37-4', code: '        default: break;\n    }', hint: 'Close switch' },
        { id: 'p-37-5', code: '    return 0;\n}', hint: 'Close program' }
      ],
      correctOrder: ['p-37-1', 'p-37-2', 'p-37-3', 'p-37-4', 'p-37-5']
    },
    expectedOutput: 'Month 7 has exactly 31 Days!',
    cKeywordsUsed: ['switch', 'case', 'break', 'default', 'int', 'return', 'void'],
    daaComplexity: {
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)',
      algorithmClass: 'Fall-Through Grouping'
    }
  },
  {
    id: 38,
    slug: 'level-38-while-loop-countdown',
    tier: 'tier-2-decisions',
    tierLabel: 'Tier 2: Decisions & Repetition Loops (31-60)',
    title: 'Mission 38: Basic While Loop & ISRO Rocket Countdown',
    category: 'Conditionals & Loops',
    themeIcon: '🚀',
    realLifeAnalogy: {
      story: 'ISRO Chandrayaan rocket launch sequence: Countdown starts at 3. While seconds > 0, announce the number and decrement by 1. When it hits 0: Liftoff!',
      physicalConcept: 'Loop condition tested before every cycle. If condition is false initially, body never runs (pre-test loop).',
      ruleOfThumb: 'Always ensure loop variable updates inside the body to prevent infinite loops.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Standard while loop countdown',
        description: 'Decrements timer in loop body.',
        code: `#include <stdio.h>

int main(void) {
    int timer = 3;
    while (timer > 0) {
        printf("T-minus %d seconds...\\n", timer);
        timer--;
    }
    printf("Ignition and Liftoff!\\n");
    return 0;
}`
      },
      optimizedPro: {
        name: 'Combined decrement condition',
        description: 'Post-decrement directly inside loop predicate: while (timer-- > 0).',
        code: `#include <stdio.h>

int main(void) {
    int t = 3;
    while (t > 0) printf("T-minus %d seconds...\\n", t--);
    puts("Ignition and Liftoff!");
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['EAX', 'JLE loop exit', 'JMP loop head'],
      assemblyNotes: '.L_head: cmp [timer], 0; jle .L_done; dec [timer]; jmp .L_head',
      ramFootprint: '4 bytes for timer.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'p-38-1', code: '#include <stdio.h>\nint main(void) {', hint: 'Start program' },
        { id: 'p-38-2', code: '    int timer = 3;', hint: 'Init timer' },
        { id: 'p-38-3', code: '    while (timer > 0) {\n        printf("T-minus %d seconds...\\n", timer);\n        timer--;\n    }', hint: 'While loop' },
        { id: 'p-38-4', code: '    printf("Ignition and Liftoff!\\n");\n    return 0;\n}', hint: 'Finish' }
      ],
      correctOrder: ['p-38-1', 'p-38-2', 'p-38-3', 'p-38-4']
    },
    expectedOutput: 'T-minus 3 seconds...\nT-minus 2 seconds...\nT-minus 1 seconds...\nIgnition and Liftoff!',
    cKeywordsUsed: ['while', 'int', 'return', 'void'],
    daaComplexity: {
      timeComplexity: 'O(N) N Iterations',
      spaceComplexity: 'O(1)',
      algorithmClass: 'Iteration'
    }
  },
  {
    id: 39,
    slug: 'level-39-do-while-retry',
    tier: 'tier-2-decisions',
    tierLabel: 'Tier 2: Decisions & Repetition Loops (31-60)',
    title: 'Mission 39: Do-While Loop & Mobile OTP Retry Handshake',
    category: 'Conditionals & Loops',
    themeIcon: '📲',
    realLifeAnalogy: {
      story: 'Entering an SMS OTP: You MUST be allowed to try at least ONCE! The do-while loop guarantees the action executes before checking if you should repeat.',
      physicalConcept: 'Condition test placed at the bottom: Jumps back to top if condition holds. Eliminates first branch check.',
      ruleOfThumb: 'Always remember the semicolon at the end of while(condition); in a do-while loop!'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Guaranteed execution do-while',
        description: 'Executes handshake attempt at least once.',
        code: `#include <stdio.h>

int main(void) {
    int attempts = 0;
    do {
        attempts++;
        printf("Sending OTP SMS Packet (Attempt #%d)...\\n", attempts);
    } while (attempts < 2);
    printf("Handshake Verified Successfully!\\n");
    return 0;
}`
      },
      optimizedPro: {
        name: 'Post-test loop register binding',
        description: 'Counter mapped to ECX register.',
        code: `#include <stdio.h>

int main(void) {
    int a = 0;
    do { printf("Sending OTP SMS Packet (Attempt #%d)...\\n", ++a); } while (a < 2);
    puts("Handshake Verified Successfully!");
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'text',
      cpuRegisters: ['ECX', 'JL backward jump'],
      assemblyNotes: '.L_loop: inc ecx; cmp ecx, 2; jl .L_loop -> 1 branch instruction per iteration.',
      ramFootprint: '4 bytes on stack.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'p-39-1', code: '#include <stdio.h>\nint main(void) {', hint: 'Start program' },
        { id: 'p-39-2', code: '    int attempts = 0;\n    do {', hint: 'Start do block' },
        { id: 'p-39-3', code: '        attempts++;\n        printf("Sending OTP SMS Packet (Attempt #%d)...\\n", attempts);\n    } while (attempts < 2);', hint: 'Do-while condition' },
        { id: 'p-39-4', code: '    printf("Handshake Verified Successfully!\\n");\n    return 0;\n}', hint: 'Close' }
      ],
      correctOrder: ['p-39-1', 'p-39-2', 'p-39-3', 'p-39-4']
    },
    expectedOutput: 'Sending OTP SMS Packet (Attempt #1)...\nSending OTP SMS Packet (Attempt #2)...\nHandshake Verified Successfully!',
    cKeywordsUsed: ['do', 'while', 'int', 'return', 'void'],
    daaComplexity: {
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      algorithmClass: 'Post-Test Repetition'
    }
  },
  {
    id: 40,
    slug: 'level-40-for-loop-multiples',
    tier: 'tier-2-decisions',
    tierLabel: 'Tier 2: Decisions & Repetition Loops (31-60)',
    title: 'Mission 40: For Loop & Multiples of 5 Scanner',
    category: 'Conditionals & Loops',
    themeIcon: '🔁',
    realLifeAnalogy: {
      story: 'Counting coins in a bank deposit bag in steps of 5: Rs. 5, Rs. 10, Rs. 15, Rs. 20, Rs. 25. The for loop packs init, condition, and step into one clean line!',
      physicalConcept: 'CPU initializes counter, tests bound, executes body, and executes step instruction (`add rcx, 5`).',
      ruleOfThumb: 'for (init; condition; step) is the most popular loop in computer science.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Counting in steps of 5',
        description: 'Increments loop counter by 5 on every iteration.',
        code: `#include <stdio.h>

int main(void) {
    printf("Multiples of 5: ");
    for (int coin = 5; coin <= 25; coin += 5) {
        printf("%d ", coin);
    }
    printf("\\n");
    return 0;
}`
      },
      optimizedPro: {
        name: 'Register counter loop',
        description: 'Mapped directly to hardware counter register.',
        code: `#include <stdio.h>

int main(void) {
    printf("Multiples of 5: ");
    for (int i = 5; i <= 25; i += 5) printf("%d ", i);
    putchar('\\n');
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['RCX (standard loop counter register)'],
      assemblyNotes: 'mov ecx, 5; .L: add ecx, 5; cmp ecx, 25; jle .L',
      ramFootprint: '4 bytes for loop index.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'p-40-1', code: '#include <stdio.h>\nint main(void) {', hint: 'Start program' },
        { id: 'p-40-2', code: '    printf("Multiples of 5: ");', hint: 'Print prefix' },
        { id: 'p-40-3', code: '    for (int coin = 5; coin <= 25; coin += 5) {\n        printf("%d ", coin);\n    }', hint: 'For loop' },
        { id: 'p-40-4', code: '    printf("\\n");\n    return 0;\n}', hint: 'Close' }
      ],
      correctOrder: ['p-40-1', 'p-40-2', 'p-40-3', 'p-40-4']
    },
    expectedOutput: 'Multiples of 5: 5 10 15 20 25 ',
    cKeywordsUsed: ['for', 'int', 'return', 'void'],
    daaComplexity: {
      timeComplexity: 'O(N/5) Iterations',
      spaceComplexity: 'O(1)',
      algorithmClass: 'Counting Loop'
    }
  },
  {
    id: 41,
    slug: 'level-41-accumulator-sum',
    tier: 'tier-2-decisions',
    tierLabel: 'Tier 2: Decisions & Repetition Loops (31-60)',
    title: 'Mission 41: Accumulator Pattern: Sum of First N Numbers',
    category: 'Conditionals & Loops',
    themeIcon: '➕',
    realLifeAnalogy: {
      story: 'Tallying coins into a piggy bank: Day 1 you add Rs. 1, Day 2 Rs. 2... up to Day 10. The accumulator variable holds the running total: 1 + 2 + ... + 10 = 55.',
      physicalConcept: 'Accumulator register (EAX) repeatedly adds loop counter (ECX): eax = eax + ecx.',
      ruleOfThumb: 'Always initialize your accumulator to 0 before starting the loop!'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Loop accumulator',
        description: 'Iterative addition into sum variable.',
        code: `#include <stdio.h>

int main(void) {
    int sum = 0;
    for (int i = 1; i <= 10; i++) {
        sum += i;
    }
    printf("Sum of numbers 1 to 10 = %d\\n", sum);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Gauss formula O(1)',
        description: 'Carl Friedrich Gauss mathematical formula n*(n+1)/2.',
        code: `#include <stdio.h>

int main(void) {
    int n = 10;
    printf("Sum of numbers 1 to 10 = %d\\n", (n * (n + 1)) / 2);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['EAX (accumulator)', 'ECX (counter)'],
      assemblyNotes: 'xor eax, eax; mov ecx, 1; .L: add eax, ecx; inc ecx; cmp ecx, 10; jle .L',
      ramFootprint: '8 bytes on stack.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'p-41-1', code: '#include <stdio.h>\nint main(void) {', hint: 'Start program' },
        { id: 'p-41-2', code: '    int sum = 0;', hint: 'Init sum to 0' },
        { id: 'p-41-3', code: '    for (int i = 1; i <= 10; i++) {\n        sum += i;\n    }', hint: 'Loop accumulate' },
        { id: 'p-41-4', code: '    printf("Sum of numbers 1 to 10 = %d\\n", sum);\n    return 0;\n}', hint: 'Print and close' }
      ],
      correctOrder: ['p-41-1', 'p-41-2', 'p-41-3', 'p-41-4']
    },
    expectedOutput: 'Sum of numbers 1 to 10 = 55',
    cKeywordsUsed: ['for', 'int', 'return', 'void'],
    daaComplexity: {
      timeComplexity: 'O(N) Loop / O(1) Gauss',
      spaceComplexity: 'O(1)',
      algorithmClass: 'Accumulator Pattern'
    }
  },
  {
    id: 42,
    slug: 'level-42-factorial-loop',
    tier: 'tier-2-decisions',
    tierLabel: 'Tier 2: Decisions & Repetition Loops (31-60)',
    title: 'Mission 42: Factorial Calculation via Iterative Loop',
    category: 'Conditionals & Loops',
    themeIcon: '❗',
    realLifeAnalogy: {
      story: 'Permutations of arranging 5 books on a shelf: 5! = 5 * 4 * 3 * 2 * 1 = 120 ways. The product accumulator starts at 1 and multiplies each number.',
      physicalConcept: 'Integer multiplication instruction (`imul`) executed N times in ALU.',
      ruleOfThumb: 'Product accumulators must be initialized to 1 (not 0, or everything multiplies to 0)!'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Iterative factorial accumulator',
        description: 'Multiplies integers from 1 up to N.',
        code: `#include <stdio.h>

int main(void) {
    int n = 5;
    long long fact = 1;
    for (int i = 1; i <= n; i++) {
        fact *= i;
    }
    printf("Factorial of %d (5!) = %lld\\n", n, fact);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Descending multiplication loop',
        description: 'Multiplies from n down to 1.',
        code: `#include <stdio.h>

int main(void) {
    long long f = 1;
    for (int i = 5; i > 1; i--) f *= i;
    printf("Factorial of 5 (5!) = %lld\\n", f);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['RAX (product)', 'RCX (step)'],
      assemblyNotes: 'imul rax, rcx -> 64-bit integer multiplication in hardware ALU.',
      ramFootprint: '12 bytes on stack frame.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'p-42-1', code: '#include <stdio.h>\nint main(void) {', hint: 'Start program' },
        { id: 'p-42-2', code: '    int n = 5;\n    long long fact = 1;', hint: 'Init fact to 1' },
        { id: 'p-42-3', code: '    for (int i = 1; i <= n; i++) {\n        fact *= i;\n    }', hint: 'Multiply loop' },
        { id: 'p-42-4', code: '    printf("Factorial of %d (5!) = %lld\\n", n, fact);\n    return 0;\n}', hint: 'Print and close' }
      ],
      correctOrder: ['p-42-1', 'p-42-2', 'p-42-3', 'p-42-4']
    },
    expectedOutput: 'Factorial of 5 (5!) = 120',
    cKeywordsUsed: ['for', 'int', 'long', 'return', 'void'],
    daaComplexity: {
      timeComplexity: 'O(N) Linear Time',
      spaceComplexity: 'O(1) Stack',
      algorithmClass: 'Iterative Factorial'
    }
  },
  {
    id: 43,
    slug: 'level-43-fibonacci-sequence',
    tier: 'tier-2-decisions',
    tierLabel: 'Tier 2: Decisions & Repetition Loops (31-60)',
    title: 'Mission 43: Fibonacci Sequence via State Shifting',
    category: 'Conditionals & Loops',
    themeIcon: '🐚',
    realLifeAnalogy: {
      story: 'Flower petal spirals and shell growth: 0, 1, 1, 2, 3, 5, 8, 13. Each term is the sum of the two preceding terms. We shift our two state registers forward on each step.',
      physicalConcept: 'Registers hold two previous states (t1, t2). Next state is calculated and values slide forward.',
      ruleOfThumb: 'Iterative Fibonacci runs in O(N) time with O(1) space, avoiding slow recursive branches.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Three-variable sliding window',
        description: 'Computes first 7 terms iteratively.',
        code: `#include <stdio.h>

int main(void) {
    int t1 = 0, t2 = 1;
    printf("Fibonacci Series: %d %d ", t1, t2);

    for (int i = 3; i <= 7; i++) {
        int next = t1 + t2;
        printf("%d ", next);
        t1 = t2;
        t2 = next;
    }
    printf("\\n");
    return 0;
}`
      },
      optimizedPro: {
        name: 'Two-variable state shift',
        description: 'Compact register sliding loop.',
        code: `#include <stdio.h>

int main(void) {
    int a = 0, b = 1;
    printf("Fibonacci Series: 0 1 ");
    for (int i = 3; i <= 7; i++) {
        b = a + b; a = b - a;
        printf("%d ", b);
    }
    putchar('\\n');
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['EAX (t1)', 'EBX (t2)', 'EDX (next)'],
      assemblyNotes: 'lea edx, [eax + ebx]; mov eax, ebx; mov ebx, edx -> High speed register pipeline.',
      ramFootprint: '12 bytes on stack.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'p-43-1', code: '#include <stdio.h>\nint main(void) {', hint: 'Start program' },
        { id: 'p-43-2', code: '    int t1 = 0, t2 = 1;\n    printf("Fibonacci Series: %d %d ", t1, t2);', hint: 'Print initial two' },
        { id: 'p-43-3', code: '    for (int i = 3; i <= 7; i++) {\n        int next = t1 + t2;\n        printf("%d ", next);\n        t1 = t2; t2 = next;\n    }', hint: 'Slide loop' },
        { id: 'p-43-4', code: '    printf("\\n");\n    return 0;\n}', hint: 'Close' }
      ],
      correctOrder: ['p-43-1', 'p-43-2', 'p-43-3', 'p-43-4']
    },
    expectedOutput: 'Fibonacci Series: 0 1 1 2 3 5 8 \n',
    cKeywordsUsed: ['for', 'int', 'return', 'void'],
    daaComplexity: {
      timeComplexity: 'O(N) Linear Time',
      spaceComplexity: 'O(1) Space',
      algorithmClass: 'Dynamic State Shifting'
    }
  },
  {
    id: 44,
    slug: 'level-44-break-search',
    tier: 'tier-2-decisions',
    tierLabel: 'Tier 2: Decisions & Repetition Loops (31-60)',
    title: 'Mission 44: Break Statement & Early Search Termination',
    category: 'Conditionals & Loops',
    themeIcon: '🛑',
    realLifeAnalogy: {
      story: 'Searching for a student roll number in a classroom roster: The moment you find roll number 42, stop looking and break out of the loop immediately!',
      physicalConcept: 'Jumps directly to loop exit label (`jmp .L_exit`), saving remaining unneeded iterations.',
      ruleOfThumb: 'Always use break when the search goal is satisfied to save CPU battery.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Linear search with break',
        description: 'Exits loop the moment target value is found.',
        code: `#include <stdio.h>

int main(void) {
    int target = 42;
    for (int roll = 40; roll <= 45; roll++) {
        if (roll == target) {
            printf("TARGET LOCATED: Roll #%d found! Stopping search.\\n", roll);
            break;
        }
        printf("Checking Roll #%d...\\n", roll);
    }
    return 0;
}`
      },
      optimizedPro: {
        name: 'Guarded loop break',
        description: 'Clean break pattern.',
        code: `#include <stdio.h>

int main(void) {
    for (int r = 40; r <= 45; r++) {
        if (r == 42) { printf("TARGET LOCATED: Roll #%d found! Stopping search.\\n", r); break; }
        printf("Checking Roll #%d...\\n", r);
    }
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'text',
      cpuRegisters: ['EAX', 'JMP exit'],
      assemblyNotes: 'cmp eax, 42; je .L_break_exit -> Jumps past loop body.',
      ramFootprint: '4 bytes for roll.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'p-44-1', code: '#include <stdio.h>\nint main(void) {', hint: 'Start program' },
        { id: 'p-44-2', code: '    int target = 42;', hint: 'Target variable' },
        { id: 'p-44-3', code: '    for (int roll = 40; roll <= 45; roll++) {\n        if (roll == target) {\n            printf("TARGET LOCATED: Roll #%d found! Stopping search.\\n", roll);\n            break;\n        }\n        printf("Checking Roll #%d...\\n", roll);\n    }', hint: 'Search and break' },
        { id: 'p-44-4', code: '    return 0;\n}', hint: 'Close' }
      ],
      correctOrder: ['p-44-1', 'p-44-2', 'p-44-3', 'p-44-4']
    },
    expectedOutput: 'Checking Roll #40...\nChecking Roll #41...\nTARGET LOCATED: Roll #42 found! Stopping search.',
    cKeywordsUsed: ['break', 'if', 'for', 'int', 'return', 'void'],
    daaComplexity: {
      timeComplexity: 'O(K) Best Case O(1)',
      spaceComplexity: 'O(1)',
      algorithmClass: 'Linear Search with Pruning'
    }
  },
  {
    id: 45,
    slug: 'level-45-continue-statement',
    tier: 'tier-2-decisions',
    tierLabel: 'Tier 2: Decisions & Repetition Loops (31-60)',
    title: 'Mission 45: Continue Statement & Skipping Even Seats',
    category: 'Conditionals & Loops',
    themeIcon: '⏭️',
    realLifeAnalogy: {
      story: 'Assigning odd window seats in a train compartment: If seat number is even, skip it immediately using continue and jump to the next seat!',
      physicalConcept: 'Jumps directly to the loop update expression (`i++`), bypassing remaining lines in the loop body.',
      ruleOfThumb: 'continue skips the REST of the current iteration without terminating the entire loop.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Skip even numbers via continue',
        description: 'Filters and prints only odd numbers.',
        code: `#include <stdio.h>

int main(void) {
    printf("Window Seats (Odd Only): ");
    for (int seat = 1; seat <= 6; seat++) {
        if (seat % 2 == 0) {
            continue; // Skip even seat
        }
        printf("%d ", seat);
    }
    printf("\\n");
    return 0;
}`
      },
      optimizedPro: {
        name: 'Bitwise parity continue',
        description: 'Uses (seat & 1) == 0 to detect even seats.',
        code: `#include <stdio.h>

int main(void) {
    printf("Window Seats (Odd Only): ");
    for (int s = 1; s <= 6; s++) {
        if ((s & 1) == 0) continue;
        printf("%d ", s);
    }
    putchar('\\n');
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'text',
      cpuRegisters: ['EAX', 'JMP loop_step'],
      assemblyNotes: 'test eax, 1; jz .L_loop_step -> Jumps straight to increment.',
      ramFootprint: '4 bytes for seat.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'p-45-1', code: '#include <stdio.h>\nint main(void) {', hint: 'Start program' },
        { id: 'p-45-2', code: '    printf("Window Seats (Odd Only): ");', hint: 'Print prefix' },
        { id: 'p-45-3', code: '    for (int seat = 1; seat <= 6; seat++) {\n        if (seat % 2 == 0) continue;\n        printf("%d ", seat);\n    }', hint: 'Continue loop' },
        { id: 'p-45-4', code: '    printf("\\n");\n    return 0;\n}', hint: 'Close' }
      ],
      correctOrder: ['p-45-1', 'p-45-2', 'p-45-3', 'p-45-4']
    },
    expectedOutput: 'Window Seats (Odd Only): 1 3 5 \n',
    cKeywordsUsed: ['continue', 'if', 'for', 'int', 'return', 'void'],
    daaComplexity: {
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      algorithmClass: 'Selective Filtering'
    }
  },
  {
    id: 46,
    slug: 'level-46-infinite-loop-watchdog',
    tier: 'tier-2-decisions',
    tierLabel: 'Tier 2: Decisions & Repetition Loops (31-60)',
    title: 'Mission 46: Infinite Loop (for(;;)) & Embedded Watchdog Timer',
    category: 'Conditionals & Loops',
    themeIcon: '♾️',
    realLifeAnalogy: {
      story: 'An embedded heart monitor or microwave controller: It runs an infinite loop listening for signals, protected by a watchdog safety counter that breaks if a threshold is hit.',
      physicalConcept: 'for (;;) emits an unconditional backward jump (`jmp .L_top`). Standard C idiom for OS kernels and servers.',
      ruleOfThumb: 'Always include a safety break condition inside infinite event loops.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Controlled infinite loop with watchdog',
        description: 'Breaks safely after 3 ticks.',
        code: `#include <stdio.h>

int main(void) {
    int ticks = 0;
    for (;;) {
        ticks++;
        printf("Heartbeat ping #%d...\\n", ticks);
        if (ticks >= 3) {
            printf("Watchdog cycle limit reached. Safely yielding.\\n");
            break;
        }
    }
    return 0;
}`
      },
      optimizedPro: {
        name: 'while(1) event loop',
        description: 'Canonical event loop syntax.',
        code: `#include <stdio.h>

int main(void) {
    int t = 0;
    while (1) {
        printf("Heartbeat ping #%d...\\n", ++t);
        if (t >= 3) break;
    }
    puts("Watchdog cycle limit reached. Safely yielding.");
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'text',
      cpuRegisters: ['EAX'],
      assemblyNotes: '.L_event: ... cmp eax, 3; jge .L_break; jmp .L_event',
      ramFootprint: '4 bytes for ticks.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'p-46-1', code: '#include <stdio.h>\nint main(void) {', hint: 'Start program' },
        { id: 'p-46-2', code: '    int ticks = 0;', hint: 'Init counter' },
        { id: 'p-46-3', code: '    for (;;) {\n        ticks++;\n        printf("Heartbeat ping #%d...\\n", ticks);\n        if (ticks >= 3) break;\n    }', hint: 'Event loop with break' },
        { id: 'p-46-4', code: '    printf("Watchdog cycle limit reached. Safely yielding.\\n");\n    return 0;\n}', hint: 'Close' }
      ],
      correctOrder: ['p-46-1', 'p-46-2', 'p-46-3', 'p-46-4']
    },
    expectedOutput: 'Heartbeat ping #1...\nHeartbeat ping #2...\nHeartbeat ping #3...\nWatchdog cycle limit reached. Safely yielding.',
    cKeywordsUsed: ['for', 'break', 'if', 'int', 'return', 'void'],
    daaComplexity: {
      timeComplexity: 'O(Ticks)',
      spaceComplexity: 'O(1)',
      algorithmClass: 'Event Polling Loop'
    }
  },
  {
    id: 47,
    slug: 'level-47-nested-loops-grid',
    tier: 'tier-2-decisions',
    tierLabel: 'Tier 2: Decisions & Repetition Loops (31-60)',
    title: 'Mission 47: Nested For Loops & 3x3 Coordinate Matrix',
    category: 'Conditionals & Loops',
    themeIcon: '🔲',
    realLifeAnalogy: {
      story: 'A tic-tac-toe game board or pixel display: 3 rows, and each row has 3 columns. The outer loop controls rows, the inner loop controls columns!',
      physicalConcept: 'For each single iteration of the outer loop, the inner loop completes its ENTIRE cycle (3 * 3 = 9 total iterations).',
      ruleOfThumb: 'Total executions = outer_count * inner_count. This is O(N^2) quadratic complexity.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Nested row-column printer',
        description: 'Iterates 3 rows and 3 columns.',
        code: `#include <stdio.h>

int main(void) {
    for (int row = 1; row <= 3; row++) {
        for (int col = 1; col <= 3; col++) {
            printf("[%d,%d] ", row, col);
        }
        printf("\\n");
    }
    return 0;
}`
      },
      optimizedPro: {
        name: 'Flattened 1D index mapping',
        description: 'Demonstrates row-major layout: index = row*cols + col.',
        code: `#include <stdio.h>

int main(void) {
    for (int r = 1; r <= 3; r++) {
        for (int c = 1; c <= 3; c++) printf("[%d,%d] ", r, c);
        putchar('\\n');
    }
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['EAX (row)', 'EBX (col)'],
      assemblyNotes: 'Nested loop instructions with inner loop register reset on every outer tick.',
      ramFootprint: '8 bytes on stack frame.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'p-47-1', code: '#include <stdio.h>\nint main(void) {', hint: 'Start program' },
        { id: 'p-47-2', code: '    for (int row = 1; row <= 3; row++) {', hint: 'Outer row loop' },
        { id: 'p-47-3', code: '        for (int col = 1; col <= 3; col++) {\n            printf("[%d,%d] ", row, col);\n        }\n        printf("\\n");\n    }', hint: 'Inner col loop and newline' },
        { id: 'p-47-4', code: '    return 0;\n}', hint: 'Close' }
      ],
      correctOrder: ['p-47-1', 'p-47-2', 'p-47-3', 'p-47-4']
    },
    expectedOutput: '[1,1] [1,2] [1,3] \n[2,1] [2,2] [2,3] \n[3,1] [3,2] [3,3] \n',
    cKeywordsUsed: ['for', 'int', 'return', 'void'],
    daaComplexity: {
      timeComplexity: 'O(R * C) Quadratic',
      spaceComplexity: 'O(1)',
      algorithmClass: 'Nested Iteration'
    }
  },
  {
    id: 48,
    slug: 'level-48-right-angled-triangle-pattern',
    tier: 'tier-2-decisions',
    tierLabel: 'Tier 2: Decisions & Repetition Loops (31-60)',
    title: 'Mission 48: Number Triangle Pattern & Dependent Loop Bounds',
    category: 'Conditionals & Loops',
    themeIcon: '📐',
    realLifeAnalogy: {
      story: 'Building a staircase with bricks: Step 1 has 1 brick, Step 2 has 2 bricks, Step 3 has 3 bricks. The inner loop\'s boundary depends directly on the outer loop\'s current row!',
      physicalConcept: 'Inner loop bound is variable (col <= row). Total iterations = N*(N+1)/2.',
      ruleOfThumb: 'When inner loop condition is col <= row, you produce triangular patterns.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Dependent inner loop',
        description: 'Prints right-angled number triangle up to row 4.',
        code: `#include <stdio.h>

int main(void) {
    for (int row = 1; row <= 4; row++) {
        for (int col = 1; col <= row; col++) {
            printf("%d ", col);
        }
        printf("\\n");
    }
    return 0;
}`
      },
      optimizedPro: {
        name: 'Staircase pattern',
        description: 'Clean formatted triangular output.',
        code: `#include <stdio.h>

int main(void) {
    for (int r = 1; r <= 4; r++) {
        for (int c = 1; c <= r; c++) printf("%d ", c);
        putchar('\\n');
    }
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['EAX (row)', 'EDX (col)'],
      assemblyNotes: 'cmp edx, eax -> Compares inner counter against current outer counter.',
      ramFootprint: '8 bytes on stack.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'p-48-1', code: '#include <stdio.h>\nint main(void) {', hint: 'Start program' },
        { id: 'p-48-2', code: '    for (int row = 1; row <= 4; row++) {', hint: 'Outer loop' },
        { id: 'p-48-3', code: '        for (int col = 1; col <= row; col++) {\n            printf("%d ", col);\n        }\n        printf("\\n");\n    }', hint: 'Inner dependent loop' },
        { id: 'p-48-4', code: '    return 0;\n}', hint: 'Close' }
      ],
      correctOrder: ['p-48-1', 'p-48-2', 'p-48-3', 'p-48-4']
    },
    expectedOutput: '1 \n1 2 \n1 2 3 \n1 2 3 4 \n',
    cKeywordsUsed: ['for', 'int', 'return', 'void'],
    daaComplexity: {
      timeComplexity: 'O(N^2 / 2)',
      spaceComplexity: 'O(1)',
      algorithmClass: 'Pattern Printing'
    }
  },
  {
    id: 49,
    slug: 'level-49-multiplication-table',
    tier: 'tier-2-decisions',
    tierLabel: 'Tier 2: Decisions & Repetition Loops (31-60)',
    title: 'Mission 49: Multiplication Table Generator (Table of 7)',
    category: 'Conditionals & Loops',
    themeIcon: '✖️',
    realLifeAnalogy: {
      story: 'Reciting times tables at school: 7 x 1 = 7, 7 x 2 = 14... up to 7 x 5 = 35. The loop counter acts as the multiplier on each step.',
      physicalConcept: 'Loop counter multiplies constant multiplicand on each clock cycle.',
      ruleOfThumb: 'Formatted printing (%d x %d = %d) makes tables clean and readable.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Multiplication table loop',
        description: 'Generates times table of 7 up to 5.',
        code: `#include <stdio.h>

int main(void) {
    int tableNum = 7;
    for (int i = 1; i <= 5; i++) {
        printf("%d x %d = %d\\n", tableNum, i, tableNum * i);
    }
    return 0;
}`
      },
      optimizedPro: {
        name: 'Repeated addition optimization',
        description: 'Using addition (running += tableNum) to avoid multiplication instructions.',
        code: `#include <stdio.h>

int main(void) {
    int num = 7, product = 0;
    for (int i = 1; i <= 5; i++) {
        product += num;
        printf("%d x %d = %d\\n", num, i, product);
    }
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['EAX', 'ECX'],
      assemblyNotes: 'imul eax, ecx, 7 -> Multiplication instruction with immediate operand 7.',
      ramFootprint: '8 bytes on stack.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'p-49-1', code: '#include <stdio.h>\nint main(void) {', hint: 'Start program' },
        { id: 'p-49-2', code: '    int tableNum = 7;', hint: 'Table variable' },
        { id: 'p-49-3', code: '    for (int i = 1; i <= 5; i++) {\n        printf("%d x %d = %d\\n", tableNum, i, tableNum * i);\n    }', hint: 'Table loop' },
        { id: 'p-49-4', code: '    return 0;\n}', hint: 'Close' }
      ],
      correctOrder: ['p-49-1', 'p-49-2', 'p-49-3', 'p-49-4']
    },
    expectedOutput: '7 x 1 = 7\n7 x 2 = 14\n7 x 3 = 21\n7 x 4 = 28\n7 x 5 = 35',
    cKeywordsUsed: ['for', 'int', 'return', 'void'],
    daaComplexity: {
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      algorithmClass: 'Table Generation'
    }
  },
  {
    id: 50,
    slug: 'level-50-sum-of-digits',
    tier: 'tier-2-decisions',
    tierLabel: 'Tier 2: Decisions & Repetition Loops (31-60)',
    title: 'Mission 50: Digit Extraction Algorithm & Sum of Digits',
    category: 'Conditionals & Loops',
    themeIcon: '🔢',
    realLifeAnalogy: {
      story: 'Checksum validation on bank account numbers: Take number 456. Extract last digit (456 % 10 = 6), chop it off (456 / 10 = 45), repeat! 6 + 5 + 4 = 15.',
      physicalConcept: 'Base-10 division loop: Repeatedly extracts lowest decimal digit until number reaches 0.',
      ruleOfThumb: 'rem = n % 10 extracts the rightmost digit; n /= 10 removes it.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Digit extraction while loop',
        description: 'Iteratively extracts and sums all digits.',
        code: `#include <stdio.h>

int main(void) {
    int num = 456;
    int sum = 0;
    int temp = num;

    while (temp > 0) {
        sum += temp % 10;
        temp /= 10;
    }
    printf("Sum of digits of %d = %d\\n", num, sum);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Compact digit extractor',
        description: 'In-line digit loop.',
        code: `#include <stdio.h>

int main(void) {
    int n = 456, s = 0;
    for (int t = n; t > 0; t /= 10) s += t % 10;
    printf("Sum of digits of %d = %d\\n", n, s);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['EAX (quotient)', 'EDX (remainder digit)'],
      assemblyNotes: 'idiv 10 -> Simultaneously produces next quotient and digit remainder in 1 instruction.',
      ramFootprint: '12 bytes on stack.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'p-50-1', code: '#include <stdio.h>\nint main(void) {', hint: 'Start program' },
        { id: 'p-50-2', code: '    int num = 456, sum = 0, temp = num;', hint: 'Init variables' },
        { id: 'p-50-3', code: '    while (temp > 0) {\n        sum += temp % 10;\n        temp /= 10;\n    }', hint: 'Digit extraction loop' },
        { id: 'p-50-4', code: '    printf("Sum of digits of %d = %d\\n", num, sum);\n    return 0;\n}', hint: 'Print and close' }
      ],
      correctOrder: ['p-50-1', 'p-50-2', 'p-50-3', 'p-50-4']
    },
    expectedOutput: 'Sum of digits of 456 = 15',
    cKeywordsUsed: ['while', 'int', 'return', 'void'],
    daaComplexity: {
      timeComplexity: 'O(log10 N) Number of Digits',
      spaceComplexity: 'O(1)',
      algorithmClass: 'Digit Extraction'
    }
  },
  {
    id: 51,
    slug: 'level-51-palindrome-number',
    tier: 'tier-2-decisions',
    tierLabel: 'Tier 2: Decisions & Repetition Loops (31-60)',
    title: 'Mission 51: Number Reversal & Palindrome Detector (1221)',
    category: 'Conditionals & Loops',
    themeIcon: '🔁',
    realLifeAnalogy: {
      story: 'Symmetric train coach numbers like 1221 or words like MADAM: Read forwards or backwards, they are identical! We reverse the number with math: rev = rev * 10 + digit.',
      physicalConcept: 'Reconstructs reversed integer in accumulator by shifting base-10 weight left.',
      ruleOfThumb: 'A palindrome satisfies: originalNumber == reversedNumber.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Math-based number reversal',
        description: 'Reverses integer and compares against original.',
        code: `#include <stdio.h>

int main(void) {
    int num = 1221;
    int reversed = 0;
    int temp = num;

    while (temp > 0) {
        int rem = temp % 10;
        reversed = reversed * 10 + rem;
        temp /= 10;
    }

    if (num == reversed) {
        printf("Number %d is a PALINDROME (Reversed: %d)\\n", num, reversed);
    } else {
        printf("Number %d is NOT a palindrome\\n", num);
    }
    return 0;
}`
      },
      optimizedPro: {
        name: 'Compact palindrome check',
        description: 'Loop reversal with ternary report.',
        code: `#include <stdio.h>

int main(void) {
    int n = 1221, rev = 0;
    for (int t = n; t > 0; t /= 10) rev = rev * 10 + t % 10;
    printf("Number %d is %s (Reversed: %d)\\n", n, (n == rev) ? "a PALINDROME" : "NOT a palindrome", rev);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['EAX', 'EDX', 'IMUL by 10'],
      assemblyNotes: 'imul eax, eax, 10; add eax, edx -> Base-10 digit shifting.',
      ramFootprint: '12 bytes on stack frame.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'p-51-1', code: '#include <stdio.h>\nint main(void) {', hint: 'Start program' },
        { id: 'p-51-2', code: '    int num = 1221, reversed = 0, temp = num;', hint: 'Init variables' },
        { id: 'p-51-3', code: '    while (temp > 0) {\n        reversed = reversed * 10 + (temp % 10);\n        temp /= 10;\n    }', hint: 'Reversal loop' },
        { id: 'p-51-4', code: '    if (num == reversed) printf("Number %d is a PALINDROME (Reversed: %d)\\n", num, reversed);', hint: 'Compare and print' },
        { id: 'p-51-5', code: '    return 0;\n}', hint: 'Close' }
      ],
      correctOrder: ['p-51-1', 'p-51-2', 'p-51-3', 'p-51-4', 'p-51-5']
    },
    expectedOutput: 'Number 1221 is a PALINDROME (Reversed: 1221)',
    cKeywordsUsed: ['while', 'if', 'else', 'int', 'return', 'void'],
    daaComplexity: {
      timeComplexity: 'O(log10 N) Digits',
      spaceComplexity: 'O(1)',
      algorithmClass: 'Symmetry Verification'
    }
  },
  {
    id: 52,
    slug: 'level-52-armstrong-number',
    tier: 'tier-2-decisions',
    tierLabel: 'Tier 2: Decisions & Repetition Loops (31-60)',
    title: 'Mission 52: Armstrong Number Detector (153 = 1^3 + 5^3 + 3^3)',
    category: 'Conditionals & Loops',
    themeIcon: '💪',
    realLifeAnalogy: {
      story: 'A magic mathematical lock: The combination 153 opens it because 1^3 + 5^3 + 3^3 = 1 + 125 + 27 = 153! The sum of the cubes of its digits equals the number itself.',
      physicalConcept: 'Digit decomposition combined with cubic power accumulation: sum += d * d * d.',
      ruleOfThumb: '3-digit Armstrong numbers include 153, 370, 371, 407.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Armstrong cubic accumulator',
        description: 'Extracts digits, computes cubes, and compares with original.',
        code: `#include <stdio.h>

int main(void) {
    int num = 153;
    int sum = 0;
    int temp = num;

    while (temp > 0) {
        int d = temp % 10;
        sum += d * d * d;
        temp /= 10;
    }

    if (sum == num) {
        printf("Number %d is an ARMSTRONG NUMBER (Sum of cubes: %d)\\n", num, sum);
    }
    return 0;
}`
      },
      optimizedPro: {
        name: 'Direct Armstrong test',
        description: 'Compact cubic sum calculation.',
        code: `#include <stdio.h>

int main(void) {
    int n = 153, sum = 0;
    for (int t = n; t > 0; t /= 10) { int d = t % 10; sum += d * d * d; }
    if (sum == n) printf("Number %d is an ARMSTRONG NUMBER (Sum of cubes: %d)\\n", n, sum);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['EAX', 'EDX', 'EBX'],
      assemblyNotes: 'imul edx, edx; imul edx, d; add eax, edx -> 3-cycle integer cubic calculation.',
      ramFootprint: '12 bytes on stack.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'p-52-1', code: '#include <stdio.h>\nint main(void) {', hint: 'Start program' },
        { id: 'p-52-2', code: '    int num = 153, sum = 0, temp = num;', hint: 'Init variables' },
        { id: 'p-52-3', code: '    while (temp > 0) {\n        int d = temp % 10;\n        sum += d * d * d;\n        temp /= 10;\n    }', hint: 'Cube accumulation' },
        { id: 'p-52-4', code: '    if (sum == num) printf("Number %d is an ARMSTRONG NUMBER (Sum of cubes: %d)\\n", num, sum);', hint: 'Check and print' },
        { id: 'p-52-5', code: '    return 0;\n}', hint: 'Close' }
      ],
      correctOrder: ['p-52-1', 'p-52-2', 'p-52-3', 'p-52-4', 'p-52-5']
    },
    expectedOutput: 'Number 153 is an ARMSTRONG NUMBER (Sum of cubes: 153)',
    cKeywordsUsed: ['while', 'if', 'int', 'return', 'void'],
    daaComplexity: {
      timeComplexity: 'O(log10 N)',
      spaceComplexity: 'O(1)',
      algorithmClass: 'Power Accumulation'
    }
  },
  {
    id: 53,
    slug: 'level-53-prime-number-checker',
    tier: 'tier-2-decisions',
    tierLabel: 'Tier 2: Decisions & Repetition Loops (31-60)',
    title: 'Mission 53: Prime Number Checker via Square-Root Trial Division',
    category: 'Conditionals & Loops',
    themeIcon: '🛡️',
    realLifeAnalogy: {
      story: 'RSA encryption security key testing: Is 29 prime? You do NOT need to check all 28 numbers! You only need to check up to sqrt(29) ~ 5. If no factor divides it, it is guaranteed prime!',
      physicalConcept: 'Loop condition: `i * i <= n`. Reduces time complexity from O(N) to O(sqrt(N))!',
      ruleOfThumb: 'Factors always occur in pairs: a * b = n. At least one factor must be <= sqrt(n).'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'O(sqrt(N)) Prime test',
        description: 'Tests divisibility up to sqrt(N) with early exit.',
        code: `#include <stdio.h>

int main(void) {
    int n = 29;
    int isPrime = 1;

    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) {
            isPrime = 0;
            break;
        }
    }

    if (isPrime) {
        printf("Security Key %d is a PRIME NUMBER\\n", n);
    } else {
        printf("Security Key %d is COMPOSITE\\n", n);
    }
    return 0;
}`
      },
      optimizedPro: {
        name: 'Step-2 Prime skipping',
        description: 'Tests 2 separately then increments by 2 for odd numbers.',
        code: `#include <stdio.h>

int main(void) {
    int n = 29, prime = 1;
    for (int i = 2; i * i <= n; i++) if (n % i == 0) { prime = 0; break; }
    printf("Security Key %d is %s\\n", n, prime ? "a PRIME NUMBER" : "COMPOSITE");
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['EAX', 'ECX', 'IDIV'],
      assemblyNotes: 'imul ecx, ecx; cmp ecx, eax; jg .done -> O(sqrt(N)) early termination in hardware.',
      ramFootprint: '8 bytes on stack.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'p-53-1', code: '#include <stdio.h>\nint main(void) {', hint: 'Start program' },
        { id: 'p-53-2', code: '    int n = 29, isPrime = 1;', hint: 'Init prime flag' },
        { id: 'p-53-3', code: '    for (int i = 2; i * i <= n; i++) {\n        if (n % i == 0) { isPrime = 0; break; }\n    }', hint: 'Trial division loop' },
        { id: 'p-53-4', code: '    if (isPrime) printf("Security Key %d is a PRIME NUMBER\\n", n);', hint: 'Print result' },
        { id: 'p-53-5', code: '    return 0;\n}', hint: 'Close' }
      ],
      correctOrder: ['p-53-1', 'p-53-2', 'p-53-3', 'p-53-4', 'p-53-5']
    },
    expectedOutput: 'Security Key 29 is a PRIME NUMBER',
    cKeywordsUsed: ['for', 'if', 'else', 'break', 'int', 'return', 'void'],
    daaComplexity: {
      timeComplexity: 'O(sqrt(N)) Square Root Time',
      spaceComplexity: 'O(1)',
      algorithmClass: 'Trial Division'
    }
  },
  {
    id: 54,
    slug: 'level-54-gcd-euclidean',
    tier: 'tier-2-decisions',
    tierLabel: 'Tier 2: Decisions & Repetition Loops (31-60)',
    title: 'Mission 54: Greatest Common Divisor (GCD) & Euclidean Algorithm',
    category: 'Conditionals & Loops',
    themeIcon: '➗',
    realLifeAnalogy: {
      story: 'Cutting square tiles to cover a 48cm x 18cm floor without leftover scraps: What is the largest tile size? Euclidean algorithm finds GCD: gcd(48, 18) = gcd(18, 12) = gcd(12, 6) = 6cm!',
      physicalConcept: 'Euclid\'s theorem: gcd(a, b) = gcd(b, a % b). Runs in logarithmic time O(log(min(a, b))).',
      ruleOfThumb: 'Repeated modulo until b becomes 0. The remaining a is the GCD!'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Iterative Euclidean algorithm',
        description: 'Repeatedly replaces (a, b) with (b, a % b).',
        code: `#include <stdio.h>

int main(void) {
    int a = 48;
    int b = 18;
    int origA = a, origB = b;

    while (b != 0) {
        int temp = b;
        b = a % b;
        a = temp;
    }
    printf("GCD / HCF of (%d, %d) = %d\\n", origA, origB, a);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Compact Euclidean loop',
        description: 'Inline modulo shift.',
        code: `#include <stdio.h>

int main(void) {
    int a = 48, b = 18, x = a, y = b;
    while (b) { int t = b; b = a % b; a = t; }
    printf("GCD / HCF of (%d, %d) = %d\\n", x, y, a);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['EAX', 'EBX', 'EDX'],
      assemblyNotes: 'Repeated idiv instruction. Rapidly halves values each iteration.',
      ramFootprint: '16 bytes on stack frame.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'p-54-1', code: '#include <stdio.h>\nint main(void) {', hint: 'Start program' },
        { id: 'p-54-2', code: '    int a = 48, b = 18, origA = 48, origB = 18;', hint: 'Init inputs' },
        { id: 'p-54-3', code: '    while (b != 0) {\n        int temp = b;\n        b = a % b;\n        a = temp;\n    }', hint: 'Euclidean loop' },
        { id: 'p-54-4', code: '    printf("GCD / HCF of (%d, %d) = %d\\n", origA, origB, a);', hint: 'Print GCD' },
        { id: 'p-54-5', code: '    return 0;\n}', hint: 'Close' }
      ],
      correctOrder: ['p-54-1', 'p-54-2', 'p-54-3', 'p-54-4', 'p-54-5']
    },
    expectedOutput: 'GCD / HCF of (48, 18) = 6',
    cKeywordsUsed: ['while', 'int', 'return', 'void'],
    daaComplexity: {
      timeComplexity: 'O(log(min(A, B))) Logarithmic',
      spaceComplexity: 'O(1)',
      algorithmClass: 'Euclidean Number Theory'
    }
  },
  {
    id: 55,
    slug: 'level-55-lcm-calculation',
    tier: 'tier-2-decisions',
    tierLabel: 'Tier 2: Decisions & Repetition Loops (31-60)',
    title: 'Mission 55: Least Common Multiple (LCM) & Railway Signal Sync',
    category: 'Conditionals & Loops',
    themeIcon: '🚆',
    realLifeAnalogy: {
      story: 'Two Indian Railway express trains: Train 1 arrives every 12 mins, Train 2 arrives every 18 mins. When will both trains meet at the platform together? LCM(12, 18) = 36 minutes!',
      physicalConcept: 'Mathematical relationship: a * b = gcd(a, b) * lcm(a, b). Therefore, LCM = (a * b) / GCD.',
      ruleOfThumb: 'Divide before multiplying to prevent integer overflow: (a / gcd) * b.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'LCM from GCD formula',
        description: 'Computes GCD first, then derives LCM.',
        code: `#include <stdio.h>

int main(void) {
    int a = 12, b = 18;
    int x = a, y = b;

    while (y != 0) {
        int temp = y;
        y = x % y;
        x = temp;
    }
    int gcd = x;
    int lcm = (a * b) / gcd;
    printf("LCM of Trains (%d, %d) = %d Minutes\\n", a, b, lcm);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Overflow safe LCM calculation',
        description: 'Divides first to prevent integer overflow.',
        code: `#include <stdio.h>

int main(void) {
    int a = 12, b = 18, x = a, y = b;
    while (y) { int t = y; y = x % y; x = t; }
    printf("LCM of Trains (%d, %d) = %d Minutes\\n", a, b, (a / x) * b);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['EAX', 'EBX'],
      assemblyNotes: 'GCD computed in loop, followed by single imul and idiv.',
      ramFootprint: '16 bytes on stack.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'p-55-1', code: '#include <stdio.h>\nint main(void) {', hint: 'Start program' },
        { id: 'p-55-2', code: '    int a = 12, b = 18, x = 12, y = 18;', hint: 'Init variables' },
        { id: 'p-55-3', code: '    while (y != 0) { int t = y; y = x % y; x = t; }\n    int lcm = (a * b) / x;', hint: 'GCD and LCM' },
        { id: 'p-55-4', code: '    printf("LCM of Trains (%d, %d) = %d Minutes\\n", a, b, lcm);', hint: 'Print LCM' },
        { id: 'p-55-5', code: '    return 0;\n}', hint: 'Close' }
      ],
      correctOrder: ['p-55-1', 'p-55-2', 'p-55-3', 'p-55-4', 'p-55-5']
    },
    expectedOutput: 'LCM of Trains (12, 18) = 36 Minutes',
    cKeywordsUsed: ['while', 'int', 'return', 'void'],
    daaComplexity: {
      timeComplexity: 'O(log(min(A, B)))',
      spaceComplexity: 'O(1)',
      algorithmClass: 'Number Theory'
    }
  },
  {
    id: 56,
    slug: 'level-56-power-loop',
    tier: 'tier-2-decisions',
    tierLabel: 'Tier 2: Decisions & Repetition Loops (31-60)',
    title: 'Mission 56: Exponent Power Calculation via Multiplicative Loop',
    category: 'Conditionals & Loops',
    themeIcon: '⚡',
    realLifeAnalogy: {
      story: 'Doubling bacteria or computer binary memory addressing: 2^5 = 2 * 2 * 2 * 2 * 2 = 32 addressable slots. The loop multiplies base repeatedly into power.',
      physicalConcept: 'Power accumulator starts at 1. Repeated multiplication instruction (`imul`).',
      ruleOfThumb: 'Any non-zero number to the power 0 is 1 (base^0 == 1).'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Iterative exponent power',
        description: 'Multiplies base exponent times.',
        code: `#include <stdio.h>

int main(void) {
    int base = 2;
    int exp = 5;
    long long result = 1;

    for (int i = 1; i <= exp; i++) {
        result *= base;
    }
    printf("%d raised to power %d = %lld\\n", base, exp, result);
    return 0;
}`
      },
      optimizedPro: {
        name: 'While exponent countdown',
        description: 'Decrements exponent counter.',
        code: `#include <stdio.h>

int main(void) {
    int b = 2, e = 5;
    long long res = 1;
    while (e--) res *= b;
    printf("2 raised to power 5 = %lld\\n", res);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['RAX (result)', 'ECX (base)'],
      assemblyNotes: 'imul rax, rcx -> Hardware 64-bit multiplier.',
      ramFootprint: '16 bytes on stack.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'p-56-1', code: '#include <stdio.h>\nint main(void) {', hint: 'Start program' },
        { id: 'p-56-2', code: '    int base = 2, exp = 5;\n    long long result = 1;', hint: 'Init variables' },
        { id: 'p-56-3', code: '    for (int i = 1; i <= exp; i++) {\n        result *= base;\n    }', hint: 'Exponent loop' },
        { id: 'p-56-4', code: '    printf("%d raised to power %d = %lld\\n", base, exp, result);', hint: 'Print result' },
        { id: 'p-56-5', code: '    return 0;\n}', hint: 'Close' }
      ],
      correctOrder: ['p-56-1', 'p-56-2', 'p-56-3', 'p-56-4', 'p-56-5']
    },
    expectedOutput: '2 raised to power 5 = 32',
    cKeywordsUsed: ['for', 'int', 'long', 'return', 'void'],
    daaComplexity: {
      timeComplexity: 'O(Exp) Linear Exponent',
      spaceComplexity: 'O(1)',
      algorithmClass: 'Exponentiation'
    }
  },
  {
    id: 57,
    slug: 'level-57-binary-bit-printer',
    tier: 'tier-2-decisions',
    tierLabel: 'Tier 2: Decisions & Repetition Loops (31-60)',
    title: 'Mission 57: Binary Bit Printer & Silicon Register Inspection',
    category: 'Conditionals & Loops',
    themeIcon: '0️⃣',
    realLifeAnalogy: {
      story: 'Looking directly at the physical voltage wires of a CPU register: Number 42 in binary is 00101010. We test each bit from bit 7 down to bit 0 using (num >> bit) & 1!',
      physicalConcept: 'Right-shifting by `bit` brings that bit to position 0; masking with 1 isolates its binary value.',
      ruleOfThumb: '(n >> bit) & 1 evaluates to 1 if the bit is high, 0 if low.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: '8-bit binary inspection loop',
        description: 'Iterates from bit 7 down to 0.',
        code: `#include <stdio.h>

int main(void) {
    unsigned char byteVal = 42;
    printf("Binary of %d: ", byteVal);

    for (int bit = 7; bit >= 0; bit--) {
        int bitVal = (byteVal >> bit) & 1;
        printf("%d", bitVal);
    }
    printf("\\n");
    return 0;
}`
      },
      optimizedPro: {
        name: 'Bitmask test without shift',
        description: 'Using (byteVal & (1 << bit)) predicate.',
        code: `#include <stdio.h>

int main(void) {
    unsigned char val = 42;
    printf("Binary of %d: ", val);
    for (int b = 7; b >= 0; b--) putchar((val & (1 << b)) ? '1' : '0');
    putchar('\\n');
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['AL', 'CL (shift count)'],
      assemblyNotes: 'shr al, cl; and al, 1 -> Hardware bit extraction.',
      ramFootprint: '5 bytes on stack.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'p-57-1', code: '#include <stdio.h>\nint main(void) {', hint: 'Start program' },
        { id: 'p-57-2', code: '    unsigned char byteVal = 42;\n    printf("Binary of %d: ", byteVal);', hint: 'Init byte' },
        { id: 'p-57-3', code: '    for (int bit = 7; bit >= 0; bit--) {\n        printf("%d", (byteVal >> bit) & 1);\n    }', hint: 'Bit print loop' },
        { id: 'p-57-4', code: '    printf("\\n");\n    return 0;\n}', hint: 'Close' }
      ],
      correctOrder: ['p-57-1', 'p-57-2', 'p-57-3', 'p-57-4']
    },
    expectedOutput: 'Binary of 42: 00101010\n',
    cKeywordsUsed: ['for', 'unsigned', 'char', 'int', 'return', 'void'],
    daaComplexity: {
      timeComplexity: 'O(8) Exactly 8 Cycles',
      spaceComplexity: 'O(1)',
      algorithmClass: 'Bitwise Introspection'
    }
  },
  {
    id: 58,
    slug: 'level-58-collatz-conjecture',
    tier: 'tier-2-decisions',
    tierLabel: 'Tier 2: Decisions & Repetition Loops (31-60)',
    title: 'Mission 58: Collatz Conjecture (Hailstone 3n + 1 Dynamics)',
    category: 'Conditionals & Loops',
    themeIcon: '📉',
    realLifeAnalogy: {
      story: 'The most famous unsolved problem in mathematics: Start with any number (e.g. 6). If even, divide by 2. If odd, multiply by 3 and add 1. It bounces up and down like a hailstone until it reaches 1!',
      physicalConcept: 'Non-deterministic loop bound: Number of iterations is variable and cannot be predicted by a fixed formula.',
      ruleOfThumb: 'while (n != 1) loops until the base attractor 1 is reached.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Collatz hailstone trajectory',
        description: 'Simulates trajectory of n = 6 until 1.',
        code: `#include <stdio.h>

int main(void) {
    int n = 6;
    printf("Collatz Sequence for %d: ", n);

    while (n != 1) {
        printf("%d -> ", n);
        if (n % 2 == 0) {
            n = n / 2;
        } else {
            n = 3 * n + 1;
        }
    }
    printf("1\\n");
    return 0;
}`
      },
      optimizedPro: {
        name: 'Ternary Collatz step',
        description: 'Ternary update with bitwise even check.',
        code: `#include <stdio.h>

int main(void) {
    int n = 6;
    printf("Collatz Sequence for 6: ");
    while (n != 1) {
        printf("%d -> ", n);
        n = (n & 1) ? (3 * n + 1) : (n >> 1);
    }
    puts("1");
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['EAX', 'TEST instruction'],
      assemblyNotes: 'test eax, 1; jnz .odd; sar eax, 1; jmp .next; .odd: lea eax, [eax*2 + eax + 1]',
      ramFootprint: '4 bytes for n.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'p-58-1', code: '#include <stdio.h>\nint main(void) {', hint: 'Start program' },
        { id: 'p-58-2', code: '    int n = 6;\n    printf("Collatz Sequence for %d: ", n);', hint: 'Init n' },
        { id: 'p-58-3', code: '    while (n != 1) {\n        printf("%d -> ", n);\n        n = (n % 2 == 0) ? (n / 2) : (3 * n + 1);\n    }', hint: 'Hailstone loop' },
        { id: 'p-58-4', code: '    printf("1\\n");\n    return 0;\n}', hint: 'Close' }
      ],
      correctOrder: ['p-58-1', 'p-58-2', 'p-58-3', 'p-58-4']
    },
    expectedOutput: 'Collatz Sequence for 6: 6 -> 3 -> 10 -> 5 -> 16 -> 8 -> 4 -> 2 -> 1',
    cKeywordsUsed: ['while', 'if', 'else', 'int', 'return', 'void'],
    daaComplexity: {
      timeComplexity: 'O(Steps) Variable',
      spaceComplexity: 'O(1)',
      algorithmClass: 'Dynamic Iteration'
    }
  },
  {
    id: 59,
    slug: 'level-59-atm-denomination-splitter',
    tier: 'tier-2-decisions',
    tierLabel: 'Tier 2: Decisions & Repetition Loops (31-60)',
    title: 'Mission 59: Indian ATM Cash Denomination Greedy Splitter',
    category: 'Conditionals & Loops',
    themeIcon: '💵',
    realLifeAnalogy: {
      story: 'Withdrawing Rs. 2800 from HDFC ATM: The ATM greedy algorithm computes the minimum number of physical notes: 5 x Rs. 500 notes (Rs. 2500), 1 x Rs. 200 note (Rs. 200), and 1 x Rs. 100 note (Rs. 100)!',
      physicalConcept: 'Greedy choice property: Repeated division by largest available denomination.',
      ruleOfThumb: 'notes = amount / denomination; amount %= denomination.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Greedy note denomination algorithm',
        description: 'Splits amount into 500, 200, and 100 rupee notes.',
        code: `#include <stdio.h>

int main(void) {
    int amount = 2800;
    int notes500 = amount / 500;
    amount %= 500;

    int notes200 = amount / 200;
    amount %= 200;

    int notes100 = amount / 100;
    amount %= 100;

    printf("ATM DISPENSE: %d x Rs.500 | %d x Rs.200 | %d x Rs.100\\n",
           notes500, notes200, notes100);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Loop denomination array',
        description: 'Iterates through array of currency denominations.',
        code: `#include <stdio.h>

int main(void) {
    int amt = 2800;
    int denoms[] = {500, 200, 100};
    int counts[3] = {0};
    for (int i = 0; i < 3; i++) {
        counts[i] = amt / denoms[i];
        amt %= denoms[i];
    }
    printf("ATM DISPENSE: %d x Rs.500 | %d x Rs.200 | %d x Rs.100\\n", counts[0], counts[1], counts[2]);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['EAX', 'EDX'],
      assemblyNotes: 'Pair of idiv instructions computing note quotient and remaining balance.',
      ramFootprint: '16 bytes on stack.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'p-59-1', code: '#include <stdio.h>\nint main(void) {', hint: 'Start program' },
        { id: 'p-59-2', code: '    int amount = 2800;\n    int n500 = amount / 500; amount %= 500;', hint: '500 notes' },
        { id: 'p-59-3', code: '    int n200 = amount / 200; amount %= 200;\n    int n100 = amount / 100; amount %= 100;', hint: '200 and 100 notes' },
        { id: 'p-59-4', code: '    printf("ATM DISPENSE: %d x Rs.500 | %d x Rs.200 | %d x Rs.100\\n", n500, n200, n100);', hint: 'Print dispense' },
        { id: 'p-59-5', code: '    return 0;\n}', hint: 'Close' }
      ],
      correctOrder: ['p-59-1', 'p-59-2', 'p-59-3', 'p-59-4', 'p-59-5']
    },
    expectedOutput: 'ATM DISPENSE: 5 x Rs.500 | 1 x Rs.200 | 1 x Rs.100',
    cKeywordsUsed: ['int', 'return', 'void'],
    daaComplexity: {
      timeComplexity: 'O(1) Greedy Steps',
      spaceComplexity: 'O(1)',
      algorithmClass: 'Greedy Denomination'
    }
  },
  {
    id: 60,
    slug: 'level-60-tier-2-capstone-traffic-controller',
    tier: 'tier-2-decisions',
    tierLabel: 'Tier 2: Decisions & Repetition Loops (31-60)',
    title: 'Mission 60: Tier 2 Capstone: Delhi Traffic Chowk Multi-State Controller',
    category: 'Conditionals & Loops',
    themeIcon: '🚦',
    realLifeAnalogy: {
      story: 'The Ultimate Tier 2 Mastery Test: Controlling traffic lights at Connaught Place chowk! Cycles through RED (Halt), YELLOW (Ready), and GREEN (Pass) states using switch, loops, and conditions.',
      physicalConcept: 'Finite State Machine (FSM): System transitions deterministically from one discrete state to the next.',
      ruleOfThumb: 'FSMs form the backbone of all automotive controllers, game engines, and network protocols.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Complete 3-state traffic controller',
        description: 'Iterates through 3 full traffic light cycles.',
        code: `#include <stdio.h>

int main(void) {
    printf("=== CONNAUGHT PLACE TRAFFIC SIGNAL CONTROLLER ===\\n");
    for (int cycle = 1; cycle <= 3; cycle++) {
        switch(cycle) {
            case 1:
                printf("[STATE 1] RED LIGHT    : All Vehicles Halt (60s)\\n");
                break;
            case 2:
                printf("[STATE 2] YELLOW LIGHT : Engines Start & Prepare (5s)\\n");
                break;
            case 3:
                printf("[STATE 3] GREEN LIGHT  : Traffic Flows Smoothly (45s)\\n");
                break;
        }
    }
    printf("Chowk cycle sequence completed successfully.\\n");
    return 0;
}`
      },
      optimizedPro: {
        name: 'Lookup state machine',
        description: 'Table-driven state machine transition.',
        code: `#include <stdio.h>

int main(void) {
    const char *states[] = {"", "RED LIGHT    : All Vehicles Halt (60s)", "YELLOW LIGHT : Engines Start & Prepare (5s)", "GREEN LIGHT  : Traffic Flows Smoothly (45s)"};
    puts("=== CONNAUGHT PLACE TRAFFIC SIGNAL CONTROLLER ===");
    for (int i = 1; i <= 3; i++) printf("[STATE %d] %s\\n", i, states[i]);
    puts("Chowk cycle sequence completed successfully.");
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'text',
      cpuRegisters: ['EAX', 'Jump Table'],
      assemblyNotes: 'Finite State Machine loop with hardware jump table branch execution.',
      ramFootprint: '8 bytes on stack frame.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'p-60-1', code: '#include <stdio.h>\nint main(void) {', hint: 'Start program' },
        { id: 'p-60-2', code: '    printf("=== CONNAUGHT PLACE TRAFFIC SIGNAL CONTROLLER ===\\n");', hint: 'Banner' },
        { id: 'p-60-3', code: '    for (int cycle = 1; cycle <= 3; cycle++) {\n        switch(cycle) {\n            case 1: printf("[STATE 1] RED LIGHT    : All Vehicles Halt (60s)\\n"); break;\n            case 2: printf("[STATE 2] YELLOW LIGHT : Engines Start & Prepare (5s)\\n"); break;\n            case 3: printf("[STATE 3] GREEN LIGHT  : Traffic Flows Smoothly (45s)\\n"); break;\n        }\n    }', hint: 'FSM loop and switch' },
        { id: 'p-60-4', code: '    printf("Chowk cycle sequence completed successfully.\\n");\n    return 0;\n}', hint: 'Close' }
      ],
      correctOrder: ['p-60-1', 'p-60-2', 'p-60-3', 'p-60-4']
    },
    expectedOutput: '=== CONNAUGHT PLACE TRAFFIC SIGNAL CONTROLLER ===\n[STATE 1] RED LIGHT    : All Vehicles Halt (60s)\n[STATE 2] YELLOW LIGHT : Engines Start & Prepare (5s)\n[STATE 3] GREEN LIGHT  : Traffic Flows Smoothly (45s)\nChowk cycle sequence completed successfully.',
    cKeywordsUsed: ['for', 'switch', 'case', 'break', 'int', 'return', 'void'],
    daaComplexity: {
      timeComplexity: 'O(Cycles) Finite State Machine',
      spaceComplexity: 'O(1)',
      algorithmClass: 'FSM State Controller'
    }
  }
];

