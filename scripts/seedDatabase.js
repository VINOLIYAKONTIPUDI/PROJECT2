const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
require("dotenv").config()

const User = require("../models/User")
const Vehicle = require("../models/Vehicle")
const ChargingStation = require("../models/ChargingStation")
const Review = require("../models/Review")

// Sample data
const sampleUsers = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    password: "Password123!",
    isEmailVerified: true,
    preferences: {
      budget: { min: 30000, max: 60000 },
      vehicleType: "sedan",
      rangeImportance: 8,
      techImportance: 7,
      chargingFeatures: ["fast-charging", "home-charging"],
      ecoFeatures: ["zero-emissions", "renewable-energy"],
    },
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@example.com",
    password: "Password123!",
    isEmailVerified: true,
    preferences: {
      budget: { min: 40000, max: 80000 },
      vehicleType: "suv",
      rangeImportance: 9,
      techImportance: 8,
      chargingFeatures: ["fast-charging", "public-network"],
      ecoFeatures: ["zero-emissions", "sustainable-materials"],
    },
  },
]

const sampleVehicles = [
  {
    make: "Tesla",
    model: "Model 3",
    year: 2024,
    price: {
      msrp: 38990,
      incentives: { federal: 7500, state: 2000, local: 0 },
    },
    specifications: {
      range: { epa: 358, wltp: 491, real_world: 320 },
      efficiency: { mpge_city: 142, mpge_highway: 132, mpge_combined: 132, kwh_per_100mi: 25.4 },
      battery: { capacity_kwh: 75, chemistry: "NCM", warranty_years: 8, warranty_miles: 120000 },
      charging: { ac_max_kw: 11, dc_max_kw: 250, charge_port: "Tesla", time_10_80_minutes: 31 },
      performance: {
        acceleration_0_60: 5.8,
        top_speed_mph: 140,
        horsepower: 283,
        torque_lb_ft: 307,
        drivetrain: "RWD",
      },
      dimensions: {
        length_inches: 184.8,
        width_inches: 72.8,
        height_inches: 56.8,
        wheelbase_inches: 113.2,
        ground_clearance_inches: 5.5,
        cargo_volume_cubic_feet: 15,
        seating_capacity: 5,
      },
    },
    bodyType: "sedan",
    features: {
      standard: ["Autopilot", "15-inch touchscreen", "Premium audio", "Glass roof"],
      optional: ["Full Self-Driving", "Premium interior", "Performance upgrade"],
      safety: ["5-star safety rating", "Automatic emergency braking", "Blind spot monitoring"],
      technology: ["Over-the-air updates", "Mobile app control", "Supercharger network"],
      comfort: ["Heated seats", "Climate control", "Premium materials"],
    },
    images: [
      { url: "/images/tesla-model3-exterior.jpg", alt: "Tesla Model 3 Exterior", type: "exterior" },
      { url: "/images/tesla-model3-interior.jpg", alt: "Tesla Model 3 Interior", type: "interior" },
    ],
    availability: { status: "available", regions: ["US", "CA", "EU"], expected_delivery_weeks: 4 },
    ratings: { overall: 4.5, range: 4.7, charging: 4.8, technology: 4.9, comfort: 4.2, value: 4.3, review_count: 1250 },
    ecoScore: 95,
    techScore: 98,
  },
  {
    make: "BMW",
    model: "i4",
    year: 2024,
    price: {
      msrp: 56395,
      incentives: { federal: 7500, state: 1000, local: 0 },
    },
    specifications: {
      range: { epa: 270, wltp: 365, real_world: 240 },
      efficiency: { mpge_city: 109, mpge_highway: 108, mpge_combined: 109, kwh_per_100mi: 31.0 },
      battery: { capacity_kwh: 83.9, chemistry: "NCM", warranty_years: 8, warranty_miles: 100000 },
      charging: { ac_max_kw: 11, dc_max_kw: 200, charge_port: "CCS", time_10_80_minutes: 31 },
      performance: {
        acceleration_0_60: 5.7,
        top_speed_mph: 118,
        horsepower: 335,
        torque_lb_ft: 317,
        drivetrain: "RWD",
      },
      dimensions: {
        length_inches: 185.7,
        width_inches: 71.9,
        height_inches: 57.4,
        wheelbase_inches: 112.4,
        ground_clearance_inches: 5.1,
        cargo_volume_cubic_feet: 12,
        seating_capacity: 5,
      },
    },
    bodyType: "sedan",
    features: {
      standard: ["iDrive 8", "Wireless charging", "LED headlights", "Sport seats"],
      optional: ["M Sport package", "Premium package", "Driver assistance"],
      safety: ["5-star safety rating", "Active protection", "Parking assistant"],
      technology: ["BMW ConnectedDrive", "Wireless Apple CarPlay", "Digital key"],
      comfort: ["Automatic climate control", "Ambient lighting", "Power seats"],
    },
    images: [
      { url: "/images/bmw-i4-exterior.jpg", alt: "BMW i4 Exterior", type: "exterior" },
      { url: "/images/bmw-i4-interior.jpg", alt: "BMW i4 Interior", type: "interior" },
    ],
    availability: { status: "available", regions: ["US", "CA", "EU"], expected_delivery_weeks: 6 },
    ratings: { overall: 4.3, range: 4.1, charging: 4.2, technology: 4.5, comfort: 4.6, value: 4.0, review_count: 890 },
    ecoScore: 88,
    techScore: 85,
  },
  {
    make: "Nissan",
    model: "Leaf",
    year: 2024,
    price: {
      msrp: 28040,
      incentives: { federal: 7500, state: 2500, local: 500 },
    },
    specifications: {
      range: { epa: 149, wltp: 270, real_world: 130 },
      efficiency: { mpge_city: 123, mpge_highway: 99, mpge_combined: 111, kwh_per_100mi: 30.4 },
      battery: { capacity_kwh: 40, chemistry: "LFP", warranty_years: 8, warranty_miles: 100000 },
      charging: { ac_max_kw: 6.6, dc_max_kw: 100, charge_port: "CHAdeMO", time_10_80_minutes: 40 },
      performance: { acceleration_0_60: 7.4, top_speed_mph: 90, horsepower: 147, torque_lb_ft: 236, drivetrain: "FWD" },
      dimensions: {
        length_inches: 176.4,
        width_inches: 70.5,
        height_inches: 61.0,
        wheelbase_inches: 106.3,
        ground_clearance_inches: 6.1,
        cargo_volume_cubic_feet: 23.6,
        seating_capacity: 5,
      },
    },
    bodyType: "hatchback",
    features: {
      standard: ["NissanConnect", "Automatic emergency braking", "LED headlights"],
      optional: ["ProPILOT Assist", "Bose audio", "Around View Monitor"],
      safety: ["5-star safety rating", "Blind spot warning", "Rear cross traffic alert"],
      technology: ["8-inch touchscreen", "Apple CarPlay", "Android Auto"],
      comfort: ["Heated seats", "Dual-zone climate", "Remote climate control"],
    },
    images: [
      { url: "/images/nissan-leaf-exterior.jpg", alt: "Nissan Leaf Exterior", type: "exterior" },
      { url: "/images/nissan-leaf-interior.jpg", alt: "Nissan Leaf Interior", type: "interior" },
    ],
    availability: { status: "available", regions: ["US", "CA", "EU", "JP"], expected_delivery_weeks: 3 },
    ratings: { overall: 4.0, range: 3.5, charging: 3.8, technology: 3.9, comfort: 4.2, value: 4.5, review_count: 2100 },
    ecoScore: 92,
    techScore: 70,
  },
]

