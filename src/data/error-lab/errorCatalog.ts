export type ErrorCategory = 
  | 'syntax-error'          // Missing semicolon, mismatched braces, bad token
  | 'compile-error'         // Type mismatch, undeclared identifier, wrong arguments
  | 'linker-error'          // Undefined reference to symbol, multiple definitions
  | 'runtime-segfault'      // NULL dereference, dangling pointer, stack overflow, divide by zero
  | 'logic-bug'             // Integer division truncation, operator precedence bug, off-by-one
  | 'multi-file-linking'    // Header guards, duplicate global definitions, translation units
  | 'multi-error-challenge';// Real-world large files with 3-4 simultaneous bugs to hunt

export interface SubBug {
  id: string;
  line: number;
  description: string;
  hint: string;
}

export interface MultiFileItem {
  fileName: string;
  role: 'Header (.h)' | 'Implementation (.c)' | 'Main Driver (.c)';
  content: string;
}

export interface ErrorLabScenario {
  id: string;
  category: ErrorCategory;
  categoryLabel: string;
  title: string;
  phaseInPipeline: 'Preprocessor' | 'Compiler (Parser/Type-Check)' | 'Linker (Symbol Resolver)' | 'Runtime (OS / MMU CPU)';
  realWorldAnalogy: string;
  symptomText: string;
  errorCodeSnippet: string;
  errorLineNum: number;
  fixedCodeSnippet: string;
  underTheHoodDissection: string;
  preventionTip: string;
  isMultiError?: boolean;
  bugsList?: SubBug[];
  isMultiFile?: boolean;
  files?: MultiFileItem[];
}

export const ERROR_CATEGORIES: { id: ErrorCategory | 'all'; label: string; icon: string }[] = [
  { id: 'all', label: 'All Scenarios', icon: '🩺' },
  { id: 'multi-error-challenge', label: 'Multi-Bug Big Files', icon: '🕵️‍♂️' },
  { id: 'multi-file-linking', label: 'Multi-File & Linker', icon: '🔗' },
  { id: 'runtime-segfault', label: 'Segfaults & Hardware', icon: '💥' },
  { id: 'compile-error', label: 'Compile & Types', icon: '⚡' },
  { id: 'syntax-error', label: 'Syntax & Grammar', icon: '📝' },
  { id: 'logic-bug', label: 'Logic & Traps', icon: '🧠' }
];

