import { MasterCurriculumItem } from './types';

export const TIER_1_LEVELS: MasterCurriculumItem[] = [
  {
    id: 1,
    slug: 'level-1-hello-world',
    tier: 'tier-1-foundation',
    tierLabel: 'Tier 1: Foundations & Silicon Memory (1-30)',
    title: 'Mission 1: Hello World & Terminal Output',
    category: 'Foundations & Operators',
    themeIcon: '👋',
    realLifeAnalogy: {
      story: 'Printing your first boarding pass at the railway station! You tell the terminal printer: display this text message for the traveler.',
      physicalConcept: 'CPU sends ASCII character bytes to stdout stream buffer mapped to display terminal video memory.',
      ruleOfThumb: 'Every C program starts inside int main(void) and loads tools with #include <stdio.h>.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Standard ISO C main',
        description: 'Clean canonical entry point with return code 0.',
        code: `#include <stdio.h>

int main(void) {
    printf("Namaste, World! Welcome to C Engineering.\\n");
    return 0;
}`
      },
      optimizedPro: {
        name: 'Direct puts streaming',
        description: 'Uses puts() to write strings without format string parsing overhead.',
        code: `#include <stdio.h>

int main(void) {
    puts("Namaste, World! Welcome to C Engineering.");
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'rodata',
      cpuRegisters: ['RDI (first argument)', 'RAX (return status)'],
      assemblyNotes: 'lea rdi, [rip + .LC0]; call puts; mov eax, 0; ret',
      ramFootprint: '42 bytes stored in .rodata read-only memory segment.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'p-1-1', code: '#include <stdio.h>', hint: 'Load standard I/O library' },
        { id: 'p-1-2', code: 'int main(void) {', hint: 'The main entrance door' },
        { id: 'p-1-3', code: '    printf("Namaste, World! Welcome to C Engineering.\\n");', hint: 'Print the greeting' },
        { id: 'p-1-4', code: '    return 0;\n}', hint: 'Return 0 and close program' }
      ],
      correctOrder: ['p-1-1', 'p-1-2', 'p-1-3', 'p-1-4']
    },
    expectedOutput: 'Namaste, World! Welcome to C Engineering.',
    cKeywordsUsed: ['int', 'void', 'return'],
    daaComplexity: {
      timeComplexity: 'O(1) Constant Time',
      spaceComplexity: 'O(1) Flash Storage',
      algorithmClass: 'Basic I/O Operation'
    }
  },
  {
    id: 2,
    slug: 'level-2-integer-variables',
    tier: 'tier-1-foundation',
    tierLabel: 'Tier 1: Foundations & Silicon Memory (1-30)',
    title: 'Mission 2: Integer Variables & Canteen Billing',
    category: 'Foundations & Operators',
    themeIcon: '☕',
    realLifeAnalogy: {
      story: 'Ordering at the campus canteen: 1 Masala Chai for Rs. 15 and 1 Samosa for Rs. 20. The cashier reserves two slots in memory and adds them.',
      physicalConcept: 'Allocates two 4-byte 32-bit two\'s complement integer slots in the stack frame RAM.',
      ruleOfThumb: 'Use %d format specifier to print signed 32-bit integers in printf.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Explicit Variable Slots',
        description: 'Separate named memory locations for chai and samosa.',
        code: `#include <stdio.h>

int main(void) {
    int chai = 15;
    int samosa = 20;
    int total = chai + samosa;
    printf("Canteen Bill: Rs. %d (Rupees)\\n", total);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Register Optimized Addition',
        description: 'Direct ALU accumulator calculation avoiding unnecessary stack stores.',
        code: `#include <stdio.h>

int main(void) {
    const int chai = 15, samosa = 20;
    printf("Canteen Bill: Rs. %d (Rupees)\\n", chai + samosa);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['EDI', 'ESI', 'EAX (ALU accumulator)'],
      assemblyNotes: 'mov DWORD PTR [rbp-4], 15; add DWORD PTR [rbp-4], 20; in ALU.',
      ramFootprint: '8 bytes on active stack frame (4 bytes per int).'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'p-2-1', code: '#include <stdio.h>', hint: 'Header file' },
        { id: 'p-2-2', code: 'int main(void) {', hint: 'Main start' },
        { id: 'p-2-3', code: '    int chai = 15, samosa = 20;', hint: 'Declare variables' },
        { id: 'p-2-4', code: '    printf("Canteen Bill: Rs. %d (Rupees)\\n", chai + samosa);', hint: 'Print bill' },
        { id: 'p-2-5', code: '    return 0;\n}', hint: 'Return 0 and close' }
      ],
      correctOrder: ['p-2-1', 'p-2-2', 'p-2-3', 'p-2-4', 'p-2-5']
    },
    expectedOutput: 'Canteen Bill: Rs. 35 (Rupees)',
    cKeywordsUsed: ['int', 'void', 'return'],
    daaComplexity: {
      timeComplexity: 'O(1) 1 ALU Cycle',
      spaceComplexity: 'O(1) Stack',
      algorithmClass: 'Integer Arithmetic'
    }
  },
  {
    id: 3,
    slug: 'level-3-char-and-ascii',
    tier: 'tier-1-foundation',
    tierLabel: 'Tier 1: Foundations & Silicon Memory (1-30)',
    title: 'Mission 3: Character Data & ASCII Byte Codes',
    category: 'Foundations & Operators',
    themeIcon: '🔤',
    realLifeAnalogy: {
      story: 'Your exam roll call section letter "A". On paper it is a letter, but on the computer chip it is stored as numerical binary code 65!',
      physicalConcept: 'A char is strictly an 8-bit (1-byte) integer holding ASCII values from 0 to 127.',
      ruleOfThumb: 'Use %c to print the symbol, %d to print its underlying numerical ASCII byte code.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Char declaration and double format',
        description: 'Inspects character as both glyph and integer.',
        code: `#include <stdio.h>

int main(void) {
    char section = 'A';
    printf("Section: %c | ASCII Byte Code: %d\\n", section, section);
    return 0;
}`
      },
      optimizedPro: {
        name: 'ASCII offset math',
        description: 'Demonstrates that chars can undergo arithmetic directly in hardware.',
        code: `#include <stdio.h>

int main(void) {
    char letter = 'A';
    printf("Letter %c is ASCII %d (Next letter: %c)\\n", letter, letter, letter + 1);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['AL (low 8-bit accumulator)'],
      assemblyNotes: 'mov BYTE PTR [rbp-1], 65; movsx eax, BYTE PTR [rbp-1]',
      ramFootprint: '1 byte on stack frame.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'p-3-1', code: '#include <stdio.h>\nint main(void) {', hint: 'Start program' },
        { id: 'p-3-2', code: "    char section = 'A';", hint: 'Declare char variable' },
        { id: 'p-3-3', code: '    printf("Section: %c | ASCII Byte Code: %d\\n", section, section);', hint: 'Print char and code' },
        { id: 'p-3-4', code: '    return 0;\n}', hint: 'Exit program' }
      ],
      correctOrder: ['p-3-1', 'p-3-2', 'p-3-3', 'p-3-4']
    },
    expectedOutput: 'Section: A | ASCII Byte Code: 65',
    cKeywordsUsed: ['char', 'int', 'return', 'void'],
    daaComplexity: {
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)',
      algorithmClass: 'Data Representation'
    }
  },
  {
    id: 4,
    slug: 'level-4-float-decimals',
    tier: 'tier-1-foundation',
    tierLabel: 'Tier 1: Foundations & Silicon Memory (1-30)',
    title: 'Mission 4: Single-Precision Floats & Petrol Pricing',
    category: 'Foundations & Operators',
    themeIcon: '⛽',
    realLifeAnalogy: {
      story: 'Filling petrol at a pump in Delhi: Rate is Rs. 96.72 per liter. Integers cannot store paise decimals, so we use float!',
      physicalConcept: '32-bit IEEE 754 format: 1 sign bit, 8 exponent bits, 23 mantissa bits.',
      ruleOfThumb: 'Always append \'f\' to float literals (e.g. 96.72f) so compiler doesn\'t promote them to double.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Standard float format',
        description: 'Using %.2f to control decimal point precision.',
        code: `#include <stdio.h>

int main(void) {
    float petrolRate = 96.72f;
    float liters = 3.5f;
    float total = petrolRate * liters;
    printf("Petrol Bill: Rs. %.2f (Rupees)\\n", total);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Formatted Currency Rounding',
        description: 'Inline float calculation with 2 decimal places precision.',
        code: `#include <stdio.h>

int main(void) {
    const float rate = 96.72f, qty = 3.5f;
    printf("Petrol Bill: Rs. %.2f (Rupees)\\n", rate * qty);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['XMM0', 'XMM1 (FPU / SSE registers)'],
      assemblyNotes: 'mulss xmm0, xmm1 -> Hardware single-precision floating point multiplier.',
      ramFootprint: '4 bytes per float variable on stack.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'p-4-1', code: '#include <stdio.h>\nint main(void) {', hint: 'Header and entry' },
        { id: 'p-4-2', code: '    float petrolRate = 96.72f, liters = 3.5f;', hint: 'Declare floats' },
        { id: 'p-4-3', code: '    printf("Petrol Bill: Rs. %.2f (Rupees)\\n", petrolRate * liters);', hint: 'Print formatted float' },
        { id: 'p-4-4', code: '    return 0;\n}', hint: 'Return 0 and close' }
      ],
      correctOrder: ['p-4-1', 'p-4-2', 'p-4-3', 'p-4-4']
    },
    expectedOutput: 'Petrol Bill: Rs. 338.52 (Rupees)',
    cKeywordsUsed: ['float', 'int', 'return', 'void'],
    daaComplexity: {
      timeComplexity: 'O(1) FPU Cycle',
      spaceComplexity: 'O(1)',
      algorithmClass: 'Floating Point Arithmetic'
    }
  },
  {
    id: 5,
    slug: 'level-5-double-precision',
    tier: 'tier-1-foundation',
    tierLabel: 'Tier 1: Foundations & Silicon Memory (1-30)',
    title: 'Mission 5: Double Precision & GPS Coordinates',
    category: 'Foundations & Operators',
    themeIcon: '🛰️',
    realLifeAnalogy: {
      story: 'GPS satellite navigation for ISRO rockets or Google Maps: A difference of 0.00001 degrees shifts location by meters! We need double precision.',
      physicalConcept: '64-bit IEEE 754 format with 53 bits of precision (~15-17 significant decimal digits).',
      ruleOfThumb: 'Double uses 8 bytes of RAM and provides twice the precision of float.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Double coordinates formatting',
        description: 'Using %.6lf to print micro-degree coordinates.',
        code: `#include <stdio.h>

int main(void) {
    double latitude = 28.613939;
    double longitude = 77.209021;
    printf("India Gate Coordinates: Lat %.6lf, Long %.6lf\\n", latitude, longitude);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Const double coordinates',
        description: 'Direct register placement for high-speed location lookup.',
        code: `#include <stdio.h>

int main(void) {
    const double lat = 28.613939, lon = 77.209021;
    printf("India Gate Coordinates: Lat %.6lf, Long %.6lf\\n", lat, lon);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['XMM0', 'XMM1 (64-bit double precision registers)'],
      assemblyNotes: 'movsd qword ptr [rbp-8], xmm0 -> 64-bit memory write.',
      ramFootprint: '8 bytes per double on stack frame.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'p-5-1', code: '#include <stdio.h>\nint main(void) {', hint: 'Start program' },
        { id: 'p-5-2', code: '    double latitude = 28.613939, longitude = 77.209021;', hint: 'Declare doubles' },
        { id: 'p-5-3', code: '    printf("India Gate Coordinates: Lat %.6lf, Long %.6lf\\n", latitude, longitude);', hint: 'Print coordinates' },
        { id: 'p-5-4', code: '    return 0;\n}', hint: 'Return 0 and close' }
      ],
      correctOrder: ['p-5-1', 'p-5-2', 'p-5-3', 'p-5-4']
    },
    expectedOutput: 'India Gate Coordinates: Lat 28.613939, Long 77.209021',
    cKeywordsUsed: ['double', 'int', 'return', 'void'],
    daaComplexity: {
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)',
      algorithmClass: 'High-Precision Math'
    }
  },
  {
    id: 6,
    slug: 'level-6-modulo-operator',
    tier: 'tier-1-foundation',
    tierLabel: 'Tier 1: Foundations & Silicon Memory (1-30)',
    title: 'Mission 6: Modulo Operator & Calendar Days Clock',
    category: 'Foundations & Operators',
    themeIcon: '⏰',
    realLifeAnalogy: {
      story: 'Today is Monday (Day 1). What day of the week will it be after 17 days? Weeks cycle every 7 days! 17 % 7 = 3 days after Monday.',
      physicalConcept: 'CPU division instruction (`idiv`) computes both the quotient in EAX and remainder in EDX simultaneously.',
      ruleOfThumb: 'Modulo (%) gives the remainder. N % 2 == 0 checks if a number is even!'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Remainder arithmetic',
        description: 'Calculates the remaining days after full weeks.',
        code: `#include <stdio.h>

int main(void) {
    int totalDays = 17;
    int remaining = totalDays % 7;
    printf("17 Days = 2 Full Weeks and %d Extra Days\\n", remaining);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Direct remainder streaming',
        description: 'One-line remainder evaluation.',
        code: `#include <stdio.h>

int main(void) {
    printf("17 Days = 2 Full Weeks and %d Extra Days\\n", 17 % 7);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['EDX (remainder register after idiv)'],
      assemblyNotes: 'mov eax, 17; cdq; idiv 7 -> Remainder stored in edx.',
      ramFootprint: '4 bytes on stack frame.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'p-6-1', code: '#include <stdio.h>\nint main(void) {', hint: 'Start program' },
        { id: 'p-6-2', code: '    int totalDays = 17;', hint: 'Days variable' },
        { id: 'p-6-3', code: '    int remaining = totalDays % 7;', hint: 'Modulo division' },
        { id: 'p-6-4', code: '    printf("17 Days = 2 Full Weeks and %d Extra Days\\n", remaining);', hint: 'Print result' },
        { id: 'p-6-5', code: '    return 0;\n}', hint: 'Close program' }
      ],
      correctOrder: ['p-6-1', 'p-6-2', 'p-6-3', 'p-6-4', 'p-6-5']
    },
    expectedOutput: '17 Days = 2 Full Weeks and 3 Extra Days',
    cKeywordsUsed: ['int', 'return', 'void'],
    daaComplexity: {
      timeComplexity: 'O(1) ALU Division',
      spaceComplexity: 'O(1)',
      algorithmClass: 'Modular Arithmetic'
    }
  },
  {
    id: 7,
    slug: 'level-7-relational-operators',
    tier: 'tier-1-foundation',
    tierLabel: 'Tier 1: Foundations & Silicon Memory (1-30)',
    title: 'Mission 7: Relational Comparison & Truth Flags',
    category: 'Foundations & Operators',
    themeIcon: '⚖️',
    realLifeAnalogy: {
      story: 'Metro turnstile card check: Is card balance >= Rs. 20 minimum fare? In C, comparison answers with 1 (True) or 0 (False)!',
      physicalConcept: 'CPU performs subtraction (CMP) and sets Zero Flag (ZF) or Sign Flag (SF) in EFLAGS register.',
      ruleOfThumb: 'In C, there is no separate boolean type in C89: 1 is True, 0 is False.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Relational expression storage',
        description: 'Evaluates balance comparison into integer flag.',
        code: `#include <stdio.h>

int main(void) {
    int metroBalance = 50;
    int minFare = 20;
    int isAllowed = (metroBalance >= minFare);
    printf("Turnstile Gate Status (1=Open, 0=Locked): %d\\n", isAllowed);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Inline comparison evaluation',
        description: 'Direct comparison expression evaluated in conditional set instruction.',
        code: `#include <stdio.h>

int main(void) {
    int balance = 50;
    printf("Turnstile Gate Status (1=Open, 0=Locked): %d\\n", balance >= 20);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['EFLAGS (ZF, SF)', 'AL (setge flag)'],
      assemblyNotes: 'cmp eax, 20; setge al -> Hardware boolean set instruction.',
      ramFootprint: '4 bytes for integer flag.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'p-7-1', code: '#include <stdio.h>\nint main(void) {', hint: 'Start program' },
        { id: 'p-7-2', code: '    int metroBalance = 50, minFare = 20;', hint: 'Declare variables' },
        { id: 'p-7-3', code: '    int isAllowed = (metroBalance >= minFare);', hint: 'Comparison check' },
        { id: 'p-7-4', code: '    printf("Turnstile Gate Status (1=Open, 0=Locked): %d\\n", isAllowed);', hint: 'Print truth flag' },
        { id: 'p-7-5', code: '    return 0;\n}', hint: 'Close' }
      ],
      correctOrder: ['p-7-1', 'p-7-2', 'p-7-3', 'p-7-4', 'p-7-5']
    },
    expectedOutput: 'Turnstile Gate Status (1=Open, 0=Locked): 1',
    cKeywordsUsed: ['int', 'return', 'void'],
    daaComplexity: {
      timeComplexity: 'O(1) CMP Cycle',
      spaceComplexity: 'O(1)',
      algorithmClass: 'Relational Logic'
    }
  },
  {
    id: 8,
    slug: 'level-8-logical-and',
    tier: 'tier-1-foundation',
    tierLabel: 'Tier 1: Foundations & Silicon Memory (1-30)',
    title: 'Mission 8: Logical AND (&&) & Two-Factor Authentication',
    category: 'Foundations & Operators',
    themeIcon: '🔐',
    realLifeAnalogy: {
      story: 'Logging into netbanking: Both password AND OTP must be correct. If either fails, access is denied!',
      physicalConcept: 'Short-circuit evaluation: If the first condition is 0, CPU skips evaluating the second condition completely.',
      ruleOfThumb: 'A && B evaluates to 1 ONLY if BOTH A and B are non-zero.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Logical AND test',
        description: 'Tests two authentication flags.',
        code: `#include <stdio.h>

int main(void) {
    int hasCorrectPassword = 1;
    int hasValidOtp = 1;
    int loginApproved = hasCorrectPassword && hasValidOtp;
    printf("Netbanking Access (1=Approved, 0=Denied): %d\\n", loginApproved);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Short-circuit guard check',
        description: 'Demonstrates guaranteed left-to-right evaluation safety.',
        code: `#include <stdio.h>

int main(void) {
    int auth = (1 && 1);
    printf("Netbanking Access (1=Approved, 0=Denied): %d\\n", auth);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['RAX', 'ZF Flag'],
      assemblyNotes: 'test eax, eax; jz .fail; test edx, edx; jz .fail -> Short circuit branching.',
      ramFootprint: '4 bytes for auth status.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'p-8-1', code: '#include <stdio.h>\nint main(void) {', hint: 'Header and main' },
        { id: 'p-8-2', code: '    int hasCorrectPassword = 1, hasValidOtp = 1;', hint: 'Auth flags' },
        { id: 'p-8-3', code: '    int loginApproved = hasCorrectPassword && hasValidOtp;', hint: 'Logical AND' },
        { id: 'p-8-4', code: '    printf("Netbanking Access (1=Approved, 0=Denied): %d\\n", loginApproved);', hint: 'Print status' },
        { id: 'p-8-5', code: '    return 0;\n}', hint: 'Return 0 and close' }
      ],
      correctOrder: ['p-8-1', 'p-8-2', 'p-8-3', 'p-8-4', 'p-8-5']
    },
    expectedOutput: 'Netbanking Access (1=Approved, 0=Denied): 1',
    cKeywordsUsed: ['int', 'return', 'void'],
    daaComplexity: {
      timeComplexity: 'O(1) Branch Evaluation',
      spaceComplexity: 'O(1)',
      algorithmClass: 'Boolean Logic'
    }
  },
  {
    id: 9,
    slug: 'level-9-logical-or',
    tier: 'tier-1-foundation',
    tierLabel: 'Tier 1: Foundations & Silicon Memory (1-30)',
    title: 'Mission 9: Logical OR (||) & Payment Fallback',
    category: 'Foundations & Operators',
    themeIcon: '💳',
    realLifeAnalogy: {
      story: 'Paying at a grocery store: You can pay with UPI OR Cash. As long as you have at least one payment method, the sale goes through!',
      physicalConcept: 'If the left operand evaluates to true (non-zero), CPU skips evaluating the right operand immediately.',
      ruleOfThumb: 'A || B is True if AT LEAST ONE operand is non-zero.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Logical OR fallback',
        description: 'Checks if UPI or Cash is available.',
        code: `#include <stdio.h>

int main(void) {
    int hasUpi = 0;   // Server down
    int hasCash = 1;  // Cash in wallet
    int canPay = (hasUpi || hasCash);
    printf("Can Complete Purchase: %d (1=Yes, 0=No)\\n", canPay);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Inline payment check',
        description: 'Direct fallback evaluation.',
        code: `#include <stdio.h>

int main(void) {
    printf("Can Complete Purchase: %d (1=Yes, 0=No)\\n", 0 || 1);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['RAX', 'JNZ branch'],
      assemblyNotes: 'jnz .success -> Bypasses second check if first operand is true.',
      ramFootprint: '4 bytes for canPay flag.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'p-9-1', code: '#include <stdio.h>\nint main(void) {', hint: 'Start program' },
        { id: 'p-9-2', code: '    int hasUpi = 0, hasCash = 1;', hint: 'Payment variables' },
        { id: 'p-9-3', code: '    int canPay = (hasUpi || hasCash);', hint: 'Logical OR check' },
        { id: 'p-9-4', code: '    printf("Can Complete Purchase: %d (1=Yes, 0=No)\\n", canPay);', hint: 'Print result' },
        { id: 'p-9-5', code: '    return 0;\n}', hint: 'Close' }
      ],
      correctOrder: ['p-9-1', 'p-9-2', 'p-9-3', 'p-9-4', 'p-9-5']
    },
    expectedOutput: 'Can Complete Purchase: 1 (1=Yes, 0=No)',
    cKeywordsUsed: ['int', 'return', 'void'],
    daaComplexity: {
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)',
      algorithmClass: 'Boolean Logic'
    }
  },
  {
    id: 10,
    slug: 'level-10-logical-not',
    tier: 'tier-1-foundation',
    tierLabel: 'Tier 1: Foundations & Silicon Memory (1-30)',
    title: 'Mission 10: Logical NOT (!) & Security Inversion',
    category: 'Foundations & Operators',
    themeIcon: '🚨',
    realLifeAnalogy: {
      story: 'Home burglar alarm: When door sensor is closed (isDoorOpen = 0), alarm is quiet. If door is NOT closed (!isDoorOpen == 0), sound the siren!',
      physicalConcept: 'Flips truth value: non-zero becomes 0, zero becomes 1.',
      ruleOfThumb: '!0 evaluates to 1. !any_other_number evaluates to 0.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'NOT operator flag flip',
        description: 'Inverts integer sensor status.',
        code: `#include <stdio.h>

int main(void) {
    int isDoorOpen = 0; // 0 = Closed
    int isSecure = !isDoorOpen; // Invert: 1 = Secure
    printf("Security Perimeter Secure: %d (1=Safe, 0=Breached)\\n", isSecure);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Direct boolean negation',
        description: 'Inline logical NOT.',
        code: `#include <stdio.h>

int main(void) {
    printf("Security Perimeter Secure: %d (1=Safe, 0=Breached)\\n", !0);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['EAX', 'SETE instruction'],
      assemblyNotes: 'test eax, eax; sete al -> Sets AL to 1 if zero flag is set.',
      ramFootprint: '4 bytes for state.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'p-10-1', code: '#include <stdio.h>\nint main(void) {', hint: 'Main start' },
        { id: 'p-10-2', code: '    int isDoorOpen = 0;', hint: 'Door variable' },
        { id: 'p-10-3', code: '    int isSecure = !isDoorOpen;', hint: 'Logical NOT' },
        { id: 'p-10-4', code: '    printf("Security Perimeter Secure: %d (1=Safe, 0=Breached)\\n", isSecure);', hint: 'Print security state' },
        { id: 'p-10-5', code: '    return 0;\n}', hint: 'Close' }
      ],
      correctOrder: ['p-10-1', 'p-10-2', 'p-10-3', 'p-10-4', 'p-10-5']
    },
    expectedOutput: 'Security Perimeter Secure: 1 (1=Safe, 0=Breached)',
    cKeywordsUsed: ['int', 'return', 'void'],
    daaComplexity: {
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)',
      algorithmClass: 'Unary Logic'
    }
  },
  {
    id: 11,
    slug: 'level-11-pre-vs-post-increment',
    tier: 'tier-1-foundation',
    tierLabel: 'Tier 1: Foundations & Silicon Memory (1-30)',
    title: 'Mission 11: Pre-Increment vs Post-Increment (++i vs i++)',
    category: 'Foundations & Operators',
    themeIcon: '➕',
    realLifeAnalogy: {
      story: 'Post-increment (i++): Hand over the token first, then increment your counter. Pre-increment (++i): Increment counter first, then hand over the new token!',
      physicalConcept: 'Post-increment makes a temporary copy before incrementing. Pre-increment increments memory directly and returns the new value.',
      ruleOfThumb: '++i modifies then delivers. i++ delivers old value then modifies.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Step-by-step increment comparison',
        description: 'Demonstrates the exact timing difference.',
        code: `#include <stdio.h>

int main(void) {
    int x = 5;
    int post = x++; // post gets 5, then x becomes 6
    int y = 5;
    int pre = ++y;  // y becomes 6 first, pre gets 6
    printf("Post-increment got: %d | Pre-increment got: %d\\n", post, pre);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Register assembly demonstration',
        description: 'Avoids temporary register allocation with pre-increment.',
        code: `#include <stdio.h>

int main(void) {
    int a = 5, b = 5;
    printf("Post-increment got: %d | Pre-increment got: %d\\n", a++, ++b);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['EAX (temp copy)', 'EBX (target)'],
      assemblyNotes: 'Post: mov eax, [x]; inc dword ptr [x]; mov [post], eax.',
      ramFootprint: '8 bytes on stack frame.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'p-11-1', code: '#include <stdio.h>\nint main(void) {', hint: 'Start program' },
        { id: 'p-11-2', code: '    int x = 5, y = 5;', hint: 'Init variables' },
        { id: 'p-11-3', code: '    int post = x++;\n    int pre = ++y;', hint: 'Perform increments' },
        { id: 'p-11-4', code: '    printf("Post-increment got: %d | Pre-increment got: %d\\n", post, pre);', hint: 'Print comparison' },
        { id: 'p-11-5', code: '    return 0;\n}', hint: 'Close' }
      ],
      correctOrder: ['p-11-1', 'p-11-2', 'p-11-3', 'p-11-4', 'p-11-5']
    },
    expectedOutput: 'Post-increment got: 5 | Pre-increment got: 6',
    cKeywordsUsed: ['int', 'return', 'void'],
    daaComplexity: {
      timeComplexity: 'O(1) ALU Inc',
      spaceComplexity: 'O(1)',
      algorithmClass: 'Increment Semantics'
    }
  },
  {
    id: 12,
    slug: 'level-12-compound-assignment',
    tier: 'tier-1-foundation',
    tierLabel: 'Tier 1: Foundations & Silicon Memory (1-30)',
    title: 'Mission 12: Compound Assignment (+=, -=, *=) & Wallet Balance',
    category: 'Foundations & Operators',
    themeIcon: '👛',
    realLifeAnalogy: {
      story: 'Your digital wallet: You start with Rs. 500, deposit Rs. 250 (balance += 250), then spend Rs. 100 on snacks (balance -= 100).',
      physicalConcept: 'Executes direct read-modify-write assembly instructions (`add [rbp-4], 250`) without duplicating the variable address.',
      ruleOfThumb: 'a += b is shorthand for a = a + b, but evaluated with fewer memory fetches.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Compound wallet updates',
        description: 'Updates wallet balance in place.',
        code: `#include <stdio.h>

int main(void) {
    int balance = 500;
    balance += 250; // Deposit
    balance -= 100; // Spend
    printf("Final Wallet Balance: Rs. %d (Rupees)\\n", balance);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Direct accumulator mutation',
        description: 'Chained arithmetic updates.',
        code: `#include <stdio.h>

int main(void) {
    int balance = 500;
    balance += (250 - 100);
    printf("Final Wallet Balance: Rs. %d (Rupees)\\n", balance);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['EAX'],
      assemblyNotes: 'add DWORD PTR [rbp-4], 250; sub DWORD PTR [rbp-4], 100',
      ramFootprint: '4 bytes for balance on stack.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'p-12-1', code: '#include <stdio.h>\nint main(void) {', hint: 'Start main' },
        { id: 'p-12-2', code: '    int balance = 500;', hint: 'Init balance' },
        { id: 'p-12-3', code: '    balance += 250;\n    balance -= 100;', hint: 'Compound updates' },
        { id: 'p-12-4', code: '    printf("Final Wallet Balance: Rs. %d (Rupees)\\n", balance);', hint: 'Print balance' },
        { id: 'p-12-5', code: '    return 0;\n}', hint: 'Return 0 and close' }
      ],
      correctOrder: ['p-12-1', 'p-12-2', 'p-12-3', 'p-12-4', 'p-12-5']
    },
    expectedOutput: 'Final Wallet Balance: Rs. 650 (Rupees)',
    cKeywordsUsed: ['int', 'return', 'void'],
    daaComplexity: {
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)',
      algorithmClass: 'In-Place Mutation'
    }
  },
  {
    id: 13,
    slug: 'level-13-sizeof-operator',
    tier: 'tier-1-foundation',
    tierLabel: 'Tier 1: Foundations & Silicon Memory (1-30)',
    title: 'Mission 13: Sizeof Operator & Memory Footprint Sizing',
    category: 'Foundations & Operators',
    themeIcon: '📏',
    realLifeAnalogy: {
      story: 'Packing luggage lockers: A passport (char) needs 1 small slot, a textbook (int) needs 4 slots, and a laptop (double) needs 8 slots!',
      physicalConcept: 'Compile-time evaluation: Replaced by the compiler with integer constant byte counts. 0 runtime CPU cost.',
      ruleOfThumb: 'sizeof returns size_t (unsigned integer); always format with %zu.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Inspect primitive byte sizes',
        description: 'Prints byte sizes for char, int, and double.',
        code: `#include <stdio.h>

int main(void) {
    printf("char: %zu byte | int: %zu bytes | double: %zu bytes\\n",
           sizeof(char), sizeof(int), sizeof(double));
    return 0;
}`
      },
      optimizedPro: {
        name: 'Array count calculation via sizeof',
        description: 'The standard C idiom to calculate array length: sizeof(arr) / sizeof(arr[0]).',
        code: `#include <stdio.h>

int main(void) {
    int arr[6];
    printf("Array total bytes: %zu | Element count: %zu\\n", sizeof(arr), sizeof(arr) / sizeof(arr[0]));
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'text',
      cpuRegisters: ['ESI', 'EDX', 'ECX (immediate constants)'],
      assemblyNotes: 'mov esi, 1; mov edx, 4; mov ecx, 8 -> Constants baked into binary at compile time.',
      ramFootprint: '0 bytes extra runtime overhead.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'p-13-1', code: '#include <stdio.h>\nint main(void) {', hint: 'Start program' },
        { id: 'p-13-2', code: '    printf("char: %zu byte | int: %zu bytes | double: %zu bytes\\n",', hint: 'Print format' },
        { id: 'p-13-3', code: '           sizeof(char), sizeof(int), sizeof(double));', hint: 'Pass sizeof types' },
        { id: 'p-13-4', code: '    return 0;\n}', hint: 'Return 0 and close' }
      ],
      correctOrder: ['p-13-1', 'p-13-2', 'p-13-3', 'p-13-4']
    },
    expectedOutput: 'char: 1 byte | int: 4 bytes | double: 8 bytes',
    cKeywordsUsed: ['sizeof', 'int', 'char', 'double', 'return', 'void'],
    daaComplexity: {
      timeComplexity: 'O(1) Compile-Time Constant',
      spaceComplexity: 'O(0) Runtime RAM',
      algorithmClass: 'Compile-Time Reflection'
    }
  },
  {
    id: 14,
    slug: 'level-14-short-integer',
    tier: 'tier-1-foundation',
    tierLabel: 'Tier 1: Foundations & Silicon Memory (1-30)',
    title: 'Mission 14: Short Integer & Embedded Sensor Ports',
    category: 'Foundations & Operators',
    themeIcon: '📟',
    realLifeAnalogy: {
      story: 'An IoT smart weather sensor on campus: It only has 8KB of total RAM! We use 2-byte short integers instead of 4-byte ints to save 50% memory.',
      physicalConcept: '16-bit signed integer (-32,768 to 32,767) operated inside the AX register.',
      ruleOfThumb: 'Use %hd format specifier in printf/scanf for short integers.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Short integer declaration',
        description: 'Uses 2-byte short for embedded port numbering.',
        code: `#include <stdio.h>

int main(void) {
    short sensorPort = 8080;
    printf("IoT Sensor Port: %hd (Size: %zu bytes)\\n", sensorPort, sizeof(sensorPort));
    return 0;
}`
      },
      optimizedPro: {
        name: 'Const short configuration',
        description: 'Embedded hardware port definition.',
        code: `#include <stdio.h>

int main(void) {
    const short port = 8080;
    printf("IoT Sensor Port: %hd (Size: %zu bytes)\\n", port, sizeof(port));
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['AX (16-bit register)'],
      assemblyNotes: 'mov WORD PTR [rbp-2], 8080 -> 16-bit memory write.',
      ramFootprint: '2 bytes on stack frame.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'p-14-1', code: '#include <stdio.h>\nint main(void) {', hint: 'Start main' },
        { id: 'p-14-2', code: '    short sensorPort = 8080;', hint: 'Declare short' },
        { id: 'p-14-3', code: '    printf("IoT Sensor Port: %hd (Size: %zu bytes)\\n", sensorPort, sizeof(sensorPort));', hint: 'Print short' },
        { id: 'p-14-4', code: '    return 0;\n}', hint: 'Close' }
      ],
      correctOrder: ['p-14-1', 'p-14-2', 'p-14-3', 'p-14-4']
    },
    expectedOutput: 'IoT Sensor Port: 8080 (Size: 2 bytes)',
    cKeywordsUsed: ['short', 'int', 'sizeof', 'return', 'void'],
    daaComplexity: {
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1) 2 Bytes',
      algorithmClass: 'Embedded Memory Types'
    }
  },
  {
    id: 15,
    slug: 'level-15-long-integer',
    tier: 'tier-1-foundation',
    tierLabel: 'Tier 1: Foundations & Silicon Memory (1-30)',
    title: 'Mission 15: Long Integer & Aadhaar Database Counts',
    category: 'Foundations & Operators',
    themeIcon: '🇮🇳',
    realLifeAnalogy: {
      story: 'India\'s population count: ~1.42 Billion citizens! Standard int max is 2.14 Billion. For large financial balances and national IDs, we use long or long long!',
      physicalConcept: 'Allocates extended 64-bit integer registers (RAX) on modern 64-bit platforms.',
      ruleOfThumb: 'Use %ld for long and %lld for long long in printf.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Long integer population record',
        description: 'Stores large citizen count using long.',
        code: `#include <stdio.h>

int main(void) {
    long citizenCount = 1428627663L;
    printf("Total Aadhaar Database Records: %ld\\n", citizenCount);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Long long 64-bit guarantees',
        description: 'Guaranteed 64-bit storage across all operating systems.',
        code: `#include <stdio.h>

int main(void) {
    long long records = 1428627663LL;
    printf("Total Aadhaar Database Records: %lld\\n", records);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['RAX (64-bit register)'],
      assemblyNotes: 'mov QWORD PTR [rbp-8], 1428627663 -> 64-bit quadword write.',
      ramFootprint: '8 bytes on stack frame.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'p-15-1', code: '#include <stdio.h>\nint main(void) {', hint: 'Start program' },
        { id: 'p-15-2', code: '    long citizenCount = 1428627663L;', hint: 'Declare long' },
        { id: 'p-15-3', code: '    printf("Total Aadhaar Database Records: %ld\\n", citizenCount);', hint: 'Print long' },
        { id: 'p-15-4', code: '    return 0;\n}', hint: 'Close' }
      ],
      correctOrder: ['p-15-1', 'p-15-2', 'p-15-3', 'p-15-4']
    },
    expectedOutput: 'Total Aadhaar Database Records: 1428627663',
    cKeywordsUsed: ['long', 'int', 'return', 'void'],
    daaComplexity: {
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1) 8 Bytes',
      algorithmClass: 'Extended Range Arithmetic'
    }
  },
  {
    id: 16,
    slug: 'level-16-unsigned-integers',
    tier: 'tier-1-foundation',
    tierLabel: 'Tier 1: Foundations & Silicon Memory (1-30)',
    title: 'Mission 16: Unsigned Integers & Non-Negative RAM',
    category: 'Foundations & Operators',
    themeIcon: '🔢',
    realLifeAnalogy: {
      story: 'Server memory size or network packet counters: You cannot have -5 megabytes of RAM! By dropping negative numbers, unsigned doubles the positive range up to 4.29 Billion.',
      physicalConcept: 'All 32 bits represent magnitude; highest bit is no longer reserved for negative sign.',
      ruleOfThumb: 'Use %u in printf to format unsigned integers.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Unsigned packet counter',
        description: 'Using unsigned int for network packets.',
        code: `#include <stdio.h>

int main(void) {
    unsigned int packetCount = 4000000000U;
    printf("Router High-Volume Packets: %u\\n", packetCount);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Direct unsigned maximum demonstration',
        description: 'Shows that unsigned values exceed standard 2-billion signed limit.',
        code: `#include <stdio.h>

int main(void) {
    const unsigned int packets = 4000000000U;
    printf("Router High-Volume Packets: %u\\n", packets);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['EAX'],
      assemblyNotes: 'Unsigned uses logical shift (SHR) instead of arithmetic sign-extended shift (SAR).',
      ramFootprint: '4 bytes on stack frame.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'p-16-1', code: '#include <stdio.h>\nint main(void) {', hint: 'Start' },
        { id: 'p-16-2', code: '    unsigned int packetCount = 4000000000U;', hint: 'Declare unsigned' },
        { id: 'p-16-3', code: '    printf("Router High-Volume Packets: %u\\n", packetCount);', hint: 'Print unsigned' },
        { id: 'p-16-4', code: '    return 0;\n}', hint: 'Return 0 and close' }
      ],
      correctOrder: ['p-16-1', 'p-16-2', 'p-16-3', 'p-16-4']
    },
    expectedOutput: 'Router High-Volume Packets: 4000000000',
    cKeywordsUsed: ['unsigned', 'int', 'return', 'void'],
    daaComplexity: {
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)',
      algorithmClass: 'Unsigned Representation'
    }
  },
  {
    id: 17,
    slug: 'level-17-implicit-type-promotion',
    tier: 'tier-1-foundation',
    tierLabel: 'Tier 1: Foundations & Silicon Memory (1-30)',
    title: 'Mission 17: Implicit Type Promotion (int * float -> float)',
    category: 'Foundations & Operators',
    themeIcon: '🔄',
    realLifeAnalogy: {
      story: 'Buying 5 samosas @ Rs. 15.50 each: The quantity is an integer (5), but the price has paise decimals. The CPU automatically promotes the whole calculation to float!',
      physicalConcept: 'Automatic type widening: In any mixed-mode expression, the narrower type is converted to the wider type before calculation.',
      ruleOfThumb: 'int mixed with float always yields a float result.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Mixed-mode arithmetic',
        description: 'Multiplies integer quantity with float price.',
        code: `#include <stdio.h>

int main(void) {
    int count = 5;
    float price = 15.50f;
    float total = count * price; // count is promoted to float
    printf("Total Cost = Rs. %.2f (Rupees)\\n", total);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Direct mixed promotion streaming',
        description: 'Inline mixed type evaluation.',
        code: `#include <stdio.h>

int main(void) {
    printf("Total Cost = Rs. %.2f (Rupees)\\n", 5 * 15.50f);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['XMM0', 'CVTSI2SS instruction'],
      assemblyNotes: 'cvtsi2ss xmm0, dword ptr [count] -> Converts 32-bit int to float in hardware register.',
      ramFootprint: '8 bytes total on stack.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'p-17-1', code: '#include <stdio.h>\nint main(void) {', hint: 'Start program' },
        { id: 'p-17-2', code: '    int count = 5;\n    float price = 15.50f;', hint: 'Mixed variables' },
        { id: 'p-17-3', code: '    float total = count * price;', hint: 'Implicit promotion' },
        { id: 'p-17-4', code: '    printf("Total Cost = Rs. %.2f (Rupees)\\n", total);', hint: 'Print result' },
        { id: 'p-17-5', code: '    return 0;\n}', hint: 'Close' }
      ],
      correctOrder: ['p-17-1', 'p-17-2', 'p-17-3', 'p-17-4', 'p-17-5']
    },
    expectedOutput: 'Total Cost = Rs. 77.50 (Rupees)',
    cKeywordsUsed: ['int', 'float', 'return', 'void'],
    daaComplexity: {
      timeComplexity: 'O(1) Conversion Cycle',
      spaceComplexity: 'O(1)',
      algorithmClass: 'Automatic Type Coercion'
    }
  },
  {
    id: 18,
    slug: 'level-18-explicit-typecasting',
    tier: 'tier-1-foundation',
    tierLabel: 'Tier 1: Foundations & Silicon Memory (1-30)',
    title: 'Mission 18: Explicit Typecasting & Percentage Calculation',
    category: 'Foundations & Operators',
    themeIcon: '🎭',
    realLifeAnalogy: {
      story: 'Student scored 475 out of 500 in 12th board exams. If you divide 475 / 500 in integer math, C chops off decimals to 0! Explicit cast (float) prevents truncation.',
      physicalConcept: 'Integer division discards fractional remainder. Casting `(float)a / b` forces floating-point division.',
      ruleOfThumb: 'Always cast at least one operand before division: (float)sum / count.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Explicit cast to float',
        description: 'Casts scored marks to float before division.',
        code: `#include <stdio.h>

int main(void) {
    int scored = 475;
    int total = 500;
    float percentage = ((float)scored / total) * 100.0f;
    printf("Official Board Exam Percentage: %.2f%%\\n", percentage);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Inline casting',
        description: 'Single-expression float cast.',
        code: `#include <stdio.h>

int main(void) {
    int s = 475, t = 500;
    printf("Official Board Exam Percentage: %.2f%%\\n", ((float)s / t) * 100.0f);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['XMM0', 'DIVSS instruction'],
      assemblyNotes: 'divss xmm0, xmm1 -> Hardware float division.',
      ramFootprint: '8 bytes on stack frame.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'p-18-1', code: '#include <stdio.h>\nint main(void) {', hint: 'Start program' },
        { id: 'p-18-2', code: '    int scored = 475, total = 500;', hint: 'Integer scores' },
        { id: 'p-18-3', code: '    float percentage = ((float)scored / total) * 100.0f;', hint: 'Explicit cast' },
        { id: 'p-18-4', code: '    printf("Official Board Exam Percentage: %.2f%%\\n", percentage);', hint: 'Print percentage' },
        { id: 'p-18-5', code: '    return 0;\n}', hint: 'Close' }
      ],
      correctOrder: ['p-18-1', 'p-18-2', 'p-18-3', 'p-18-4', 'p-18-5']
    },
    expectedOutput: 'Official Board Exam Percentage: 95.00%',
    cKeywordsUsed: ['int', 'float', 'return', 'void'],
    daaComplexity: {
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)',
      algorithmClass: 'Type Casting'
    }
  },
  {
    id: 19,
    slug: 'level-19-bitwise-and',
    tier: 'tier-1-foundation',
    tierLabel: 'Tier 1: Foundations & Silicon Memory (1-30)',
    title: 'Mission 19: Bitwise AND (&) & Hardware Status Masking',
    category: 'Foundations & Operators',
    themeIcon: '🔬',
    realLifeAnalogy: {
      story: 'A satellite telemetry word: Bit 0 = Solar Panel, Bit 1 = Radio, Bit 2 = Camera. To check if the camera is ON, we apply bitmask (status & 4)!',
      physicalConcept: 'Direct transistor logic gates (AND gates). Each bit position is calculated in parallel in one CPU cycle.',
      ruleOfThumb: 'A & 1 checks if the least significant bit (LSB) is set (Odd/Even check).'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Hardware bit checking',
        description: 'Applies bitwise AND with mask 4 (bit 2).',
        code: `#include <stdio.h>

int main(void) {
    int statusByte = 5; // Binary: 0101 (Bits 0 and 2 are active)
    int mask = 4;       // Binary: 0100 (Check bit 2)
    int isBit2Active = (statusByte & mask);
    printf("Hardware Peripheral Bit 2 Status: %d (Active)\\n", isBit2Active);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Bitmask predicate',
        description: 'Single-cycle bitmask test.',
        code: `#include <stdio.h>

int main(void) {
    printf("Hardware Peripheral Bit 2 Status: %d (Active)\\n", (5 & 4));
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['EAX', 'AND instruction'],
      assemblyNotes: 'and eax, 4 -> Parallel 32-bit hardware AND gate operation in ALU.',
      ramFootprint: '4 bytes for status.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'p-19-1', code: '#include <stdio.h>\nint main(void) {', hint: 'Start program' },
        { id: 'p-19-2', code: '    int statusByte = 5, mask = 4;', hint: 'Init status and mask' },
        { id: 'p-19-3', code: '    int isBit2Active = (statusByte & mask);', hint: 'Bitwise AND' },
        { id: 'p-19-4', code: '    printf("Hardware Peripheral Bit 2 Status: %d (Active)\\n", isBit2Active);', hint: 'Print result' },
        { id: 'p-19-5', code: '    return 0;\n}', hint: 'Close' }
      ],
      correctOrder: ['p-19-1', 'p-19-2', 'p-19-3', 'p-19-4', 'p-19-5']
    },
    expectedOutput: 'Hardware Peripheral Bit 2 Status: 4 (Active)',
    cKeywordsUsed: ['int', 'return', 'void'],
    daaComplexity: {
      timeComplexity: 'O(1) 1 Clock Cycle',
      spaceComplexity: 'O(1)',
      algorithmClass: 'Bit Manipulation'
    }
  },
  {
    id: 20,
    slug: 'level-20-bitwise-or',
    tier: 'tier-1-foundation',
    tierLabel: 'Tier 1: Foundations & Silicon Memory (1-30)',
    title: 'Mission 20: Bitwise OR (|) & Permission Flag Combination',
    category: 'Foundations & Operators',
    themeIcon: '🔓',
    realLifeAnalogy: {
      story: 'Linux file permissions: Read permission = 4 (100), Write permission = 2 (010). To grant both Read AND Write, we combine with OR: 4 | 2 = 6 (110)!',
      physicalConcept: 'Transistor OR gates: Result bit is 1 if either input bit is 1.',
      ruleOfThumb: 'Use |= to set or turn on specific flag bits without altering other bits.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Combining permission flags',
        description: 'Uses bitwise OR to merge permissions.',
        code: `#include <stdio.h>

int main(void) {
    int readPermission = 4;  // 100
    int writePermission = 2; // 010
    int combined = readPermission | writePermission; // 110 = 6
    printf("Combined Linux Permission Mask: %d\\n", combined);
    return 0;
}`
      },
      optimizedPro: {
        name: 'In-place flag setting',
        description: 'Using compound bitwise OR assignment.',
        code: `#include <stdio.h>

int main(void) {
    int perm = 4;
    perm |= 2;
    printf("Combined Linux Permission Mask: %d\\n", perm);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['EAX', 'OR instruction'],
      assemblyNotes: 'or eax, 2 -> Sets bit 1 in register.',
      ramFootprint: '4 bytes for permission mask.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'p-20-1', code: '#include <stdio.h>\nint main(void) {', hint: 'Start program' },
        { id: 'p-20-2', code: '    int readPermission = 4, writePermission = 2;', hint: 'Init permissions' },
        { id: 'p-20-3', code: '    int combined = readPermission | writePermission;', hint: 'Bitwise OR' },
        { id: 'p-20-4', code: '    printf("Combined Linux Permission Mask: %d\\n", combined);', hint: 'Print mask' },
        { id: 'p-20-5', code: '    return 0;\n}', hint: 'Return 0 and close' }
      ],
      correctOrder: ['p-20-1', 'p-20-2', 'p-20-3', 'p-20-4', 'p-20-5']
    },
    expectedOutput: 'Combined Linux Permission Mask: 6',
    cKeywordsUsed: ['int', 'return', 'void'],
    daaComplexity: {
      timeComplexity: 'O(1) 1 Cycle',
      spaceComplexity: 'O(1)',
      algorithmClass: 'Bitwise Flag Setting'
    }
  },
  {
    id: 21,
    slug: 'level-21-bitwise-xor-swap',
    tier: 'tier-1-foundation',
    tierLabel: 'Tier 1: Foundations & Silicon Memory (1-30)',
    title: 'Mission 21: Bitwise XOR (^) & Swapping Without Temp Variables',
    category: 'Foundations & Operators',
    themeIcon: '🔀',
    realLifeAnalogy: {
      story: 'The legendary programmer trick: Swapping two numbers in CPU registers without using any extra third memory variable by using XOR properties!',
      physicalConcept: 'XOR outputs 1 only when bits differ. Crucial property: a ^ a = 0 and a ^ 0 = a.',
      ruleOfThumb: 'XOR is self-inverting. Used everywhere in cryptography and memory swaps.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Three-step XOR swap',
        description: 'Swaps values in place without temporary variable.',
        code: `#include <stdio.h>

int main(void) {
    int a = 15;
    int b = 25;
    a = a ^ b;
    b = a ^ b;
    a = a ^ b;
    printf("Swapped Values: a = %d, b = %d\\n", a, b);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Register XOR swap',
        description: 'Zero memory overhead register swap.',
        code: `#include <stdio.h>

int main(void) {
    int a = 15, b = 25;
    a ^= b; b ^= a; a ^= b;
    printf("Swapped Values: a = %d, b = %d\\n", a, b);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['EAX', 'EBX', 'XOR instruction'],
      assemblyNotes: 'xor eax, ebx; xor ebx, eax; xor eax, ebx -> 3 cycles, 0 RAM.',
      ramFootprint: '8 bytes total (0 auxiliary memory).'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'p-21-1', code: '#include <stdio.h>\nint main(void) {', hint: 'Start program' },
        { id: 'p-21-2', code: '    int a = 15, b = 25;', hint: 'Init a and b' },
        { id: 'p-21-3', code: '    a = a ^ b;\n    b = a ^ b;\n    a = a ^ b;', hint: 'XOR swap triple' },
        { id: 'p-21-4', code: '    printf("Swapped Values: a = %d, b = %d\\n", a, b);', hint: 'Print swapped' },
        { id: 'p-21-5', code: '    return 0;\n}', hint: 'Close' }
      ],
      correctOrder: ['p-21-1', 'p-21-2', 'p-21-3', 'p-21-4', 'p-21-5']
    },
    expectedOutput: 'Swapped Values: a = 25, b = 15',
    cKeywordsUsed: ['int', 'return', 'void'],
    daaComplexity: {
      timeComplexity: 'O(1) 3 ALU Cycles',
      spaceComplexity: 'O(1) Zero Auxiliary',
      algorithmClass: 'In-Place Register Swap'
    }
  },
  {
    id: 22,
    slug: 'level-22-bitwise-not-complement',
    tier: 'tier-1-foundation',
    tierLabel: 'Tier 1: Foundations & Silicon Memory (1-30)',
    title: 'Mission 22: Bitwise NOT (~) & One\'s Complement',
    category: 'Foundations & Operators',
    themeIcon: '🔁',
    realLifeAnalogy: {
      story: 'A photographic negative: Every white pixel becomes black, and every black pixel becomes white. Bitwise NOT flips every single bit from 0 to 1 and 1 to 0!',
      physicalConcept: 'In two\'s complement architecture, ~x is mathematically equal to -(x + 1).',
      ruleOfThumb: 'Bitwise NOT operates on raw binary bits, unlike logical NOT (!) which operates on truth values.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'One\'s complement evaluation',
        description: 'Demonstrates bit inversion on signed integer.',
        code: `#include <stdio.h>

int main(void) {
    int x = 10;
    int inverted = ~x; // ~10 = -11
    printf("Original: %d | One's Complement (~x): %d\\n", x, inverted);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Unsigned bit inversion mask',
        description: 'Masking lowest byte inversion.',
        code: `#include <stdio.h>

int main(void) {
    unsigned char val = 0x0F;
    unsigned char inv = ~val;
    printf("Inverted Byte: 0x%X\\n", inv);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['EAX', 'NOT instruction'],
      assemblyNotes: 'not eax -> Inverts all 32 bits in accumulator.',
      ramFootprint: '4 bytes on stack frame.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'p-22-1', code: '#include <stdio.h>\nint main(void) {', hint: 'Start program' },
        { id: 'p-22-2', code: '    int x = 10;', hint: 'Init integer' },
        { id: 'p-22-3', code: '    int inverted = ~x;', hint: 'Bitwise NOT' },
        { id: 'p-22-4', code: '    printf("Original: %d | One\'s Complement (~x): %d\\n", x, inverted);', hint: 'Print result' },
        { id: 'p-22-5', code: '    return 0;\n}', hint: 'Close' }
      ],
      correctOrder: ['p-22-1', 'p-22-2', 'p-22-3', 'p-22-4', 'p-22-5']
    },
    expectedOutput: "Original: 10 | One's Complement (~x): -11",
    cKeywordsUsed: ['int', 'return', 'void'],
    daaComplexity: {
      timeComplexity: 'O(1) 1 Cycle',
      spaceComplexity: 'O(1)',
      algorithmClass: 'Bit Inversion'
    }
  },
  {
    id: 23,
    slug: 'level-23-left-shift-multiplication',
    tier: 'tier-1-foundation',
    tierLabel: 'Tier 1: Foundations & Silicon Memory (1-30)',
    title: 'Mission 23: Left Shift (<<) & Ultra-Fast Multiplication by Powers of 2',
    category: 'Foundations & Operators',
    themeIcon: '⏪',
    realLifeAnalogy: {
      story: 'In decimal, adding a zero to the right multiplies by 10 (5 -> 50). In binary, shifting bits left by 1 multiplies by 2, and shifting left by 3 multiplies by 8 (2^3)!',
      physicalConcept: 'Barrel shifter in the CPU shifts all bits in a register in a fraction of a clock cycle, far faster than standard multiplication.',
      ruleOfThumb: 'x << n is mathematically equal to x * (2^n).'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Shift left by 3 bits',
        description: 'Multiplies 5 by 8 via bit shifts.',
        code: `#include <stdio.h>

int main(void) {
    int base = 5;
    int multiplied = base << 3; // 5 * (2^3) = 5 * 8 = 40
    printf("5 << 3 = %d (Fast multiplication by 8)\\n", multiplied);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Direct bitshift constant',
        description: 'Inline barrel shift calculation.',
        code: `#include <stdio.h>

int main(void) {
    printf("5 << 3 = %d (Fast multiplication by 8)\\n", 5 << 3);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['EAX', 'SHL instruction'],
      assemblyNotes: 'shl eax, 3 -> Single-cycle hardware barrel shift.',
      ramFootprint: '4 bytes on stack.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'p-23-1', code: '#include <stdio.h>\nint main(void) {', hint: 'Start program' },
        { id: 'p-23-2', code: '    int base = 5;', hint: 'Init base' },
        { id: 'p-23-3', code: '    int multiplied = base << 3;', hint: 'Left shift by 3' },
        { id: 'p-23-4', code: '    printf("5 << 3 = %d (Fast multiplication by 8)\\n", multiplied);', hint: 'Print result' },
        { id: 'p-23-5', code: '    return 0;\n}', hint: 'Close' }
      ],
      correctOrder: ['p-23-1', 'p-23-2', 'p-23-3', 'p-23-4', 'p-23-5']
    },
    expectedOutput: '5 << 3 = 40 (Fast multiplication by 8)',
    cKeywordsUsed: ['int', 'return', 'void'],
    daaComplexity: {
      timeComplexity: 'O(1) 1 Barrel Cycle',
      spaceComplexity: 'O(1)',
      algorithmClass: 'Bitshift Arithmetic'
    }
  },
  {
    id: 24,
    slug: 'level-24-right-shift-division',
    tier: 'tier-1-foundation',
    tierLabel: 'Tier 1: Foundations & Silicon Memory (1-30)',
    title: 'Mission 24: Right Shift (>>) & Ultra-Fast Division by Powers of 2',
    category: 'Foundations & Operators',
    themeIcon: '⏩',
    realLifeAnalogy: {
      story: 'Cutting an audio waveform amplitude in half or dividing by 4: Shifting bits right by 2 divides by 2^2 = 4 instantly in silicon!',
      physicalConcept: 'CPU drops the lowest bits and shifts higher bits right. Fast integer division without using the division unit.',
      ruleOfThumb: 'x >> n is mathematically equal to x / (2^n) for non-negative integers.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Shift right by 2 bits',
        description: 'Divides 128 by 4 via right shift.',
        code: `#include <stdio.h>

int main(void) {
    int audioSample = 128;
    int divided = audioSample >> 2; // 128 / (2^2) = 128 / 4 = 32
    printf("128 >> 2 = %d (Fast division by 4)\\n", divided);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Direct right shift',
        description: 'Inline shift evaluation.',
        code: `#include <stdio.h>

int main(void) {
    printf("128 >> 2 = %d (Fast division by 4)\\n", 128 >> 2);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['EAX', 'SAR instruction'],
      assemblyNotes: 'sar eax, 2 -> Shift Arithmetic Right preserves sign.',
      ramFootprint: '4 bytes on stack.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'p-24-1', code: '#include <stdio.h>\nint main(void) {', hint: 'Start program' },
        { id: 'p-24-2', code: '    int audioSample = 128;', hint: 'Init sample' },
        { id: 'p-24-3', code: '    int divided = audioSample >> 2;', hint: 'Right shift by 2' },
        { id: 'p-24-4', code: '    printf("128 >> 2 = %d (Fast division by 4)\\n", divided);', hint: 'Print result' },
        { id: 'p-24-5', code: '    return 0;\n}', hint: 'Close' }
      ],
      correctOrder: ['p-24-1', 'p-24-2', 'p-24-3', 'p-24-4', 'p-24-5']
    },
    expectedOutput: '128 >> 2 = 32 (Fast division by 4)',
    cKeywordsUsed: ['int', 'return', 'void'],
    daaComplexity: {
      timeComplexity: 'O(1) 1 Barrel Cycle',
      spaceComplexity: 'O(1)',
      algorithmClass: 'Bitshift Arithmetic'
    }
  },
  {
    id: 25,
    slug: 'level-25-ascii-case-conversion',
    tier: 'tier-1-foundation',
    tierLabel: 'Tier 1: Foundations & Silicon Memory (1-30)',
    title: 'Mission 25: ASCII Math & Lowercase-to-Uppercase Conversion',
    category: 'Foundations & Operators',
    themeIcon: '🔠',
    realLifeAnalogy: {
      story: 'Capitalizing names on Aadhaar cards: In the ASCII table, \'A\' is 65 and \'a\' is 97. The difference is exactly 32! Subtracting 32 turns any lowercase letter into uppercase!',
      physicalConcept: '32 in binary is 00100000 (Bit 5). Toggling bit 5 flips case between upper and lower.',
      ruleOfThumb: 'upper = lower - 32; lower = upper + 32.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Arithmetic case conversion',
        description: 'Subtracts 32 from lowercase char.',
        code: `#include <stdio.h>

int main(void) {
    char lower = 'm';
    char upper = lower - 32;
    printf("Lowercase: %c -> Uppercase: %c\\n", lower, upper);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Bitwise mask case conversion',
        description: 'Clears bit 5 directly via bitwise AND with ~32.',
        code: `#include <stdio.h>

int main(void) {
    char ch = 'm';
    char up = ch & ~32; // Clears bit 5
    printf("Lowercase: %c -> Uppercase: %c\\n", ch, up);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['AL'],
      assemblyNotes: 'sub al, 32 -> 1-byte subtraction in low 8-bit register.',
      ramFootprint: '2 bytes on stack frame.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'p-25-1', code: '#include <stdio.h>\nint main(void) {', hint: 'Start program' },
        { id: 'p-25-2', code: "    char lower = 'm';", hint: 'Init lowercase char' },
        { id: 'p-25-3', code: '    char upper = lower - 32;', hint: 'Subtract 32' },
        { id: 'p-25-4', code: '    printf("Lowercase: %c -> Uppercase: %c\\n", lower, upper);', hint: 'Print result' },
        { id: 'p-25-5', code: '    return 0;\n}', hint: 'Close' }
      ],
      correctOrder: ['p-25-1', 'p-25-2', 'p-25-3', 'p-25-4', 'p-25-5']
    },
    expectedOutput: 'Lowercase: m -> Uppercase: M',
    cKeywordsUsed: ['char', 'int', 'return', 'void'],
    daaComplexity: {
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)',
      algorithmClass: 'ASCII Byte Transformation'
    }
  },
  {
    id: 26,
    slug: 'level-26-constant-variables',
    tier: 'tier-1-foundation',
    tierLabel: 'Tier 1: Foundations & Silicon Memory (1-30)',
    title: 'Mission 26: Constant Variables (const) & Tax Lock-in',
    category: 'Foundations & Operators',
    themeIcon: '🔒',
    realLifeAnalogy: {
      story: 'Indian GST rate is locked at 18% by government statute. If a programmer accidentally modifies GST = 0 inside billing code, revenue is lost! const prevents modification.',
      physicalConcept: 'Global const is stored in .rodata (read-only data segment). Writing triggers a hardware memory fault.',
      ruleOfThumb: 'Use const for any configuration parameter that should never change at runtime.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Const GST calculation',
        description: 'Locks GST rate with const qualifier.',
        code: `#include <stdio.h>

int main(void) {
    const int GST_PERCENT = 18;
    int baseAmount = 1000;
    int tax = (baseAmount * GST_PERCENT) / 100;
    printf("Base: Rs. %d | GST Tax: Rs. %d | Total: Rs. %d\\n", baseAmount, tax, baseAmount + tax);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Const expression evaluation',
        description: 'Clean compile-time locked evaluation.',
        code: `#include <stdio.h>

int main(void) {
    const int base = 1000, gst = 18;
    printf("Base: Rs. %d | GST Tax: Rs. %d | Total: Rs. %d\\n", base, (base * gst) / 100, base + (base * gst) / 100);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'rodata',
      cpuRegisters: ['EAX'],
      assemblyNotes: 'Compiler enforces read-only access. Attempting to assign triggers compile error.',
      ramFootprint: '4 bytes.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'p-26-1', code: '#include <stdio.h>\nint main(void) {', hint: 'Start program' },
        { id: 'p-26-2', code: '    const int GST_PERCENT = 18;\n    int baseAmount = 1000;', hint: 'Declare const GST' },
        { id: 'p-26-3', code: '    int tax = (baseAmount * GST_PERCENT) / 100;', hint: 'Compute tax' },
        { id: 'p-26-4', code: '    printf("Base: Rs. %d | GST Tax: Rs. %d | Total: Rs. %d\\n", baseAmount, tax, baseAmount + tax);', hint: 'Print receipt' },
        { id: 'p-26-5', code: '    return 0;\n}', hint: 'Close' }
      ],
      correctOrder: ['p-26-1', 'p-26-2', 'p-26-3', 'p-26-4', 'p-26-5']
    },
    expectedOutput: 'Base: Rs. 1000 | GST Tax: Rs. 180 | Total: Rs. 1180',
    cKeywordsUsed: ['const', 'int', 'return', 'void'],
    daaComplexity: {
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)',
      algorithmClass: 'Constant Qualifier'
    }
  },
  {
    id: 27,
    slug: 'level-27-escape-sequences',
    tier: 'tier-1-foundation',
    tierLabel: 'Tier 1: Foundations & Silicon Memory (1-30)',
    title: 'Mission 27: Escape Sequences (\\n, \\t, \\") & Tabular Receipt',
    category: 'Foundations & Operators',
    themeIcon: '🧾',
    realLifeAnalogy: {
      story: 'Printing a neat restaurant receipt: Items, quantities, and prices need to line up in vertical columns. We use \\t (horizontal tab) and \\n (newline) to format tables!',
      physicalConcept: '\\t emits ASCII code 9 (Tab stop). \\n emits ASCII code 10 (Line Feed).',
      ruleOfThumb: 'Escape sequences begin with backslash \\ to represent non-printable control codes.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Tabular receipt formatting',
        description: 'Uses \\t and \\n to structure receipt columns.',
        code: `#include <stdio.h>

int main(void) {
    printf("ITEM\\t\\tQTY\\tPRICE\\n");
    printf("Masala Chai\\t2\\tRs. 30\\n");
    printf("Samosa\\t\\t3\\tRs. 45\\n");
    return 0;
}`
      },
      optimizedPro: {
        name: 'Single multi-line literal',
        description: 'Single printf string with escape sequences.',
        code: `#include <stdio.h>

int main(void) {
    printf("ITEM\\t\\tQTY\\tPRICE\\nMasala Chai\\t2\\tRs. 30\\nSamosa\\t\\t3\\tRs. 45\\n");
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'rodata',
      cpuRegisters: ['RDI'],
      assemblyNotes: 'String with embedded \\t (0x09) and \\n (0x0A) stored in .rodata.',
      ramFootprint: '64 bytes in rodata.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'p-27-1', code: '#include <stdio.h>\nint main(void) {', hint: 'Start program' },
        { id: 'p-27-2', code: '    printf("ITEM\\t\\tQTY\\tPRICE\\n");', hint: 'Header row' },
        { id: 'p-27-3', code: '    printf("Masala Chai\\t2\\tRs. 30\\n");', hint: 'Chai row' },
        { id: 'p-27-4', code: '    printf("Samosa\\t\\t3\\tRs. 45\\n");', hint: 'Samosa row' },
        { id: 'p-27-5', code: '    return 0;\n}', hint: 'Close' }
      ],
      correctOrder: ['p-27-1', 'p-27-2', 'p-27-3', 'p-27-4', 'p-27-5']
    },
    expectedOutput: 'ITEM\t\tQTY\tPRICE\nMasala Chai\t2\tRs. 30\nSamosa\t\t3\tRs. 45',
    cKeywordsUsed: ['int', 'return', 'void'],
    daaComplexity: {
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)',
      algorithmClass: 'Formatted Output'
    }
  },
  {
    id: 28,
    slug: 'level-28-hexadecimal-constants',
    tier: 'tier-1-foundation',
    tierLabel: 'Tier 1: Foundations & Silicon Memory (1-30)',
    title: 'Mission 28: Hexadecimal Literals (0x) & RGB Color Codes',
    category: 'Foundations & Operators',
    themeIcon: '🎨',
    realLifeAnalogy: {
      story: 'HTML CSS colors like #FF5733: In C graphics programming, colors are represented as hexadecimal integer literals prefixed with 0x!',
      physicalConcept: 'Each hexadecimal digit represents exactly 4 binary bits (nibble). 2 hex digits = 1 byte.',
      ruleOfThumb: '0x prefix specifies base-16. Use %X or %x in printf to print hex values.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Hexadecimal color value',
        description: 'Inspects hex integer literal and prints decimal and hex.',
        code: `#include <stdio.h>

int main(void) {
    int saffronColor = 0xFF9933; // Indian Saffron Color
    printf("Color Hex: 0x%X | Decimal Value: %d\\n", saffronColor, saffronColor);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Extracting RGB byte channels',
        description: 'Using shifts to extract Red, Green, Blue bytes.',
        code: `#include <stdio.h>

int main(void) {
    int color = 0xFF9933;
    printf("Red Channel: 0x%X\\n", (color >> 16) & 0xFF);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['EAX'],
      assemblyNotes: 'mov dword ptr [rbp-4], 16750899 -> Hex 0xFF9933 loaded as integer.',
      ramFootprint: '4 bytes on stack.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'p-28-1', code: '#include <stdio.h>\nint main(void) {', hint: 'Start program' },
        { id: 'p-28-2', code: '    int saffronColor = 0xFF9933;', hint: 'Hex variable' },
        { id: 'p-28-3', code: '    printf("Color Hex: 0x%X | Decimal Value: %d\\n", saffronColor, saffronColor);', hint: 'Print hex' },
        { id: 'p-28-4', code: '    return 0;\n}', hint: 'Close' }
      ],
      correctOrder: ['p-28-1', 'p-28-2', 'p-28-3', 'p-28-4']
    },
    expectedOutput: 'Color Hex: 0xFF9933 | Decimal Value: 16750899',
    cKeywordsUsed: ['int', 'return', 'void'],
    daaComplexity: {
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)',
      algorithmClass: 'Base-16 Radix Encoding'
    }
  },
  {
    id: 29,
    slug: 'level-29-operator-precedence',
    tier: 'tier-1-foundation',
    tierLabel: 'Tier 1: Foundations & Silicon Memory (1-30)',
    title: 'Mission 29: Operator Precedence & Evaluation Order',
    category: 'Foundations & Operators',
    themeIcon: '📐',
    realLifeAnalogy: {
      story: 'Math classroom PEMDAS rules: 10 + 5 * 2 is NOT 30! Multiplication happens before addition, giving 20. Parentheses override all precedence.',
      physicalConcept: 'Parser grammar rules construct the AST (Abstract Syntax Tree) evaluating high-precedence operator subtrees first.',
      ruleOfThumb: 'When in doubt, always use explicit parentheses ( ) to clarify evaluation order!'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Precedence expression',
        description: 'Evaluates standard precedence vs parenthesized expression.',
        code: `#include <stdio.h>

int main(void) {
    int normal = 10 + 5 * 2;       // 10 + 10 = 20
    int grouped = (10 + 5) * 2;     // 15 * 2 = 30
    printf("Without Parens: %d | With Parens: %d\\n", normal, grouped);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Direct precedence streaming',
        description: 'Inline precedence comparison.',
        code: `#include <stdio.h>

int main(void) {
    printf("Without Parens: %d | With Parens: %d\\n", 10 + 5 * 2, (10 + 5) * 2);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['EAX', 'IMUL instruction'],
      assemblyNotes: 'imul eax, 5, 2; add eax, 10 -> Multiplication evaluated before addition.',
      ramFootprint: '8 bytes on stack.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'p-29-1', code: '#include <stdio.h>\nint main(void) {', hint: 'Start program' },
        { id: 'p-29-2', code: '    int normal = 10 + 5 * 2;\n    int grouped = (10 + 5) * 2;', hint: 'Define expressions' },
        { id: 'p-29-3', code: '    printf("Without Parens: %d | With Parens: %d\\n", normal, grouped);', hint: 'Print result' },
        { id: 'p-29-4', code: '    return 0;\n}', hint: 'Close' }
      ],
      correctOrder: ['p-29-1', 'p-29-2', 'p-29-3', 'p-29-4']
    },
    expectedOutput: 'Without Parens: 20 | With Parens: 30',
    cKeywordsUsed: ['int', 'return', 'void'],
    daaComplexity: {
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)',
      algorithmClass: 'Expression Parsing'
    }
  },
  {
    id: 30,
    slug: 'level-30-tier-1-capstone-invoice',
    tier: 'tier-1-foundation',
    tierLabel: 'Tier 1: Foundations & Silicon Memory (1-30)',
    title: 'Mission 30: Tier 1 Capstone: Kirana Store GST Billing Engine',
    category: 'Foundations & Operators',
    themeIcon: '🏆',
    realLifeAnalogy: {
      story: 'The Ultimate Tier 1 Mastery Test: Building an automated retail checkout engine for a grocery store in Jaipur! Combining variables, arithmetic, float conversions, GST tax, and formatted terminal receipts.',
      physicalConcept: 'Combines multiple data types (int, float, char), compound arithmetic, and formatted escape sequences.',
      ruleOfThumb: 'Professional C code combines types cleanly with zero compiler warnings.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Complete retail invoice engine',
        description: 'Calculates subtotal, applies 18% GST, and formats an authentic receipt.',
        code: `#include <stdio.h>

int main(void) {
    int riceQty = 3;        // 3 kg
    float riceRate = 60.0f; // Rs. 60 per kg
    int dalQty = 2;         // 2 kg
    float dalRate = 120.0f; // Rs. 120 per kg

    float subtotal = (riceQty * riceRate) + (dalQty * dalRate);
    float gst = subtotal * 0.18f;
    float grandTotal = subtotal + gst;

    printf("--- JAIPUR KIRANA STORE INVOICE ---\\n");
    printf("Subtotal:    Rs. %.2f\\n", subtotal);
    printf("GST (18%%):   Rs. %.2f\\n", gst);
    printf("Grand Total: Rs. %.2f (Rupees)\\n", grandTotal);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Structured invoice math',
        description: 'Compact invoice calculation using const qualifiers.',
        code: `#include <stdio.h>

int main(void) {
    const float sub = (3 * 60.0f) + (2 * 120.0f);
    const float total = sub * 1.18f;
    printf("--- JAIPUR KIRANA STORE INVOICE ---\\nSubtotal:    Rs. %.2f\\nGST (18%%):   Rs. %.2f\\nGrand Total: Rs. %.2f (Rupees)\\n",
           sub, sub * 0.18f, total);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['XMM0', 'XMM1', 'MULSS', 'ADDSS'],
      assemblyNotes: 'Floating point calculations performed in SSE registers with single-precision accuracy.',
      ramFootprint: '24 bytes total on stack frame.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'p-30-1', code: '#include <stdio.h>\nint main(void) {', hint: 'Start program' },
        { id: 'p-30-2', code: '    float subtotal = (3 * 60.0f) + (2 * 120.0f);\n    float gst = subtotal * 0.18f;\n    float grandTotal = subtotal + gst;', hint: 'Compute invoice' },
        { id: 'p-30-3', code: '    printf("--- JAIPUR KIRANA STORE INVOICE ---\\n");', hint: 'Banner' },
        { id: 'p-30-4', code: '    printf("Subtotal:    Rs. %.2f\\nGST (18%%):   Rs. %.2f\\nGrand Total: Rs. %.2f (Rupees)\\n", subtotal, gst, grandTotal);', hint: 'Print totals' },
        { id: 'p-30-5', code: '    return 0;\n}', hint: 'Finish capstone' }
      ],
      correctOrder: ['p-30-1', 'p-30-2', 'p-30-3', 'p-30-4', 'p-30-5']
    },
    expectedOutput: '--- JAIPUR KIRANA STORE INVOICE ---\nSubtotal:    Rs. 420.00\nGST (18%):   Rs. 75.60\nGrand Total: Rs. 495.60 (Rupees)',
    cKeywordsUsed: ['int', 'float', 'return', 'void'],
    daaComplexity: {
      timeComplexity: 'O(1) Constant Arithmetic',
      spaceComplexity: 'O(1) Stack',
      algorithmClass: 'Enterprise Billing Pipeline'
    }
  }
];
