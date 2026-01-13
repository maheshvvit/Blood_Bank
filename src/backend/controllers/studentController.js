const Student = require('../models/Student');

const studentController = {
    async registerStudent(req, res) {
        try {
            const studentData = req.body;
            
            // Check if student ID already exists
            const existingStudent = await Student.findById(studentData.s_id);
            if (existingStudent) {
                return res.status(400).json({
                    success: false,
                    message: 'Student ID already exists'
                });
            }
            
            // Check if email already exists
            // You can add this check if needed
            
            const student = await Student.create(studentData);
            
            res.status(201).json({
                success: true,
                message: 'Student registered successfully',
                data: student
            });
            
        } catch (error) {
            console.error('Register student error:', error);
            res.status(500).json({
                success: false,
                message: 'Server error during student registration'
            });
        }
    },
    
    async getAllStudents(req, res) {
        try {
            const students = await Student.findAll();
            
            res.json({
                success: true,
                count: students.length,
                data: students
            });
            
        } catch (error) {
            console.error('Get all students error:', error);
            res.status(500).json({
                success: false,
                message: 'Server error fetching students'
            });
        }
    },
    
    async getStudentsByBloodGroup(req, res) {
        try {
            const { bloodGroup } = req.params;
            
            const students = await Student.findByBloodGroup(bloodGroup);
            
            res.json({
                success: true,
                count: students.length,
                data: students
            });
            
        } catch (error) {
            console.error('Get students by blood group error:', error);
            res.status(500).json({
                success: false,
                message: 'Server error fetching donors'
            });
        }
    },
    
    async getDashboardStats(req, res) {
        try {
            const stats = await Student.getStats();
            
            res.json({
                success: true,
                ...stats
            });
            
        } catch (error) {
            console.error('Get dashboard stats error:', error);
            res.status(500).json({
                success: false,
                message: 'Server error fetching dashboard statistics'
            });
        }
    },
    
    async updateStudent(req, res) {
        try {
            const { studentId } = req.params;
            const studentData = req.body;
            
            const updated = await Student.update(studentId, studentData);
            
            if (!updated) {
                return res.status(404).json({
                    success: false,
                    message: 'Student not found'
                });
            }
            
            res.json({
                success: true,
                message: 'Student updated successfully'
            });
            
        } catch (error) {
            console.error('Update student error:', error);
            res.status(500).json({
                success: false,
                message: 'Server error updating student'
            });
        }
    },
    
    async deleteStudent(req, res) {
        try {
            const { studentId } = req.params;
            
            const deleted = await Student.delete(studentId);
            
            if (!deleted) {
                return res.status(404).json({
                    success: false,
                    message: 'Student not found'
                });
            }
            
            res.json({
                success: true,
                message: 'Student deleted successfully'
            });
            
        } catch (error) {
            console.error('Delete student error:', error);
            res.status(500).json({
                success: false,
                message: 'Server error deleting student'
            });
        }
    }
};

module.exports = studentController;