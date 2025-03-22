const express = require("express");
const Mechanic = require("../models/Mechanic");
const router = express.Router();

const { saveProfile } = require("../controllers/MechanicProfileController");
const { saveLocation,getProfile } = require("../controllers/MechanicProfileController");
const authMiddleware = require("../middleware/authMiddleware");

// Create a Mechanic Profile
router.post("/Profile",saveProfile);
router.post("/location",saveLocation);
router.get("/profile", getProfile);

module.exports = router;