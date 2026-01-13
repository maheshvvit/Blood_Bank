const { pool } = require("../config/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class User {

  static async create({ user_name, email, password }) {
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert user into database
    const [result] = await pool.execute(
      "INSERT INTO users (user_name, email, password) VALUES (?, ?, ?)",
      [user_name, email, hashedPassword]
    );

    return result.insertId;
  }

  static async findByUsername(username) {
    const [rows] = await pool.execute(
      "SELECT * FROM users WHERE user_name = ?",
      [username]
    );
    return rows[0];
  }

  static async findByEmail(email) {
    const [rows] = await pool.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    return rows[0];
  }

  static async comparePassword(plain, hash) {
    return await bcrypt.compare(plain, hash);
  }

  static generateToken(user) {
    return jwt.sign(
      { id: user.id, user_name: user.user_name },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "1d" }
    );
  }

  static verifyToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET || "secret123");
    } catch (err) {
      return null;
    }
  }
}

module.exports = User;
