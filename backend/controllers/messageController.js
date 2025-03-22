// const Message = require("../models/Message");
// const { io } = require("../socket"); // Import socket instance
// const mongoose = require("mongoose");

// exports.saveMessage = async (req, res) => {
//   try {
//     console.log("📩 Incoming message data:", req.body);

//     // Validate if req.body contains required fields
//     const { senderId, receiverId, message } = req.body;
//     if (!senderId || !receiverId || !message) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     const newMessage = new Message({
//       senderId,
//       receiverId,
//       message,
//       timestamp: new Date(),
//     });

//     const savedMessage = await newMessage.save();
//     res.status(201).json(savedMessage);
//   } catch (error) {
//     console.error("❌ Error saving message:", error.message);
//     res.status(500).json({ error: error.message });
//   }
// };



// // Fetch chat history
// exports.getMessages = async (req, res) => {
//   try {
//     const { senderId, receiverId } = req.params;

//     const messages = await Message.find({
//       $or: [
//         { senderId, receiverId },
//         { senderId: receiverId, receiverId: senderId },
//       ],
//     }).sort("timestamp");

//     res.json({ messages });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


// exports.getChatMessages = async (req, res) => {
//   try {
//     const chatId = req.params.chatId.trim(); // Trim spaces in case of URL encoding issues

//     // ✅ Ensure chatId is a valid ObjectId
//     if (!mongoose.Types.ObjectId.isValid(chatId)) {
//       console.error("❌ Invalid chatId format:", chatId);
//       return res.status(400).json({ error: "Invalid chatId format" });
//     }

//     console.log("🔍 Fetching messages for chat:", chatId);

//     // ✅ Convert chatId to ObjectId before querying
//     const messages = await Message.find({ chatId: new mongoose.Types.ObjectId(chatId) })
//       .sort({ createdAt: 1 });

//     if (!messages.length) {
//       console.warn("⚠ No messages found for chatId:", chatId);
//       return res.status(404).json({ message: "No messages found for this chat" });
//     }

//     console.log("📤 Sending messages:", messages);
//     res.status(200).json(messages);
//   } catch (err) {
//     console.error("❌ Error fetching messages:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// exports.sendMessage = async (req, res) => {
//   try {
//     const newMessage = new Message(req.body);
//     await newMessage.save();

//     // Emit real-time message
//     getIo().to(req.body.chatId).emit("receive_message", newMessage);

//     res.status(201).json(newMessage);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

const Message = require("../models/Message");
const mongoose = require("mongoose");
const { getIo } = require("../socket"); // Import socket instance
const vehilcleOwnerProfile = require("../models/vehilcleOwnerProfile");
const mechanicprofile = require("../models/Profile");

/**
 * Save a new message
 */
