const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const ResultSchema = new Schema({
    testID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    result: {
        type: Number,
        required: true
    }
});

module.exports = Result = mongoose.model("results", ResultSchema);