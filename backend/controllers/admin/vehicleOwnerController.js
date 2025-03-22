const VehicleOwner = require('./../../models/VechicleOwner');

// Create a new vehicle owner
exports.createVehicleOwner = async (req, res) => {
    try {
        const vehicleOwner = await VehicleOwner.create(req.body);
        res.status(201).json(vehicleOwner);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all vehicle owners
exports.getAllVehicleOwners = async (req, res) => {
    try {
        const vehicleOwners = await VehicleOwner.find();
        console.log(vehicleOwners);
        res.status(200).json(vehicleOwners);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single vehicle owner
exports.getVehicleOwnerById = async (req, res) => {
    try {
        const vehicleOwner = await VehicleOwner.findById(req.params.id);
        if (!vehicleOwner) {
            return res.status(404).json({ error: 'Vehicle owner not found' });
        }
        res.status(200).json(vehicleOwner);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update vehicle owner details
exports.updateVehicleOwner = async (req, res) => {
    try {
        console.log("fetched successfully",req.params.email);
        const updatedVehicleOwner = await VehicleOwner.findOneAndUpdate({ email: req.params.email }, req.body, { new: true });
        res.status(200).json(updatedVehicleOwner);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a vehicle owner
exports.deleteVehicleOwner = async (req, res) => {
    try {
        console.log("fetched successfully",req.params.id);
        // await VehicleOwner.findByIdAndDelete(req.params.name);
        await VehicleOwner.findOneAndDelete(req.params.name);
        res.status(200).json({ message: 'Vehicle owner deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
