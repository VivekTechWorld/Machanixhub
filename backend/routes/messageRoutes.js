// const express = require("express");
// const { saveMessage, getMessages } = require("../controllers/messageController");

// const router = express.Router();

// router.post("/send", saveMessage); // Save new message
// router.get("/:senderId/:receiverId", getMessages); // Get chat history

// module.exports = router;

// const express = require("express");
// const { getChatMessages, sendMessage } = require("../controllers/messageController");
// const router = express.Router();
// const Message = require("../models/Message");
// router.get("/:chatId", getChatMessages);
// router.post("/", sendMessage);


// // Fetch messages between two users
// router.get("/:senderId/:receiverId", async (req, res) => {
//     try {
//       const { senderId, receiverId } = req.params;
      
//       const messages = await Message.find({
//         $or: [
//           { senderId, receiverId },
//           { senderId: receiverId, receiverId: senderId }
//         ]
//       }).sort({ timestamp: 1 }); // Sort by time
  
//       res.json(messages);
//     } catch (error) {
//       res.status(500).json({ error: "Error fetching messages" });
//     }
//   });

  
// module.exports = router;


const express = require("express");
const { getChatMessages, saveMessage, getMessages,getAllChat } = require("../controllers/messageController");

const router = express.Router();

// ✅ Get messages for a specific chat
// router.get("/:chatId", getChatMessages);

// ✅ Save a new message
router.post("/", saveMessage);

// ✅ Fetch messages between two users
router.get("/:senderId/:receiverId", getMessages);

router.get("/:senderId",getAllChat);

module.exports = router;
