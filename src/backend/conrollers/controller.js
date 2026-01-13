const express = require('express');
const BloodDonor = require('../models/BloodDonor'); // Assuming you have a BloodDonor model

const router = express.Router();

// Get details by blood group
router.get('/blood-group/:group', async (req, res) => {
    const bloodGroup = req.params.group;

    try {
        const donors = await BloodDonor.find({ bloodGroup: bloodGroup });
        if (donors.length === 0) {
            return res.status(404).json({ message: 'No donors found for this blood group.' });
        }
        res.status(200).json(donors);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});
