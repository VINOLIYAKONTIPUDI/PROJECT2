// Complete EV Database with all manufacturers including luxury and premium brands
const completeEVDatabase = [
  // Tata Motors EVs
  {
    id: 1,
    make: "Tata",
    model: "Tiago.ev",
    fullName: "Tata Tiago.ev",
    bodyType: "Hatchback",
    priceMin: 7.99,
    priceMax: 11.99,
    batteryOptions: [
      { capacity: 19.2, type: "MR", range: 250 },
      { capacity: 24, type: "LR", range: 315 },
    ],
    motorPower: 75,
    torque: 114,
    maxRange: 315,
    chargingType: "7.2 kW AC",
    topSpeed: 120,
    groundClearance: 181,
    bootSpace: 316,
    variants: ["XE MR", "XT MR", "XT LR"],
    features: ["Entry Level", "City Friendly", "Compact Design"],
    status: "Available",
    seating: 5,
    dimensions: "3993 x 1677 x 1537 mm",
    warranty: "8 years/1,60,000 km battery",
    acceleration: "0-100 km/h in 10.0s",
  },
  {
    id: 2,
    make: "Tata",
    model: "Punch.ev",
    fullName: "Tata Punch.ev",
    bodyType: "SUV",
    priceMin: 9.99,
    priceMax: 14.99,
    batteryOptions: [
      { capacity: 25, type: "MR", range: 315 },
      { capacity: 35, type: "LR", range: 421 },
    ],
    motorPower: 120,
    torque: 190,
    maxRange: 421,
    chargingType: "7.2 kW AC",
    topSpeed: 120,
    groundClearance: 187,
    bootSpace: 366,
    variants: ["Smart+", "Adventure+", "Empowered+"],
    features: ["Compact SUV", "High Ground Clearance", "Spacious Interior"],
    status: "Available",
    seating: 5,
    dimensions: "3993 x 1811 x 1606 mm",
    warranty: "8 years/1,60,000 km battery",
    acceleration: "0-100 km/h in 9.5s",
  },
  {
    id: 3,
    make: "Tata",
    model: "Nexon.ev",
    fullName: "Tata Nexon.ev",
    bodyType: "SUV",
    priceMin: 12.49,
    priceMax: 17.19,
    batteryOptions: [
      { capacity: 30, type: "MR", range: 325 },
      { capacity: 40.5, type: "LR", range: 453 },
      { capacity: 45, type: "Max", range: 489 },
    ],
    motorPower: 149,
    torque: 215,
    maxRange: 489,
    chargingType: "7.2 kW AC, 50 kW DC",
    topSpeed: 120,
    groundClearance: 209,
    bootSpace: 350,
    variants: ["Creative", "Fearless", "Fearless+", "Empowered+"],
    features: ["Most Popular", "Fast Charging", "Premium Features"],
    status: "Available",
    seating: 5,
    dimensions: "3993 x 1811 x 1606 mm",
    warranty: "8 years/1,60,000 km battery",
    acceleration: "0-100 km/h in 8.9s",
  },
  {
    id: 4,
    make: "Tata",
    model: "Curvv.ev",
    fullName: "Tata Curvv.ev",
    bodyType: "Coupe SUV",
    priceMin: 17.0,
    priceMax: 20.0,
    batteryOptions: [{ capacity: 45, type: "Standard", range: 400 }],
    motorPower: 150,
    torque: 215,
    maxRange: 400,
    chargingType: "DC Fast Charging",
    topSpeed: 120,
    groundClearance: 200,
    bootSpace: 400,
    variants: ["Creative", "Accomplished", "Empowered+"],
    features: ["Coupe Design", "Premium Styling", "Latest Launch"],
    status: "Available",
    seating: 5,
    dimensions: "4308 x 1810 x 1637 mm",
    warranty: "8 years/1,60,000 km battery",
    acceleration: "0-100 km/h in 8.5s",
  },
  {
    id: 5,
    make: "Tata",
    model: "Harrier.ev",
    fullName: "Tata Harrier.ev",
    bodyType: "SUV",
    priceMin: 21.49,
    priceMax: 25.0,
    batteryOptions: [{ capacity: 50, type: "Standard", range: 592 }],
    motorPower: 201,
    torque: 350,
    maxRange: 592,
    chargingType: "11 kW AC, 70 kW DC",
    topSpeed: 140,
    groundClearance: 205,
    bootSpace: 425,
    variants: ["Smart", "Pure", "Adventure", "Fearless"],
    features: ["Premium SUV", "Long Range", "Luxury Interior"],
    status: "Available",
    seating: 5,
    dimensions: "4598 x 1894 x 1706 mm",
    warranty: "8 years/1,60,000 km battery",
    acceleration: "0-100 km/h in 7.8s",
  },
  {
    id: 6,
    make: "Tata",
    model: "Safari.ev",
    fullName: "Tata Safari.ev",
    bodyType: "SUV",
    priceMin: 22.0,
    priceMax: 25.0,
    batteryOptions: [{ capacity: 50, type: "Standard", range: 550 }],
    motorPower: 201,
    torque: 350,
    maxRange: 550,
    chargingType: "11 kW AC, 70 kW DC",
    topSpeed: 140,
    groundClearance: 205,
    bootSpace: 447,
    variants: ["Smart", "Pure", "Adventure", "Accomplished"],
    features: ["7-Seater", "Family SUV", "Premium Features"],
    status: "Available",
    seating: 7,
    dimensions: "4661 x 1894 x 1786 mm",
    warranty: "8 years/1,60,000 km battery",
    acceleration: "0-100 km/h in 8.0s",
  },
  {
    id: 7,
    make: "Tata",
    model: "Tigor.ev",
    fullName: "Tata Tigor.ev",
    bodyType: "Sedan",
    priceMin: 11.99,
    priceMax: 13.99,
    batteryOptions: [{ capacity: 26, type: "Standard", range: 306 }],
    motorPower: 75,
    torque: 170,
    maxRange: 306,
    chargingType: "15 kW DC",
    topSpeed: 120,
    groundClearance: 165,
    bootSpace: 316,
    variants: ["XE", "XM", "XT"],
    features: ["Fleet Focused", "Sedan Comfort", "Commercial Use"],
    status: "Available",
    seating: 5,
    dimensions: "3993 x 1677 x 1532 mm",
    warranty: "8 years/1,60,000 km battery",
    acceleration: "0-100 km/h in 10.2s",
  },

  // Mahindra EVs
  {
    id: 8,
    make: "Mahindra",
    model: "BE 6e",
    fullName: "Mahindra BE 6e",
    bodyType: "SUV",
    priceMin: 18.9,
    priceMax: 30.5,
    batteryOptions: [
      { capacity: 59, type: "Standard", range: 556 },
      { capacity: 79, type: "Extended", range: 682 },
    ],
    motorPower: 282,
    torque: 380,
    maxRange: 682,
    chargingType: "175 kW DC Fast Charging",
    topSpeed: 200,
    groundClearance: 207,
    bootSpace: 455,
    variants: ["Pack One", "Pack Two", "Pack Three"],
    features: ["INGLO Platform", "Advanced ADAS", "Premium Interior"],
    status: "Available",
    seating: 5,
    dimensions: "4371 x 1907 x 1627 mm",
    warranty: "Lifetime battery warranty",
    acceleration: "0-100 km/h in 6.7s",
  },
  {
    id: 9,
    make: "Mahindra",
    model: "XEV 9e",
    fullName: "Mahindra XEV 9e",
    bodyType: "SUV",
    priceMin: 21.9,
    priceMax: 31.25,
    batteryOptions: [
      { capacity: 59, type: "Standard", range: 542 },
      { capacity: 79, type: "Extended", range: 656 },
    ],
    motorPower: 282,
    torque: 380,
    maxRange: 656,
    chargingType: "175 kW DC Fast Charging",
    topSpeed: 200,
    groundClearance: 207,
    bootSpace: 663,
    variants: ["Pack One", "Pack Two", "Pack Three"],
    features: ["Triple Display", "7 Airbags", "360° Camera"],
    status: "Available",
    seating: 5,
    dimensions: "4789 x 1907 x 1690 mm",
    warranty: "Lifetime battery warranty",
    acceleration: "0-100 km/h in 6.8s",
  },
  {
    id: 10,
    make: "Mahindra",
    model: "Treo Plus",
    fullName: "Mahindra Treo Plus",
    bodyType: "three-wheeler",
    priceMin: 3.58,
    priceMax: 3.58,
    batteryOptions: [{ capacity: 8, type: "Li-ion", range: 150 }],
    motorPower: 8,
    torque: 42,
    maxRange: 150,
    chargingType: "Standard AC",
    topSpeed: 55,
    groundClearance: 160,
    bootSpace: 0,
    variants: ["Standard"],
    features: ["Direct Drive", "Low Maintenance", "Easy to Drive"],
    status: "Available",
    seating: 4,
    dimensions: "2655 x 1335 x 1693 mm",
    warranty: "3 years battery",
    acceleration: "0-40 km/h in 8.0s",
  },

  // MG Motor EVs
  {
    id: 11,
    make: "MG",
    model: "ZS EV",
    fullName: "MG ZS EV",
    bodyType: "SUV",
    priceMin: 17.99,
    priceMax: 20.49,
    batteryOptions: [{ capacity: 50.3, type: "Standard", range: 461 }],
    motorPower: 177,
    torque: 280,
    maxRange: 461,
    chargingType: "7.4 kW AC, 50 kW DC",
    topSpeed: 140,
    groundClearance: 161,
    bootSpace: 448,
    variants: ["Executive", "Excite Pro", "Exclusive Plus", "Essence"],
    features: ["i-SMART Technology", "Premium Interior", "Advanced Safety"],
    status: "Available",
    seating: 5,
    dimensions: "4323 x 1809 x 1649 mm",
    warranty: "8 years/1,50,000 km battery",
    acceleration: "0-100 km/h in 8.5s",
  },
  {
    id: 12,
    make: "MG",
    model: "Comet EV",
    fullName: "MG Comet EV",
    bodyType: "Hatchback",
    priceMin: 9.56,
    priceMax: 9.96,
    batteryOptions: [{ capacity: 17.3, type: "Standard", range: 230 }],
    motorPower: 42,
    torque: 110,
    maxRange: 230,
    chargingType: "3.3 kW AC, 7.4 kW AC",
    topSpeed: 105,
    groundClearance: 180,
    bootSpace: 270,
    variants: ["Exclusive", "Exclusive FC"],
    features: ["Ultra Compact", "City Friendly", "55+ Connected Features"],
    status: "Available",
    seating: 4,
    dimensions: "2974 x 1505 x 1640 mm",
    warranty: "8 years/1,50,000 km battery",
    acceleration: "0-100 km/h in 12.7s",
  },
  {
    id: 13,
    make: "MG",
    model: "Windsor EV",
    fullName: "MG Windsor EV",
    bodyType: "SUV",
    priceMin: 9.99,
    priceMax: 18.09,
    batteryOptions: [
      { capacity: 38, type: "Standard", range: 331 },
      { capacity: 52.9, type: "Pro", range: 449 },
    ],
    motorPower: 136,
    torque: 200,
    maxRange: 449,
    chargingType: "7.4 kW AC, 60 kW DC",
    topSpeed: 140,
    groundClearance: 200,
    bootSpace: 521,
    variants: ["Exclusive", "Essence", "Exclusive Pro", "Essence Pro"],
    features: ["Aero-Lounge Seats", "Infinity View Glass Roof", "BaaS Program"],
    status: "Available",
    seating: 5,
    dimensions: "4295 x 1850 x 1677 mm",
    warranty: "Lifetime battery warranty",
    acceleration: "0-100 km/h in 9.8s",
  },

  // Citroën EVs
  {
    id: 14,
    make: "Citroën",
    model: "eC3",
    fullName: "Citroën eC3",
    bodyType: "Hatchback",
    priceMin: 12.84,
    priceMax: 12.9,
    batteryOptions: [{ capacity: 29.2, type: "Standard", range: 320 }],
    motorPower: 57,
    torque: 143,
    maxRange: 320,
    chargingType: "15 Amp AC, DC Fast Charging",
    topSpeed: 107,
    groundClearance: 180,
    bootSpace: 315,
    variants: ["Live", "Feel", "Shine"],
    features: ["10.2-inch Touchscreen", "Eco Mode", "Regenerative Braking"],
    status: "Available",
    seating: 5,
    dimensions: "3981 x 1733 x 1669 mm",
    warranty: "7 years/1,40,000 km battery",
    acceleration: "0-100 km/h in 12.1s",
  },
  {
    id: 15,
    make: "Citroën",
    model: "Basalt EV",
    fullName: "Citroën Basalt EV",
    bodyType: "Coupe SUV",
    priceMin: 14.0,
    priceMax: 17.0,
    batteryOptions: [{ capacity: 35, type: "Standard", range: 350 }],
    motorPower: 110,
    torque: 200,
    maxRange: 350,
    chargingType: "7.4 kW AC, 50 kW DC",
    topSpeed: 130,
    groundClearance: 200,
    bootSpace: 470,
    variants: ["You", "Plus", "Max"],
    features: ["SUV Coupe Design", "Modern Connectivity", "Advanced Safety"],
    status: "Coming Soon",
    seating: 5,
    dimensions: "4352 x 1765 x 1593 mm",
    warranty: "8 years/1,60,000 km battery",
    acceleration: "0-100 km/h in 10.5s",
  },

  // Audi EVs
  {
    id: 16,
    make: "Audi",
    model: "Q8 e-tron",
    fullName: "Audi Q8 e-tron",
    bodyType: "SUV",
    priceMin: 115.0,
    priceMax: 132.0,
    batteryOptions: [
      { capacity: 95, type: "Q8 50", range: 491 },
      { capacity: 114, type: "Q8 55", range: 600 },
    ],
    motorPower: 408,
    torque: 664,
    maxRange: 600,
    chargingType: "170 kW DC Fast Charging",
    topSpeed: 200,
    groundClearance: 200,
    bootSpace: 569,
    variants: ["50 Quattro", "55 Quattro", "Sportback"],
    features: ["Quattro AWD", "8 Airbags", "Audi Pre-Sense", "360° Camera"],
    status: "Available",
    seating: 5,
    dimensions: "4915 x 1937 x 1633 mm",
    warranty: "8 years battery warranty",
    acceleration: "0-100 km/h in 5.6s",
  },
  {
    id: 17,
    make: "Audi",
    model: "e-tron GT Quattro",
    fullName: "Audi e-tron GT Quattro",
    bodyType: "Sedan",
    priceMin: 172.0,
    priceMax: 172.0,
    batteryOptions: [{ capacity: 93, type: "Standard", range: 500 }],
    motorPower: 476,
    torque: 630,
    maxRange: 500,
    chargingType: "270 kW DC Fast Charging",
    topSpeed: 245,
    groundClearance: 145,
    bootSpace: 405,
    variants: ["Quattro"],
    features: ["AWD", "Air Suspension", "Audi Pre-Sense", "Performance Brakes"],
    status: "Available",
    seating: 5,
    dimensions: "4989 x 1964 x 1396 mm",
    warranty: "8 years battery warranty",
    acceleration: "0-100 km/h in 4.1s",
  },
  {
    id: 18,
    make: "Audi",
    model: "RS e-tron GT",
    fullName: "Audi RS e-tron GT",
    bodyType: "Sedan",
    priceMin: 205.0,
    priceMax: 205.0,
    batteryOptions: [{ capacity: 105, type: "Performance", range: 480 }],
    motorPower: 680,
    torque: 950,
    maxRange: 480,
    chargingType: "320 kW DC Fast Charging",
    topSpeed: 250,
    groundClearance: 145,
    bootSpace: 405,
    variants: ["RS Performance"],
    features: ["High Performance", "Sport Brakes", "8 Airbags", "Track Mode"],
    status: "Available",
    seating: 5,
    dimensions: "4989 x 1964 x 1396 mm",
    warranty: "8 years battery warranty",
    acceleration: "0-100 km/h in 2.6s",
  },
  {
    id: 19,
    make: "Audi",
    model: "Q4 e-tron",
    fullName: "Audi Q4 e-tron",
    bodyType: "SUV",
    priceMin: 45.0,
    priceMax: 55.0,
    batteryOptions: [
      { capacity: 55, type: "Standard", range: 341 },
      { capacity: 82, type: "Extended", range: 520 },
    ],
    motorPower: 265,
    torque: 460,
    maxRange: 520,
    chargingType: "135 kW DC Fast Charging",
    topSpeed: 180,
    groundClearance: 180,
    bootSpace: 520,
    variants: ["40", "45", "50 Quattro"],
    features: ["Compact SUV", "Pre-Sense Front", "Lane Assist", "Euro NCAP 5-star"],
    status: "Coming Soon",
    seating: 5,
    dimensions: "4588 x 1865 x 1632 mm",
    warranty: "8 years battery warranty",
    acceleration: "0-100 km/h in 6.2s",
  },
  {
    id: 20,
    make: "Audi",
    model: "Q6 e-tron",
    fullName: "Audi Q6 e-tron",
    bodyType: "SUV",
    priceMin: 100.0,
    priceMax: 130.0,
    batteryOptions: [{ capacity: 100, type: "PPE Platform", range: 750 }],
    motorPower: 388,
    torque: 820,
    maxRange: 750,
    chargingType: "270 kW DC Fast Charging",
    topSpeed: 210,
    groundClearance: 185,
    bootSpace: 526,
    variants: ["Quattro", "Performance"],
    features: ["Advanced ADAS", "360° Camera", "Lane Assist", "Pre-Sense"],
    status: "Coming Soon",
    seating: 5,
    dimensions: "4771 x 1939 x 1648 mm",
    warranty: "8 years battery warranty",
    acceleration: "0-100 km/h in 4.3s",
  },

  // Hyundai EVs
  {
    id: 21,
    make: "Hyundai",
    model: "Kona Electric",
    fullName: "Hyundai Kona Electric",
    bodyType: "SUV",
    priceMin: 23.84,
    priceMax: 24.03,
    batteryOptions: [{ capacity: 39.2, type: "Standard", range: 452 }],
    motorPower: 136,
    torque: 395,
    maxRange: 452,
    chargingType: "60 kW DC Fast Charging",
    topSpeed: 167,
    groundClearance: 170,
    bootSpace: 332,
    variants: ["Premium", "Premium Dual Tone"],
    features: ["6 Airbags", "ESC", "Hill-start Assist", "Parking Sensors"],
    status: "Available",
    seating: 5,
    dimensions: "4180 x 1800 x 1570 mm",
    warranty: "8 years/1,60,000 km battery",
    acceleration: "0-100 km/h in 6.3s",
  },
  {
    id: 22,
    make: "Hyundai",
    model: "Ioniq 5",
    fullName: "Hyundai Ioniq 5",
    bodyType: "SUV",
    priceMin: 46.05,
    priceMax: 46.05,
    batteryOptions: [{ capacity: 72.6, type: "RWD", range: 631 }],
    motorPower: 217,
    torque: 350,
    maxRange: 631,
    chargingType: "350 kW DC Fast Charging",
    topSpeed: 185,
    groundClearance: 163,
    bootSpace: 531,
    variants: ["RWD"],
    features: ["SmartSense Suite", "6 Airbags", "Blind-spot Assist", "Lane Keep"],
    status: "Available",
    seating: 5,
    dimensions: "4635 x 1890 x 1605 mm",
    warranty: "8 years battery warranty",
    acceleration: "0-100 km/h in 7.4s",
  },
  {
    id: 23,
    make: "Hyundai",
    model: "Ioniq 6",
    fullName: "Hyundai Ioniq 6",
    bodyType: "Sedan",
    priceMin: 50.0,
    priceMax: 65.0,
    batteryOptions: [
      { capacity: 53, type: "Base", range: 386 },
      { capacity: 77.4, type: "Extended", range: 550 },
    ],
    motorPower: 239,
    torque: 605,
    maxRange: 550,
    chargingType: "350 kW DC Fast Charging",
    topSpeed: 185,
    groundClearance: 154,
    bootSpace: 401,
    variants: ["RWD", "AWD"],
    features: ["SmartSense ADAS", "Forward Collision-Avoidance", "Blind-spot"],
    status: "Coming Soon",
    seating: 5,
    dimensions: "4855 x 1880 x 1495 mm",
    warranty: "8 years battery warranty",
    acceleration: "0-100 km/h in 5.1s",
  },
  {
    id: 24,
    make: "Hyundai",
    model: "Ioniq 6 N",
    fullName: "Hyundai Ioniq 6 N",
    bodyType: "Sedan",
    priceMin: 50.0,
    priceMax: 55.0,
    batteryOptions: [{ capacity: 84, type: "Performance", range: 468 }],
    motorPower: 478,
    torque: 771,
    maxRange: 468,
    chargingType: "350 kW DC Fast Charging",
    topSpeed: 250,
    groundClearance: 154,
    bootSpace: 401,
    variants: ["N Performance"],
    features: ["N Grin Boost", "Performance Brakes", "Drift Control", "Track Mode"],
    status: "Coming Soon",
    seating: 5,
    dimensions: "4855 x 1880 x 1495 mm",
    warranty: "8 years battery warranty",
    acceleration: "0-100 km/h in 3.2s",
  },
  {
    id: 25,
    make: "Hyundai",
    model: "Ioniq 9",
    fullName: "Hyundai Ioniq 9",
    bodyType: "SUV",
    priceMin: 50.0,
    priceMax: 60.0,
    batteryOptions: [{ capacity: 110.3, type: "NCM", range: 620 }],
    motorPower: 429,
    torque: 820,
    maxRange: 620,
    chargingType: "350 kW DC Fast Charging",
    topSpeed: 200,
    groundClearance: 200,
    bootSpace: 620,
    variants: ["RWD", "AWD", "AWD Performance"],
    features: ["Advanced ADAS", "V2L Support", "360° Camera", "7-Seater"],
    status: "Coming Soon",
    seating: 7,
    dimensions: "5060 x 1980 x 1790 mm",
    warranty: "8 years battery warranty",
    acceleration: "0-100 km/h in 5.2s",
  },

  // Maruti Suzuki EVs
  {
    id: 26,
    make: "Maruti Suzuki",
    model: "eVX",
    fullName: "Maruti Suzuki eVX",
    bodyType: "SUV",
    priceMin: 20.0,
    priceMax: 30.0,
    batteryOptions: [
      { capacity: 49, type: "Standard", range: 450 },
      { capacity: 61, type: "Extended", range: 550 },
    ],
    motorPower: 144,
    torque: 300,
    maxRange: 550,
    chargingType: "70 kW DC Fast Charging",
    topSpeed: 140,
    groundClearance: 210,
    bootSpace: 350,
    variants: ["FWD", "AWD"],
    features: ["Level 2 ADAS", "Hill Hold", "Lane Keep Assist", "Blind Spot Monitor"],
    status: "Coming Soon",
    seating: 5,
    dimensions: "4300 x 1800 x 1600 mm",
    warranty: "8 years battery warranty",
    acceleration: "0-100 km/h in 7.5s",
  },
  {
    id: 27,
    make: "Maruti Suzuki",
    model: "WagonR EV",
    fullName: "Maruti Suzuki WagonR EV",
    bodyType: "Hatchback",
    priceMin: 10.0,
    priceMax: 12.0,
    batteryOptions: [{ capacity: 30, type: "Standard", range: 300 }],
    motorPower: 68,
    torque: 120,
    maxRange: 300,
    chargingType: "30 kW DC Fast Charging",
    topSpeed: 120,
    groundClearance: 165,
    bootSpace: 341,
    variants: ["LXi", "VXi", "ZXi"],
    features: ["Dual Airbags", "ABS", "Reverse Parking Sensors"],
    status: "Coming Soon",
    seating: 5,
    dimensions: "3655 x 1620 x 1675 mm",
    warranty: "8 years battery warranty",
    acceleration: "0-100 km/h in 12.5s",
  },
  {
    id: 28,
    make: "Maruti Suzuki",
    model: "eWX",
    fullName: "Maruti Suzuki eWX",
    bodyType: "Hatchback",
    priceMin: 9.0,
    priceMax: 11.0,
    batteryOptions: [{ capacity: 32, type: "Standard", range: 320 }],
    motorPower: 75,
    torque: 130,
    maxRange: 320,
    chargingType: "25 kW DC Fast Charging",
    topSpeed: 120,
    groundClearance: 170,
    bootSpace: 280,
    variants: ["Base", "Mid", "Top"],
    features: ["Dual Airbags", "Basic ADAS", "ABS", "ISOFIX"],
    status: "Coming Soon",
    seating: 4,
    dimensions: "3700 x 1650 x 1550 mm",
    warranty: "8 years battery warranty",
    acceleration: "0-100 km/h in 11.0s",
  },
  {
    id: 29,
    make: "Maruti Suzuki",
    model: "Fronx EV",
    fullName: "Maruti Suzuki Fronx EV",
    bodyType: "SUV",
    priceMin: 14.0,
    priceMax: 18.0,
    batteryOptions: [{ capacity: 40, type: "Standard", range: 400 }],
    motorPower: 115,
    torque: 180,
    maxRange: 400,
    chargingType: "50 kW DC Fast Charging",
    topSpeed: 140,
    groundClearance: 190,
    bootSpace: 308,
    variants: ["Sigma", "Delta", "Zeta", "Alpha"],
    features: ["6 Airbags", "Hill Hold", "ESC", "360° Camera"],
    status: "Coming Soon",
    seating: 5,
    dimensions: "3995 x 1765 x 1550 mm",
    warranty: "8 years battery warranty",
    acceleration: "0-100 km/h in 10.0s",
  },

  // Rolls-Royce EVs
  {
    id: 30,
    make: "Rolls-Royce",
    model: "Spectre",
    fullName: "Rolls-Royce Spectre",
    bodyType: "Coupe",
    priceMin: 750.0,
    priceMax: 750.0,
    batteryOptions: [{ capacity: 102, type: "Lithium-ion", range: 530 }],
    motorPower: 584,
    torque: 900,
    maxRange: 530,
    chargingType: "195 kW DC Fast Charging",
    topSpeed: 250,
    groundClearance: 150,
    bootSpace: 259,
    variants: ["Base"],
    features: ["8 Airbags", "Adaptive Cruise", "Lane Departure", "360° Camera"],
    status: "Available",
    seating: 4,
    dimensions: "5453 x 2080 x 1559 mm",
    warranty: "8 years battery warranty",
    acceleration: "0-100 km/h in 4.5s",
  },
  {
    id: 31,
    make: "Rolls-Royce",
    model: "Spectre Black Badge",
    fullName: "Rolls-Royce Spectre Black Badge",
    bodyType: "Coupe",
    priceMin: 800.0,
    priceMax: 850.0,
    batteryOptions: [{ capacity: 102, type: "Performance", range: 520 }],
    motorPower: 630,
    torque: 1075,
    maxRange: 520,
    chargingType: "195 kW DC Fast Charging",
    topSpeed: 250,
    groundClearance: 150,
    bootSpace: 259,
    variants: ["Black Badge"],
    features: ["Performance Brakes", "Enhanced Traction", "Infinity Mode"],
    status: "Available",
    seating: 4,
    dimensions: "5453 x 2080 x 1559 mm",
    warranty: "8 years battery warranty",
    acceleration: "0-100 km/h in 4.1s",
  },
  {
    id: 32,
    make: "Rolls-Royce",
    model: "Silent Shadow",
    fullName: "Rolls-Royce Silent Shadow",
    bodyType: "Sedan",
    priceMin: 900.0,
    priceMax: 900.0,
    batteryOptions: [{ capacity: 120, type: "Flagship", range: 500 }],
    motorPower: 650,
    torque: 1000,
    maxRange: 500,
    chargingType: "200 kW DC Fast Charging",
    topSpeed: 250,
    groundClearance: 150,
    bootSpace: 560,
    variants: ["Flagship"],
    features: ["Full ADAS Suite", "360° Cameras", "Ultra Luxury"],
    status: "Coming Soon",
    seating: 5,
    dimensions: "5500 x 2100 x 1600 mm",
    warranty: "8 years battery warranty",
    acceleration: "0-100 km/h in 4.0s",
  },

  // Lotus EVs
  {
    id: 33,
    make: "Lotus",
    model: "Evija",
    fullName: "Lotus Evija",
    bodyType: "Supercar",
    priceMin: 1900.0,
    priceMax: 2000.0,
    batteryOptions: [{ capacity: 90, type: "Hypercar", range: 345 }],
    motorPower: 1973,
    torque: 1704,
    maxRange: 345,
    chargingType: "350 kW DC Ultra-Fast Charging",
    topSpeed: 320,
    groundClearance: 105,
    bootSpace: 160,
    variants: ["Limited Edition"],
    features: ["Individual Wheel Motors", "Hypercar Safety", "Track Mode"],
    status: "Available",
    seating: 2,
    dimensions: "4459 x 2000 x 1122 mm",
    warranty: "5 years battery warranty",
    acceleration: "0-100 km/h in 2.9s",
  },
  {
    id: 34,
    make: "Lotus",
    model: "Eletre",
    fullName: "Lotus Eletre",
    bodyType: "SUV",
    priceMin: 96.0,
    priceMax: 120.0,
    batteryOptions: [{ capacity: 112, type: "Standard", range: 600 }],
    motorPower: 603,
    torque: 985,
    maxRange: 600,
    chargingType: "350 kW DC Fast Charging",
    topSpeed: 260,
    groundClearance: 162,
    bootSpace: 688,
    variants: ["Base", "S", "R"],
    features: ["Lidar Sensor", "Advanced ADAS", "Air Suspension"],
    status: "Available",
    seating: 5,
    dimensions: "5103 x 2019 x 1630 mm",
    warranty: "8 years battery warranty",
    acceleration: "0-100 km/h in 2.9s",
  },
  {
    id: 35,
    make: "Lotus",
    model: "Emeya",
    fullName: "Lotus Emeya",
    bodyType: "Sedan",
    priceMin: 95.0,
    priceMax: 110.0,
    batteryOptions: [{ capacity: 112, type: "GT", range: 610 }],
    motorPower: 675,
    torque: 985,
    maxRange: 610,
    chargingType: "350 kW DC Fast Charging",
    topSpeed: 250,
    groundClearance: 140,
    bootSpace: 509,
    variants: ["GT", "R"],
    features: ["Adaptive Suspension", "Lane-keep", "Trinity Display"],
    status: "Available",
    seating: 5,
    dimensions: "5139 x 1996 x 1464 mm",
    warranty: "8 years battery warranty",
    acceleration: "0-100 km/h in 2.78s",
  },

  // Ola Electric Scooters
  {
    id: 36,
    make: "Ola Electric",
    model: "S1 Pro Gen 3",
    fullName: "Ola Electric S1 Pro Gen 3",
    bodyType: "scooter",
    priceMin: 1.15,
    priceMax: 1.88,
    batteryOptions: [
      { capacity: 4, type: "Standard", range: 242 },
      { capacity: 5.3, type: "Extended", range: 320 },
    ],
    motorPower: 11,
    torque: 58,
    maxRange: 320,
    chargingType: "750W Home Charging",
    topSpeed: 120,
    groundClearance: 165,
    bootSpace: 36,
    variants: ["4kWh", "5.3kWh"],
    features: ["Reverse Mode", "Cruise Control", "Geofencing", "Hill Start Assist"],
    status: "Available",
    seating: 2,
    dimensions: "1859 x 700 x 1160 mm",
    warranty: "3 years battery",
    acceleration: "0-40 km/h in 3.4s",
  },
  {
    id: 37,
    make: "Ola Electric",
    model: "S1 X Gen 3",
    fullName: "Ola Electric S1 X Gen 3",
    bodyType: "scooter",
    priceMin: 0.8,
    priceMax: 1.0,
    batteryOptions: [{ capacity: 4, type: "Standard", range: 242 }],
    motorPower: 11,
    torque: 58,
    maxRange: 242,
    chargingType: "750W Home Charging",
    topSpeed: 90,
    groundClearance: 165,
    bootSpace: 36,
    variants: ["Standard"],
    features: ["CBS Braking", "Alloy Wheels", "Reverse Mode", "LED Lighting"],
    status: "Available",
    seating: 2,
    dimensions: "1859 x 700 x 1160 mm",
    warranty: "3 years battery",
    acceleration: "0-40 km/h in 4.5s",
  },
  {
    id: 38,
    make: "Ola Electric",
    model: "S1 Pro Plus Gen 3",
    fullName: "Ola Electric S1 Pro Plus Gen 3",
    bodyType: "scooter",
    priceMin: 1.55,
    priceMax: 1.69,
    batteryOptions: [{ capacity: 5.3, type: "Extended", range: 320 }],
    motorPower: 11,
    torque: 58,
    maxRange: 320,
    chargingType: "750W Home Charging",
    topSpeed: 120,
    groundClearance: 165,
    bootSpace: 36,
    variants: ["Plus"],
    features: ["ABS", "Reverse Mode", "Cruise Control", "Advanced Riding Modes"],
    status: "Available",
    seating: 2,
    dimensions: "1859 x 700 x 1160 mm",
    warranty: "3 years battery",
    acceleration: "0-40 km/h in 3.4s",
  },
  {
    id: 39,
    make: "Ola Electric",
    model: "S1 Air",
    fullName: "Ola Electric S1 Air",
    bodyType: "scooter",
    priceMin: 1.05,
    priceMax: 1.05,
    batteryOptions: [{ capacity: 3, type: "Base", range: 151 }],
    motorPower: 8,
    torque: 58,
    maxRange: 151,
    chargingType: "750W Home Charging",
    topSpeed: 85,
    groundClearance: 165,
    bootSpace: 36,
    variants: ["Air"],
    features: ["CBS", "Reverse Mode", "TFT Screen", "Connected Features"],
    status: "Available",
    seating: 2,
    dimensions: "1859 x 700 x 1160 mm",
    warranty: "3 years battery",
    acceleration: "0-40 km/h in 5.7s",
  },
  {
    id: 40,
    make: "Ola Electric",
    model: "Roadster X+",
    fullName: "Ola Electric Roadster X+",
    bodyType: "motorcycle",
    priceMin: 1.0,
    priceMax: 2.0,
    batteryOptions: [{ capacity: 9.1, type: "Extended", range: 248 }],
    motorPower: 15,
    torque: 85,
    maxRange: 248,
    chargingType: "Fast Charging Capable",
    topSpeed: 124,
    groundClearance: 180,
    bootSpace: 0,
    variants: ["Base", "X+"],
    features: ["Disc Brakes", "ABS", "Connected Features", "Motorcycle Stability"],
    status: "Coming Soon",
    seating: 2,
    dimensions: "2020 x 800 x 1200 mm",
    warranty: "3 years battery",
    acceleration: "0-60 km/h in 4.0s",
  },

  // Ather Electric Scooters
  {
    id: 41,
    make: "Ather",
    model: "450X Gen 3",
    fullName: "Ather 450X Gen 3",
    bodyType: "scooter",
    priceMin: 1.4,
    priceMax: 1.56,
    batteryOptions: [
      { capacity: 2.9, type: "Standard", range: 111 },
      { capacity: 3.7, type: "Extended", range: 150 },
    ],
    motorPower: 6.4,
    torque: 26,
    maxRange: 150,
    chargingType: "Fast Charging Supported",
    topSpeed: 90,
    groundClearance: 165,
    bootSpace: 22,
    variants: ["2.9kWh", "3.7kWh"],
    features: ["CBS", "Side-stand Cut-off", "Reverse Assist", "OTA Updates"],
    status: "Available",
    seating: 2,
    dimensions: "1834 x 700 x 1262 mm",
    warranty: "3 years battery",
    acceleration: "0-40 km/h in 3.3s",
  },
  {
    id: 42,
    make: "Ather",
    model: "450 Apex",
    fullName: "Ather 450 Apex",
    bodyType: "scooter",
    priceMin: 1.9,
    priceMax: 1.99,
    batteryOptions: [{ capacity: 3.7, type: "Performance", range: 157 }],
    motorPower: 7.0,
    torque: 26,
    maxRange: 157,
    chargingType: "Fast Charging Supported",
    topSpeed: 100,
    groundClearance: 165,
    bootSpace: 22,
    variants: ["Apex"],
    features: ["CBS", "Traction Control", "Theft Alerts", "Guide-me-home Light"],
    status: "Available",
    seating: 2,
    dimensions: "1834 x 700 x 1262 mm",
    warranty: "3 years battery",
    acceleration: "0-40 km/h in 2.9s",
  },
  {
    id: 43,
    make: "Ather",
    model: "450S",
    fullName: "Ather 450S",
    bodyType: "scooter",
    priceMin: 1.2,
    priceMax: 1.36,
    batteryOptions: [{ capacity: 2.9, type: "Budget", range: 115 }],
    motorPower: 5.4,
    torque: 22,
    maxRange: 115,
    chargingType: "Home Charging Only",
    topSpeed: 90,
    groundClearance: 165,
    bootSpace: 22,
    variants: ["S"],
    features: ["CBS", "Reverse Mode", "FallSafe", "Theft Protection"],
    status: "Available",
    seating: 2,
    dimensions: "1834 x 700 x 1262 mm",
    warranty: "3 years battery",
    acceleration: "0-40 km/h in 3.9s",
  },
  {
    id: 44,
    make: "Ather",
    model: "Rizta",
    fullName: "Ather Rizta",
    bodyType: "scooter",
    priceMin: 1.1,
    priceMax: 1.45,
    batteryOptions: [
      { capacity: 2.9, type: "S", range: 123 },
      { capacity: 3.7, type: "Z", range: 159 },
    ],
    motorPower: 5.4,
    torque: 24,
    maxRange: 159,
    chargingType: "Fast Charging Supported",
    topSpeed: 80,
    groundClearance: 165,
    bootSpace: 34,
    variants: ["S", "Z"],
    features: ["CBS", "Reverse Assist", "Navigation", "Family-size Seat"],
    status: "Available",
    seating: 2,
    dimensions: "1834 x 700 x 1262 mm",
    warranty: "3 years battery",
    acceleration: "0-40 km/h in 3.7s",
  },
  {
    id: 45,
    make: "Ather",
    model: "450",
    fullName: "Ather 450",
    bodyType: "scooter",
    priceMin: 1.1,
    priceMax: 1.1,
    batteryOptions: [{ capacity: 2.4, type: "Base", range: 146 }],
    motorPower: 5.4,
    torque: 20.5,
    maxRange: 146,
    chargingType: "Limited Fast Charging",
    topSpeed: 80,
    groundClearance: 165,
    bootSpace: 22,
    variants: ["Base"],
    features: ["Disc Brakes", "Side-stand Cut-off", "Navigation", "OTA Firmware"],
    status: "Available",
    seating: 2,
    dimensions: "1834 x 700 x 1262 mm",
    warranty: "3 years battery",
    acceleration: "0-40 km/h in 3.9s",
  },

  // Bajaj Electric Scooter
  {
    id: 46,
    make: "Bajaj",
    model: "Chetak Electric",
    fullName: "Bajaj Chetak Electric",
    bodyType: "scooter",
    priceMin: 1.0,
    priceMax: 1.32,
    batteryOptions: [
      { capacity: 2.9, type: "Standard", range: 123 },
      { capacity: 3.2, type: "Premium", range: 136 },
    ],
    motorPower: 4.08,
    torque: 20,
    maxRange: 136,
    chargingType: "Standard AC Charging",
    topSpeed: 73,
    groundClearance: 150,
    bootSpace: 18,
    variants: ["Urbane", "Premium", "TecPac", "3001 Edition"],
    features: ["CBS", "Side-stand Sensor", "IP67 Battery", "Reverse Mode"],
    status: "Available",
    seating: 2,
    dimensions: "1840 x 665 x 1115 mm",
    warranty: "3 years battery",
    acceleration: "0-40 km/h in 4.0s",
  },
  {
    id: 47,
    make: "Bajaj",
    model: "RE E-Tec 9.0",
    fullName: "Bajaj RE E-Tec 9.0",
    bodyType: "three-wheeler",
    priceMin: 3.55,
    priceMax: 3.55,
    batteryOptions: [{ capacity: 8.9, type: "Fixed", range: 178 }],
    motorPower: 7.37,
    torque: 42,
    maxRange: 178,
    chargingType: "Standard AC",
    topSpeed: 45,
    groundClearance: 150,
    bootSpace: 0,
    variants: ["Standard"],
    features: ["Torque Assist", "Safety Lock", "UV Resistant Paint"],
    status: "Available",
    seating: 4,
    dimensions: "2655 x 1335 x 1693 mm",
    warranty: "3 years battery",
    acceleration: "0-40 km/h in 8.0s",
  },

  // Tesla EVs
  {
    id: 48,
    make: "Tesla",
    model: "Model Y",
    fullName: "Tesla Model Y",
    bodyType: "SUV",
    priceMin: 59.89,
    priceMax: 67.89,
    batteryOptions: [
      { capacity: 60, type: "LFP", range: 500 },
      { capacity: 75, type: "NMC", range: 622 },
    ],
    motorPower: 299,
    torque: 420,
    maxRange: 622,
    chargingType: "250 kW Supercharger",
    topSpeed: 201,
    groundClearance: 167,
    bootSpace: 854,
    variants: ["RWD", "Long Range RWD"],
    features: ["Autopilot", "Full Self-Driving", "Over-the-Air Updates", "Supercharger Network"],
    status: "Available",
    seating: 5,
    dimensions: "4751 x 1921 x 1624 mm",
    warranty: "8 years battery warranty",
    acceleration: "0-100 km/h in 6.9s",
  },

  // Kia EVs
  {
    id: 49,
    make: "Kia",
    model: "EV6",
    fullName: "Kia EV6",
    bodyType: "SUV",
    priceMin: 65.97,
    priceMax: 70.0,
    batteryOptions: [{ capacity: 84, type: "Li-ion", range: 650 }],
    motorPower: 321,
    torque: 605,
    maxRange: 650,
    chargingType: "350 kW DC Fast Charging",
    topSpeed: 185,
    groundClearance: 160,
    bootSpace: 520,
    variants: ["84 kWh RWD", "84 kWh AWD"],
    features: ["ADAS 2.0", "V2L Technology", "Panoramic Display", "Meridian Audio"],
    status: "Available",
    seating: 5,
    dimensions: "4695 x 1890 x 1570 mm",
    warranty: "8 years battery warranty",
    acceleration: "0-100 km/h in 5.0s",
  },
  {
    id: 50,
    make: "Kia",
    model: "EV9",
    fullName: "Kia EV9",
    bodyType: "SUV",
    priceMin: 80.0,
    priceMax: 90.0,
    batteryOptions: [{ capacity: 99.8, type: "Li-ion", range: 561 }],
    motorPower: 384,
    torque: 700,
    maxRange: 561,
    chargingType: "350 kW DC Fast Charging",
    topSpeed: 200,
    groundClearance: 190,
    bootSpace: 333,
    variants: ["GT-Line AWD"],
    features: ["7-Seater", "Captain Seats", "Massage Seats", "Trinity Display", "10 Airbags"],
    status: "Available",
    seating: 7,
    dimensions: "5015 x 1980 x 1780 mm",
    warranty: "8 years battery warranty",
    acceleration: "0-100 km/h in 5.3s",
  },

  // Mercedes-Benz EVs
  {
    id: 51,
    make: "Mercedes-Benz",
    model: "EQS",
    fullName: "Mercedes-Benz EQS",
    bodyType: "Sedan",
    priceMin: 163.0,
    priceMax: 163.0,
    batteryOptions: [{ capacity: 107.8, type: "Li-ion", range: 857 }],
    motorPower: 516,
    torque: 950,
    maxRange: 857,
    chargingType: "200 kW DC Fast Charging",
    topSpeed: 250,
    groundClearance: 120,
    bootSpace: 610,
    variants: ["580 4MATIC"],
    features: ["MBUX Hyperscreen", "Air Suspension", "Advanced ADAS", "Luxury Interior"],
    status: "Available",
    seating: 5,
    dimensions: "5216 x 1926 x 1512 mm",
    warranty: "8 years battery warranty",
    acceleration: "0-100 km/h in 4.3s",
  },
  {
    id: 52,
    make: "Mercedes-Benz",
    model: "EQS SUV",
    fullName: "Mercedes-Benz EQS SUV",
    bodyType: "SUV",
    priceMin: 128.0,
    priceMax: 143.0,
    batteryOptions: [{ capacity: 122, type: "Li-ion", range: 820 }],
    motorPower: 536,
    torque: 858,
    maxRange: 820,
    chargingType: "200 kW DC Fast Charging",
    topSpeed: 210,
    groundClearance: 181,
    bootSpace: 645,
    variants: ["580 4MATIC", "450+"],
    features: ["7-Seater", "11 Airbags", "Active Brake Assist", "Luxury Features"],
    status: "Available",
    seating: 7,
    dimensions: "5125 x 1959 x 1718 mm",
    warranty: "8 years battery warranty",
    acceleration: "0-100 km/h in 4.7s",
  },
  {
    id: 53,
    make: "Mercedes-Benz",
    model: "EQE SUV",
    fullName: "Mercedes-Benz EQE SUV",
    bodyType: "SUV",
    priceMin: 141.0,
    priceMax: 141.0,
    batteryOptions: [{ capacity: 90.56, type: "Li-ion", range: 550 }],
    motorPower: 408,
    torque: 858,
    maxRange: 550,
    chargingType: "170 kW DC Fast Charging",
    topSpeed: 210,
    groundClearance: 154,
    bootSpace: 520,
    variants: ["500 4MATIC"],
    features: ["9 Airbags", "ABS", "Premium Interior", "Advanced Safety"],
    status: "Available",
    seating: 5,
    dimensions: "4863 x 1940 x 1685 mm",
    warranty: "8 years battery warranty",
    acceleration: "0-100 km/h in 4.9s",
  },
  {
    id: 54,
    make: "Mercedes-Benz",
    model: "EQB",
    fullName: "Mercedes-Benz EQB",
    bodyType: "SUV",
    priceMin: 72.2,
    priceMax: 78.9,
    batteryOptions: [
      { capacity: 66.5, type: "Li-ion", range: 447 },
      { capacity: 70.5, type: "Li-ion", range: 535 },
    ],
    motorPower: 292,
    torque: 385,
    maxRange: 535,
    chargingType: "100 kW DC Fast Charging",
    topSpeed: 160,
    groundClearance: 165,
    bootSpace: 495,
    variants: ["250+", "350 4MATIC"],
    features: ["6 Airbags", "TPMS", "Compact Luxury", "Family SUV"],
    status: "Available",
    seating: 7,
    dimensions: "4684 x 1834 x 1667 mm",
    warranty: "8 years battery warranty",
    acceleration: "0-100 km/h in 6.2s",
  },
  {
    id: 55,
    make: "Mercedes-Benz",
    model: "EQA",
    fullName: "Mercedes-Benz EQA",
    bodyType: "SUV",
    priceMin: 67.2,
    priceMax: 67.2,
    batteryOptions: [{ capacity: 70.5, type: "Li-ion", range: 560 }],
    motorPower: 292,
    torque: 385,
    maxRange: 560,
    chargingType: "100 kW DC Fast Charging",
    topSpeed: 160,
    groundClearance: 140,
    bootSpace: 340,
    variants: ["250+"],
    features: ["7 Airbags", "ESC", "Compact Design", "Premium Features"],
    status: "Available",
    seating: 5,
    dimensions: "4463 x 1834 x 1624 mm",
    warranty: "8 years battery warranty",
    acceleration: "0-100 km/h in 8.6s",
  },
  {
    id: 56,
    make: "Mercedes-Benz",
    model: "Maybach EQS SUV",
    fullName: "Mercedes-Benz Maybach EQS SUV",
    bodyType: "SUV",
    priceMin: 228.0,
    priceMax: 263.0,
    batteryOptions: [{ capacity: 122, type: "Li-ion", range: 611 }],
    motorPower: 658,
    torque: 950,
    maxRange: 611,
    chargingType: "200 kW DC Fast Charging",
    topSpeed: 250,
    groundClearance: 181,
    bootSpace: 645,
    variants: ["680 SUV"],
    features: ["Ultra Luxury", "11 Airbags", "Adaptive Cruise Control", "Maybach Features"],
    status: "Available",
    seating: 4,
    dimensions: "5125 x 1959 x 1718 mm",
    warranty: "8 years battery warranty",
    acceleration: "0-100 km/h in 4.4s",
  },
  {
    id: 57,
    make: "Mercedes-Benz",
    model: "AMG EQS",
    fullName: "Mercedes-Benz AMG EQS",
    bodyType: "Sedan",
    priceMin: 245.0,
    priceMax: 245.0,
    batteryOptions: [{ capacity: 107.8, type: "Li-ion", range: 526 }],
    motorPower: 751,
    torque: 950,
    maxRange: 526,
    chargingType: "200 kW DC Fast Charging",
    topSpeed: 250,
    groundClearance: 120,
    bootSpace: 610,
    variants: ["53 4MATIC+"],
    features: ["AMG Performance", "9 Airbags", "Active Lane Keeping", "Track Mode"],
    status: "Available",
    seating: 5,
    dimensions: "5216 x 1926 x 1512 mm",
    warranty: "8 years battery warranty",
    acceleration: "0-100 km/h in 3.4s",
  },
  {
    id: 58,
    make: "Mercedes-Benz",
    model: "G-Class Electric",
    fullName: "Mercedes-Benz G-Class Electric",
    bodyType: "SUV",
    priceMin: 300.0,
    priceMax: 300.0,
    batteryOptions: [{ capacity: 116, type: "Li-ion", range: 473 }],
    motorPower: 587,
    torque: 1164,
    maxRange: 473,
    chargingType: "200 kW DC Fast Charging",
    topSpeed: 180,
    groundClearance: 241,
    bootSpace: 566,
    variants: ["580 EQG"],
    features: ["Iconic G-Wagon", "360° Camera", "8 Airbags", "Off-Road Capability"],
    status: "Available",
    seating: 5,
    dimensions: "4817 x 1986 x 1954 mm",
    warranty: "8 years battery warranty",
    acceleration: "0-100 km/h in 4.7s",
  },

  // Additional brands for completeness
  {
    id: 59,
    make: "Atul",
    model: "RIK EV",
    fullName: "Atul RIK EV",
    bodyType: "three-wheeler",
    priceMin: 3.5,
    priceMax: 3.8,
    batteryOptions: [{ capacity: 6.6, type: "Li-ion", range: 110 }],
    motorPower: 13.3,
    torque: 44,
    maxRange: 110,
    chargingType: "3.3 kW AC",
    topSpeed: 45,
    groundClearance: 190,
    bootSpace: 0,
    variants: ["Standard"],
    features: ["IP67 Battery", "Active Thermal Management", "AI Telemetry"],
    status: "Available",
    seating: 4,
    dimensions: "2836 x 1390 x 1890 mm",
    warranty: "3 years battery",
    acceleration: "0-40 km/h in 8.0s",
  },
  {
    id: 60,
    make: "Ampere",
    model: "Nexus",
    fullName: "Ampere Nexus",
    bodyType: "scooter",
    priceMin: 1.1,
    priceMax: 1.15,
    batteryOptions: [{ capacity: 3.0, type: "LFP", range: 136 }],
    motorPower: 5.4,
    torque: 28,
    maxRange: 136,
    chargingType: "2.2 kW AC",
    topSpeed: 93,
    groundClearance: 165,
    bootSpace: 25,
    variants: ["Standard"],
    features: ["7-inch TFT Display", "Five Ride Modes", "IP67 Rating"],
    status: "Available",
    seating: 2,
    dimensions: "1930 x 737 x 1168 mm",
    warranty: "5 years battery",
    acceleration: "0-40 km/h in 4.2s",
  },
  {
    id: 61,
    make: "TVS",
    model: "iQube",
    fullName: "TVS iQube",
    bodyType: "scooter",
    priceMin: 1.15,
    priceMax: 1.15,
    batteryOptions: [{ capacity: 3.04, type: "Li-ion", range: 100 }],
    motorPower: 4.4,
    torque: 33,
    maxRange: 100,
    chargingType: "Standard AC",
    topSpeed: 78,
    groundClearance: 155,
    bootSpace: 30,
    variants: ["Standard"],
    features: ["SmartXonnect", "Navigation Assist", "Incoming Call Alerts"],
    status: "Available",
    seating: 2,
    dimensions: "1835 x 650 x 1200 mm",
    warranty: "3 years battery",
    acceleration: "0-40 km/h in 4.8s",
  },
  {
    id: 62,
    make: "Hero Electric",
    model: "Eddy",
    fullName: "Hero Electric Eddy",
    bodyType: "scooter",
    priceMin: 0.72,
    priceMax: 0.72,
    batteryOptions: [{ capacity: 1.536, type: "Li-ion", range: 85 }],
    motorPower: 1.2,
    torque: 12,
    maxRange: 85,
    chargingType: "Standard AC",
    topSpeed: 25,
    groundClearance: 140,
    bootSpace: 15,
    variants: ["Standard"],
    features: ["Find My Bike", "Reverse Mode", "Digital Display"],
    status: "Available",
    seating: 2,
    dimensions: "1750 x 650 x 1100 mm",
    warranty: "2 years battery",
    acceleration: "0-25 km/h in 8.0s",
  },
  {
    id: 63,
    make: "Okinawa",
    model: "iPraise+",
    fullName: "Okinawa iPraise+",
    bodyType: "scooter",
    priceMin: 1.25,
    priceMax: 1.3,
    batteryOptions: [{ capacity: 3.3, type: "72V Removable Li-ion", range: 137 }],
    motorPower: 3.4,
    torque: 18,
    maxRange: 137,
    chargingType: "1.5 kW AC",
    topSpeed: 70,
    groundClearance: 160,
    bootSpace: 25,
    variants: ["Standard"],
    features: ["Three Ride Modes", "Dual Disc Brakes", "Full LED Lighting"],
    status: "Available",
    seating: 2,
    dimensions: "1830 x 680 x 1118 mm",
    warranty: "3 years battery",
    acceleration: "0-40 km/h in 5.1s",
  },
]

