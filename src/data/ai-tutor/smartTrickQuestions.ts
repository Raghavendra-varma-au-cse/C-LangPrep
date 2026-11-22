export interface SmartTrickQuestion {
  id: string;
  category: 'control-flow' | 'types-arithmetic' | 'pointers-memory' | 'preprocessor-macro' | 'structs-hardware';
  categoryLabel: string;
  topic: string;
  question: string;
  codeSnippet?: string;
  trickTrap: string;
  options: string[];
  correctIdx: number;
  explanation: string;
  hardwareReality: string;
}

export const SMART_TRICK_QUESTIONS: SmartTrickQuestion[] = [
  // ==========================================
  // CATEGORY 1: CONTROL FLOW & SYNTAX TRAPS
  // ==========================================
  {
    id: "trick-semicolon-if",
    category: "control-flow",
    categoryLabel: "Control Flow & Syntax",
    topic: "The Semicolon If-Statement Pitfall",
    question: "What does this C code print to the console?",
    codeSnippet: `#include <stdio.h>

int main(void) {
    int a = 5;
    if (a > 10);
    {
        printf("YES\\n");
    }
    return 0;
}`,
    trickTrap: "Examine the character immediately following `if (a > 10)`!",
    options: [
      "Prints nothing because 5 is not greater than 10",
      "Prints YES! (The semicolon creates an empty null statement, making the block unconditional)",
      "Compile-time syntax error on semicolon",
      "Undefined behavior"
    ],
    correctIdx: 1,
    explanation: "Putting a semicolon directly after `if (a > 10);` terminates the if-branch as an empty statement! The `{ printf(\"YES\\n\"); }` block is treated as an independent standalone scope block that executes unconditionally regardless of `a`.",
    hardwareReality: "The CPU evaluates the conditional jump (JLE) to jump over a single NOP instruction, falling straight into the printf call."
  },
  {
    id: "trick-assignment-in-if",
    category: "control-flow",
    categoryLabel: "Control Flow & Syntax",
    topic: "Single Equal (=) Assignment vs Double Equal (==)",
    question: "What will this conditional branch output?",
    codeSnippet: `#include <stdio.h>

int main(void) {
    int score = 0;
    if (score = 10) {
        printf("PASSED\\n");
    } else {
        printf("FAILED\\n");
    }
    return 0;
}`,
    trickTrap: "`score = 10` is an assignment operator, NOT a comparison equality check!",
    options: [
      "Prints FAILED because score was initialized to 0",
      "Prints PASSED! (Assignment `score = 10` evaluates to 10, which is non-zero truthy!)",
      "Compile-time syntax error",
      "Runtime exception"
    ],
    correctIdx: 1,
    explanation: "`score = 10` assigns 10 to variable score and evaluates to the assigned value 10. In C, any non-zero value is logically TRUE, so the if-block executes unconditionally!",
    hardwareReality: "Stores 10 into register EAX, executes `TEST EAX, EAX`, flags condition not-zero (NZ), and branches into the true path."
  },
  {
    id: "trick-switch-fallthrough",
    category: "control-flow",
    categoryLabel: "Control Flow & Syntax",
    topic: "Switch Statement Missing Break Fall-Through",
    question: "What will this switch-case output?",
    codeSnippet: `#include <stdio.h>

int main(void) {
    int token = 2;
    switch (token) {
        case 1: printf("ONE ");
        case 2: printf("TWO ");
        case 3: printf("THREE ");
        default: printf("DONE");
    }
    return 0;
}`,
    trickTrap: "Notice that none of the case blocks contain a `break;` statement!",
    options: [
      "TWO",
      "TWO THREE DONE (Without break, execution falls through all remaining cases!)",
      "ONE TWO THREE DONE",
      "Compile error: duplicate case statements"
    ],
    correctIdx: 1,
    explanation: "In C, switch cases are mere label entry points. Once the CPU jumps to `case 2:`, without a `break;` instruction it continues falling through sequentially to execute `case 3:` and `default:`!",
    hardwareReality: "Switch jump table branches instruction pointer (RIP) to .L_case2. CPU executes contiguous machine instructions until RET."
  },
  {
    id: "trick-short-circuit-eval",
    category: "control-flow",
    categoryLabel: "Control Flow & Syntax",
    topic: "Logical OR Short-Circuit Evaluation Side Effect",
    question: "What is the final value of variable `b` after this statement?",
    codeSnippet: `#include <stdio.h>

int main(void) {
    int a = 1;
    int b = 0;
    if (a || ++b) {
        printf("b = %d\\n", b);
    }
    return 0;
}`,
    trickTrap: "Does the CPU evaluate the right side `++b` if the left side `a` is already non-zero?",
    options: [
      "b = 1 (Both sides are always executed)",
      "b = 0 (Short-circuit skips ++b completely because left side is already TRUE!)",
      "b = 2",
      "Compiler warning error"
    ],
    correctIdx: 1,
    explanation: "C uses Short-Circuit Evaluation. In `A || B`, if A is true (non-zero), the entire condition is guaranteed true, so the compiler skips evaluating B entirely! Therefore, `++b` never runs and `b` remains 0.",
    hardwareReality: "Test of `a` sets condition flag. Conditional jump branches immediately into the if body, bypassing the increment instructions."
  },

  // ==========================================
  // CATEGORY 2: TYPES & ARITHMETIC TRAPS
  // ==========================================
  {
    id: "trick-int-division",
    category: "types-arithmetic",
    categoryLabel: "Types & Arithmetic",
    topic: "Integer Division Truncation Trap",
    question: "What will `printf(\"%.2f\\n\", 5 / 2);` print when assigned to float?",
    codeSnippet: `#include <stdio.h>

int main(void) {
    float result = 5 / 2;
    printf("%.2f\\n", result);
    return 0;
}`,
    trickTrap: "Both 5 and 2 are integer literals in C!",
    options: [
      "2.50",
      "2.00 (Integer division discards .5 decimal before promotion to float!)",
      "3.00 (Rounds to nearest whole)",
      "0.00"
    ],
    correctIdx: 1,
    explanation: "In C, integer / integer performs integer division which truncates toward zero (5 / 2 = 2). Only AFTER this integer result is computed is 2 cast to float 2.00. To preserve decimals, write `5.0 / 2` or `(float)5 / 2`.",
    hardwareReality: "The ALU executes the integer IDIV instruction, discarding the remainder register before moving to the XMM float register."
  },
  {
    id: "trick-unsigned-underflow",
    category: "types-arithmetic",
    categoryLabel: "Types & Arithmetic",
    topic: "Unsigned Integer Underflow Wrap-Around",
    question: "What happens when subtracting 1 from unsigned int zero?",
    codeSnippet: `#include <stdio.h>

int main(void) {
    unsigned int count = 0;
    count = count - 1;
    printf("%u\\n", count);
    return 0;
}`,
    trickTrap: "Can an unsigned integer store negative numbers?",
    options: [
      "-1",
      "4294967295 (Wraps around to 2^32 - 1 / 0xFFFFFFFF in modular arithmetic!)",
      "0 (Clamped to minimum)",
      "Runtime crash"
    ],
    correctIdx: 1,
    explanation: "Unsigned arithmetic in C is defined modulo 2^N and cannot overflow or underflow negatively. 0 - 1 wraps around to maximum 32-bit unsigned integer value 4,294,967,295 (0xFFFFFFFF)!",
    hardwareReality: "Subtracting 1 from 0x00000000 sets all 32 bits to 1 (0xFFFFFFFF) with carry flag set."
  },
  {
    id: "trick-float-equality",
    category: "types-arithmetic",
    categoryLabel: "Types & Arithmetic",
    topic: "Floating-Point Exact Equality Trap",
    question: "Why does `if (f == 0.1)` evaluate to FALSE for `float f = 0.1f`?",
    codeSnippet: `#include <stdio.h>

int main(void) {
    float f = 0.1f;
    if (f == 0.1) {
        printf("EQUAL\\n");
    } else {
        printf("NOT EQUAL\\n");
    }
    return 0;
}`,
    trickTrap: "What is the data type of the literal `0.1` without an `f` suffix?",
    options: [
      "Prints EQUAL",
      "Prints NOT EQUAL! (0.1 is double-precision 64-bit; 0.1f is 32-bit with precision difference!)",
      "Syntax error",
      "Undefined behavior"
    ],
    correctIdx: 1,
    explanation: "In C, decimal literal `0.1` without suffix is a 64-bit double, while `f` is 32-bit float. In binary IEEE-754, 0.1 is a repeating fraction. When promoted, `(double)0.1f` is `0.10000000149...` while `0.1` is `0.1000000000000000055...`. They are not equal!",
    hardwareReality: "COMPSD compares 64-bit double precision registers XMM0 and XMM1. Lower mantissa bits do not match."
  },
  {
    id: "trick-octal-literal",
    category: "types-arithmetic",
    categoryLabel: "Types & Arithmetic",
    topic: "The Sneaky Leading Zero Octal Trap",
    question: "What does `int x = 025;` evaluate to in decimal?",
    codeSnippet: `#include <stdio.h>

int main(void) {
    int x = 025;
    printf("%d\\n", x);
    return 0;
}`,
    trickTrap: "Notice the leading zero `0` in front of 25!",
    options: [
      "25",
      "21 (In C, any integer literal starting with 0 is parsed in Base 8 / Octal!)",
      "0",
      "Syntax error because 25 is not octal"
    ],
    correctIdx: 1,
    explanation: "In C, prefix `0` signifies an Octal (base 8) number! `025` = 2 * 8^1 + 5 * 8^0 = 16 + 5 = 21 in decimal. Never prefix numbers with 0 unless intending octal!",
    hardwareReality: "The compiler lexer scans leading '0' as octal digit stream, converting to binary value 0b00010101 (21)."
  },

  // ==========================================
  // CATEGORY 3: POINTERS & MEMORY TRAPS
  // ==========================================
  {
    id: "trick-array-index-commutative",
    category: "pointers-memory",
    categoryLabel: "Pointers & Memory",
    topic: "Commutative Array Indexing (3[arr])",
    question: "Is `3[arr]` valid C syntax?",
    codeSnippet: `#include <stdio.h>

int main(void) {
    int arr[5] = {10, 20, 30, 40, 50};
    printf("%d\\n", 3[arr]);
    return 0;
}`,
    trickTrap: "The integer literal is written outside and array name inside brackets!",
    options: [
      "Compile-time syntax error",
      "Valid! Prints 40 because arr[3] == *(arr + 3) == *(3 + arr) == 3[arr]!",
      "Prints 3",
      "Segmentation fault"
    ],
    correctIdx: 1,
    explanation: "In C, `arr[i]` is defined as pointer dereference `*(arr + i)`. Because pointer addition is commutative, `*(arr + 3)` is mathematically identical to `*(3 + arr)`, which can also be written as `3[arr]`!",
    hardwareReality: "x86 SIB (Scale-Index-Base) addressing [base + index*4] is completely commutative in CPU address generation."
  },
  {
    id: "trick-sizeof-pointer-decay",
    category: "pointers-memory",
    categoryLabel: "Pointers & Memory",
    topic: "Array Parameter Decay to Pointer",
    question: "What will `sizeof(arr)` print inside this helper function?",
    codeSnippet: `#include <stdio.h>

void printSize(int arr[100]) {
    printf("%zu\\n", sizeof(arr));
}

int main(void) {
    int data[100];
    printSize(data);
    return 0;
}`,
    trickTrap: "Even though declared as `int arr[100]`, what does the function actually receive?",
    options: [
      "400 bytes (100 ints * 4 bytes)",
      "8 bytes (Array decays to a 64-bit pointer int* when passed as parameter!)",
      "100 bytes",
      "Compile error"
    ],
    correctIdx: 1,
    explanation: "In C, array parameters decay into raw pointers to their first element. `int arr[100]` inside a parameter list is silently rewritten by the compiler to `int *arr`. Thus `sizeof(arr)` returns the size of an 8-byte pointer!",
    hardwareReality: "System V AMD64 calling convention passes the array address in register RDI; no array elements are copied."
  },
  {
    id: "trick-dangling-stack-pointer",
    category: "pointers-memory",
    categoryLabel: "Pointers & Memory",
    topic: "Returning Address of Local Stack Variable",
    question: "What is the fatal flaw in this function?",
    codeSnippet: `#include <stdio.h>

int* getSecretNumber(void) {
    int secret = 777;
    return &secret; // Returning address of local stack variable!
}

int main(void) {
    int *p = getSecretNumber();
    printf("%d\\n", *p);
    return 0;
}`,
    trickTrap: "What happens to the stack memory of `secret` when `getSecretNumber()` returns?",
    options: [
      "Completely valid, prints 777 reliably",
      "Fatal Dangling Pointer! (Local variable stack frame is popped/deallocated on return)",
      "Syntax error on return type",
      "Compile error: cannot take address of int"
    ],
    correctIdx: 1,
    explanation: "Local variable `secret` exists only while `getSecretNumber()` is on the call stack. Once the function returns, its stack frame is invalidated and will be overwritten by future function calls. Accessing `*p` is undefined behavior!",
    hardwareReality: "CPU adjusts RSP register back to caller base. Memory at [RSP-4] is reused by subsequent function calls."
  },
  {
    id: "trick-rodata-string-modification",
    category: "pointers-memory",
    categoryLabel: "Pointers & Memory",
    topic: "String Literal Read-Only Memory (.rodata Segfault)",
    question: "What happens when attempting to modify `s[0] = 'H';`?",
    codeSnippet: `#include <stdio.h>

int main(void) {
    char *s = "hello";
    s[0] = 'H'; // Attempting in-place mutation
    printf("%s\\n", s);
    return 0;
}`,
    trickTrap: "Where does the compiler store string literal `\"hello\"` in virtual memory?",
    options: [
      "Prints 'Hello'",
      "Segmentation Fault! (String literals are stored in read-only .rodata page)",
      "Compilation error",
      "Prints 'h'"
    ],
    correctIdx: 1,
    explanation: "`\"hello\"` is placed in the `.rodata` (read-only data) section of the binary. Writing to read-only memory causes the OS Memory Management Unit (MMU) to immediately abort the process with a SIGSEGV crash! Use `char s[] = \"hello\";` for mutable stack strings.",
    hardwareReality: "MMU page table entry for .rodata has Write bit set to 0. Writing generates CPU Exception 14 (Page Fault)."
  },

  // ==========================================
  // CATEGORY 4: MACROS & PREPROCESSOR TRAPS
  // ==========================================
  {
    id: "trick-macro-parentheses",
    category: "preprocessor-macro",
    categoryLabel: "Macros & Preprocessor",
    topic: "Macro Operator Precedence Trap",
    question: "What does `SQUARE(2 + 3)` evaluate to?",
    codeSnippet: `#include <stdio.h>

#define SQUARE(x) x * x

int main(void) {
    int ans = SQUARE(2 + 3);
    printf("%d\\n", ans);
    return 0;
}`,
    trickTrap: "Macros perform textual replacement BEFORE arithmetic precedence is evaluated!",
    options: [
      "25 (5 * 5)",
      "11 (Textual replacement yields: 2 + 3 * 2 + 3 = 2 + 6 + 3 = 11!)",
      "10",
      "Syntax error"
    ],
    correctIdx: 1,
    explanation: "Macros are purely textual substitutions. `SQUARE(2 + 3)` expands verbatim to `2 + 3 * 2 + 3`. Due to operator precedence, multiplication runs first: `3 * 2 = 6`, resulting in `2 + 6 + 3 = 11`. Always enclose macro arguments in parentheses: `#define SQUARE(x) ((x) * (x))`!",
    hardwareReality: "The preprocessor runs before the C parser, altering the order of AST multiplication and addition nodes."
  },
  {
    id: "trick-macro-side-effect",
    category: "preprocessor-macro",
    categoryLabel: "Macros & Preprocessor",
    topic: "Macro Parameter Double Evaluation Side Effect",
    question: "What is `a` after `int r = MAX(a++, 5);`?",
    codeSnippet: `#include <stdio.h>

#define MAX(x, y) ((x) > (y) ? (x) : (y))

int main(void) {
    int a = 6;
    int r = MAX(a++, 5);
    printf("a = %d, r = %d\\n", a, r);
    return 0;
}`,
    trickTrap: "How many times does the macro expand argument `x`?",
    options: [
      "a = 7, r = 6",
      "a = 8, r = 7 (a++ is evaluated TWICE: once in condition and once in expression!)",
      "a = 6, r = 6",
      "Undefined behavior"
    ],
    correctIdx: 1,
    explanation: "`MAX(a++, 5)` expands to `((a++) > (5) ? (a++) : (5))`. Because `a` (6) > 5 is true, the true-branch `(a++)` is evaluated, incrementing `a` a second time! `a` becomes 8 and `r` receives 7.",
    hardwareReality: "Two separate INC instructions are compiled into the binary sequence."
  },

  // ==========================================
  // CATEGORY 5: STRUCTS & HARDWARE REALITIES
  // ==========================================
  {
    id: "trick-struct-padding-size",
    category: "structs-hardware",
    categoryLabel: "Structures & Hardware",
    topic: "Struct Memory Alignment & Padding Overhead",
    question: "What is `sizeof(struct Demo)` on a 64-bit architecture?",
    codeSnippet: `#include <stdio.h>

struct Demo {
    char a;   // 1 byte
    int b;    // 4 bytes
    char c;   // 1 byte
};

int main(void) {
    printf("%zu\\n", sizeof(struct Demo));
    return 0;
}`,
    trickTrap: "Does the CPU lay out struct members without any gaps?",
    options: [
      "6 bytes (1 + 4 + 1)",
      "12 bytes (Compiler adds 3 padding bytes after 'a' and 3 padding bytes after 'c' for 4-byte alignment!)",
      "8 bytes",
      "16 bytes"
    ],
    correctIdx: 1,
    explanation: "CPUs access memory in aligned words. A 4-byte `int` must start at an address divisible by 4. So `char a` (1 byte) is padded with 3 empty bytes. `char c` (1 byte) is padded with 3 trailing bytes so arrays of this struct remain aligned, totaling 12 bytes!",
    hardwareReality: "Unaligned memory access requires two separate memory bus read cycles; compilers insert padding to ensure single-cycle reads."
  },
  {
    id: "trick-sizeof-unevaluated",
    category: "structs-hardware",
    categoryLabel: "Structures & Hardware",
    topic: "Sizeof Unevaluated Operand Property",
    question: "What is the value of `i` after `sizeof(i++)`?",
    codeSnippet: `#include <stdio.h>

int main(void) {
    int i = 5;
    size_t s = sizeof(i++);
    printf("i = %d\\n", i);
    return 0;
}`,
    trickTrap: "Does the `sizeof` operator execute expressions at runtime?",
    options: [
      "i = 6",
      "i = 5! (sizeof is evaluated entirely at compile-time; runtime expressions inside are never executed!)",
      "i = 4",
      "Compilation error"
    ],
    correctIdx: 1,
    explanation: "In C, `sizeof` is a compile-time operator. The compiler inspects only the type of `i++` (which is `int`), emits constant 4, and completely ignores the runtime expression. `i++` is NEVER executed!",
    hardwareReality: "No INC or ADD instruction is generated in assembly; the operand is replaced by immediate constant 4."
  }
];
