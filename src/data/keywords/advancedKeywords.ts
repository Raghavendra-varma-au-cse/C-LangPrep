export interface AdvancedCKeyword {
  keyword: string;
  category: 'Storage Class' | 'Data Type' | 'Control Flow' | 'Type Qualifier' | 'Compound Type' | 'Operator / Other';
  oneLiner: string;
  hardwareSiliconMeaning: string;
  compilableExample: string;
  explanation: string;
  commonPitfall: string;
  interviewTip: string;
}

export const ADVANCED_C_KEYWORDS: AdvancedCKeyword[] = [
  {
    keyword: 'auto',
    category: 'Storage Class',
    oneLiner: 'Default storage class for local variables created on the stack frame.',
    hardwareSiliconMeaning: 'Allocated relative to the CPU Base Pointer register (RBP/ESP) via `sub esp, 4`. Memory is recycled when the function returns.',
    compilableExample: `#include <stdio.h>
int main(void) {
    auto int chaiPrice = 15; // Same as 'int chaiPrice = 15;'
    printf("Chai Price: Rs. %d (Rupees)\\n", chaiPrice);
    return 0;
}`,
    explanation: 'In C, every local variable declared inside a function is implicitly `auto`. The keyword is rarely written explicitly in modern C.',
    commonPitfall: 'Do not confuse with C++ auto (which does type inference). In C, auto only specifies automatic stack storage duration.',
    interviewTip: 'Mention that auto variables contain garbage values until explicitly initialized, unlike global variables which zero-initialize in .bss.'
  },
  {
    keyword: 'break',
    category: 'Control Flow',
    oneLiner: 'Immediately terminates the innermost loop (for, while, do) or switch block.',
    hardwareSiliconMeaning: 'Emits an unconditional jump instruction (e.g., `jmp .L_exit`) in assembly, skipping remaining loop checks and instructions.',
    compilableExample: `#include <stdio.h>
int main(void) {
    for (int token = 1; token <= 10; token++) {
        if (token == 4) {
            printf("Counter closed at token %d\\n", token);
            break;
        }
        printf("Serving token %d\\n", token);
    }
    return 0;
}`,
    explanation: 'Terminates execution of the nearest enclosing loop or switch case and transfers control to the statement following the loop.',
    commonPitfall: 'Forgetting break inside a `switch` statement causes accidental fall-through into subsequent cases.',
    interviewTip: '`break` only exits one level of nested loop. To break out of multiple nested loops, use a flag or a clean cleanup `goto`.'
  },
  {
    keyword: 'case',
    category: 'Control Flow',
    oneLiner: 'Defines a labeled branch matching an integer constant inside a switch statement.',
    hardwareSiliconMeaning: 'The compiler compiles multiple cases into a single direct hardware Jump Table (O(1) indexing) instead of chained comparisons.',
    compilableExample: `#include <stdio.h>
int main(void) {
    int metroChoice = 2;
    switch(metroChoice) {
        case 1: printf("Red Line Selected\\n"); break;
        case 2: printf("Yellow Line Selected\\n"); break;
        default: printf("Invalid Line\\n"); break;
    }
    return 0;
}`,
    explanation: 'Each `case` value must be an integer constant expression (literals or enums). Variables are not permitted.',
    commonPitfall: 'Trying to use float or string in a case (e.g. `case 3.14:` or `case "delhi":`). C switch only accepts integral types.',
    interviewTip: 'When cases are sequential (1, 2, 3...), GCC generates a jump table; if sparse, it generates a binary search or comparison tree.'
  },
  {
    keyword: 'char',
    category: 'Data Type',
    oneLiner: 'The smallest addressable integer unit in C (strictly 1 byte / 8 bits).',
    hardwareSiliconMeaning: 'Loads into the low 8-bit registers (AL, BL, CL). Address arithmetic scales by 1 byte (ptr + 1 advances 1 memory byte).',
    compilableExample: `#include <stdio.h>
int main(void) {
    char grade = 'A';
    printf("Grade character: %c (ASCII: %d, Size: %zu byte)\\n", grade, grade, sizeof(grade));
    return 0;
}`,
    explanation: 'Used to store individual ASCII characters or raw binary byte buffers. Guaranteed to have `sizeof(char) == 1` by the C standard.',
    commonPitfall: 'Whether `char` is signed (-128 to 127) or unsigned (0 to 255) by default is compiler/architecture dependent.',
    interviewTip: 'To store binary data or ensure predictable values >= 128, always explicitly declare `unsigned char`.'
  },
  {
    keyword: 'const',
    category: 'Type Qualifier',
    oneLiner: 'Qualifies a variable as read-only after its initial declaration.',
    hardwareSiliconMeaning: 'Global const data is placed into the read-only `.rodata` ELF segment on flash/ROM. Writing to it triggers a hardware MMU fault (SegFault).',
    compilableExample: `#include <stdio.h>
int main(void) {
    const int gstRatePercent = 18;
    int bill = 500;
    int total = bill + (bill * gstRatePercent) / 100;
    printf("Total Bill with GST: Rs. %d (Rupees)\\n", total);
    return 0;
}`,
    explanation: 'Informs both the compiler and fellow programmers that this value cannot be reassigned after declaration.',
    commonPitfall: 'Difference between `const int *p` (pointer to const int; value is locked) vs `int * const p` (const pointer; address is locked).',
    interviewTip: 'Remember: read from right to left! `const int * const p` means "p is a const pointer to a const int".'
  },
  {
    keyword: 'continue',
    category: 'Control Flow',
    oneLiner: 'Skips the remaining statements in the current iteration and jumps to the next cycle.',
    hardwareSiliconMeaning: 'Emits a jump directly to the loop step/increment block (e.g., `jmp .L_loop_increment`), bypassing remaining instructions.',
    compilableExample: `#include <stdio.h>
int main(void) {
    for (int seat = 1; seat <= 6; seat++) {
        if (seat == 3) {
            printf("Seat %d is Reserved. Skipping...\\n", seat);
            continue;
        }
        printf("Seat %d Assigned\\n", seat);
    }
    return 0;
}`,
    explanation: 'In a `for` loop, `continue` jumps to the update expression (e.g. `i++`). In a `while` loop, it jumps straight to the condition check.',
    commonPitfall: 'In a `while` loop, calling `continue` before incrementing the index variable will cause an infinite loop!',
    interviewTip: '`continue` helps eliminate deeply nested `if` statements (the Guard Clause pattern).'
  },
  {
    keyword: 'default',
    category: 'Control Flow',
    oneLiner: 'Catch-all fallback branch executed in a switch statement when no case matches.',
    hardwareSiliconMeaning: 'Acts as the jump destination target if none of the value matches in the jump table or comparison ladder succeed.',
    compilableExample: `#include <stdio.h>
int main(void) {
    int buttonCode = 99;
    switch(buttonCode) {
        case 1: printf("Dispense Water\\n"); break;
        case 2: printf("Dispense Coffee\\n"); break;
        default: printf("Unknown Button: Error Tone Emitted\\n"); break;
    }
    return 0;
}`,
    explanation: 'Optional in C, but industry best practice is to always include a `default` case to handle unexpected state or corrupted data.',
    commonPitfall: 'While `default` can technically be placed anywhere in the switch, putting it at the top without a `break` falls through into `case 1`!',
    interviewTip: 'In safety-critical firmware (MISRA C), having a `default` case in every single switch is mandatory.'
  },
  {
    keyword: 'do',
    category: 'Control Flow',
    oneLiner: 'Post-test loop construct guaranteeing the body executes at least once.',
    hardwareSiliconMeaning: 'Condition check is placed at the end of the block (`cmp` and `jne .L_start`), eliminating the initial jump into the loop.',
    compilableExample: `#include <stdio.h>
int main(void) {
    int attempt = 1;
    do {
        printf("Connecting to SBI Server... (Attempt %d)\\n", attempt);
        attempt++;
    } while (attempt <= 2);
    return 0;
}`,
    explanation: 'The loop body always executes before the condition is evaluated. Crucial for user input prompts and handshake protocols.',
    commonPitfall: 'Forgetting the trailing semicolon after `while(condition);` - this causes a syntax compiler error.',
    interviewTip: '`do { ... } while(0)` is the classic C preprocessor macro idiom to group multiple statements safely inside macros.'
  },
  {
    keyword: 'double',
    category: 'Data Type',
    oneLiner: '8-byte (64-bit) IEEE 754 double-precision floating-point type.',
    hardwareSiliconMeaning: 'Operates inside x86 SSE/AVX registers (`XMM0`, `YMM0`) with 53 bits of mantissa precision (~15-17 decimal digits).',
    compilableExample: `#include <stdio.h>
int main(void) {
    double pi = 3.141592653589793;
    printf("High-Precision Pi: %.15f (Size: %zu bytes)\\n", pi, sizeof(pi));
    return 0;
}`,
    explanation: 'Provides roughly double the precision of a 4-byte `float`. Default type for floating-point literals like `3.14` in C.',
    commonPitfall: 'Using `==` to compare doubles directly (e.g. `d == 0.3`). Always use an epsilon threshold: `fabs(a - b) < 1e-9`.',
    interviewTip: 'In `printf`, `%f` formats both float and double (due to default argument promotions), but `scanf` requires `%lf` for double!'
  },
  {
    keyword: 'else',
    category: 'Control Flow',
    oneLiner: 'Alternative execution branch when the preceding `if` condition evaluates to false (0).',
    hardwareSiliconMeaning: 'Paired with `jmp` instruction skipping the `else` block if the `if` body finishes executing.',
    compilableExample: `#include <stdio.h>
int main(void) {
    int balance = 40;
    int chaiCost = 50;
    if (balance >= chaiCost) {
        printf("Chai Purchased!\\n");
    } else {
        printf("Insufficient Balance: Need Rs. %d more\\n", chaiCost - balance);
    }
    return 0;
}`,
    explanation: 'Directly follows an `if` block. An `else` always binds to the nearest unmatched preceding `if` statement.',
    commonPitfall: 'The "Dangling Else" ambiguity: nested `if` statements without braces `{}` can accidentally bind the `else` to the wrong `if`.',
    interviewTip: 'Always use curly braces `{}` even for single-line `if`/`else` statements to maintain code readability and prevent bugs.'
  },
  {
    keyword: 'enum',
    category: 'Compound Type',
    oneLiner: 'Defines an enumerated type assigning friendly human names to integer constants.',
    hardwareSiliconMeaning: 'Treated purely as integer constants at compile-time; consumes 0 memory overhead at runtime beyond normal `int`.',
    compilableExample: `#include <stdio.h>
enum SignalColor { RED = 1, YELLOW = 2, GREEN = 3 };

int main(void) {
    enum SignalColor current = GREEN;
    if (current == GREEN) {
        printf("Traffic Signal is GREEN (%d): Vehicles Move!\\n", current);
    }
    return 0;
}`,
    explanation: 'Improves code readability by replacing magic numbers with meaningful symbolic names (e.g. `STATE_IDLE`, `STATE_BUSY`).',
    commonPitfall: 'By default, first element is 0 and subsequent elements increment by 1, unless explicitly assigned.',
    interviewTip: 'Unlike modern languages, C enums are not strongly typed; you can freely compare and assign an enum to an `int`.'
  },
  {
    keyword: 'extern',
    category: 'Storage Class',
    oneLiner: 'Declares a variable or function symbol defined in another translation unit (.c file).',
    hardwareSiliconMeaning: 'Tells the compiler not to allocate storage here, but to create an unresolved symbol in the object file (.o) for the Linker (`ld`) to resolve.',
    compilableExample: `#include <stdio.h>
// Declares that totalRevenue exists elsewhere (e.g. in accounts.c)
extern int totalCollegeBikes;
int totalCollegeBikes = 450; // Defined here

int main(void) {
    printf("Total College Bikes: %d\\n", totalCollegeBikes);
    return 0;
}`,
    explanation: 'The foundation of multi-file C architecture. Header files (.h) use `extern` to announce global state across files without duplicates.',
    commonPitfall: 'Defining a variable with initialization in a header (`extern int x = 10;`) causes "multiple definition of x" linker collision errors.',
    interviewTip: 'Functions are `extern` by default in C headers; you don\'t need to write `extern void foo();`, it is implicit.'
  },
  {
    keyword: 'float',
    category: 'Data Type',
    oneLiner: '4-byte (32-bit) IEEE 754 single-precision floating-point number.',
    hardwareSiliconMeaning: 'Stored as 1 sign bit, 8 exponent bits, and 23 fraction bits. Processed via hardware FPU or SIMD instructions.',
    compilableExample: `#include <stdio.h>
int main(void) {
    float petrolPrice = 96.72f;
    printf("Petrol Price per Liter: Rs. %.2f (Size: %zu bytes)\\n", petrolPrice, sizeof(petrolPrice));
    return 0;
}`,
    explanation: 'Provides ~6-7 decimal digits of precision. Ideal for graphics buffers, audio samples, and embedded sensors with limited RAM.',
    commonPitfall: 'Writing `float x = 3.14;` without the `f` suffix causes a compiler warning because `3.14` is typed as a `double`.',
    interviewTip: 'Floating-point arithmetic is not associative on silicon due to rounding errors: `(a + b) + c` can differ from `a + (b + c)`.'
  },
  {
    keyword: 'for',
    category: 'Control Flow',
    oneLiner: 'Deterministic loop construct packing init, condition, and increment into one line.',
    hardwareSiliconMeaning: 'Sets loop counter register, performs conditional test, branches to body, and loops back via `add rcx, 1` and `cmp`.',
    compilableExample: `#include <stdio.h>
int main(void) {
    printf("--- COUNTDOWN ---\\n");
    for (int t = 5; t >= 1; t--) {
        printf("Launch in: %d\\n", t);
    }
    printf("Liftoff!\\n");
    return 0;
}`,
    explanation: 'The standard loop for counting and array traversal. Since C99, loop counters can be declared directly inside `for (int i = 0; ...)`',
    commonPitfall: 'Off-by-one errors (using `<=` instead of `<` when indexing zero-indexed arrays).',
    interviewTip: 'Leaving all three fields empty: `for (;;) { ... }` is the canonical idiom for an infinite loop in C.'
  },
  {
    keyword: 'goto',
    category: 'Control Flow',
    oneLiner: 'Performs an unconditional jump to a labeled statement within the same function.',
    hardwareSiliconMeaning: 'Emits a direct `jmp .label` machine opcode. The fastest possible jump instruction in computer architecture.',
    compilableExample: `#include <stdio.h>
int main(void) {
    int sensorError = 1;
    if (sensorError) goto emergency_stop;

    printf("Normal operations running...\\n");
    return 0;

emergency_stop:
    printf("[ALERT] Emergency shutoff triggered via goto cleanup!\\n");
    return 1;
}`,
    explanation: 'While banned for general spaghetti control flow, `goto` is standard in Linux Kernel and systems programming for centralized error cleanup.',
    commonPitfall: 'Jumping past variable initializations is illegal in C99/C11 and causes undefined behavior.',
    interviewTip: 'Mention the Linux Kernel: `goto out_free;` pattern prevents memory leaks by channeling all early exits through a single free sequence.'
  },
  {
    keyword: 'if',
    category: 'Control Flow',
    oneLiner: 'Evaluates an expression; executes body if evaluation is non-zero (True).',
    hardwareSiliconMeaning: 'CPU executes `test eax, eax` or `cmp` and sets EFLAGS (ZF = Zero Flag). `jz` (jump if zero) bypasses the block.',
    compilableExample: `#include <stdio.h>
int main(void) {
    int upiPinEntered = 1234;
    int correctPin = 1234;
    if (upiPinEntered == correctPin) {
        printf("UPI Payment Approved: Rs. 250 Sent\\n");
    }
    return 0;
}`,
    explanation: 'The fundamental branch decision construct in C. In C, there is no native primitive boolean; any non-zero value is treated as True.',
    commonPitfall: 'The accidental assignment bug: writing `if (x = 5)` instead of `if (x == 5)`. This always evaluates to true!',
    interviewTip: 'Use Yoda conditions (`if (5 == x)`) to catch accidental single `=` assignments at compile-time.'
  },
  {
    keyword: 'inline',
    category: 'Operator / Other',
    oneLiner: 'Suggests the compiler substitute function body at call site to eliminate call overhead.',
    hardwareSiliconMeaning: 'Eliminates the `call` and `ret` instructions, stack frame creation (`push rbp`), and register spilling for small hot functions.',
    compilableExample: `#include <stdio.h>
static inline int square(int x) {
    return x * x;
}

int main(void) {
    printf("Square of 7 = %d\\n", square(7));
    return 0;
}`,
    explanation: 'Trades a slight increase in binary code size for faster execution by removing function call overhead.',
    commonPitfall: '`inline` is strictly a compiler suggestion. The compiler will ignore it if the function is recursive or too large.',
    interviewTip: 'Always combine with `static` (`static inline`) in C header files so the compiler generates local inline code without linker duplicate errors.'
  },
  {
    keyword: 'int',
    category: 'Data Type',
    oneLiner: 'Primary signed integer data type matching native CPU register word size.',
    hardwareSiliconMeaning: '32-bit two\'s complement integer (-2,147,483,648 to 2,147,483,647) mapped directly to standard 32-bit ALU registers (`EAX`, `EBX`).',
    compilableExample: `#include <stdio.h>
int main(void) {
    int studentsInCSE = 120;
    printf("CSE Class Strength: %d (Size: %zu bytes)\\n", studentsInCSE, sizeof(studentsInCSE));
    return 0;
}`,
    explanation: 'The most heavily optimized arithmetic type on any CPU. Integer additions and subtractions take exactly 1 CPU clock cycle.',
    commonPitfall: 'Signed integer overflow in C is Undefined Behavior! Never rely on it wrapping around gracefully in production.',
    interviewTip: 'On modern 64-bit x86-64 and ARM64 CPUs, `int` remains 32-bit (4 bytes) under the LP64 data model for backwards compatibility.'
  },
  {
    keyword: 'long',
    category: 'Data Type',
    oneLiner: 'Integer type offering extended range (at least 32 bits, typically 64 bits on Linux).',
    hardwareSiliconMeaning: '64-bit integer on Linux/macOS x86-64 (occupying full `RAX` register). On 64-bit Windows, `long` is 32-bit (LLP64 model).',
    compilableExample: `#include <stdio.h>
int main(void) {
    long largePopulation = 1428627663L; // India population
    printf("Population count: %ld (Size: %zu bytes)\\n", largePopulation, sizeof(largePopulation));
    return 0;
}`,
    explanation: 'Used when values exceed the 2-billion limit of standard `int`. Combine with `long long` for guaranteed 64-bit integers on all platforms.',
    commonPitfall: 'Cross-platform inconsistency: `sizeof(long)` is 4 bytes on Windows 64-bit, but 8 bytes on Linux 64-bit.',
    interviewTip: 'For portable fixed-width code, recommend `<stdint.h>` types like `int64_t` or `int32_t` over bare `long`.'
  },
  {
    keyword: 'register',
    category: 'Storage Class',
    oneLiner: 'Requests compiler to store variable directly in a CPU register instead of RAM.',
    hardwareSiliconMeaning: 'Bypasses RAM memory bus and L1 cache entirely; reads and writes happen in 0.2 nanoseconds inside CPU silicon registers.',
    compilableExample: `#include <stdio.h>
int main(void) {
    register int fastCounter = 0;
    for (int i = 0; i < 5; i++) {
        fastCounter += i;
    }
    printf("Computed in Register: %d\\n", fastCounter);
    return 0;
}`,
    explanation: 'Historical C keyword to optimize hot loop counters. Modern optimizing compilers (GCC/Clang -O2) do register allocation automatically.',
    commonPitfall: 'You CANNOT take the address of a register variable (`&fastCounter` causes a compile error) because registers have no RAM memory address!',
    interviewTip: 'Great interview question: "Can you use the `&` address-of operator on a register variable?" Answer is strictly NO.'
  },
  {
    keyword: 'return',
    category: 'Control Flow',
    oneLiner: 'Terminates the current function and passes a result value back to the caller.',
    hardwareSiliconMeaning: 'Stores the return value in the `RAX` (or `EAX`) register, tears down the stack frame (`mov rsp, rbp; pop rbp`), and executes `ret`.',
    compilableExample: `#include <stdio.h>
int addRupees(int a, int b) {
    return a + b; // Passed back in EAX register
}

int main(void) {
    int total = addRupees(15, 25);
    printf("Total: Rs. %d (Rupees)\\n", total);
    return 0; // Signals OS: Process exited cleanly
}`,
    explanation: 'Returns control to the calling function. In `main()`, returning 0 indicates successful execution to the operating system shell.',
    commonPitfall: 'Returning a pointer to a local stack variable (`return &localVar;`). The stack frame vanishes and the pointer becomes dangling!',
    interviewTip: 'In void functions, `return;` without a value can be used as an early guard clause exit.'
  },
  {
    keyword: 'short',
    category: 'Data Type',
    oneLiner: '2-byte (16-bit) signed integer (-32,768 to 32,767).',
    hardwareSiliconMeaning: 'Occupies 2 bytes of RAM. Operates inside low 16-bit registers (`AX`, `BX`, `CX`). Saves 50% RAM compared to standard `int`.',
    compilableExample: `#include <stdio.h>
int main(void) {
    short sensorPort = 8080;
    printf("Port: %hd (Size: %zu bytes)\\n", sensorPort, sizeof(sensorPort));
    return 0;
}`,
    explanation: 'Commonly used in large audio sample buffers (16-bit PCM WAV audio) or microcontroller sensors to conserve scarce memory.',
    commonPitfall: 'Arithmetic promotion: C automatically promotes `short` to `int` during arithmetic operations before computing.',
    interviewTip: 'Format specifier in `printf` is `%hd` (half-decimal).'
  },
  {
    keyword: 'signed',
    category: 'Type Qualifier',
    oneLiner: 'Explicitly designates an integer type can represent both positive and negative values.',
    hardwareSiliconMeaning: 'The highest-order bit represents the sign in two\'s complement arithmetic (1 = negative, 0 = positive).',
    compilableExample: `#include <stdio.h>
int main(void) {
    signed int temperature = -5;
    printf("Winter Temperature in Manali: %d Celsius\\n", temperature);
    return 0;
}`,
    explanation: 'Integer types (`int`, `short`, `long`) are signed by default in C. The keyword is mainly used with `signed char` for clarity.',
    commonPitfall: 'Signed integer division by -1 on `INT_MIN` triggers a hardware integer overflow exception on x86!',
    interviewTip: 'Use `signed char` when you need an 8-bit number guaranteed to hold negative values across all compilers.'
  },
  {
    keyword: 'sizeof',
    category: 'Operator / Other',
    oneLiner: 'Compile-time operator returning the memory size of a type or variable in bytes.',
    hardwareSiliconMeaning: 'Evaluated entirely at compile-time by the parser; replaced directly with an integer constant (0 runtime execution overhead).',
    compilableExample: `#include <stdio.h>
int main(void) {
    int arr[10];
    printf("Total Array Memory: %zu bytes\\n", sizeof(arr));
    printf("Number of Elements: %zu\\n", sizeof(arr) / sizeof(arr[0]));
    return 0;
}`,
    explanation: 'Returns an unsigned integer of type `size_t`. Essential for dynamic memory allocations (`malloc(n * sizeof(int))`).',
    commonPitfall: '`sizeof(pointer)` returns 8 bytes (the pointer address size on 64-bit OS), NOT the size of the array pointed to!',
    interviewTip: 'Since it is evaluated at compile time, code inside `sizeof()` is NEVER executed: `sizeof(i++)` will not increment `i`!'
  },
  {
    keyword: 'static',
    category: 'Storage Class',
    oneLiner: 'Preserves variable value across function calls (local) or restricts symbol visibility to current file (global).',
    hardwareSiliconMeaning: 'Allocated in the `.data` or `.bss` data segment (permanent RAM address), NOT on the temporary function call stack.',
    compilableExample: `#include <stdio.h>
void enterMetroStation() {
    static int passengerCount = 0; // Initialized once in .bss
    passengerCount++;
    printf("Passenger #%d passed through turnstile\\n", passengerCount);
}

int main(void) {
    enterMetroStation();
    enterMetroStation();
    enterMetroStation();
    return 0;
}`,
    explanation: 'Two distinct roles: Inside functions, it creates persistent local state. On global variables/functions, it provides encapsulation by hiding symbols from the linker.',
    commonPitfall: 'Assuming static variables are re-initialized on every function call. The initialization line executes only once when program loads.',
    interviewTip: 'Always mark helper functions `static` in your `.c` files to prevent global namespace pollution and avoid linker symbol clashes.'
  },
  {
    keyword: 'struct',
    category: 'Compound Type',
    oneLiner: 'Aggregates multiple variables of different data types into one contiguous memory layout.',
    hardwareSiliconMeaning: 'Contiguous memory block with compiler-calculated byte offsets. Compiler inserts padding bytes to satisfy hardware CPU word alignment.',
    compilableExample: `#include <stdio.h>
struct Student {
    int rollNo;
    char grade;
    float gpa;
};

int main(void) {
    struct Student s1 = {101, 'A', 9.2f};
    printf("Student #%d: Grade %c, GPA %.1f (Size: %zu bytes)\\n", s1.rollNo, s1.grade, s1.gpa, sizeof(s1));
    return 0;
}`,
    explanation: 'The building block of complex data structures (nodes in linked lists, trees, graphs) and real-world system entities.',
    commonPitfall: 'Structure padding: `sizeof(struct)` is often larger than the sum of its fields due to CPU alignment rules (e.g. 4-byte boundaries).',
    interviewTip: 'Order your struct fields from largest to smallest to minimize memory wasted on compiler padding bytes!'
  },
  {
    keyword: 'switch',
    category: 'Control Flow',
    oneLiner: 'Multi-way branching construct comparing an integer against multiple constant case values.',
    hardwareSiliconMeaning: 'Compiles into high-speed hardware jump tables or binary search branches, outperforming long chains of `if-else` statements.',
    compilableExample: `#include <stdio.h>
int main(void) {
    int choice = 1;
    switch(choice) {
        case 1: printf("Selected: Masala Chai (Rs. 10)\\n"); break;
        case 2: printf("Selected: Samosa (Rs. 15)\\n"); break;
        default: printf("Invalid selection\\n"); break;
    }
    return 0;
}`,
    explanation: 'Clean, idiomatic way to handle discrete menu selections, parser token states, and finite state machines.',
    commonPitfall: 'Forgetting `break;` at the end of a case causes fall-through into subsequent cases.',
    interviewTip: 'GCC provides a compiler extension for case ranges: `case 1 ... 5:`, but standard ISO C requires individual cases.'
  },
  {
    keyword: 'typedef',
    category: 'Compound Type',
    oneLiner: 'Creates a convenient user-defined alias (synonym) for existing data types.',
    hardwareSiliconMeaning: 'Pure compiler symbol table mapping. Creates zero extra memory allocations and zero runtime instructions.',
    compilableExample: `#include <stdio.h>
typedef unsigned long long u64;

int main(void) {
    u64 nationalId = 998877665544ULL;
    printf("Aadhaar/National ID: %llu (Size: %zu bytes)\\n", nationalId, sizeof(u64));
    return 0;
}`,
    explanation: 'Dramatically simplifies complex declarations like function pointers and avoids repeating the word `struct` everywhere.',
    commonPitfall: '`typedef` does not create a new type; it creates a synonym. The compiler treats `u64` and `unsigned long long` as completely identical.',
    interviewTip: 'Standard C idiom: `typedef struct Node { int data; struct Node *next; } Node;` allows declaring `Node *head;` cleanly.'
  },
  {
    keyword: 'union',
    category: 'Compound Type',
    oneLiner: 'Shares the same physical memory space among multiple fields of different types.',
    hardwareSiliconMeaning: 'Allocates memory equal strictly to the size of its LARGEST member. All members share byte offset +0 in memory.',
    compilableExample: `#include <stdio.h>
union Packet {
    int integerVal;
    char byteVal[4];
};

int main(void) {
    union Packet p;
    p.integerVal = 0x12345678;
    printf("Total Union Size: %zu bytes (Shares same RAM!)\\n", sizeof(p));
    printf("First Byte in RAM: 0x%X\\n", (unsigned char)p.byteVal[0]);
    return 0;
}`,
    explanation: 'Used for memory optimization in embedded devices and low-level type punning (inspecting hardware endianness).',
    commonPitfall: 'Writing to one union member overwrites the values of all other members because they share the exact same bytes!',
    interviewTip: 'Unions are commonly used inside a "Tagged Union" (a struct holding an enum tag + a union) to represent polymorphic data.'
  },
  {
    keyword: 'unsigned',
    category: 'Type Qualifier',
    oneLiner: 'Designates an integer type can only hold non-negative values (>= 0), doubling its positive range.',
    hardwareSiliconMeaning: 'Uses logical shifts (`SHR`) instead of arithmetic sign-extended shifts (`SAR`). Overflow wraps cleanly modulo 2^N.',
    compilableExample: `#include <stdio.h>
int main(void) {
    unsigned int ramSizeMB = 16384;
    printf("Server RAM: %u MB (Positive Range: 0 to %u)\\n", ramSizeMB, 4294967295U);
    return 0;
}`,
    explanation: 'Doubles the maximum positive range (e.g. 0 to 4,294,967,295 for 32-bit `unsigned int`). Ideal for memory sizes and bitmasks.',
    commonPitfall: 'Loop decrement trap: `for (unsigned int i = 5; i >= 0; i--)` will NEVER terminate because unsigned `i` can never be negative!',
    interviewTip: 'Mixing signed and unsigned: in `int a = -1; unsigned int b = 1; if (a < b)`, C converts `a` to huge unsigned integer, making it FALSE!'
  },
  {
    keyword: 'void',
    category: 'Data Type',
    oneLiner: 'Represents the absence of type (no return value, no parameters, or raw generic memory address).',
    hardwareSiliconMeaning: 'A `void*` pointer is a raw 64-bit memory address with no type offset, meaning it cannot be dereferenced without casting.',
    compilableExample: `#include <stdio.h>
void printCollegeBanner(void) {
    printf("=== IIT / CSE ENGINEERING CAMPUS ===\\n");
}

int main(void) {
    printCollegeBanner();
    int x = 42;
    void *genericPtr = &x;
    printf("Generic Void Pointer dereferenced via (int*): %d\\n", *(int*)genericPtr);
    return 0;
}`,
    explanation: 'Three primary uses: (1) `void func()` returns nothing. (2) `func(void)` takes no parameters. (3) `void*` is a generic pointer (used by malloc/free).',
    commonPitfall: 'Attempting to dereference a `void*` pointer directly (`*voidPtr`) causes a compile error because the compiler doesn\'t know how many bytes to read.',
    interviewTip: 'In C, `void*` implicitly converts to and from any data pointer without an explicit cast (unlike C++).'
  },
  {
    keyword: 'volatile',
    category: 'Type Qualifier',
    oneLiner: 'Informs compiler that a variable can change unexpectedly (by hardware, ISR, or OS threads).',
    hardwareSiliconMeaning: 'Forbids the compiler optimizer from caching the variable in a CPU register or deleting writes. Every read/write MUST hit physical RAM bus.',
    compilableExample: `#include <stdio.h>
int main(void) {
    // Simulating memory-mapped I/O hardware register
    volatile int hardwareTimerFlag = 1;
    printf("Volatile Variable Value: %d\\n", hardwareTimerFlag);
    printf("Compiler guarantees physical RAM read on every single access!\\n");
    return 0;
}`,
    explanation: 'Crucial for Embedded Systems, Device Drivers, Interrupt Service Routines (ISRs), and Memory-Mapped Hardware I/O registers.',
    commonPitfall: 'Believing `volatile` provides thread synchronization or atomic locking. `volatile` does NOT make operations atomic or thread-safe!',
    interviewTip: '#1 Hardware C Interview Question: "Why do we use volatile?" Answer: Prevents compiler from optimizing away polling loops on hardware registers.'
  },
  {
    keyword: 'while',
    category: 'Control Flow',
    oneLiner: 'Entry-condition loop that repeats its body as long as the conditional expression is true (non-zero).',
    hardwareSiliconMeaning: 'Evaluates conditional expression at top of loop. If zero, immediately branches past body (`jz .L_loop_exit`).',
    compilableExample: `#include <stdio.h>
int main(void) {
    int battery = 3;
    while (battery > 0) {
        printf("Device Active: Battery level %d\\n", battery);
        battery--;
    }
    printf("Battery depleted. Shutdown.\\n");
    return 0;
}`,
    explanation: 'Used when the number of iterations is not known beforehand (e.g. reading from a file until EOF, waiting for a packet or queue).',
    commonPitfall: 'Forgetting to update the loop condition variable inside the body, producing an accidental infinite loop that locks the CPU.',
    interviewTip: '`while(*dest++ = *src++);` is the legendary classic one-line C implementation of the `strcpy` string copy function.'
  }
];
