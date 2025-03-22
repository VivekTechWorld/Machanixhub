const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Stores mechanic & vehicle owner IDs
  lastMessage: { type: String, default: "" },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Chat", ChatSchema);