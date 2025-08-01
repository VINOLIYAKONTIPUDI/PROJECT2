// Compare page functionality with complete EV database
let selectedVehicles = [null, null, null]
let currentSelectorIndex = 0

// Declare the completeEVDatabase variable
let completeEVDatabase

// Load the complete EV database from browse.js
function loadEVDatabase() {
  // First try to load from browse.js
  if (typeof completeEVDatabase !== "undefined" && completeEVDatabase.length > 0) {
    return completeEVDatabase
  }

  // If browse.js hasn't loaded yet, try to load it dynamically
  if (window.completeEVDatabase && window.completeEVDatabase.length > 0) {
    return window.completeEVDatabase
  }

  // Complete fallback database with all your vehicles
  return [
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
      seating: 5,
      dimensions: "3993 x 1677 x 1537 mm",
      warranty: "8 years/1,60,000 km battery",
      features: ["Entry Level", "City Friendly", "Compact Design"],
      status: "Available",
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
      seating: 5,
      dimensions: "3993 x 1811 x 1606 mm",
      warranty: "8 years/1,60,000 km battery",
      features: ["Compact SUV", "High Ground Clearance", "Spacious Interior"],
      status: "Available",
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
      seating: 5,
      dimensions: "3993 x 1811 x 1606 mm",
      warranty: "8 years/1,60,000 km battery",
      features: ["Most Popular", "Fast Charging", "Premium Features"],
      status: "Available",
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
      seating: 5,
      dimensions: "4308 x 1810 x 1637 mm",
      warranty: "8 years/1,60,000 km battery",
      features: ["Coupe Design", "Premium Styling", "Latest Launch"],
      status: "Available",
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
      seating: 5,
      dimensions: "4598 x 1894 x 1706 mm",
      warranty: "8 years/1,60,000 km battery",
      features: ["Premium SUV", "Long Range", "Luxury Interior"],
      status: "Available",
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
      seating: 7,
      dimensions: "4661 x 1894 x 1786 mm",
      warranty: "8 years/1,60,000 km battery",
      features: ["7-Seater", "Family SUV", "Premium Features"],
      status: "Available",
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
      seating: 5,
      dimensions: "3993 x 1677 x 1532 mm",
      warranty: "8 years/1,60,000 km battery",
      features: ["Fleet Focused", "Sedan Comfort", "Commercial Use"],
      status: "Available",
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
      seating: 5,
      dimensions: "4371 x 1907 x 1627 mm",
      warranty: "Lifetime battery warranty",
      features: ["INGLO Platform", "Advanced ADAS", "Premium Interior"],
      status: "Available",
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
      seating: 5,
      dimensions: "4789 x 1907 x 1690 mm",
      warranty: "Lifetime battery warranty",
      features: ["Triple Display", "7 Airbags", "360° Camera"],
      status: "Available",
      acceleration: "0-100 km/h in 6.8s",
    },

    // MG Motor EVs
    {
      id: 10,
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
      seating: 5,
      dimensions: "4323 x 1809 x 1649 mm",
      warranty: "8 years/1,50,000 km battery",
      features: ["i-SMART Technology", "Premium Interior", "Advanced Safety"],
      status: "Available",
    },
    {
      id: 11,
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
      seating: 4,
      dimensions: "2974 x 1505 x 1640 mm",
      warranty: "8 years/1,50,000 km battery",
      features: ["Ultra Compact", "City Friendly", "55+ Connected Features"],
      status: "Available",
    },
    {
      id: 12,
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
      seating: 5,
      dimensions: "4295 x 1850 x 1677 mm",
      warranty: "Lifetime battery warranty",
      features: ["Aero-Lounge Seats", "Infinity View Glass Roof", "BaaS Program"],
      status: "Available",
    },

    // Citroën EVs
    {
      id: 13,
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
      seating: 5,
      dimensions: "3981 x 1733 x 1669 mm",
      warranty: "7 years/1,40,000 km battery",
      features: ["10.2-inch Touchscreen", "Eco Mode", "Regenerative Braking"],
      status: "Available",
    },
    {
      id: 14,
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
      seating: 5,
      dimensions: "4352 x 1765 x 1593 mm",
      warranty: "8 years/1,60,000 km battery",
      features: ["SUV Coupe Design", "Modern Connectivity", "Advanced Safety"],
      status: "Coming Soon",
    },
    // Atul Electric Vehicles
    {
      id: 15,
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
      seating: 4,
      dimensions: "2836 x 1390 x 1890 mm",
      warranty: "3 years battery",
      features: ["IP67 Battery", "Active Thermal Management", "AI Telemetry"],
      status: "Available",
    },
    {
      id: 16,
      make: "Greaves",
      model: "ELP",
      fullName: "Greaves ELP",
      bodyType: "three-wheeler",
      priceMin: 3.4,
      priceMax: 3.5,
      batteryOptions: [{ capacity: 9.8, type: "LFP", range: 125 }],
      motorPower: 9.55,
      torque: 0,
      maxRange: 125,
      chargingType: "NA",
      topSpeed: 25,
      seating: 4,
      dimensions: "NA",
      warranty: "NA",
      features: ["ICAT Certified", "Telematics", "Driver App"],
      status: "Available",
    },
    {
      id: 17,
      make: "Euler",
      model: "HiLoad EV",
      fullName: "Euler HiLoad EV",
      bodyType: "three-wheeler",
      priceMin: 3.99,
      priceMax: 4.2,
      batteryOptions: [
        { capacity: 12.4, type: "72V Li-ion", range: 151 },
        { capacity: 17.4, type: "72V Li-ion", range: 200 },
      ],
      motorPower: 14.7,
      torque: 88.5,
      maxRange: 200,
      chargingType: "NA",
      topSpeed: 42,
      seating: 1,
      dimensions: "NA",
      warranty: "NA",
      features: ["1300 kg Payload", "7kW Charger", "Telematics"],
      status: "Available",
    },
    {
      id: 18,
      make: "Piaggio",
      model: "Ape E-City FX Max",
      fullName: "Piaggio Ape E-City FX Max",
      bodyType: "three-wheeler",
      priceMin: 3.54,
      priceMax: 3.54,
      batteryOptions: [{ capacity: 7.5, type: "Li-ion", range: 145 }],
      motorPower: 8.04,
      torque: 45,
      maxRange: 145,
      chargingType: "NA",
      topSpeed: 45,
      seating: 4,
      dimensions: "NA",
      warranty: "NA",
      features: ["Hill Assist", "Regenerative Braking", "Multi-Terrain Mode"],
      status: "Available",
    },
    {
      id: 19,
      make: "Bajaj",
      model: "RE E-Tec 9.0",
      fullName: "Bajaj RE E-Tec 9.0",
      bodyType: "three-wheeler",
      priceMin: 3.55,
      priceMax: 3.55,
      batteryOptions: [{ capacity: 8.9, type: "Fixed", range: 178 }],
      motorPower: 7.37,
      torque: 0,
      maxRange: 178,
      chargingType: "NA",
      topSpeed: 45,
      seating: 4,
      dimensions: "NA",
      warranty: "NA",
      features: ["Torque Assist", "Safety Lock", "UV Resistant Paint"],
      status: "Available",
    },
    {
      id: 20,
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
      chargingType: "NA",
      topSpeed: 55,
      seating: 4,
      dimensions: "NA",
      warranty: "NA",
      features: ["Direct Drive", "Low Maintenance", "Easy to Drive"],
      status: "Available",
    },
    {
      id: 21,
      make: "Lohia Auto",
      model: "Humsafar iSmart",
      fullName: "Lohia Auto Humsafar iSmart",
      bodyType: "three-wheeler",
      priceMin: 2.99,
      priceMax: 3.15,
      batteryOptions: [{ capacity: 7.7, type: "Li-ion", range: 100 }],
      motorPower: 8.4,
      torque: 0,
      maxRange: 100,
      chargingType: "NA",
      topSpeed: 40,
      seating: 4,
      dimensions: "NA",
      warranty: "NA",
      features: ["Digital Instrument Cluster", "GPS", "Mobile Charging"],
      status: "Available",
    },
    {
      id: 22,
      make: "Okinawa",
      model: "Dual 100",
      fullName: "Okinawa Dual 100",
      bodyType: "two-wheeler",
      priceMin: 1.26,
      priceMax: 1.26,
      batteryOptions: [{ capacity: 2.2, type: "Li-ion", range: 149 }],
      motorPower: 2.5,
      torque: 0,
      maxRange: 149,
      chargingType: "NA",
      topSpeed: 55,
      seating: 2,
      dimensions: "NA",
      warranty: "NA",
      features: ["Central Locking", "Anti-Theft Alarm", "Alloy Wheels"],
      status: "Available",
    },
    {
      id: 23,
      make: "Hero Electric",
      model: "Eddy",
      fullName: "Hero Electric Eddy",
      bodyType: "two-wheeler",
      priceMin: 0.72,
      priceMax: 0.72,
      batteryOptions: [{ capacity: 1.536, type: "Li-ion", range: 85 }],
      motorPower: 1.2,
      torque: 0,
      maxRange: 85,
      chargingType: "NA",
      topSpeed: 25,
      seating: 2,
      dimensions: "NA",
      warranty: "NA",
      features: ["Find My Bike", "Reverse Mode", "Digital Display"],
      status: "Available",
    },
    {
      id: 24,
      make: "Ampere",
      model: "Primus",
      fullName: "Ampere Primus",
      bodyType: "two-wheeler",
      priceMin: 1.1,
      priceMax: 1.3,
      batteryOptions: [{ capacity: 3, type: "LFP", range: 100 }],
      motorPower: 4,
      torque: 0,
      maxRange: 100,
      chargingType: "NA",
      topSpeed: 77,
      seating: 2,
      dimensions: "NA",
      warranty: "NA",
      features: ["Bluetooth Connectivity", "Navigation Assist", "Call Alerts"],
      status: "Available",
    },
    {
      id: 25,
      make: "Ola Electric",
      model: "S1 Pro",
      fullName: "Ola Electric S1 Pro",
      bodyType: "two-wheeler",
      priceMin: 1.47,
      priceMax: 1.47,
      batteryOptions: [{ capacity: 4, type: "NMC", range: 181 }],
      motorPower: 11,
      torque: 58,
      maxRange: 181,
      chargingType: "NA",
      topSpeed: 120,
      seating: 2,
      dimensions: "NA",
      warranty: "NA",
      features: ["Hyper Mode", "Hill Hold", "Proximity Unlock"],
      status: "Available",
    },
    {
      id: 26,
      make: "Ather",
      model: "450X",
      fullName: "Ather 450X",
      bodyType: "two-wheeler",
      priceMin: 1.42,
      priceMax: 1.42,
      batteryOptions: [{ capacity: 3.7, type: "Li-ion", range: 150 }],
      motorPower: 6.4,
      torque: 26,
      maxRange: 150,
      chargingType: "NA",
      topSpeed: 90,
      seating: 2,
      dimensions: "NA",
      warranty: "NA",
      features: ["Warp Mode", "Auto Indicator Cut-off", "Guide Me Home Lights"],
      status: "Available",
    },
    {
      id: 27,
      make: "TVS",
      model: "iQube",
      fullName: "TVS iQube",
      bodyType: "two-wheeler",
      priceMin: 1.15,
      priceMax: 1.15,
      batteryOptions: [{ capacity: 3.04, type: "Li-ion", range: 100 }],
      motorPower: 4.4,
      torque: 33,
      maxRange: 100,
      chargingType: "NA",
      topSpeed: 78,
      seating: 2,
      dimensions: "NA",
      warranty: "NA",
      features: ["SmartXonnect", "Navigation Assist", "Incoming Call Alerts"],
      status: "Available",
    },
    {
      id: 28,
      make: "Revolt",
      model: "RV400",
      fullName: "Revolt RV400",
      bodyType: "two-wheeler",
      priceMin: 1.5,
      priceMax: 1.5,
      batteryOptions: [{ capacity: 3.24, type: "Li-ion", range: 150 }],
      motorPower: 3,
      torque: 54,
      maxRange: 150,
      chargingType: "NA",
      topSpeed: 85,
      seating: 2,
      dimensions: "NA",
      warranty: "NA",
      features: ["AI Enabled", "Geo-Fencing", "Remote Start"],
      status: "Available",
    },
    {
      id: 29,
      make: "Oben",
      model: "Rorr",
      fullName: "Oben Rorr",
      bodyType: "two-wheeler",
      priceMin: 1.25,
      priceMax: 1.25,
      batteryOptions: [{ capacity: 4.4, type: "LFP", range: 200 }],
      motorPower: 8,
      torque: 62,
      maxRange: 200,
      chargingType: "NA",
      topSpeed: 100,
      seating: 2,
      dimensions: "NA",
      warranty: "NA",
      features: ["Reverse Assist", "Combined Braking System", "OTG Updates"],
      status: "Available",
    },
    {
      id: 30,
      make: "Komaki",
      model: "Ranger",
      fullName: "Komaki Ranger",
      bodyType: "two-wheeler",
      priceMin: 1.68,
      priceMax: 1.68,
      batteryOptions: [{ capacity: 4, type: "Li-ion", range: 220 }],
      motorPower: 5,
      torque: 0,
      maxRange: 220,
      chargingType: "NA",
      topSpeed: 80,
      seating: 2,
      dimensions: "NA",
      warranty: "NA",
      features: ["Cruise Control", "Repair Switch", "Bluetooth Speakers"],
      status: "Available",
    },
    {
      id: 31,
      make: "BGauss",
      model: "D15i",
      fullName: "BGauss D15i",
      bodyType: "two-wheeler",
      priceMin: 1.45,
      priceMax: 1.45,
      batteryOptions: [{ capacity: 3.2, type: "Li-ion", range: 115 }],
      motorPower: 3.1,
      torque: 0,
      maxRange: 115,
      chargingType: "NA",
      topSpeed: 60,
      seating: 2,
      dimensions: "NA",
      warranty: "NA",
      features: ["Smart App Connectivity", "Geo-Fencing", "Keyless Start"],
      status: "Available",
    },
    {
      id: 32,
      make: "Bounce",
      model: "Infinity E1",
      fullName: "Bounce Infinity E1",
      bodyType: "two-wheeler",
      priceMin: 0.79,
      priceMax: 1.05,
      batteryOptions: [{ capacity: 1.9, type: "Li-ion", range: 85 }],
      motorPower: 1.5,
      torque: 0,
      maxRange: 85,
      chargingType: "Swappable Battery",
      topSpeed: 65,
      seating: 2,
      dimensions: "NA",
      warranty: "NA",
      features: ["Drag Mode", "Reverse Mode", "Tow Alert"],
      status: "Available",
    },
    {
      id: 33,
      make: "Okaya",
      model: "Faast F4",
      fullName: "Okaya Faast F4",
      bodyType: "two-wheeler",
      priceMin: 1.15,
      priceMax: 1.15,
      batteryOptions: [{ capacity: 4.4, type: "Li-ion", range: 160 }],
      motorPower: 2,
      torque: 0,
      maxRange: 160,
      chargingType: "NA",
      topSpeed: 70,
      seating: 2,
      dimensions: "NA",
      warranty: "NA",
      features: ["Digital Display", "Remote Control", "Wheel Lock"],
      status: "Available",
    },
    {
      id: 34,
      make: "Hero Lectro",
      model: "C6",
      fullName: "Hero Lectro C6",
      bodyType: "e-cycle",
      priceMin: 0.35,
      priceMax: 0.35,
      batteryOptions: [{ capacity: 0.25, type: "Li-ion", range: 25 }],
      motorPower: 0.25,
      torque: 0,
      maxRange: 25,
      chargingType: "NA",
      topSpeed: 25,
      seating: 1,
      dimensions: "NA",
      warranty: "NA",
      features: ["Pedal Assist", "LED Display", "Adjustable Seat"],
      status: "Available",
    },
    {
      id: 35,
      make: "EMotorad",
      model: "Trex Plus",
      fullName: "EMotorad Trex Plus",
      bodyType: "e-cycle",
      priceMin: 0.55,
      priceMax: 0.55,
      batteryOptions: [{ capacity: 0.46, type: "Li-ion", range: 60 }],
      motorPower: 0.25,
      torque: 0,
      maxRange: 60,
      chargingType: "NA",
      topSpeed: 25,
      seating: 1,
      dimensions: "NA",
      warranty: "NA",
      features: ["Dual Disc Brakes", "Smart Display", "Key Lock"],
      status: "Available",
    },
    {
      id: 36,
      make: "Nexzu",
      model: "Rompus Plus",
      fullName: "Nexzu Rompus Plus",
      bodyType: "cargo-e-cycle",
      priceMin: 0.33,
      priceMax: 0.33,
      batteryOptions: [{ capacity: 5.2, type: "Li-ion", range: 22 }],
      motorPower: 0.25,
      torque: 0,
      maxRange: 22,
      chargingType: "NA",
      topSpeed: 25,
      seating: 1,
      dimensions: "NA",
      warranty: "NA",
      features: ["Cargo Carrier", "Adjustable Seat", "LED Lights"],
      status: "Available",
    },
    {
      id: 37,
      make: "Zypp",
      model: "Cargo",
      fullName: "Zypp Cargo",
      bodyType: "cargo-scooter",
      priceMin: 0.59,
      priceMax: 0.74,
      batteryOptions: [
        { capacity: 4.0, type: "40Ah Li-ion", range: 120 },
        { capacity: 8.0, type: "Dual Battery", range: 240 },
      ],
      motorPower: 1.3,
      torque: 15,
      maxRange: 240,
      chargingType: "Swappable Battery",
      topSpeed: 51,
      seating: 1,
      dimensions: "1905 x 711 x 1168 mm",
      warranty: "2 years battery",
      features: ["250kg Payload", "IoT Tracking", "Fleet Integration"],
      status: "Available",
    },
    // Mahindra EVs (Updated/Additional)
    {
      id: 38,
      make: "Mahindra",
      model: "BE 6e",
      fullName: "Mahindra BE 6e",
      bodyType: "SUV",
      priceMin: 18.9,
      priceMax: 30.5,
      batteryOptions: [
        { capacity: 59, type: "LFP", range: 556 },
        { capacity: 79, type: "LFP", range: 682 },
      ],
      motorPower: 282,
      torque: 380,
      maxRange: 682,
      chargingType: "175 kW DC Fast Charging",
      topSpeed: 200,
      seating: 5,
      dimensions: "4371 x 1907 x 1627 mm",
      warranty: "Lifetime battery warranty",
      features: ["INGLO Platform", "Advanced ADAS", "Premium Interior", "0-100 in 6.7s"],
      status: "Available",
      acceleration: "0-100 km/h in 6.7s",
    },
    {
      id: 39,
      make: "Mahindra",
      model: "XEV 9e",
      fullName: "Mahindra XEV 9e",
      bodyType: "SUV",
      priceMin: 21.9,
      priceMax: 31.25,
      batteryOptions: [
        { capacity: 59, type: "LFP", range: 542 },
        { capacity: 79, type: "LFP", range: 656 },
      ],
      motorPower: 282,
      torque: 380,
      maxRange: 656,
      chargingType: "175 kW DC Fast Charging",
      topSpeed: 200,
      seating: 5,
      dimensions: "4789 x 1907 x 1690 mm",
      warranty: "Lifetime battery warranty",
      features: ["Triple Display", "7 Airbags", "360° Camera", "0-100 in 6.8s"],
      status: "Available",
      acceleration: "0-100 km/h in 6.8s",
    },

    // MG Motor EVs (Updated)
    {
      id: 40,
      make: "MG",
      model: "ZS EV",
      fullName: "MG ZS EV",
      bodyType: "SUV",
      priceMin: 17.99,
      priceMax: 20.49,
      batteryOptions: [{ capacity: 50.3, type: "Li-ion", range: 461 }],
      motorPower: 177,
      torque: 280,
      maxRange: 461,
      chargingType: "7.4 kW AC, 50 kW DC",
      topSpeed: 140,
      seating: 5,
      dimensions: "4323 x 1809 x 1649 mm",
      warranty: "8 years/1,50,000 km battery",
      features: ["i-SMART Technology", "Premium Interior", "Advanced Safety"],
      status: "Available",
    },
    {
      id: 41,
      make: "MG",
      model: "Comet EV",
      fullName: "MG Comet EV",
      bodyType: "Hatchback",
      priceMin: 9.56,
      priceMax: 9.96,
      batteryOptions: [{ capacity: 17.3, type: "Li-ion", range: 230 }],
      motorPower: 42,
      torque: 110,
      maxRange: 230,
      chargingType: "3.3 kW AC, 7.4 kW AC",
      topSpeed: 105,
      seating: 4,
      dimensions: "2974 x 1505 x 1640 mm",
      warranty: "8 years/1,50,000 km battery",
      features: ["Ultra Compact", "City Friendly", "55+ Connected Features", "4-Seater"],
      status: "Available",
    },
    {
      id: 42,
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
      seating: 5,
      dimensions: "4295 x 1850 x 1677 mm",
      warranty: "Lifetime battery warranty",
      features: ["Aero-Lounge Seats", "Infinity View Glass Roof", "BaaS Program"],
      status: "Available",
    },

    // Citroën EVs (Updated)
    {
      id: 43,
      make: "Citroën",
      model: "eC3",
      fullName: "Citroën eC3",
      bodyType: "Hatchback",
      priceMin: 12.84,
      priceMax: 12.9,
      batteryOptions: [{ capacity: 29.2, type: "Li-ion", range: 320 }],
      motorPower: 57,
      torque: 143,
      maxRange: 320,
      chargingType: "15 Amp AC, DC Fast Charging",
      topSpeed: 107,
      seating: 5,
      dimensions: "3981 x 1733 x 1669 mm",
      warranty: "7 years/1,40,000 km battery",
      features: ["10.2-inch Touchscreen", "Eco Mode", "Regenerative Braking"],
      status: "Available",
    },
    {
      id: 44,
      make: "Citroën",
      model: "Basalt EV",
      fullName: "Citroën Basalt EV",
      bodyType: "Coupe SUV",
      priceMin: 14.0,
      priceMax: 17.0,
      batteryOptions: [{ capacity: 35, type: "Li-ion", range: 350 }],
      motorPower: 110,
      torque: 200,
      maxRange: 350,
      chargingType: "7.4 kW AC, 50 kW DC",
      topSpeed: 130,
      seating: 5,
      dimensions: "4352 x 1765 x 1593 mm",
      warranty: "8 years/1,60,000 km battery",
      features: ["SUV Coupe Design", "Modern Connectivity", "Advanced Safety"],
      status: "Coming Soon",
    },

    // Tesla EVs
    {
      id: 45,
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
      seating: 5,
      dimensions: "4751 x 1921 x 1624 mm",
      warranty: "8 years battery warranty",
      features: ["Autopilot", "Full Self-Driving", "Over-the-Air Updates", "Supercharger Network"],
      status: "Available",
      acceleration: "0-100 km/h in 6.9s",
    },

    // Kia EVs
    {
      id: 46,
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
      seating: 5,
      dimensions: "4695 x 1890 x 1570 mm",
      warranty: "8 years battery warranty",
      features: ["ADAS 2.0", "V2L Technology", "Panoramic Display", "Meridian Audio"],
      status: "Available",
      acceleration: "0-100 km/h in 5.0s",
    },
    {
      id: 47,
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
      seating: 7,
      dimensions: "5015 x 1980 x 1780 mm",
      warranty: "8 years battery warranty",
      features: ["7-Seater", "Captain Seats", "Massage Seats", "Trinity Display", "10 Airbags"],
      status: "Available",
      acceleration: "0-100 km/h in 5.3s",
    },

    // Mercedes-Benz EVs
    {
      id: 48,
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
      seating: 5,
      dimensions: "5216 x 1926 x 1512 mm",
      warranty: "8 years battery warranty",
      features: ["MBUX Hyperscreen", "Air Suspension", "Advanced ADAS", "Luxury Interior"],
      status: "Available",
      acceleration: "0-100 km/h in 4.3s",
    },
    {
      id: 49,
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
      seating: 7,
      dimensions: "5125 x 1959 x 1718 mm",
      warranty: "8 years battery warranty",
      features: ["7-Seater", "11 Airbags", "Active Brake Assist", "Luxury Features"],
      status: "Available",
      acceleration: "0-100 km/h in 4.7s",
    },
    {
      id: 50,
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
      seating: 5,
      dimensions: "4863 x 1940 x 1685 mm",
      warranty: "8 years battery warranty",
      features: ["9 Airbags", "ABS", "Premium Interior", "Advanced Safety"],
      status: "Available",
      acceleration: "0-100 km/h in 4.9s",
    },
    {
      id: 51,
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
      seating: 7,
      dimensions: "4684 x 1834 x 1667 mm",
      warranty: "8 years battery warranty",
      features: ["6 Airbags", "TPMS", "Compact Luxury", "Family SUV"],
      status: "Available",
      acceleration: "0-100 km/h in 6.2s",
    },
    {
      id: 52,
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
      seating: 5,
      dimensions: "4463 x 1834 x 1624 mm",
      warranty: "8 years battery warranty",
      features: ["7 Airbags", "ESC", "Compact Design", "Premium Features"],
      status: "Available",
      acceleration: "0-100 km/h in 8.6s",
    },
    {
      id: 53,
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
      seating: 4,
      dimensions: "5125 x 1959 x 1718 mm",
      warranty: "8 years battery warranty",
      features: ["Ultra Luxury", "11 Airbags", "Adaptive Cruise Control", "Maybach Features"],
      status: "Available",
      acceleration: "0-100 km/h in 4.4s",
    },
    {
      id: 54,
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
      seating: 5,
      dimensions: "5216 x 1926 x 1512 mm",
      warranty: "8 years battery warranty",
      features: ["AMG Performance", "9 Airbags", "Active Lane Keeping", "Track Mode"],
      status: "Available",
      acceleration: "0-100 km/h in 3.4s",
    },
    {
      id: 55,
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
      seating: 5,
      dimensions: "4817 x 1986 x 1954 mm",
      warranty: "8 years battery warranty",
      features: ["Iconic G-Wagon", "360° Camera", "8 Airbags", "Off-Road Capability"],
      status: "Available",
      acceleration: "0-100 km/h in 4.7s",
    },
  ]
}

