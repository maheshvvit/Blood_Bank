const mongoose = require("mongoose");
require("dotenv").config();

async function testConnection() {
  try {
    const uri = process.env.MONGO_URI || "mongodb://localhost:27017/blood_bank_db";
    await mongoose.connect(uri);
    console.log("✅ MongoDB Connected Successfully");
  } catch (err) {
    console.error("❌ MongoDB Connection Failed:", err.message);
  }
}

module.exports = { testConnection };