exports.saveMessage = async (req, res) => {
  try {
    console.log("📩 Incoming message data:", req.body);

    // Validate request fields
    const { senderId, receiverId, text, chatId } = req.body;
    if (!senderId || !receiverId || !text || !chatId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Validate chatId, senderId, and receiverId
    if (!mongoose.Types.ObjectId.isValid(chatId) ||
        !mongoose.Types.ObjectId.isValid(senderId) ||
        !mongoose.Types.ObjectId.isValid(receiverId)) {
      return res.status(400).json({ error: "Invalid ObjectId format" });
    }

    // Create and save the message
    const newMessage = new Message({
      chatId,
      senderId,
      receiverId,
      text,
      timestamp: new Date(),
    });

    const savedMessage = await newMessage.save();

    // Emit real-time message event
    getIo().to(chatId).emit("receiveMessage", newMessage);

    res.status(201).json(savedMessage);
  } catch (error) {
    console.error("❌ Error saving message:", error.message);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get messages for a chat
 */
exports.getChatMessages = async (req, res) => {
  try {
    const chatId = req.params.chatId.trim(); // Trim spaces in case of URL encoding issues

    if (!mongoose.Types.ObjectId.isValid(chatId)) {
      return res.status(400).json({ error: "Invalid chatId format" });
    }

    console.log("🔍 Fetching messages for chat:", chatId);

    const messages = await Message.find({ chatId: new mongoose.Types.ObjectId(chatId) })
      .sort({ createdAt: 1 });

    if (!messages.length) {
      return res.status(404).json({ message: "No messages found for this chat" });
    }

    res.status(200).json(messages);
  } catch (err) {
    console.error("❌ Error fetching messages:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Fetch messages between two users (alternative query)
 */

// exports.getMessages = async (req, res) => {
//   try {
//     const { senderId, receiverId } = req.params;

//     // Validate ObjectId format
//     if (!mongoose.Types.ObjectId.isValid(senderId) || !mongoose.Types.ObjectId.isValid(receiverId)) {
//       return res.status(400).json({ error: "Invalid sender or receiver ID" });
//     }

//     // Convert senderId and receiverId to ObjectId
//     const senderObjectId = new mongoose.Types.ObjectId(senderId);
//     const receiverObjectId = new mongoose.Types.ObjectId(receiverId);

//     // Fetch messages
//     const messages = await Message.find({
//       $or: [
//         { senderId: senderObjectId },
//         { senderId: receiverObjectId },
//       ],
//     }).sort({ createdAt: -1 }); // ✅ Sort by `createdAt`, not `timestamp`
//     console.log(senderObjectId, receiverObjectId);
//     console.log("🔹 Messages fetched:", messages);
//     res.status(200).json(messages);
//   } catch (error) {
//     console.error("❌ Error fetching messages:", error);
//     res.status(500).json({ error: "Error fetching messages" });
//   }
// };


exports.getMessages = async (req, res) => {
  try {
    const { senderId, receiverId } = req.params;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(senderId) || !mongoose.Types.ObjectId.isValid(receiverId)) {
      return res.status(400).json({ error: "Invalid sender or receiver ID" });
    }

    // Convert senderId and receiverId to ObjectId
    const senderObjectId = new mongoose.Types.ObjectId(senderId);
    const receiverObjectId = new mongoose.Types.ObjectId(receiverId);

    // ✅ Fetch only messages between the two users
    const messages = await Message.find({
      $or: [
        { senderId: senderObjectId, receiverId: receiverObjectId },
        { senderId: receiverObjectId, receiverId: senderObjectId },
      ],
    }).sort({ createdAt: -1 }); // ✅ Sort messages in ascending order (oldest first)

    console.log("🔹 Chat Messages:", messages);
    res.status(200).json(messages);
  } catch (error) {
    console.error("❌ Error fetching messages:", error);
    res.status(500).json({ error: "Error fetching messages" });
  }
};


// exports.getAllchat = async (req, res) => {
//   try {
//     const { senderId } = req.params; // ✅ Get senderId from URL params
//     console.log("Sender ID:", senderId);

//     if (!mongoose.Types.ObjectId.isValid(senderId)) {
//       return res.status(400).json({ error: "Invalid sender ID" });
//     }

//     // Convert senderId to ObjectId
//     const senderObjectId = new mongoose.Types.ObjectId(senderId);

//     // ✅ Fetch all messages where the sender is involved
//     const messages = await Message.find({
//       $or: [{ senderId: senderObjectId }, { receiverId: senderObjectId }],
//     })
//       .sort({ createdAt: -1 }) // Sort latest messages first
//       .lean(); // Convert to plain JavaScript object

//     if (messages.length === 0) {
//       return res.status(404).json({ message: "No chats found" });
//     }

//     // ✅ Extract unique receiver IDs
//     const receiverIds = [...new Set(messages.map((msg) =>
//       msg.senderId.toString() === senderId ? msg.receiverId.toString() : msg.senderId.toString()
//     ))];

//     console.log("Unique Receiver IDs:", receiverIds);

//     // ✅ Fetch vehicle owners and mechanics from their respective profiles
//     const vehicleProfiles = await VehicleOwnerProfile.find({ vehicleOwnerId: { $in: receiverIds } });
//     const mechanicProfiles = await MechanicProfile.find({ mechanicOwnerId: { $in: receiverIds } });

//     res.status(200).json({ vehicleProfiles, mechanicProfiles });
//   } catch (error) {
//     console.error("❌ Error fetching messages:", error);
//     res.status(500).json({ error: "Server error while fetching messages" });
//   }
// };



exports.getAllChat = async (req, res) => {
  try {
    const { senderId } = req.params; // ✅ Get senderId from URL params
    console.log("📩 Sender ID:", senderId);

    if (!mongoose.Types.ObjectId.isValid(senderId)) {
      console.log("❌ Invalid sender ID");
      return res.status(400).json({ error: "Invalid sender ID" });
    }

    const senderObjectId = new mongoose.Types.ObjectId(senderId);

    // ✅ Fetch all messages where the sender is involved
    const messages = await Message.find({
      $or: [{ senderId: senderObjectId }, { receiverId: senderObjectId }],
    }).sort({ createdAt: -1 });
    console.log("📥 All Messages:", messages);
    if (messages.length === 0) {
      return res.status(404).json({ message: "No chats found" });
    }

    // ✅ Extract unique receiver IDs
    const receiverIds = [...new Set(messages.map((msg) =>
      msg.senderId.toString() === senderId ? msg.receiverId.toString() : msg.senderId.toString()
    ))];

    const receiverObjectIds = receiverIds.map(id => new mongoose.Types.ObjectId(id));
    console.log("🔍 Unique Receiver IDs:", receiverObjectIds);

    // ✅ Fetch vehicle owners and mechanics from their respective profiles
    const vehicleProfiles = await vehilcleOwnerProfile.find({ vehicleOwnerId: { $in: receiverObjectIds } });
    const mechanicProfiles = await mechanicprofile.find({ MechanicOwnerid: { $in: receiverObjectIds } });

    console.log("🚗 Vehicle Profiles:", vehicleProfiles);
    console.log("🔧 Mechanic Profiles:", mechanicProfiles);

      // ✅ Format response

    const chatUsers = [
      ...vehicleProfiles.map(profile => ({
        id: profile.vehicleOwnerId.toString(),
        name: profile.name,
        type: "vehicleOwner",
      })),
      ...mechanicProfiles.map(profile => ({
        id: profile.MechanicOwnerid.toString(),
        name: profile.name,
        type: "mechanic",
      })),
    ];
    console.log("💬 Chat Users:", chatUsers);
    res.status(200).json(chatUsers);
  } catch (error) {
    console.error("❌ Error fetching messages:", error);
    res.status(500).json({ error: "Server error while fetching messages" });
  }
};
