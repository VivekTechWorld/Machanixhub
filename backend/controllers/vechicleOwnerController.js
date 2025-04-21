const bcrypt = require('bcryptjs');
const  VechicleOwner= require('../models/VechicleOwner');
const sendEmail = require('../utils/sendmail');
const jwt = require('jsonwebtoken');
const MechanicProfile = require("../models/Profile");
const VehicleOwnerProfile = require("../models/vehilcleOwnerProfile");
require("dotenv").config();

exports.forgetPassword = async (req, res) => {

    try
    {
        const {email}=req.body;

        const vehicleowner=await VechicleOwner.findOne({email});
        console.log(vehicleowner);
        if(!VechicleOwner)
        {
            return res.status(400).json({message:"Mechanic not found"});
        }

        const token =jwt.sign({id:vehicleowner._id},process.env.JWT_SECRET,{expiresIn:"10m"});
        console.log(token);
        vehicleowner.resetToken=token;
        vehicleowner.resetTokenExpiry=Date.now()+10*60*1000;
        await vehicleowner.save();

        const resetLink = `http://10.0.2.2:5000/api/vehicleOwner/redirect?token=${token}&userType=VechicleOwner`;
        await sendEmail(email,"Password reset link",`<p>Click <a href="${resetLink}">here</a> to reset your password</p>`);

        res.json({message :"Reset email sent"});
    }
    catch(error)
    {
        res.status(500).json({message:"Something went wrong in mechanic",error:error.message});
    }

};

exports.resetPassword = async (req, res) => {

    try
    {
        const {token,newPassword}=req.body;
        console.log(token);
        console.log(newPassword);
        const vehicleowner=await VechicleOwner.findOne({resetToken:token,resetTokenExpiry:{$gt : Date.now()}});
        console.log(vehicleowner);
        if(!vehicleowner)
        {
            return res.status(400).json({message: "Invalid or expired token"});
        }

        vehicleowner.password=await bcrypt.hash(newPassword,10);
        vehicleowner.resetToken=null;
        vehicleowner.resetTokenExpiry=null;
        await vehicleowner.save();

        res.json({message: "Passwowrd reset successfull"});
    }
    catch(error)
    {
        res.status(500).json({message:"Server error",error:error.message});
    }   
};

exports.findKNearestMechanics = async (req, res) => {
  try {
    const { latitude, longitude } = req.query;
    
    console.log("Received request for nearest mechanics");
    console.log("Latitude:", latitude, "Longitude:", longitude);

    if (!latitude || !longitude) {
      console.log("❌ Missing latitude or longitude");
      return res.status(400).json({ success: false, message: "Latitude and Longitude are required" });
    }

    const nearestMechanics = await MechanicProfile.find({
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: [parseFloat(longitude), parseFloat(latitude)] },
          $maxDistance: 10 * 1000, // 10 km radius
        },
      },
    });

    console.log("🛠️ Nearest mechanics found:", nearestMechanics);

    if (!nearestMechanics || nearestMechanics.length === 0) {
      console.log("❌ No nearby mechanics found");
      return res.status(404).json({ success: false, message: "No nearby mechanics found" });
    }

    res.json({ success: true, mechanics: nearestMechanics });

  } catch (error) {
    console.error("❌ Error finding nearest mechanics:", error);
    res.status(500).json({ success: false, message: "Error fetching mechanics", error: error.message });
  }
};


// Get Vehicle Owner Profile
exports.getProfile = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: No token provided." });
    }
    

  const token = authHeader.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log("Decoded Token:", decoded); // Debugging

    let vehicleownerProfile = await VehicleOwnerProfile.findOne({ vehicleOwnerId:decoded.vehicleOwnerId });

    if (!vehicleownerProfile) return res.status(404).json({ error: "Profile not found" });

    res.json(vehicleownerProfile);
    console.log("📩 Sent profile data:", vehicleownerProfile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Vehicle Owner Profile
exports.updateProfile = async (req, res) => {
  try {
    console.log('📩 Incoming profile data:', req.body);
    const { name, phone, vehicleModel, vehicleNumber, profileImage } = req.body;
      
    const updatedProfile = await VehicleOwnerProfile.findOneAndUpdate(
      { vehicleOwnerId: req.user._id },
      { name, phone, vehicleModel, vehicleNumber, profileImage },
      { new: true, upsert: true } // ✅ Creates profile if not exists
    );

    res.json(updatedProfile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Location (For Geospatial Queries)
exports.updateLocation = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    if (!latitude || !longitude) return res.status(400).json({ error: "Coordinates required" });

    const updatedProfile = await VehicleOwnerProfile.findOneAndUpdate(
      { vehicleOwnerId: req.user._id },
      { location: { type: "Point", coordinates: [longitude, latitude] } },
      { new: true }
    );

    res.json(updatedProfile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Save user location
exports.saveProfile= async (req, res) => {
    try {
      const { name, phone, vehicleModel, vehicleNumber, profileImage,email } = req.body;
      
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }

      // Extract token from headers
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized: No token provided." });
      }
      

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded); // Debugging

    if (!decoded.vehicleOwnerId) {
      return res.status(401).json({ message: "Invalid token: Mechanic ID not found." });
    }

    const vehicleOwnerId = decoded.vehicleOwnerId.toString();
    console.log("vehicleOwner id:", vehicleOwnerId); // Debugging

        if (!profileImage) {
          return res.status(400).json({ message: "Profile image is required" });
        }

        let vehicleownerProfile = await VehicleOwnerProfile.findOne({ vehicleOwnerId:vehicleOwnerId });

      if (!vehicleownerProfile) {
      // ✅ Correctly create a new instance
      vehicleownerProfile = new VehicleOwnerProfile({
        vehicleOwnerId,
        profileImage,
        phone,
        email, // ✅ Include email here
        name,
        vehicleModel,
        vehicleNumber,
      });
    } else {
      // ✅ Update existing profile
      vehicleownerProfile.profileImage = profileImage;
      vehicleownerProfile.phone = phone;
      vehicleownerProfile.email = email; // ✅ Ensure email is updated
      vehicleownerProfile.name = name;
      vehicleownerProfile.vehicleModel = vehicleModel;
      vehicleownerProfile.vehicleNumber = vehicleNumber;
    }

      await vehicleownerProfile.save();
      res.status(201).json({ message: "Vehicle owner profile saved", vehicleownerProfile });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error saving profile", error: error.message });
      }
};