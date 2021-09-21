const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const SubjectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    staff_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    questions: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "questions",
        default: []
    }
});

module.exports = Subject = mongoose.model("subjects", SubjectSchema);