const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    chatId: { type: mongoose.Schema.Types.ObjectId, ref: "Chat", required: true }, // 🔹 Link to the chat session
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // 🔹 Sender (Vehicle Owner or Mechanic)
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // 🔹 Receiver
    text: { type: String, required: true }, // 🔹 Message content
    createdAt: { type: Date, default: Date.now }, // 🔹 Timestamp
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", MessageSchema);
module.exports = Message;


// const mongoose = require("mongoose");

// const MessageSchema = new mongoose.Schema({
//   chatId: { type: mongoose.Schema.Types.ObjectId, ref: "Chat", required: true },
//   senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   text: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model("Message", MessageSchema);
