const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const SubjectSchema = new Schema({
    subject_id: {
        type: number,
        required: true
    },
    staff_id: {
        type: number,
        required: true
    }
});

module.exports = Subject = mongoose.model("subjects", SubjectSchema);