export const ERROR_LAB_SCENARIOS: ErrorLabScenario[] = [
  // ==========================================
  // MULTI-ERROR LARGE FILE CHALLENGES (TOP PRIORITY)
  // ==========================================
  {
    id: "err-multibug-railway",
    category: "multi-error-challenge",
    categoryLabel: "Multi-Bug Large File Challenge",
    title: "Indian Railways PNR Booking Engine (3 Hidden Bugs)",
    phaseInPipeline: "Compiler (Parser/Type-Check)",
    realWorldAnalogy: "A railway ticket printer that jams because the form has a typo in the station code, calculates fare with the wrong formula, and overflows the passenger seat counter.",
    symptomText: "error: expected ')' before '{' token & array bounds memory corruption warning",
    errorCodeSnippet: `#include <stdio.h>
#include <string.h>

#define MAX_SEATS 3

struct Passenger {
    char name[32];
    int age;
    int berthNo;
};

// Bug 1: Missing closing parenthesis in function header!
void displayChart(struct Passenger pList[], int count {
    printf("=== Vande Bharat Reservation Chart ===\\n");
    // Bug 2: Off-by-one! <= MAX_SEATS overflows array indices (0, 1, 2, 3)!
    for (int i = 0; i <= count; i++) {
        // Bug 3: %s format specifier used for integer berthNo!
        printf("Seat %s | Name: %s | Age: %d\\n", 
               pList[i].berthNo, pList[i].name, pList[i].age);
    }
}

int main(void) {
    struct Passenger bookings[MAX_SEATS];

    // Seat 1
    strcpy(bookings[0].name, "Aarav Sharma");
    bookings[0].age = 28;
    bookings[0].berthNo = 12;

    // Seat 2
    strcpy(bookings[1].name, "Priya Verma");
    bookings[1].age = 24;
    bookings[1].berthNo = 13;

    // Seat 3
    strcpy(bookings[2].name, "Kavita Rao");
    bookings[2].age = 62;
    bookings[2].berthNo = 14;

    displayChart(bookings, 3);
    printf("Reservation Chart successfully finalized.\\n");
    return 0;
}`,
    errorLineNum: 14,
    fixedCodeSnippet: `#include <stdio.h>
#include <string.h>

#define MAX_SEATS 3

struct Passenger {
    char name[32];
    int age;
    int berthNo;
};

// Fix 1: Added closing parenthesis ')'
void displayChart(struct Passenger pList[], int count) {
    printf("=== Vande Bharat Reservation Chart ===\\n");
    // Fix 2: Changed <= to < so loop stays within [0, count - 1]
    for (int i = 0; i < count; i++) {
        // Fix 3: Changed %s to %d for integer berthNo
        printf("Seat #%d | Name: %s | Age: %d\\n", 
               pList[i].berthNo, pList[i].name, pList[i].age);
    }
}

int main(void) {
    struct Passenger bookings[MAX_SEATS];

    strcpy(bookings[0].name, "Aarav Sharma");
    bookings[0].age = 28;
    bookings[0].berthNo = 12;

    strcpy(bookings[1].name, "Priya Verma");
    bookings[1].age = 24;
    bookings[1].berthNo = 13;

    strcpy(bookings[2].name, "Kavita Rao");
    bookings[2].age = 62;
    bookings[2].berthNo = 14;

    displayChart(bookings, 3);
    printf("Reservation Chart successfully finalized.\\n");
    return 0;
}`,
    underTheHoodDissection: "1. The grammar parser fails on line 14 when encountering `{` before `)`. 2. Loop condition `<= count` attempts to read `bookings[3]`, reading uninitialized stack memory. 3. Passing integer `12` to `%s` makes `printf` treat value `0x0000000C` as a memory address, triggering SIGSEGV page fault.",
    preventionTip: "Check matching brackets, use `< count` for 0-indexed arrays, and ensure format specifier types match arguments.",
    isMultiError: true,
    bugsList: [
      { id: "b1", line: 14, description: "Syntax error: missing closing ')' in displayChart parameters", hint: "Change `int count {` to `int count) {`" },
      { id: "b2", line: 17, description: "Off-by-one boundary error: `i <= count` reads past array boundary", hint: "Change loop to `i < count`" },
      { id: "b3", line: 19, description: "Format specifier mismatch: `%s` used for integer `berthNo`", hint: "Change `%s` to `%d`" }
    ]
  },
  {
    id: "err-multibug-hospital",
    category: "multi-error-challenge",
    categoryLabel: "Multi-Bug Large File Challenge",
    title: "AIIMS ICU Vital Signs Telemetry Monitor (3 Hidden Bugs)",
    phaseInPipeline: "Runtime (OS / MMU CPU)",
    realWorldAnalogy: "An ICU patient monitor where an unplugged sensor cable causes an arithmetic crash, temperature is truncated to an integer losing fever precision, and the emergency alarm fails to trigger.",
    symptomText: "Segmentation fault or silent telemetry corruption in vital stats",
    errorCodeSnippet: `#include <stdio.h>

void calculateVitals(int pulseReadings[], int count) {
    // Bug 1: Uninitialized pointer! Points to arbitrary garbage RAM address!
    int *pulseAlertThreshold;
    *pulseAlertThreshold = 100; // CRASH! Wild pointer dereference

    int sum = 0;
    for (int i = 0; i < count; i++) {
        sum += pulseReadings[i];
    }

    // Bug 2: Integer division truncation! 382 / 5 = 76 instead of 76.4!
    float avgPulse = sum / count;
    printf("Avg Heart Rate: %.2f BPM\\n", avgPulse);

    int alertLevel = 2; // Level 2: High Warning
    // Bug 3: Missing 'break' statements in switch cause unintended fall-through!
    switch (alertLevel) {
        case 2:
            printf("CRITICAL ALARM: Cardiac Tachycardia Warning!\\n");
        case 1:
            printf("NORMAL: Patient stable.\\n"); // Inadvertently prints normal!
            break;
    }
}

int main(void) {
    int sensorData[5] = {72, 75, 78, 80, 77};
    calculateVitals(sensorData, 5);
    return 0;
}`,
    errorLineNum: 6,
    fixedCodeSnippet: `#include <stdio.h>

void calculateVitals(int pulseReadings[], int count) {
    // Fix 1: Allocate a real stack variable and point to it safely
    int thresholdValue = 100;
    int *pulseAlertThreshold = &thresholdValue;

    int sum = 0;
    for (int i = 0; i < count; i++) {
        sum += pulseReadings[i];
    }

    // Fix 2: Float cast prevents integer division truncation
    float avgPulse = (float)sum / (float)count;
    printf("Avg Heart Rate: %.2f BPM (Threshold: %d)\\n", avgPulse, *pulseAlertThreshold);

    int alertLevel = 2;
    // Fix 3: Added break to prevent unintended fall-through
    switch (alertLevel) {
        case 2:
            printf("CRITICAL ALARM: Cardiac Tachycardia Warning!\\n");
            break;
        case 1:
            printf("NORMAL: Patient stable.\\n");
            break;
    }
}

int main(void) {
    int sensorData[5] = {72, 75, 78, 80, 77};
    calculateVitals(sensorData, 5);
    return 0;
}`,
    underTheHoodDissection: "1. Uninitialized pointer `pulseAlertThreshold` holds arbitrary garbage bytes from previous stack frame. Dereferencing it writes to unauthorized virtual memory. 2. `sum / count` emits `IDIV` opcode which drops the fractional remainder. 3. Omitting `break` lets CPU instruction pointer fall directly into subsequent case blocks.",
    preventionTip: "Always initialize pointers (`&var` or `malloc`), cast division terms to `(float)`, and end every `case` with `break`.",
    isMultiError: true,
    bugsList: [
      { id: "h1", line: 6, description: "Uninitialized pointer dereference: writing to wildcard memory", hint: "Point pointer to a valid variable `&thresholdValue`" },
      { id: "h2", line: 15, description: "Integer division truncation: `sum / count` loses precision", hint: "Cast to `(float)sum / (float)count`" },
      { id: "h3", line: 23, description: "Switch fall-through bug: missing `break;` executes wrong status", hint: "Add `break;` inside case 2" }
    ]
  },
  {
    id: "err-multibug-metro",
    category: "multi-error-challenge",
    categoryLabel: "Multi-Bug Large File Challenge",
    title: "Delhi Metro Smart Card NFC Gateway (4 Hidden Bugs)",
    phaseInPipeline: "Compiler (Parser/Type-Check)",
    realWorldAnalogy: "A metro turnstile controller that crashes on boot because standard libraries are missing, lets passengers with 0 balance ride free due to an accidental assignment, and leaks memory on every tap.",
    symptomText: "error: implicit declaration of function 'malloc' & logic bug permitting empty card entry",
    errorCodeSnippet: `#include <stdio.h>
// Bug 1: Missing #include <stdlib.h> for dynamic allocation!
// Bug 2: Missing #include <string.h> for strcpy!

struct SmartCard {
    int cardID;
    int balanceINR;
    char holderName[8]; // Small buffer!
};

int processEntry(struct SmartCard *card, int minFare) {
    // Bug 3: Assignment (=) instead of comparison (==)! Overwrites balance!
    if (card->balanceINR = 0) {
        printf("Turnstile Gate Denied: Insufficient balance.\\n");
        return 0;
    }

    if (card->balanceINR >= minFare) {
        card->balanceINR -= minFare;
        printf("Turnstile Gate OPEN. Welcome aboard, card #%d! Remaining: Rs. %d\\n", 
               card->cardID, card->balanceINR);
        return 1;
    }
    return 0;
}

int main(void) {
    // Dynamic card record allocation
    struct SmartCard *user = (struct SmartCard *)malloc(sizeof(struct SmartCard));
    user->cardID = 88042;
    user->balanceINR = 150;

    // Bug 4: Buffer overflow! "Suryavanshi" (11 chars + null) into 8-byte buffer!
    strcpy(user->holderName, "Vikramaditya");

    processEntry(user, 30);

    // Notice: Memory leak if free(user) is forgotten!
    free(user);
    return 0;
}`,
    errorLineNum: 13,
    fixedCodeSnippet: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct SmartCard {
    int cardID;
    int balanceINR;
    char holderName[32]; // Increased buffer size to 32 bytes
};

int processEntry(struct SmartCard *card, int minFare) {
    // Fix: Proper comparison ==
    if (card->balanceINR == 0) {
        printf("Turnstile Gate Denied: Insufficient balance.\\n");
        return 0;
    }

    if (card->balanceINR >= minFare) {
        card->balanceINR -= minFare;
        printf("Turnstile Gate OPEN. Welcome aboard, card #%d! Remaining: Rs. %d\\n", 
               card->cardID, card->balanceINR);
        return 1;
    }
    return 0;
}

int main(void) {
    struct SmartCard *user = (struct SmartCard *)malloc(sizeof(struct SmartCard));
    user->cardID = 88042;
    user->balanceINR = 150;

    // Safely fits in 32-byte buffer
    strcpy(user->holderName, "Vikramaditya");

    processEntry(user, 30);
    free(user);
    return 0;
}`,
    underTheHoodDissection: "1. Missing headers lead to implicit declarations where return types default to `int`, breaking pointer math on 64-bit platforms. 2. `if (card->balanceINR = 0)` assigns 0 to balance, evaluates to false, and corrupts passenger wallet. 3. Copying 13 bytes into an 8-byte stack/heap buffer smashes adjacent heap header metadata.",
    preventionTip: "Always `#include <stdlib.h>` and `<string.h>`, never use `=` inside `if` conditions, and size character arrays with ample space for the terminating null byte.",
    isMultiError: true,
    bugsList: [
      { id: "m1", line: 2, description: "Missing library headers: stdlib.h & string.h not included", hint: "Add `#include <stdlib.h>` and `#include <string.h>`" },
      { id: "m2", line: 7, description: "Buffer too small: holderName[8] overflows with long Indian name", hint: "Expand `holderName` to `char holderName[32];`" },
      { id: "m3", line: 13, description: "Accidental assignment in condition: `balanceINR = 0` clears the balance", hint: "Change `if (card->balanceINR = 0)` to `if (card->balanceINR == 0)`" }
    ]
  },

  // ==========================================
  // MULTI-FILE LINKING & HEADER CONFLICTS
  // ==========================================
  {
    id: "err-multifile-missing-guard",
    category: "multi-file-linking",
    categoryLabel: "Multi-File Linking & Preprocessor",
    title: "Missing Include Guards & Duplicate Type Definition",
    phaseInPipeline: "Preprocessor",
    realWorldAnalogy: "Two cooks reading the exact same recipe card pinned twice on the board, so they double-salt the stew and ruin the dish.",
    symptomText: "error: redefinition of 'struct Station'; previous definition was here",
    errorCodeSnippet: `/* Simulated Multi-File Compilation Unit */
/* --- File: metro_types.h (WITHOUT INCLUDE GUARDS) --- */
struct Station {
    int stationID;
    char name[32];
};

/* --- File: passenger.h --- */
/* passenger.h includes metro_types.h */
struct Station; // Forward ref or include

/* --- File: main.c --- */
/* Accidentally includes metro_types.h twice directly or transitively */
struct Station {
    int stationID;
    char name[32];
};

int main(void) {
    struct Station s;
    s.stationID = 101;
    printf("Station ID: %d\\n", s.stationID);
    return 0;
}`,
    errorLineNum: 14,
    fixedCodeSnippet: `#include <stdio.h>

/* --- Proper Header: metro_types.h WITH INCLUDE GUARDS --- */
#ifndef METRO_TYPES_H
#define METRO_TYPES_H

struct Station {
    int stationID;
    char name[32];
};

#endif /* METRO_TYPES_H */

/* Second inclusion is safely skipped by the preprocessor! */
#ifndef METRO_TYPES_H
#define METRO_TYPES_H

struct Station {
    int stationID;
    char name[32];
};

#endif

int main(void) {
    struct Station s;
    s.stationID = 101;
    printf("Station ID: %d (Guarded Header Loaded Cleanly)\\n", s.stationID);
    return 0;
}`,
    underTheHoodDissection: "The C preprocessor (`cpp`) performs raw textual replacement for `#include`. Without `#ifndef / #define` include guards or `#pragma once`, the same struct definition is parsed twice in a single translation unit, triggering a type redefinition error.",
    preventionTip: "Always wrap every `.h` header file in standard include guards: `#ifndef MY_HEADER_H`, `#define MY_HEADER_H`, `#endif`.",
    isMultiFile: true,
    files: [
      { fileName: "metro_types.h", role: "Header (.h)", content: "struct Station { int id; };" },
      { fileName: "metro.c", role: "Implementation (.c)", content: "#include \"metro_types.h\"" },
      { fileName: "main.c", role: "Main Driver (.c)", content: "#include \"metro_types.h\"\n#include \"passenger.h\"" }
    ]
  },
  {
    id: "err-linker-multiple-def",
    category: "multi-file-linking",
    categoryLabel: "Multi-File Linking & Linker (ld)",
    title: "Duplicate Global Symbol in Multiple Translation Units",
    phaseInPipeline: "Linker (Symbol Resolver)",
    realWorldAnalogy: "Two different post offices in the same district assigning the exact same street address to two different buildings.",
    symptomText: "ld: error: multiple definition of 'trainCounter'; file1.o: first defined here",
    errorCodeSnippet: `/* Simulated Linker Collision Across Two Translation Units */
#include <stdio.h>

/* Bug: Defining global variable directly in header file without 'extern'!
   When file1.c and file2.c both include it, each generates a global symbol 'trainCounter'. */

/* Simulated translation unit 1 (train_manager.c) */
int trainCounter = 10; // Strong symbol definition

/* Simulated translation unit 2 (main.c) */
// int trainCounter = 20; // Linker crashes: Multiple definitions!

int main(void) {
    printf("Active Trains: %d\\n", trainCounter);
    return 0;
}`,
    errorLineNum: 8,
    fixedCodeSnippet: `#include <stdio.h>

/* The Clean Multi-File Architecture:
   1. Header (.h) contains ONLY 'extern int trainCounter;' (declaration)
   2. Exactly ONE .c file contains 'int trainCounter = 10;' (definition)
*/

extern int trainCounter; // Declaration: Symbol defined elsewhere

int trainCounter = 10;   // Single definitive storage allocated in .data segment

int main(void) {
    printf("Active Trains: %d (Cleanly resolved by Linker ld)\\n", trainCounter);
    return 0;
}`,
    underTheHoodDissection: "Compilers generate ELF object files (`.o`) with symbol tables. Global variables without `static` are marked `GLOBAL`. When the Linker (`ld`) unifies object files, encountering two strong symbols with the exact same name causes an unresolvable collision.",
    preventionTip: "Never define variables in header files. Declare them with `extern` in `.h`, and define them once in a `.c` file.",
    isMultiFile: true,
    files: [
      { fileName: "trains.h", role: "Header (.h)", content: "extern int trainCounter;" },
      { fileName: "trains.c", role: "Implementation (.c)", content: "int trainCounter = 10;" },
      { fileName: "main.c", role: "Main Driver (.c)", content: "#include \"trains.h\"\nint main() { ... }" }
    ]
  },
  {
    id: "err-linker-undefined-ref",
    category: "linker-error",
    categoryLabel: "Linker Error (ld)",
    title: "Undefined Reference to Symbol (Missing Implementation)",
    phaseInPipeline: "Linker (Symbol Resolver)",
    realWorldAnalogy: "Having a blueprint that says 'call plumber at phone #555', but the phone number does not exist anywhere in the city directory.",
    symptomText: "undefined reference to `calculateTotal'; collect2: error: ld returned 1 exit status",
    errorCodeSnippet: `#include <stdio.h>

// Prototype declared, but function body never written!
int calculateTotal(int a, int b);

int main(void) {
    int result = calculateTotal(10, 20);
    printf("Result: %d\\n", result);
    return 0;
}`,
    errorLineNum: 7,
    fixedCodeSnippet: `#include <stdio.h>

// Function prototype
int calculateTotal(int a, int b);

// Concrete function definition
int calculateTotal(int a, int b) {
    return a + b;
}

int main(void) {
    int result = calculateTotal(10, 20);
    printf("Result: %d (Symbol successfully linked)\\n", result);
    return 0;
}`,
    underTheHoodDissection: "Compilation creates an object file `.o` with a blank unresolved jump label `call calculateTotal`. The Linker (`ld`) scans all object files and libraries, fails to find the function's machine code, and halts.",
    preventionTip: "Ensure every declared prototype has a matching definition in a compiled `.c` file or linked library."
  },

  // ==========================================
  // RUNTIME SEGFAULTS & HARDWARE TRACING
  // ==========================================
  {
    id: "err-runtime-rodata-write",
    category: "runtime-segfault",
    categoryLabel: "Runtime Segfault (MMU Protection)",
    title: "Mutating String Literal in Read-Only Memory (.rodata)",
    phaseInPipeline: "Runtime (OS / MMU CPU)",
    realWorldAnalogy: "Carving your initials onto a laminated museum exhibit protected behind bulletproof glass with security sensors.",
    symptomText: "Segmentation fault (core dumped) / Signal 11 (SIGSEGV)",
    errorCodeSnippet: `#include <stdio.h>

int main(void) {
    // String literal stored in read-only memory (.rodata)
    char *city = "DELHI";

    // Bug: Attempting to modify read-only byte!
    city[0] = 'N'; // CRASH! SIGSEGV

    printf("City: %s\\n", city);
    return 0;
}`,
    errorLineNum: 8,
    fixedCodeSnippet: `#include <stdio.h>

int main(void) {
    // Array creates a mutable copy on the local stack frame!
    char city[] = "DELHI";

    // Modifying stack memory is completely valid and safe!
    city[0] = 'N';

    printf("City: %s (Successfully modified on Stack)\\n", city);
    return 0;
}`,
    underTheHoodDissection: "The compiler places `\"DELHI\"` into the `.rodata` ELF section. When the OS loads the program, the MMU marks the page tables for that section as Read-Only. An instruction executing `MOV byte ptr [rax], 'N'` triggers an MMU permission violation page fault.",
    preventionTip: "If you need to modify a string in-place, declare it as a stack array `char str[] = ...`, never as a pointer `char *str = ...`."
  },
  {
    id: "err-runtime-null-segfault",
    category: "runtime-segfault",
    categoryLabel: "Runtime Segmentation Fault",
    title: "NULL Pointer Dereference (MMU Page Fault Crash)",
    phaseInPipeline: "Runtime (OS / MMU CPU)",
    realWorldAnalogy: "Trying to unlock the front door of a house with address '0000 Nowhere Lane'. The house physically does not exist in the universe.",
    symptomText: "Segmentation fault (core dumped) / Process terminated with exit code 139 (SIGSEGV)",
    errorCodeSnippet: `#include <stdio.h>

int main(void) {
    int *ptr = NULL; // Points to address 0x0
    *ptr = 99;       // CRASH! Writing to address 0
    printf("Value: %d\\n", *ptr);
    return 0;
}`,
    errorLineNum: 5,
    fixedCodeSnippet: `#include <stdio.h>

int main(void) {
    int actualStorage = 0;
    int *ptr = &actualStorage; // Points to valid stack RAM
    *ptr = 99;                 // Safe!
    printf("Value: %d (Dereferenced valid RAM address: %p)\\n", *ptr, (void*)ptr);
    return 0;
}`,
    underTheHoodDissection: "Virtual address 0x0 is deliberately unmapped in virtual memory by the OS kernel. When the CPU executes `MOV [0], 99`, the Memory Management Unit (MMU) fires an unrecoverable page-fault interrupt.",
    preventionTip: "Always check `if (ptr != NULL)` before dereferencing any pointer!"
  },
  {
    id: "err-runtime-dangling-free",
    category: "runtime-segfault",
    categoryLabel: "Runtime Use-After-Free",
    title: "Dangling Pointer (Accessing Freed Heap Memory)",
    phaseInPipeline: "Runtime (OS / MMU CPU)",
    realWorldAnalogy: "Checking out of your hotel room and handing back the keys, but keeping a duplicate key and trying to walk in 3 days later when someone else lives there.",
    symptomText: "Reads corrupted garbage data or crashes with memory corruption error",
    errorCodeSnippet: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *data = (int *)malloc(sizeof(int));
    *data = 42;
    free(data); // Memory returned to OS!

    // Bug: reading freed pointer!
    printf("Value: %d\\n", *data);
    return 0;
}`,
    errorLineNum: 10,
    fixedCodeSnippet: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *data = (int *)malloc(sizeof(int));
    *data = 42;
    printf("Value before free: %d\\n", *data);

    free(data);
    data = NULL; // Safe! Clear the pointer to prevent dangling access
    return 0;
}`,
    underTheHoodDissection: "Once `free()` runs, the heap allocator marks that chunk as reusable in its freelist. Accessing it reads undefined bits or corrupts metadata.",
    preventionTip: "Always set `ptr = NULL;` immediately after `free(ptr);`."
  },
  {
    id: "err-runtime-stack-overflow",
    category: "runtime-segfault",
    categoryLabel: "Runtime Stack Overflow",
    title: "Infinite Recursion & Call Stack Exhaustion",
    phaseInPipeline: "Runtime (OS / MMU CPU)",
    realWorldAnalogy: "Stacking trays in a cafeteria up to the ceiling until the pile hits the roof, collapses, and smashes everything.",
    symptomText: "Segmentation fault (stack overflow) / Process exhausted call stack memory",
    errorCodeSnippet: `#include <stdio.h>

// Bug: Missing base case! Function calls itself infinitely!
void infiniteCountdown(int n) {
    printf("Tick: %d\\n", n);
    infiniteCountdown(n - 1); // Never stops!
}

int main(void) {
    infiniteCountdown(5);
    return 0;
}`,
    errorLineNum: 6,
    fixedCodeSnippet: `#include <stdio.h>

// Guarded with a proper base case
void infiniteCountdown(int n) {
    if (n <= 0) { // Base Case: Stop condition!
        printf("Liftoff!\\n");
        return;
    }
    printf("Tick: %d\\n", n);
    infiniteCountdown(n - 1);
}

int main(void) {
    infiniteCountdown(5);
    return 0;
}`,
    underTheHoodDissection: "Every function call pushes a stack frame (saved frame pointer `RBP`, return address, arguments). With no termination base case, the stack pointer `RSP` expands downward until it hits the stack guard page, triggering a page-fault SIGSEGV.",
    preventionTip: "Always verify that every recursive function has an unreachable base case with a guaranteed return."
  },
  {
    id: "err-runtime-div-zero",
    category: "runtime-segfault",
    categoryLabel: "Runtime Exception",
    title: "Divide by Zero (CPU Hardware Exception)",
    phaseInPipeline: "Runtime (OS / MMU CPU)",
    realWorldAnalogy: "Trying to distribute 50 chocolate bars equally among 0 children. It is mathematically undefined.",
    symptomText: "Floating point exception (core dumped) / SIGFPE signal received",
    errorCodeSnippet: `#include <stdio.h>

int main(void) {
    int totalMoney = 100;
    int peopleCount = 0; // Nobody!
    int perPerson = totalMoney / peopleCount; // Division by 0!
    printf("Each gets: %d\\n", perPerson);
    return 0;
}`,
    errorLineNum: 6,
    fixedCodeSnippet: `#include <stdio.h>

int main(void) {
    int totalMoney = 100;
    int peopleCount = 0;
    if (peopleCount > 0) {
        int perPerson = totalMoney / peopleCount;
        printf("Each gets: %d\\n", perPerson);
    } else {
        printf("Cannot divide among 0 people!\\n");
    }
    return 0;
}`,
    underTheHoodDissection: "The CPU ALU executes the `IDIV` instruction. Hardware circuits detect divisor is 0 and immediately trigger CPU Interrupt Vector 0 (#DE Divide Error).",
    preventionTip: "Always guard division denominators with `if (denominator != 0)`."
  },

  // ==========================================
  // COMPILE-TIME & TYPE CHECKING ERRORS
  // ==========================================
  {
    id: "err-compile-undeclared",
    category: "compile-error",
    categoryLabel: "Compile-Time Type Error",
    title: "Undeclared Variable & Scope Violation",
    phaseInPipeline: "Compiler (Parser/Type-Check)",
    realWorldAnalogy: "Asking a cashier to charge an account number that was never created in the bank records.",
    symptomText: "error: 'totalPoints' undeclared (first use in this function)",
    errorCodeSnippet: `#include <stdio.h>

int main(void) {
    totalPoints = 50; // Variable never declared with a data type!
    printf("Points = %d\\n", totalPoints);
    return 0;
}`,
    errorLineNum: 4,
    fixedCodeSnippet: `#include <stdio.h>

int main(void) {
    int totalPoints = 50; // Declared with 'int'
    printf("Points = %d\\n", totalPoints);
    return 0;
}`,
    underTheHoodDissection: "The compiler symbol table has no entry for `totalPoints`. The compiler doesn't know how many bytes (1, 2, 4, 8) to reserve in the stack frame.",
    preventionTip: "Always declare the data type (`int`, `float`, `char`) before using any variable."
  },
  {
    id: "err-compile-conflicting-types",
    category: "compile-error",
    categoryLabel: "Compile-Time Signature Error",
    title: "Conflicting Types for Function Prototype",
    phaseInPipeline: "Compiler (Parser/Type-Check)",
    realWorldAnalogy: "A passport office expecting a photo of size 2x2 inches, but receiving a poster size 10x10 inches.",
    symptomText: "error: conflicting types for 'calculateTax'; previous declaration was here",
    errorCodeSnippet: `#include <stdio.h>

// Forward declaration says function returns double and takes double
double calculateTax(double income);

int main(void) {
    printf("Tax: %.2f\\n", calculateTax(50000.0));
    return 0;
}

// Bug: Definition changes return type to float and argument to int!
float calculateTax(int income) {
    return income * 0.18f;
}`,
    errorLineNum: 11,
    fixedCodeSnippet: `#include <stdio.h>

// Forward declaration
double calculateTax(double income);

int main(void) {
    printf("Tax: Rs. %.2f\\n", calculateTax(50000.0));
    return 0;
}

// Definition matches prototype exactly!
double calculateTax(double income) {
    return income * 0.18;
}`,
    underTheHoodDissection: "The compiler stores function signatures in the AST with parameter and return type qualifiers. When definitions disagree with forward declarations, type-checking halts.",
    preventionTip: "Copy and paste function prototypes directly from declarations to avoid subtle type divergence."
  },

  // ==========================================
  // SYNTAX & PARSE ERRORS
  // ==========================================
  {
    id: "err-syntax-semicolon",
    category: "syntax-error",
    categoryLabel: "Syntax Error",
    title: "Missing Semicolon (Grammar Parse Failure)",
    phaseInPipeline: "Compiler (Parser/Type-Check)",
    realWorldAnalogy: "Writing an English essay without full stops. Sentences crash into each other and make no sense to the reader.",
    symptomText: "error: expected ';' before 'printf'",
    errorCodeSnippet: `#include <stdio.h>

int main(void) {
    int price = 100
    printf("Price is: %d\\n", price);
    return 0;
}`,
    errorLineNum: 4,
    fixedCodeSnippet: `#include <stdio.h>

int main(void) {
    int price = 100;
    printf("Price is: %d\\n", price);
    return 0;
}`,
    underTheHoodDissection: "The lexical analyzer bundles `100` and `printf` into one invalid syntax node. The parser expects a semicolon terminal symbol `;` to close the declaration AST node.",
    preventionTip: "Every standalone statement in C must terminate with a semicolon `;`."
  },
  {
    id: "err-syntax-unclosed-brace",
    category: "syntax-error",
    categoryLabel: "Syntax Error",
    title: "Mismatched / Unclosed Curly Braces",
    phaseInPipeline: "Compiler (Parser/Type-Check)",
    realWorldAnalogy: "Opening a set of quotation marks in a sentence and forgetting to close them, confusing the entire rest of the book.",
    symptomText: "error: expected '}' at end of input",
    errorCodeSnippet: `#include <stdio.h>

int main(void) {
    int temperature = 38;
    if (temperature > 37) {
        printf("Fever detected!\\n");
    // Missing closing brace '}' for the if block!

    return 0;
}`,
    errorLineNum: 10,
    fixedCodeSnippet: `#include <stdio.h>

int main(void) {
    int temperature = 38;
    if (temperature > 37) {
        printf("Fever detected!\\n");
    } // Properly closed

    return 0;
}`,
    underTheHoodDissection: "The parser maintains a pushdown automaton stack of nested scopes `{`. When the end of file (EOF) token arrives while the scope stack is non-empty, a syntax error is raised.",
    preventionTip: "Always write matching closing braces `{}` immediately before filling in the interior code."
  },

  // ==========================================
  // SILENT LOGIC BUGS
  // ==========================================
  {
    id: "err-logic-int-truncation",
    category: "logic-bug",
    categoryLabel: "Logic Bug (Silent Bug)",
    title: "Integer Truncation in Financial Averages",
    phaseInPipeline: "Runtime (OS / MMU CPU)",
    realWorldAnalogy: "Measuring a piece of wood that is 7.5 inches long, but your ruler only has whole inch marks, so you call it 7 inches and ruin the furniture.",
    symptomText: "Average shows 2.000000 instead of 2.500000! (Program runs, but math is wrong)",
    errorCodeSnippet: `#include <stdio.h>

int main(void) {
    int totalScore = 5;
    int subjects = 2;
    // Bug: 5 / 2 in C evaluates to integer 2, then converts to 2.0!
    float average = totalScore / subjects;
    printf("Average is: %.2f\\n", average);
    return 0;
}`,
    errorLineNum: 7,
    fixedCodeSnippet: `#include <stdio.h>

int main(void) {
    int totalScore = 5;
    int subjects = 2;
    // Fix: Explicitly cast to float before division
    float average = (float)totalScore / (float)subjects;
    printf("Average is: %.2f\\n", average);
    return 0;
}`,
    underTheHoodDissection: "In C, integer / integer invokes integer division opcode `IDIV`, discarding remainder. Cast `(float)` promotes to single-precision float `DIVSS` in XMM register.",
    preventionTip: "Always cast at least one operand to `(float)` or divide by `2.0f` when decimals are expected."
  },
  {
    id: "err-logic-off-by-one",
    category: "logic-bug",
    categoryLabel: "Logic Bug (Array Bounds Overflow)",
    title: "Off-by-One Loop Bounds Overflow",
    phaseInPipeline: "Runtime (OS / MMU CPU)",
    realWorldAnalogy: "Booking seats 1 through 10 on a bus with only 10 seats, but indexing starting from 0 and trying to sit in seat index 10 which falls out the back window.",
    symptomText: "Overwrites adjacent stack variables or prints random garbage data",
    errorCodeSnippet: `#include <stdio.h>

int main(void) {
    int scores[5] = {90, 85, 88, 92, 95};

    // Bug: i <= 5 attempts to read scores[5]! Indices are only 0 to 4!
    for (int i = 0; i <= 5; i++) {
        printf("Score %d = %d\\n", i, scores[i]);
    }
    return 0;
}`,
    errorLineNum: 7,
    fixedCodeSnippet: `#include <stdio.h>

int main(void) {
    int scores[5] = {90, 85, 88, 92, 95};

    // Fix: i < 5 stays strictly within bounds [0..4]
    for (int i = 0; i < 5; i++) {
        printf("Score %d = %d\\n", i, scores[i]);
    }
    return 0;
}`,
    underTheHoodDissection: "An array of size $N$ spans indices $0$ to $N-1$. Index $N$ points to the return address or adjacent local variables on the stack.",
    preventionTip: "Use `i < N` for 0-indexed loops, never `i <= N`."
  }
];