// Global filter state with expanded options
let currentFilters = {
  search: "",
  maxPrice: 2000,
  makes: [],
  bodyTypes: [],
  minRange: 50,
  batteryTypes: [],
  chargingTypes: [],
  performanceTypes: [],
  seatingCapacity: [],
}

let currentSort = "name"
let filteredEVs = [...completeEVDatabase]

// Initialize page when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("Initializing browse page...")
  initializeBrowsePage()
  setupEventListeners()
})

function initializeBrowsePage() {
  console.log("Setting up initial filters and display...")
  applyFilters()
  updateResultsCount()
  displayResults()
}

function setupEventListeners() {
  console.log("Setting up event listeners...")

  // Search input with debouncing
  const searchInput = document.getElementById("searchInput")
  if (searchInput) {
    let searchTimeout
    searchInput.addEventListener("input", (e) => {
      clearTimeout(searchTimeout)
      searchTimeout = setTimeout(() => {
        currentFilters.search = e.target.value.toLowerCase().trim()
        console.log("Search filter applied:", currentFilters.search)
        applyFilters()
      }, 300)
    })
  }

  // Price range slider
  const priceRange = document.getElementById("priceRange")
  if (priceRange) {
    priceRange.addEventListener("input", (e) => {
      currentFilters.maxPrice = Number.parseFloat(e.target.value)
      const maxPriceLabel = document.getElementById("maxPrice")
      if (maxPriceLabel) {
        maxPriceLabel.textContent = `₹${currentFilters.maxPrice}L`
      }
      console.log("Price filter applied:", currentFilters.maxPrice)
      applyFilters()
    })
  }

  // Range filter slider
  const rangeFilter = document.getElementById("rangeFilter")
  if (rangeFilter) {
    rangeFilter.addEventListener("input", (e) => {
      currentFilters.minRange = Number.parseInt(e.target.value)
      const maxRangeLabel = document.getElementById("maxRange")
      if (maxRangeLabel) {
        maxRangeLabel.textContent = currentFilters.minRange + "+ km"
      }
      console.log("Range filter applied:", currentFilters.minRange)
      applyFilters()
    })
  }

  // Setup all checkbox filters
  setupCheckboxFilters("makeFilters", "makes")
  setupCheckboxFilters("bodyTypeFilters", "bodyTypes")
  setupCheckboxFilters("batteryFilters", "batteryTypes")
  setupCheckboxFilters("chargingFilters", "chargingTypes")
  setupCheckboxFilters("performanceFilters", "performanceTypes")
  setupCheckboxFilters("seatingFilters", "seatingCapacity")

  // Sort dropdown
  const sortSelect = document.getElementById("sortSelect")
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      currentSort = e.target.value
      console.log("Sort applied:", currentSort)
      applySort()
      displayResults()
    })
  }
}

