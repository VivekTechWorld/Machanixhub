const Location = require("../models/Location");

// Save user location
exports.saveLocation = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    console.log("Latitude:", latitude);

    if (!latitude || !longitude) {
      return res.status(400).json({ message: "Latitude and Longitude are required." });
    }

    // Debugging: Check if req.vehicleOwner is populated
    if (!req.userType && !req.user) {
      return res.status(401).json({ message: "Vehicle Owner ID is missing. Please authenticate." });
    }
    console.log(req.user);
    const newLocation = new Location({
      vehicleOwnerId: req.user._id, // Use vehicleOwnerId from the authenticated vehicle owner
      latitude,
      longitude,
    });

    await newLocation.save();
    res.status(201).json({ message: "Location saved successfully." });
  } catch (error) {
    console.error("Error saving location:", error);
    res.status(500).json({ message: "Server error. Could not save location." });
  }
};
// Get vehicle owner's last known location
exports.getUserLocation = async (req, res) => {
  try {
    // Fetch the last known location for the authenticated vehicle owner
    const location = await Location.findOne({ vehicleOwnerId: req.vehicleOwner._id }).sort({ timestamp: -1 });

    if (!location) {
      return res.status(404).json({ message: "No location found for this vehicle owner." });
    }

    res.json(location);
  } catch (error) {
    console.error("Error fetching location:", error);
    res.status(500).json({ message: "Server error. Could not fetch location." });
  }
};