const express = require('express');
const bcrypt = require('bcryptjs');
const Mechanic = require('../models/Mechanic');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { forgetPassword, resetPassword } = require("../controllers/mechanicController");
//mechanic registration 
router.post('/register',async(req,res)=>
{
    try
    {
        const {name,bussinessName,phone,email,password}=req.body;

        const exitsMechanic = await Mechanic.findOne({email});
    
        if(exitsMechanic)
        {
            console.log("Mechanic already exists:", email); // Log duplicate email
            return res.status(400).json({message:"Mechanic already exists"});
        }
    
        const hashedPassword = await bcrypt.hash(password,10);
    
        const newMechanic = new Mechanic({ 
            name,
            bussinessName,
            phone,
            email,
            password:hashedPassword,
        });
    
        await newMechanic.save();
        console.log("Mechanic registered successfully:", email); // Log success
        res.status(201).json({message:"Mechanic registered successfully"});
    }
    catch(err)
    {
        console.error("Registration error:", err); // Log errors
        res.status(500).json({message:"Something went wrong",error:err.message});
    }
});

//mechanic login
router.post('/login', async (req, res) => {
    try {
        console.log("📩 Received request body:", req.body);  

        const { email, password } = req.body;
        console.log("🔍 Extracted email:", email);
        console.log("🔑 Extracted password:", password);

        if (!email || !password) {
            console.log("❌ Missing email or password:", { email, password });
            return res.status(400).json({ message: "Email and password are required" });
        }

        // 🛠️ Fetch mechanic from DB
        const mechanic = await Mechanic.findOne({ email });

        if (!mechanic) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        console.log("🔑 Stored Password in DB:", mechanic.password);

        // Compare passwords
        const isMatch = await bcrypt.compare(password, mechanic.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }   

        const token = jwt.sign({ id: mechanic._id }, 'yourSecretKey', { expiresIn: '1h' });
        console.log('mechanicid ',mechanic._id);
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error("🚨 Server Error:", error);
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
});

router.post('/forgot-password',forgetPassword);
router.post('/reset-password',resetPassword);

router.get('/redirect', (req, res) => {
    const { token, userType } = req.query;

    if (!token || !userType) {
        return res.status(400).json({ message: "Invalid request" });
    }

    // ✅ Modify to include userType in deep link
    const deepLink = `mechanixhub://resetpassword/${token}?userType=${userType}`;

    // Redirect to app deep link
    res.redirect(deepLink);
});

module.exports= router;