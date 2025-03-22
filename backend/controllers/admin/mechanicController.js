const Mechanic = require('../../models/Mechanic');

// Create a new mechanic
exports.createMechanic = async (req, res) => {
    try {
        const mechanic = await Mechanic.create(req.body);
        res.status(201).json(mechanic);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all mechanics
exports.getAllMechanics = async (req, res) => {
    try {
        const mechanics = await Mechanic.find();
        res.status(200).json(mechanics);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single mechanic
exports.getMechanicById = async (req, res) => {
    try {
        const mechanic = await Mechanic.findById(req.params.id);
        if (!mechanic) {
            return res.status(404).json({ error: 'Mechanic not found' });
        }
        res.status(200).json(mechanic);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update mechanic details
exports.updateMechanic = async (req, res) => {
    try {
        const updatedMechanic = await Mechanic.findOneAndUpdate({ email: req.params.email }, req.body, { new: true });
        res.status(200).json(updatedMechanic);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a mechanic
exports.deleteMechanic = async (req, res) => {
    try {
        await Mechanic.findOneAndDelete(req.params.name);
        res.status(200).json({ message: 'Mechanic deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
