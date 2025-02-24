const jwt = require("jsonwebtoken");
const VehicleOwner = require("../models/VechicleOwner");

const authMiddleware = async (req, res, next) => {
  try {
    // Get the token from the request headers
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied." });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);

    // Fetch the vehicle owner from the database
    const vehicleOwner = await VehicleOwner.findById(decoded.vehicleOwnerId);
    console.log("Fetched Vehicle Owner:", vehicleOwner);

    if (!vehicleOwner) {
      return res.status(401).json({ message: "Vehicle owner not found." });
    }

    // Attach the vehicle owner to the request object
    req.vehicleOwner = vehicleOwner;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ message: "Invalid token, authorization denied." });
  }
};

module.exports = authMiddleware;