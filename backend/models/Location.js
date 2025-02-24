const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
    vehicleOwnerId: {
    type: mongoose.Schema.Types.ObjectId, // Ensure this matches the type of your user IDs
    ref: "VechicleOwner", // Reference to the User model (if applicable)
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Location", locationSchema);
