const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required'
            });
        }
        
        const decoded = User.verifyToken(token);
        
        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: 'Invalid or expired token'
            });
        }
        
        // Add user info to request
        req.user = decoded;
        req.token = token;
        
        next();
    } catch (error) {
        console.error('🔥 Auth middleware error:', error);
        res.status(401).json({
            success: false,
            message: 'Authentication failed'
        });
    }
};

module.exports = authMiddleware;