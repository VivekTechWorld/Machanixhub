const  Mechanic= require("../models/Mechanic");
const MechanicProfile  =require("../models/Profile")
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
// Save user location
exports.saveProfile= async (req, res) => {
    try {
      const { name, specialization, experience, phone, profileImage } = req.body;
      
      // Extract token from headers
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized: No token provided." });
      }
      
      console.log("api are correct in saveprofile")
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded); // Debugging

    if (!decoded.id) {
      return res.status(401).json({ message: "Invalid token: Mechanic ID not found." });
    }

    const mechanicId = decoded.id.toString();
    console.log("Mechanic ID:", mechanicId); // Debugging


        if (!profileImage) {
          return res.status(400).json({ message: "Profile image is required" });
        }

        let mechanicProfile = await MechanicProfile.findOne({ MechanicOwnerid:mechanicId });

        mechanicProfile = new MechanicProfile({
          MechanicOwnerid: mechanicId,
          profileImage: profileImage || "", // Provide a value or default
          phone: phone || "", // Provide a value or default
          experience: experience || "", // Provide a value or default
          specialization: specialization || "", // Provide a value or default
          name: name || "", // Provide a value or default
          // location: {
          //   type: "Point",
          //   coordinates: [latitude, longitude],
          // },
        });

        // const mechanic = new MechanicProfile({
        //   name,
        //   specialization,
        //   experience,
        //   phone,
        //   profileImage, // Only storing the image URL
        // });
    
        await mechanicProfile.save();
        res.status(201).json({ message: "Mechanic profile saved", mechanicProfile });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error saving profile", error: error.message });
      }
};


// exports.saveLocation = async (req, res) => {
//   try {
//     const { latitude, longitude } = req.body;

//     if (!latitude || !longitude) {
//       return res.status(400).json({ message: "Latitude and longitude are required." });
//     }

//     // Extract token from headers
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ message: "Unauthorized: No token provided." });
//     }

//     const token = authHeader.split(" ")[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     console.log("Decoded Token:", decoded); // Debugging

//     if (!decoded.id) {
//       return res.status(401).json({ message: "Invalid token: Mechanic ID not found." });
//     }

//     // ✅ Convert Mechanic ID to ObjectId
//     const mechanicId = new mongoose.Types.ObjectId(decoded.id);

//     const newLocation = new Profile({
//         MechanicOwnerid: mechanicId, // Use vehicleOwnerId from the authenticated vehicle owner
//           latitude,
//           longitude,
//         });
//       newLocation.save();
//       res.status(201).json({ message: "Location saved successfully." });
//     // if (!mechanicProfile) {
//     //   return res.status(404).json({ message: "Mechanic profile not found." });
//     // }

//     // // ✅ Update location in MechanicProfile
//     // mechanicProfile.location = {
//     //   type: "Point",
//     //   coordinates: [longitude, latitude], // Longitude first, then Latitude
//     // };

//     // await mechanicProfile.save();

//     // res.status(200).json({ message: "Location saved successfully!", mechanicProfile });

//   } catch (error) {
//     console.error("Error saving location:", error);
//     res.status(500).json({ message: "Server error. Try again later." });
//   }
// };



// exports.saveLocation = async (req, res) => {
//   try {
//     const { latitude, longitude } = req.body;

//     if (!latitude || !longitude) {
//       return res.status(400).json({ message: "Latitude and longitude are required." });
//     }

//     // Extract token from headers
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ message: "Unauthorized: No token provided." });
//     }

//     const token = authHeader.split(" ")[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     console.log("Decoded Token:", decoded); // Debugging

//     if (!decoded.id) {
//       return res.status(401).json({ message: "Invalid token: Mechanic ID not found." });
//     }

//     // ✅ Convert Mechanic ID to ObjectId
//     const mechanicId = new mongoose.Types.ObjectId(decoded.id);

//     // ✅ Update location in MechanicProfile
//     // const updatedProfile = await MechanicProfile(
//     //   { MechanicOwnerid: mechanicId }, // Find by MechanicOwnerid
//     //   {
//     //     $set: {
//     //       location: {
//     //         type: "Point",
//     //         coordinates: [longitude, latitude], // Longitude first, then Latitude
//     //       },
//     //     },
//     //   },
//     //   { new: true, upsert: false } // Return updated document, don't create if missing
//     // );


//     const updatedProfile = await MechanicProfile.findOneAndUpdate(
//       { MechanicOwnerid: mechanicId }, // Find by MechanicOwnerid
//       {
//         $set: {
//           location: {
//             type: "Point",
//             coordinates: [longitude, latitude], // Longitude first, then Latitude
//           },
//         },
//       },
//       { new: true } // Return updated document
//     );

//     await updatedProfile.save();
//     if (!updatedProfile) {
//       return res.status(404).json({ message: "Mechanic profile not found." });
//     }

//     res.status(200).json({ message: "Location updated successfully!", updatedProfile });

//   } catch (error) {
//     console.error("Error saving location:", error);
//     res.status(500).json({ message: "Server error. Try again later." });
//   }
// };
exports.saveLocation = async (req, res) => {
  try {
    const { latitude, longitude, profileImage, phone, experience, specialization, name } = req.body;

    // Validate latitude and longitude
    if (!latitude || !longitude) {
      return res.status(400).json({ message: "Latitude and longitude are required." });
    }

    // Extract token from headers
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: No token provided." });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded); // Debugging

    if (!decoded.id) {
      return res.status(401).json({ message: "Invalid token: Mechanic ID not found." });
    }

    const mechanicId = decoded.id.toString();
    console.log("Mechanic ID:", mechanicId); // Debugging

    // Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(mechanicId)) {
      return res.status(400).json({ message: "Invalid Mechanic ID format." });
    }

    // Find mechanic in Mechanic model
    const mechanic = await Mechanic.findOne({ _id: mechanicId });
    console.log("Mechanic Found:", mechanic); // Debugging

    if (!mechanic) {
      return res.status(404).json({ message: "Mechanic not found." });
    }

    // Find or create the profile in MechanicProfile
    let mechanicProfile = await MechanicProfile.findOne({ MechanicOwnerid: mechanic._id });

    if (!mechanicProfile) {
      // Create a new profile with required fields
      mechanicProfile = new MechanicProfile({
        MechanicOwnerid: mechanic._id,
        profileImage: profileImage || "", // Provide a value or default
        phone: phone || "", // Provide a value or default
        experience: experience || "", // Provide a value or default
        specialization: specialization || "", // Provide a value or default
        name: name || "", // Provide a value or default
        location: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
      });
    } else {
      // Update the existing profile
      mechanicProfile.location = {
        type: "Point",
        coordinates: [longitude, latitude],
      };
    }

    await mechanicProfile.save();

    res.status(200).json({ message: "Location updated successfully!", mechanicProfile });

  } catch (error) {
    console.error("Error saving location:", error);
    res.status(500).json({ message: "Server error. Try again later." });
  }
};