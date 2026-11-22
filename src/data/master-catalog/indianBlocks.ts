export interface BlockItem {
  id: string;
  category: 'input' | 'calc' | 'decision' | 'loop' | 'array' | 'string' | 'function' | 'pointer' | 'struct' | 'output';
  color: string;
  label: string;
  cEquivalent: string;
  plainEnglish: string;
}

export interface BlockPresetPipeline {
  id: string;
  title: string;
  category: string;
  description: string;
  blockIds: string[];
}

export const INDIAN_NATIVE_BLOCKS: BlockItem[] = [
  // ==========================================
  // 1. INPUTS, VARIABLES & DATA TYPES
  // ==========================================
  {
    id: 'blk-int-samosa',
    category: 'input',
    color: 'bg-emerald-100 border-emerald-300 text-emerald-900',
    label: 'Declare int samosaCount = 3;',
    cEquivalent: 'int samosaCount = 3;',
    plainEnglish: 'Allocates a 4-byte integer variable on the stack storing 3 samosas.'
  },
  {
    id: 'blk-int-samosa-price',
    category: 'input',
    color: 'bg-emerald-100 border-emerald-300 text-emerald-900',
    label: 'Declare int samosaRate = 15;',
    cEquivalent: 'int samosaRate = 15;',
    plainEnglish: 'Price per samosa is Rs. 15.'
  },
  {
    id: 'blk-int-chai',
    category: 'input',
    color: 'bg-emerald-100 border-emerald-300 text-emerald-900',
    label: 'Declare int chaiCount = 4;',
    cEquivalent: 'int chaiCount = 4;',
    plainEnglish: 'Store order quantity of 4 cups of masala chai.'
  },
  {
    id: 'blk-int-chai-price',
    category: 'input',
    color: 'bg-emerald-100 border-emerald-300 text-emerald-900',
    label: 'Declare int chaiRate = 10;',
    cEquivalent: 'int chaiRate = 10;',
    plainEnglish: 'Price per cutting chai is Rs. 10.'
  },
  {
    id: 'blk-char-grade',
    category: 'input',
    color: 'bg-emerald-100 border-emerald-300 text-emerald-900',
    label: "Declare char studentGrade = 'A';",
    cEquivalent: "char studentGrade = 'A';",
    plainEnglish: "Allocates 1 byte on stack storing ASCII byte code 65 ('A')."
  },
  {
    id: 'blk-float-petrol',
    category: 'input',
    color: 'bg-emerald-100 border-emerald-300 text-emerald-900',
    label: 'Declare float petrolLitres = 5.5f;',
    cEquivalent: 'float petrolLitres = 5.5f;',
    plainEnglish: 'Stores single-precision 32-bit floating point fuel volume.'
  },
  {
    id: 'blk-double-gps',
    category: 'input',
    color: 'bg-emerald-100 border-emerald-300 text-emerald-900',
    label: 'Declare double delhiLat = 28.613939;',
    cEquivalent: 'double delhiLat = 28.613939;',
    plainEnglish: '64-bit IEEE 754 double precision latitude coordinate.'
  },
  {
    id: 'blk-metro-balance',
    category: 'input',
    color: 'bg-emerald-100 border-emerald-300 text-emerald-900',
    label: 'Declare int metroCardBalance = 120;',
    cEquivalent: 'int metroCardBalance = 120;',
    plainEnglish: 'Current Delhi Metro smartcard balance in Indian Rupees.'
  },
  {
    id: 'blk-vehicle-speed',
    category: 'input',
    color: 'bg-emerald-100 border-emerald-300 text-emerald-900',
    label: 'Declare int carSpeedKmh = 95;',
    cEquivalent: 'int carSpeedKmh = 95;',
    plainEnglish: 'Radar sensor measured speed on Bandra-Worli Sea Link.'
  },
  {
    id: 'blk-unsigned-ram',
    category: 'input',
    color: 'bg-emerald-100 border-emerald-300 text-emerald-900',
    label: 'Declare unsigned int packetBytes = 4096U;',
    cEquivalent: 'unsigned int packetBytes = 4096U;',
    plainEnglish: 'Non-negative unsigned integer representing network MTU buffer.'
  },

  // ==========================================
  // 2. ARITHMETIC & GST BILLING CALCULATIONS
  // ==========================================
  {
    id: 'blk-calc-subtotal',
    category: 'calc',
    color: 'bg-amber-100 border-amber-300 text-amber-900',
    label: 'Calculate Base Canteen Subtotal',
    cEquivalent: 'int subtotal = (samosaCount * samosaRate) + (chaiCount * chaiRate);',
    plainEnglish: 'Multiplies and sums snack costs into subtotal: (3*15) + (4*10) = Rs. 85.'
  },
  {
    id: 'blk-calc-gst18',
    category: 'calc',
    color: 'bg-amber-100 border-amber-300 text-amber-900',
    label: 'Compute 18% GST (Goods & Services Tax)',
    cEquivalent: 'int gstTax = (subtotal * 18) / 100;',
    plainEnglish: 'Integer division calculates 18 percent tax: (85 * 18) / 100 = Rs. 15.'
  },
  {
    id: 'blk-calc-grand-payable',
    category: 'calc',
    color: 'bg-amber-100 border-amber-300 text-amber-900',
    label: 'Grand Total Payable (Subtotal + GST)',
    cEquivalent: 'int grandTotal = subtotal + gstTax;',
    plainEnglish: 'Combines base price and tax: Rs. 85 + Rs. 15 = Rs. 100.'
  },
  {
    id: 'blk-calc-modulo-clock',
    category: 'calc',
    color: 'bg-amber-100 border-amber-300 text-amber-900',
    label: 'Modulo 7 Calendar Day Wrap',
    cEquivalent: 'int dayIndex = 25 % 7;',
    plainEnglish: 'Computes remainder after division: 25 mod 7 = 4 (Thursday).'
  },
  {
    id: 'blk-calc-compound-add',
    category: 'calc',
    color: 'bg-amber-100 border-amber-300 text-amber-900',
    label: 'Compound Add: walletBalance += 500;',
    cEquivalent: 'walletBalance += 500;',
    plainEnglish: 'In-place addition updating bank balance register directly.'
  },
  {
    id: 'blk-calc-left-shift',
    category: 'calc',
    color: 'bg-amber-100 border-amber-300 text-amber-900',
    label: 'Bitwise Left Shift (value << 2)',
    cEquivalent: 'int multipliedBy4 = value << 2;',
    plainEnglish: 'Fast ALU bit shift multiplying value by 2^2 (4) in 1 clock cycle.'
  },

  // ==========================================
  // 3. CONDITIONALS & DECISIONS
  // ==========================================
  {
    id: 'blk-dec-speed-radar',
    category: 'decision',
    color: 'bg-sky-100 border-sky-300 text-sky-900',
    label: 'If carSpeedKmh > 80: Issue Challan',
    cEquivalent: 'if (carSpeedKmh > 80) {\n        printf("SPEED CAMERA: Challan issued for %d km/h!\\n", carSpeedKmh);\n    }',
    plainEnglish: 'Branch check: if speed exceeds 80 km/h speed limit, issue police ticket.'
  },
  {
    id: 'blk-dec-metro-balance',
    category: 'decision',
    color: 'bg-sky-100 border-sky-300 text-sky-900',
    label: 'If-Else: Metro Gate Entry Verification',
    cEquivalent: 'if (metroCardBalance >= 50) {\n        printf("TURNSTILE: Gate OPEN. Welcome to Delhi Metro!\\n");\n    } else {\n        printf("TURNSTILE: Insufficient balance. Recharge required.\\n");\n    }',
    plainEnglish: 'Tests if card has required Rs. 50 minimum balance.'
  },
  {
    id: 'blk-dec-grade-ladder',
    category: 'decision',
    color: 'bg-sky-100 border-sky-300 text-sky-900',
    label: 'Else-If Grade Classification Ladder',
    cEquivalent: 'if (marks >= 90) printf("Grade: A+\\n");\n    else if (marks >= 75) printf("Grade: B\\n");\n    else printf("Grade: C\\n");',
    plainEnglish: 'Cascading decision branches classifying percentage marks.'
  },
  {
    id: 'blk-dec-switch-shipping',
    category: 'decision',
    color: 'bg-sky-100 border-sky-300 text-sky-900',
    label: 'Switch-Case: India Post Parcel Zone',
    cEquivalent: 'switch (zoneCode) {\n        case 1: printf("Zone 1: Delhi NCR Delivery\\n"); break;\n        case 2: printf("Zone 2: Mumbai Western Zone\\n"); break;\n        default: printf("Zone Other: National Express\\n"); break;\n    }',
    plainEnglish: 'Generates jump table for fast $O(1)$ multi-way branching.'
  },
  {
    id: 'blk-dec-ternary-discount',
    category: 'decision',
    color: 'bg-sky-100 border-sky-300 text-sky-900',
    label: 'Ternary Operator (age >= 60 ? 50 : 0)',
    cEquivalent: 'int seniorDiscount = (age >= 60) ? 50 : 0;',
    plainEnglish: 'Inline conditional expression evaluating discount amount.'
  },

  // ==========================================
  // 4. LOOPS & REPETITION
  // ==========================================
  {
    id: 'blk-loop-for-countdown',
    category: 'loop',
    color: 'bg-purple-100 border-purple-300 text-purple-900',
    label: 'For Loop: Rocket T-minus 5 to 1 Countdown',
    cEquivalent: 'for (int t = 5; t >= 1; t--) {\n        printf("ISRO Mission T-minus %d seconds...\\n", t);\n    }',
    plainEnglish: 'Loop with initialization, condition, and decrement.'
  },
  {
    id: 'blk-loop-accumulator',
    category: 'loop',
    color: 'bg-purple-100 border-purple-300 text-purple-900',
    label: 'For Loop: Sum of First 10 Natural Numbers',
    cEquivalent: 'int totalSum = 0;\n    for (int i = 1; i <= 10; i++) {\n        totalSum += i;\n    }',
    plainEnglish: 'Accumulator pattern computing $1 + 2 + ... + 10 = 55$.'
  },
  {
    id: 'blk-loop-while-otp',
    category: 'loop',
    color: 'bg-purple-100 border-purple-300 text-purple-900',
    label: 'While Loop: OTP Max 3 Retries',
    cEquivalent: 'int attempts = 0;\n    while (attempts < 3) {\n        printf("OTP Attempt %d approved.\\n", attempts + 1);\n        attempts++;\n    }',
    plainEnglish: 'Entry-controlled loop executing while condition remains true.'
  },
  {
    id: 'blk-loop-nested-grid',
    category: 'loop',
    color: 'bg-purple-100 border-purple-300 text-purple-900',
    label: 'Nested Loops: 3x3 Coordinate Matrix',
    cEquivalent: 'for (int r = 1; r <= 3; r++) {\n        for (int c = 1; c <= 3; c++) {\n            printf("[%d,%d] ", r, c);\n        }\n        printf("\\n");\n    }',
    plainEnglish: 'Row-column nested loops traversing a 2D coordinate grid.'
  },

  // ==========================================
  // 5. 1D & 2D ARRAYS
  // ==========================================
  {
    id: 'blk-arr-ipl-runs',
    category: 'array',
    color: 'bg-teal-100 border-teal-300 text-teal-900',
    label: 'Declare 1D Array: int overRuns[5] = {12, 8, 15, 6, 18};',
    cEquivalent: 'int overRuns[5] = {12, 8, 15, 6, 18};',
    plainEnglish: 'Allocates 20 contiguous bytes on stack storing 5 cricket overs.'
  },
  {
    id: 'blk-arr-loop-print',
    category: 'array',
    color: 'bg-teal-100 border-teal-300 text-teal-900',
    label: 'For Loop: Array Traversal and Summation',
    cEquivalent: 'int totalRuns = 0;\n    for (int i = 0; i < 5; i++) {\n        printf("Over %d: %d runs\\n", i + 1, overRuns[i]);\n        totalRuns += overRuns[i];\n    }',
    plainEnglish: 'Iterates array indices 0 to 4 reading each element in sequential memory.'
  },
  {
    id: 'blk-arr-min-max',
    category: 'array',
    color: 'bg-teal-100 border-teal-300 text-teal-900',
    label: 'Scan Array for Minimum and Maximum Values',
    cEquivalent: 'int min = overRuns[0], max = overRuns[0];\n    for (int i = 1; i < 5; i++) {\n        if (overRuns[i] < min) min = overRuns[i];\n        if (overRuns[i] > max) max = overRuns[i];\n    }',
    plainEnglish: 'Single-pass extremum tracking with conditional updates.'
  },
  {
    id: 'blk-arr-2d-matrix',
    category: 'array',
    color: 'bg-teal-100 border-teal-300 text-teal-900',
    label: 'Declare 2D Matrix: int cinema[2][2] = {{250, 300}, {500, 600}};',
    cEquivalent: 'int cinema[2][2] = {{250, 300}, {500, 600}};',
    plainEnglish: 'Row-major 2x2 contiguous memory layout representing PVR cinema seat tiers.'
  },

  // ==========================================
  // 6. STRINGS & CHARACTER MEMORY
  // ==========================================
  {
    id: 'blk-str-city',
    category: 'string',
    color: 'bg-cyan-100 border-cyan-300 text-cyan-900',
    label: 'Declare String: char city[] = "MUMBAI";',
    cEquivalent: 'char city[] = "MUMBAI";',
    plainEnglish: 'Null-terminated character array with 7 bytes (M-U-M-B-A-I-\\0).'
  },
  {
    id: 'blk-str-custom-len',
    category: 'string',
    color: 'bg-cyan-100 border-cyan-300 text-cyan-900',
    label: 'Count Characters until \\0 Null Terminator',
    cEquivalent: 'int len = 0;\n    while (city[len] != \'\\0\') len++;',
    plainEnglish: 'Custom strlen loop scanning memory until sentinel 0 byte.'
  },
  {
    id: 'blk-str-palindrome',
    category: 'string',
    color: 'bg-cyan-100 border-cyan-300 text-cyan-900',
    label: 'Two-Pointer String Palindrome Checker',
    cEquivalent: 'int left = 0, right = len - 1, isPal = 1;\n    while (left < right) {\n        if (city[left] != city[right]) { isPal = 0; break; }\n        left++; right--;\n    }',
    plainEnglish: 'Compares characters from ends moving inward.'
  },

  // ==========================================
  // 7. FUNCTIONS & MODULAR CODE
  // ==========================================
  {
    id: 'blk-func-gst-calc',
    category: 'function',
    color: 'bg-blue-100 border-blue-300 text-blue-900',
    label: 'Function: calculateTax(int amount, int percentRate)',
    cEquivalent: 'int calculateTax(int amount, int percentRate) {\n    return (amount * percentRate) / 100;\n}',
    plainEnglish: 'Pure modular function returning calculated tax value.'
  },
  {
    id: 'blk-func-call-tax',
    category: 'function',
    color: 'bg-blue-100 border-blue-300 text-blue-900',
    label: 'Call Function: int tax = calculateTax(5000, 18);',
    cEquivalent: 'int tax = calculateTax(5000, 18);',
    plainEnglish: 'Pushes arguments to registers and executes CPU CALL instruction.'
  },

  // ==========================================
  // 8. POINTERS & DYNAMIC MEMORY
  // ==========================================
  {
    id: 'blk-ptr-address-of',
    category: 'pointer',
    color: 'bg-indigo-100 border-indigo-300 text-indigo-900',
    label: 'Store RAM Address: int *pBal = &metroCardBalance;',
    cEquivalent: 'int *pBal = &metroCardBalance;',
    plainEnglish: 'The & operator captures 64-bit physical memory address of variable.'
  },
  {
    id: 'blk-ptr-dereference-mutate',
    category: 'pointer',
    color: 'bg-indigo-100 border-indigo-300 text-indigo-900',
    label: 'Remote Mutation: *pBal = 250;',
    cEquivalent: '*pBal = 250;',
    plainEnglish: 'Writes Rs. 250 directly into target memory cell via pointer dereference.'
  },
  {
    id: 'blk-ptr-swap',
    category: 'pointer',
    color: 'bg-indigo-100 border-indigo-300 text-indigo-900',
    label: 'Pointer Swap Two Wallets: swap(&wA, &wB);',
    cEquivalent: 'void swap(int *a, int *b) { int t = *a; *a = *b; *b = t; }',
    plainEnglish: 'Passes memory addresses to swap caller variables across stack frames.'
  },
  {
    id: 'blk-ptr-malloc',
    category: 'pointer',
    color: 'bg-indigo-100 border-indigo-300 text-indigo-900',
    label: 'Allocate Dynamic Heap: int *heap = (int*)malloc(3 * sizeof(int));',
    cEquivalent: 'int *heap = (int*)malloc(3 * sizeof(int));\n    if (heap != NULL) { heap[0] = 10; heap[1] = 20; heap[2] = 30; }',
    plainEnglish: 'Requests 12 contiguous bytes from OS heap memory pool.'
  },
  {
    id: 'blk-ptr-free',
    category: 'pointer',
    color: 'bg-indigo-100 border-indigo-300 text-indigo-900',
    label: 'Free Dynamic Memory: free(heap); heap = NULL;',
    cEquivalent: 'free(heap);\n    heap = NULL;',
    plainEnglish: 'Returns heap memory to OS and neutralizes dangling pointer.'
  },

  // ==========================================
  // 9. STRUCTURES & UNIONS
  // ==========================================
  {
    id: 'blk-struct-ticket',
    category: 'struct',
    color: 'bg-rose-100 border-rose-300 text-rose-900',
    label: 'Define struct RailwayTicket { int pnr; int fare; };',
    cEquivalent: 'struct RailwayTicket {\n    int pnr;\n    int fare;\n};',
    plainEnglish: 'Composite record grouping heterogeneous passenger details.'
  },
  {
    id: 'blk-struct-arrow-access',
    category: 'struct',
    color: 'bg-rose-100 border-rose-300 text-rose-900',
    label: 'Access via Arrow Operator: ptrTicket->fare = 1450;',
    cEquivalent: 'ptrTicket->fare = 1450;',
    plainEnglish: 'Dereferences struct pointer and accesses member offset in single CPU step.'
  },

  // ==========================================
  // 10. TERMINAL OUTPUTS
  // ==========================================
  {
    id: 'blk-out-kirana-invoice',
    category: 'output',
    color: 'bg-orange-100 border-orange-300 text-orange-900',
    label: 'Print Canteen Kirana Invoice',
    cEquivalent: 'printf("Canteen Invoice: Total Payable = Rs. %d (Paid via UPI)\\n", grandTotal);',
    plainEnglish: 'Outputs formatted currency total to console terminal.'
  },
  {
    id: 'blk-out-speed-status',
    category: 'output',
    color: 'bg-orange-100 border-orange-300 text-orange-900',
    label: 'Print Speed Radar Monitor Status',
    cEquivalent: 'printf("Radar Telemetry: Speed is %d km/h\\n", carSpeedKmh);',
    plainEnglish: 'Prints vehicle speed on console.'
  },
  {
    id: 'blk-out-general-result',
    category: 'output',
    color: 'bg-orange-100 border-orange-300 text-orange-900',
    label: 'Print Success & Return 0',
    cEquivalent: 'printf("Execution Completed Successfully with Exit Code 0\\n");',
    plainEnglish: 'Displays final status message.'
  }
];