function setupCheckboxFilters(containerId, filterKey) {
  const container = document.getElementById(containerId)
  if (!container) {
    console.warn(`Container ${containerId} not found`)
    return
  }

  container.addEventListener("change", (e) => {
    if (e.target.type === "checkbox") {
      const value = e.target.value
      const isChecked = e.target.checked

      console.log(`Checkbox ${value} ${isChecked ? "checked" : "unchecked"} for ${filterKey}`)

      if (isChecked) {
        if (!currentFilters[filterKey].includes(value)) {
          currentFilters[filterKey].push(value)
        }
      } else {
        currentFilters[filterKey] = currentFilters[filterKey].filter((item) => item !== value)
      }

      console.log(`Updated ${filterKey}:`, currentFilters[filterKey])
      applyFilters()
    }
  })

  // Handle clicks on checkbox items
  const checkboxItems = container.querySelectorAll(".checkbox-item")
  checkboxItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      if (e.target.type !== "checkbox") {
        const checkbox = this.querySelector('input[type="checkbox"]')
        if (checkbox) {
          checkbox.checked = !checkbox.checked
          checkbox.dispatchEvent(new Event("change", { bubbles: true }))
        }
      }

      // Visual feedback
      const checkbox = this.querySelector('input[type="checkbox"]')
      if (checkbox && checkbox.checked) {
        this.style.background = "rgba(16, 185, 129, 0.1)"
        this.style.transform = "translateX(5px)"
      } else {
        this.style.background = "transparent"
        this.style.transform = "translateX(0)"
      }
    })
  })
}

