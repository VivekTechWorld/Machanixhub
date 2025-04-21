const vehilcleOwnerProfile = require('./../../models/vehilcleOwnerProfile');
const VehicleOwnerProfile = require('./../../models/vehilcleOwnerProfile');

// Create a new vehicle owner profile
exports.createVehicleOwnerProfile = async (req, res) => {
    try {
        const profile = await VehicleOwnerProfile.create(req.body);
        res.status(201).json(profile);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all vehicle owner profiles
exports.getAllVehicleOwnerProfiles = async (req, res) => {
    try {

        const profiles = await VehicleOwnerProfile.find();
        res.status(200).json(profiles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single vehicle owner profile
exports.getVehicleOwnerProfileById = async (req, res) => {
    try {
        const profile = await VehicleOwnerProfile.findById(req.params.id);
        console.log("fetched successfully",req.params.id);
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update vehicle owner profile details
exports.updateVehicleOwnerProfile = async (req, res) => {
    try {
        console.log("fetched successfully",req.params.vehicleOwnerId);
        const updatedProfile = await VehicleOwnerProfile.findOneAndUpdate({ vehicleOwnerId: req.params.vehicleOwnerId }, req.body, { new: true });
        res.status(200).json(updatedProfile);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a vehicle owner profile
exports.deleteVehicleOwnerProfile = async (req, res) => {
    try {
        await vehilcleOwnerProfile.findOneAndDelete(req.params.vehicleOwnerId);
        res.status(200).json({ message: 'Profile deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
