import { LessonModule } from '@/types/course';

export const ALL_C_KEYWORDS = [
  { word: "auto", desc: "Default storage class for local variables (allocated on Stack)." },
  { word: "break", desc: "Exits the innermost loop or switch statement immediately." },
  { word: "case", desc: "Labels a branch in a switch statement evaluated via jump table." },
  { word: "char", desc: "1-byte integer data type representing ASCII characters or raw bytes." },
  { word: "const", desc: "Type qualifier marking memory read-only (placed in .rodata segment)." },
  { word: "continue", desc: "Skips remaining body in current loop iteration and steps counter." },
  { word: "default", desc: "Fallback branch in switch when no case matches." },
  { word: "do", desc: "Post-test loop construct guaranteeing at least one execution." },
  { word: "double", desc: "8-byte IEEE 754 double-precision floating-point format." },
  { word: "else", desc: "Executes if prior 'if' conditional evaluation is zero (false)." },
  { word: "enum", desc: "User-defined enumeration type assigning names to integer constants." },
  { word: "extern", desc: "Declares symbol resolved at link-time from another translation unit." },
  { word: "float", desc: "4-byte IEEE 754 single-precision floating-point format." },
  { word: "for", desc: "Pre-test loop with init, condition, and increment expressions." },
  { word: "goto", desc: "Unconditional jump to a labeled statement within function." },
  { word: "if", desc: "Branching statement evaluating an integer expression (non-zero = true)." },
  { word: "inline", desc: "Suggests compiler embed function body at call site to eliminate stack overhead." },
  { word: "int", desc: "Primary signed integer type matching native CPU register word size (usually 4 bytes)." },
  { word: "long", desc: "Extended precision integer type (at least 4 or 8 bytes)." },
  { word: "register", desc: "Suggests storing variable in CPU register instead of RAM stack frame." },
  { word: "restrict", desc: "Pointer qualifier asserting no pointer aliasing for compiler optimization." },
  { word: "return", desc: "Exits current function and loads value into return register (EAX/RAX)." },
  { word: "short", desc: "2-byte signed integer type for compact numeric storage." },
  { word: "signed", desc: "Explicitly flags integer as two's complement signed." },
  { word: "sizeof", desc: "Compile-time operator yielding memory footprint in bytes." },
  { word: "static", desc: "Preserves variable value across calls (.data segment) or limits symbol scope." },
  { word: "struct", desc: "Composite user data type packing contiguous memory fields with byte padding." },
  { word: "switch", desc: "Multi-way branch optimized into jump tables by compiler." },
  { word: "typedef", desc: "Creates an alias identifier for an existing type." },
  { word: "union", desc: "Composite type where all members share identical base memory address." },
  { word: "unsigned", desc: "Integer type representing non-negative values with wrap-around." },
  { word: "void", desc: "Empty type (no value, generic pointer void*, or empty parameter list)." },
  { word: "volatile", desc: "Informs compiler variable may mutate asynchronously (prevents cache optimizations)." },
  { word: "while", desc: "Pre-test loop executing while expression evaluates non-zero." },
  { word: "_Bool", desc: "Standard boolean type storing 0 or 1 (stdbool.h)." },
  { word: "_Complex", desc: "Standard complex number support." }
];