const sampleChargingStations = [
  {
    name: "Tesla Supercharger - Downtown",
    network: "Tesla",
    location: {
      address: {
        street: "123 Main St",
        city: "San Francisco",
        state: "CA",
        zipCode: "94105",
        country: "USA",
      },
      coordinates: {
        type: "Point",
        coordinates: [-122.4194, 37.7749],
      },
    },
    connectors: [
      {
        type: "Tesla",
        power_kw: 250,
        count: 12,
        available: 8,
        status: "operational",
      },
    ],
    amenities: ["restroom", "restaurant", "wifi", "parking", "covered", "24_7"],
    pricing: {
      per_kwh: 0.28,
      per_minute: 0,
      session_fee: 0,
      idle_fee: 1.0,
      membership_required: false,
    },
    hours: { is_24_7: true },
    ratings: { overall: 4.6, reliability: 4.8, speed: 4.7, amenities: 4.3, review_count: 450 },
  },
  {
    name: "ChargePoint Station - Mall",
    network: "ChargePoint",
    location: {
      address: {
        street: "456 Shopping Blvd",
        city: "Los Angeles",
        state: "CA",
        zipCode: "90210",
        country: "USA",
      },
      coordinates: {
        type: "Point",
        coordinates: [-118.2437, 34.0522],
      },
    },
    connectors: [
      {
        type: "CCS",
        power_kw: 150,
        count: 6,
        available: 4,
        status: "operational",
      },
      {
        type: "CHAdeMO",
        power_kw: 50,
        count: 2,
        available: 1,
        status: "operational",
      },
    ],
    amenities: ["restroom", "shopping", "wifi", "parking", "lighting"],
    pricing: {
      per_kwh: 0.25,
      per_minute: 0,
      session_fee: 1.0,
      idle_fee: 0.5,
      membership_required: false,
    },
    hours: {
      monday: { open: "06:00", close: "22:00" },
      tuesday: { open: "06:00", close: "22:00" },
      wednesday: { open: "06:00", close: "22:00" },
      thursday: { open: "06:00", close: "22:00" },
      friday: { open: "06:00", close: "23:00" },
      saturday: { open: "07:00", close: "23:00" },
      sunday: { open: "07:00", close: "22:00" },
      is_24_7: false,
    },
    ratings: { overall: 4.2, reliability: 4.0, speed: 4.3, amenities: 4.5, review_count: 280 },
  },
]