// Preset Workflows ready to load into the Visual Block Builder
export const PRESET_BLOCK_PIPELINES: BlockPresetPipeline[] = [
  {
    id: 'preset-canteen-bill',
    title: 'Canteen Samosa & Chai GST Invoice',
    category: 'Basics & Arithmetic',
    description: 'Calculate 3 samosas + 4 chais, add 18% GST tax, and print UPI invoice.',
    blockIds: [
      'blk-int-samosa',
      'blk-int-samosa-price',
      'blk-int-chai',
      'blk-int-chai-price',
      'blk-calc-subtotal',
      'blk-calc-gst18',
      'blk-calc-grand-payable',
      'blk-out-kirana-invoice'
    ]
  },
  {
    id: 'preset-speed-radar',
    title: 'Mumbai Sea Link Speed Radar Camera',
    category: 'Conditionals & Logic',
    description: 'Measures vehicle speed, checks > 80 km/h limit, and conditionally issues traffic challan.',
    blockIds: [
      'blk-vehicle-speed',
      'blk-out-speed-status',
      'blk-dec-speed-radar'
    ]
  },
  {
    id: 'preset-metro-gate',
    title: 'Delhi Metro SmartCard Turnstile Gate',
    category: 'Conditionals & Logic',
    description: 'Checks customer card balance against Rs. 50 minimum and opens turnstile gate.',
    blockIds: [
      'blk-metro-balance',
      'blk-dec-metro-balance'
    ]
  },
  {
    id: 'preset-ipl-runs-array',
    title: 'IPL Cricket Overs Runs & Min-Max Tracker',
    category: 'Arrays & Loops',
    description: 'Declares array of 5 overs, scans all elements, and finds highest and lowest scoring overs.',
    blockIds: [
      'blk-arr-ipl-runs',
      'blk-arr-loop-print',
      'blk-arr-min-max'
    ]
  },
  {
    id: 'preset-pointer-memory',
    title: 'Pointer Address & Remote Memory Mutation',
    category: 'Pointers & Memory',
    description: 'Inspects physical RAM address using & operator and remotely mutates value via * pointer.',
    blockIds: [
      'blk-metro-balance',
      'blk-ptr-address-of',
      'blk-ptr-dereference-mutate'
    ]
  },
  {
    id: 'preset-dynamic-heap',
    title: 'Dynamic Heap Memory Allocation (malloc & free)',
    category: 'Pointers & Memory',
    description: 'Allocates memory from heap, stores integers, and cleanly deallocates with free().',
    blockIds: [
      'blk-ptr-malloc',
      'blk-ptr-free'
    ]
  }
];
