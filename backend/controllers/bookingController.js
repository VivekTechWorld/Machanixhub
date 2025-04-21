const Booking = require("../models/Booking");
const vehilcleOwnerProfile = require("../models/vehilcleOwnerProfile");
const MechanicProfile = require("../models/Profile");
// Vehicle Owner creates a booking request
exports.createBooking = async (req, res) => {
  try {
    console.log("🚗 Incoming booking data:", req.body);
    const { mechanicId, serviceType, vehicleType, serviceMode, date, time,vehicleOwnerId } = req.body;

    if (!mechanicId || !serviceType || !vehicleType || !serviceMode || !date || !time) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }
    console.log('vehicleOwner',req.body.vehicleOwnerId);
    const newBooking = new Booking({
      vehicleOwnerId,
      mechanicId,
      serviceType,
      vehicleType,
      serviceMode,
      date,
      time,
      status:"pending",
    });

    await newBooking.save();
    res.status(201).json({ success: true, message: "Booking request sent to the mechanic" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// // Mechanic approves or rejects a booking request
// exports.updateBookingStatus = async (req, res) => {
//   try {
//     const { MechanicOwnerid, status } = req.body;
//     console.log("🚗 Incoming booking data:", req.body);
//     if (!["approved", "rejected"].includes(status)) {
//       return res.status(400).json({ success: false, message: "Invalid status" });
//     }

//     const booking = await Booking.findById(MechanicOwnerid);
//     console.log("🚗 Booking found:", booking);
//     if (!booking) {
//       return res.status(404).json({ success: false, message: "Booking not found" });
//     }

//     booking.status = status;
//     await booking.save();

//     res.status(200).json({ success: true, message: `Booking ${status.toLowerCase()} successfully` });
//   } catch (error) {
//     console.error("❌ Server error:", error);
//     res.status(500).json({ success: false, message: "Server error", error: error.message });
//   }
// };

exports.updateBookingStatus = async (req, res) => {
    try {
      const { MechanicOwnerid, status, description, estimatedCost } = req.body;
      console.log("🚗 Incoming booking data:", req.body);
  
      if (!["approved", "rejected"].includes(status)) {
        return res.status(400).json({ success: false, message: "Invalid status" });
      }
  
      const booking = await Booking.findOne({ mechanicId:MechanicOwnerid, status: "pending" });
      console.log("🚗 Booking found:", booking);
  
      if (!booking) {
        return res.status(404).json({ success: false, message: "Booking not found" });
      }
  
    //   // Ensure only the assigned mechanic can update the status
    //   if (booking.mechanicId.toString() !== req.user.id) {
    //     return res.status(403).json({ success: false, message: "Unauthorized action" });
    //   }
  
      // If approved, require description & estimated cost

      if (status === "approved") {
        if (!description || !estimatedCost) {
          return res.status(400).json({ success: false, message: "Description and estimated cost are required when approving a booking." });
        }
        console.log("✅ Approved data received");
        booking.description = description;
        booking.estimatedCost = estimatedCost;
      }
      
      booking.status = status;

      await booking.save();
      console.log("✅ Booking updated successfully");
      res.status(200).json({ success: true, message: `Booking ${status} successfully`, booking });
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error", error });
    }
  };
  

// Get mechanic's pending bookings
exports.getMechanicBookings = async (req, res) => {
    try {
        const { mechanicId } = req.query;
        if (!mechanicId) {
          return res.status(400).json({ success: false, message: "Mechanic ID is required" });
        }
        const bookings = await Booking.find({ mechanicId,status:'pending' });
        res.json({ success: true, bookings });
      } catch (error) {
        console.error("Error fetching bookings:", error);
        res.status(500).json({ success: false, message: "Server error while fetching bookings" });
      }
};


// ✅ Function to get all approved bookings for a mechanic
exports.getApprovedBookings = async (req, res) => {
    try {
        
      const { mechanicId } = req.params;
        console.log("🚗 Incoming booking data:", req.params);
      if (!mechanicId) {
        return res.status(400).json({ success: false, message: "Mechanic ID is required" });
      }
      
      // ✅ Find all bookings where mechanicId matches & status is "approved"
      const approvedBookings = await Booking.find({ mechanicId, status: "approved" });
      const vehicleOwner = await vehilcleOwnerProfile.find(approvedBookings.vehicleOwnerId);
      if (approvedBookings.length === 0) {
        return res.status(404).json({ success: false, message: "No approved bookings found" });
      }
       console.log(approvedBookings);
       console.log(vehicleOwner);
      return res.status(200).json({ success: true, bookings: approvedBookings, vehicleOwners: vehicleOwner });
  
    } catch (error) {
      console.error("❌ Error fetching approved bookings:", error);
      return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
  };


 // ✅ Import the model

// ✅ Function to get all approved bookings for a mechanic

// exports.getApprovedBookings = async (req, res) => {
//     try {
//         const { vehicleOwnerId } = req.params;
//         console.log("🚗 Incoming booking request:", req.params);

//         if (!vehicleOwnerId) {
//             return res.status(400).json({ success: false, message: "Mechanic ID is required" });
//         }

//         // ✅ Find all approved bookings for the mechanic
//         const approvedBookings = await Booking.find({ vehicleOwnerId, status: "approved" });
//         console.log("🚗 Approved bookings found:", approvedBookings);
//         if (approvedBookings.length === 0) {
//             return res.status(404).json({ success: false, message: "No approved bookings found" });
//         }

//         // ✅ Extract unique vehicleOwnerIds from bookings
//         const vehicleOwnerIds = [...new Set(approvedBookings.map(booking => booking.vehicleOwnerId))];
//         console.log("✅ Vehicle Owner Profiles:", vehicleOwners);

//         // ✅ Fetch vehicle owner details
//         const vehicleOwners = await vehilcleOwnerProfile.find({ vehicleOwnerId: { $in: vehicleOwnerIds } });

//         console.log("✅ Approved Bookings:", approvedBookings);


//         return res.status(200).json({ 
//             success: true, 
//             bookings: approvedBookings, 
//             vehicleOwners: vehicleOwners 
//         });

//     } catch (error) {
//         console.error("❌ Error fetching approved bookings:", error);
//         return res.status(500).json({ success: false, message: "Server error", error: error.message });
//     }
// };


// exports.getVehicleApprovedBookings = async (req, res) => {
//   try {
//       const { vehicleOwnerId } = req.params;
//       console.log("🚗 Incoming booking request for vehicleOwner:", vehicleOwnerId);

//       if (!vehicleOwnerId) {
//           return res.status(400).json({ success: false, message: "Vehicle Owner ID is required" });
//       }

//       // ✅ Find all approved bookings for the vehicle owner
//       const approvedBookings = await Booking.findOne({ vehicleOwnerId, status: "approved" });

//       if (approvedBookings.length === 0) {
//           return res.status(404).json({ success: false, message: "No approved bookings found" });
//       }

//       // ✅ Get mechanicIds from bookings
//       const mechanicIds = [...new Set(approvedBookings.map(booking => booking.mechanicId))];

//       // ✅ Fetch mechanic details
//       const mechanics = await MechanicProfile.findOne({ mechanicId: { $in: mechanicIds } });

//       // ✅ Fetch vehicle owner details
//       const vehicleOwner = await vehilcleOwnerProfile.findOne({ vehicleOwnerId });

//       if (!vehicleOwner) {
//           return res.status(404).json({ success: false, message: "Vehicle Owner details not found" });
//       }

//       console.log("✅ Approved Bookings:", approvedBookings);
//       console.log("✅ Vehicle Owner Profile:", vehicleOwner);
//       console.log("✅ Mechanic Details:", mechanics);

//       return res.status(200).json({ 
//           success: true, 
//           bookings: approvedBookings, 
//           vehicleOwner: vehicleOwner,
//           mechanics: mechanics,  // List of mechanics
//       });

//   } catch (error) {
//       console.error("❌ Error fetching approved bookings:", error);
//       return res.status(500).json({ success: false, message: "Server error", error: error.message });
//   }
// };

exports.getVehicleApprovedBookings = async (req, res) => {
  try {
    const { vehicleOwnerId } = req.params;
    console.log("🚗 Incoming booking request for vehicleOwner:", vehicleOwnerId);

    if (!vehicleOwnerId) {
      return res.status(400).json({ success: false, message: "Vehicle Owner ID is required" });
    }

    // ✅ Find all approved bookings (use find() instead of findOne())
    const approvedBookings = await Booking.find({ vehicleOwnerId, status: "approved" });
    console.log("🚗 Approved bookings found:", approvedBookings);
    if (!approvedBookings || approvedBookings.length === 0) {
      return res.status(404).json({ success: false, message: "No approved bookings found" });
    }

    // ✅ Get unique mechanicIds from bookings
    const mechanicIds = [...new Set(approvedBookings.map(booking => booking.mechanicId))];
    console.log("✅ Mechanic IDs:", mechanicIds);
    // ✅ Fetch mechanic details (use find() instead of findOne())
    const mechanics = await MechanicProfile.find({ MechanicOwnerid: { $in: mechanicIds } });
    console.log("✅ Mechanic fetched :", mechanics);

    // ✅ Fetch vehicle owner details (corrected typo)
    const vehicleOwner = await vehilcleOwnerProfile.findOne({ vehicleOwnerId });

    if (!vehicleOwner) {
      return res.status(404).json({ success: false, message: "Vehicle Owner details not found" });
    }

    console.log("✅ Approved Bookings:", approvedBookings);
    console.log("✅ Vehicle Owner Profile:", vehicleOwner);
    console.log("✅ Mechanic Details:", mechanics);

    return res.status(200).json({
      success: true,
      bookings: approvedBookings,
      vehicleOwner: vehicleOwner,
      mechanics: mechanics, // List of mechanics
    });

  } catch (error) {
    console.error("❌ Error fetching approved bookings:", error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
