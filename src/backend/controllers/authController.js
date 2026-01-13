const User = require("../models/User");
const jwt = require("jsonwebtoken");

const authController = {

  async register(req, res) {
    try {
      const { user_name, email, password } = req.body;

      // Check if user already exists
      const existingUser = await User.findByUsername(user_name);
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Username already exists",
        });
      }

      const existingEmail = await User.findByEmail(email);
      if (existingEmail) {
        return res.status(400).json({
          success: false,
          message: "Email already exists",
        });
      }

      // Create new user
      const userId = await User.create({ user_name, email, password });

      res.status(201).json({
        success: true,
        message: "Registration successful",
        userId,
      });

    } catch (err) {
      console.error("Registration error:", err);
      res.status(500).json({
        success: false,
        message: "Server error during registration",
      });
    }
  },

  async login(req, res) {
    try {
      const { user_name, password } = req.body;

      if (!user_name || !password) {
        return res.status(400).json({
          success: false,
          message: "Username and password required",
        });
      }

      let user = await User.findByUsername(user_name);
      if (!user) user = await User.findByEmail(user_name);

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid username or password",
        });
      }

      const isMatch = await User.comparePassword(password, user.password);

      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Invalid username or password",
        });
      }

      const token = User.generateToken(user);

      res.json({
        success: true,
        message: "Login successful",
        token,
        user: {
          id: user.id,
          user_name: user.user_name,
          email: user.email,
        },
      });

    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  },

  async verifyToken(req, res) {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '');

      if (!token) {
        return res.status(401).json({
          success: false,
          message: "No token provided",
        });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret123");
      const user = await User.findByUsername(decoded.user_name);

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid token",
        });
      }

      res.json({
        success: true,
        user: {
          id: user.id,
          user_name: user.user_name,
          email: user.email,
        },
      });

    } catch (err) {
      console.error(err);
      res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }
  },
};

module.exports = authController;
