const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   _id:mongoose.Schema.Types.ObjectId,
   userID:String,
   guildID:String,
   lastEdited:String,
   failedHackCount:{type:Number,default:0},
   successfulHackCount:{type:Number,default:0},
   failedDriveCount:{type:Number,default:0},
   successfulDriveCount:{type:Number,default:0},
   failedGunCount:{type:Number,default:0},
   successfulGunCount:{type:Number,default:0},
   failedHeistsCount:{type:Number,default:0},
   successfulHeistsCount:{type:Number,default:0}
});

module.exports = new mongoose.model('userWorkCount',userSchema,'WorkCountData');