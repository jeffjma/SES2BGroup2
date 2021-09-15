const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const TestSchema = new Schema({
  questions: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: false
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
  subject_id: {
    type: number,
    required: true
  },
});

module.exports = Test = mongoose.model("test", TestSchema);