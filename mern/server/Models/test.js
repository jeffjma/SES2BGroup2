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
      type: String,
      required: true
    },
    end_date: {
      type: String,
      required: true
    }
  }
  
});

module.exports = Test = mongoose.model("test", TestSchema);