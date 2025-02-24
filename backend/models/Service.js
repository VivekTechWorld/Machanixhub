const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  name: String,
  price: Number,
  icon: String, // FontAwesome icon name
});

module.exports = mongoose.model("Service", ServiceSchema);
