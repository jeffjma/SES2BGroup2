const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Extend function
const extend = (Schema, obj) => (
  new mongoose.Schema(
    Object.assign({}, Schema.obj, obj)
  )
);

// Usage:
const StudentUserSchema = extend(UserSchema, {
  educationLevel: {type: String, required: true}
});

const ExaminerUserSchema = extend(UserSchema, {
  subjectID: {type: String, required: true}
})

module.exports = User = mongoose.model("users", UserSchema);