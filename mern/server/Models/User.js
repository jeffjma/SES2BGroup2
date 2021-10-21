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
  },
  userType: {
    type: String,
    required: true
  },
  educationLevel: {
    type: String,
    required: false
  },
  year: {
    type: String,
    required: false
  },
  currentSubjects: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "subjects",
    required: false
  },
  faculty: {
    type: String,
    required: false
  },
  completedSubjects: {
    type: [String],
    required: false
  },
  testResults: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "tests",
    required: false
  }
});

module.exports = User = mongoose.model("users", UserSchema);