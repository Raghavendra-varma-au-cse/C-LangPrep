export interface ExternalResource {
  id: string;
  name: string;
  url: string;
  category: '1. Visual & Block Logic' | '2. Online C Compilers' | '3. Concept Guides & Tutorials' | '4. Practice & Problem Solving' | '5. Silicon & Systems Visualizers';
  badge: string;
  badgeColor: string; // Tailwind color token
  description: string;
  howToUse: string;
  isImportant?: boolean;
}

export const EXTERNAL_C_RESOURCES: ExternalResource[] = [
  // 1. Visual & Block Logic Foundations
  {
    id: "res-codemonkey",
    name: "CodeMonkey",
    url: "https://www.codemonkey.com/",
    category: "1. Visual & Block Logic",
    badge: "Recommended First Step",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
    description: "Start with CodeMonkey! Solve game challenges by thinking sequentially about step-by-step instructions to collect bananas and reach targets.",
    howToUse: "Play through the banana-collecting coding puzzles to build intuition on sequences, loops, and conditions before writing textual code."
  },
  {
    id: "res-code-org",
    name: "Code.org",
    url: "https://www.code.org/",
    category: "1. Visual & Block Logic",
    badge: "Foundation Logic",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-300",
    description: "Interactive learning platform with Hour of Code puzzles, visual algorithms, and computational thinking fundamentals.",
    howToUse: "Great for understanding how loops and conditionals construct algorithmic problem solutions."
  },
  {
    id: "res-blockly-games",
    name: "Blockly Games",
    url: "https://blockly.games/",
    category: "1. Visual & Block Logic",
    badge: "Google Block Engine",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    description: "Google's series of educational games that teach programming concepts through visual drag-and-drop code blocks.",
    howToUse: "Solve the Maze and Bird navigation levels to master conditional branching and iterative loops without worrying about missing semicolons."
  },

  // 2. Online C Compilers & Runners
  {
    id: "res-programiz-compiler",
    name: "Programiz Online C Compiler",
    url: "https://www.programiz.com/c-programming/online-compiler/",
    category: "2. Online C Compilers",
    badge: "Instant Cloud Runner",
    badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-300",
    description: "Lightweight, zero-setup online C IDE that runs in any web browser with terminal stdout/stdin support.",
    howToUse: "Use this to quickly test short C code snippets without needing GCC or VS Code installed locally."
  },
  {
    id: "res-codechef-ide",
    name: "CodeChef Online IDE",
    url: "https://www.codechef.com/ide",
    category: "2. Online C Compilers",
    badge: "Competitive IDE",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
    description: "High-performance online judge compiler with custom stdin input support and execution time telemetry.",
    howToUse: "Paste algorithms and input files to verify execution speed, memory limits, and correctness against edge cases."
  },
  {
    id: "res-w3schools-practice",
    name: "W3Schools C Practice",
    url: "https://www.w3schools.com/practice/practice_c.php",
    category: "2. Online C Compilers",
    badge: "Hands-on Drills",
    badgeColor: "bg-green-100 text-green-800 border-green-300",
    description: "Fill-in-the-blank C exercises, interactive code editor drills, and quizzes for beginners.",
    howToUse: "Test your syntax memory on variables, if-else, while loops, and arrays after each lesson."
  },
  {
    id: "res-waytoc",
    name: "WayToC (by Sadeali)",
    url: "https://waytoc.sadeali.com/",
    category: "2. Online C Compilers",
    badge: "Interactive Tutor",
    badgeColor: "bg-rose-100 text-rose-800 border-rose-300",
    description: "Step-by-step interactive C programming course with inline code challenges and visual progress tracking.",
    howToUse: "Follow the guided roadmap to practice C fundamentals with immediate browser feedback."
  },
  {
    id: "res-pythontutor",
    name: "PythonTutor C Visualizer",
    url: "https://pythontutor.com/c.html",
    category: "2. Online C Compilers",
    badge: "RAM & Stack Visualizer",
    badgeColor: "bg-purple-100 text-purple-800 border-purple-300",
    description: "World-famous execution visualizer that animates stack frames, pointers, heap malloc chunks, and variables step-by-step.",
    howToUse: "Paste pointer and linked list code here to physically see arrows pointing between RAM memory addresses on each instruction!"
  },
  {
    id: "res-onlinegdb",
    name: "OnlineGDB C Compiler & Debugger",
    url: "https://www.onlinegdb.com/online_c_compiler",
    category: "2. Online C Compilers",
    badge: "GDB Stepping",
    badgeColor: "bg-teal-100 text-teal-800 border-teal-300",
    description: "Online C compiler equipped with interactive GDB breakpoints, call stack traces, and multi-file project support.",
    howToUse: "Set breakpoints on specific lines to inspect variable states and diagnose segmentation faults."
  },
  {
    id: "res-godbolt",
    name: "Compiler Explorer (Godbolt)",
    url: "https://godbolt.org/",
    category: "2. Online C Compilers",
    badge: "Silicon Assembly",
    badgeColor: "bg-slate-100 text-slate-800 border-slate-300",
    description: "View real-time x86-64, ARM, and RISC-V assembly generated by GCC, Clang, and MSVC side-by-side with your C code.",
    howToUse: "See exactly how `const`, `inline`, `register`, and `-O3` optimization flags alter machine opcodes in silicon."
  },

  // 3. Concept Guides & Tutorials
  {
    id: "res-w3schools-c",
    name: "W3Schools C Tutorial",
    url: "https://www.w3schools.com/c/",
    category: "3. Concept Guides & Tutorials",
    badge: "Essential Reference (IMP)",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    description: "The gold-standard beginner C tutorial: crystal-clear explanations of syntax, data types, pointers, structures, and memory.",
    howToUse: "Keep open as a handy reference for quick syntax lookups when building projects.",
    isImportant: true
  },
  {
    id: "res-programiz-c",
    name: "Programiz C Programming Guide",
    url: "https://www.programiz.com/c-programming",
    category: "3. Concept Guides & Tutorials",
    badge: "Comprehensive Course",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-300",
    description: "Deep, well-structured tutorials with flowcharts, memory layouts, and executable examples on every C topic.",
    howToUse: "Read chapters on pointers, recursion, and file handling for rich diagrams."
  },
  {
    id: "res-learn-c",
    name: "Learn-C.org",
    url: "https://www.learn-c.org/",
    category: "3. Concept Guides & Tutorials",
    badge: "Interactive In-Browser",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
    description: "Free interactive C tutorial where you read concise lessons and complete inline code challenges directly in the browser.",
    howToUse: "Work through the advanced tutorials covering linked lists, dynamic memory, binary trees, and bitmasks."
  },
  {
    id: "res-datacode",
    name: "DataCode C Programming",
    url: "https://www.datacode.in/progamming/c",
    category: "3. Concept Guides & Tutorials",
    badge: "Indian Academic Curated",
    badgeColor: "bg-orange-100 text-orange-800 border-orange-300",
    description: "Indian university-curated notes on C programming, covering semester syllabi, common viva questions, and exam patterns.",
    howToUse: "Review for university engineering exams and technical campus interviews."
  },
  {
    id: "res-cppreference",
    name: "cppreference.com (C Reference)",
    url: "https://en.cppreference.com/w/c",
    category: "3. Concept Guides & Tutorials",
    badge: "ISO C Standard Specification",
    badgeColor: "bg-sky-100 text-sky-800 border-sky-300",
    description: "The official technical encyclopedia of the C language standard: exact function prototypes, header specs, and UB rules.",
    howToUse: "Look up exact parameter types and return value edge cases for standard library functions."
  },

  // 4. Practice & Problem Solving
  {
    id: "res-codechef-practice",
    name: "CodeChef C Practice Track",
    url: "https://www.codechef.com/practice",
    category: "4. Practice & Problem Solving",
    badge: "Start With This!",
    badgeColor: "bg-amber-200 text-amber-900 border-amber-400 font-black",
    description: "Graded algorithmic problem sets starting from basic input/output, conditionals, and math up to dynamic programming.",
    howToUse: "Start with beginner 500-1000 rating problems to build strong speed and problem-solving reflexes.",
    isImportant: true
  },
  {
    id: "res-hackerrank-c",
    name: "HackerRank C Domain Track",
    url: "https://www.hackerrank.com/domains/c",
    category: "4. Practice & Problem Solving",
    badge: "Domain Badges & Stars",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    description: "Structured C certification track with automated test suites: earn Gold Stars for C proficiency.",
    howToUse: "Solve problems under Introduction, Conditionals, Arrays, and Structs to earn your 5-Star C Badge."
  },
  {
    id: "res-exercism-c",
    name: "Exercism C Track",
    url: "https://exercism.org/tracks/c",
    category: "4. Practice & Problem Solving",
    badge: "Human Code Mentorship",
    badgeColor: "bg-purple-100 text-purple-800 border-purple-300",
    description: "70+ hands-on C programming exercises with automated tests and free 1-on-1 code reviews from experienced engineers.",
    howToUse: "Submit solutions through the Exercism CLI to learn idiomatic C formatting and clean pointer conventions."
  },
  {
    id: "res-leetcode",
    name: "LeetCode C Problemset",
    url: "https://leetcode.com/problemset/",
    category: "4. Practice & Problem Solving",
    badge: "FAANG Interview Prep",
    badgeColor: "bg-orange-100 text-orange-800 border-orange-300",
    description: "Industry-standard coding interview platform. Solve DSA problems in pure C (linked lists, trees, arrays).",
    howToUse: "Filter by Tag: Linked List, Tree, Binary Search, and select C as the programming language."
  }
];