function applyFilters() {
  console.log("Applying filters:", currentFilters)

  filteredEVs = completeEVDatabase.filter((ev) => {
    // Search filter
    if (currentFilters.search) {
      const searchTerm = currentFilters.search.toLowerCase()
      const matchesSearch =
        ev.make.toLowerCase().includes(searchTerm) ||
        ev.model.toLowerCase().includes(searchTerm) ||
        ev.fullName.toLowerCase().includes(searchTerm) ||
        ev.features.some((feature) => feature.toLowerCase().includes(searchTerm)) ||
        ev.bodyType.toLowerCase().includes(searchTerm) ||
        ev.variants.some((variant) => variant.toLowerCase().includes(searchTerm))

      if (!matchesSearch) return false
    }

    // Price filter
    if (ev.priceMin > currentFilters.maxPrice) return false

    // Make filter
    if (currentFilters.makes.length > 0) {
      if (!currentFilters.makes.includes(ev.make)) return false
    }

    // Body type filter
    if (currentFilters.bodyTypes.length > 0) {
      if (!currentFilters.bodyTypes.includes(ev.bodyType)) return false
    }

    // Range filter
    if (ev.maxRange < currentFilters.minRange) return false

    // Battery capacity filter
    if (currentFilters.batteryTypes.length > 0) {
      const maxBatteryCapacity = Math.max(...ev.batteryOptions.map((b) => b.capacity))
      let matchesBattery = false

      currentFilters.batteryTypes.forEach((type) => {
        if (type === "small" && maxBatteryCapacity < 10) matchesBattery = true
        if (type === "medium" && maxBatteryCapacity >= 10 && maxBatteryCapacity <= 50) matchesBattery = true
        if (type === "large" && maxBatteryCapacity > 50) matchesBattery = true
      })

      if (!matchesBattery) return false
    }

    // Charging type filter
    if (currentFilters.chargingTypes.length > 0) {
      let matchesCharging = false
      const chargingType = ev.chargingType.toLowerCase()

      currentFilters.chargingTypes.forEach((type) => {
        if (type === "AC" && chargingType.includes("ac")) matchesCharging = true
        if (type === "DC" && (chargingType.includes("dc") || chargingType.includes("fast"))) matchesCharging = true
        if (type === "Supercharger" && chargingType.includes("supercharger")) matchesCharging = true
      })

      if (!matchesCharging) return false
    }

    // Performance filter
    if (currentFilters.performanceTypes.length > 0) {
      let matchesPerformance = false

      currentFilters.performanceTypes.forEach((type) => {
        if (type === "economy" && ev.motorPower < 100) matchesPerformance = true
        if (type === "performance" && ev.motorPower >= 100 && ev.motorPower <= 300) matchesPerformance = true
        if (type === "supercar" && ev.motorPower > 300) matchesPerformance = true
      })

      if (!matchesPerformance) return false
    }

    // Seating capacity filter
    if (currentFilters.seatingCapacity.length > 0) {
      if (!currentFilters.seatingCapacity.includes(ev.seating.toString())) return false
    }

    return true
  })

  console.log(`Filtered results: ${filteredEVs.length} vehicles`)
  applySort()
  updateResultsCount()
  displayResults()
}

