const { Server } = require("socket.io");
const Chat = require("./models/Chat");
const Message = require("./models/Message");

let io;

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: { origin: "*", methods: ["GET", "POST"] },
  });

  io.on("connection", (socket) => {
    console.log(`⚡ New user connected: ${socket.id}`);

    socket.on("joinChat", async ({ senderId, receiverId }) => {
      if (!senderId || !receiverId) {
        console.error("❌ Invalid joinChat data:", { senderId, receiverId });
        return;
      }

      try {
        let chat = await Chat.findOne({ participants: { $all: [senderId, receiverId] } });

        if (!chat) {
          chat = await Chat.create({ participants: [senderId, receiverId], messages: [] });
          console.log(`🆕 New chat created: ${chat._id}`);
        }

        const room = chat._id.toString();
        socket.join(room);
        console.log(`👥 User ${senderId} joined chat room: ${room}`);

        io.to(socket.id).emit("chatId", room);
      } catch (error) {
        console.error("❌ Error joining chat:", error);
      }
    });
    
    socket.on("sendMessage", async ({ chatId, senderId, receiverId, text }) => {
      if (!chatId || !senderId || !receiverId || !text) {
        console.error("❌ Invalid message data:", { chatId, senderId, receiverId, text });
        return;
      }
    
      try {
        const newMessage = new Message({ chatId, senderId, receiverId, text, createdAt: new Date() });
        await newMessage.save();
    
        await Chat.findByIdAndUpdate(chatId, { $push: { messages: newMessage._id } });
    
        io.to(chatId).emit("receiveMessage", newMessage);
        console.log(`📩 Message sent in chat ${chatId}`);
      } catch (error) {
        console.error("❌ Error saving message:", error);
      }
    });
    

    socket.on("disconnect", () => {
      console.log(`❌ User disconnected: ${socket.id}`);
    });
  });
};

const getIo = () => {
  if (!io) {
    throw new Error("Socket.io is not initialized!");
  }
  return io;
};

module.exports = { initializeSocket, getIo };

// const { Server } = require("socket.io");
// const Message = require("./models/Message");

// let io;

// const initializeSocket = (server) => {
//   io = new Server(server, {
//     cors: {
//       origin: "*", // Allow all origins (for testing)
//       methods: ["GET", "POST"],
//     },
//   });

//   io.on("connection", (socket) => {
//     console.log("⚡ New user connected:", socket.id);

//     socket.on("joinChat", ({ senderId, receiverId }) => {
//       if (!senderId || !receiverId) {
//         console.error("❌ Invalid joinChat data:", { senderId, receiverId });
//         return;
//       }
//       const room = [senderId, receiverId].sort().join("_");
//       socket.join(room);
//       console.log(`👥 User ${senderId} joined chat with ${receiverId} (Room: ${room})`);
//     });

//     socket.on("sendMessage", async (data) => {
//       try {
//         if (!data || !data.senderId || !data.receiverId || !data.message) {
//           console.error("❌ Invalid message data:", data);
//           return;
//         }

//         console.log("📩 Received message:", data);

//         const { senderId, receiverId, message } = data;
//         const newMessage = new Message({ senderId, receiverId, message, timestamp: new Date() });
//         await newMessage.save();

//         const room = [senderId, receiverId].sort().join("_");
//         console.log(`📨 Sending message to room: ${room}`);

//         io.to(room).emit("receiveMessage", {
//           _id: newMessage._id,
//           senderId,
//           receiverId,
//           message,
//           timestamp: newMessage.timestamp,
//         });
//       } catch (error) {
//         console.error("❌ Error saving message:", error);
//       }
//     });

//     socket.on("disconnect", () => {
//       console.log(`❌ User disconnected: ${socket.id}`);
//     });
//   });
// };

// module.exports = { initializeSocket };

// const { Server } = require("socket.io");
// const Message = require("./models/Message"); // Ensure this model exists
// let io;

// const initializeSocket = (server) => {
//   io = new Server(server, {
//     cors: {
//       origin: "*", 
//       methods: ["GET", "POST"],
//     },
//   });

//   io.on("connection", (socket) => {
//     console.log(`⚡ New user connected: ${socket.id}`);

//     // Handle joinChat
//     socket.on("joinChat", ({ senderId, receiverId }) => {
//       if (!senderId || !receiverId) {
//         console.error("❌ Invalid joinChat data:", { senderId, receiverId });
//         return;
//       }
//       const room = [senderId, receiverId].sort().join("_");
//       socket.join(room);
//       console.log(`👥 User ${senderId} joined room: ${room}`);
//     });

    
//     // Handle sendMessage
//     socket.on("sendMessage", async ({ senderId, receiverId, text }) => {
//       try {
//         const message = new Message({
//           senderId,
//           receiverId,
//           text,
//           timestamp: new Date(),
//         });
  
//         await message.save(); // Save to MongoDB
  
//         io.emit("receiveMessage", message); // Broadcast message
//       } catch (error) {
//         console.error("Error saving message:", error);
//       }
//     });

//     socket.on("disconnect", () => {
//       console.log(`❌ User disconnected: ${socket.id}`);
//     });
//   });
// };

// module.exports = { initializeSocket };


// const { Server } = require("socket.io");
// const Chat = require("./models/Chat"); // Ensure Chat model exists
// const Message = require("./models/Message"); // Ensure Message model exists

// let io;

// const initializeSocket = (server) => {
//   io = new Server(server, {
//     cors: { origin: "*", methods: ["GET", "POST"] },
//   });

//   io.on("connection", (socket) => {
//     console.log(`⚡ New user connected: ${socket.id}`);

//     // ✅ Join or Create Chat
//     socket.on("joinChat", async ({ senderId, receiverId }) => {
//       if (!senderId || !receiverId) {
//         console.error("❌ Invalid joinChat data:", { senderId, receiverId });
//         return;
//       }

//       try {
//         let chat = await Chat.findOne({ participants: { $all: [senderId, receiverId] } });

//         if (!chat) {
//           chat = await Chat.create({ participants: [senderId, receiverId], messages: [] });
//           console.log(`🆕 New chat created: ${chat._id}`);
//         }

//         const room = chat._id.toString();
//         socket.join(room);
//         console.log(`👥 User ${senderId} joined chat room: ${room}`);

//         // ✅ Emit chatId to frontend
//         io.to(socket.id).emit("chatId", room);
//       } catch (error) {
//         console.error("❌ Error joining chat:", error);
//       }
//     });

//     // ✅ Handle sendMessage
//     socket.on("sendMessage", async ({ chatId, senderId, text }) => {
//       if (!chatId || !senderId || !text) {
//         console.error("❌ Invalid message data:", { chatId, senderId, text });
//         return;
//       }

//       try {
//         const newMessage = new Message({ chatId, senderId, text, timestamp: new Date() });
//         await newMessage.save();

//         // ✅ Push message to chat history
//         await Chat.findByIdAndUpdate(chatId, { $push: { messages: newMessage._id } });

//         // ✅ Emit message only to chat participants
//         io.to(chatId).emit("receiveMessage", newMessage);
//         console.log(`📩 Message sent in chat ${chatId}`);
//       } catch (error) {
//         console.error("❌ Error saving message:", error);
//       }
//     });

//     socket.on("disconnect", () => {
//       console.log(`❌ User disconnected: ${socket.id}`);
//     });
//   });
// };

// module.exports = { initializeSocket };