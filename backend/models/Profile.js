const mongoose = require("mongoose");

const MechanicProfileSchema = new mongoose.Schema({
  MechanicOwnerid: {
      type: mongoose.Schema.Types.ObjectId, // Ensure this matches the type of your user IDs
      ref: "Mechanic", // Reference to the User model (if applicable)
      required: true,
    },
  name: { type: String},
  specialization: { type: String },
  experience: { type: String},
  rating: { type: String, default: "0" },
  reviews: { type: String, default: "0" },
  phone: { type: String},
  location: { 
    type: {
      type: String, 
      enum: ['Point'], 
    },
    coordinates: { 
      type: [Number], 
    }
  },
  profileImage: { type: String },
});

module.exports = mongoose.model("MechanicProfile", MechanicProfileSchema);