function applySort() {
  switch (currentSort) {
    case "price-low":
      filteredEVs.sort((a, b) => a.priceMin - b.priceMin)
      break
    case "price-high":
      filteredEVs.sort((a, b) => b.priceMax - a.priceMax)
      break
    case "range":
      filteredEVs.sort((a, b) => b.maxRange - a.maxRange)
      break
    case "battery":
      filteredEVs.sort((a, b) => {
        const maxBatteryA = Math.max(...a.batteryOptions.map((opt) => opt.capacity))
        const maxBatteryB = Math.max(...b.batteryOptions.map((opt) => opt.capacity))
        return maxBatteryB - maxBatteryA
      })
      break
    case "make":
      filteredEVs.sort((a, b) => a.make.localeCompare(b.make))
      break
    default: // name
      filteredEVs.sort((a, b) => a.model.localeCompare(b.model))
  }
}

function updateResultsCount() {
  const resultsCount = document.getElementById("resultsCount")
  if (resultsCount) {
    resultsCount.textContent = `${filteredEVs.length} vehicles found`
  }
}

function displayResults() {
  const resultsGrid = document.getElementById("resultsGrid")
  const noResults = document.getElementById("noResults")

  if (!resultsGrid || !noResults) {
    console.error("Results grid or no results element not found")
    return
  }

  if (filteredEVs.length === 0) {
    resultsGrid.style.display = "none"
    noResults.style.display = "block"
    return
  }

  resultsGrid.style.display = "grid"
  noResults.style.display = "none"

  resultsGrid.innerHTML = filteredEVs.map((ev) => createEVCard(ev)).join("")
}

