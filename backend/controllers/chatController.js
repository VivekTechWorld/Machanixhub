const Chat = require("../models/Chat");
const mongoose = require("mongoose");

/**
 * Get all chats for a user
 */
exports.getUserChats = async (req, res) => {
  try {
    // Validate if userId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const userId = new mongoose.Types.ObjectId(req.params.userId);

    console.log("Fetching chats for user:", userId);

    const chats = await Chat.find({ members: userId });

    console.log("Chats found:", chats);

    res.status(200).json(chats);
  } catch (err) {
    console.error("Error fetching user chats:", err);
    res.status(500).json({ error: "Server error" });
  }
};

/**
 * Create or get an existing chat between two users
 */
exports.createChat = async (req, res) => {
  try {
    const { userId1, userId2 } = req.body;

    // Validate if userId1 and userId2 are valid MongoDB ObjectIds
    if (!mongoose.Types.ObjectId.isValid(userId1) || !mongoose.Types.ObjectId.isValid(userId2)) {
      return res.status(400).json({ error: "Invalid user IDs" });
    }

    let chat = await Chat.findOne({ members: { $all: [userId1, userId2] } });

    if (!chat) {
      chat = new Chat({ members: [userId1, userId2] });
      await chat.save();
    }

    res.status(200).json({ chatId: chat._id, members: chat.members });
  } catch (err) {
    console.error("Error creating chat:", err);
    res.status(500).json({ error: "Server error" });
  }
};
