const express = require("express");
const Mechanic = require("../models/Mechanic");
const router = express.Router();

const { saveProfile } = require("../controllers/MechanicProfileController");

// Create a Mechanic Profile
router.post("/Profile",saveProfile);


module.exports = router;