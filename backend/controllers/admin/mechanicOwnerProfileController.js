const MechanicOwnerProfile = require('../../models/Profile');

// Create a new mechanic owner profile
exports.createMechanicOwnerProfile = async (req, res) => {
    try {
        const profile = await MechanicOwnerProfile.create(req.body);
        res.status(201).json(profile);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all mechanic owner profiles
exports.getAllMechanicOwnerProfiles = async (req, res) => {
    try {

        const profiles = await MechanicOwnerProfile.find();
        res.status(200).json(profiles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single mechanic owner profile
exports.getMechanicOwnerProfileById = async (req, res) => {
    try {
        const profile = await MechanicOwnerProfile.findById(req.params.id);
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update mechanic owner profile details
exports.updateMechanicOwnerProfile = async (req, res) => {
    try {
        console.log("fetched successfully",req.params.MechanicOwnerid);
        const updatedProfile = await MechanicOwnerProfile.findOneAndUpdate({ MechanicOwnerid: req.params.MechanicOwnerid }, req.body, { new: true });
        res.status(200).json(updatedProfile);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a mechanic owner profile
exports.deleteMechanicOwnerProfile = async (req, res) => {
    try {
        console.log("fetched deletedmechanic",req.params.MechanicOwnerid);
        await MechanicOwnerProfile.findOneAndDelete(req.params.MechanicOwnerid);
        res.status(200).json({ message: 'Profile deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
