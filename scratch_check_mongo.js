const mongoose = require('mongoose');
const Student = require('./src/backend/models/Student');
require('dotenv').config();

async function checkStudents() {
  const uri = process.env.MONGO_URI || "mongodb://localhost:27017/blood_bank_db";
  await mongoose.connect(uri);
  const students = await Student.find({}, { _id: 0, s_name: 1, s_id: 1, s_email: 1 });
  console.log(students);
  process.exit(0);
}
checkStudents();
