const express = require('express');
const User = require('../models/Users');
const router = express.Router();

// Create a new user
router.post('/register', async (req, res) => {
    const { name, email, googleId } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            user = new User({ name, email, googleId });
            await user.save();
        }

        res.status(201).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get all users
router.get('/all', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
