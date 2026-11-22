export interface CLibraryModule {
  id: string;
  header: string;
  title: string;
  category: 'I/O & Streams' | 'Memory & Utilities' | 'String Manipulation' | 'Mathematics' | 'Character & String Testing' | 'Time & Clock' | 'Types & Limits';
  oneLiner: string;
  osSiliconRole: string;
  keyFunctions: { name: string; signature: string; purpose: string }[];
  compilableExample: string;
  commonPitfall: string;
  relatedKeywords: string[];
  relatedCurriculumLevels: number[];
}

export interface CMacroDefinition {
  id: string;
  name: string;
  syntax: string;
  category: 'Preprocessor Directive' | 'Core Standard Constant' | 'Conditional Compilation' | 'Type Abstraction';
  oneLiner: string;
  preprocessorBehavior: string;
  compilableExample: string;
  pitfallOrRule: string;
}

export const C_STANDARD_LIBRARIES: CLibraryModule[] = [
  {
    id: "lib-stdio",
    header: "<stdio.h>",
    title: "Standard Input / Output Streams",
    category: "I/O & Streams",
    oneLiner: "Provides buffered stream I/O for terminals, files, and strings.",
    osSiliconRole: "Communicates with OS kernel system calls (read, write, open, close) through FILE struct buffers mapped to file descriptors 0 (stdin), 1 (stdout), and 2 (stderr).",
    keyFunctions: [
      { name: "printf", signature: "int printf(const char *format, ...)", purpose: "Writes formatted text to stdout." },
      { name: "scanf", signature: "int scanf(const char *format, ...)", purpose: "Reads formatted input from stdin into variable memory addresses." },
      { name: "fgets", signature: "char *fgets(char *str, int n, FILE *stream)", purpose: "Safely reads a line up to n bytes, preventing buffer overflow." },
      { name: "puts", signature: "int puts(const char *str)", purpose: "Directly outputs a string followed by a newline without format parsing overhead." },
      { name: "sprintf", signature: "int sprintf(char *str, const char *format, ...)", purpose: "Composes formatted string directly into memory buffer." }
    ],
    compilableExample: `#include <stdio.h>

int main(void) {
    char name[32] = "Raghavendra";
    int marks = 98;
    float cgpa = 9.8f;

    printf("=== STANDARD I/O TELEMETRY ===\\n");
    printf("Scholar Name : %s\\n", name);
    printf("Subject Marks: %d/100\\n", marks);
    printf("Current CGPA : %.1f\\n", cgpa);
    return 0;
}`,
    commonPitfall: "Never use gets(); it has no buffer bounds check and causes stack smashing. Always use fgets(). Also, remember & in scanf(&variable)!",
    relatedKeywords: ["void", "int", "char", "const"],
    relatedCurriculumLevels: [1, 2, 3, 27]
  },
  {
    id: "lib-stdlib",
    header: "<stdlib.h>",
    title: "General Utilities, Heap Memory & Process Control",
    category: "Memory & Utilities",
    oneLiner: "Dynamic heap RAM allocation, pseudo-random numbers, process termination, and sorting.",
    osSiliconRole: "Invokes `brk()` / `mmap()` syscalls to request OS virtual memory pages for the process heap. Manages heap free-lists and metadata headers.",
    keyFunctions: [
      { name: "malloc", signature: "void *malloc(size_t size)", purpose: "Allocates uninitialized bytes on the heap." },
      { name: "calloc", signature: "void *calloc(size_t num, size_t size)", purpose: "Allocates and zero-clears heap memory." },
      { name: "realloc", signature: "void *realloc(void *ptr, size_t new_size)", purpose: "Resizes existing heap buffer, copying data if relocated." },
      { name: "free", signature: "void free(void *ptr)", purpose: "Returns allocated heap memory back to the allocator pool." },
      { name: "atoi / strtol", signature: "long strtol(const char *str, char **endptr, int base)", purpose: "Converts ASCII strings to integer numbers." }
    ],
    compilableExample: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *arr = (int *)malloc(3 * sizeof(int));
    if (arr == NULL) {
        printf("Out of RAM!\\n");
        return 1;
    }

    arr[0] = 100;
    arr[1] = 200;
    arr[2] = 300;

    printf("Dynamic Heap Array: %d, %d, %d\\n", arr[0], arr[1], arr[2]);
    free(arr);
    arr = NULL; // Safe pointer clearance
    return 0;
}`,
    commonPitfall: "Forgetting free() causes memory leaks. Dereferencing after free() causes use-after-free corruption. Freeing twice triggers allocator abort.",
    relatedKeywords: ["sizeof", "void", "return"],
    relatedCurriculumLevels: [102, 103, 104, 105, 106]
  },
  {
    id: "lib-string",
    header: "<string.h>",
    title: "String & Raw Memory Manipulation",
    category: "String Manipulation",
    oneLiner: "Functions for copying, concatenating, comparing, and searching null-terminated strings and memory byte buffers.",
    osSiliconRole: "Highly optimized in silicon with vectorized SIMD CPU instructions (AVX-512, SSE2) to process 16, 32, or 64 bytes per CPU clock cycle.",
    keyFunctions: [
      { name: "strlen", signature: "size_t strlen(const char *str)", purpose: "Counts characters up to (but excluding) terminating null byte '\\0'." },
      { name: "strcpy / strncpy", signature: "char *strncpy(char *dest, const char *src, size_t n)", purpose: "Copies bounded string characters into target buffer." },
      { name: "strcmp / strncmp", signature: "int strcmp(const char *s1, const char *s2)", purpose: "Compares two strings lexicographically (returns 0 if equal)." },
      { name: "memcpy", signature: "void *memcpy(void *dest, const void *src, size_t n)", purpose: "Ultra-fast raw byte block transfer between non-overlapping memory buffers." },
      { name: "memset", signature: "void *memset(void *s, int c, size_t n)", purpose: "Fills a block of memory with a specific byte value (e.g., zeroing structs)." }
    ],
    compilableExample: `#include <stdio.h>
#include <string.h>

int main(void) {
    char greeting[32] = "Namaste";
    strcat(greeting, ", Vande Bharat!");

    printf("Message: %s\\n", greeting);
    printf("Length : %zu characters\\n", strlen(greeting));
    return 0;
}`,
    commonPitfall: "Strings must always have room for the terminating null byte '\\0'. For string length N, buffer size must be at least N + 1.",
    relatedKeywords: ["char", "const", "sizeof"],
    relatedCurriculumLevels: [74, 75, 76, 77, 80]
  },
  {
    id: "lib-math",
    header: "<math.h>",
    title: "Floating-Point Mathematical Calculations",
    category: "Mathematics",
    oneLiner: "Trigonometric, logarithmic, exponential, and power computations.",
    osSiliconRole: "Executes directly on the CPU FPU (Floating Point Unit) and XMM / YMM vector registers using IEEE 754 floating-point hardware opcodes.",
    keyFunctions: [
      { name: "sqrt", signature: "double sqrt(double x)", purpose: "Calculates square root of non-negative number." },
      { name: "pow", signature: "double pow(double base, double exp)", purpose: "Computes base raised to the power of exp." },
      { name: "fabs", signature: "double fabs(double x)", purpose: "Returns absolute magnitude of floating-point number." },
      { name: "ceil / floor", signature: "double ceil(double x)", purpose: "Rounds up or down to nearest mathematical integer." }
    ],
    compilableExample: `#include <stdio.h>
#include <math.h>

int main(void) {
    double base = 5.0;
    double root = sqrt(49.0);
    double power = pow(2.0, 8.0);

    printf("sqrt(49) = %.1f\\n", root);
    printf("2^8      = %.1f\\n", power);
    return 0;
}`,
    commonPitfall: "Remember to link with -lm when compiling with gcc (e.g. gcc file.c -lm). Passing negative numbers to sqrt() produces NaN.",
    relatedKeywords: ["float", "double"],
    relatedCurriculumLevels: [4, 5, 56, 89]
  },
  {
    id: "lib-ctype",
    header: "<ctype.h>",
    title: "Character Classification & Conversion",
    category: "Character & String Testing",
    oneLiner: "Test whether ASCII byte is alphabetic, digit, punctuation, or whitespace, and convert case.",
    osSiliconRole: "Implements fast 256-entry lookup tables in cache, checking character types in a single L1 cache access (O(1)).",
    keyFunctions: [
      { name: "isalpha", signature: "int isalpha(int c)", purpose: "Checks if character is A-Z or a-z." },
      { name: "isdigit", signature: "int isdigit(int c)", purpose: "Checks if character is numeric digit 0-9." },
      { name: "toupper / tolower", signature: "int toupper(int c)", purpose: "Converts lowercase ASCII letter to uppercase." },
      { name: "isspace", signature: "int isspace(int c)", purpose: "Checks for whitespace (' ', '\\t', '\\n', '\\r')." }
    ],
    compilableExample: `#include <stdio.h>
#include <ctype.h>

int main(void) {
    char token = 'k';
    if (isalpha(token)) {
        printf("Character '%c' converted to uppercase: '%c'\\n", token, toupper(token));
    }
    return 0;
}`,
    commonPitfall: "Passing negative char values to ctype functions on platforms with signed char triggers undefined behavior. Cast argument to (unsigned char).",
    relatedKeywords: ["char", "int"],
    relatedCurriculumLevels: [3, 25, 79]
  },
  {
    id: "lib-time",
    header: "<time.h>",
    title: "Date, Wall-Clock Time & CPU Benchmarking",
    category: "Time & Clock",
    oneLiner: "Query system epoch timestamp, format dates, and measure CPU cycles elapsed.",
    osSiliconRole: "Interacts with CPU RTC (Real Time Clock) chip and OS kernel timestamp counter (e.g., x86 RDTSC instruction).",
    keyFunctions: [
      { name: "time", signature: "time_t time(time_t *tloc)", purpose: "Returns epoch seconds elapsed since Jan 1, 1970 UTC." },
      { name: "clock", signature: "clock_t clock(void)", purpose: "Returns processor clock ticks spent by the program." },
      { name: "difftime", signature: "double difftime(time_t time1, time_t time0)", purpose: "Computes difference in seconds between two timestamps." }
    ],
    compilableExample: `#include <stdio.h>
#include <time.h>

int main(void) {
    time_t now = time(NULL);
    printf("Epoch System Seconds: %ld\\n", (long)now);
    printf("Clock Ticks Spent   : %ld ticks\\n", (long)clock());
    return 0;
}`,
    commonPitfall: "time_t overflow in 2038 on 32-bit platforms (Year 2038 Problem). Modern 64-bit platforms use 64-bit signed integers good for billions of years.",
    relatedKeywords: ["long", "struct"],
    relatedCurriculumLevels: [6, 46]
  },
  {
    id: "lib-stdbool",
    header: "<stdbool.h>",
    title: "Boolean Data Type & Logical Literals (C99)",
    category: "Types & Limits",
    oneLiner: "Defines 'bool', 'true' (1), and 'false' (0) for readable logic flags.",
    osSiliconRole: "Promoted to integer byte in AL register for arithmetic and branch comparisons (JE, JNE).",
    keyFunctions: [
      { name: "bool", signature: "typedef _Bool bool;", purpose: "Boolean type holding 1 or 0." },
      { name: "true / false", signature: "#define true 1 / #define false 0", purpose: "Canonical truth literals." }
    ],
    compilableExample: `#include <stdio.h>
#include <stdbool.h>

int main(void) {
    bool isTurnstileOpen = true;
    bool hasInsufficientFunds = false;

    if (isTurnstileOpen && !hasInsufficientFunds) {
        printf("Turnstile Gate Status: UNLOCKED (Pass Through)\\n");
    }
    return 0;
}`,
    commonPitfall: "Do not compare boolean variables directly with `== true`, simply write `if (isValid)` to avoid subtle integer flag bugs.",
    relatedKeywords: ["int"],
    relatedCurriculumLevels: [7, 8, 9, 10]
  },
  {
    id: "lib-stdint",
    header: "<stdint.h>",
    title: "Exact-Width Portable Integer Specifications (C99)",
    category: "Types & Limits",
    oneLiner: "Explicit integer types with guaranteed bit widths across 32-bit and 64-bit hardware architectures.",
    osSiliconRole: "Guarantees exact byte storage in silicon regardless of compiler or architecture variations (e.g. 8-bit AVR, 32-bit ARM, 64-bit x86).",
    keyFunctions: [
      { name: "int8_t / uint8_t", signature: "1 byte integer", purpose: "Byte-exact sensor telemetry." },
      { name: "int16_t / uint16_t", signature: "2 byte integer", purpose: "Network port and audio samples." },
      { name: "int32_t / uint32_t", signature: "4 byte integer", purpose: "Standard 32-bit counting and indexing." },
      { name: "int64_t / uint64_t", signature: "8 byte integer", purpose: "Large financial ledgers and nanosecond timestamps." }
    ],
    compilableExample: `#include <stdio.h>
#include <stdint.h>

int main(void) {
    uint8_t sensorByte = 255;
    uint32_t memoryOffset = 0x80004000;
    int64_t globalBalanceINR = 5000000000LL;

    printf("Sensor Byte (8-bit)  : %u (Size: %zu byte)\\n", sensorByte, sizeof(sensorByte));
    printf("Memory Offset (32-bit): 0x%X (Size: %zu bytes)\\n", memoryOffset, sizeof(memoryOffset));
    printf("Balance (64-bit)      : Rs. %lld (Size: %zu bytes)\\n", (long long)globalBalanceINR, sizeof(globalBalanceINR));
    return 0;
}`,
    commonPitfall: "Format specifier mismatches. Use <inttypes.h> macros (PRId64, PRIu32) for perfectly portable printf statements across compilers.",
    relatedKeywords: ["short", "long", "unsigned", "int"],
    relatedCurriculumLevels: [14, 15, 16]
  }
];

export const C_MACRO_DEFINITIONS: CMacroDefinition[] = [
  {
    id: "def-define-macro",
    name: "#define (Constants & Functional Macros)",
    syntax: "#define IDENTIFIER replacement_text",
    category: "Preprocessor Directive",
    oneLiner: "Direct textual replacement before compiler parsing begins.",
    preprocessorBehavior: "Scans token stream and substitutes identifier verbatim. 0 runtime function call overhead.",
    compilableExample: `#include <stdio.h>

#define MAX_BUFFER_SIZE 1024
#define SQUARE(x) ((x) * (x))

int main(void) {
    int radius = 7;
    printf("Buffer Capacity: %d Bytes\\n", MAX_BUFFER_SIZE);
    printf("Square of %d   : %d\\n", radius, SQUARE(radius));
    return 0;
}`,
    pitfallOrRule: "Always enclose macro arguments in parentheses: ((x) * (x)). Otherwise SQUARE(1 + 2) evaluates to 1 + 2 * 1 + 2 = 5 instead of 9!"
  },
  {
    id: "def-include-directive",
    name: "#include (System & Project Headers)",
    syntax: "#include <header.h> or #include \"my_file.h\"",
    category: "Preprocessor Directive",
    oneLiner: "Pastes entire contents of specified file directly into current translation unit.",
    preprocessorBehavior: "Searches system include paths for <...> and local project folder for \"...\". Replaces directive with full header text.",
    compilableExample: `#include <stdio.h>

int main(void) {
    printf("stdio.h symbols successfully imported.\\n");
    return 0;
}`,
    pitfallOrRule: "Never #include a .c file directly! Only #include .h header files to prevent duplicate symbol linker crashes."
  },
  {
    id: "def-header-guards",
    name: "#ifndef / #define / #endif (Header Inclusion Guards)",
    syntax: "#ifndef MY_HEADER_H\n#define MY_HEADER_H\n...\n#endif",
    category: "Conditional Compilation",
    oneLiner: "Prevents duplicate struct and typedef definitions when a header is included transitively.",
    preprocessorBehavior: "If symbol is already defined, preprocessor skips everything until #endif, preventing redefinition compile errors.",
    compilableExample: `#include <stdio.h>

#ifndef RAILWAY_STATION_H
#define RAILWAY_STATION_H

struct Station {
    int id;
};

#endif

int main(void) {
    struct Station s;
    s.id = 502;
    printf("Guarded Header Station ID: %d\\n", s.id);
    return 0;
}`,
    pitfallOrRule: "Every single .h header file you author in C MUST have unique header guards or #pragma once."
  },
  {
    id: "def-null-constant",
    name: "NULL (Null Pointer Constant)",
    syntax: "((void *)0)",
    category: "Core Standard Constant",
    oneLiner: "Defines an invalid pointer address indicating that the pointer points nowhere.",
    preprocessorBehavior: "Expands to 0 or ((void *)0). Stored as zero bits in register/RAM.",
    compilableExample: `#include <stdio.h>

int main(void) {
    int *ptr = NULL;
    if (ptr == NULL) {
        printf("Pointer safely initialized to NULL. Dereference avoided!\\n");
    }
    return 0;
}`,
    pitfallOrRule: "Never dereference a NULL pointer (*ptr). MMU virtual address 0x0 triggers a crash with Signal 11 (SIGSEGV)."
  },
  {
    id: "def-eof-constant",
    name: "EOF (End-Of-File Marker)",
    syntax: "-1 (negative integer)",
    category: "Core Standard Constant",
    oneLiner: "Returned by stream I/O functions when no more input bytes remain.",
    preprocessorBehavior: "Defined in <stdio.h> as negative integer constant (-1).",
    compilableExample: `#include <stdio.h>

int main(void) {
    printf("EOF Value in this C compiler: %d\\n", EOF);
    return 0;
}`,
    pitfallOrRule: "When reading characters in a loop with getchar(), declare the receiving variable as 'int', not 'char'. char cannot distinguish EOF (-1) from byte 0xFF."
  }
];
