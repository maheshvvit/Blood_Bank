const express = require("express");
const cors = require("cors");
const path = require("path");
const { testConnection } = require("./config/database");
const routes = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());

testConnection();   // ✅ VERY IMPORTANT

// Serve static files from front_end directory
app.use(express.static(path.resolve(__dirname, '../../front_end')));

// Root route - serve login page
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../front_end/login-page.html'));
});

// API routes
app.use('/api', routes);

// 404 handler for API routes
app.use('/api/*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
