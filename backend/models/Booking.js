// const mongoose = require("mongoose");

// const BookingSchema = new mongoose.Schema({
//   vehicleOwnerId: { type: mongoose.Schema.Types.ObjectId, ref: "vehicleOwnerProfile", required: true },
//   mechanicId: { type: mongoose.Schema.Types.ObjectId, ref: "MechanicProfile", required: true },
//   serviceType: { type: String, required: true },
//   vehicleType: { type: String, required: true },
//   serviceMode: { type: String, enum: ["Home Service", "Garage Service"], required: true },
//   date: { type: String, required: true },
//   time: { type: String, required: true },
//   status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
// });

// module.exports = mongoose.model("Booking", BookingSchema);


const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  vehicleOwnerId: { type: mongoose.Schema.Types.ObjectId, ref: "vehicleOwnerProfile", required: true },
  mechanicId: { type: mongoose.Schema.Types.ObjectId, ref: "MechanicProfile", required: true },
  serviceType: { type: String, required: true },
  vehicleType: { type: String, required: true },
  serviceMode: { type: String, enum: ["Home Service", "Garage Service"], required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  description: { type: String }, // ✅ Description (Optional initially)
  estimatedCost: { type: Number }, // ✅ Estimated Cost (Optional initially)
});



// ✅ Pre-save validation to ensure description & estimatedCost are required when status = "Approved"
// BookingSchema.pre("save", function (next) {
//     if (this.status === "approved" && (!this.description || !this.estimatedCost)) {
//       return next(new Error("Description and estimated cost are required when approving a booking."));
//     }
//     next();
//   })


module.exports = mongoose.model("Booking", BookingSchema);
