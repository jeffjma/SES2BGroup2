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
    type: [mongoose.Schema.Types.ObjectId],
    ref: "subjects",
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  points: { //Total marks that can be achieved
    type: number,
    required: true
  },
  results: { //Number of marks received at the end of the test
    type: number,
    required: false
  },
  topic: {
    type: String,
    required: true
  },
  
});

module.exports = Test = mongoose.model("test", TestSchema);