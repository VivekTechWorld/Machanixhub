const mongoose = require("mongoose");

const MechanicProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  experience: { type: String, required: true },
  rating: { type: String, default: "0" },
  reviews: { type: String, default: "0" },
  phone: { type: String, required: true },
  location: { type: String, required: true },
  profileImage: { type: String, required: true },
});

module.exports = mongoose.model("MechanicProfile", MechanicProfileSchema);