function formatCurrency(value) {
  return `₹${value} Lakh`
}

// Initialize compare page
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("compare.html")) {
    console.log("Initializing compare page...")

    // Wait a bit for browse.js to load if it's included
    setTimeout(() => {
      initializeComparePage()
    }, 100)
  }
})

function initializeComparePage() {
  const evData = loadEVDatabase()
  console.log(`Loaded ${evData.length} vehicles for comparison`)

  setupVehicleSelectors()
  loadComparisonFromStorage()
  updateEmptyState()

  // Load comparison from URL parameters if available
  const urlParams = new URLSearchParams(window.location.search)
  const vehicles = urlParams.get("vehicles")
  if (vehicles) {
    const vehicleNames = vehicles.split(",")
    loadComparisonFromNames(vehicleNames)
  }
}

function setupVehicleSelectors() {
  const selectors = document.querySelectorAll(".vehicle-selector")
  selectors.forEach((selector, index) => {
    selector.addEventListener("click", () => {
      currentSelectorIndex = index
      showVehicleModal()
    })
  })
}

function loadComparisonFromStorage() {
  const compareList = JSON.parse(localStorage.getItem("compareList") || "[]")
  console.log("Loading comparison from storage:", compareList)

  compareList.forEach((vehicle, index) => {
    if (index < 3 && vehicle) {
      selectedVehicles[index] = vehicle
      updateVehicleSelector(index, vehicle)
    }
  })

  updateComparisonTable()
  updateEmptyState()
}

