const express = require("express")
const { body, validationResult } = require("express-validator")
const Vehicle = require("../models/Vehicle")
const auth = require("../middleware/auth")

const router = express.Router()

// Compare multiple vehicles
router.post(
  "/",
  [
    body("vehicleIds").isArray({ min: 2, max: 3 }).withMessage("Must compare 2-3 vehicles"),
    body("vehicleIds.*").isMongoId().withMessage("Invalid vehicle ID"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: errors.array(),
        })
      }

      const { vehicleIds } = req.body

      // Get vehicles
      const vehicles = await Vehicle.find({
        _id: { $in: vehicleIds },
        isActive: true,
      })

      if (vehicles.length !== vehicleIds.length) {
        return res.status(404).json({
          success: false,
          message: "One or more vehicles not found",
        })
      }

      // Update comparison count for each vehicle
      await Vehicle.updateMany({ _id: { $in: vehicleIds } }, { $inc: { "metadata.comparisons": 1 } })

      // Generate comparison data
      const comparison = generateComparison(vehicles)

      res.json({
        success: true,
        data: { comparison },
      })
    } catch (error) {
      console.error("Vehicle comparison error:", error)
      res.status(500).json({
        success: false,
        message: "Failed to compare vehicles",
        error: process.env.NODE_ENV === "development" ? error.message : "Internal server error",
      })
    }
  },
)

