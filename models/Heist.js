const mongoose = require('mongoose');

const heistSchema = new mongoose.Schema({
   _id:mongoose.Schema.Types.ObjectId,
   userID:String,
   guildID:String,
   lastEdited:String,
   guns:String,
   cars:String,
   hacking_device:String,
   necessary_equip:String,
   optional_equip:String,
   driver:String,
   gunman:String,
   hacker:String
});

module.exports = new mongoose.model('HeistDetails',heistSchema,'HeistDetailsData');