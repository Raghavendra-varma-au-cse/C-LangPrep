export interface PuzzleCard {
  id: string;
  levelNumber: number;
  tier: 'Beginner (Bananas 1-25)' | 'Apprentice (Bananas 26-50)' | 'Master (Bananas 51-75)' | 'Wizard (Bananas 76-100+)';
  title: string;
  themeStory: string;
  themeIcon: string;
  goalDescription: string;
  shuffledPieces: { id: string; code: string; hint: string }[];
  correctSequenceIds: string[];
  expectedOutput: string;
  conceptTeached: string;
  rewardPoints: number;
}

// Generate an extensive bank of 100+ progressive coding puzzle challenges!
const generate100Puzzles = (): PuzzleCard[] => {
  const puzzles: PuzzleCard[] = [];

  // Theme templates inspired by relatable everyday items
  const themes = [
    { name: "Coffee Vending Machine", icon: "☕", concept: "Variables & Output" },
    { name: "ATM Money Dispenser", icon: "💳", concept: "Conditionals (if-else)" },
    { name: "Traffic Crossing Signal", icon: "🚦", concept: "Loops & State" },
    { name: "Smart Refrigerator Alert", icon: "🥛", concept: "Threshold Checking" },
    { name: "Elevator Floor Mover", icon: "🛗", concept: "Loops & Counters" },
    { name: "Microwave Oven Timer", icon: "⏲️", concept: "Countdown Loops" },
    { name: "Smartphone Battery Warning", icon: "🔋", concept: "Boolean Flags" },
    { name: "Pizza Slice Calculator", icon: "🍕", concept: "Division & Modulo" },
    { name: "Movie Ticket Booker", icon: "🎟️", concept: "Nested Logic" },
    { name: "Step Counter Fitness Tracker", icon: "👟", concept: "Accumulators" },
    { name: "Automatic Cat Feeder", icon: "🐱", concept: "Time Delays & Functions" },
    { name: "School Bus Seating Grid", icon: "🚌", concept: "1D Arrays" },
    { name: "Library Book Return", icon: "📚", concept: "Date Overdue Logic" },
    { name: "Washing Machine Spin Cycle", icon: "🧺", concept: "While Loops" },
    { name: "Car Speedometer Radar", icon: "🚗", concept: "Speed Limits" },
    { name: "Game Character Health Bar", icon: "❤️", concept: "Damage Subtraction" },
    { name: "Air Conditioner Thermostat", icon: "❄️", concept: "Temperature Control" },
    { name: "Supermarket Barcode Scanner", icon: "🛒", concept: "String Matching" },
    { name: "Rocket Launch Countdown", icon: "🚀", concept: "Reverse for Loop" },
    { name: "Ice Cream Scoop Stacker", icon: "🍦", concept: "Pointers & Arrays" }
  ];

  for (let i = 1; i <= 100; i++) {
    const themeIdx = (i - 1) % themes.length;
    const currentTheme = themes[themeIdx];
    const tier =
      i <= 25
        ? 'Beginner (Bananas 1-25)'
        : i <= 50
        ? 'Apprentice (Bananas 26-50)'
        : i <= 75
        ? 'Master (Bananas 51-75)'
        : 'Wizard (Bananas 76-100+)';

    let pieces: { id: string; code: string; hint: string }[] = [];
    let correct: string[] = [];
    let expectedOutput = "";

    if (i <= 25) {
      // Beginner: 3-4 Line Assembly
      pieces = [
        { id: `p-${i}-1`, code: '#include <stdio.h>', hint: 'Always open the toolbox first!' },
        { id: `p-${i}-2`, code: 'int main(void) {', hint: 'The main door of the program' },
        { id: `p-${i}-3`, code: `    int value = ${i * 5};\n    printf("Level ${i} Result: %d\\n", value);`, hint: 'Do the calculation and speak' },
        { id: `p-${i}-4`, code: '    return 0;\n}', hint: 'Finish with thumbs-up 0' }
      ];
      correct = [`p-${i}-1`, `p-${i}-2`, `p-${i}-3`, `p-${i}-4`];
      expectedOutput = `Level ${i} Result: ${i * 5}`;
    } else if (i <= 50) {
      // Apprentice: Decision Making (if-else)
      pieces = [
        { id: `p-${i}-1`, code: '#include <stdio.h>\nint main(void) {', hint: 'Header & Main setup' },
        { id: `p-${i}-2`, code: `    int sensor = ${i * 2};`, hint: 'Read the sensor value' },
        { id: `p-${i}-3`, code: `    if (sensor > 50) {\n        printf("${currentTheme.name}: ACTION TRIGGERED!\\n");\n    } else {\n        printf("${currentTheme.name}: STANDBY\\n");\n    }`, hint: 'Evaluate threshold condition' },
        { id: `p-${i}-4`, code: '    return 0;\n}', hint: 'Exit program' }
      ];
      correct = [`p-${i}-1`, `p-${i}-2`, `p-${i}-3`, `p-${i}-4`];
      expectedOutput = `${currentTheme.name}: ${i * 2 > 50 ? 'ACTION TRIGGERED!' : 'STANDBY'}`;
    } else if (i <= 75) {
      // Master: Loops & Arrays
      pieces = [
        { id: `p-${i}-1`, code: '#include <stdio.h>\nint main(void) {', hint: 'Boilerplate initialization' },
        { id: `p-${i}-2`, code: `    int count = ${((i - 50) % 5) + 2};`, hint: 'Set loop limit' },
        { id: `p-${i}-3`, code: '    for (int k = 1; k <= count; k++) {', hint: 'Start repeating loop' },
        { id: `p-${i}-4`, code: `        printf("${currentTheme.icon} Step %d of %d\\n", k, count);\n    }`, hint: 'Loop body print statement' },
        { id: `p-${i}-5`, code: '    return 0;\n}', hint: 'Return 0 and close' }
      ];
      correct = [`p-${i}-1`, `p-${i}-2`, `p-${i}-3`, `p-${i}-4`, `p-${i}-5`];
      expectedOutput = `${currentTheme.icon} Step 1 of ${((i - 50) % 5) + 2}`;
    } else {
      // Wizard: Pointers & Structs
      pieces = [
        { id: `p-${i}-1`, code: '#include <stdio.h>\nstruct Device { int power; };', hint: 'Define compound structure' },
        { id: `p-${i}-2`, code: 'int main(void) {', hint: 'Main function entry' },
        { id: `p-${i}-3`, code: `    struct Device d = {${i * 10}};\n    struct Device *ptr = &d;`, hint: 'Point to device in memory' },
        { id: `p-${i}-4`, code: `    printf("${currentTheme.name} Power: %d Watts\\n", ptr->power);`, hint: 'Read with arrow -> pointer' },
        { id: `p-${i}-5`, code: '    return 0;\n}', hint: 'Program termination' }
      ];
      correct = [`p-${i}-1`, `p-${i}-2`, `p-${i}-3`, `p-${i}-4`, `p-${i}-5`];
      expectedOutput = `${currentTheme.name} Power: ${i * 10} Watts`;
    }

    // Shuffle pieces for the puzzle challenge
    const shuffled = [...pieces].sort(() => (Math.random() > 0.5 ? 1 : -1));

    puzzles.push({
      id: `puzzle-${i}`,
      levelNumber: i,
      tier,
      title: `Mission ${i}: ${currentTheme.name}`,
      themeStory: `The ${currentTheme.name} needs your help! The wires got mixed up. Arrange the code blocks in the correct order to make the machine run.`,
      themeIcon: currentTheme.icon,
      goalDescription: `Arrange the code blocks to produce: "${expectedOutput.split('\n')[0]}"`,
      shuffledPieces: shuffled,
      correctSequenceIds: correct,
      expectedOutput,
      conceptTeached: currentTheme.concept,
      rewardPoints: 25 + (i * 5)
    });
  }

  return puzzles;
};

export const CODE_MONKEY_100_PUZZLES: PuzzleCard[] = generate100Puzzles();
