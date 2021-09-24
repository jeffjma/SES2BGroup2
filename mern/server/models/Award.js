const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const AwardSchema = new Schema({
  //Basic what type of name the award should have
  name: {
    type: String,
    required: true
  },
  //URL for an image that can be added as the reward. Cant be bothered implementing actuall image uploads
  imageURL: {
    type: String,
  },
  //When to award that reward at (Most likey percent of correct answers or difficulty achived)
  awardAt: {
    type: Number,
    required: true
  },
  //What test this award is asociated with and will work with
  tests: [{
    type: mongoose.Schema.Types.ObjectId,
    //Will need to change to what Test is refered to as
    ref: 'Test',
  }],
  recipients: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }]
});
module.exports = User = mongoose.model("users", UserSchema);