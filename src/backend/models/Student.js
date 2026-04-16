const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  s_id: { type: String, required: true, unique: true },
  s_name: { type: String, required: true },
  s_age: { type: Number },
  s_email: { type: String, required: true },
  s_phone_no: { type: String, required: true },
  s_deparment: { type: String },
  s_year: { type: String },
  s_blood_group: { type: String },
  created_at: { type: Date, default: Date.now }
});

studentSchema.statics.create = async function(studentData) {
  const student = new this(studentData);
  await student.save();
  return { id: student._id.toString(), ...student.toObject() };
};

studentSchema.statics.findAll = async function() {
  const students = await this.find().sort({ created_at: -1 });
  return students.map(s => ({ ...s.toObject(), id: s._id.toString() }));
};

studentSchema.statics.findByBloodGroup = async function(bloodGroup) {
  const students = await this.find({ s_blood_group: bloodGroup }).sort({ s_name: 1 });
  return students.map(s => ({ ...s.toObject(), id: s._id.toString() }));
};

studentSchema.statics.findById = async function(studentId) {
  const student = await this.findOne({ s_id: studentId });
  if (!student) return null;
  return { ...student.toObject(), id: student._id.toString() };
};

studentSchema.statics.update = async function(studentId, studentData) {
  const result = await this.updateOne({ s_id: studentId }, { $set: studentData });
  return result.modifiedCount > 0 || result.matchedCount > 0;
};

studentSchema.statics.delete = async function(studentId) {
  const result = await this.deleteOne({ s_id: studentId });
  return result.deletedCount > 0;
};

studentSchema.statics.getStats = async function() {
  const total = await this.countDocuments();
  
  const bloodStats = await this.aggregate([
    { $group: { _id: "$s_blood_group", count: { $sum: 1 } } },
    { $project: { s_blood_group: "$_id", count: 1, _id: 0 } }
  ]);
  
  const deptStats = await this.aggregate([
    { $group: { _id: "$s_deparment", count: { $sum: 1 } } },
    { $project: { s_deparment: "$_id", count: 1, _id: 0 } }
  ]);
  
  const yearStats = await this.aggregate([
    { $group: { _id: "$s_year", count: { $sum: 1 } } },
    { $project: { s_year: "$_id", count: 1, _id: 0 } }
  ]);
  
  return { total, bloodStats, deptStats, yearStats };
};

module.exports = mongoose.model("Student", studentSchema);