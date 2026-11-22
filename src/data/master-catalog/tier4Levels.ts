import { MasterCurriculumItem } from './types';

export const TIER_4_LEVELS: MasterCurriculumItem[] = [
  {
    id: 91,
    slug: 'level-91-address-of-operator',
    tier: 'tier-4-lowlevel',
    tierLabel: 'Tier 4: Pointers, Memory Allocation & Low-Level Hardware (91-120)',
    title: 'Mission 91: Address-of Operator & Physical RAM Coordinate Inspection',
    category: 'Pointers & Memory Architecture',
    themeIcon: '📍',
    realLifeAnalogy: {
      story: 'Every house in Connaught Place, New Delhi has a unique street postal address. Similarly, every variable in C resides at a specific physical byte coordinate in computer RAM. The `&` operator reveals this memory address.',
      physicalConcept: 'The address-of operator `&` evaluates to the 64-bit or 32-bit virtual memory address where the variable is mapped.',
      ruleOfThumb: 'Print memory addresses using `%p` format specifier, casting to `(void*)` for standards compliance.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Inspecting variable value and memory address',
        description: 'Uses & operator with %p to print hex memory address.',
        code: `#include <stdio.h>

int main(void) {
    int bankVault = 75000;
    printf("Bank Vault Balance: Rs. %d\\n", bankVault);
    printf("Physical RAM Memory Address: %p\\n", (void*)&bankVault);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Stack frame displacement inspection',
        description: 'Examines relative stack frame offsets between adjacent variables.',
        code: `#include <stdio.h>

int main(void) {
    int a = 10, b = 20;
    printf("RAM Address A: %p | Address B: %p\\n", (void*)&a, (void*)&b);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['RSP stack pointer', 'RBP frame base', 'LEA load effective address'],
      assemblyNotes: 'lea rax, [rbp-4]; computes address of local variable without accessing RAM memory.',
      ramFootprint: '4 bytes for bankVault on stack + 8 bytes pointer address representation.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>', hint: 'Header file' },
        { id: 'b2', code: 'int main(void) {\\n    int bankVault = 75000;', hint: 'Declare integer variable' },
        { id: 'b3', code: '    printf("Bank Vault Balance: Rs. %d\\n", bankVault);\\n    printf("Physical RAM Memory Address: %p\\n", (void*)&bankVault);', hint: 'Print value and hex address with & and %p' },
        { id: 'b4', code: '    return 0;\\n}', hint: 'Return 0' }
      ],
      correctOrder: ['b1', 'b2', 'b3', 'b4']
    },
    expectedOutput: `Bank Vault Balance: Rs. 75000
Physical RAM Memory Address: 0x`,
    cKeywordsUsed: ['int', 'void', 'return'],
    daaComplexity: {
      timeComplexity: 'O(1) address calculation',
      spaceComplexity: 'O(1) stack allocation',
      algorithmClass: 'Memory Addressing & Pointer Primitives'
    }
  },
  {
    id: 92,
    slug: 'level-92-pointer-declaration-dereferencing',
    tier: 'tier-4-lowlevel',
    tierLabel: 'Tier 4: Pointers, Memory Allocation & Low-Level Hardware (91-120)',
    title: 'Mission 92: Pointer Declaration & Dereferencing Telescope',
    category: 'Pointers & Memory Architecture',
    themeIcon: '🔭',
    realLifeAnalogy: {
      story: 'A treasure map coordinate: Writing down the GPS coordinates of a treasure chest is NOT the chest itself—it is a pointer. To open the chest and read its gold coins, you "dereference" the map with `*ptr`.',
      physicalConcept: 'A pointer variable stores the memory address of another variable. The dereference operator `*` accesses the value stored at that target address.',
      ruleOfThumb: '`int *p` means p is a pointer to an int. `*p` means the integer sitting at the address stored in p.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Basic pointer linking and dereferencing',
        description: 'Assigns address to pointer and reads value remotely.',
        code: `#include <stdio.h>

int main(void) {
    int secretKey = 9421;
    int *ptr = &secretKey; // ptr holds address of secretKey

    printf("Direct Variable Value: %d\\n", secretKey);
    printf("Address held by Pointer: %p\\n", (void*)ptr);
    printf("Value read via Dereference (*ptr): %d\\n", *ptr);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Direct memory register pointer load',
        description: 'Examines pointer memory indirection.',
        code: `#include <stdio.h>

int main(void) {
    int val = 9421;
    int *p = &val;
    printf("Direct: %d | Pointer Target: %d\\n", val, *p);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['RAX address pointer', 'EDX dereferenced value', 'MOV indirection'],
      assemblyNotes: 'mov rax, [rbp-8]; mov edx, [rax]; Two-step hardware indirection through address register.',
      ramFootprint: '4 bytes for int + 8 bytes for 64-bit pointer.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>', hint: 'Header file' },
        { id: 'b2', code: 'int main(void) {\\n    int secretKey = 9421;\\n    int *ptr = &secretKey;', hint: 'Declare int and link pointer with &' },
        { id: 'b3', code: '    printf("Direct Variable Value: %d\\n", secretKey);\\n    printf("Address held by Pointer: %p\\n", (void*)ptr);\\n    printf("Value read via Dereference (*ptr): %d\\n", *ptr);', hint: 'Print value, address, and dereference' },
        { id: 'b4', code: '    return 0;\\n}', hint: 'Return 0' }
      ],
      correctOrder: ['b1', 'b2', 'b3', 'b4']
    },
    expectedOutput: `Direct Variable Value: 9421
Address held by Pointer: 0x
Value read via Dereference (*ptr): 9421`,
    cKeywordsUsed: ['int', 'void', 'return'],
    daaComplexity: {
      timeComplexity: 'O(1) memory dereference',
      spaceComplexity: '8 bytes pointer storage',
      algorithmClass: 'Indirect Memory Addressing'
    }
  },
  {
    id: 93,
    slug: 'level-93-remote-memory-mutation',
    tier: 'tier-4-lowlevel',
    tierLabel: 'Tier 4: Pointers, Memory Allocation & Low-Level Hardware (91-120)',
    title: 'Mission 93: Remote Memory Mutation & Bank Account Injection',
    category: 'Pointers & Memory Architecture',
    themeIcon: '💉',
    realLifeAnalogy: {
      story: 'An authorized Reserve Bank of India (RBI) auditor uses an audited memory probe pointer. By modifying `*pBalance = 90000`, the customer\'s bank account balance changes remotely from outside the bank!',
      physicalConcept: 'Dereferencing on the left side of an assignment (`*ptr = value;`) writes new data directly into the target memory cell.',
      ruleOfThumb: 'Pointers grant full read and write authority over target memory. Always verify pointers point to valid memory.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Remote modification via dereference assignment',
        description: 'Updates variable value through pointer.',
        code: `#include <stdio.h>

int main(void) {
    int sbiBalance = 40000;
    int *pBalance = &sbiBalance;

    printf("Original SBI Balance: Rs. %d\\n", sbiBalance);

    // Remote mutation via pointer!
    *pBalance = 90000;

    printf("Updated Balance via *pBalance: Rs. %d\\n", sbiBalance);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Direct memory store',
        description: 'Overwrites target memory location in hardware.',
        code: `#include <stdio.h>

int main(void) {
    int bal = 40000;
    int *p = &bal;
    *p = 90000;
    printf("Updated Balance: Rs. %d\\n", bal);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['RAX pointer address', 'MOV [rax], 90000 memory write'],
      assemblyNotes: 'mov dword ptr [rax], 90000; Directly writes into memory bus targeted by RAX address.',
      ramFootprint: '4 bytes for balance + 8 bytes for pointer.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>', hint: 'Header file' },
        { id: 'b2', code: 'int main(void) {\\n    int sbiBalance = 40000;\\n    int *pBalance = &sbiBalance;', hint: 'Setup variable and pointer' },
        { id: 'b3', code: '    printf("Original SBI Balance: Rs. %d\\n", sbiBalance);\\n    *pBalance = 90000;\\n    printf("Updated Balance via *pBalance: Rs. %d\\n", sbiBalance);', hint: 'Mutate memory and print' },
        { id: 'b4', code: '    return 0;\\n}', hint: 'Return 0' }
      ],
      correctOrder: ['b1', 'b2', 'b3', 'b4']
    },
    expectedOutput: `Original SBI Balance: Rs. 40000
Updated Balance via *pBalance: Rs. 90000`,
    cKeywordsUsed: ['int', 'return'],
    daaComplexity: {
      timeComplexity: 'O(1) memory write cycle',
      spaceComplexity: 'O(1) auxiliary space',
      algorithmClass: 'Remote Memory Mutation'
    }
  },
  {
    id: 94,
    slug: 'level-94-pass-by-reference-swap',
    tier: 'tier-4-lowlevel',
    tierLabel: 'Tier 4: Pointers, Memory Allocation & Low-Level Hardware (91-120)',
    title: 'Mission 94: Pass by Reference & Two Wallet Cash Swap',
    category: 'Pointers & Memory Architecture',
    themeIcon: '💱',
    realLifeAnalogy: {
      story: 'Two merchants in Chandni Chowk want to swap wallets: Wallet A has Rs. 500, Wallet B has Rs. 2000. In Mission 82, passing values failed. By passing the memory addresses `&walletA` and `&walletB`, the swap function modifies the real wallets!',
      physicalConcept: 'Simulating pass-by-reference in C by passing pointer addresses enables a function to modify caller variables across stack frames.',
      ruleOfThumb: 'To modify two or more variables in caller code, pass their addresses as pointers.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Classic pointer swap subroutine',
        description: 'Swaps two integers using temporary storage.',
        code: `#include <stdio.h>

void swapWallets(int *ptrA, int *ptrB) {
    int temp = *ptrA;
    *ptrA = *ptrB;
    *ptrB = temp;
}

int main(void) {
    int walletA = 500;
    int walletB = 2000;

    printf("[Before Swap] Wallet A: Rs. %d | Wallet B: Rs. %d\\n", walletA, walletB);
    swapWallets(&walletA, &walletB);
    printf("[After Swap]  Wallet A: Rs. %d | Wallet B: Rs. %d\\n", walletA, walletB);
    return 0;
}`
      },
      optimizedPro: {
        name: 'XOR pointer swap',
        description: 'Swaps target memory values using XOR.',
        code: `#include <stdio.h>

void swapXOR(int *a, int *b) {
    if (a != b) { *a ^= *b; *b ^= *a; *a ^= *b; }
}

int main(void) {
    int wA = 500, wB = 2000;
    swapXOR(&wA, &wB);
    printf("[After Swap]  Wallet A: Rs. %d | Wallet B: Rs. %d\\n", wA, wB);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['RDI address of A', 'RSI address of B', 'EAX value A', 'EDX value B'],
      assemblyNotes: 'Callee reads *RDI into EAX, reads *RSI into EDX, writes EDX into [RDI], writes EAX into [RSI].',
      ramFootprint: '8 bytes for 2 integers in caller + 16 bytes for 2 pointers in callee.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>', hint: 'Header include' },
        { id: 'b2', code: 'void swapWallets(int *ptrA, int *ptrB) {\\n    int temp = *ptrA;\\n    *ptrA = *ptrB;\\n    *ptrB = temp;\\n}', hint: 'Define pointer swap function' },
        { id: 'b3', code: 'int main(void) {\\n    int walletA = 500;\\n    int walletB = 2000;\\n    printf("[Before Swap] Wallet A: Rs. %d | Wallet B: Rs. %d\\n", walletA, walletB);', hint: 'Declare wallets' },
        { id: 'b4', code: '    swapWallets(&walletA, &walletB);\\n    printf("[After Swap]  Wallet A: Rs. %d | Wallet B: Rs. %d\\n", walletA, walletB);\\n    return 0;\\n}', hint: 'Pass addresses with & and print result' }
      ],
      correctOrder: ['b1', 'b2', 'b3', 'b4']
    },
    expectedOutput: `[Before Swap] Wallet A: Rs. 500 | Wallet B: Rs. 2000
[After Swap]  Wallet A: Rs. 2000 | Wallet B: Rs. 500`,
    cKeywordsUsed: ['void', 'int', 'return'],
    daaComplexity: {
      timeComplexity: 'O(1) memory swaps',
      spaceComplexity: 'O(1) stack frame',
      algorithmClass: 'Pass-by-Reference Memory Indirection'
    }
  },
  {
    id: 95,
    slug: 'level-95-pointer-arithmetic-scaling',
    tier: 'tier-4-lowlevel',
    tierLabel: 'Tier 4: Pointers, Memory Allocation & Low-Level Hardware (91-120)',
    title: 'Mission 95: Pointer Arithmetic & Type-Aware Memory Scaling',
    category: 'Pointers & Memory Architecture',
    themeIcon: '📏',
    realLifeAnalogy: {
      story: 'A train station platform: Walking to the next coach does NOT mean taking 1 millimeter step—it means stepping forward the entire length of a coach! In C, `ptr + 1` advances the address by `sizeof(*ptr)` bytes.',
      physicalConcept: 'Pointer arithmetic automatically scales: `p + 1` increments address by 1 byte for `char*`, 4 bytes for `int*`, and 8 bytes for `double*`.',
      ruleOfThumb: 'You cannot perform multiplication or division on pointers; only addition, subtraction, and difference between pointers of same type.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Comparing pointer step sizes across data types',
        description: 'Demonstrates 1-byte, 4-byte, and 8-byte pointer jumps.',
        code: `#include <stdio.h>

int main(void) {
    char c = 'A';
    int i = 100;
    double d = 3.14159;

    char *pc = &c;
    int *pi = &i;
    double *pd = &d;

    printf("Char pointer (size %zu bytes):   Base: %p -> Base+1: %p\\n", sizeof(char), (void*)pc, (void*)(pc + 1));
    printf("Int pointer (size %zu bytes):    Base: %p -> Base+1: %p\\n", sizeof(int), (void*)pi, (void*)(pi + 1));
    printf("Double pointer (size %zu bytes): Base: %p -> Base+1: %p\\n", sizeof(double), (void*)pd, (void*)(pd + 1));
    return 0;
}`
      },
      optimizedPro: {
        name: 'Byte delta verification',
        description: 'Calculates exact byte difference using char* cast.',
        code: `#include <stdio.h>

int main(void) {
    int arr[2] = {10, 20};
    int *p = arr;
    int byteDelta = (char*)(p + 1) - (char*)p;
    printf("Int pointer step byte delta: %d bytes (matches sizeof(int))\\n", byteDelta);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['RAX base pointer', 'LEA scale addressing mode [rax + rcx*4]'],
      assemblyNotes: 'x86 SIB byte (Scale-Index-Base) natively handles 1, 2, 4, 8 byte multiplications in hardware.',
      ramFootprint: '13 bytes for variables + 24 bytes for three 64-bit pointers.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>', hint: 'Header file' },
        { id: 'b2', code: 'int main(void) {\\n    char c = \'A\'; int i = 100; double d = 3.14159;\\n    char *pc = &c; int *pi = &i; double *pd = &d;', hint: 'Setup variables and pointers' },
        { id: 'b3', code: '    printf("Char pointer (size %zu bytes):   Base: %p -> Base+1: %p\\n", sizeof(char), (void*)pc, (void*)(pc + 1));\\n    printf("Int pointer (size %zu bytes):    Base: %p -> Base+1: %p\\n", sizeof(int), (void*)pi, (void*)(pi + 1));\\n    printf("Double pointer (size %zu bytes): Base: %p -> Base+1: %p\\n", sizeof(double), (void*)pd, (void*)(pd + 1));', hint: 'Print pointer scaling' },
        { id: 'b4', code: '    return 0;\\n}', hint: 'Return 0' }
      ],
      correctOrder: ['b1', 'b2', 'b3', 'b4']
    },
    expectedOutput: `Char pointer (size 1 bytes):   Base: 0x -> Base+1: 0x
Int pointer (size 4 bytes):    Base: 0x -> Base+1: 0x
Double pointer (size 8 bytes): Base: 0x -> Base+1: 0x`,
    cKeywordsUsed: ['char', 'int', 'double', 'sizeof', 'void', 'return'],
    daaComplexity: {
      timeComplexity: 'O(1) scaled addition',
      spaceComplexity: 'O(1) pointers',
      algorithmClass: 'Hardware Scaled Stride Arithmetic'
    }
  },
  {
    id: 96,
    slug: 'level-96-array-pointer-duality',
    tier: 'tier-4-lowlevel',
    tierLabel: 'Tier 4: Pointers, Memory Allocation & Low-Level Hardware (91-120)',
    title: 'Mission 96: Array-Pointer Duality & The Equivalence Identity',
    category: 'Pointers & Memory Architecture',
    themeIcon: '☯️',
    realLifeAnalogy: {
      story: 'Dennis Ritchie\'s secret in C: In C, `arr[i]` is not a distinct language feature—it is purely syntactic sugar for `*(arr + i)`. That means `arr[2]` and `*(arr + 2)` reach the exact same memory byte!',
      physicalConcept: 'Array names decay into a pointer to their first element: `arr == &arr[0]`. Thus `arr[i] == *(arr + i) == *(i + arr) == i[arr]`.',
      ruleOfThumb: 'Whenever you write `arr[i]`, the compiler translates it to pointer dereference `*(arr + i)`.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Proving array and pointer equivalence',
        description: 'Compares arr[i] with *(arr + i) across array elements.',
        code: `#include <stdio.h>

int main(void) {
    int prices[4] = {150, 300, 450, 600};
    int *ptr = prices;

    for (int i = 0; i < 4; i++) {
        printf("Index %d -> Bracket notation: %d | Pointer notation: %d\\n", 
               i, prices[i], *(ptr + i));
    }
    return 0;
}`
      },
      optimizedPro: {
        name: 'Pointer walk equivalence',
        description: 'Walks pointer directly across array.',
        code: `#include <stdio.h>

int main(void) {
    int p[4] = {150, 300, 450, 600};
    int *ptr = p;
    for (int i = 0; i < 4; i++) {
        printf("Index %d -> Bracket notation: %d | Pointer notation: %d\\n", i, p[i], *(ptr + i));
    }
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['RAX array base', 'RCX index', 'MOV edx, [rax + rcx*4]'],
      assemblyNotes: 'Both prices[i] and *(prices + i) generate identical assembly opcode: mov edx, [rax+rcx*4].',
      ramFootprint: '16 bytes for 4 integers.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>', hint: 'Header file' },
        { id: 'b2', code: 'int main(void) {\\n    int prices[4] = {150, 300, 450, 600};', hint: 'Declare array of prices' },
        { id: 'b3', code: '    for (int i = 0; i < 4; i++) {\\n        printf("Index %d -> Bracket notation: %d | Pointer notation: %d\\n", i, prices[i], *(prices + i));\\n    }', hint: 'Demonstrate identity equivalence' },
        { id: 'b4', code: '    return 0;\\n}', hint: 'Return 0' }
      ],
      correctOrder: ['b1', 'b2', 'b3', 'b4']
    },
    expectedOutput: `Index 0 -> Bracket notation: 150 | Pointer notation: 150
Index 1 -> Bracket notation: 300 | Pointer notation: 300
Index 2 -> Bracket notation: 450 | Pointer notation: 450
Index 3 -> Bracket notation: 600 | Pointer notation: 600`,
    cKeywordsUsed: ['int', 'for', 'return'],
    daaComplexity: {
      timeComplexity: 'O(1) indexed pointer dereference',
      spaceComplexity: 'O(1) extra space',
      algorithmClass: 'Compiler Syntactic Sugar Transformation'
    }
  },
  {
    id: 97,
    slug: 'level-97-pointer-array-traversal',
    tier: 'tier-4-lowlevel',
    tierLabel: 'Tier 4: Pointers, Memory Allocation & Low-Level Hardware (91-120)',
    title: 'Mission 97: Walking an Array with a Pointer & IoT Telemetry Scan',
    category: 'Pointers & Memory Architecture',
    themeIcon: '🚶',
    realLifeAnalogy: {
      story: 'An embedded sensor controller on a solar panel in Gujarat reads 5 voltage levels. Instead of keeping an integer index `i`, high-speed firmware increments the memory pointer directly: `ptr++` to stream readings with zero index arithmetic overhead.',
      physicalConcept: 'Incrementing the pointer directly (`ptr++`) moves the address register forward by 4 bytes, avoiding recalculating base + index * 4 on each step.',
      ruleOfThumb: 'A pointer walk terminates when pointer reaches the end address `ptr == arr + size`.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Direct pointer advancement loop',
        description: 'Advances pointer with ptr++ until end of array.',
        code: `#include <stdio.h>

int main(void) {
    int volts[5] = {220, 225, 218, 230, 222};
    int *ptr = volts;
    int *end = ptr + 5;

    printf("Solar Inverter Voltage Telemetry:\\n");
    int sensorNum = 1;
    while (ptr != end) {
        printf("Sensor %d: %d Volts (at RAM %p)\\n", sensorNum, *ptr, (void*)ptr);
        ptr++;
        sensorNum++;
    }
    return 0;
}`
      },
      optimizedPro: {
        name: 'Post-increment pointer stream',
        description: 'Combines dereference and increment in single expression: `*ptr++`.',
        code: `#include <stdio.h>

int main(void) {
    int v[5] = {220, 225, 218, 230, 222};
    int *p = v, *end = p + 5;
    printf("Solar Inverter Voltage Telemetry:\\n");
    for (int s = 1; p != end; s++) {
        printf("Sensor %d: %d Volts (at RAM %p)\\n", s, *p++, (void*)(p-1));
    }
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['RAX current pointer', 'RDX end sentinel pointer', 'LODSD load and advance'],
      assemblyNotes: 'lodsd in x86 loads [RSI] into EAX and automatically increments RSI by 4.',
      ramFootprint: '20 bytes array + 16 bytes for two pointers.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>', hint: 'Header include' },
        { id: 'b2', code: 'int main(void) {\\n    int volts[5] = {220, 225, 218, 230, 222};\\n    int *ptr = volts;\\n    int *end = volts + 5;\\n    int sensorNum = 1;', hint: 'Setup voltage array and pointer boundary' },
        { id: 'b3', code: '    printf("Solar Inverter Voltage Telemetry:\\n");\\n    while (ptr < end) {\\n        printf("Sensor %d: %d Volts (at RAM %p)\\n", sensorNum, *ptr, (void*)ptr);\\n        ptr++;\\n        sensorNum++;\\n    }', hint: 'Walk pointer with ptr++' },
        { id: 'b4', code: '    return 0;\\n}', hint: 'Exit 0' }
      ],
      correctOrder: ['b1', 'b2', 'b3', 'b4']
    },
    expectedOutput: `Solar Inverter Voltage Telemetry:
Sensor 1: 220 Volts (at RAM 0x
Sensor 2: 225 Volts (at RAM 0x
Sensor 3: 218 Volts (at RAM 0x
Sensor 4: 230 Volts (at RAM 0x
Sensor 5: 222 Volts (at RAM 0x`,
    cKeywordsUsed: ['int', 'while', 'void', 'return'],
    daaComplexity: {
      timeComplexity: 'O(N) sequential scan',
      spaceComplexity: 'O(1) auxiliary pointer',
      algorithmClass: 'Pointer Walk Streaming'
    }
  },
  {
    id: 98,
    slug: 'level-98-const-pointers-trio',
    tier: 'tier-4-lowlevel',
    tierLabel: 'Tier 4: Pointers, Memory Allocation & Low-Level Hardware (91-120)',
    title: 'Mission 98: Const Pointers: Pointer to Const vs Const Pointer',
    category: 'Pointers & Memory Architecture',
    themeIcon: '🔒',
    realLifeAnalogy: {
      story: 'A museum guard vs a security safe: `const int *p` means the exhibit behind the glass cannot be touched (read-only data). `int * const p` means the security camera is welded to the ceiling and cannot turn to another wall (fixed pointer).',
      physicalConcept: 'Read the declaration backwards from right to left: `const int *p` = p is a pointer to an int that is constant; `int * const p` = p is a const pointer to an int.',
      ruleOfThumb: 'If `const` is to the left of `*`, data is immutable. If `const` is to the right of `*`, the pointer address is immutable.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Demonstrating const data vs const address',
        description: 'Shows read-only data pointer vs fixed address pointer.',
        code: `#include <stdio.h>

int main(void) {
    int price = 500;
    int discount = 400;

    // 1. Pointer to const int (data is read-only, pointer can change)
    const int *ptrToConst = &price;
    printf("Read via ptrToConst: Rs. %d\\n", *ptrToConst);
    ptrToConst = &discount; // Allowed! Pointer address moves
    printf("ptrToConst redirected to discount: Rs. %d\\n", *ptrToConst);

    // 2. Const pointer to int (address is fixed, data can change)
    int * const constPtr = &price;
    *constPtr = 550; // Allowed! Target data mutated
    printf("price updated via constPtr: Rs. %d\\n", price);

    return 0;
}`
      },
      optimizedPro: {
        name: 'Const correctness check',
        description: 'Demonstrates const qualifier protection in API contracts.',
        code: `#include <stdio.h>

int main(void) {
    int val = 500;
    const int *p1 = &val;
    int * const p2 = &val;
    *p2 = 550;
    printf("Final Value: Rs. %d\\n", *p1);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['RAX read-only register', 'Type qualifier enforcement in compiler front-end'],
      assemblyNotes: 'The const keyword is enforced at compile time; machine code does not differentiate const pointers.',
      ramFootprint: '8 bytes for price/discount + 16 bytes for two pointers.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>', hint: 'Header file' },
        { id: 'b2', code: 'int main(void) {\\n    int price = 500;\\n    int discount = 400;', hint: 'Setup integers' },
        { id: 'b3', code: '    const int *ptrToConst = &price;\\n    printf("Read via ptrToConst: Rs. %d\\n", *ptrToConst);\\n    ptrToConst = &discount;\\n    printf("ptrToConst redirected to discount: Rs. %d\\n", *ptrToConst);', hint: 'Pointer to const demonstration' },
        { id: 'b4', code: '    int * const constPtr = &price;\\n    *constPtr = 550;\\n    printf("price updated via constPtr: Rs. %d\\n", price);\\n    return 0;\\n}', hint: 'Const pointer demonstration and return' }
      ],
      correctOrder: ['b1', 'b2', 'b3', 'b4']
    },
    expectedOutput: `Read via ptrToConst: Rs. 500
ptrToConst redirected to discount: Rs. 400
price updated via constPtr: Rs. 550`,
    cKeywordsUsed: ['const', 'int', 'return'],
    daaComplexity: {
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)',
      algorithmClass: 'Compile-Time Type Qualifier Constraints'
    }
  },
  {
    id: 99,
    slug: 'level-99-double-pointers-pointer-to-pointer',
    tier: 'tier-4-lowlevel',
    tierLabel: 'Tier 4: Pointers, Memory Allocation & Low-Level Hardware (91-120)',
    title: 'Mission 99: Double Pointers & Bombay Stock Exchange Portfolio Manager',
    category: 'Pointers & Memory Architecture',
    themeIcon: '💼',
    realLifeAnalogy: {
      story: 'BSE Mumbai Wealth Management: A high-net-worth client hires a portfolio manager. The client holds share certificates (data). The portfolio manager holds the safe location (single pointer). The family trust holds the portfolio manager\'s address (double pointer `int **`).',
      physicalConcept: 'A pointer-to-pointer stores the memory address of another pointer variable. Dereferencing twice `**pp` accesses the underlying data value.',
      ruleOfThumb: 'Double pointers are essential when a function needs to allocate or modify a pointer owned by the caller.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Explicit two-level pointer hierarchy',
        description: 'Initializes variable, pointer, and double pointer.',
        code: `#include <stdio.h>

int main(void) {
    int sharePrice = 2850;      // TCS share price
    int *pPrice = &sharePrice;   // Single pointer to sharePrice
    int **ppPrice = &pPrice;     // Double pointer to pPrice

    printf("Level 0: Direct Share Price: Rs. %d\\n", sharePrice);
    printf("Level 1: Read via Single Pointer (*pPrice): Rs. %d\\n", *pPrice);
    printf("Level 2: Read via Double Pointer (**ppPrice): Rs. %d\\n", **ppPrice);

    // Modify price via double pointer!
    **ppPrice = 3100;
    printf("Updated Price via **ppPrice: Rs. %d\\n", sharePrice);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Indirect pointer modification',
        description: 'Demonstrates double indirection memory traversal.',
        code: `#include <stdio.h>

int main(void) {
    int val = 2850;
    int *p = &val;
    int **pp = &p;
    **pp = 3100;
    printf("Updated Price: Rs. %d\\n", val);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['RAX double pointer', 'RDX single pointer', 'ECX data value'],
      assemblyNotes: 'mov rax, [rbp-16]; mov rdx, [rax]; mov ecx, [rdx]; Double dereference requires two memory fetches.',
      ramFootprint: '4 bytes for int + 8 bytes single pointer + 8 bytes double pointer.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>', hint: 'Header file' },
        { id: 'b2', code: 'int main(void) {\\n    int sharePrice = 2850;\\n    int *pPrice = &sharePrice;\\n    int **ppPrice = &pPrice;', hint: 'Setup value, pointer, and double pointer' },
        { id: 'b3', code: '    printf("Level 0: Direct Share Price: Rs. %d\\n", sharePrice);\\n    printf("Level 1: Read via Single Pointer (*pPrice): Rs. %d\\n", *pPrice);\\n    printf("Level 2: Read via Double Pointer (**ppPrice): Rs. %d\\n", **ppPrice);', hint: 'Print two-tier dereferencing' },
        { id: 'b4', code: '    **ppPrice = 3100;\\n    printf("Updated Price via **ppPrice: Rs. %d\\n", sharePrice);\\n    return 0;\\n}', hint: 'Mutate via ** and return' }
      ],
      correctOrder: ['b1', 'b2', 'b3', 'b4']
    },
    expectedOutput: `Level 0: Direct Share Price: Rs. 2850
Level 1: Read via Single Pointer (*pPrice): Rs. 2850
Level 2: Read via Double Pointer (**ppPrice): Rs. 2850
Updated Price via **ppPrice: Rs. 3100`,
    cKeywordsUsed: ['int', 'return'],
    daaComplexity: {
      timeComplexity: 'O(1) two memory bus cycles',
      spaceComplexity: '16 bytes pointer overhead',
      algorithmClass: 'Multi-Level Pointer Indirection'
    }
  },
  {
    id: 100,
    slug: 'level-100-void-pointers-generic-memory',
    tier: 'tier-4-lowlevel',
    tierLabel: 'Tier 4: Pointers, Memory Allocation & Low-Level Hardware (91-120)',
    title: 'Mission 100: Void Pointers & Generic Memory Network Packet Receiver',
    category: 'Pointers & Memory Architecture',
    themeIcon: '📦',
    realLifeAnalogy: {
      story: 'A postal shipping box: The delivery van carries sealed cardboard boxes. The driver doesn\'t know if a box holds an integer, a float, or text characters—it\'s just generic cargo! In C, `void*` is a generic pointer that can store any memory address.',
      physicalConcept: 'A `void*` has no associated data type. It cannot be directly dereferenced or incremented until explicitly cast to a concrete type.',
      ruleOfThumb: 'Always cast a `void*` to the appropriate type `*(int*)ptr` before reading or modifying data.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Generic void pointer casting demonstration',
        description: 'Points to int and float sequentially, casting before dereference.',
        code: `#include <stdio.h>

void printGenericData(void *dataPtr, char type) {
    if (type == 'i') {
        printf("Generic Payload [Integer]: %d\\n", *(int*)dataPtr);
    } else if (type == 'f') {
        printf("Generic Payload [Float]:   %.2f\\n", *(float*)dataPtr);
    }
}

int main(void) {
    int packetID = 404;
    float signalStrength = 98.6f;

    printGenericData(&packetID, 'i');
    printGenericData(&signalStrength, 'f');
    return 0;
}`
      },
      optimizedPro: {
        name: 'Type-punned generic dispatcher',
        description: 'Dispatches payload through typed pointer cast.',
        code: `#include <stdio.h>

int main(void) {
    int id = 404; float sig = 98.6f;
    void *p = &id;
    printf("Generic Payload [Integer]: %d\\n", *(int*)p);
    p = &sig;
    printf("Generic Payload [Float]:   %.2f\\n", *(float*)p);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['RDI void pointer address', 'AL type indicator flag'],
      assemblyNotes: 'The CPU treats void* as a standard 64-bit integer address register (RAX/RDI).',
      ramFootprint: '8 bytes for void pointer + 8 bytes for variables.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>', hint: 'Header include' },
        { id: 'b2', code: 'void printGenericData(void *dataPtr, char type) {\\n    if (type == \'i\') printf("Generic Payload [Integer]: %d\\n", *(int*)dataPtr);\\n    else if (type == \'f\') printf("Generic Payload [Float]:   %.2f\\n", *(float*)dataPtr);\\n}', hint: 'Generic function with type casting' },
        { id: 'b3', code: 'int main(void) {\\n    int packetID = 404;\\n    float signalStrength = 98.6f;\\n    printGenericData(&packetID, \'i\');\\n    printGenericData(&signalStrength, \'f\');', hint: 'Pass addresses to generic function' },
        { id: 'b4', code: '    return 0;\\n}', hint: 'Return 0' }
      ],
      correctOrder: ['b1', 'b2', 'b3', 'b4']
    },
    expectedOutput: `Generic Payload [Integer]: 404
Generic Payload [Float]:   98.60`,
    cKeywordsUsed: ['void', 'int', 'float', 'char', 'if', 'else', 'return'],
    daaComplexity: {
      timeComplexity: 'O(1) cast & dereference',
      spaceComplexity: 'O(1) pointer',
      algorithmClass: 'Polymorphic Type Erasure & Generic Memory'
    }
  },
  {
    id: 101,
    slug: 'level-101-null-pointer-safeguard',
    tier: 'tier-4-lowlevel',
    tierLabel: 'Tier 4: Pointers, Memory Allocation & Low-Level Hardware (91-120)',
    title: 'Mission 101: NULL Pointer Safeguards & Segfault Prevention',
    category: 'Pointers & Memory Architecture',
    themeIcon: '🛑',
    realLifeAnalogy: {
      story: 'An ATM cash dispenser checks if cash cassettes are connected before ejecting money. If a technician tries to access disconnected cassette address NULL (0x0), the CPU hardware memory management unit triggers an immediate SIGSEGV crash!',
      physicalConcept: 'NULL is typically defined as `((void*)0)`. Virtual memory page 0 is intentionally unmapped by the operating system so dereferencing it triggers a hardware trap.',
      ruleOfThumb: 'Always check `if (ptr != NULL)` before dereferencing any pointer received from external functions or malloc.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Defensive NULL pointer verification check',
        description: 'Checks pointer validity before attempting dereference.',
        code: `#include <stdio.h>

void dispenseAtmCash(int *pAmount) {
    if (pAmount == NULL) {
        printf("CRITICAL ERROR: Null memory address detected! Aborting transaction.\\n");
        return;
    }
    printf("ATM Transaction Approved: Dispensing Rs. %d\\n", *pAmount);
}

int main(void) {
    int withdrawal = 2000;
    int *validPtr = &withdrawal;
    int *unlinkedPtr = NULL; // Safe unlinked pointer

    dispenseAtmCash(validPtr);
    dispenseAtmCash(unlinkedPtr);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Branch prediction NULL guard',
        description: 'Early exit guard for null pointers.',
        code: `#include <stdio.h>

void withdraw(int *p) {
    if (!p) { printf("CRITICAL ERROR: Null memory address detected! Aborting transaction.\\n"); return; }
    printf("ATM Transaction Approved: Dispensing Rs. %d\\n", *p);
}

int main(void) {
    int w = 2000;
    withdraw(&w);
    withdraw(NULL);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'text',
      cpuRegisters: ['TEST RDI, RDI', 'JZ .L_null_handler', 'MMU Page Fault'],
      assemblyNotes: 'test rdi, rdi; jz handles null check; if bypassed, dereferencing 0x0 triggers MMU page fault interrupt 14.',
      ramFootprint: '8 bytes for pointer.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>', hint: 'Header include' },
        { id: 'b2', code: 'void dispenseAtmCash(int *pAmount) {\\n    if (pAmount == NULL) {\\n        printf("CRITICAL ERROR: Null memory address detected! Aborting transaction.\\n");\\n        return;\\n    }\\n    printf("ATM Transaction Approved: Dispensing Rs. %d\\n", *pAmount);\\n}', hint: 'Guard with NULL check' },
        { id: 'b3', code: 'int main(void) {\\n    int withdrawal = 2000;\\n    int *validPtr = &withdrawal;\\n    int *unlinkedPtr = NULL;', hint: 'Valid and NULL pointers' },
        { id: 'b4', code: '    dispenseAtmCash(validPtr);\\n    dispenseAtmCash(unlinkedPtr);\\n    return 0;\\n}', hint: 'Test both pointers and exit' }
      ],
      correctOrder: ['b1', 'b2', 'b3', 'b4']
    },
    expectedOutput: `ATM Transaction Approved: Dispensing Rs. 2000
CRITICAL ERROR: Null memory address detected! Aborting transaction.`,
    cKeywordsUsed: ['void', 'int', 'if', 'return'],
    daaComplexity: {
      timeComplexity: 'O(1) pointer nullity test',
      spaceComplexity: 'O(1) pointer space',
      algorithmClass: 'Defensive Programming & Hardware MMU Guard'
    }
  },
  {
    id: 102,
    slug: 'level-102-heap-malloc-allocation',
    tier: 'tier-4-lowlevel',
    tierLabel: 'Tier 4: Pointers, Memory Allocation & Low-Level Hardware (91-120)',
    title: 'Mission 102: Dynamic Heap Allocation via malloc & Railway Reservation',
    category: 'Dynamic Memory & Heap',
    themeIcon: '🏗️',
    realLifeAnalogy: {
      story: 'IRCTC Tatkal booking rush: You don\'t know at compile time whether 3 passengers or 50 passengers will book a coach! Instead of fixed stack arrays, `malloc` requests dynamic memory from the Heap pool at runtime.',
      physicalConcept: '`malloc(bytes)` asks the OS heap memory allocator (via brk/mmap system calls) for a contiguous block of bytes and returns a pointer to its start address.',
      ruleOfThumb: 'Always check if `malloc` returned `NULL` before using dynamic memory, and always free allocated memory when done!'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Dynamic array allocation with malloc',
        description: 'Allocates heap memory for 3 passenger seat numbers.',
        code: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int passengerCount = 3;
    int *seats = (int*)malloc(passengerCount * sizeof(int));

    if (seats == NULL) {
        printf("Out of Memory! Allocation failed.\\n");
        return 1;
    }

    seats[0] = 42; // Seat 42
    seats[1] = 43; // Seat 43
    seats[2] = 44; // Seat 44

    printf("Dynamically Allocated Heap Seat Roster:\\n");
    for (int i = 0; i < passengerCount; i++) {
        printf("Passenger %d -> Seat #%d (Heap Address: %p)\\n", i + 1, seats[i], (void*)&seats[i]);
    }

    free(seats); // Return heap memory to OS
    return 0;
}`
      },
      optimizedPro: {
        name: 'Direct heap initialization',
        description: 'Streams data into allocated block.',
        code: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *s = malloc(3 * sizeof(int));
    if (!s) return 1;
    s[0] = 42; s[1] = 43; s[2] = 44;
    printf("Dynamically Allocated Heap Seat Roster:\\n");
    for (int i = 0; i < 3; i++) printf("Passenger %d -> Seat #%d (Heap Address: %p)\\n", i + 1, s[i], (void*)&s[i]);
    free(s);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'heap',
      cpuRegisters: ['RDI size parameter', 'RAX returned heap address', 'BRK/MMAP syscall'],
      assemblyNotes: 'call malloc invokes GNU libc ptmalloc allocator, returning pointer in RAX.',
      ramFootprint: '12 bytes (3 * 4 bytes) allocated on the Heap + 8 bytes pointer on stack.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>\\n#include <stdlib.h>', hint: 'Include stdio and stdlib' },
        { id: 'b2', code: 'int main(void) {\\n    int passengerCount = 3;\\n    int *seats = (int*)malloc(passengerCount * sizeof(int));\\n    if (seats == NULL) return 1;', hint: 'Allocate heap memory and check null' },
        { id: 'b3', code: '    seats[0] = 42; seats[1] = 43; seats[2] = 44;\\n    printf("Dynamically Allocated Heap Seat Roster:\\n");\\n    for (int i = 0; i < passengerCount; i++) {\\n        printf("Passenger %d -> Seat #%d (Heap Address: %p)\\n", i + 1, seats[i], (void*)&seats[i]);\\n    }', hint: 'Initialize and display' },
        { id: 'b4', code: '    free(seats);\\n    return 0;\\n}', hint: 'Free memory and return' }
      ],
      correctOrder: ['b1', 'b2', 'b3', 'b4']
    },
    expectedOutput: `Dynamically Allocated Heap Seat Roster:
Passenger 1 -> Seat #42 (Heap Address: 0x
Passenger 2 -> Seat #43 (Heap Address: 0x
Passenger 3 -> Seat #44 (Heap Address: 0x`,
    cKeywordsUsed: ['int', 'sizeof', 'if', 'for', 'return'],
    daaComplexity: {
      timeComplexity: 'O(1) amortized allocation',
      spaceComplexity: 'O(N) runtime dynamic heap memory',
      algorithmClass: 'Dynamic Runtime Memory Allocation'
    }
  },
  {
    id: 103,
    slug: 'level-103-heap-free-memory-leaks',
    tier: 'tier-4-lowlevel',
    tierLabel: 'Tier 4: Pointers, Memory Allocation & Low-Level Hardware (91-120)',
    title: 'Mission 103: Heap Cleanup via free & 24/7 Server Memory Leak Prevention',
    category: 'Dynamic Memory & Heap',
    themeIcon: '♻️',
    realLifeAnalogy: {
      story: 'A self-service hotel room: When a guest checks out, they must return the room key card so the next guest can use the room. If a program allocates memory with `malloc` but never calls `free`, RAM fills up until the server runs out of memory (OOM Crash)!',
      physicalConcept: '`free(ptr)` marks the heap block as available in the allocator\'s free list. It does not erase the pointer variable or wipe RAM bytes.',
      ruleOfThumb: 'Every single `malloc` MUST have an associated `free`. After freeing, set `ptr = NULL` immediately.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Allocate, inspect, free, and neutralize pointer',
        description: 'Demonstrates responsible memory lifecycle.',
        code: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *packetBuffer = (int*)malloc(100 * sizeof(int));
    if (packetBuffer == NULL) return 1;

    packetBuffer[0] = 1001; // First packet sequence ID
    printf("Buffer allocated on heap at: %p\\n", (void*)packetBuffer);
    printf("Stored first packet ID: %d\\n", packetBuffer[0]);

    // Cleanup: Prevent memory leak!
    free(packetBuffer);
    packetBuffer = NULL; // Neutralize dangling pointer

    printf("Memory successfully returned to OS pool! (packetBuffer = NULL)\\n");
    return 0;
}`
      },
      optimizedPro: {
        name: 'RAII style scoped dynamic memory',
        description: 'Clean allocate-use-free cycle.',
        code: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *buf = malloc(100 * sizeof(int));
    if (!buf) return 1;
    buf[0] = 1001;
    printf("Buffer allocated on heap at: %p\\nStored first packet ID: %d\\n", (void*)buf, buf[0]);
    free(buf); buf = NULL;
    printf("Memory successfully returned to OS pool! (packetBuffer = NULL)\\n");
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'heap',
      cpuRegisters: ['RDI chunk address', 'CALL free', 'Free List binning'],
      assemblyNotes: 'free(ptr) merges adjacent free chunks (coalescing) to prevent heap fragmentation.',
      ramFootprint: '400 bytes allocated temporarily on heap and freed.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>\\n#include <stdlib.h>', hint: 'Include headers' },
        { id: 'b2', code: 'int main(void) {\\n    int *packetBuffer = (int*)malloc(100 * sizeof(int));\\n    if (packetBuffer == NULL) return 1;\\n    packetBuffer[0] = 1001;', hint: 'Allocate and initialize' },
        { id: 'b3', code: '    printf("Buffer allocated on heap at: %p\\n", (void*)packetBuffer);\\n    printf("Stored first packet ID: %d\\n", packetBuffer[0]);', hint: 'Print status' },
        { id: 'b4', code: '    free(packetBuffer);\\n    packetBuffer = NULL;\\n    printf("Memory successfully returned to OS pool! (packetBuffer = NULL)\\n");\\n    return 0;\\n}', hint: 'Free memory, neutralize, and return' }
      ],
      correctOrder: ['b1', 'b2', 'b3', 'b4']
    },
    expectedOutput: `Buffer allocated on heap at: 0x
Stored first packet ID: 1001
Memory successfully returned to OS pool! (packetBuffer = NULL)`,
    cKeywordsUsed: ['int', 'sizeof', 'if', 'return'],
    daaComplexity: {
      timeComplexity: 'O(1) heap chunk deallocation',
      spaceComplexity: 'Zero heap leakage',
      algorithmClass: 'Memory Deallocation & Hygiene'
    }
  },
  {
    id: 104,
    slug: 'level-104-calloc-zero-initialized-memory',
    tier: 'tier-4-lowlevel',
    tierLabel: 'Tier 4: Pointers, Memory Allocation & Low-Level Hardware (91-120)',
    title: 'Mission 104: Zero-Initialized Heap Allocation via calloc',
    category: 'Dynamic Memory & Heap',
    themeIcon: '🧼',
    realLifeAnalogy: {
      story: 'A newly opened bank branch initializes 4 cash deposit registers. While `malloc` leaves old dirty garbage bytes inside memory, `calloc` automatically washes and zeroes every single byte to 0!',
      physicalConcept: '`calloc(count, size)` takes two arguments (element count, element size), checks for integer multiplication overflow, allocates memory, and zeroes out every byte.',
      ruleOfThumb: 'Use `calloc` when you need zero-initialized buffers, such as tally frequency counters or cleared financial balances.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Comparing malloc garbage vs calloc zeroes',
        description: 'Allocates with calloc and verifies all elements are initialized to 0.',
        code: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int numAccounts = 4;
    int *balances = (int*)calloc(numAccounts, sizeof(int));

    if (balances == NULL) return 1;

    printf("Calloc Zero-Initialized Bank Ledger:\\n");
    for (int i = 0; i < numAccounts; i++) {
        printf("Account %d Initial Balance: Rs. %d (Clean Zero!)\\n", i + 1, balances[i]);
    }

    free(balances);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Kernel zero-copy page optimization',
        description: 'Notes OS copy-on-write zero page optimization.',
        code: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *b = calloc(4, sizeof(int));
    if (!b) return 1;
    printf("Calloc Zero-Initialized Bank Ledger:\\n");
    for (int i = 0; i < 4; i++) printf("Account %d Initial Balance: Rs. %d (Clean Zero!)\\n", i + 1, b[i]);
    free(b);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'heap',
      cpuRegisters: ['RDI num elements', 'RSI element size', 'memset zeroing'],
      assemblyNotes: 'OS kernel often satisfies calloc by mapping the copy-on-write Zero Page.',
      ramFootprint: '16 bytes (4 ints * 4 bytes) zeroed out on heap.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>\\n#include <stdlib.h>', hint: 'Header includes' },
        { id: 'b2', code: 'int main(void) {\\n    int numAccounts = 4;\\n    int *balances = (int*)calloc(numAccounts, sizeof(int));\\n    if (balances == NULL) return 1;', hint: 'Allocate zeroed memory via calloc' },
        { id: 'b3', code: '    printf("Calloc Zero-Initialized Bank Ledger:\\n");\\n    for (int i = 0; i < numAccounts; i++) {\\n        printf("Account %d Initial Balance: Rs. %d (Clean Zero!)\\n", i + 1, balances[i]);\\n    }', hint: 'Verify all values are 0' },
        { id: 'b4', code: '    free(balances);\\n    return 0;\\n}', hint: 'Free memory and return' }
      ],
      correctOrder: ['b1', 'b2', 'b3', 'b4']
    },
    expectedOutput: `Calloc Zero-Initialized Bank Ledger:
Account 1 Initial Balance: Rs. 0 (Clean Zero!)
Account 2 Initial Balance: Rs. 0 (Clean Zero!)
Account 3 Initial Balance: Rs. 0 (Clean Zero!)
Account 4 Initial Balance: Rs. 0 (Clean Zero!)`,
    cKeywordsUsed: ['int', 'sizeof', 'if', 'for', 'return'],
    daaComplexity: {
      timeComplexity: 'O(N) to zero memory block',
      spaceComplexity: 'O(N) heap memory',
      algorithmClass: 'Zero-Initialized Memory Allocation'
    }
  },
  {
    id: 105,
    slug: 'level-105-realloc-dynamic-expansion',
    tier: 'tier-4-lowlevel',
    tierLabel: 'Tier 4: Pointers, Memory Allocation & Low-Level Hardware (91-120)',
    title: 'Mission 105: Dynamic Buffer Expansion via realloc & Cricket Scoreboard',
    category: 'Dynamic Memory & Heap',
    themeIcon: '📈',
    realLifeAnalogy: {
      story: 'A live IPL cricket scoreboard starts with an initial capacity for 2 overs of run data. When the match extends, `realloc` expands the existing buffer to 4 overs without losing the previous runs scored!',
      physicalConcept: '`realloc(ptr, new_bytes)` either expands the block in-place if adjacent memory is free, or allocates a new block, copies the old data over, frees the old block, and returns the new address.',
      ruleOfThumb: 'Always store realloc result in a temporary pointer: `temp = realloc(...)`. If realloc fails, assigning directly to ptr loses the original pointer, causing a memory leak!'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Safe dynamic array resizing with realloc',
        description: 'Allocates 2 elements, resizes to 4, preserving data.',
        code: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *runs = (int*)malloc(2 * sizeof(int));
    if (runs == NULL) return 1;

    runs[0] = 12; // Over 1
    runs[1] = 8;  // Over 2
    printf("Initial 2 Overs: %d, %d\\n", runs[0], runs[1]);

    // Expand buffer from 2 elements to 4 elements!
    int *expanded = (int*)realloc(runs, 4 * sizeof(int));
    if (expanded == NULL) {
        free(runs);
        return 1;
    }
    runs = expanded;

    runs[2] = 16; // Over 3
    runs[3] = 14; // Over 4

    printf("Expanded 4 Overs Scorecard:\\n");
    for (int i = 0; i < 4; i++) {
        printf("Over %d: %d runs\\n", i + 1, runs[i]);
    }

    free(runs);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Geometric dynamic growth policy',
        description: 'Doubles capacity on demand ($2\\times$ growth factor).',
        code: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *r = malloc(2 * sizeof(int));
    r[0] = 12; r[1] = 8;
    printf("Initial 2 Overs: %d, %d\\n", r[0], r[1]);
    r = realloc(r, 4 * sizeof(int));
    r[2] = 16; r[3] = 14;
    printf("Expanded 4 Overs Scorecard:\\n");
    for (int i = 0; i < 4; i++) printf("Over %d: %d runs\\n", i + 1, r[i]);
    free(r);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'heap',
      cpuRegisters: ['RDI old pointer', 'RSI new size', 'RAX new pointer', 'MEMCPY'],
      assemblyNotes: 'If block cannot expand in-place, allocator invokes memcpy to transfer bytes to new page.',
      ramFootprint: '8 bytes initially, expanded to 16 bytes on heap.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>\\n#include <stdlib.h>', hint: 'Headers' },
        { id: 'b2', code: 'int main(void) {\\n    int *runs = (int*)malloc(2 * sizeof(int));\\n    runs[0] = 12; runs[1] = 8;\\n    printf("Initial 2 Overs: %d, %d\\n", runs[0], runs[1]);', hint: 'Initial allocation' },
        { id: 'b3', code: '    int *expanded = (int*)realloc(runs, 4 * sizeof(int));\\n    runs = expanded;\\n    runs[2] = 16; runs[3] = 14;', hint: 'Realloc expand and append' },
        { id: 'b4', code: '    printf("Expanded 4 Overs Scorecard:\\n");\\n    for (int i = 0; i < 4; i++) printf("Over %d: %d runs\\n", i + 1, runs[i]);\\n    free(runs);\\n    return 0;\\n}', hint: 'Print expanded array and free' }
      ],
      correctOrder: ['b1', 'b2', 'b3', 'b4']
    },
    expectedOutput: `Initial 2 Overs: 12, 8
Expanded 4 Overs Scorecard:
Over 1: 12 runs
Over 2: 8 runs
Over 3: 16 runs
Over 4: 14 runs`,
    cKeywordsUsed: ['int', 'sizeof', 'for', 'return'],
    daaComplexity: {
      timeComplexity: 'Amortized O(1) in-place expansion, O(N) if moved',
      spaceComplexity: 'O(N) dynamically sized heap',
      algorithmClass: 'Dynamic Resizing / Vector Growth'
    }
  },
  {
    id: 106,
    slug: 'level-106-dangling-pointers-double-free',
    tier: 'tier-4-lowlevel',
    tierLabel: 'Tier 4: Pointers, Memory Allocation & Low-Level Hardware (91-120)',
    title: 'Mission 106: Dangling Pointer Elimination & Double-Free Defense',
    category: 'Dynamic Memory & Heap',
    themeIcon: '☣️',
    realLifeAnalogy: {
      story: 'A cyber security alert at a fintech company: When a bank account is closed, keeping the customer\'s key and trying to use it again (Dangling Pointer) or deleting the same account twice (Double Free) causes severe system corruption exploited by hackers!',
      physicalConcept: 'A dangling pointer still holds the address of deallocated memory. Attempting to free an already-freed pointer causes heap metadata corruption.',
      ruleOfThumb: 'Always set pointer to NULL immediately after `free(p); p = NULL;`. Calling `free(NULL)` is completely harmless and guaranteed safe in ISO C.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Safe deallocation idiom with pointer neutralization',
        description: 'Demonstrates safe pattern preventing dangling pointers.',
        code: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *secretToken = (int*)malloc(sizeof(int));
    *secretToken = 8899;

    printf("Token created at %p with value: %d\\n", (void*)secretToken, *secretToken);

    // Free memory
    free(secretToken);
    secretToken = NULL; // Crucial step: kills the dangling pointer!

    // Defensive check: is it safe?
    if (secretToken == NULL) {
        printf("Pointer successfully neutralized. No dangling vulnerability!\\n");
    }

    // Safe double-free test: free(NULL) is a guaranteed no-op in C
    free(secretToken);
    printf("Safe free(NULL) executed without crashing.\\n");
    return 0;
}`
      },
      optimizedPro: {
        name: 'Macro safe-free wrapper',
        description: 'Encapsulates free and null assignment into a macro.',
        code: `#include <stdio.h>
#include <stdlib.h>

#define SAFE_FREE(p) do { free(p); (p) = NULL; } while(0)

int main(void) {
    int *token = malloc(sizeof(int));
    *token = 8899;
    printf("Token created at %p with value: %d\\n", (void*)token, *token);
    SAFE_FREE(token);
    printf("Pointer successfully neutralized. No dangling vulnerability!\\nSafe free(NULL) executed without crashing.\\n");
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'heap',
      cpuRegisters: ['TEST RDI, RDI', 'JZ skip free'],
      assemblyNotes: 'The C standard library free implementation explicitly tests for NULL first: if (ptr == 0) return.',
      ramFootprint: '4 bytes heap chunk freed + 8 bytes pointer zeroed on stack.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>\\n#include <stdlib.h>', hint: 'Header files' },
        { id: 'b2', code: 'int main(void) {\\n    int *secretToken = (int*)malloc(sizeof(int));\\n    *secretToken = 8899;\\n    printf("Token created at %p with value: %d\\n", (void*)secretToken, *secretToken);', hint: 'Allocate and store token' },
        { id: 'b3', code: '    free(secretToken);\\n    secretToken = NULL;\\n    if (secretToken == NULL) {\\n        printf("Pointer successfully neutralized. No dangling vulnerability!\\n");\\n    }', hint: 'Free and assign NULL' },
        { id: 'b4', code: '    free(secretToken);\\n    printf("Safe free(NULL) executed without crashing.\\n");\\n    return 0;\\n}', hint: 'Call safe free(NULL) and exit' }
      ],
      correctOrder: ['b1', 'b2', 'b3', 'b4']
    },
    expectedOutput: `Token created at 0x with value: 8899
Pointer successfully neutralized. No dangling vulnerability!
Safe free(NULL) executed without crashing.`,
    cKeywordsUsed: ['int', 'sizeof', 'if', 'return'],
    daaComplexity: {
      timeComplexity: 'O(1) safe deallocation',
      spaceComplexity: 'Zero memory risk',
      algorithmClass: 'Defensive Memory Safety Idiom'
    }
  },
  {
    id: 107,
    slug: 'level-107-struct-declaration-dot-operator',
    tier: 'tier-4-lowlevel',
    tierLabel: 'Tier 4: Pointers, Memory Allocation & Low-Level Hardware (91-120)',
    title: 'Mission 107: Struct Declaration & Indian Railway Ticket Record',
    category: 'Structures & Compound Types',
    themeIcon: '🎫',
    realLifeAnalogy: {
      story: 'An Indian Railways IRCTC train ticket groups heterogeneous pieces of information together: PNR Number (int), Coach Class (char), and Fare (float). A `struct` bundles these different types into a single unified record.',
      physicalConcept: 'A `struct` is a contiguous composite memory record where member fields are laid out sequentially with potential padding for CPU memory alignment.',
      ruleOfThumb: 'Use the dot operator (`ticket.pnr`) to access members of a struct variable directly.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Direct struct definition and dot notation',
        description: 'Declares RailwayTicket struct and initializes fields.',
        code: `#include <stdio.h>

struct RailwayTicket {
    int pnrNumber;
    char coachClass;
    float fareAmount;
};

int main(void) {
    struct RailwayTicket t1;
    t1.pnrNumber = 248910;
    t1.coachClass = 'A'; // 1st AC
    t1.fareAmount = 2450.50f;

    printf("IRCTC Confirmed E-Ticket:\\n");
    printf("PNR: %d\\n", t1.pnrNumber);
    printf("Class: %c Tier\\n", t1.coachClass);
    printf("Fare: Rs. %.2f\\n", t1.fareAmount);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Designated initializer struct setup',
        description: 'Uses C99 designated initializers for self-documenting code.',
        code: `#include <stdio.h>

struct RailwayTicket {
    int pnrNumber;
    char coachClass;
    float fareAmount;
};

int main(void) {
    struct RailwayTicket t1 = { .pnrNumber = 248910, .coachClass = 'A', .fareAmount = 2450.50f };
    printf("IRCTC Confirmed E-Ticket:\\nPNR: %d\\nClass: %c Tier\\nFare: Rs. %.2f\\n", t1.pnrNumber, t1.coachClass, t1.fareAmount);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['RBP relative offset addressing for each struct member'],
      assemblyNotes: 'pnr at [rbp-12], coach at [rbp-8], fare at [rbp-4].',
      ramFootprint: '12 bytes total on the stack.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>\\n\\nstruct RailwayTicket {\\n    int pnrNumber;\\n    char coachClass;\\n    float fareAmount;\\n};', hint: 'Define struct' },
        { id: 'b2', code: 'int main(void) {\\n    struct RailwayTicket t1;\\n    t1.pnrNumber = 248910;\\n    t1.coachClass = \'A\';\\n    t1.fareAmount = 2450.50f;', hint: 'Initialize struct members with dot operator' },
        { id: 'b3', code: '    printf("IRCTC Confirmed E-Ticket:\\n");\\n    printf("PNR: %d\\n", t1.pnrNumber);\\n    printf("Class: %c Tier\\n", t1.coachClass);\\n    printf("Fare: Rs. %.2f\\n", t1.fareAmount);\\n    return 0;\\n}', hint: 'Display members and exit' }
      ],
      correctOrder: ['b1', 'b2', 'b3']
    },
    expectedOutput: `IRCTC Confirmed E-Ticket:
PNR: 248910
Class: A Tier
Fare: Rs. 2450.50`,
    cKeywordsUsed: ['struct', 'int', 'char', 'float', 'return'],
    daaComplexity: {
      timeComplexity: 'O(1) member access',
      spaceComplexity: 'O(1) aggregate stack record',
      algorithmClass: 'Compound Heterogeneous Data Modeling'
    }
  },
  {
    id: 108,
    slug: 'level-108-pointer-to-struct-arrow-operator',
    tier: 'tier-4-lowlevel',
    tierLabel: 'Tier 4: Pointers, Memory Allocation & Low-Level Hardware (91-120)',
    title: 'Mission 108: Pointer to Struct & The Arrow Operator (->)',
    category: 'Structures & Compound Types',
    themeIcon: '🏹',
    realLifeAnalogy: {
      story: 'A hospital ICU patient monitoring clipboard: The doctor holds a pointer to the patient record `ptrPatient`. Instead of clumsy syntax `(*ptrPatient).heartRate`, C gives the elegant arrow operator: `ptrPatient->heartRate`.',
      physicalConcept: 'The arrow operator `p->member` is shorthand for `(*p).member`. It dereferences the struct pointer and computes member offset in one step.',
      ruleOfThumb: 'Use dot (`.`) when you hold a struct variable directly; use arrow (`->`) when you hold a pointer to a struct.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Arrow operator field access and modification',
        description: 'Updates and reads struct fields through a pointer.',
        code: `#include <stdio.h>

struct PatientRecord {
    int patientID;
    int heartRate;
    float bodyTemp;
};

int main(void) {
    struct PatientRecord p1 = {101, 72, 98.4f};
    struct PatientRecord *ptr = &p1;

    printf("Apollo Hospital ICU Monitor:\\n");
    printf("Patient ID: %d\\n", ptr->patientID);
    printf("Heart Rate: %d bpm\\n", ptr->heartRate);
    printf("Temperature: %.1f F\\n", ptr->bodyTemp);

    // Update through pointer arrow operator!
    ptr->heartRate = 78;
    printf("Updated Heart Rate via ptr->heartRate: %d bpm\\n", p1.heartRate);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Direct offset dereference',
        description: 'Demonstrates member offset address computation.',
        code: `#include <stdio.h>

struct PatientRecord { int id; int bpm; float temp; };

int main(void) {
    struct PatientRecord p = {101, 72, 98.4f};
    struct PatientRecord *ptr = &p;
    ptr->bpm = 78;
    printf("Apollo Hospital ICU Monitor:\\nPatient ID: %d\\nHeart Rate: %d bpm\\nTemperature: %.1f F\\nUpdated Heart Rate via ptr->heartRate: 78 bpm\\n", ptr->id, 72, ptr->temp);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['RAX struct base pointer', 'MOV [rax + offset], value'],
      assemblyNotes: 'ptr->heartRate translates directly to `mov edx, [rax + 4]`.',
      ramFootprint: '12 bytes for struct on stack + 8 bytes for struct pointer.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>\\n\\nstruct PatientRecord { int patientID; int heartRate; float bodyTemp; };', hint: 'Define patient struct' },
        { id: 'b2', code: 'int main(void) {\\n    struct PatientRecord p1 = {101, 72, 98.4f};\\n    struct PatientRecord *ptr = &p1;', hint: 'Setup struct and pointer' },
        { id: 'b3', code: '    printf("Apollo Hospital ICU Monitor:\\n");\\n    printf("Patient ID: %d\\n", ptr->patientID);\\n    printf("Heart Rate: %d bpm\\n", ptr->heartRate);\\n    printf("Temperature: %.1f F\\n", ptr->bodyTemp);', hint: 'Read with arrow operator' },
        { id: 'b4', code: '    ptr->heartRate = 78;\\n    printf("Updated Heart Rate via ptr->heartRate: %d bpm\\n", p1.heartRate);\\n    return 0;\\n}', hint: 'Modify via arrow and exit' }
      ],
      correctOrder: ['b1', 'b2', 'b3', 'b4']
    },
    expectedOutput: `Apollo Hospital ICU Monitor:
Patient ID: 101
Heart Rate: 72 bpm
Temperature: 98.4 F
Updated Heart Rate via ptr->heartRate: 78 bpm`,
    cKeywordsUsed: ['struct', 'int', 'float', 'return'],
    daaComplexity: {
      timeComplexity: 'O(1) single base+offset instruction',
      spaceComplexity: 'O(1) pointer indirection',
      algorithmClass: 'Base + Offset Pointer Dereference'
    }
  },
  {
    id: 109,
    slug: 'level-109-typedef-struct-clean-types',
    tier: 'tier-4-lowlevel',
    tierLabel: 'Tier 4: Pointers, Memory Allocation & Low-Level Hardware (91-120)',
    title: 'Mission 109: Typedef Struct & SBI Clean Custom Types',
    category: 'Structures & Compound Types',
    themeIcon: '🏷️',
    realLifeAnalogy: {
      story: 'Writing `struct StateBankCustomerAccount` everywhere is long, repetitive, and clutters code. With `typedef`, we define a clean custom type name `Account` that behaves just like native `int` or `float`!',
      physicalConcept: '`typedef` introduces an alias name for a type in the compiler symbol table. It creates no new data type and has zero runtime overhead.',
      ruleOfThumb: 'Combine `typedef` and `struct` in a single declaration: `typedef struct { ... } TypeName;`.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Combined typedef struct definition',
        description: 'Creates Account type and declares instances without struct keyword.',
        code: `#include <stdio.h>

typedef struct {
    long long accountNumber;
    char accountHolder[30];
    double balanceINR;
} Account;

int main(void) {
    Account acc1 = {
        987654321012LL,
        "Deepak Verma",
        125000.75
    };

    printf("State Bank of India Account Summary:\\n");
    printf("Account No: %lld\\n", acc1.accountNumber);
    printf("Holder:     %s\\n", acc1.accountHolder);
    printf("Balance:    Rs. %.2f\\n", acc1.balanceINR);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Opaque type definition',
        description: 'Idiomatic C type alias pattern.',
        code: `#include <stdio.h>

typedef struct {
    long long accNo;
    char name[30];
    double bal;
} Account;

int main(void) {
    Account a = {987654321012LL, "Deepak Verma", 125000.75};
    printf("State Bank of India Account Summary:\\nAccount No: %lld\\nHolder:     %s\\nBalance:    Rs. %.2f\\n", a.accNo, a.name, a.bal);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['RBP stack offsets', 'Symbol table type alias in compiler'],
      assemblyNotes: 'The compiler symbol table replaces Account with the underlying struct layout; zero runtime performance penalty.',
      ramFootprint: '48 bytes (8 bytes long long + 30 bytes string + 2 padding + 8 bytes double).'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>\\n\\ntypedef struct {\\n    long long accountNumber;\\n    char accountHolder[30];\\n    double balanceINR;\\n} Account;', hint: 'Define typedef struct Account' },
        { id: 'b2', code: 'int main(void) {\\n    Account acc1 = {\\n        987654321012LL,\\n        "Deepak Verma",\\n        125000.75\\n    };', hint: 'Initialize Account variable cleanly' },
        { id: 'b3', code: '    printf("State Bank of India Account Summary:\\n");\\n    printf("Account No: %lld\\n", acc1.accountNumber);\\n    printf("Holder:     %s\\n", acc1.accountHolder);\\n    printf("Balance:    Rs. %.2f\\n", acc1.balanceINR);\\n    return 0;\\n}', hint: 'Print details and return' }
      ],
      correctOrder: ['b1', 'b2', 'b3']
    },
    expectedOutput: `State Bank of India Account Summary:
Account No: 987654321012
Holder:     Deepak Verma
Balance:    Rs. 125000.75`,
    cKeywordsUsed: ['typedef', 'struct', 'long', 'char', 'double', 'return'],
    daaComplexity: {
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1) composite stack frame',
      algorithmClass: 'Compile-Time Type Alias Abstraction'
    }
  },
  {
    id: 110,
    slug: 'level-110-array-of-structs',
    tier: 'tier-4-lowlevel',
    tierLabel: 'Tier 4: Pointers, Memory Allocation & Low-Level Hardware (91-120)',
    title: 'Mission 110: Array of Structs & Bank Customer Database Registry',
    category: 'Structures & Compound Types',
    themeIcon: '🏢',
    realLifeAnalogy: {
      story: 'A bank branch has an in-memory database of 3 customers. Each customer record contains an ID, Name, and Balance. Combining an array with structs creates a relational database table stored directly in memory!',
      physicalConcept: 'An array of structs lays out struct records contiguously in RAM: record 0 immediately followed by record 1, followed by record 2.',
      ruleOfThumb: 'Calculate total memory size as `num_elements * sizeof(StructType)`.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Array of customer structs iteration',
        description: 'Iterates through array of 3 customer records.',
        code: `#include <stdio.h>

typedef struct {
    int customerID;
    char branch[10];
    int balanceINR;
} Customer;

int main(void) {
    Customer database[3] = {
        {101, "Delhi", 45000},
        {102, "Mumbai", 72000},
        {103, "Bengaluru", 91000}
    };

    printf("HDFC Bank Customer Registry:\\n");
    int totalDeposits = 0;
    for (int i = 0; i < 3; i++) {
        printf("ID: %d | Branch: %-10s | Balance: Rs. %d\\n", 
               database[i].customerID, database[i].branch, database[i].balanceINR);
        totalDeposits += database[i].balanceINR;
    }
    printf("Total Branch Deposits: Rs. %d\\n", totalDeposits);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Pointer stride over array of structs',
        description: 'Uses pointer stride sizeof(Customer) across records.',
        code: `#include <stdio.h>

typedef struct { int id; char branch[10]; int bal; } Customer;

int main(void) {
    Customer db[3] = {{101, "Delhi", 45000}, {102, "Mumbai", 72000}, {103, "Bengaluru", 91000}};
    int tot = db[0].bal + db[1].bal + db[2].bal;
    printf("HDFC Bank Customer Registry:\\n");
    for (int i = 0; i < 3; i++) printf("ID: %d | Branch: %-10s | Balance: Rs. %d\\n", db[i].id, db[i].branch, db[i].bal);
    printf("Total Branch Deposits: Rs. %d\\n", tot);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['RCX index', 'RAX base', 'IMUL index by sizeof(Customer)'],
      assemblyNotes: 'Array element address computed as: base + i * sizeof(Customer).',
      ramFootprint: '3 elements * 20 bytes = 60 contiguous bytes on stack.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>\\n\\ntypedef struct {\\n    int customerID;\\n    char branch[10];\\n    int balanceINR;\\n} Customer;', hint: 'Customer struct typedef' },
        { id: 'b2', code: 'int main(void) {\\n    Customer database[3] = {\\n        {101, "Delhi", 45000},\\n        {102, "Mumbai", 72000},\\n        {103, "Bengaluru", 91000}\\n    };\\n    int totalDeposits = 0;', hint: 'Declare array of 3 records' },
        { id: 'b3', code: '    printf("HDFC Bank Customer Registry:\\n");\\n    for (int i = 0; i < 3; i++) {\\n        printf("ID: %d | Branch: %-10s | Balance: Rs. %d\\n", database[i].customerID, database[i].branch, database[i].balanceINR);\\n        totalDeposits += database[i].balanceINR;\\n    }', hint: 'Loop and print database records' },
        { id: 'b4', code: '    printf("Total Branch Deposits: Rs. %d\\n", totalDeposits);\\n    return 0;\\n}', hint: 'Print total and exit' }
      ],
      correctOrder: ['b1', 'b2', 'b3', 'b4']
    },
    expectedOutput: `HDFC Bank Customer Registry:
ID: 101 | Branch: Delhi      | Balance: Rs. 45000
ID: 102 | Branch: Mumbai     | Balance: Rs. 72000
ID: 103 | Branch: Bengaluru  | Balance: Rs. 91000
Total Branch Deposits: Rs. 208000`,
    cKeywordsUsed: ['typedef', 'struct', 'int', 'char', 'for', 'return'],
    daaComplexity: {
      timeComplexity: 'O(N) sequential iteration',
      spaceComplexity: 'O(N) contiguous record memory',
      algorithmClass: 'In-Memory Relational Table Scan'
    }
  },
  {
    id: 111,
    slug: 'level-111-struct-memory-alignment-padding',
    tier: 'tier-4-lowlevel',
    tierLabel: 'Tier 4: Pointers, Memory Allocation & Low-Level Hardware (91-120)',
    title: 'Mission 111: Struct Memory Alignment, Padding & Hardware Word Boundary',
    category: 'Structures & Compound Types',
    themeIcon: '🧱',
    realLifeAnalogy: {
      story: 'Loading boxes onto a pallet: A modern 64-bit CPU reads memory in 4-byte or 8-byte word chunks. If you store 1 char (1 byte) followed by 1 int (4 bytes), the CPU inserts 3 empty "padding bytes" so the int starts on an address divisible by 4!',
      physicalConcept: 'Natural Alignment: A data type of size K bytes must reside at a memory address that is a multiple of K. Otherwise, unaligned memory access requires multiple CPU bus cycles.',
      ruleOfThumb: 'Order struct members from largest to smallest (e.g. doubles first, then ints, then chars) to minimize wasted padding bytes!'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Inspecting struct padding and sizeof',
        description: 'Shows that 1 char + 1 int + 1 char = 12 bytes instead of 6 bytes.',
        code: `#include <stdio.h>

struct PaddedSample {
    char a;     // 1 byte + 3 padding bytes!
    int b;      // 4 bytes
    char c;     // 1 byte + 3 padding bytes!
};

int main(void) {
    printf("--- HARDWARE STRUCT ALIGNMENT DISSECTION ---\\n");
    printf("sizeof(char): %zu byte\\n", sizeof(char));
    printf("sizeof(int):  %zu bytes\\n", sizeof(int));
    printf("Sum of individual members: 1 + 4 + 1 = 6 bytes\\n");
    printf("ACTUAL sizeof(struct PaddedSample): %zu bytes! (6 bytes padded to 12)\\n", 
           sizeof(struct PaddedSample));
    return 0;
}`
      },
      optimizedPro: {
        name: 'Reordered struct for zero wasted padding',
        description: 'Reorders members (int, char, char) shrinking size from 12 to 8 bytes.',
        code: `#include <stdio.h>

struct OptimizedSample {
    int b;      // 4 bytes
    char a;     // 1 byte
    char c;     // 1 byte + 2 padding bytes = 8 bytes total
};

int main(void) {
    printf("Optimized struct size: %zu bytes (saved 4 bytes!)\\n", sizeof(struct OptimizedSample));
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['Aligned memory fetch operands'],
      assemblyNotes: 'The compiler automatically inserts nop bytes or padding offsets in the struct memory layout table.',
      ramFootprint: '12 bytes on stack for PaddedSample.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>\\n\\nstruct PaddedSample {\\n    char a;\\n    int b;\\n    char c;\\n};', hint: 'Define padded struct' },
        { id: 'b2', code: 'int main(void) {\\n    printf("--- HARDWARE STRUCT ALIGNMENT DISSECTION ---\\n");\\n    printf("sizeof(char): %zu byte\\n", sizeof(char));\\n    printf("sizeof(int):  %zu bytes\\n", sizeof(int));', hint: 'Print primitive sizes' },
        { id: 'b3', code: '    printf("Sum of individual members: 1 + 4 + 1 = 6 bytes\\n");\\n    printf("ACTUAL sizeof(struct PaddedSample): %zu bytes! (6 bytes padded to 12)\\n", sizeof(struct PaddedSample));\\n    return 0;\\n}', hint: 'Print actual padded struct size' }
      ],
      correctOrder: ['b1', 'b2', 'b3']
    },
    expectedOutput: `--- HARDWARE STRUCT ALIGNMENT DISSECTION ---
sizeof(char): 1 byte
sizeof(int):  4 bytes
Sum of individual members: 1 + 4 + 1 = 6 bytes
ACTUAL sizeof(struct PaddedSample): 12 bytes! (6 bytes padded to 12)`,
    cKeywordsUsed: ['struct', 'char', 'int', 'sizeof', 'return'],
    daaComplexity: {
      timeComplexity: 'O(1) aligned single-cycle bus access',
      spaceComplexity: 'Padded structure footprint',
      algorithmClass: 'Hardware Word Alignment & Padding Optimization'
    }
  },
  {
    id: 112,
    slug: 'level-112-passing-structs-value-vs-pointer',
    tier: 'tier-4-lowlevel',
    tierLabel: 'Tier 4: Pointers, Memory Allocation & Low-Level Hardware (91-120)',
    title: 'Mission 112: Passing Structs to Functions: Value vs Pointer',
    category: 'Structures & Compound Types',
    themeIcon: '⚡',
    realLifeAnalogy: {
      story: 'Photocopying an entire encyclopedia vs sending a web link: Passing a massive struct by value forces the CPU to copy every single byte onto the stack. Passing by pointer (`const Struct*`) sends just an 8-byte address in a single CPU register!',
      physicalConcept: 'Passing by value executes a `memcpy` copy loop for large structs. Passing by pointer passes the memory address in a CPU register (RDI) in $O(1)$ time.',
      ruleOfThumb: 'Always pass structs by pointer (using `const Struct *p` for read-only access) for maximum speed and zero memory waste.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Comparing struct pass by value vs pointer',
        description: 'Demonstrates both methods and shows pointer efficiency.',
        code: `#include <stdio.h>

typedef struct {
    int sensorID;
    char name[32];
    double readings[10];
} TelemetryPacket;

void printByPointer(const TelemetryPacket *p) {
    printf("[Fast Pass-by-Pointer] Sensor: %s (ID: %d)\\n", p->name, p->sensorID);
}

int main(void) {
    TelemetryPacket pkt = {701, "Chandrayaan Lander", {0}};
    printf("Telemetry Packet Total Size: %zu bytes\\n", sizeof(TelemetryPacket));
    printf("Pointer Address Size:        %zu bytes (Single CPU register!)\\n", sizeof(TelemetryPacket*));

    printByPointer(&pkt);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Zero-overhead const pointer pass',
        description: 'Passes address in RDI register.',
        code: `#include <stdio.h>

typedef struct { int id; char name[32]; double r[10]; } TelemetryPacket;
void show(const TelemetryPacket *p) { printf("[Fast Pass-by-Pointer] Sensor: %s (ID: %d)\\n", p->name, p->id); }

int main(void) {
    TelemetryPacket p = {701, "Chandrayaan Lander", {0}};
    printf("Telemetry Packet Total Size: %zu bytes\\nPointer Address Size:        %zu bytes (Single CPU register!)\\n", sizeof(p), sizeof(&p));
    show(&p);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['RDI passed pointer (8 bytes)', 'Zero stack memcpy duplication'],
      assemblyNotes: 'lea rdi, [rbp-120]; call printByPointer; Pass-by-pointer copies only 8 bytes.',
      ramFootprint: '120 bytes for struct on stack + 8 bytes pointer.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>\\n\\ntypedef struct {\\n    int sensorID;\\n    char name[32];\\n    double readings[10];\\n} TelemetryPacket;', hint: 'Define large telemetry struct' },
        { id: 'b2', code: 'void printByPointer(const TelemetryPacket *p) {\\n    printf("[Fast Pass-by-Pointer] Sensor: %s (ID: %d)\\n", p->name, p->sensorID);\\n}', hint: 'Define pointer function' },
        { id: 'b3', code: 'int main(void) {\\n    TelemetryPacket pkt = {701, "Chandrayaan Lander", {0}};\\n    printf("Telemetry Packet Total Size: %zu bytes\\n", sizeof(TelemetryPacket));\\n    printf("Pointer Address Size:        %zu bytes (Single CPU register!)\\n", sizeof(TelemetryPacket*));', hint: 'Compare sizes' },
        { id: 'b4', code: '    printByPointer(&pkt);\\n    return 0;\\n}', hint: 'Invoke function and return' }
      ],
      correctOrder: ['b1', 'b2', 'b3', 'b4']
    },
    expectedOutput: `Telemetry Packet Total Size: 120 bytes
Pointer Address Size:        8 bytes (Single CPU register!)
[Fast Pass-by-Pointer] Sensor: Chandrayaan Lander (ID: 701)`,
    cKeywordsUsed: ['typedef', 'struct', 'const', 'sizeof', 'void', 'return'],
    daaComplexity: {
      timeComplexity: 'O(1) pointer register pass vs O(K) value copy',
      spaceComplexity: '8 bytes register vs K bytes duplicated stack',
      algorithmClass: 'Pass-by-Const-Pointer Optimization'
    }
  },
  {
    id: 113,
    slug: 'level-113-nested-structs-composition',
    tier: 'tier-4-lowlevel',
    tierLabel: 'Tier 4: Pointers, Memory Allocation & Low-Level Hardware (91-120)',
    title: 'Mission 113: Nested Structs & Aadhaar KYC Profile Composition',
    category: 'Structures & Compound Types',
    themeIcon: '🪪',
    realLifeAnalogy: {
      story: 'An Aadhaar biometric profile has a Date of Birth (Day, Month, Year) and an Address (Pincode, State) nested inside the main Citizen profile record. Struct nesting allows building rich real-world data models.',
      physicalConcept: 'Inner structs are embedded inline contiguously inside the outer struct memory footprint without separate pointers.',
      ruleOfThumb: 'Access nested members using chained dot notation: `citizen.dob.year` or `pCitizen->dob.year`.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Nested struct declaration and member chaining',
        description: 'Embeds Date and Address structs inside CitizenProfile.',
        code: `#include <stdio.h>

struct DateOfBirth {
    int day;
    int month;
    int year;
};

struct CitizenKYC {
    long long aadhaarID;
    char fullName[25];
    struct DateOfBirth dob; // Nested struct!
};

int main(void) {
    struct CitizenKYC citizen = {
        987654321099LL,
        "Ananya Sharma",
        {15, 8, 2002}
    };

    printf("UIDAI Aadhaar Verification Registry:\\n");
    printf("Aadhaar: %lld\\n", citizen.aadhaarID);
    printf("Name:    %s\\n", citizen.fullName);
    printf("DOB:     %02d/%02d/%04d\\n", 
           citizen.dob.day, citizen.dob.month, citizen.dob.year);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Composite layout inspection',
        description: 'Accesses nested structure memory layout.',
        code: `#include <stdio.h>

struct DOB { int d, m, y; };
struct Citizen { long long id; char name[25]; struct DOB dob; };

int main(void) {
    struct Citizen c = {987654321099LL, "Ananya Sharma", {15, 8, 2002}};
    printf("UIDAI Aadhaar Verification Registry:\\nAadhaar: %lld\\nName:    %s\\nDOB:     %02d/%02d/%04d\\n", c.id, c.name, c.dob.d, c.dob.m, c.dob.y);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['RBP offset indexing'],
      assemblyNotes: 'The nested struct dob occupies contiguous bytes at offset +36 inside citizen stack allocation.',
      ramFootprint: '48 bytes total on stack.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>\\n\\nstruct DateOfBirth { int day; int month; int year; };\\n\\nstruct CitizenKYC { long long aadhaarID; char fullName[25]; struct DateOfBirth dob; };', hint: 'Define outer and nested struct' },
        { id: 'b2', code: 'int main(void) {\\n    struct CitizenKYC citizen = { 987654321099LL, "Ananya Sharma", {15, 8, 2002} };', hint: 'Initialize with nested braces' },
        { id: 'b3', code: '    printf("UIDAI Aadhaar Verification Registry:\\n");\\n    printf("Aadhaar: %lld\\n", citizen.aadhaarID);\\n    printf("Name:    %s\\n", citizen.fullName);\\n    printf("DOB:     %02d/%02d/%04d\\n", citizen.dob.day, citizen.dob.month, citizen.dob.year);\\n    return 0;\\n}', hint: 'Access via chained dot notation' }
      ],
      correctOrder: ['b1', 'b2', 'b3']
    },
    expectedOutput: `UIDAI Aadhaar Verification Registry:
Aadhaar: 987654321099
Name:    Ananya Sharma
DOB:     15/08/2002`,
    cKeywordsUsed: ['struct', 'int', 'long', 'char', 'return'],
    daaComplexity: {
      timeComplexity: 'O(1) direct member access',
      spaceComplexity: 'Contiguous inline composition',
      algorithmClass: 'Hierarchical Record Composition'
    }
  },
  {
    id: 114,
    slug: 'level-114-unions-shared-memory',
    tier: 'tier-4-lowlevel',
    tierLabel: 'Tier 4: Pointers, Memory Allocation & Low-Level Hardware (91-120)',
    title: 'Mission 114: Unions & Hardware Register Shared Memory Footprint',
    category: 'Structures & Compound Types',
    themeIcon: '🎭',
    realLifeAnalogy: {
      story: 'A single hotel room rented to different guests at different times: A union allows storing different data types in the SAME physical memory location. While a struct sums the size of all its members, a union\'s size is only the size of its single largest member!',
      physicalConcept: 'All members of a `union` share the exact same base memory address. Writing to one member overwrites the bytes of the other members.',
      ruleOfThumb: 'Use a `union` when you need to represent a value that can be one of several types, but only one type at any given instant.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Union shared address demonstration',
        description: 'Shows that int and float share identical address in union.',
        code: `#include <stdio.h>

union HardwareRegister {
    int intVal;
    float floatVal;
};

int main(void) {
    union HardwareRegister reg;

    printf("sizeof(union HardwareRegister): %zu bytes\\n", sizeof(union HardwareRegister));
    printf("Address of reg.intVal:   %p\\n", (void*)&reg.intVal);
    printf("Address of reg.floatVal: %p (Identical memory!)\\n", (void*)&reg.floatVal);

    reg.intVal = 1000;
    printf("Wrote intVal = 1000 -> Read intVal: %d\\n", reg.intVal);

    reg.floatVal = 3.14f;
    printf("Wrote floatVal = 3.14 -> Read floatVal: %.2f\\n", reg.floatVal);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Type punning with union',
        description: 'Examines raw IEEE-754 bit representation via union.',
        code: `#include <stdio.h>

union FloatInt { float f; int i; };

int main(void) {
    union FloatInt u;
    u.f = 1.0f;
    printf("Float 1.0f raw IEEE-754 hex integer: 0x%X\\n", u.i);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['EAX 32-bit register shared across integer and floating views'],
      assemblyNotes: 'The compiler assigns member offset 0 to all union members: mov [rbp-4], eax.',
      ramFootprint: '4 bytes total on stack (shared by int and float).'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>\\n\\nunion HardwareRegister { int intVal; float floatVal; };', hint: 'Define union' },
        { id: 'b2', code: 'int main(void) {\\n    union HardwareRegister reg;\\n    printf("sizeof(union HardwareRegister): %zu bytes\\n", sizeof(union HardwareRegister));\\n    printf("Address of reg.intVal:   %p\\n", (void*)&reg.intVal);\\n    printf("Address of reg.floatVal: %p (Identical memory!)\\n", (void*)&reg.floatVal);', hint: 'Verify shared address' },
        { id: 'b3', code: '    reg.intVal = 1000;\\n    printf("Wrote intVal = 1000 -> Read intVal: %d\\n", reg.intVal);\\n    reg.floatVal = 3.14f;\\n    printf("Wrote floatVal = 3.14 -> Read floatVal: %.2f\\n", reg.floatVal);\\n    return 0;\\n}', hint: 'Write members and return' }
      ],
      correctOrder: ['b1', 'b2', 'b3']
    },
    expectedOutput: `sizeof(union HardwareRegister): 4 bytes
Address of reg.intVal:   0x
Address of reg.floatVal: 0x (Identical memory!)
Wrote intVal = 1000 -> Read intVal: 1000
Wrote floatVal = 3.14 -> Read floatVal: 3.14`,
    cKeywordsUsed: ['union', 'int', 'float', 'sizeof', 'void', 'return'],
    daaComplexity: {
      timeComplexity: 'O(1) memory reuse',
      spaceComplexity: 'Max(sizeof(member_i)) bytes',
      algorithmClass: 'Overlapping Storage Allocation'
    }
  },
  {
    id: 115,
    slug: 'level-115-endianness-detection-union',
    tier: 'tier-4-lowlevel',
    tierLabel: 'Tier 4: Pointers, Memory Allocation & Low-Level Hardware (91-120)',
    title: 'Mission 115: CPU Endianness Detection: Little-Endian vs Big-Endian',
    category: 'Structures & Compound Types',
    themeIcon: '🧭',
    realLifeAnalogy: {
      story: 'Writing dates: In India/UK we write Day/Month/Year (Little Endian - least significant first). In other systems they write Year/Month/Day (Big Endian - most significant first). Microprocessors store multibyte numbers the same way!',
      physicalConcept: 'Little-Endian (x86/ARM default): least significant byte is stored at lowest memory address. Big-Endian (Network Byte Order): most significant byte is stored first.',
      ruleOfThumb: 'Inspect byte 0 of integer `0x00000001`. If byte 0 is `1`, the architecture is Little-Endian.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Union-based hardware endianness detector',
        description: 'Detects CPU byte storage order using union.',
        code: `#include <stdio.h>

union EndianDetector {
    int fullNumber;
    char firstByte;
};

int main(void) {
    union EndianDetector tester;
    tester.fullNumber = 1; // 0x00000001

    printf("--- HARDWARE SILICON ENDIANNESS TEST ---\\n");
    if (tester.firstByte == 1) {
        printf("Detected Architecture: LITTLE-ENDIAN (x86/AMD64/ARM)\\n");
        printf("Least Significant Byte (0x01) stored at lowest memory address!\\n");
    } else {
        printf("Detected Architecture: BIG-ENDIAN (Network Order / IBM Mainframe)\\n");
    }
    return 0;
}`
      },
      optimizedPro: {
        name: 'Char pointer endianness test',
        description: 'Single-line pointer cast test: `*(char*)&val`.',
        code: `#include <stdio.h>

int main(void) {
    int n = 1;
    printf("--- HARDWARE SILICON ENDIANNESS TEST ---\\n");
    if (*(char*)&n == 1) printf("Detected Architecture: LITTLE-ENDIAN (x86/AMD64/ARM)\\nLeast Significant Byte (0x01) stored at lowest memory address!\\n");
    else printf("Detected Architecture: BIG-ENDIAN (Network Order / IBM Mainframe)\\n");
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['AL lowest byte', 'CMP AL, 1'],
      assemblyNotes: 'Little-endian x86 processors store 0x01 at [rbp-4], 0x00 at [rbp-3], etc.',
      ramFootprint: '4 bytes on stack.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>\\n\\nunion EndianDetector { int fullNumber; char firstByte; };', hint: 'Define union tester' },
        { id: 'b2', code: 'int main(void) {\\n    union EndianDetector tester;\\n    tester.fullNumber = 1;\\n    printf("--- HARDWARE SILICON ENDIANNESS TEST ---\\n");', hint: 'Initialize to 1' },
        { id: 'b3', code: '    if (tester.firstByte == 1) {\\n        printf("Detected Architecture: LITTLE-ENDIAN (x86/AMD64/ARM)\\n");\\n        printf("Least Significant Byte (0x01) stored at lowest memory address!\\n");\\n    } else {\\n        printf("Detected Architecture: BIG-ENDIAN (Network Order / IBM Mainframe)\\n");\\n    }\\n    return 0;\\n}', hint: 'Check byte 0 and print result' }
      ],
      correctOrder: ['b1', 'b2', 'b3']
    },
    expectedOutput: `--- HARDWARE SILICON ENDIANNESS TEST ---
Detected Architecture: LITTLE-ENDIAN (x86/AMD64/ARM)
Least Significant Byte (0x01) stored at lowest memory address!`,
    cKeywordsUsed: ['union', 'int', 'char', 'if', 'else', 'return'],
    daaComplexity: {
      timeComplexity: 'O(1) single byte load',
      spaceComplexity: 'O(1)',
      algorithmClass: 'Hardware Microarchitecture Inspection'
    }
  },
  {
    id: 116,
    slug: 'level-116-enum-named-state-machine',
    tier: 'tier-4-lowlevel',
    tierLabel: 'Tier 4: Pointers, Memory Allocation & Low-Level Hardware (91-120)',
    title: 'Mission 116: Enum State Machine & Railway Signal Controller',
    category: 'Structures & Compound Types',
    themeIcon: '🚥',
    realLifeAnalogy: {
      story: 'Indian Railways signal lights on train tracks: Signals cycle between RED (Danger Stop), YELLOW (Caution 30 km/h), and GREEN (Proceed Full Speed). Using raw magic numbers 0, 1, 2 is bug-prone; an `enum` gives them clear named identifiers.',
      physicalConcept: 'An `enum` defines a set of named integer constants. By default, values start at 0 and increment by 1.',
      ruleOfThumb: 'Use enums instead of raw numbers or `#define` constants for finite state machines and switch-case statements.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Enum state machine with switch-case',
        description: 'Implements railway signal controller using enum.',
        code: `#include <stdio.h>

typedef enum {
    SIGNAL_RED = 0,
    SIGNAL_YELLOW = 1,
    SIGNAL_GREEN = 2
} RailwaySignal;

void displaySignalState(RailwaySignal s) {
    switch (s) {
        case SIGNAL_RED:
            printf("SIGNAL [RED]: Danger! Train must STOP.\\n");
            break;
        case SIGNAL_YELLOW:
            printf("SIGNAL [YELLOW]: Caution! Proceed at 30 km/h.\\n");
            break;
        case SIGNAL_GREEN:
            printf("SIGNAL [GREEN]: Clear track! Proceed at full speed.\\n");
            break;
    }
}

int main(void) {
    RailwaySignal track1 = SIGNAL_RED;
    RailwaySignal track2 = SIGNAL_GREEN;

    printf("Indian Railways Northern Zone Signal Log:\\n");
    displaySignalState(track1);
    displaySignalState(track2);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Array lookup string table for enum',
        description: 'Maps enum directly to string array without branch jumps.',
        code: `#include <stdio.h>

typedef enum { SIGNAL_RED, SIGNAL_YELLOW, SIGNAL_GREEN } RailwaySignal;
const char* const SIG_MSG[] = {
    "SIGNAL [RED]: Danger! Train must STOP.",
    "SIGNAL [YELLOW]: Caution! Proceed at 30 km/h.",
    "SIGNAL [GREEN]: Clear track! Proceed at full speed."
};

int main(void) {
    printf("Indian Railways Northern Zone Signal Log:\\n%s\\n%s\\n", SIG_MSG[SIGNAL_RED], SIG_MSG[SIGNAL_GREEN]);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'text',
      cpuRegisters: ['EDI enum parameter (treated as 32-bit int)'],
      assemblyNotes: 'The compiler generates a hardware jump table (switch) based on integer enum values.',
      ramFootprint: '4 bytes for each enum variable.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>\\n\\ntypedef enum { SIGNAL_RED, SIGNAL_YELLOW, SIGNAL_GREEN } RailwaySignal;', hint: 'Define enum' },
        { id: 'b2', code: 'void displaySignalState(RailwaySignal s) {\\n    switch (s) {\\n        case SIGNAL_RED: printf("SIGNAL [RED]: Danger! Train must STOP.\\n"); break;\\n        case SIGNAL_YELLOW: printf("SIGNAL [YELLOW]: Caution! Proceed at 30 km/h.\\n"); break;\\n        case SIGNAL_GREEN: printf("SIGNAL [GREEN]: Clear track! Proceed at full speed.\\n"); break;\\n    }\\n}', hint: 'Switch function' },
        { id: 'b3', code: 'int main(void) {\\n    RailwaySignal track1 = SIGNAL_RED;\\n    RailwaySignal track2 = SIGNAL_GREEN;\\n    printf("Indian Railways Northern Zone Signal Log:\\n");\\n    displaySignalState(track1);\\n    displaySignalState(track2);\\n    return 0;\\n}', hint: 'Call function and return' }
      ],
      correctOrder: ['b1', 'b2', 'b3']
    },
    expectedOutput: `Indian Railways Northern Zone Signal Log:
SIGNAL [RED]: Danger! Train must STOP.
SIGNAL [GREEN]: Clear track! Proceed at full speed.`,
    cKeywordsUsed: ['typedef', 'enum', 'void', 'switch', 'case', 'break', 'return'],
    daaComplexity: {
      timeComplexity: 'O(1) jump table',
      spaceComplexity: 'O(1)',
      algorithmClass: 'Discrete Enumeration State Machine'
    }
  },
  {
    id: 117,
    slug: 'level-117-function-pointers-code-addresses',
    tier: 'tier-4-lowlevel',
    tierLabel: 'Tier 4: Pointers, Memory Allocation & Low-Level Hardware (91-120)',
    title: 'Mission 117: Function Pointers: Storing Machine Code Entry Points',
    category: 'Function Pointers & Callbacks',
    themeIcon: '🎯',
    realLifeAnalogy: {
      story: 'A programmable TV remote control: The "Red Button" can be assigned to launch YouTube, Netflix, or Hotstar. A Function Pointer stores the memory address of executable code in the `.text` segment so you can change which function runs dynamically!',
      physicalConcept: 'In C, functions reside at fixed addresses in the `.text` code segment. A function pointer stores this entry point and executes a hardware `call [rax]` instruction.',
      ruleOfThumb: 'Syntax: `return_type (*pointer_name)(param_types);`. Always place parentheses around `(*fp)`!'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Pluggable arithmetic function pointer',
        description: 'Switches between add and multiply using a function pointer.',
        code: `#include <stdio.h>

int addGST(int price, int tax) {
    return price + tax;
}

int applyDiscount(int price, int discount) {
    return price - discount;
}

int main(void) {
    // Function pointer declaration
    int (*operation)(int, int);

    int basePrice = 1000;
    int modifier = 180;

    // Point to addGST
    operation = &addGST;
    printf("Price with GST (addGST): Rs. %d\\n", operation(basePrice, modifier));

    // Point to applyDiscount
    operation = &applyDiscount;
    printf("Price with Discount (applyDiscount): Rs. %d\\n", operation(basePrice, modifier));
    return 0;
}`
      },
      optimizedPro: {
        name: 'Typedef function pointer alias',
        description: 'Uses typedef for clean function pointer types.',
        code: `#include <stdio.h>

typedef int (*BinaryOp)(int, int);
int add(int a, int b) { return a + b; }
int sub(int a, int b) { return a - b; }

int main(void) {
    BinaryOp op = add;
    printf("Price with GST (addGST): Rs. %d\\n", op(1000, 180));
    op = sub;
    printf("Price with Discount (applyDiscount): Rs. %d\\n", op(1000, 180));
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'text',
      cpuRegisters: ['RAX function address', 'CALL RAX indirect jump'],
      assemblyNotes: 'call rax - Indirect function call using address in 64-bit register.',
      ramFootprint: '8 bytes for function pointer variable.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>\\n\\nint addGST(int price, int tax) { return price + tax; }\\nint applyDiscount(int price, int discount) { return price - discount; }', hint: 'Define math functions' },
        { id: 'b2', code: 'int main(void) {\\n    int (*operation)(int, int);\\n    int basePrice = 1000, modifier = 180;', hint: 'Declare function pointer and variables' },
        { id: 'b3', code: '    operation = &addGST;\\n    printf("Price with GST (addGST): Rs. %d\\n", operation(basePrice, modifier));\\n    operation = &applyDiscount;\\n    printf("Price with Discount (applyDiscount): Rs. %d\\n", operation(basePrice, modifier));\\n    return 0;\\n}', hint: 'Switch function pointer target and print' }
      ],
      correctOrder: ['b1', 'b2', 'b3']
    },
    expectedOutput: `Price with GST (addGST): Rs. 1180
Price with Discount (applyDiscount): Rs. 820`,
    cKeywordsUsed: ['int', 'return'],
    daaComplexity: {
      timeComplexity: 'O(1) indirect call',
      spaceComplexity: '8 bytes code pointer',
      algorithmClass: 'Indirect Execution / Dynamic Dispatch'
    }
  },
  {
    id: 118,
    slug: 'level-118-callback-functions-event-driven',
    tier: 'tier-4-lowlevel',
    tierLabel: 'Tier 4: Pointers, Memory Allocation & Low-Level Hardware (91-120)',
    title: 'Mission 118: Callback Functions & UPI Payment Notification Webhook',
    category: 'Function Pointers & Callbacks',
    themeIcon: '🔔',
    realLifeAnalogy: {
      story: 'A UPI payment gateway in Mumbai processes an online payment of Rs. 1,500. When the bank transaction completes, the gateway calls an event notification function (Callback Webhook) provided by Swiggy or Zomato to confirm the food order!',
      physicalConcept: 'A callback is a function passed as an argument to another function, enabling event-driven and asynchronous software architectures in pure C.',
      ruleOfThumb: 'Callbacks decouple backend processing engines from user notification logic.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Payment processing engine with callback hook',
        description: 'Passes confirmation callback into executePayment function.',
        code: `#include <stdio.h>

void onPaymentSuccess(int amount) {
    printf("[SMS Webhook Alert] Received Rs. %d via UPI! Order confirmed.\\n", amount);
}

void processUpiTransaction(int amount, void (*callback)(int)) {
    printf("Gateway connecting to NPCI... Processing Rs. %d\\n", amount);
    // Transaction succeeded: invoke callback!
    callback(amount);
}

int main(void) {
    int billAmount = 1500;
    processUpiTransaction(billAmount, onPaymentSuccess);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Typedef callback handler',
        description: 'Clean callback typedef architecture.',
        code: `#include <stdio.h>

typedef void (*NotifyHook)(int);
void alert(int amt) { printf("[SMS Webhook Alert] Received Rs. %d via UPI! Order confirmed.\\n", amt); }
void pay(int amt, NotifyHook hook) { printf("Gateway connecting to NPCI... Processing Rs. %d\\n", amt); hook(amt); }

int main(void) {
    pay(1500, alert);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'text',
      cpuRegisters: ['RDI payload', 'RSI function pointer', 'CALL RSI'],
      assemblyNotes: 'The address of onPaymentSuccess is passed in RSI and invoked via indirect call rsi.',
      ramFootprint: '16 bytes across activation frame.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>', hint: 'Header include' },
        { id: 'b2', code: 'void onPaymentSuccess(int amount) {\\n    printf("[SMS Webhook Alert] Received Rs. %d via UPI! Order confirmed.\\n", amount);\\n}', hint: 'Callback notification function' },
        { id: 'b3', code: 'void processUpiTransaction(int amount, void (*callback)(int)) {\\n    printf("Gateway connecting to NPCI... Processing Rs. %d\\n", amount);\\n    callback(amount);\\n}', hint: 'Process function accepting callback' },
        { id: 'b4', code: 'int main(void) {\\n    int billAmount = 1500;\\n    processUpiTransaction(billAmount, onPaymentSuccess);\\n    return 0;\\n}', hint: 'Execute and exit' }
      ],
      correctOrder: ['b1', 'b2', 'b3', 'b4']
    },
    expectedOutput: `Gateway connecting to NPCI... Processing Rs. 1500
[SMS Webhook Alert] Received Rs. 1500 via UPI! Order confirmed.`,
    cKeywordsUsed: ['void', 'int', 'return'],
    daaComplexity: {
      timeComplexity: 'O(1) invocation',
      spaceComplexity: 'O(1)',
      algorithmClass: 'Event-Driven Callback Architecture'
    }
  },
  {
    id: 119,
    slug: 'level-119-bitfields-hardware-registers',
    tier: 'tier-4-lowlevel',
    tierLabel: 'Tier 4: Pointers, Memory Allocation & Low-Level Hardware (91-120)',
    title: 'Mission 119: Bitfields inside Structs & Smart Electricity Meter Registers',
    category: 'Low-Level Hardware & Bitfields',
    themeIcon: '⚡',
    realLifeAnalogy: {
      story: 'A smart electricity meter installed by Tata Power in Mumbai communicates over cellular network. Every byte transmitted costs money. Instead of using 4 full bytes for boolean flags, a C `bitfield` packs 4 flags into a single 1-byte register!',
      physicalConcept: 'Bitfields specify the exact width in bits for struct members: `unsigned int flag : 1;`. The compiler generates bit-masking and shift instructions under the hood.',
      ruleOfThumb: 'Bitfields pack status flags tightly into hardware registers for embedded microcontrollers and network packet headers.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Packed bitfield status register',
        description: 'Packs powerStatus, tamperAlarm, and baudRate into 1 byte.',
        code: `#include <stdio.h>

struct SmartMeterRegister {
    unsigned int powerOn     : 1; // 1 bit (0 or 1)
    unsigned int tamperAlert : 1; // 1 bit (0 or 1)
    unsigned int tariffMode  : 2; // 2 bits (0 to 3)
    unsigned int reserved    : 4; // 4 bits padding
};

int main(void) {
    struct SmartMeterRegister reg;
    reg.powerOn = 1;
    reg.tamperAlert = 0;
    reg.tariffMode = 3; // Night peak rate
    reg.reserved = 0;

    printf("Smart Meter Register Dissection:\\n");
    printf("sizeof(struct SmartMeterRegister): %zu byte (Tightly packed!)\\n", 
           sizeof(struct SmartMeterRegister));
    printf("Power Status:  %u\\n", reg.powerOn);
    printf("Tamper Alert:  %u (Secure)\\n", reg.tamperAlert);
    printf("Tariff Mode:   %u (Night Peak)\\n", reg.tariffMode);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Raw byte cast bitfield inspection',
        description: 'Inspects raw byte value of packed bitfield.',
        code: `#include <stdio.h>

struct Reg { unsigned int on:1, alert:1, mode:2, res:4; };

int main(void) {
    struct Reg r = {1, 0, 3, 0};
    unsigned char raw = *(unsigned char*)&r;
    printf("Packed byte value: 0x%02X\\n", raw);
    printf("Power: %u | Alert: %u | Mode: %u\\n", r.on, r.alert, r.mode);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['AND / OR bitmasking instructions', 'SHR shift instructions'],
      assemblyNotes: 'Writing to tariffMode compiles to: and eax, ~12; or eax, 12; Bitmasking in hardware.',
      ramFootprint: '4 bytes (or 1 byte packed) on stack.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>\\n\\nstruct SmartMeterRegister {\\n    unsigned int powerOn     : 1;\\n    unsigned int tamperAlert : 1;\\n    unsigned int tariffMode  : 2;\\n    unsigned int reserved    : 4;\\n};', hint: 'Define bitfield struct' },
        { id: 'b2', code: 'int main(void) {\\n    struct SmartMeterRegister reg;\\n    reg.powerOn = 1;\\n    reg.tamperAlert = 0;\\n    reg.tariffMode = 3;\\n    reg.reserved = 0;', hint: 'Assign bit values' },
        { id: 'b3', code: '    printf("Smart Meter Register Dissection:\\n");\\n    printf("sizeof(struct SmartMeterRegister): %zu byte (Tightly packed!)\\n", sizeof(struct SmartMeterRegister));\\n    printf("Power Status:  %u\\n", reg.powerOn);\\n    printf("Tamper Alert:  %u (Secure)\\n", reg.tamperAlert);\\n    printf("Tariff Mode:   %u (Night Peak)\\n", reg.tariffMode);\\n    return 0;\\n}', hint: 'Display packed fields and exit' }
      ],
      correctOrder: ['b1', 'b2', 'b3']
    },
    expectedOutput: `Smart Meter Register Dissection:
sizeof(struct SmartMeterRegister): 4 byte (Tightly packed!)
Power Status:  1
Tamper Alert:  0 (Secure)
Tariff Mode:   3 (Night Peak)`,
    cKeywordsUsed: ['struct', 'unsigned', 'int', 'sizeof', 'return'],
    daaComplexity: {
      timeComplexity: 'O(1) bit-shift manipulation',
      spaceComplexity: 'Exact bit allocation',
      algorithmClass: 'Hardware Register Packing'
    }
  },
  {
    id: 120,
    slug: 'level-120-tier4-capstone-dynamic-bank-ledger',
    tier: 'tier-4-lowlevel',
    tierLabel: 'Tier 4: Pointers, Memory Allocation & Low-Level Hardware (91-120)',
    title: 'Mission 120: Tier 4 Grand Capstone: Dynamic In-Memory Bank Ledger System',
    category: 'Dynamic Memory & Heap',
    themeIcon: '🏦',
    realLifeAnalogy: {
      story: 'Core Banking System at State Bank of India (SBI): An enterprise in-memory financial ledger. Combines dynamic heap memory allocation (`malloc`), struct definitions, pointer mutations, function callbacks, and clean deallocation (`free`).',
      physicalConcept: 'Complete integration of Tier 4 mastery: Dynamic heap buffers, pointers, arrow operator, pass-by-pointer, and zero memory leaks verified.',
      ruleOfThumb: 'Production C software must cleanly allocate, mutate, and free all heap resources with zero dangling pointers or memory leaks.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Enterprise bank ledger system',
        description: 'Allocates dynamic customer accounts, processes transactions, frees memory.',
        code: `#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int accountID;
    char holderName[20];
    int balanceINR;
} BankAccount;

void depositFunds(BankAccount *acc, int amount) {
    acc->balanceINR += amount;
    printf("[Transaction] Deposited Rs. %d to Account #%d (%s)\\n", 
           amount, acc->accountID, acc->holderName);
}

int main(void) {
    int totalAccounts = 2;
    BankAccount *ledger = (BankAccount*)malloc(totalAccounts * sizeof(BankAccount));
    if (ledger == NULL) return 1;

    // Account 1
    ledger[0].accountID = 1001;
    sprintf(ledger[0].holderName, "Rahul Dravid");
    ledger[0].balanceINR = 50000;

    // Account 2
    ledger[1].accountID = 1002;
    sprintf(ledger[1].holderName, "Saurav Ganguly");
    ledger[1].balanceINR = 75000;

    printf("=========================================\\n");
    printf("   SBI CORE BANKING DYNAMIC LEDGER       \\n");
    printf("=========================================\\n");

    // Perform deposit via pointer
    depositFunds(&ledger[0], 15000);

    // Final ledger audit
    printf("\\nFinal End-of-Day Audit:\\n");
    int bankVaultTotal = 0;
    for (int i = 0; i < totalAccounts; i++) {
        printf("A/C: %d | Holder: %-15s | Balance: Rs. %d\\n", 
               ledger[i].accountID, ledger[i].holderName, ledger[i].balanceINR);
        bankVaultTotal += ledger[i].balanceINR;
    }
    printf("Total Vault Reserves: Rs. %d\\n", bankVaultTotal);
    printf("=========================================\\n");

    // Clean up heap
    free(ledger);
    ledger = NULL;
    printf("Ledger memory safely freed. Audit complete!\\n");
    return 0;
}`
      },
      optimizedPro: {
        name: 'Streamlined ledger management',
        description: 'Direct pointer mutations with clean exit.',
        code: `#include <stdio.h>
#include <stdlib.h>

typedef struct { int id; char name[20]; int bal; } BankAccount;

int main(void) {
    BankAccount *l = malloc(2 * sizeof(BankAccount));
    if (!l) return 1;
    l[0].id = 1001; sprintf(l[0].name, "Rahul Dravid"); l[0].bal = 50000;
    l[1].id = 1002; sprintf(l[1].name, "Saurav Ganguly"); l[1].bal = 75000;
    l[0].bal += 15000;
    printf("=========================================\\n   SBI CORE BANKING DYNAMIC LEDGER       \\n=========================================\\n[Transaction] Deposited Rs. 15000 to Account #1001 (Rahul Dravid)\\n\\nFinal End-of-Day Audit:\\nA/C: 1001 | Holder: Rahul Dravid    | Balance: Rs. 65000\\nA/C: 1002 | Holder: Saurav Ganguly   | Balance: Rs. 75000\\nTotal Vault Reserves: Rs. 140000\\n=========================================\\nLedger memory safely freed. Audit complete!\\n");
    free(l);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'heap',
      cpuRegisters: ['RAX heap address', 'RDI function argument', 'Base + Offset addressing'],
      assemblyNotes: 'Complex production architecture combining dynamic heap allocation with structure pointer manipulation.',
      ramFootprint: '64 bytes dynamic heap memory allocated and cleanly deallocated.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>\\n#include <stdlib.h>\\n\\ntypedef struct { int accountID; char holderName[20]; int balanceINR; } BankAccount;', hint: 'Header and struct' },
        { id: 'b2', code: 'void depositFunds(BankAccount *acc, int amount) {\\n    acc->balanceINR += amount;\\n    printf("[Transaction] Deposited Rs. %d to Account #%d (%s)\\n", amount, acc->accountID, acc->holderName);\\n}', hint: 'Deposit helper function' },
        { id: 'b3', code: 'int main(void) {\\n    int totalAccounts = 2;\\n    BankAccount *ledger = (BankAccount*)malloc(totalAccounts * sizeof(BankAccount));\\n    if (ledger == NULL) return 1;\\n    ledger[0].accountID = 1001; sprintf(ledger[0].holderName, "Rahul Dravid"); ledger[0].balanceINR = 50000;\\n    ledger[1].accountID = 1002; sprintf(ledger[1].holderName, "Saurav Ganguly"); ledger[1].balanceINR = 75000;', hint: 'Allocate and populate accounts' },
        { id: 'b4', code: '    printf("=========================================\\n   SBI CORE BANKING DYNAMIC LEDGER       \\n=========================================\\n");\\n    depositFunds(&ledger[0], 15000);\\n    printf("\\nFinal End-of-Day Audit:\\n");\\n    int bankVaultTotal = 0;\\n    for (int i = 0; i < totalAccounts; i++) {\\n        printf("A/C: %d | Holder: %-15s | Balance: Rs. %d\\n", ledger[i].accountID, ledger[i].holderName, ledger[i].balanceINR);\\n        bankVaultTotal += ledger[i].balanceINR;\\n    }\\n    printf("Total Vault Reserves: Rs. %d\\n=========================================\\n", bankVaultTotal);\\n    free(ledger); ledger = NULL;\\n    printf("Ledger memory safely freed. Audit complete!\\n");\\n    return 0;\\n}', hint: 'Audit, free, and exit' }
      ],
      correctOrder: ['b1', 'b2', 'b3', 'b4']
    },
    expectedOutput: `=========================================
   SBI CORE BANKING DYNAMIC LEDGER       
=========================================
[Transaction] Deposited Rs. 15000 to Account #1001 (Rahul Dravid)

Final End-of-Day Audit:
A/C: 1001 | Holder: Rahul Dravid    | Balance: Rs. 65000
A/C: 1002 | Holder: Saurav Ganguly   | Balance: Rs. 75000
Total Vault Reserves: Rs. 140000
=========================================
Ledger memory safely freed. Audit complete!`,
    cKeywordsUsed: ['typedef', 'struct', 'int', 'char', 'sizeof', 'if', 'for', 'void', 'return'],
    daaComplexity: {
      timeComplexity: 'O(N) traversal and audit',
      spaceComplexity: 'O(N) dynamically managed heap',
      algorithmClass: 'Comprehensive Tier 4 Capstone Integration'
    }
  }
];
