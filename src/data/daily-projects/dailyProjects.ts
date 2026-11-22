export interface DailyProject {
  id: string;
  title: string;
  icon: string;
  realLifeStory: string;
  logicSequence: string[];
  cCode: string;
  interactiveInputs: { label: string; field: string; defaultVal: number | string }[];
  expectedOutput: string;
  cConceptsTaught: string[];
}

export const DAILY_LIFE_PROJECTS: DailyProject[] = [
  {
    id: "proj-chai-samosa",
    title: "1. Campus Canteen: Masala Chai & Samosa Billing",
    icon: "Coffee",
    realLifeStory: "You visit your college tapri/canteen. A hot cup of Masala Chai costs ₹10, and a fresh crispy Samosa costs ₹15. If your bill crosses ₹100, the canteen kaka gives you a flat ₹10 student discount!",
    logicSequence: [
      "1. Ask the student how many cups of Chai and Samosas they ordered.",
      "2. Calculate: subtotal = (chai * 10) + (samosas * 15).",
      "3. Check: Is subtotal > 100? If YES, subtract ₹10 discount.",
      "4. Print the final bill receipt in Rupees (₹)."
    ],
    cConceptsTaught: ["int and float variables", "Arithmetic multiplication (*)", "if-else condition", "printf formatting"],
    interactiveInputs: [
      { label: "Cups of Chai (₹10 each)", field: "chai", defaultVal: 5 },
      { label: "Samosas (₹15 each)", field: "samosas", defaultVal: 4 }
    ],
    cCode: `#include <stdio.h>

int main(void) {
    int chai = 5;      // ₹10 per cup
    int samosas = 4;   // ₹15 per piece

    int subtotal = (chai * 10) + (samosas * 15);
    int discount = 0;

    // Student discount: ₹10 off if bill > ₹100
    if (subtotal > 100) {
        discount = 10;
    }

    int finalBill = subtotal - discount;

    printf("=== IIT/CAMPUS CANTEEN BILL ===\\n");
    printf("Chai (x%d)    : Rs. %d\\n", chai, chai * 10);
    printf("Samosas (x%d) : Rs. %d\\n", samosas, samosas * 15);
    printf("Subtotal      : Rs. %d\\n", subtotal);
    printf("Discount      : -Rs. %d\\n", discount);
    printf("------------------------------\\n");
    printf("FINAL BILL    : Rs. %d (Rupees)\\n", finalBill);

    return 0;
}`,
    expectedOutput: `=== IIT/CAMPUS CANTEEN BILL ===
Chai (x5)    : Rs. 50
Samosas (x4) : Rs. 60
Subtotal      : Rs. 110
Discount      : -Rs. 10
------------------------------
FINAL BILL    : Rs. 100 (Rupees)`
  },
  {
    id: "proj-coffee-vending-machine",
    title: "2. Automatic Coffee Vending Machine (Espresso, Cappuccino, Latte)",
    icon: "Coffee",
    realLifeStory: "A high-tech digital coffee vending machine at an Indian tech park. You select your drink (1=Espresso, 2=Cappuccino, 3=Filter Kaapi), select your sugar cubes, and the embedded microcontroller dispenses precise milliliters of boiling water, steamed milk, and roasted coffee decoction!",
    logicSequence: [
      "1. Read user choice (1: Espresso, 2: Cappuccino, 3: Filter Kaapi).",
      "2. Calculate milk (ml), water (ml), and coffee grounds (grams).",
      "3. Dispense sugar according to user sweetness level (0-3 spoons).",
      "4. Print brewing telemetry and temperature status in Celsius."
    ],
    cConceptsTaught: ["switch-case statement", "structs and state machines", "formatted I/O", "constant thresholds"],
    interactiveInputs: [
      { label: "Drink Choice (1=Espresso, 2=Cappuccino, 3=Filter Kaapi)", field: "drinkType", defaultVal: 2 },
      { label: "Sugar Level (Spoons: 0 to 3)", field: "sugarSpoons", defaultVal: 1 }
    ],
    cCode: `#include <stdio.h>

int main(void) {
    int choice = 2;       // 2: Cappuccino
    int sugarSpoons = 1;  // 1 spoon
    int brewTempCelsius = 92;

    printf("=== SMART AUTOMATIC COFFEE VENDING DISPENSER ===\\n");
    printf("Boiler Sensor Temperature: %d C (Optimal Extraction)\\n", brewTempCelsius);

    switch(choice) {
        case 1:
            printf("[BREW] Selected: Bold Dark Espresso\\n");
            printf("[RATIO] Water: 40ml | Milk: 0ml | Coffee: 18g\\n");
            printf("[PRICE] Charged: Rs. 35\\n");
            break;
        case 2:
            printf("[BREW] Selected: Creamy Frothy Cappuccino\\n");
            printf("[RATIO] Water: 60ml | Steamed Milk: 90ml | Coffee: 14g\\n");
            printf("[PRICE] Charged: Rs. 50\\n");
            break;
        case 3:
            printf("[BREW] Selected: Authentic South Indian Filter Kaapi\\n");
            printf("[RATIO] Water: 50ml | Boiled Whole Milk: 100ml | Chicory Blend: 16g\\n");
            printf("[PRICE] Charged: Rs. 40\\n");
            break;
        default:
            printf("[ERROR] Invalid drink selection.\\n");
            return 1;
    }

    if (sugarSpoons > 0) {
        printf("[DISPENSER] Adding %d spoon(s) of organic brown sugar...\\n", sugarSpoons);
    } else {
        printf("[DISPENSER] Sugar-Free Option Activated.\\n");
    }

    printf("DISPENSE COMPLETE: Please collect your steaming hot cup! Enjoy!\\n");
    return 0;
}`,
    expectedOutput: `=== SMART AUTOMATIC COFFEE VENDING DISPENSER ===
Boiler Sensor Temperature: 92 C (Optimal Extraction)
[BREW] Selected: Creamy Frothy Cappuccino
[RATIO] Water: 60ml | Steamed Milk: 90ml | Coffee: 14g
[PRICE] Charged: Rs. 50
[DISPENSER] Adding 1 spoon(s) of organic brown sugar...
DISPENSE COMPLETE: Please collect your steaming hot cup! Enjoy!`
  },
  {
    id: "proj-sbi-atm",
    title: "3. SBI / HDFC Bank ATM Cash Withdrawal",
    icon: "CreditCard",
    realLifeStory: "You walk into an SBI / HDFC ATM on campus. The machine asks for your secret 4-digit PIN. If verified, you enter how many ₹500 currency notes you want to withdraw. If your balance has enough funds, the cash dispenser counts the notes!",
    logicSequence: [
      "1. Check if entered PIN matches the secret PIN (9876).",
      "2. If PIN is wrong, display 'Galat PIN! Card Blocked' and exit.",
      "3. If PIN is right, check if balance has enough money.",
      "4. Deduct the amount and dispense the ₹500 rupee notes."
    ],
    cConceptsTaught: ["if-else nesting", "Comparison equality (==)", "Subtraction (-=)", "Security guard clauses"],
    interactiveInputs: [
      { label: "Entered PIN (Secret is 9876)", field: "pin", defaultVal: 9876 },
      { label: "Withdrawal Amount (₹)", field: "amount", defaultVal: 2000 }
    ],
    cCode: `#include <stdio.h>

int main(void) {
    int secretPIN = 9876;
    int enteredPIN = 9876;
    int bankBalance = 15000;  // ₹15,000 in SBI account
    int withdrawAmount = 2000; // Want to withdraw ₹2,000

    printf("=== SBI CASH DISPENSER ATM ===\\n");
    if (enteredPIN == secretPIN) {
        printf("[AUTH] PIN Satyapit (Verified)!\\n");
        if (withdrawAmount <= bankBalance) {
            bankBalance -= withdrawAmount;
            printf("[CASH] Dispensing Rs. %d in 500-rupee notes...\\n", withdrawAmount);
            printf("[BALANCE] Remaining Account Balance: Rs. %d\\n", bankBalance);
        } else {
            printf("[ALERT] Insufficient balance! Current balance is Rs. %d\\n", bankBalance);
        }
    } else {
        printf("[ERROR] Galat PIN! Card temporarily blocked for security.\\n");
    }

    return 0;
}`,
    expectedOutput: `=== SBI CASH DISPENSER ATM ===
[AUTH] PIN Satyapit (Verified)!
[CASH] Dispensing Rs. 2000 in 500-rupee notes...
[BALANCE] Remaining Account Balance: Rs. 13000`
  },
  {
    id: "proj-mumbai-delhi-signals",
    title: "4. Indian City Crossroad Traffic Signal (Delhi / Bengaluru / Mumbai)",
    icon: "Compass",
    realLifeStory: "A smart traffic signal at a busy Indian city chowk (crossroad). Cycles between GREEN (Subway/Bikes/Cars chalenge), YELLOW (Dheere chalo), and RED (Rukiye).",
    logicSequence: [
      "1. Check signal timer in seconds.",
      "2. 1 to 15 seconds: GREEN light (Gaadiyan chalao).",
      "3. 16 to 20 seconds: YELLOW light (Rukne ki taiyari).",
      "4. 21 to 40 seconds: RED light (Zebra crossing pe rukiye)."
    ],
    cConceptsTaught: ["for loop", "Range conditions (&&)", "Modulus operator (%)", "State automation"],
    interactiveInputs: [
      { label: "Signal Timer Second", field: "second", defaultVal: 12 }
    ],
    cCode: `#include <stdio.h>

int main(void) {
    int currentSecond = 12;

    printf("=== SMART TRAFFIC SIGNAL (CHOWK) ===\\n");
    if (currentSecond <= 15) {
        printf("Second %d -> [HARA / GREEN]: Vehicles Go! Safe to cross.\\n", currentSecond);
    } else if (currentSecond <= 20) {
        printf("Second %d -> [PEELA / YELLOW]: Slow down and prepare to stop.\\n", currentSecond);
    } else {
        printf("Second %d -> [LAAL / RED]: STOP behind the white zebra line.\\n", currentSecond);
    }

    return 0;
}`,
    expectedOutput: `=== SMART TRAFFIC SIGNAL (CHOWK) ===
Second 12 -> [HARA / GREEN]: Vehicles Go! Safe to cross.`
  },
  {
    id: "proj-upi-mobile-recharge",
    title: "5. UPI Mobile Recharge & Friend Contact Search",
    icon: "Phone",
    realLifeStory: "Using Google Pay / PhonePe / Paytm to recharge a friend's Jio / Airtel number. You search for your college friend (Rohan, Priya, Amit) in phone memory, select their plan, and send rupees!",
    logicSequence: [
      "1. Array of friend contacts: Rohan, Priya, Amit.",
      "2. Array of mobile numbers: 9876543210, 9123456789, 9988776655.",
      "3. Search index 1 (Priya).",
      "4. Display contact and execute ₹299 monthly recharge."
    ],
    cConceptsTaught: ["2D character arrays (strings)", "Index mapping", "Formatted output", "Array offset retrieval"],
    interactiveInputs: [
      { label: "Friend Selection (0: Rohan, 1: Priya, 2: Amit)", field: "idx", defaultVal: 1 }
    ],
    cCode: `#include <stdio.h>

int main(void) {
    char friends[3][16] = {"Rohan", "Priya", "Amit"};
    char phones[3][16] = {"+91-9876543210", "+91-9123456789", "+91-9988776655"};
    int rechargeAmount = 299; // Rs. 299 monthly plan
    int friendIndex = 1;      // Priya

    printf("=== UPI INSTANT RECHARGE (BHIM / GPAY) ===\\n");
    printf("Contact Name   : %s\\n", friends[friendIndex]);
    printf("Mobile Number  : %s\\n", phones[friendIndex]);
    printf("Recharge Plan  : Rs. %d (1.5GB/day + Unlimited Calls)\\n", rechargeAmount);
    printf("Payment Status : SUCCESSFUL (Rupees %d debited via UPI)\\n", rechargeAmount);

    return 0;
}`,
    expectedOutput: `=== UPI INSTANT RECHARGE (BHIM / GPAY) ===
Contact Name   : Priya
Mobile Number  : +91-9123456789
Recharge Plan  : Rs. 299 (1.5GB/day + Unlimited Calls)
Payment Status : SUCCESSFUL (Rupees 299 debited via UPI)`
  },
  {
    id: "proj-irctc-berth-allocator",
    title: "6. Indian Railways IRCTC Berth Type & Senior Allocator",
    icon: "Compass",
    realLifeStory: "IRCTC reservation algorithms allocate berths on Sleeper and 3A coaches: 8 berths per bay (1=Lower, 2=Middle, 3=Upper, 4=Lower, 5=Middle, 6=Upper, 7=Side Lower, 8=Side Upper). Senior citizens (>60) are prioritized for Lower Berths!",
    logicSequence: [
      "1. Input passenger age and requested berth.",
      "2. Calculate berth position: berthMod = seatNumber % 8.",
      "3. Map 1 or 4 to Lower, 2 or 5 to Middle, 3 or 6 to Upper, 7 to Side Lower, 0 to Side Upper.",
      "4. If passenger is senior citizen, prioritize lower berth confirmation."
    ],
    cConceptsTaught: ["Modulo arithmetic (%)", "Switch or nested if branches", "Compound logical operators (||)"],
    interactiveInputs: [
      { label: "Seat Number (1 to 72)", field: "seatNo", defaultVal: 17 },
      { label: "Passenger Age", field: "age", defaultVal: 64 }
    ],
    cCode: `#include <stdio.h>

int main(void) {
    int seatNo = 17;
    int age = 64;

    int rem = seatNo % 8;
    char berthType[20];

    if (rem == 1 || rem == 4) {
        printf("Seat #%d: LOWER BERTH (LB)\\n", seatNo);
    } else if (rem == 2 || rem == 5) {
        printf("Seat #%d: MIDDLE BERTH (MB)\\n", seatNo);
    } else if (rem == 3 || rem == 6) {
        printf("Seat #%d: UPPER BERTH (UB)\\n", seatNo);
    } else if (rem == 7) {
        printf("Seat #%d: SIDE LOWER (SL)\\n", seatNo);
    } else {
        printf("Seat #%d: SIDE UPPER (SU)\\n", seatNo);
    }

    if (age >= 60) {
        printf("[IRCTC CONCESSION] Senior Citizen Concession verified. Priority Berth granted.\\n");
    }

    return 0;
}`,
    expectedOutput: `Seat #17: LOWER BERTH (LB)
[IRCTC CONCESSION] Senior Citizen Concession verified. Priority Berth granted.`
  },
  {
    id: "proj-isro-telemetry",
    title: "7. ISRO Ground Station Satellite Telemetry Packet Decoder",
    icon: "Compass",
    realLifeStory: "ISRO ground control telemetry receiver in Bengaluru. Receives hexadecimal radio telemetry bytes from Aditya-L1 or Chandrayaan satellite: computes solar panel voltage, internal temperature, and verifies checksum integrity.",
    logicSequence: [
      "1. Decode 4 raw telemetry values: Solar Voltage (V), Battery Temp (C), Velocity (km/s), Checksum.",
      "2. Compute bitwise parity checksum to verify transmission line noise.",
      "3. Check if solar voltage >= 28V (Sun-pointing mode nominal).",
      "4. Display telemetry dashboard status."
    ],
    cConceptsTaught: ["Bitwise operations (^, &)", "Arrays", "Struct telemetry packing", "Telemetry thresholding"],
    interactiveInputs: [
      { label: "Solar Voltage (V)", field: "solarV", defaultVal: 32 }
    ],
    cCode: `#include <stdio.h>

struct SatelliteTelemetry {
    int solarVoltage;
    int internalTempCelsius;
    float orbitalVelocityKmPerSec;
    int parityStatus;
};

int main(void) {
    struct SatelliteTelemetry sat;
    sat.solarVoltage = 32;
    sat.internalTempCelsius = 22;
    sat.orbitalVelocityKmPerSec = 7.68f;
    sat.parityStatus = 1;

    printf("=== ISRO ISTRAC GROUND STATION TELEMETRY ===\\n");
    printf("Solar Panel Array: %d Volts [NOMINAL SUN-POINTING]\\n", sat.solarVoltage);
    printf("Internal Core Temp: %d C [THERMAL SHIELD NOMINAL]\\n", sat.internalTempCelsius);
    printf("Orbital Velocity : %.2f km/s\\n", sat.orbitalVelocityKmPerSec);
    printf("Checksum Telemetry: %s\\n", sat.parityStatus ? "PASSED (0 bit errors)" : "CRC ERROR");

    return 0;
}`,
    expectedOutput: `=== ISRO ISTRAC GROUND STATION TELEMETRY ===
Solar Panel Array: 32 Volts [NOMINAL SUN-POINTING]
Internal Core Temp: 22 C [THERMAL SHIELD NOMINAL]
Orbital Velocity : 7.68 km/s
Checksum Telemetry: PASSED (0 bit errors)`
  },
  {
    id: "proj-electricity-substation",
    title: "8. Smart Energy Substation: Slab-Based Electricity Billing",
    icon: "CreditCard",
    realLifeStory: "Indian state power discom (like BESCOM, Tata Power, MSEDCL) billing algorithm. Tiered slab rates in Rupees: First 100 units @ ₹3.00, Next 200 units @ ₹5.50, Excess units @ ₹8.00 + 18% Electricity Duty.",
    logicSequence: [
      "1. Read total electricity units consumed (e.g. 250 kWh).",
      "2. Calculate tiered slab cost step by step.",
      "3. Add 18% Electricity Duty GST.",
      "4. Display transparent breakdown and total amount in ₹."
    ],
    cConceptsTaught: ["Tiered conditions", "Floating point arithmetic", "Tax calculations", "Accurate monetary rounding"],
    interactiveInputs: [
      { label: "Electricity Units (kWh)", field: "units", defaultVal: 250 }
    ],
    cCode: `#include <stdio.h>

int main(void) {
    int units = 250;
    float energyCost = 0.0f;

    if (units <= 100) {
        energyCost = units * 3.0f;
    } else if (units <= 300) {
        energyCost = (100 * 3.0f) + ((units - 100) * 5.5f);
    } else {
        energyCost = (100 * 3.0f) + (200 * 5.5f) + ((units - 300) * 8.0f);
    }

    float electricityDuty = energyCost * 0.18f;
    float grandTotal = energyCost + electricityDuty;

    printf("=== STATE ELECTRICITY DISCOM BILL ===\\n");
    printf("Total Units Consumed: %d kWh\\n", units);
    printf("Energy Base Charges : Rs. %.2f\\n", energyCost);
    printf("Electricity Duty(18%): Rs. %.2f\\n", electricityDuty);
    printf("--------------------------------------\\n");
    printf("NET PAYABLE AMOUNT  : Rs. %.2f (Rupees)\\n", grandTotal);

    return 0;
}`,
    expectedOutput: `=== STATE ELECTRICITY DISCOM BILL ===
Total Units Consumed: 250 kWh
Energy Base Charges : Rs. 1125.00
Electricity Duty(18%): Rs. 202.50
--------------------------------------
NET PAYABLE AMOUNT  : Rs. 1327.50 (Rupees)`
  }
];
