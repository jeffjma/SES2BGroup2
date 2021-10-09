const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const TestSchema = new Schema({
  questions: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "questions",
    default: []
<<<<<<< HEAD
=======
  },
  subject: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "subjects",
    required: true
  },
  answer: {
    type: String,
    required: true
>>>>>>> Backend-TestModel
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
<<<<<<< HEAD
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
=======
>>>>>>> Backend-TestModel
  
});

module.exports = Test = mongoose.model("test", TestSchema);