export const COURSE_MODULES: LessonModule[] = [
  {
    id: "module-0",
    moduleNumber: 0,
    title: "Why C & How Machines Think",
    subtitle: "From Real Life to Hardware: Why C Rules the Modern World",
    category: "foundations",
    whyItMatters: "Every operating system (Windows, Linux, macOS, Android, iOS), game engine (Unreal), browser engine (V8, Chromium), and rocket flight controller is built in C/C++. Learning C gives you X-ray vision into computer hardware.",
    realWorldAnalogy: {
      story: "Imagine baking a cake. A recipe is an algorithm. Writing it in English is like writing code. A human baker is the CPU executing instructions step-by-step. If you skip 'preheat oven', the cake fails. Computers are lightning-fast but have zero common sense—they follow every instruction literally.",
      diagramConcept: "Human Intent -> Natural Algorithm -> C Language Source -> Compiler Translation -> Machine Voltage Pulses (0s & 1s)",
      keyTakeaway: "A computer cannot think. Programming is simply giving explicit, unambiguous instructions to solve a problem."
    },
    underTheHoodArchitecture: {
      whatHappensInHardware: "Your code is text stored on your SSD/HDD. The CPU can only execute binary voltage states (0V = 0, 3.3V = 1). The C compiler bridges this gap directly without any heavy virtual machine or runtime interpreter slowing it down.",
      compilerPhase: "Overview: Preprocessor (.i) -> Compiler (.s assembly) -> Assembler (.o machine code) -> Linker (.exe)",
      memoryLayout: "text-segment",
      details: [
        "CPU executes instructions sequentially using the Program Counter (PC/EIP register).",
        "C maps almost 1-to-1 with raw assembly instructions (e.g. MOV, ADD, CMP, JMP).",
        "Zero overhead: C doesn't carry a garbage collector, memory tracking tax, or interpreter."
      ]
    },
    sampleCode: {
      code: `#include <stdio.h>

int main(void) {
    // A computer does exactly what you command, step by step!
    printf("Welcome to C Mastery!\\n");
    printf("You are taking control of raw memory and silicon.\\n");
    return 0;
}`,
      lines: [
        {
          lineNum: 1,
          code: "#include <stdio.h>",
          underTheHood: "Preprocessor Directive: Replaces this line with the full header text of stdio.h before compilation begins. It declares printf() and standard I/O structs.",
          realWorldAnalogy: "Borrowing a recipe toolbox from the kitchen shelf before starting to cook."
        },
        {
          lineNum: 3,
          code: "int main(void) {",
          underTheHood: "The Operating System sets up a process entry point (CRT startup). The OS loader invokes 'main' as the primary thread function. Return type int signals exit status to OS.",
          realWorldAnalogy: "The front door of your building: everyone entering must come through here first."
        },
        {
          lineNum: 5,
          code: 'printf("Welcome to C Mastery!\\n");',
          underTheHood: "Pushes pointer to string literal (stored in .rodata segment) onto CPU stack/registers, invokes write syscall inside C standard library (libc).",
          realWorldAnalogy: "Speaking a clear sentence aloud through a loudspeaker."
        },
        {
          lineNum: 7,
          code: "return 0;",
          underTheHood: "Loads value 0 into EAX/RAX CPU register. Signals to OS that the program completed successfully without errors (exit code 0).",
          realWorldAnalogy: "Handing a thumbs-up slip to your supervisor as you finish the task."
        }
      ]
    },
    interactiveDemoType: "pipeline",
    keywordsCovered: ["int", "return", "void"],
    quiz: [
      {
        id: "q0-1",
        question: "Can a computer think or correct logical oversights on its own?",
        options: [
          "Yes, modern CPUs automatically detect logical mistakes.",
          "No, it mechanically executes instructions exactly as written without common sense.",
          "Only when using compiled languages like C.",
          "Yes, if the compiler optimizes the code."
        ],
        correctIndex: 1,
        explanation: "Computers have zero intuition. They execute exact binary instructions faithfully, which is why algorithms must be logically bulletproof."
      },
      {
        id: "q0-2",
        question: "Why is C chosen for operating systems and high-performance game engines?",
        options: [
          "Because C has an automated background garbage collector.",
          "Because C translates directly to native machine instructions without interpreter lag.",
          "Because C code cannot produce runtime errors.",
          "Because C requires zero compilation."
        ],
        correctIndex: 1,
        explanation: "C offers predictable performance and direct hardware/memory access without garbage collection pauses or interpreter overhead."
      }
    ],
    tasks: [
      {
        id: "task-0",
        title: "Your First Silicon Conversation",
        problemStatement: "Modify the program to output: 'Hello Engineer! I am in control.' followed by a new line.",
        initialCode: `#include <stdio.h>\n\nint main(void) {\n    // Print your first confident message here\n    printf("Change this text!\\n");\n    return 0;\n}`,
        expectedOutput: "Hello Engineer! I am in control.\n",
        hint: "Replace 'Change this text!' inside the quotes with 'Hello Engineer! I am in control.' Keep the \\n.",
        solution: `#include <stdio.h>\n\nint main(void) {\n    printf("Hello Engineer! I am in control.\\n");\n    return 0;\n}`
      }
    ]
  },
  {
    id: "module-1",
    moduleNumber: 1,
    title: "Under The Hood: From Source to Silicon",
    subtitle: "The 4 Epic Stages: Preprocessor, Compiler, Assembler, and Linker",
    category: "foundations",
    whyItMatters: "Students often think pressing 'Run' is magic. Understanding the 4 stages of compilation demystifies 'undefined reference' linker errors, header files, and static vs dynamic libraries.",
    realWorldAnalogy: {
      story: "Think of an architect blueprint sent to a skyscraper construction site. 1) Expanding shorthand notes (Preprocessor), 2) Translating architectural sketches into engineering beam specifications (Compiler), 3) Fabricating exact steel beam bolt patterns (Assembler), 4) Connecting plumbing and electrical cables from external city utilities (Linker).",
      diagramConcept: "code.c --(gcc -E)--> code.i --(gcc -S)--> code.s --(as)--> code.o + libc.a --(ld)--> a.out / program.exe",
      keyTakeaway: "Header files (.h) declare blueprints; library files (.lib/.a/.so/.dll) provide precompiled implementations. The linker binds them together."
    },
    underTheHoodArchitecture: {
      whatHappensInHardware: "The CPU cannot read `#include` or `printf`. The linker resolves the memory jump address to `printf` inside standard library binaries (`libc.so` or `msvcrt.dll`).",
      compilerPhase: "Full 4-phase translation pipeline: Preprocessing -> Syntax Analysis & Code Generation -> Machine Code Assembly -> Static/Dynamic Linking.",
      memoryLayout: "text-segment",
      details: [
        "Preprocessor (#): strips comments, resolves #include, expands #define macros.",
        "Compiler: performs lexical analysis, parses abstract syntax tree (AST), generates x86/ARM assembly.",
        "Assembler: translates assembly mnemonics into ELF/PE binary object files (.o/.obj).",
        "Linker: links object files with external libraries, resolves symbol addresses into a unified executable."
      ]
    },
    sampleCode: {
      code: `#include <stdio.h>
#define PI 3.14159

int main(void) {
    float radius = 5.0f;
    float area = PI * radius * radius;
    printf("Circle Area: %.2f\\n", area);
    return 0;
}`,
      lines: [
        {
          lineNum: 1,
          code: "#include <stdio.h>",
          underTheHood: "Phase 1 Preprocessor pastes ~800 lines of standard I/O function prototypes into this file.",
          realWorldAnalogy: "Copy-pasting the master catalog of kitchen tools before cooking."
        },
        {
          lineNum: 2,
          code: "#define PI 3.14159",
          underTheHood: "Literal text substitution: Everywhere 'PI' appears in code, it is replaced with raw token 3.14159 before compilation.",
          realWorldAnalogy: "A find-and-replace rule on your notepad."
        },
        {
          lineNum: 5,
          code: "float radius = 5.0f;",
          underTheHood: "Allocates 4 bytes (32-bit IEEE 754) on the active stack frame. Loaded into floating-point register (XMM0).",
          realWorldAnalogy: "Reserving a labeled glass container that only holds fluid decimals."
        },
        {
          lineNum: 6,
          code: "float area = PI * radius * radius;",
          underTheHood: "Compiles to MULSS (Multiply Scalar Single-Precision Floating-Point) CPU hardware instructions.",
          realWorldAnalogy: "Multiplying measurements using a calibrated scientific scale."
        }
      ]
    },
    interactiveDemoType: "pipeline",
    keywordsCovered: ["float", "int", "return", "void"],
    quiz: [
      {
        id: "q1-1",
        question: "Which component is responsible for resolving 'undefined reference to printf' errors?",
        options: [
          "The Preprocessor",
          "The Assembler",
          "The Linker",
          "The CPU Cache"
        ],
        correctIndex: 2,
        explanation: "The Linker combines your object code with external libraries. If it cannot find the machine code for a function you called, it emits an undefined reference error."
      },
      {
        id: "q1-2",
        question: "What does the Preprocessor do when encountering `#define MAX 100`?",
        options: [
          "Allocates 4 bytes in RAM for a constant variable named MAX.",
          "Performs text replacement of every occurrence of MAX with 100 before compiling.",
          "Creates a runtime pointer pointing to 100.",
          "Calculates 100 in the ALU register."
        ],
        correctIndex: 1,
        explanation: "Preprocessing is pure textual substitution. No variables or RAM allocations exist for #define macros."
      }
    ],
    tasks: [
      {
        id: "task-1",
        title: "Macro Calculation & Formatted Output",
        problemStatement: "Define a macro TAX_RATE as 0.05 and calculate total cost for item price 200.0 (price + price * TAX_RATE). Print 'Final Price: 210.00'.",
        initialCode: `#include <stdio.h>\n#define TAX_RATE 0.05\n\nint main(void) {\n    float price = 200.0f;\n    // Calculate and print\n    return 0;\n}`,
        expectedOutput: "Final Price: 210.00\n",
        hint: "Use float finalPrice = price + (price * TAX_RATE); and printf(\"Final Price: %.2f\\n\", finalPrice);",
        solution: `#include <stdio.h>\n#define TAX_RATE 0.05\n\nint main(void) {\n    float price = 200.0f;\n    float finalPrice = price + (price * TAX_RATE);\n    printf("Final Price: %.2f\\n", finalPrice);\n    return 0;\n}`
      }
    ]
  },
  {
    id: "module-2",
    moduleNumber: 2,
    title: "Variables, Data Types & RAM Memory Boxes",
    subtitle: "Understanding Bytes, Addresses, int, float, char, printf & scanf",
    category: "memory",
    whyItMatters: "A variable is NOT an abstract symbol. It is a physical set of microscopic capacitor cells in RAM with a unique hexadecimal address. Once you see memory as numbered boxes, pointers and arrays become intuitive.",
    realWorldAnalogy: {
      story: "Imagine an Amazon fulfillment warehouse with millions of labeled storage bins. Each bin has a unique barcode (memory address, e.g., 0x7FFEE4). A small bin holds a key (char, 1 byte). A medium bin holds a book (int, 4 bytes). A heavy bin holds large apparatus (double, 8 bytes). You cannot fit a couch into a key bin!",
      diagramConcept: "Address: 0x1000 [ 4 bytes (int age) = 21 ] | Address: 0x1004 [ 1 byte (char grade) = 'A' ]",
      keyTakeaway: "Data types tell the CPU two things: How many bytes to reserve, and how to interpret the binary bits inside those bytes."
    },
    underTheHoodArchitecture: {
      whatHappensInHardware: "Declaring `int a = 10;` decrements the CPU Stack Pointer (RSP), reserving 4 contiguous bytes in L1 Cache/DRAM, and writes binary 00000000 00000000 00000000 00001010 into that slot.",
      compilerPhase: "Symbol table allocation during semantic analysis phase.",
      memoryLayout: "stack",
      details: [
        "char: 1 byte (-128 to 127 or 0 to 255 unsigned). Stored as ASCII integer code.",
        "short: 2 bytes (-32,768 to 32,767).",
        "int: 4 bytes (-2,147,483,648 to 2,147,483,647) on standard 32/64-bit systems.",
        "float: 4 bytes IEEE 754 (1 sign bit, 8 exponent bits, 23 mantissa bits).",
        "double: 8 bytes IEEE 754 (53 bits precision).",
        "The & (Address-of) operator extracts the memory location where that box starts."
      ]
    },
    sampleCode: {
      code: `#include <stdio.h>

int main(void) {
    int age = 20;
    float gpa = 3.85f;
    char grade = 'A';

    printf("Age: %d (Stored at RAM: %p)\\n", age, (void*)&age);
    printf("GPA: %.2f (Size: %zu bytes)\\n", gpa, sizeof(gpa));
    printf("Grade: %c (ASCII code: %d)\\n", grade, grade);

    return 0;
}`,
      lines: [
        {
          lineNum: 4,
          code: "int age = 20;",
          underTheHood: "Stack allocation: 4 bytes reserved at current stack offset; binary 0x00000014 written into memory.",
          realWorldAnalogy: "Taking a medium wooden box labeled 'age' and putting 20 marbles inside."
        },
        {
          lineNum: 5,
          code: "float gpa = 3.85f;",
          underTheHood: "IEEE 754 32-bit floating-point bit pattern generated at compile time and pushed onto the stack.",
          realWorldAnalogy: "A calibrated measuring cup holding exactly 3.85 units of water."
        },
        {
          lineNum: 6,
          code: "char grade = 'A';",
          underTheHood: "1 byte stored. Character 'A' is literal number 65 in ASCII binary (01000001).",
          realWorldAnalogy: "Stamping the letter 'A' onto a single mini token tag."
        },
        {
          lineNum: 8,
          code: 'printf("Age: %d (Stored at RAM: %p)\\n", age, (void*)&age);',
          underTheHood: "%d reads 4-byte integer from register; %p prints the hex memory address returned by &age.",
          realWorldAnalogy: "Announcing the marbles count AND reading the exact shelf barcode number."
        }
      ]
    },
    interactiveDemoType: "memory-box",
    keywordsCovered: ["int", "float", "char", "double", "sizeof", "short", "long", "signed", "unsigned"],
    quiz: [
      {
        id: "q2-1",
        question: "Why do we pass `&age` with the '&' symbol into scanf(\"%d\", &age)?",
        options: [
          "Because scanf is a special keyword that requires symbols.",
          "Because scanf needs the physical memory address of the box so it can write directly into it.",
          "Because & converts the variable into a string.",
          "To speed up the CPU clock speed."
        ],
        correctIndex: 1,
        explanation: "Functions in C receive copies of arguments by default. To allow scanf() to modify your variable in your stack frame, you must pass its memory address (&)."
      },
      {
        id: "q2-2",
        question: "What does `sizeof(int)` evaluate to on modern 64-bit systems?",
        options: ["1 byte", "2 bytes", "4 bytes", "8 bits"],
        correctIndex: 2,
        explanation: "On standard x86-64 LP64/LLP64 architecture, standard `int` is 4 bytes (32 bits)."
      }
    ],
    tasks: [
      {
        id: "task-2",
        title: "Two Numbers Total Calculator",
        problemStatement: "Given two numbers a = 15 and b = 35, compute their sum, difference, and product, and print 'Sum: 50, Diff: -20, Prod: 525'.",
        initialCode: `#include <stdio.h>\n\nint main(void) {\n    int a = 15;\n    int b = 35;\n    // Calculate and print\n    return 0;\n}`,
        expectedOutput: "Sum: 50, Diff: -20, Prod: 525\n",
        hint: "Declare int sum = a + b; int diff = a - b; int prod = a * b; and print with printf(\"Sum: %d, Diff: %d, Prod: %d\\n\", sum, diff, prod);",
        solution: `#include <stdio.h>\n\nint main(void) {\n    int a = 15;\n    int b = 35;\n    int sum = a + b;\n    int diff = a - b;\n    int prod = a * b;\n    printf("Sum: %d, Diff: %d, Prod: %d\\n", sum, diff, prod);\n    return 0;\n}`
      }
    ]
  },
  {
    id: "module-3",
    moduleNumber: 3,
    title: "Conditions & Logical Branching",
    subtitle: "Decision Making in Silicon: if, else, switch, and Boolean Logic",
    category: "control-flow",
    whyItMatters: "Programs become intelligent when they can make decisions based on real-time data: approving payments, braking an autonomous car, or authenticating passwords.",
    realWorldAnalogy: {
      story: "A railway switch track. As the train approaches a fork, a sensor checks: 'Is the track ahead clear?' If YES (True / 1), the mechanical lever switches the rails left. If NO (False / 0), the train diverts right.",
      diagramConcept: "Condition (Expression != 0?) ---> [YES] Take Path A | [NO] Take Path B",
      keyTakeaway: "In C, there is no separate magical boolean hardware. Zero (0) is False. Any non-zero value (1, -5, 42) is True!"
    },
    underTheHoodArchitecture: {
      whatHappensInHardware: "The CPU performs a CMP (compare) or TEST instruction between registers, setting hardware flags (Zero Flag ZF, Sign Flag SF) in the FLAGS register. It then executes conditional jump instructions (JE, JNE, JG, JL).",
      compilerPhase: "Control Flow Graph (CFG) generation with basic blocks and conditional branch jumps.",
      memoryLayout: "text-segment",
      details: [
        "In C, conditions evaluate to integer 0 (False) or 1 (True).",
        "Short-circuit evaluation: In `A && B`, if A is 0, B is never evaluated.",
        "In `A || B`, if A is non-zero, B is never evaluated.",
        "Switch-case is compiled into a high-speed Jump Table in memory when cases are dense."
      ]
    },
    sampleCode: {
      code: `#include <stdio.h>

int main(void) {
    int score = 78;

    if (score >= 90) {
        printf("Grade: A (Distinction)\\n");
    } else if (score >= 50) {
        printf("Grade: Pass (Certified)\\n");
    } else {
        printf("Grade: Needs Improvement\\n");
    }

    return 0;
}`,
      lines: [
        {
          lineNum: 6,
          code: "if (score >= 90) {",
          underTheHood: "CPU executes: CMP [score], 90. If score < 90, jumps immediately (JLE) to the next branch.",
          realWorldAnalogy: "A height sensor at a roller coaster: If below line, divert away."
        },
        {
          lineNum: 8,
          code: "} else if (score >= 50) {",
          underTheHood: "Evaluated only if prior branch test jumped. CMP [score], 50 sets flags. 78 >= 50 evaluates true, so inside block executes.",
          realWorldAnalogy: "Second security gate check if VIP status was not granted."
        },
        {
          lineNum: 9,
          code: 'printf("Grade: Pass (Certified)\\n");',
          underTheHood: "Function executed. Afterward, unconditional jump (JMP) skips remaining else blocks to end of switch.",
          realWorldAnalogy: "Stamping your passport and immediately entering the flight gate."
        }
      ]
    },
    interactiveDemoType: "condition-flow",
    keywordsCovered: ["if", "else", "switch", "case", "default", "break", "_Bool"],
    quiz: [
      {
        id: "q3-1",
        question: "In C, what will `if (-7)` evaluate to?",
        options: [
          "False, because negative numbers are invalid in conditions.",
          "True, because any non-zero integer is considered True in C.",
          "Compile-time syntax error.",
          "Undefined behavior."
        ],
        correctIndex: 1,
        explanation: "In C, 0 is strictly False. Any non-zero numeric value (positive or negative) evaluates to True."
      },
      {
        id: "q3-2",
        question: "Why is `break` necessary at the end of each `case` in a `switch` statement?",
        options: [
          "It allocates new memory for the next case.",
          "Without break, execution falls through to the subsequent cases sequentially.",
          "It shuts down the program.",
          "It frees switch variables from the CPU stack."
        ],
        correctIndex: 1,
        explanation: "C switch statements fall through into the next case statements by default unless halted by an explicit 'break' instruction."
      }
    ],
    tasks: [
      {
        id: "task-3",
        title: "Pass or Fail Decider",
        problemStatement: "Check if marks = 42 is a Pass (marks >= 40) or Fail. Print 'Result: Pass' if pass, otherwise 'Result: Fail'.",
        initialCode: `#include <stdio.h>\n\nint main(void) {\n    int marks = 42;\n    // Check and print\n    return 0;\n}`,
        expectedOutput: "Result: Pass\n",
        hint: "Use if (marks >= 40) printf(\"Result: Pass\\n\"); else printf(\"Result: Fail\\n\");",
        solution: `#include <stdio.h>\n\nint main(void) {\n    int marks = 42;\n    if (marks >= 40) {\n        printf("Result: Pass\\n");\n    } else {\n        printf("Result: Fail\\n");\n    }\n    return 0;\n}`
      }
    ]
  },
  {
    id: "module-4",
    moduleNumber: 4,
    title: "Loops & Iterative Execution",
    subtitle: "Automating Repetition: for, while, do-while, and CPU Branch Loops",
    category: "control-flow",
    whyItMatters: "Computers never get tired. Writing a loop allows a tiny 3-line program to process 10 billion stock transactions, render 120 FPS game physics, or scan gigabytes of DNA sequences.",
    realWorldAnalogy: {
      story: "Running laps around a 400m track. You start with lap counter = 1. Condition: run while lap <= 10. Every time you cross the start line, you increment lap by 1 (lap++). When lap hits 11, the condition fails and you stop.",
      diagramConcept: "[Init counter: i=0] -> [Condition: i < N?] -> (YES) Run Body -> [Step: i++] -> Repeat | (NO) Exit",
      keyTakeaway: "A loop is an initialization, a test condition, a payload of instructions, and a step counter. If the step never terminates the condition, an infinite loop occurs!"
    },
    underTheHoodArchitecture: {
      whatHappensInHardware: "The CPU executes loop code, then executes an instruction like `INC ECX`, compares with limit, and executes a backward jump `JNZ loop_start` (Jump if Not Zero) modifying the Instruction Pointer (RIP).",
      compilerPhase: "Loop unrolling and vectorization optimizations during backend code gen.",
      memoryLayout: "registers",
      details: [
        "for loop: perfect when iteration count is known beforehand.",
        "while loop: perfect when looping depends on an external condition (e.g. reading until EOF).",
        "do-while loop: guarantees the loop body executes at least once before checking the condition.",
        "break: forces jump to instruction immediately following the loop.",
        "continue: skips remaining body statements and jumps directly to loop step/update."
      ]
    },
    sampleCode: {
      code: `#include <stdio.h>

int main(void) {
    int sum = 0;

    // Loop from 1 to 5
    for (int i = 1; i <= 5; i++) {
        sum += i;
        printf("Step %d: Running Sum = %d\\n", i, sum);
    }

    printf("Final Sum: %d\\n", sum);
    return 0;
}`,
      lines: [
        {
          lineNum: 7,
          code: "for (int i = 1; i <= 5; i++) {",
          underTheHood: "1. Initializes 'i' register with 1. 2. Tests if i <= 5. 3. At end of body, increments i by 1 (INC) and branches back to test.",
          realWorldAnalogy: "Setting lap counter to 1, checking if <= 5 laps, running lap, then tallying +1."
        },
        {
          lineNum: 8,
          code: "sum += i;",
          underTheHood: "ADD instruction adds current value of register 'i' into register 'sum'.",
          realWorldAnalogy: "Tossing current lap count of coins into a collection jar."
        },
        {
          lineNum: 12,
          code: 'printf("Final Sum: %d\\n", sum);',
          underTheHood: "Executed once loop test fails (when i reaches 6).",
          realWorldAnalogy: "Blowing the final finish whistle after all laps conclude."
        }
      ]
    },
    interactiveDemoType: "loop-trace",
    keywordsCovered: ["for", "while", "do", "break", "continue"],
    quiz: [
      {
        id: "q4-1",
        question: "What is the key difference between a while loop and a do-while loop?",
        options: [
          "A while loop cannot use break statements.",
          "A do-while loop executes its body at least once even if the condition is initially false.",
          "A while loop is executed on the GPU, do-while on the CPU.",
          "do-while loops do not require semicolons at the end."
        ],
        correctIndex: 1,
        explanation: "Because do-while checks its condition at the bottom (post-test), its body executes at least once."
      },
      {
        id: "q4-2",
        question: "What does the `continue` keyword do when executed inside a loop?",
        options: [
          "Terminates the program immediately.",
          "Skips the rest of the current iteration and advances to the next loop step.",
          "Restarts the entire loop from iteration zero.",
          "Pauses execution for 1 millisecond."
        ],
        correctIndex: 1,
        explanation: "'continue' bypasses remaining statements in the current iteration and jumps directly to the step/condition evaluation for the next cycle."
      }
    ],
    tasks: [
      {
        id: "task-4",
        title: "Sum of First N Natural Numbers",
        problemStatement: "Using a for loop, calculate the sum of numbers from 1 to 10 and print 'Total: 55'.",
        initialCode: `#include <stdio.h>\n\nint main(void) {\n    int sum = 0;\n    // Write loop here\n    printf("Total: %d\\n", sum);\n    return 0;\n}`,
        expectedOutput: "Total: 55\n",
        hint: "for (int i = 1; i <= 10; i++) { sum += i; }",
        solution: `#include <stdio.h>\n\nint main(void) {\n    int sum = 0;\n    for (int i = 1; i <= 10; i++) {\n        sum += i;\n    }\n    printf("Total: %d\\n", sum);\n    return 0;\n}`
      }
    ]
  },
  {
    id: "module-5",
    moduleNumber: 5,
    title: "Arrays, Strings & Contiguous Memory",
    subtitle: "Numbered Lockers in RAM, Zero-based Indexing, and Null-Terminators",
    category: "memory",
    whyItMatters: "Handling 1,000 separate variable names like `score1, score2, ... score1000` is impossible. Arrays store collections in unbroken, contiguous memory slots that the CPU can index in 1 clock cycle using base-plus-offset calculation.",
    realWorldAnalogy: {
      story: "A row of numbered school lockers along a corridor wall. Locker 0 is at the entrance. Locker 1 is right next to it, exactly 1 locker width down. Locker 4 is exactly 4 locker widths down. You can calculate any locker location instantly: `Base Address + (Index * Item Size)`.",
      diagramConcept: "Array Base: 0x2000 | [0]=95 (0x2000) | [1]=88 (0x2004) | [2]=72 (0x2008) | [3]=91 (0x200C)",
      keyTakeaway: "Array names decay into a pointer to their first element. That is why arr[i] is mathematically identical to *(arr + i)."
    },
    underTheHoodArchitecture: {
      whatHappensInHardware: "The CPU calculates memory offset using hardware addressing modes: Base Register + (Index Register * Scale Factor). E.g. [RBX + RDI*4]. Zero boundary checks exist in C—accessing out-of-bounds causes buffer overflows!",
      compilerPhase: "Contiguous stack layout allocation with byte alignment padding.",
      memoryLayout: "stack",
      details: [
        "Index starts at 0 because the index represents the mathematical offset distance from base address.",
        "C strings are simply char arrays ending with a null byte '\\0' (ASCII 0) marking the boundary.",
        "Without '\\0', string functions like printf(\"%s\") keep reading memory until they crash (Segmentation Fault).",
        "Multi-dimensional arrays (2D) are laid out in Row-Major order in continuous 1D physical RAM."
      ]
    },
    sampleCode: {
      code: `#include <stdio.h>

int main(void) {
    int scores[3] = {85, 92, 78};
    char greeting[] = "C-Lang";

    printf("scores[0] at %p = %d\\n", (void*)&scores[0], scores[0]);
    printf("scores[1] at %p = %d\\n", (void*)&scores[1], scores[1]);
    printf("scores[2] at %p = %d\\n", (void*)&scores[2], scores[2]);

    printf("String: %s (Length in RAM: %zu bytes)\\n", greeting, sizeof(greeting));
    return 0;
}`,
      lines: [
        {
          lineNum: 4,
          code: "int scores[3] = {85, 92, 78};",
          underTheHood: "Reserves 3 * 4 = 12 contiguous bytes on stack frame. Initializes words: 85, 92, 78.",
          realWorldAnalogy: "Reserving three adjacent lockers in a row and putting notebooks into each."
        },
        {
          lineNum: 5,
          code: 'char greeting[] = "C-Lang";',
          underTheHood: "Reserves 7 bytes on stack: 'C', '-', 'L', 'a', 'n', 'g', '\\0'. The '\\0' is appended automatically by compiler.",
          realWorldAnalogy: "Writing letters on train cars and hanging a red caboose lantern (\\0) at the end."
        },
        {
          lineNum: 8,
          code: 'printf("scores[1] at %p = %d\\n", (void*)&scores[1], scores[1]);',
          underTheHood: "Address of scores[1] is exactly Address of scores[0] + 4 bytes! Instant offset.",
          realWorldAnalogy: "Walking exactly one locker width down the hallway."
        }
      ]
    },
    interactiveDemoType: "array-lockers",
    keywordsCovered: ["char", "int", "sizeof", "const"],
    quiz: [
      {
        id: "q5-1",
        question: "Why does indexing in C arrays start at 0 instead of 1?",
        options: [
          "It was a random decision made in 1972.",
          "Because index represents the distance offset (0 * size) from the array's base memory address.",
          "Because 0 is the highest priority number in CPU registers.",
          "To save 1 bit in memory."
        ],
        correctIndex: 1,
        explanation: "Index 'i' represents: Base + (i * element_size). The very first element is at Base + (0 * size), hence index 0."
      },
      {
        id: "q5-2",
        question: "How many bytes does the string `char s[] = \"Hello\";` occupy in memory?",
        options: [
          "5 bytes (one for each letter)",
          "6 bytes (5 letters + 1 hidden null-terminator '\\0')",
          "8 bytes",
          "4 bytes"
        ],
        correctIndex: 1,
        explanation: "C strings include a mandatory terminating null character '\\0' (byte value 0) at the end, taking 5 + 1 = 6 bytes."
      }
    ],
    tasks: [
      {
        id: "task-5",
        title: "Array Maximum Finder",
        problemStatement: "Given an array int nums[4] = {12, 45, 8, 30}; find and print the maximum value as 'Max: 45'.",
        initialCode: `#include <stdio.h>\n\nint main(void) {\n    int nums[4] = {12, 45, 8, 30};\n    int max = nums[0];\n    // Loop and find max\n    printf("Max: %d\\n", max);\n    return 0;\n}`,
        expectedOutput: "Max: 45\n",
        hint: "Loop through i = 1 to 3: if (nums[i] > max) max = nums[i];",
        solution: `#include <stdio.h>\n\nint main(void) {\n    int nums[4] = {12, 45, 8, 30};\n    int max = nums[0];\n    for (int i = 1; i < 4; i++) {\n        if (nums[i] > max) {\n            max = nums[i];\n        }\n    }\n    printf("Max: %d\\n", max);\n    return 0;\n}`
      }
    ]
  },
  {
    id: "module-6",
    moduleNumber: 6,
    title: "Functions, Call Stack & Scope",
    subtitle: "Reusable Machinery, Stack Frames, Activation Records & Recursion",
    category: "modular",
    whyItMatters: "Functions prevent code duplication and create modular architecture. Understanding how function stack frames push and pop in memory removes the mystery of local variables, scope, and recursion stack overflows.",
    realWorldAnalogy: {
      story: "A chef cooking a master dinner. When the recipe says 'prepare hollandaise sauce', the chef pauses the main dish, puts a mini-recipe card on top of their workspace stack, gathers butter and eggs, makes the sauce, hands the sauce back to the main dish, and removes the mini-card to resume main cooking.",
      diagramConcept: "Stack Grow Downwards: [ main() frame ] -> [ calculateAverage() frame ] -> Returns value -> Stack frame popped!",
      keyTakeaway: "Variables created inside a function live only as long as that function's stack frame exists. Once the function returns, that frame is reclaimed."
    },
    underTheHoodArchitecture: {
      whatHappensInHardware: "CPU instruction CALL pushes Return Address onto the Stack and jumps to target address. Function prologue sets up base pointer: `push rbp; mov rbp, rsp`. On return: `mov rsp, rbp; pop rbp; ret`.",
      compilerPhase: "ABI (Application Binary Interface) calling convention management (System V AMD64 or Microsoft x64).",
      memoryLayout: "stack",
      details: [
        "Stack Frame contains: Return Address, saved base pointer (RBP), function parameters, local variables.",
        "Pass-by-value: C functions receive COPIES of variables. Modifying a parameter does not alter the caller's variable.",
        "Static local variables: Stored in .data segment instead of stack frame, preserving value across calls.",
        "Inline functions: Suggest to compiler to replace call with raw assembly to eliminate frame overhead."
      ]
    },
    sampleCode: {
      code: `#include <stdio.h>

// Function Prototype
int addNumbers(int a, int b);

int main(void) {
    int x = 10, y = 25;
    int result = addNumbers(x, y);
    printf("Result: %d\\n", result);
    return 0;
}

// Function Definition
int addNumbers(int a, int b) {
    int total = a + b;
    return total;
}`,
      lines: [
        {
          lineNum: 4,
          code: "int addNumbers(int a, int b);",
          underTheHood: "Function declaration prototype: Tells compiler parameter signatures and return type so calls can be type-checked.",
          realWorldAnalogy: "Publishing a tool's user manual specifications before someone operates it."
        },
        {
          lineNum: 8,
          code: "int result = addNumbers(x, y);",
          underTheHood: "Pushes x and y copies into registers EDI, ESI; CALL pushes return address; jumps to addNumbers.",
          realWorldAnalogy: "Handing two measured ingredients to an assistant chef in another room."
        },
        {
          lineNum: 16,
          code: "return total;",
          underTheHood: "Loads 'total' value into EAX register, executes RET (pop RIP), returning CPU execution back to main.",
          realWorldAnalogy: "Assistant chef places finished sauce into output tray and returns to their own station."
        }
      ]
    },
    interactiveDemoType: "pipeline",
    keywordsCovered: ["return", "void", "static", "inline", "auto", "extern"],
    quiz: [
      {
        id: "q6-1",
        question: "What happens to normal local variables when a function finishes execution?",
        options: [
          "They are permanently preserved on the hard drive.",
          "Their stack frame is popped/deallocated and their memory is freed for future calls.",
          "They become global variables.",
          "They are converted into pointers."
        ],
        correctIndex: 1,
        explanation: "Local variables live inside the function's stack frame. When the function returns, the stack pointer moves back and the frame is invalidated."
      },
      {
        id: "q6-2",
        question: "How does `static` change a local variable declared inside a function?",
        options: [
          "It makes the variable read-only.",
          "It preserves the variable's value across multiple function calls by placing it in the .data segment.",
          "It accelerates the function to run in CPU registers.",
          "It prevents recursive calls."
        ],
        correctIndex: 1,
        explanation: "A static local variable is initialized once and stored in the persistent data segment rather than the transient stack frame."
      }
    ],
    tasks: [
      {
        id: "task-6",
        title: "Square Calculator Function",
        problemStatement: "Write a function `int square(int n)` that returns n * n. In main, call it with 7 and print 'Square: 49'.",
        initialCode: `#include <stdio.h>\n\n// Write function here\n\nint main(void) {\n    int ans = square(7);\n    printf("Square: %d\\n", ans);\n    return 0;\n}`,
        expectedOutput: "Square: 49\n",
        hint: "Define int square(int n) { return n * n; } above main.",
        solution: `#include <stdio.h>\n\nint square(int n) {\n    return n * n;\n}\n\nint main(void) {\n    int ans = square(7);\n    printf("Square: %d\\n", ans);\n    return 0;\n}`
      }
    ]
  },
  {
    id: "module-7",
    moduleNumber: 7,
    title: "Pointers & Physical Memory Demystified",
    subtitle: "Memory Addresses, Dereferencing (*), Address-Of (&), and Pointer Arithmetic",
    category: "low-level",
    whyItMatters: "Pointers are the superpower of C. They are not scary—a pointer is simply an integer variable whose VALUE happens to be the memory address of another box. Once you master pointers, you understand how operating systems, graphics buffers, and data structures actually work.",
    realWorldAnalogy: {
      story: "Suppose you want to visit your friend's house. You don't pick up the entire brick house and put it in your pocket. You write down the house's street address (e.g. 742 Evergreen Terrace) on a tiny slip of paper. The slip of paper is a POINTER. Looking at the slip gives the address; walking to the house and opening the door is DEREFERENCING (*).",
      diagramConcept: "Variable [val = 42] at Address 0x7FFF00 <-- Pointer [ptr = 0x7FFF00] at Address 0x7FFF08 | *ptr gives 42!",
      keyTakeaway: "Pointer variable `p` holds an address. `*p` visits that address and reads or overwrites the data inside."
    },
    underTheHoodArchitecture: {
      whatHappensInHardware: "On a 64-bit CPU, every pointer is strictly an 8-byte (64-bit) unsigned hexadecimal integer representing a virtual memory address. Dereferencing translates to indirect memory addressing `MOV RAX, [RDI]`.",
      compilerPhase: "Type checking for pointer indirection levels (e.g. int* vs char* vs void**).",
      memoryLayout: "stack",
      details: [
        "Size of ANY pointer on a 64-bit architecture is 8 bytes, regardless of whether it points to a char, int, or huge struct.",
        "Pointer arithmetic: `ptr + 1` does NOT add 1 byte—it adds `1 * sizeof(*ptr)` bytes to land on the next item!",
        "Null pointer: Pointer holding address 0 (NULL). Dereferencing causes an instant hardware MMU page fault (Crash).",
        "Pointers enable true Pass-by-Reference in C by passing memory coordinates to functions."
      ]
    },
    sampleCode: {
      code: `#include <stdio.h>

void doubleValue(int *p) {
    // Dereference pointer and double the value at that address
    *p = (*p) * 2;
}

int main(void) {
    int target = 25;
    int *ptr = &target; // ptr stores address of target

    printf("Original target: %d\\n", target);
    printf("target address: %p\\n", (void*)&target);
    printf("ptr stores:     %p\\n", (void*)ptr);
    printf("Dereference *ptr: %d\\n", *ptr);

    doubleValue(&target); // Pass address
    printf("Doubled target:  %d\\n", target);

    return 0;
}`,
      lines: [
        {
          lineNum: 9,
          code: "int *ptr = &target;",
          underTheHood: "Loads the 64-bit virtual memory address of target into the 8-byte pointer variable 'ptr'.",
          realWorldAnalogy: "Writing your friend's street address on a small sticky note."
        },
        {
          lineNum: 14,
          code: "printf(\"Dereference *ptr: %d\\n\", *ptr);",
          underTheHood: "Indirect load: CPU looks inside ptr to get address, fetches 4 bytes from that RAM coordinate.",
          realWorldAnalogy: "Reading the sticky note, walking to that house, and looking through the window."
        },
        {
          lineNum: 5,
          code: "*p = (*p) * 2;",
          underTheHood: "Indirect store: Multiplies value and writes 50 directly back into target's stack slot.",
          realWorldAnalogy: "Opening the front door with the address key and placing a second batch of cookies on the table."
        }
      ]
    },
    interactiveDemoType: "pointer-inspector",
    keywordsCovered: ["sizeof", "void", "const", "restrict", "volatile"],
    quiz: [
      {
        id: "q7-1",
        question: "If `int *p` points to memory address 0x1000, what is the address of `p + 1` (assuming 4-byte int)?",
        options: [
          "0x1001",
          "0x1004",
          "0x1008",
          "0x2000"
        ],
        correctIndex: 1,
        explanation: "Pointer arithmetic is scaled by the size of the underlying data type. 0x1000 + (1 * 4) = 0x1004."
      },
      {
        id: "q7-2",
        question: "On a modern 64-bit operating system, what is `sizeof(char*)`?",
        options: [
          "1 byte",
          "4 bytes",
          "8 bytes",
          "Depends on the length of the string"
        ],
        correctIndex: 2,
        explanation: "All memory addresses on a 64-bit CPU architecture require 64 bits (8 bytes), regardless of the data type being pointed to."
      }
    ],
    tasks: [
      {
        id: "task-7",
        title: "Swap Two Numbers Using Pointers",
        problemStatement: "Implement `void swap(int *a, int *b)` that swaps two integers. In main, swap x=10 and y=20 and print 'x: 20, y: 10'.",
        initialCode: `#include <stdio.h>\n\nvoid swap(int *a, int *b) {\n    // Swap values at addresses a and b\n}\n\nint main(void) {\n    int x = 10, y = 20;\n    swap(&x, &y);\n    printf("x: %d, y: %d\\n", x, y);\n    return 0;\n}`,
        expectedOutput: "x: 20, y: 10\n",
        hint: "int temp = *a; *a = *b; *b = temp;",
        solution: `#include <stdio.h>\n\nvoid swap(int *a, int *b) {\n    int temp = *a;\n    *a = *b;\n    *b = temp;\n}\n\nint main(void) {\n    int x = 10, y = 20;\n    swap(&x, &y);\n    printf("x: %d, y: %d\\n", x, y);\n    return 0;\n}`
      }
    ]
  },
  {
    id: "module-8",
    moduleNumber: 8,
    title: "Structures, Unions & Memory Alignment",
    subtitle: "Custom Compound Data Types, Struct Padding, and Memory Layout",
    category: "low-level",
    whyItMatters: "Real-world data has multiple attributes: a Student has a name, ID, and GPA; a network packet has a header, payload, and checksum. Structs pack these into single custom types.",
    realWorldAnalogy: {
      story: "A student ID card or passport booklet. Rather than loose scraps of paper floating around (one for name, one for photo, one for birthdate), they are bound securely inside a single passport pouch.",
      diagramConcept: "struct Student: [ int id (4B) ] [ 4B padding ] [ double gpa (8B) ] [ char grade (1B) ] [ 7B padding ]",
      keyTakeaway: "CPUs read memory fastest when data is aligned to word boundaries. Compilers insert hidden 'padding bytes' inside structs to maintain alignment!"
    },
    underTheHoodArchitecture: {
      whatHappensInHardware: "Hardware buses fetch 4 or 8 bytes at a time. Misaligned memory access requires two separate memory bus cycles and bitwise shifts. Struct padding ensures natural alignment for maximum CPU throughput.",
      compilerPhase: "Type layout computation and padding insertion according to target ABI.",
      memoryLayout: "stack",
      details: [
        "struct: Every member has its own dedicated memory offset.",
        "union: All members overlap at the exact same base memory offset 0x0; size equals largest member.",
        "Arrow operator (->): Syntactic sugar for dereferencing and field access: `ptr->age` == `(*ptr).age`.",
        "typedef: Creates clean type aliases (e.g. `typedef struct Node Node;`)."
      ]
    },
    sampleCode: {
      code: `#include <stdio.h>

struct Student {
    int id;        // 4 bytes
    float gpa;     // 4 bytes
    char grade;    // 1 byte (+ 3 bytes padding)
};

int main(void) {
    struct Student s1 = {101, 3.92f, 'A'};
    struct Student *sPtr = &s1;

    printf("Student ID: %d\\n", sPtr->id);
    printf("Student GPA: %.2f\\n", sPtr->gpa);
    printf("Total Struct Size: %zu bytes\\n", sizeof(struct Student));

    return 0;
}`,
      lines: [
        {
          lineNum: 3,
          code: "struct Student {",
          underTheHood: "Defines a memory layout schema. No RAM is allocated until an instance variable is declared.",
          realWorldAnalogy: "Designing the blueprint specifications for an identity card."
        },
        {
          lineNum: 10,
          code: "struct Student s1 = {101, 3.92f, 'A'};",
          underTheHood: "Allocates 12 contiguous bytes on stack frame. Field offsets: id @ +0, gpa @ +4, grade @ +8.",
          realWorldAnalogy: "Printing and laminating an actual physical ID card for student #101."
        },
        {
          lineNum: 13,
          code: 'printf("Student ID: %d\\n", sPtr->id);',
          underTheHood: "Arrow operator: Dereferences pointer sPtr and loads integer at offset +0.",
          realWorldAnalogy: "Reading the ID number off the card held in your hand."
        }
      ]
    },
    interactiveDemoType: "struct-memory",
    keywordsCovered: ["struct", "union", "enum", "typedef"],
    quiz: [
      {
        id: "q8-1",
        question: "Why is `sizeof(struct { char c; int i; })` often 8 bytes instead of 5?",
        options: [
          "Because C always rounds up every variable to 8 bytes.",
          "Because the compiler inserts 3 padding bytes after char so int is aligned on a 4-byte boundary for CPU efficiency.",
          "Because char takes 4 bytes in structs.",
          "It is a compiler defect."
        ],
        correctIndex: 1,
        explanation: "Struct padding aligns 4-byte integers to addresses divisible by 4, preventing split memory bus reads."
      },
      {
        id: "q8-2",
        question: "What is the difference between a struct and a union in C?",
        options: [
          "A struct cannot contain pointers, but a union can.",
          "In a struct, each member has separate memory; in a union, all members share the exact same memory space.",
          "Unions are only supported in C++.",
          "Structs are allocated on heap, unions on stack."
        ],
        correctIndex: 1,
        explanation: "A union shares its single storage pool among all its declared members, with size equal to its largest member."
      }
    ],
    tasks: [
      {
        id: "task-8",
        title: "Point Coordinate Struct",
        problemStatement: "Create a `struct Point { int x; int y; };`, initialize it with x=10, y=20, and print 'Point(10, 20)'.",
        initialCode: `#include <stdio.h>\n\n// Define struct here\n\nint main(void) {\n    // Create and print\n    return 0;\n}`,
        expectedOutput: "Point(10, 20)\n",
        hint: "struct Point { int x; int y; }; in main: struct Point p = {10, 20}; printf(\"Point(%d, %d)\\n\", p.x, p.y);",
        solution: `#include <stdio.h>\n\nstruct Point {\n    int x;\n    int y;\n};\n\nint main(void) {\n    struct Point p = {10, 20};\n    printf("Point(%d, %d)\\n", p.x, p.y);\n    return 0;\n}`
      }
    ]
  },
  {
    id: "module-9",
    moduleNumber: 9,
    title: "Dynamic Memory: malloc, free & The Heap",
    subtitle: "Runtime Memory Management, Memory Leaks, and Dangling Pointers",
    category: "low-level",
    whyItMatters: "Stack variables are fixed at compile time and auto-destroyed on function exit. The HEAP lets your program allocate dynamic memory of any size at runtime that persists as long as you need.",
    realWorldAnalogy: {
      story: "Renting a hotel room. When you travel, you check into a hotel (malloc). The front desk hands you the room key (pointer). You can use the room as long as you want. But when you leave, you MUST return the key and check out (free). If you leave without checking out, you cause a Hotel Leak (Memory Leak)!",
      diagramConcept: "Stack (Fast, Auto, Fixed size) <====== Free RAM GAP ======> Heap (Dynamic, Persistent, Manual free())",
      keyTakeaway: "For every `malloc()`, there must be an exact matching `free()`. Never dereference a freed pointer!"
    },
    underTheHoodArchitecture: {
      whatHappensInHardware: "malloc invokes OS kernel syscalls `brk()` or `mmap()` to request new virtual memory pages from the OS. The C runtime heap allocator maintains free-lists and bucket chunks.",
      compilerPhase: "Library call linkage to libc memory allocator (glibc ptmalloc or jemalloc).",
      memoryLayout: "heap",
      details: [
        "malloc(size_t n): Allocates n contiguous uninitialized bytes in Heap RAM; returns void* pointer.",
        "calloc(num, size): Allocates and zeros out all bytes.",
        "realloc(ptr, new_size): Resizes existing heap allocation, moving data if needed.",
        "free(ptr): Returns memory block back to the allocator. Always set `ptr = NULL` afterward!"
      ]
    },
    sampleCode: {
      code: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n = 3;
    // Request heap memory for 3 integers
    int *arr = (int *)malloc(n * sizeof(int));

    if (arr == NULL) {
        printf("Memory allocation failed!\\n");
        return 1;
    }

    arr[0] = 100;
    arr[1] = 200;
    arr[2] = 300;

    printf("Heap array values: %d, %d, %d\\n", arr[0], arr[1], arr[2]);

    // Mandatory: return memory to the OS
    free(arr);
    arr = NULL; // Prevent dangling pointer

    printf("Memory freed successfully!\\n");
    return 0;
}`,
      lines: [
        {
          lineNum: 7,
          code: "int *arr = (int *)malloc(n * sizeof(int));",
          underTheHood: "Requests 12 bytes from the Heap. Allocator adds chunk header metadata and returns pointer to payload.",
          realWorldAnalogy: "Renting 3 adjoining hotel lockers and receiving the master key card."
        },
        {
          lineNum: 9,
          code: "if (arr == NULL) {",
          underTheHood: "Safety check: If OS is out of RAM, malloc returns 0 (NULL). Always verify before dereferencing!",
          realWorldAnalogy: "Checking if the hotel clerk told you 'Sorry, no rooms available tonight'."
        },
        {
          lineNum: 20,
          code: "free(arr);",
          underTheHood: "Marks memory chunk as available in the heap free-list so subsequent allocations can reuse it.",
          realWorldAnalogy: "Checking out at the front desk and handing back your room key."
        }
      ]
    },
    interactiveDemoType: "pointer-inspector",
    keywordsCovered: ["sizeof", "void", "NULL"],
    quiz: [
      {
        id: "q9-1",
        question: "What is a 'Memory Leak' in C?",
        options: [
          "RAM physically dripping liquid inside the computer.",
          "Allocating heap memory with malloc() but never releasing it with free(), wasting system RAM.",
          "Writing data past the end of an array.",
          "Using a pointer before initializing it."
        ],
        correctIndex: 1,
        explanation: "A memory leak happens when dynamically allocated heap memory loses its references without being freed, consuming RAM until the process is terminated."
      },
      {
        id: "q9-2",
        question: "What is a 'Dangling Pointer'?",
        options: [
          "A pointer that points to another pointer.",
          "A pointer that still points to a memory address after that memory was already released with free().",
          "A pointer stored inside a struct.",
          "A pointer that has value NULL."
        ],
        correctIndex: 1,
        explanation: "A dangling pointer holds the address of deallocated memory. Accessing it triggers undefined behavior."
      }
    ],
    tasks: [
      {
        id: "task-9",
        title: "Dynamic Integer Allocation",
        problemStatement: "Dynamically allocate an integer on the heap, assign it value 999, print 'Heap Value: 999', and free it.",
        initialCode: `#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n    // Allocate, set, print, free\n    return 0;\n}`,
        expectedOutput: "Heap Value: 999\n",
        hint: "int *p = malloc(sizeof(int)); *p = 999; printf(\"Heap Value: %d\\n\", *p); free(p);",
        solution: `#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n    int *p = (int *)malloc(sizeof(int));\n    if (p != NULL) {\n        *p = 999;\n        printf("Heap Value: %d\\n", *p);\n        free(p);\n    }\n    return 0;\n}`
      }
    ]
  },
  {
    id: "module-10",
    moduleNumber: 10,
    title: "Mastery Capstone: Student Marks Engine",
    subtitle: "The Ultimate Synthesis: Real-Life Problem to Confident Solution",
    category: "mastery-project",
    whyItMatters: "This is where all pieces unite: Variables, Types, Input/Output, Arithmetic, Conditionals, and Formatting. By writing this independently, you prove you've advanced from rote syntax memorization to authentic software engineering.",
    realWorldAnalogy: {
      story: "You are the head engineer building the academic grading automation terminal for a university. The system takes student credentials, evaluates multiple exam scores, calculates GPA metrics, checks safety thresholds (minimum 35 pass criteria in all subjects), and prints an official evaluation report.",
      diagramConcept: "Inputs (3 Subject Marks) -> Processing (Sum & Avg) -> Evaluation (Pass if all >= 35, else Fail) -> Report Generation",
      keyTakeaway: "Break every software challenge into: 1) Input Ingestion, 2) Data Transformation, 3) Business Logic Evaluation, 4) Formatted Output."
    },
    underTheHoodArchitecture: {
      whatHappensInHardware: "Combines stack allocation for student metrics, arithmetic logic unit (ALU) operations for additions and floating-point divisions, branch evaluation instructions for grading criteria, and syscalls to write the formatted grade card to the terminal.",
      compilerPhase: "Full optimization pipeline combining arithmetic expressions and branching logic.",
      memoryLayout: "stack",
      details: [
        "Floating-point division: Must cast integer sum to float `(float)total / 3.0f` to avoid integer truncation!",
        "Multi-variable branch evaluation using logical AND (&&) to guarantee minimum passing thresholds.",
        "Formatted terminal table presentation using width specifiers (e.g. `%10s`, `%.2f`)."
      ]
    },
    sampleCode: {
      code: `#include <stdio.h>

int main(void) {
    char name[] = "Alex";
    int math = 82;
    int science = 74;
    int english = 68;

    int total = math + science + english;
    float average = (float)total / 3.0f;

    printf("========================================\\n");
    printf("        OFFICIAL GRADE REPORT           \\n");
    printf("========================================\\n");
    printf("Student: %s\\n", name);
    printf("Math: %d | Science: %d | English: %d\\n", math, science, english);
    printf("Total: %d / 300\\n", total);
    printf("Average: %.2f%%\\n", average);

    // Business Logic: Pass only if every subject is >= 35
    if (math >= 35 && science >= 35 && english >= 35) {
        printf("Final Status: PASS\\n");
    } else {
        printf("Final Status: FAIL\\n");
    }
    printf("========================================\\n");

    return 0;
}`,
      lines: [
        {
          lineNum: 10,
          code: "float average = (float)total / 3.0f;",
          underTheHood: "Explicit cast converts integer total to IEEE single-precision float before DIVSS CPU instruction runs. Avoids truncation bug where 224/3 would become 74 instead of 74.67!",
          realWorldAnalogy: "Measuring with a precise decimal ruler rather than rounding to the nearest foot."
        },
        {
          lineNum: 19,
          code: "if (math >= 35 && science >= 35 && english >= 35) {",
          underTheHood: "Evaluates condition chain with short-circuiting: If math < 35, CPU halts further checks immediately and jumps to Fail branch.",
          realWorldAnalogy: "Passing all three security check gates before entering the boarding area."
        }
      ]
    },
    interactiveDemoType: "marks-project",
    keywordsCovered: ["int", "float", "char", "if", "else", "return"],
    quiz: [
      {
        id: "q10-1",
        question: "What happens if you calculate `float avg = total / 3;` where total is an integer equal to 10?",
        options: [
          "avg becomes 3.333333",
          "avg becomes 3.000000 because integer division truncates the fraction before storing into float",
          "Compilation error",
          "Divide by zero exception"
        ],
        correctIndex: 1,
        explanation: "In C, dividing two integers produces an integer result. 10 / 3 evaluates to 3. Only then is 3 converted to float 3.0. You must write `(float)total / 3` or `total / 3.0`!"
      },
      {
        id: "q10-2",
        question: "What does the expression `(sub1 >= 35 && sub2 >= 35)` ensure?",
        options: [
          "At least one subject passed.",
          "Both subjects must meet or exceed 35 to pass.",
          "The average of both subjects is 35.",
          "Neither subject passed."
        ],
        correctIndex: 1,
        explanation: "The logical AND (&&) operator requires both left and right expressions to be true."
      }
    ],
    tasks: [
      {
        id: "task-10",
        title: "Build the Student Grade Engine",
        problemStatement: "Write a program that takes m1=80, m2=90, m3=70, calculates total and average, and if average >= 75 prints 'Distinction' else 'Standard Pass'. Output: 'Average: 80.00 | Status: Distinction'",
        initialCode: `#include <stdio.h>\n\nint main(void) {\n    int m1 = 80, m2 = 90, m3 = 70;\n    // Calculate total, average, and evaluate\n    return 0;\n}`,
        expectedOutput: "Average: 80.00 | Status: Distinction\n",
        hint: "float avg = (float)(m1 + m2 + m3) / 3.0f; if (avg >= 75) printf(\"Average: %.2f | Status: Distinction\\n\", avg);",
        solution: `#include <stdio.h>\n\nint main(void) {\n    int m1 = 80, m2 = 90, m3 = 70;\n    int total = m1 + m2 + m3;\n    float avg = (float)total / 3.0f;\n    if (avg >= 75.0f) {\n        printf("Average: %.2f | Status: Distinction\\n", avg);\n    } else {\n        printf("Average: %.2f | Status: Standard Pass\\n", avg);\n    }\n    return 0;\n}`
      }
    ]
  }
];
