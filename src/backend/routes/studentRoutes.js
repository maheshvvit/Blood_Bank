const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { validateStudentRegistration } = require('../middleware/validation');
const authMiddleware = require('../middleware/auth');

// Protected routes
router.use(authMiddleware);

// Register a new student
router.post('/', validateStudentRegistration, studentController.registerStudent);

// Get all students
router.get('/', studentController.getAllStudents);

// Get students by blood group
router.get('/blood-group/:bloodGroup', studentController.getStudentsByBloodGroup);

// Get dashboard statistics
router.get('/dashboard/stats', studentController.getDashboardStats);

// Update student
router.put('/:studentId', studentController.updateStudent);

// Delete student
router.delete('/:studentId', studentController.deleteStudent);

module.exports = router;