const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Subdocument Schema
const QuestionSchema = new Schema ({
    question: { //The question text
      type: String,
      required: true,
    },
    questionType: { //The type of question Multiple Choice, Short Answer or Checkboxes. Probably shortened to 2 characters (mc, sa, cb)
      type: String,
      required: true,
    },
    answers: { //The possible answers. It is not required as it is unused in Short Answer
      type: [String],
      required: false,
    },
    correctAnswer: { //The actual answers. An array solely for the sake of checkboxes
      type: [String],
      required: true,
    },
    difficulty: { //The questions difficulty rating for the adaptive mechanism
      type: String,
      required: true,
    },
    subtopic: { //The subtopic within the subject the question falls under. It is potentially unnecessary depending on how subjects are structured
      type: String,
      required: false,
    },
  });

//Create Schema
const SubjectSchema = new Schema({
    staff_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    questions: [QuestionSchema]
});

module.exports = Subject = mongoose.model("subjects", SubjectSchema);