const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const studentRoutes = require('./studentRoutes');

// Auth routes
router.use('/auth', authRoutes);

// Student routes (will add later)
router.use('/students', studentRoutes);

// Health check route
router.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Blood Donor System API is running',
        timestamp: new Date().toISOString()
    });
});

module.exports = router;