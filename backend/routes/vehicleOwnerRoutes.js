const express = require('express');
const bcrypt = require('bcryptjs');
const VechicleOwner = require('../models/VechicleOwner');
const jwt = require("jsonwebtoken");
const router = express.Router();
const { forgetPassword, resetPassword } = require("../controllers/vechicleOwnerController");
router.post('/register',async(req,res)=>
{
    try
    {
        const { name,phone,email,password,vehicleNumber } = req.body;

        const exitsVechicleOwner = await VechicleOwner.findOne({email});

        if(exitsVechicleOwner)
        {
            console.log("Mechanic already exists:", email); // Log duplicate email
            return res.status(400).json({message:"VechicleOwner already exists"});
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const newVehicleOwner = new VechicleOwner(
            {
                name,
                phone,
                email,
                password:hashedPassword,
                vehicleNumber,
            }
        );

        await newVehicleOwner.save();
        console.log("Mechanic registered successfully:", email); // Log success
        res.status(201).json({message:"VechicleOwner registered successfully"});
    }
    catch(error)
    {
        console.error("Registration error:", error); // Log errors
        res.status(500).json({message:"Something went wrong",error:error.message});
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
        const VehicleOwner = await VechicleOwner.findOne({ email });
        console.log("🛠️ Fetched Mechanic:", VechicleOwner); // Debugging line

        if (!VehicleOwner) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        console.log("🔑 Stored Password in DB:", VehicleOwner.password);

        // Compare passwords
        const isMatch = await bcrypt.compare(password, VehicleOwner.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: VechicleOwner._id }, 'yourSecretKey', { expiresIn: '1h' });

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
module.exports=router;
