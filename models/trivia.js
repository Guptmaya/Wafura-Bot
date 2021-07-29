const mongoose = require('mongoose');

const triviaSchema = new mongoose.Schema({
   _id:mongoose.Schema.Types.ObjectId,
   userID:String,
   guildID:String,
   triviaFailed:{type:Number,default:0},
   triviaPassed:{type:Number,default:0}
});

module.exports = new mongoose.model('TriviaDetails',triviaSchema,'TriviaDetailsData');