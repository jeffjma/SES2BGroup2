const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const AwardSchema = new Schema({
    //Basic name of the award used
    name: {
        type: String,
        required: true
    },
    //Url that will be attached to the front end to represent the award. Need to add functionalty after looking a front end
    imageURL: {
        type: String,
        required: false
    },
    //Depending on the algorithm the number that can be parsed into the threshold used to give the award
    awardAt: {
        type: Number,
        required: true
    },
    //Basic description that can bse displayed somewhere maybe
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