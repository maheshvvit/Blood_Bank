const { body, validationResult } = require('express-validator');

// Validation rules for student registration
const validateStudentRegistration = [
    body('s_name').notEmpty().withMessage('Student name is required'),
    body('s_age').isInt({ min: 1, max: 100 }).withMessage('Age must be between 1 and 100'),
    body('s_id').notEmpty().withMessage('Student ID is required'),
    body('s_email').isEmail().withMessage('Valid email is required'),
    body('s_phone_no').matches(/^[0-9]{10}$/).withMessage('Phone number must be 10 digits'),
    body('s_deparment').notEmpty().withMessage('Department is required'),
    body('s_year').isInt({ min: 1, max: 4 }).withMessage('Year must be between 1 and 4'),
    body('s_blood_group').isIn(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .withMessage('Valid blood group is required'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }
        next();
    }
];

// Validation for login
const validateLogin = [
    body('user_name').notEmpty().withMessage('Username or email is required')
        .trim()
        .escape(),
    
    body('password').notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }
        next();
    }
];

// Validation for user registration (login credentials)
const validateRegister = [
    body('user_name')
        .notEmpty().withMessage('Username is required')
        .isLength({ min: 3 }).withMessage('Username must be at least 3 characters')
        .trim()
        .escape(),
    
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Valid email is required')
        .normalizeEmail(),
    
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }
        next();
    }
];

module.exports = { validateStudentRegistration, validateLogin, validateRegister };