function createEVCard(ev) {
  const maxBattery = Math.max(...ev.batteryOptions.map((b) => b.capacity))
  const priceRange = ev.priceMin === ev.priceMax ? `₹${ev.priceMin} Lakh` : `₹${ev.priceMin} - ₹${ev.priceMax} Lakh`
  const statusBadge =
    ev.status === "Coming Soon"
      ? '<div style="position: absolute; top: 10px; right: 10px; background: #f59e0b; color: white; padding: 4px 8px; border-radius: 12px; font-size: 0.8rem; font-weight: 600;">Coming Soon</div>'
      : ""

  // Enhanced brand color coding
  const brandColors = {
    Tata: "#1e40af",
    Mahindra: "#dc2626",
    MG: "#059669",
    Citroën: "#7c3aed",
    Tesla: "#c4a35b",
    Kia: "#1e40af",
    "Mercedes-Benz": "#0ea5e9",
    Audi: "#dc2626",
    Hyundai: "#059669",
    "Maruti Suzuki": "#f59e0b",
    "Rolls-Royce": "#1e1e1e",
    Lotus: "#059669",
    "Ola Electric": "#10b981",
    Ather: "#7c3aed",
    Bajaj: "#dc2626",
    Atul: "#6b7280",
    Ampere: "#059669",
    TVS: "#1e40af",
    "Hero Electric": "#dc2626",
    Okinawa: "#dc2626",
  }

  const brandColor = brandColors[ev.make] || "#6b7280"

  return `
        <div class="ev-card" style="position: relative;">
            ${statusBadge}
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                <div style="width: 4px; height: 20px; background: ${brandColor}; border-radius: 2px;"></div>
                <h3 style="margin: 0; color: ${brandColor};">${ev.make}</h3>
            </div>
            <div class="model-name">${ev.model}</div>
            <div class="price-range">${priceRange}</div>
            
            <div class="ev-specs">
                <div class="spec-item">
                    <div class="spec-label">Range</div>
                    <div class="spec-value">${ev.maxRange} km</div>
                </div>
                <div class="spec-item">
                    <div class="spec-label">Battery</div>
                    <div class="spec-value">${maxBattery} kWh</div>
                </div>
                <div class="spec-item">
                    <div class="spec-label">Power</div>
                    <div class="spec-value">${ev.motorPower} PS</div>
                </div>
                <div class="spec-item">
                    <div class="spec-label">Body Type</div>
                    <div class="spec-value">${ev.bodyType}</div>
                </div>
            </div>
            
            <div class="ev-actions">
                <button class="btn btn-primary" onclick="viewDetails(${ev.id})">
                    View Details
                </button>
                <button class="btn btn-secondary" onclick="addToCompare(${ev.id})" ${ev.status === "Coming Soon" ? "disabled" : ""}>
                    Compare
                </button>
            </div>
        </div>
    `
}

