const express = require("express");
const Mechanic = require("../models/Mechanic");
const router = express.Router();

const { saveProfile } = require("../controllers/MechanicProfileController");
const { saveLocation } = require("../controllers/MechanicProfileController");
const authMiddleware = require("../middleware/authMiddleware");

// Create a Mechanic Profile
router.post("/Profile",saveProfile);
router.post("/location",saveLocation);

module.exports = router;