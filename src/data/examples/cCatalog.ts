export interface CExample {
  id: string;
  category: string;
  title: string;
  description: string;
  conceptCovered: string;
  code: string;
  input?: string;
  expectedOutput: string;
}

export const C_EXAMPLES_CATALOG: CExample[] = [
  {
    id: "ex-vector3d",
    category: "Structures & Pointers",
    title: "1. 3D Vector Geometry & Struct Pointers",
    description: "Defines a 3D Vector struct, calculates magnitude using math.h, and passes struct pointer to display function.",
    conceptCovered: "struct declaration, pointer dereference with arrow ->, math.h sqrt.",
    code: `#include <stdio.h>
#include <math.h>

struct Vector3D {
    int x;
    int y;
    int z;
};

void printVector(const struct Vector3D *v) {
    printf("Vector Coordinates: (%d, %d, %d)\\n", v->x, v->y, v->z);
    double magnitude = sqrt((double)(v->x * v->x + v->y * v->y + v->z * v->z));
    printf("Vector 3D Magnitude: %.2f units\\n", magnitude);
}

int main(void) {
    struct Vector3D v1;
    v1.x = 2; v1.y = 3; v1.z = 6;

    printf("--- 3D VECTOR SILICON MATH ---\\n");
    printVector(&v1);
    return 0;
}`,
    expectedOutput: `--- 3D VECTOR SILICON MATH ---
Vector Coordinates: (2, 3, 6)
Vector 3D Magnitude: 7.00 units`
  },
  {
    id: "ex-keyboard-scanf",
    category: "Basics & I/O",
    title: "2. Keyboard Input & scanf Buffer Handling",
    description: "Reads user age and name using scanf and formats a personalized Indian ID badge.",
    conceptCovered: "scanf with address-of operator &, whitespace stripping, buffer safety.",
    input: "21 Raghavendra",
    code: `#include <stdio.h>

int main(void) {
    int age = 0;
    char name[30];

    printf("Please enter your age and first name:\\n");
    if (scanf("%d %s", &age, name) == 2) {
        printf("--- VERIFIED CITIZEN BADGE ---\\n");
        printf("Citizen Name: %s\\n", name);
        printf("Citizen Age : %d years\\n", age);
        printf("Status      : %s\\n", (age >= 18) ? "Eligible Voter" : "Minor");
    } else {
        printf("Input parsing error!\\n");
    }
    return 0;
}`,
    expectedOutput: `Please enter your age and first name:
--- VERIFIED CITIZEN BADGE ---
Citizen Name: Raghavendra
Citizen Age : 21 years
Status      : Eligible Voter`
  },
  {
    id: "ex-math-lib",
    category: "Math & Libraries",
    title: "3. Advanced Math Library: Sqrt, Pow & Trigonometry",
    description: "Computes right-triangle hypotenuse, exponential scaling, and absolute distances using <math.h>.",
    conceptCovered: "math.h library functions: sqrt, pow, fabs, hypot.",
    code: `#include <stdio.h>
#include <math.h>

int main(void) {
    double base = 3.0;
    double height = 4.0;
    double hypotenuse = sqrt(pow(base, 2.0) + pow(height, 2.0));

    double delta = -14.75;
    double absDelta = fabs(delta);

    printf("--- C STANDARD MATH ENGINE ---\\n");
    printf("Base: %.1f | Height: %.1f\\n", base, height);
    printf("Pythagorean Hypotenuse: %.2f\\n", hypotenuse);
    printf("Absolute value of %.2f = %.2f\\n", delta, absDelta);
    printf("Power 2^10 = %.0f\\n", pow(2.0, 10.0));
    return 0;
}`,
    expectedOutput: `--- C STANDARD MATH ENGINE ---
Base: 3.0 | Height: 4.0
Pythagorean Hypotenuse: 5.00
Absolute value of -14.75 = 14.75
Power 2^10 = 1024`
  },
  {
    id: "ex-hello",
    category: "Basics & I/O",
    title: "4. Hello Silicon & Format Specifiers",
    description: "Inspect character escape sequences, newlines, tabs, and format specifiers (%d, %f, %c, %s).",
    conceptCovered: "Standard output, string literals in .rodata, format string parsing.",
    code: `#include <stdio.h>

int main(void) {
    char letter = 'C';
    int year = 1972;
    float creator_impact = 100.0f;

    printf("Language: %c\\n", letter);
    printf("Created in: %d by Dennis Ritchie at Bell Labs\\n", year);
    printf("Global Impact: %.1f%%\\n", creator_impact);
    printf("Formatting integers: [%8d] and [%-8d]\\n", 42, 42);
    return 0;
}`,
    expectedOutput: `Language: C
Created in: 1972 by Dennis Ritchie at Bell Labs
Global Impact: 100.0%
Formatting integers: [      42] and [42      ]`
  },
  {
    id: "ex-types-limits",
    category: "Basics & I/O",
    title: "5. Data Types, Limits & Byte Sizes",
    description: "Evaluate exact memory sizes and maximum integer boundaries without undefined overflow.",
    conceptCovered: "sizeof operator, 2's complement representation, byte alignment.",
    code: `#include <stdio.h>

int main(void) {
    printf("sizeof(char)   : %zu byte  (8 bits)\\n", sizeof(char));
    printf("sizeof(short)  : %zu bytes (16 bits)\\n", sizeof(short));
    printf("sizeof(int)    : %zu bytes (32 bits)\\n", sizeof(int));
    printf("sizeof(long)   : %zu bytes (32 or 64 bits)\\n", sizeof(long));
    printf("sizeof(float)  : %zu bytes (IEEE 754 single)\\n", sizeof(float));
    printf("sizeof(double) : %zu bytes (IEEE 754 double)\\n", sizeof(double));
    printf("sizeof(void*)  : %zu bytes (Virtual pointer size)\\n", sizeof(void*));
    return 0;
}`,
    expectedOutput: `sizeof(char)   : 1 byte  (8 bits)
sizeof(short)  : 2 bytes (16 bits)
sizeof(int)    : 4 bytes (32 bits)
sizeof(long)   : 8 bytes (32 or 64 bits)
sizeof(float)  : 4 bytes (IEEE 754 single)
sizeof(double) : 8 bytes (IEEE 754 double)
sizeof(void*)  : 8 bytes (Virtual pointer size)`
  },
  {
    id: "ex-bitwise",
    category: "Operators",
    title: "6. Bitwise Operators & Silicon Flags",
    description: "Shift bits, toggle hardware flags, and mask bits with AND, OR, XOR, NOT, and bit shifts.",
    conceptCovered: "ALU bit manipulation: &, |, ^, ~, <<, >>.",
    code: `#include <stdio.h>

int main(void) {
    unsigned char flags = 5;     // 0b00000101 (bits 0 and 2 set)
    unsigned char mask = 1 << 1; // bit 1 mask (0b00000010)

    printf("Initial flags: %u\\n", flags);
    
    // Set bit 1
    flags = flags | mask;
    printf("After setting bit 1: %u\\n", flags);

    // Toggle bit 0
    flags = flags ^ (1 << 0);
    printf("After toggling bit 0: %u\\n", flags);

    // Clear bit 2
    flags = flags & ~(1 << 2);
    printf("After clearing bit 2: %u\\n", flags);
    return 0;
}`,
    expectedOutput: `Initial flags: 5
After setting bit 1: 7
After toggling bit 0: 6
After clearing bit 2: 2`
  },
  {
    id: "ex-pointers-swap",
    category: "Pointers & Memory",
    title: "7. Pointer Memory Mutation & Two-Wallet Swap",
    description: "Modifies caller memory across stack frames via pointers and addresses.",
    conceptCovered: "Memory addresses, pointer dereference operator *, pass by reference.",
    code: `#include <stdio.h>

void swapWallets(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main(void) {
    int walletA = 500;
    int walletB = 2000;

    printf("[Before Swap] Wallet A: Rs. %d | Wallet B: Rs. %d\\n", walletA, walletB);
    swapWallets(&walletA, &walletB);
    printf("[After Swap]  Wallet A: Rs. %d | Wallet B: Rs. %d\\n", walletA, walletB);
    return 0;
}`,
    expectedOutput: `[Before Swap] Wallet A: Rs. 500 | Wallet B: Rs. 2000
[After Swap]  Wallet A: Rs. 2000 | Wallet B: Rs. 500`
  },
  {
    id: "ex-dynamic-array",
    category: "Dynamic Memory",
    title: "8. Dynamic Heap Memory: malloc & free",
    description: "Requests heap memory at runtime, validates allocation, and deallocates to prevent memory leaks.",
    conceptCovered: "malloc, free, NULL pointer check, heap segment lifecycle.",
    code: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int count = 4;
    int *scores = (int*)malloc(count * sizeof(int));
    if (scores == NULL) return 1;

    scores[0] = 85;
    scores[1] = 92;
    scores[2] = 78;
    scores[3] = 95;

    int sum = 0;
    for (int i = 0; i < count; i++) {
        sum += scores[i];
    }
    printf("Dynamically allocated 4 student scores.\\n");
    printf("Average score: %.2f%%\\n", (float)sum / count);

    free(scores);
    scores = NULL;
    printf("Memory cleanly returned to operating system.\\n");
    return 0;
}`,
    expectedOutput: `Dynamically allocated 4 student scores.
Average score: 87.50%
Memory cleanly returned to operating system.`
  }
];
