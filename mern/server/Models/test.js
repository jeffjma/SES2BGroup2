const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const TestSchema = new Schema({
  questions: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "questions",
    default: []
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subjects",
    required: true
  },
  total_marks: { //Number of marks received at the end of the test
    type: number,
    required: false
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  availability: {
    start_date: {
      type: Date,
      required: true
    },
    end_date: {
      type: Date,
      required: true
    }
  }
  
});

module.exports = Test = mongoose.model("test", TestSchema);