function showVehicleModal() {
  const modal = document.getElementById("vehicleModal")
  if (!modal) return

  const evData = loadEVDatabase()
  const vehicleList = document.getElementById("vehicleList")

  console.log(`Showing ${evData.length} vehicles in modal`)

  if (vehicleList) {
    const availableVehicles = evData.filter((ev) => ev.status !== "Coming Soon")
    console.log(`${availableVehicles.length} available vehicles (excluding Coming Soon)`)

    vehicleList.innerHTML = availableVehicles.map((ev) => createVehicleOption(ev)).join("")
  }

  // Setup search
  const vehicleSearch = document.getElementById("vehicleSearch")
  if (vehicleSearch) {
    vehicleSearch.value = ""
    vehicleSearch.addEventListener("input", (e) => {
      filterVehicleList(e.target.value)
    })
  }

  modal.style.display = "block"

  // Focus search input
  setTimeout(() => {
    if (vehicleSearch) vehicleSearch.focus()
  }, 100)
}

function createVehicleOption(ev) {
  const maxBattery = Math.max(...ev.batteryOptions.map((b) => b.capacity))

  // Brand color coding
  const brandColors = {
    Tata: "#1e40af",
    Mahindra: "#dc2626",
    MG: "#059669",
    Citroën: "#7c3aed",
  }

  const brandColor = brandColors[ev.make] || "#6b7280"

  return `
    <div class="vehicle-option" onclick="selectVehicle(${ev.id})">
      <div class="vehicle-option-content">
        <div class="vehicle-option-image" style="background: linear-gradient(135deg, ${brandColor}, ${brandColor}dd);">
          <div class="make-badge">${ev.make}</div>
        </div>
        <div class="vehicle-option-details">
          <div class="vehicle-option-name">${ev.make} ${ev.model}</div>
          <div class="vehicle-option-price">${formatCurrency(ev.priceMin)} - ${formatCurrency(ev.priceMax)}</div>
          <div class="vehicle-option-specs">
            <span>${ev.maxRange}km</span> • 
            <span>${maxBattery}kWh</span> • 
            <span>${ev.motorPower}PS</span>
          </div>
        </div>
      </div>
    </div>
  `
}

