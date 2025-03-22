const express = require("express");
const router = express.Router();
const vehicleOwnerController = require("../controllers/admin/vehicleOwnerController");
const vehicleOwnerProfileController = require("../controllers/admin/vehicleOwnerProfileController");
const mechanicController = require("../controllers/admin/mechanicController");
const mechanicOwnerProfileController = require("../controllers/admin/mechanicOwnerProfileController");

// VehicleOwner Routes
router.post("/vehicle-owner", vehicleOwnerController.createVehicleOwner);
router.get("/vehicle-owner", vehicleOwnerController.getAllVehicleOwners);
router.get("/vehicle-owner/:id", vehicleOwnerController.getVehicleOwnerById);
router.put("/vehicle-owner/:email", vehicleOwnerController.updateVehicleOwner);
router.delete("/vehicle-owner/:id", vehicleOwnerController.deleteVehicleOwner);

// VehicleOwnerProfile Routes
router.post("/vehicle-owner-profile",vehicleOwnerProfileController.createVehicleOwnerProfile);
router.get("/vehicle-owner-profile", vehicleOwnerProfileController.getAllVehicleOwnerProfiles);
router.get("/vehicle-owner-profile/:id", vehicleOwnerProfileController.getVehicleOwnerProfileById);
router.put("/vehicle-owner-profile/:vehicleOwnerId", vehicleOwnerProfileController.updateVehicleOwnerProfile);
router.delete("/vehicle-owner-profile/:vehicleOwnerId", vehicleOwnerProfileController.deleteVehicleOwnerProfile);

// Mechanic Routes
router.post("/mechanic", mechanicController.createMechanic);
router.get("/mechanic", mechanicController.getAllMechanics);
router.get("/mechanic/:id", mechanicController.getMechanicById);
router.put("/mechanic/:email", mechanicController.updateMechanic);
router.delete("/mechanic/:id", mechanicController.deleteMechanic);

// MechanicOwnerProfile Routes
router.post("/mechanic-owner-profile", mechanicOwnerProfileController.createMechanicOwnerProfile);
router.get("/mechanic-owner-profile", mechanicOwnerProfileController.getAllMechanicOwnerProfiles);
router.get("/mechanic-owner-profile/:id", mechanicOwnerProfileController.getMechanicOwnerProfileById);
router.put("/mechanic-owner-profile/:MechanicOwnerid", mechanicOwnerProfileController.updateMechanicOwnerProfile);
router.delete("/mechanic-owner-profile/:MechanicOwnerid", mechanicOwnerProfileController.deleteMechanicOwnerProfile);

module.exports = router;