// Helper function to generate comparison data
function generateComparison(vehicles) {
  const comparison = {
    vehicles: vehicles.map((vehicle) => ({
      id: vehicle._id,
      name: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
      data: vehicle,
    })),
    categories: [],
  }

  // Price comparison
  comparison.categories.push({
    name: "Pricing",
    specs: [
      {
        name: "MSRP",
        values: vehicles.map((v) => ({
          value: v.price.msrp,
          formatted: `$${v.price.msrp.toLocaleString()}`,
          winner: v.price.msrp === Math.min(...vehicles.map((x) => x.price.msrp)),
        })),
      },
      {
        name: "Federal Incentive",
        values: vehicles.map((v) => ({
          value: v.price.incentives.federal,
          formatted: `$${v.price.incentives.federal.toLocaleString()}`,
          winner: v.price.incentives.federal === Math.max(...vehicles.map((x) => x.price.incentives.federal)),
        })),
      },
      {
        name: "Effective Price",
        values: vehicles.map((v) => {
          const effectivePrice =
            v.price.msrp - v.price.incentives.federal - v.price.incentives.state - v.price.incentives.local
          return {
            value: effectivePrice,
            formatted: `$${effectivePrice.toLocaleString()}`,
            winner:
              effectivePrice ===
              Math.min(
                ...vehicles.map(
                  (x) =>
                    x.price.msrp - x.price.incentives.federal - x.price.incentives.state - x.price.incentives.local,
                ),
              ),
          }
        }),
      },
    ],
  })

  // Range & Efficiency
  comparison.categories.push({
    name: "Range & Efficiency",
    specs: [
      {
        name: "EPA Range",
        values: vehicles.map((v) => ({
          value: v.specifications.range.epa,
          formatted: `${v.specifications.range.epa} miles`,
          winner: v.specifications.range.epa === Math.max(...vehicles.map((x) => x.specifications.range.epa)),
        })),
      },
      {
        name: "Combined MPGe",
        values: vehicles.map((v) => ({
          value: v.specifications.efficiency.mpge_combined,
          formatted: `${v.specifications.efficiency.mpge_combined} MPGe`,
          winner:
            v.specifications.efficiency.mpge_combined ===
            Math.max(...vehicles.map((x) => x.specifications.efficiency.mpge_combined)),
        })),
      },
      {
        name: "kWh/100mi",
        values: vehicles.map((v) => ({
          value: v.specifications.efficiency.kwh_per_100mi,
          formatted: `${v.specifications.efficiency.kwh_per_100mi} kWh`,
          winner:
            v.specifications.efficiency.kwh_per_100mi ===
            Math.min(...vehicles.map((x) => x.specifications.efficiency.kwh_per_100mi)),
        })),
      },
    ],
  })

  // Battery & Charging
  comparison.categories.push({
    name: "Battery & Charging",
    specs: [
      {
        name: "Battery Capacity",
        values: vehicles.map((v) => ({
          value: v.specifications.battery.capacity_kwh,
          formatted: `${v.specifications.battery.capacity_kwh} kWh`,
          winner:
            v.specifications.battery.capacity_kwh ===
            Math.max(...vehicles.map((x) => x.specifications.battery.capacity_kwh)),
        })),
      },
      {
        name: "DC Fast Charging",
        values: vehicles.map((v) => ({
          value: v.specifications.charging.dc_max_kw,
          formatted: `${v.specifications.charging.dc_max_kw} kW`,
          winner:
            v.specifications.charging.dc_max_kw ===
            Math.max(...vehicles.map((x) => x.specifications.charging.dc_max_kw)),
        })),
      },
      {
        name: "10-80% Charge Time",
        values: vehicles.map((v) => ({
          value: v.specifications.charging.time_10_80_minutes || 0,
          formatted: v.specifications.charging.time_10_80_minutes
            ? `${v.specifications.charging.time_10_80_minutes} min`
            : "N/A",
          winner:
            v.specifications.charging.time_10_80_minutes &&
            v.specifications.charging.time_10_80_minutes ===
              Math.min(
                ...vehicles.map((x) => x.specifications.charging.time_10_80_minutes || Number.POSITIVE_INFINITY),
              ),
        })),
      },
    ],
  })

  // Performance
  comparison.categories.push({
    name: "Performance",
    specs: [
      {
        name: "0-60 mph",
        values: vehicles.map((v) => ({
          value: v.specifications.performance.acceleration_0_60 || 0,
          formatted: v.specifications.performance.acceleration_0_60
            ? `${v.specifications.performance.acceleration_0_60}s`
            : "N/A",
          winner:
            v.specifications.performance.acceleration_0_60 &&
            v.specifications.performance.acceleration_0_60 ===
              Math.min(
                ...vehicles.map((x) => x.specifications.performance.acceleration_0_60 || Number.POSITIVE_INFINITY),
              ),
        })),
      },
      {
        name: "Top Speed",
        values: vehicles.map((v) => ({
          value: v.specifications.performance.top_speed_mph || 0,
          formatted: v.specifications.performance.top_speed_mph
            ? `${v.specifications.performance.top_speed_mph} mph`
            : "N/A",
          winner:
            v.specifications.performance.top_speed_mph &&
            v.specifications.performance.top_speed_mph ===
              Math.max(...vehicles.map((x) => x.specifications.performance.top_speed_mph || 0)),
        })),
      },
      {
        name: "Horsepower",
        values: vehicles.map((v) => ({
          value: v.specifications.performance.horsepower || 0,
          formatted: v.specifications.performance.horsepower ? `${v.specifications.performance.horsepower} hp` : "N/A",
          winner:
            v.specifications.performance.horsepower &&
            v.specifications.performance.horsepower ===
              Math.max(...vehicles.map((x) => x.specifications.performance.horsepower || 0)),
        })),
      },
    ],
  })

  // Dimensions
  comparison.categories.push({
    name: "Dimensions",
    specs: [
      {
        name: "Seating Capacity",
        values: vehicles.map((v) => ({
          value: v.specifications.dimensions.seating_capacity,
          formatted: `${v.specifications.dimensions.seating_capacity} seats`,
          winner:
            v.specifications.dimensions.seating_capacity ===
            Math.max(...vehicles.map((x) => x.specifications.dimensions.seating_capacity)),
        })),
      },
      {
        name: "Cargo Volume",
        values: vehicles.map((v) => ({
          value: v.specifications.dimensions.cargo_volume_cubic_feet || 0,
          formatted: v.specifications.dimensions.cargo_volume_cubic_feet
            ? `${v.specifications.dimensions.cargo_volume_cubic_feet} ft³`
            : "N/A",
          winner:
            v.specifications.dimensions.cargo_volume_cubic_feet &&
            v.specifications.dimensions.cargo_volume_cubic_feet ===
              Math.max(...vehicles.map((x) => x.specifications.dimensions.cargo_volume_cubic_feet || 0)),
        })),
      },
    ],
  })

  // Ratings
  comparison.categories.push({
    name: "Ratings",
    specs: [
      {
        name: "Overall Rating",
        values: vehicles.map((v) => ({
          value: v.ratings.overall,
          formatted: `${v.ratings.overall}/5`,
          winner: v.ratings.overall === Math.max(...vehicles.map((x) => x.ratings.overall)),
        })),
      },
      {
        name: "Review Count",
        values: vehicles.map((v) => ({
          value: v.ratings.review_count,
          formatted: `${v.ratings.review_count} reviews`,
          winner: v.ratings.review_count === Math.max(...vehicles.map((x) => x.ratings.review_count)),
        })),
      },
    ],
  })

  return comparison
}

module.exports = router
