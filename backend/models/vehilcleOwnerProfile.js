const mongoose = require("mongoose");

const vehicleOwnerProfileSchema = new mongoose.Schema({
    vehicleOwnerId: {
      type: mongoose.Schema.Types.ObjectId, // Ensure this matches the type of your user IDs
      ref: "VechicleOwner", // Reference to the User model (if applicable)
      required: true,
    },
  name: { type: String},
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  vehicleModel: { type: String },
  vehicleNumber: { type: String },
  location: { 
    type: {
      type: String, 
      enum: ['Point'], 
    },
    coordinates: { 
      type: [Number], 
      index: "2dsphere", // ✅ Add Geospatial index
    }
  },
  profileImage: { type: String },
});

module.exports = mongoose.model("vehicleOwnerProfile", vehicleOwnerProfileSchema);