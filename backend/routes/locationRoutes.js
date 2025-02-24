const express = require("express");
const router = express.Router();
const { saveLocation, getUserLocation } = require("../controllers/LocationController");
const authMiddleware = require("../middleware/authMiddleware");

// Route to save user location
// Apply auth middleware to protect these routes
router.post("/location", authMiddleware,saveLocation);
// router.post("/location",saveLocation);

router.get("/location", authMiddleware,getUserLocation);


module.exports = router;