function filterVehicleList(searchTerm) {
  const vehicleList = document.getElementById("vehicleList")
  if (!vehicleList) return

  const evData = loadEVDatabase()
  const filteredVehicles = evData.filter(
    (ev) =>
      ev.status !== "Coming Soon" &&
      (ev.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ev.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ev.fullName.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  console.log(`Filtered to ${filteredVehicles.length} vehicles for search: "${searchTerm}"`)

  vehicleList.innerHTML = filteredVehicles.map((ev) => createVehicleOption(ev)).join("")
}

function selectVehicle(vehicleId) {
  const evData = loadEVDatabase()
  const vehicle = evData.find((ev) => ev.id === vehicleId)
  if (!vehicle) return

  // Check if vehicle is already selected
  if (selectedVehicles.some((v) => v && v.id === vehicleId)) {
    alert(`${vehicle.fullName} is already selected for comparison!`)
    return
  }

  selectedVehicles[currentSelectorIndex] = vehicle
  updateVehicleSelector(currentSelectorIndex, vehicle)
  closeVehicleModal()
  updateComparisonTable()
  updateLocalStorage()
  updateEmptyState()

  console.log("Vehicle selected:", vehicle.fullName)
}

function updateVehicleSelector(index, vehicle) {
  const selector = document.getElementById(`selector${index + 1}`)
  if (!selector) return

  const maxBattery = Math.max(...vehicle.batteryOptions.map((b) => b.capacity))

  // Brand color coding
  const brandColors = {
    Tata: "#1e40af",
    Mahindra: "#dc2626",
    MG: "#059669",
    Citroën: "#7c3aed",
  }

  const brandColor = brandColors[vehicle.make] || "#6b7280"

  selector.innerHTML = `
    <div class="selected-vehicle">
      <div class="selected-vehicle-image" style="background: linear-gradient(135deg, ${brandColor}, ${brandColor}dd);">
        <div class="make-badge">${vehicle.make}</div>
      </div>
      <div class="selected-vehicle-info">
        <div class="selected-vehicle-name">${vehicle.make} ${vehicle.model}</div>
        <div class="selected-vehicle-price">${formatCurrency(vehicle.priceMin)} - ${formatCurrency(vehicle.priceMax)}</div>
        <div class="selected-vehicle-specs">
          <span>${vehicle.maxRange}km</span> • <span>${maxBattery}kWh</span>
        </div>
      </div>
      <button class="remove-vehicle-btn" onclick="removeVehicle(${index})">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `

  selector.classList.add("selected")
}

function removeVehicle(index) {
  selectedVehicles[index] = null
  const selector = document.getElementById(`selector${index + 1}`)

  if (selector) {
    selector.innerHTML = `
      <div class="selector-placeholder">
        <i class="fas fa-plus"></i>
        <span>Select ${index === 0 ? "First" : index === 1 ? "Second" : "Third"} Vehicle</span>
      </div>
    `
    selector.classList.remove("selected")
  }

  updateComparisonTable()
  updateLocalStorage()
  updateEmptyState()

  console.log("Vehicle removed from position:", index)
}

function updateComparisonTable() {
  const hasVehicles = selectedVehicles.some((v) => v !== null)
  const comparisonTable = document.getElementById("comparisonTable")

  if (!hasVehicles || !comparisonTable) {
    if (comparisonTable) comparisonTable.style.display = "none"
    return
  }

  comparisonTable.style.display = "block"

  // Update headers
  selectedVehicles.forEach((vehicle, index) => {
    const header = document.getElementById(`vehicle${index + 1}Header`)
    if (header) {
      header.innerHTML = vehicle
        ? `
          <div class="comparison-header">
            <div class="comparison-vehicle-name">${vehicle.make} ${vehicle.model}</div>
            <div class="comparison-vehicle-price">${formatCurrency(vehicle.priceMin)} - ${formatCurrency(vehicle.priceMax)}</div>
          </div>
        `
        : ""
    }
  })

  // Generate comparison rows with highlighting
  const comparisonBody = document.getElementById("comparisonBody")
  if (comparisonBody) {
    const specs = [
      { label: "Starting Price", key: "priceMin", format: "currency", compare: "lower" },
      { label: "Max Price", key: "priceMax", format: "currency", compare: "lower" },
      { label: "Range", key: "maxRange", format: "km", compare: "higher" },
      { label: "Battery Capacity", key: "batteryOptions", format: "battery", compare: "higher" },
      { label: "Motor Power", key: "motorPower", format: "power", compare: "higher" },
      { label: "Torque", key: "torque", format: "torque", compare: "higher" },
      { label: "Body Type", key: "bodyType", format: "text", compare: "none" },
      { label: "Top Speed", key: "topSpeed", format: "speed", compare: "higher" },
      { label: "Seating", key: "seating", format: "people", compare: "higher" },
      { label: "Charging", key: "chargingType", format: "text", compare: "none" },
      { label: "Warranty", key: "warranty", format: "text", compare: "none" },
    ]

    comparisonBody.innerHTML = specs.map((spec) => generateComparisonRow(spec)).join("")
  }
}

function generateComparisonRow(spec) {
  const values = selectedVehicles.map((vehicle) => {
    if (!vehicle) return null
    return getSpecValue(vehicle[spec.key], spec.format)
  })

  // Find best value for highlighting
  const bestIndices = findBestValues(values, spec.compare, spec.format)

  return `
    <div class="comparison-row">
      <div class="spec-label">${spec.label}</div>
      ${selectedVehicles
        .map(
          (vehicle, index) => `
        <div class="spec-value ${bestIndices.includes(index) ? "best" : ""}">
          ${vehicle ? formatSpecValue(vehicle[spec.key], spec.format) : "—"}
        </div>
      `,
        )
        .join("")}
    </div>
  `
}

function getSpecValue(value, format) {
  if (format === "battery" && Array.isArray(value)) {
    return Math.max(...value.map((b) => b.capacity))
  }
  return value
}

function findBestValues(values, compareType, format) {
  if (compareType === "none") return []

  const numericValues = values
    .map((val, index) => {
      if (val === null) return { value: null, index }

      let numVal = val
      if (format === "battery" && Array.isArray(val)) {
        numVal = Math.max(...val.map((b) => b.capacity))
      }

      return { value: typeof numVal === "number" ? numVal : null, index }
    })
    .filter((item) => item.value !== null)

  if (numericValues.length === 0) return []

  const bestValue =
    compareType === "higher"
      ? Math.max(...numericValues.map((item) => item.value))
      : Math.min(...numericValues.map((item) => item.value))

  return numericValues.filter((item) => item.value === bestValue).map((item) => item.index)
}

function formatSpecValue(value, format) {
  if (value === null || value === undefined) return "—"

  switch (format) {
    case "currency":
      return formatCurrency(value)
    case "km":
      return `${value} km`
    case "battery":
      if (Array.isArray(value)) {
        const maxCapacity = Math.max(...value.map((b) => b.capacity))
        return `${maxCapacity} kWh`
      }
      return `${value} kWh`
    case "power":
      return `${value} PS`
    case "torque":
      return `${value} Nm`
    case "speed":
      return `${value} km/h`
    case "people":
      return `${value} ${value === 1 ? "person" : "people"}`
    default:
      return value || "—"
  }
}

function updateEmptyState() {
  const hasVehicles = selectedVehicles.some((v) => v !== null)
  const emptyComparison = document.getElementById("emptyComparison")

  if (emptyComparison) {
    emptyComparison.style.display = hasVehicles ? "none" : "block"
  }
}

function closeVehicleModal() {
  const modal = document.getElementById("vehicleModal")
  if (modal) {
    modal.style.display = "none"
  }
}

function updateLocalStorage() {
  const compareList = selectedVehicles.filter((v) => v !== null)
  localStorage.setItem("compareList", JSON.stringify(compareList))
  console.log("Updated localStorage with:", compareList.length, "vehicles")
}

function loadPopularComparison(vehicleNames) {
  console.log("Loading popular comparison:", vehicleNames)

  const evData = loadEVDatabase()

  // Clear current selection
  selectedVehicles = [null, null, null]

  vehicleNames.forEach((name, index) => {
    if (index < 3) {
      const vehicle = evData.find((ev) => ev.fullName === name || `${ev.make} ${ev.model}` === name)
      if (vehicle) {
        selectedVehicles[index] = vehicle
        updateVehicleSelector(index, vehicle)
      }
    }
  })

  updateComparisonTable()
  updateLocalStorage()
  updateEmptyState()

  // Scroll to comparison table
  const comparisonTable = document.getElementById("comparisonTable")
  if (comparisonTable && comparisonTable.style.display !== "none") {
    comparisonTable.scrollIntoView({ behavior: "smooth" })
  }
}

function loadComparisonFromNames(vehicleNames) {
  loadPopularComparison(vehicleNames)
}

// Close modal when clicking outside
window.addEventListener("click", (event) => {
  const modal = document.getElementById("vehicleModal")
  if (event.target === modal) {
    closeVehicleModal()
  }
})

// Keyboard shortcuts
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeVehicleModal()
  }
})

console.log("Compare.js loaded successfully with complete EV database")