function clearAllFilters() {
  console.log("Clearing all filters...")

  // Reset filter values
  currentFilters = {
    search: "",
    maxPrice: 2000,
    makes: [],
    bodyTypes: [],
    minRange: 50,
    batteryTypes: [],
    chargingTypes: [],
    performanceTypes: [],
    seatingCapacity: [],
  }

  // Reset form elements
  const searchInput = document.getElementById("searchInput")
  if (searchInput) searchInput.value = ""

  const priceRange = document.getElementById("priceRange")
  if (priceRange) {
    priceRange.value = 2000
    const maxPriceLabel = document.getElementById("maxPrice")
    if (maxPriceLabel) maxPriceLabel.textContent = "₹2000L"
  }

  const rangeFilter = document.getElementById("rangeFilter")
  if (rangeFilter) {
    rangeFilter.value = 50
    const maxRangeLabel = document.getElementById("maxRange")
    if (maxRangeLabel) maxRangeLabel.textContent = "50+ km"
  }

  // Uncheck all checkboxes and reset styles
  const checkboxes = document.querySelectorAll('input[type="checkbox"]')
  const checkboxItems = document.querySelectorAll(".checkbox-item")

  checkboxes.forEach((checkbox) => (checkbox.checked = false))
  checkboxItems.forEach((item) => {
    item.style.background = "transparent"
    item.style.transform = "translateX(0)"
  })

  // Reset sort
  const sortSelect = document.getElementById("sortSelect")
  if (sortSelect) sortSelect.value = "name"
  currentSort = "name"

  // Apply filters
  applyFilters()

  // Success feedback
  const clearBtn = document.querySelector(".clear-filters")
  if (clearBtn) {
    clearBtn.style.transform = "scale(0.95)"
    clearBtn.innerHTML = '<i class="fas fa-check"></i> Filters Cleared'

    setTimeout(() => {
      clearBtn.style.transform = "scale(1)"
      clearBtn.innerHTML = '<i class="fas fa-times"></i> Clear All'
    }, 1000)
  }
}