const seedDatabase = async () => {
  try {
    console.log("🌱 Starting database seeding...")

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/evmatch")
    console.log("✅ Connected to MongoDB")

    // Clear existing data
    console.log("🗑️  Clearing existing data...")
    await Promise.all([
      User.deleteMany({}),
      Vehicle.deleteMany({}),
      ChargingStation.deleteMany({}),
      Review.deleteMany({}),
    ])

    // Hash passwords for sample users
    for (const user of sampleUsers) {
      const salt = await bcrypt.genSalt(12)
      user.password = await bcrypt.hash(user.password, salt)
    }

    // Insert sample data
    console.log("📝 Inserting sample users...")
    const users = await User.insertMany(sampleUsers)
    console.log(`✅ Inserted ${users.length} users`)

    console.log("🚗 Inserting sample vehicles...")
    const vehicles = await Vehicle.insertMany(sampleVehicles)
    console.log(`✅ Inserted ${vehicles.length} vehicles`)

    console.log("🔌 Inserting sample charging stations...")
    const stations = await ChargingStation.insertMany(sampleChargingStations)
    console.log(`✅ Inserted ${stations.length} charging stations`)

    // Create sample reviews
    console.log("⭐ Creating sample reviews...")
    const sampleReviews = [
      {
        user: users[0]._id,
        vehicle: vehicles[0]._id,
        ratings: { overall: 5, range: 5, charging: 5, technology: 5, comfort: 4, value: 4 },
        title: "Amazing EV Experience",
        content:
          "The Tesla Model 3 has exceeded all my expectations. The range is fantastic for daily commuting, and the Supercharger network makes long trips a breeze. The technology is cutting-edge and the over-the-air updates keep improving the car. Highly recommended for anyone considering an EV!",
        pros: ["Excellent range", "Fast charging", "Advanced technology", "Great performance"],
        cons: ["Premium price", "Build quality could be better"],
        ownership: { duration_months: 12, mileage: 15000, usage_type: "daily_commute" },
        verified: true,
      },
      {
        user: users[1]._id,
        vehicle: vehicles[1]._id,
        ratings: { overall: 4, range: 4, charging: 4, technology: 5, comfort: 5, value: 3 },
        title: "Luxury EV Done Right",
        content:
          "The BMW i4 combines luxury with electric efficiency beautifully. The interior is premium quality and the driving experience is smooth and refined. The iDrive system is intuitive and the build quality is excellent. Range could be better for the price point, but overall a great luxury EV.",
        pros: ["Luxury interior", "Smooth driving", "Great technology", "Build quality"],
        cons: ["Expensive", "Range could be better", "Charging network limited"],
        ownership: { duration_months: 8, mileage: 8500, usage_type: "mixed" },
        verified: true,
      },
    ]

    const reviews = await Review.insertMany(sampleReviews)
    console.log(`✅ Inserted ${reviews.length} reviews`)

    // Update vehicle ratings based on reviews
    for (const vehicle of vehicles) {
      await Review.calculateVehicleRatings(vehicle._id)
    }
    console.log("✅ Updated vehicle ratings")

    console.log("🎉 Database seeding completed successfully!")
    console.log("\n📊 Summary:")
    console.log(`   Users: ${users.length}`)
    console.log(`   Vehicles: ${vehicles.length}`)
    console.log(`   Charging Stations: ${stations.length}`)
    console.log(`   Reviews: ${reviews.length}`)

    process.exit(0)
  } catch (error) {
    console.error("❌ Database seeding failed:", error)
    process.exit(1)
  }
}

// Run seeding if called directly
if (require.main === module) {
  seedDatabase()
}

module.exports = seedDatabase
