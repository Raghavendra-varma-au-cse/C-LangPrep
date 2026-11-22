export interface MultiFileProject {
  id: string;
  title: string;
  description: string;
  architectureConcept: string;
  files: {
    filename: string;
    fileRole: 'Header File (.h)' | 'Source Implementation (.c)' | 'Main Driver (main.c)' | 'Makefile';
    purpose: string;
    content: string;
  }[];
  compilationCommand: string;
  linkerExplanation: string;
  expectedConsoleOutput: string;
}

export const MULTIFILE_PROJECTS: MultiFileProject[] = [
  {
    id: "proj-math-engine",
    title: "1. Modular Calculator Library (calc.h + calc.c + main.c)",
    description: "Learn how professional software splits interface declarations from implementations to prevent code duplication and speed up builds.",
    architectureConcept: "Header Guard (#ifndef) prevents redefinition errors when multiple source files include the same header.",
    files: [
      {
        filename: "calc.h",
        fileRole: "Header File (.h)",
        purpose: "Declares function prototypes and exports public API. No code execution happens here.",
        content: `#ifndef CALC_H
#define CALC_H

// Header Guard ensures this file is included only once per compile unit
int add(int a, int b);
int multiply(int a, int b);

#endif // CALC_H`
      },
      {
        filename: "calc.c",
        fileRole: "Source Implementation (.c)",
        purpose: "Implements the math algorithms. Compiles into calc.o object file.",
        content: `#include "calc.h"

int add(int a, int b) {
    return a + b;
}

int multiply(int a, int b) {
    return a * b;
}`
      },
      {
        filename: "main.c",
        fileRole: "Main Driver (main.c)",
        purpose: "The entry point. Includes calc.h and calls library functions.",
        content: `#include <stdio.h>
#include "calc.h"

int main(void) {
    int x = 12, y = 5;
    printf("Add: %d + %d = %d\\n", x, y, add(x, y));
    printf("Multiply: %d * %d = %d\\n", x, y, multiply(x, y));
    return 0;
}`
      },
      {
        filename: "Makefile",
        fileRole: "Makefile",
        purpose: "Automates the 2-step compilation: compile .c -> .o, then link .o -> binary.",
        content: `CC = gcc
CFLAGS = -Wall -Wextra -O2

# Build executable by linking object files
app: main.o calc.o
\t$(CC) $(CFLAGS) -o app main.o calc.o

# Compile calc.c into calc.o
calc.o: calc.c calc.h
\t$(CC) $(CFLAGS) -c calc.c

# Compile main.c into main.o
main.o: main.c calc.h
\t$(CC) $(CFLAGS) -c main.c

clean:
\trm -f *.o app`
      }
    ],
    compilationCommand: "gcc -c calc.c\ngcc -c main.c\ngcc main.o calc.o -o app\n./app",
    linkerExplanation: "Phase 1: `gcc -c calc.c` outputs `calc.o` containing machine code for `add` and `multiply`.\nPhase 2: `gcc -c main.c` outputs `main.o` with unresolved symbols for `add`.\nPhase 3 (Linking): `gcc main.o calc.o` patches the memory jump addresses so `main.o` calls the function code inside `calc.o`.",
    expectedConsoleOutput: `Add: 12 + 5 = 17
Multiply: 12 * 5 = 60`
  },
  {
    id: "proj-bank-system",
    title: "2. Bank Account Module (bank.h + bank.c + main.c)",
    description: "Encapsulate private bank state and expose only secure public functions.",
    architectureConcept: "Encapsulation in C: using struct typedefs and pointers to hide internal data layout.",
    files: [
      {
        filename: "bank.h",
        fileRole: "Header File (.h)",
        purpose: "Public contract: defines Account struct and deposit/withdraw prototypes.",
        content: `#ifndef BANK_H
#define BANK_H

typedef struct {
    int accountNumber;
    float balance;
} Account;

void initAccount(Account *acc, int accNum, float initialDeposit);
int deposit(Account *acc, float amount);
int withdraw(Account *acc, float amount);

#endif`
      },
      {
        filename: "bank.c",
        fileRole: "Source Implementation (.c)",
        purpose: "Business logic: protects against negative deposits and overdrafts.",
        content: `#include <stdio.h>
#include "bank.h"

void initAccount(Account *acc, int accNum, float initialDeposit) {
    acc->accountNumber = accNum;
    acc->balance = initialDeposit;
}

int deposit(Account *acc, float amount) {
    if (amount <= 0) return 0;
    acc->balance += amount;
    return 1;
}

int withdraw(Account *acc, float amount) {
    if (amount <= 0 || amount > acc->balance) return 0;
    acc->balance -= amount;
    return 1;
}`
      },
      {
        filename: "main.c",
        fileRole: "Main Driver (main.c)",
        purpose: "Simulates customer transaction workflow.",
        content: `#include <stdio.h>
#include "bank.h"

int main(void) {
    Account myAcc;
    initAccount(&myAcc, 998877, 500.0f);

    printf("Initial Balance: Rs. %.2f\\n", myAcc.balance);
    deposit(&myAcc, 250.0f);
    printf("After Deposit:   Rs. %.2f\\n", myAcc.balance);
    withdraw(&myAcc, 100.0f);
    printf("After Withdraw:  Rs. %.2f\\n", myAcc.balance);

    return 0;
}`
      }
    ],
    compilationCommand: "gcc -Wall bank.c main.c -o bank_app\n./bank_app",
    linkerExplanation: "The compiler compiles bank.c and main.c separately into symbol tables, then the Linker bundles them into `bank_app`.",
    expectedConsoleOutput: `Initial Balance: Rs. 500.00
After Deposit:   Rs. 750.00
After Withdraw:  Rs. 650.00`
  }
];
