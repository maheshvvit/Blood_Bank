const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateLogin, validateRegister } = require('../middleware/validation');

// Safety checks to surface misconfigured imports early
if (!authController?.login || !authController?.register) {
	throw new Error('authController methods are undefined');
}
if (!validateLogin || !validateRegister) {
	throw new Error('Validation middleware is undefined');
}

// Login route
router.post('/login', validateLogin, authController.login);

// Register route
router.post('/register', validateRegister, authController.register);

// Verify token route
router.get('/verify', authController.verifyToken);

module.exports = router;