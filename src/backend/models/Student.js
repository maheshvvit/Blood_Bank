const { pool } = require('../config/database');

class Student {
    static async create(studentData) {
        const {
            s_id, s_name, s_age, s_email,
            s_phone_no, s_deparment, s_year, s_blood_group
        } = studentData;
        
        const [result] = await pool.execute(
            `INSERT INTO students 
            (s_id, s_name, s_age, s_email, s_phone_no, s_deparment, s_year, s_blood_group) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [s_id, s_name, s_age, s_email, s_phone_no, s_deparment, s_year, s_blood_group]
        );
        
        return { id: result.insertId, ...studentData };
    }
    
    static async findAll() {
        const [rows] = await pool.execute('SELECT * FROM students ORDER BY created_at DESC');
        return rows;
    }
    
    static async findByBloodGroup(bloodGroup) {
        const [rows] = await pool.execute(
            'SELECT * FROM students WHERE s_blood_group = ? ORDER BY s_name',
            [bloodGroup]
        );
        return rows;
    }
    
    static async findById(studentId) {
        const [rows] = await pool.execute(
            'SELECT * FROM students WHERE s_id = ?',
            [studentId]
        );
        return rows[0];
    }
    
    static async update(studentId, studentData) {
        const {
            s_name, s_age, s_email,
            s_phone_no, s_deparment, s_year, s_blood_group
        } = studentData;
        
        const [result] = await pool.execute(
            `UPDATE students SET 
            s_name = ?, s_age = ?, s_email = ?, s_phone_no = ?,
            s_deparment = ?, s_year = ?, s_blood_group = ?
            WHERE s_id = ?`,
            [s_name, s_age, s_email, s_phone_no, s_deparment, s_year, s_blood_group, studentId]
        );
        
        return result.affectedRows > 0;
    }
    
    static async delete(studentId) {
        const [result] = await pool.execute(
            'DELETE FROM students WHERE s_id = ?',
            [studentId]
        );
        return result.affectedRows > 0;
    }
    
    static async getStats() {
        // Blood group statistics
        const [bloodStats] = await pool.execute(
            'SELECT s_blood_group, COUNT(*) as count FROM students GROUP BY s_blood_group'
        );
        
        // Department statistics
        const [deptStats] = await pool.execute(
            'SELECT s_deparment, COUNT(*) as count FROM students GROUP BY s_deparment'
        );
        
        // Year statistics
        const [yearStats] = await pool.execute(
            'SELECT s_year, COUNT(*) as count FROM students GROUP BY s_year'
        );
        
        // Total count
        const [[{ total }]] = await pool.execute('SELECT COUNT(*) as total FROM students');
        
        return {
            total,
            bloodStats,
            deptStats,
            yearStats
        };
    }
}

module.exports = Student;