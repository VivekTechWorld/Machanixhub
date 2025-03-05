// const jwt = require("jsonwebtoken");
// const VehicleOwner = require("../models/VechicleOwner");
// const Mechanic = require("../models/Mechanic");

// const authMiddleware = async (req, res, next) => {
//   try {
//     // Get the token from the request headers
//     const token = req.header("Authorization")?.replace("Bearer ", "");

//     if (!token) {
//       return res.status(401).json({ message: "No token, authorization denied." });
//     }

//     // Verify the token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("Decoded Token:", decoded);

//     // Fetch the vehicle owner from the database
//     const vehicleOwner = await VehicleOwner.findById(decoded.vehicleOwnerId);
//     const mechanic = await Mechanic.findById(decoded.mechanicId);
//     console.log("Fetched Vehicle Owner:", vehicleOwner);

//     if (!vehicleOwner) {
//       return res.status(401).json({ message: "Vehicle owner not found." });
//     }
//     if (!mechanic) {
//       return res.status(401).json({ message: "Mechanic not found." });
//     }

//     // Attach the vehicle owner to the request object
//     req.vehicleOwner = vehicleOwner;
//     req.mechanic = Mechanic;
//     next();
//   } catch (error) {
//     console.error("Authentication error:", error);
//     res.status(401).json({ message: "Invalid token, authorization denied." });
//   }
// };

// module.exports = authMiddleware;

const jwt = require("jsonwebtoken");
const VehicleOwner = require("../models/VechicleOwner");
const Mechanic = require("../models/Mechanic");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    console.log("Token:", token);

    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied." });
    }

    // Decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded.vehicleOwnerId);

    let user = null;
    let userType = null;

    // Check the user in both collections
    const vehicleOwner = await VehicleOwner.findById(decoded.vehicleOwnerId);
    const mechanic = await Mechanic.findById(decoded.id);

    if (vehicleOwner) {
      user = vehicleOwner;
      userType = "VehicleOwner";
    } else if (mechanic) {
      user = mechanic;
      userType = "Mechanic";
    }

    if (!user) {
      return res.status(401).json({ message: "User not found, authorization denied." });
    }

    // Attach user to request
    req.user = user;
    req.userType = userType;

    console.log(`Authenticated as ${userType}:`, user._id);
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ message: "Invalid token, authorization denied." });
  }
};

module.exports = authMiddleware;
