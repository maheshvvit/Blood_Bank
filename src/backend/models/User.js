const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  user_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.statics.create = async function({ user_name, email, password }) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = new this({ user_name, email, password: hashedPassword });
  await user.save();
  return user._id;
};

userSchema.statics.findByUsername = async function(username) {
  const user = await this.findOne({ user_name: username });
  if (!user) return null;
  return { ...user.toObject(), id: user._id };
};

userSchema.statics.findByEmail = async function(email) {
  const user = await this.findOne({ email });
  if (!user) return null;
  return { ...user.toObject(), id: user._id };
};

userSchema.statics.comparePassword = async function(plain, hash) {
  return await bcrypt.compare(plain, hash);
};

userSchema.statics.generateToken = function(user) {
  return jwt.sign(
    { id: user.id || user._id, user_name: user.user_name },
    process.env.JWT_SECRET || "secret123",
    { expiresIn: "1d" }
  );
};

userSchema.statics.verifyToken = function(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || "secret123");
  } catch (err) {
    return null;
  }
};

module.exports = mongoose.model("User", userSchema);
