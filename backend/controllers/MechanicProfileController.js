const  Mechanic= require("../models/Profile");
// Save user location
exports.saveProfile= async (req, res) => {
    try {
        const { name, specialization, experience, phone, location, profileImage } = req.body;
    
        if (!profileImage) {
          return res.status(400).json({ message: "Profile image is required" });
        }
    
        const mechanic = new Mechanic({
          name,
          specialization,
          experience,
          phone,
          location,
          profileImage, // Only storing the image URL
        });
    
        await mechanic.save();
        res.status(201).json({ message: "Mechanic profile saved", mechanic });
      } catch (error) {
        res.status(500).json({ message: "Error saving profile", error: error.message });
      }
};
