 const mongoose = require('mongoose');
const pass = require("../config.json");

 module.exports ={
    init: ()=>{
       const dbOptions={
         useNewUrlParser: true, 
         useUnifiedTopology: true,
         autoIndex:false,
         poolSize:5,
         connectTimeoutMS:10000,
         family:4
       };

       mongoose.connect(`mongodb+srv://professor:${pass.PASS_}@cluster0.5nayk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,dbOptions);
       mongoose.set('useFindAndModify',false);
       mongoose.Promise = global.Promise;

       mongoose.connection.on('connected',()=>{
          console.log("Bot has connected tp database. YAY!");
       });
       mongoose.connection.on('disconnected',()=>{
         console.log("Bot has disconnected tp database!");
      });
      mongoose.connection.on('err',(err)=>{
         console.log("Error : "+ err);
      });
    }
 }