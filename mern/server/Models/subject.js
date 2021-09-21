const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const SubjectSchema = new Schema({
    staff_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }
});

module.exports = Subject = mongoose.model("subjects", SubjectSchema);