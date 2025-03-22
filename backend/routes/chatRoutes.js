const express = require("express");
const { getUserChats, createChat } = require("../controllers/chatController");

const router = express.Router();

// Get all chats of a user
router.get("/:userId", getUserChats);

// Create or retrieve a chat between two users
router.post("/", createChat);

module.exports = router;
