const express = require("express");
const { createBooking, updateBookingStatus, getMechanicBookings,getApprovedBookings,getVehicleApprovedBookings } = require("../controllers/bookingController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Vehicle owner creates a booking request
router.post("/create", createBooking);

// Mechanic approves/rejects a booking request
router.put("/update-status", updateBookingStatus);

// Get mechanic's pending bookings
router.get("/mechanic-bookings", getMechanicBookings);

router.get("/approved/:mechanicId", getApprovedBookings);

router.get("/approved/vehicle/:vehicleOwnerId",getVehicleApprovedBookings);

module.exports = router;
