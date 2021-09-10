const mongoose = require("mongoose");
const extendSchema = require("mongoose-extend-schema");
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

// Usage:
const StudentUserSchema = extendSchema(UserSchema, {
  educationLevel: {type: String, required: true}
});

const ExaminerUserSchema = extendSchema(UserSchema, {
  subjectID: {type: String, required: true}
})

module.exports = User = mongoose.model("users", UserSchema);
module.exports = StudentUser = mongoose.model("users", StudentUserSchema);
module.exports = ExaminerUser = mongoose.model("users", ExaminerUserSchema);