function viewDetails(evId) {
  const ev = completeEVDatabase.find((vehicle) => vehicle.id === evId)
  if (ev) {
    localStorage.setItem("selectedEV", JSON.stringify(ev))

    const batteryInfo = ev.batteryOptions.map((b) => `${b.capacity} kWh (${b.range || "N/A"} km)`).join(", ")
    const detailsText = `
${ev.fullName}

💰 Price: ₹${ev.priceMin} - ₹${ev.priceMax} Lakh
🔋 Battery Options: ${batteryInfo}
⚡ Power: ${ev.motorPower} PS / ${ev.torque} Nm
🏃 Range: ${ev.maxRange} km
🔌 Charging: ${ev.chargingType}
🚗 Body Type: ${ev.bodyType}
👥 Seating: ${ev.seating}
📏 Dimensions: ${ev.dimensions}
🛡 Warranty: ${ev.warranty}
🚀 Acceleration: ${ev.acceleration || "N/A"}

✨ Key Features: ${ev.features.join(", ")}
🎯 Variants: ${ev.variants.join(", ")}
    `

    alert(detailsText)
  }
}

function addToCompare(evId) {
  const ev = completeEVDatabase.find((vehicle) => vehicle.id === evId)
  if (ev) {
    const compareList = JSON.parse(localStorage.getItem("compareList") || "[]")

    if (compareList.find((item) => item.id === evId)) {
      alert(`${ev.fullName} is already in your comparison list!`)
      return
    }

    if (compareList.length >= 3) {
      alert("You can compare maximum 3 vehicles. Please remove one to add another.")
      return
    }

    compareList.push(ev)
    localStorage.setItem("compareList", JSON.stringify(compareList))

    // Success feedback
    const button = event.target
    const originalText = button.innerHTML
    button.innerHTML = '<i class="fas fa-check"></i> Added!'
    button.style.background = "#10b981"

    setTimeout(() => {
      button.innerHTML = originalText
      button.style.background = ""
    }, 2000)

    console.log(`${ev.fullName} added to comparison (${compareList.length}/3)`)
  }
}

// Export for use in other files
window.completeEVDatabase = completeEVDatabase

// Debug function
window.debugFilters = () => {
  console.log("Current filters:", currentFilters)
  console.log("Filtered EVs:", filteredEVs.length)
  console.log("All EVs:", completeEVDatabase.length)
}

console.log("Browse.js loaded successfully with 63 EVs and advanced filtering")