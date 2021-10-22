const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const AwardSchema = new Schema({
    //Basic name of the award used
    name: {
        type: String,
        required: true
    },
    //String that represents what image the award is displayed at
    image: {
        type: String,
        required: false
    },
    //The difficulty number when the award is given at
    awardAt: {
        type: Number,
        required: true
    },
    //Basic description that can be displayed somewhere 
    description: {
        type: String,
        required: false
    },
    //What tests/ subjects this award is associated on/ active on
    tests: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "subjects",
        default: []
    }
});

module.exports = Award = mongoose.model("award", AwardSchema);