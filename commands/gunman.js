const Discord = require("discord.js");
const UserWorkCount = require('../models/WorkCount');
const mongoose = require('mongoose');
const cities = require("../json/names.json")
const { Client } = require('unb-api')
const client = new Client('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBfaWQiOiI4NDg3NjQyODk5NzY1MDI5MzkiLCJpYXQiOjE2MjI0MzE1NzZ9.p_nwRmIKsCEYiw1nJ5qgLBnRw5TRp_cxfHj_N5IfDPE');

module.exports = {
  name: 'start-admin-test',
  desciption: 'hack test command',
  guildOnly: true,
  usage: '<no args>',
  //cooldown: 10,
  args: false,
  async execute(bot, message, args) {

    //get random number
    function getRndInteger(mini, maxx) {
      return Math.floor(Math.random() * (maxx - mini + 1)) + mini;
    }

    let trees = ['🌲', '🌳']; //types of trees
    let mountains = ['🗻', '🏔️']; //types of mountains
    let roadBlock = ['🔳', '🚓']; //types of mountains



    let isSpy = false; //wheather wanna show spy or not

    //position of spy (x,y)
    let xCoordinateofSpy = getRndInteger(0, 2);
    let yCoordinateofSpy = getRndInteger(0, 8);

    //make the basic pattern to show
    function getPattern(isSpy, xCoordinateofSpy, yCoordinateofSpy) {

      //final format of message
      let finalPattern = '';
      
      let Spy = '🕵️';
      let isSpyTF = isSpy;

      //title of message. To make the emojis smaller
      let title = ["\*\*Shoot the Spy\*\*\n\n","\*\*Shoot the Spy\*\*\nWrite position(Example - a1)\n\n"];
      if(isSpyTF){
        finalPattern += title[1];
      }
      else{
        finalPattern += title[0];
      }

      let xCoordinateofSpyy = xCoordinateofSpy;
      let yCoordinateofSpyy = yCoordinateofSpy;

      for (var i = 0; i < 3; i++) {
        for (var j = 0; j <=9; j++) {
          if (isSpyTF && (i == xCoordinateofSpyy && j == yCoordinateofSpyy)) {
            finalPattern += Spy;
          }
          else {
            if (i == 0 && j < 10) {
              finalPattern += mountains[getRndInteger(0, 1)];
            }
            else if (i == 1 && j < 10) {
              let chancesOfCar= getRndInteger(1,100);
              if(chancesOfCar>=1 && chancesOfCar<=80)
              {finalPattern += roadBlock[0];}
              else
              {finalPattern += roadBlock[1];}
            }
            if (i == 2) {

              finalPattern += trees[getRndInteger(0, 1)];
            }
            else if (j == 9 && j < 10) {
              finalPattern += '\n';
            }
          }
        }
      }
      return finalPattern;
    }

    let sIcon = message.author.displayAvatarURL({ dynamic: true });
    let uName = message.author.tag;

    let introEmbed = new Discord.MessageEmbed()
       .setAuthor(uName, `${sIcon}`)
       .setDescription(`Help Cops shoot down the spy that stole The Red Boxes.\n` +
      `You will have 10 seconds to tell the position of spy to sniper.\n\n`+
      `Write the \`position(x y)\` coordinates of spy(🕵️) when you see him.\n`+
      `x - can be a,b or c depending upon the row\n`+
      `y - can be 1 to 9 depending upon the column\n\n`+
      `\*\*For Example : \*\*a5 \*\*or\*\* b7 \*\*or\*\* c1`)
       .setFooter(`ps - Just like in Chess`)
    

    let embed= new Discord.MessageEmbed()
    .setDescription(getPattern(isSpy, xCoordinateofSpy, yCoordinateofSpy))

    let embed2= new Discord.MessageEmbed()
    .setDescription(getPattern(isSpy, xCoordinateofSpy, yCoordinateofSpy))
    
    let embed3= new Discord.MessageEmbed()
    .setDescription(getPattern(isSpy, xCoordinateofSpy, yCoordinateofSpy))

    let embed4= new Discord.MessageEmbed()
    .setDescription(getPattern('true', xCoordinateofSpy, yCoordinateofSpy))
  


    console.log(xCoordinateofSpy);
    console.log(yCoordinateofSpy);
    //await message.channel.send(getPattern(isSpy, xCoordinateofSpy, yCoordinateofSpy));
    //await message.channel.send(getPattern('true', xCoordinateofSpy, yCoordinateofSpy));

    message.channel.send(introEmbed).then((msg) => {
      setTimeout(async function () {
         await msg.edit(embed).then((msg) => {
            setTimeout(async function () {
               await msg.edit(embed2).then((msg) => {
                  setTimeout(async function () {
                     await msg.edit(embed3).then((msg) => {
                        setTimeout(async function () {
                           await msg.edit(embed4);
                        }, 1000)
                     })
                  }, 1000)
               })
            }, 1000)
         })
      }, 5000)
   })

   let answer='';
   if(xCoordinateofSpy==0){
    answer+='a';}
   else if(xCoordinateofSpy==1){
    answer+='b';}
    else if(xCoordinateofSpy==2){
    answer+='c';}
 
//shit to be deleted later
var coinsGiven;

const filter = m => m.author.id === message.author.id;
let guildID = message.guild.id;
let guild = bot.guilds.cache.get(guildID);

const hasEveryRole = roles => {
   return roles.every(roleName => message.member.roles.cache.some(role => role.name === roleName))
}


let userID = message.author.id;
let professor = message.guild.channels.cache.find(x => x.id === "848760989012328468");

function report(coinsGiven, type, typeName) {
   let reportEmbed = new Discord.MessageEmbed()
      .setTitle("Balance Updated")
      .setThumbnail(sIcon)
      .setColor("#83F52C")
      .setDescription("**" + "User : " + "**" +
         `<@${userID}>` +
         "**" + "\nAmount : " + "**" +
         `Cash: ` + "`" + `+${coinsGiven}` + "`" +
         " | " + "Bank: " + "`" + `-0` + "`" +
         "**" + "\nReason : " + "**" + `#Work #${type} #${typeName}`)
      .setTimestamp(message.createdAt);
   professor.send(reportEmbed);
}






    //taking input from user
   message.channel.awaitMessages(filter, { max: 1, time: 24000 }).then(async collected => {
     yCoordinateofSpy++;
     answer+=yCoordinateofSpy;
    console.log(answer);

    let checkAnswer = collected.first().content;
    checkAnswer = checkAnswer.toLowerCase();

    if (checkAnswer === answer) {
       coinsGiven = getRndInteger(500, 750);
       client.editUserBalance(guildID, userID, { cash: coinsGiven }).then(report(coinsGiven, "gunman", "shoot-Spy"));
       let UserProfile = await UserWorkCount.findOne({ userID: message.author.id, guildID: message.guild.id });
       if (!UserProfile) {
          UserProfile = await new UserWorkCount({
             _id: mongoose.Types.ObjectId(),
             userID: message.author.id,
             guildID: message.guild.id,
             lastEdited: Date.now(),
             failedHackCount: 0,
             successfulHackCount: 0,
             failedDriveCount: 0,
             successfulDriveCount: 0,
             failedGunCount: 0,
             successfulGunCount: 0,
             failedHeistsCount: 0,
             successfulHeistsCount: 0
          });
          await UserProfile.save().catch(err => console.log(err));
       }
       await UserWorkCount.findOneAndUpdate({ userID: message.author.id, guildID: message.guild.id }, { successfulGunCount: UserProfile.successfulGunCount + 1, lastEdited: Date.now() });
 
       return message.channel.send(`🕵️ Sniper was shot. Red Boxes retrieved.\nDenver Coins : ${coinsGiven}`)
    }
    else {
       let UserProfile = await UserWorkCount.findOne({ userID: message.author.id, guildID: message.guild.id });
       if (!UserProfile) {
          UserProfile = await new UserWorkCount({
             _id: mongoose.Types.ObjectId(),
             userID: message.author.id,
             guildID: message.guild.id,
             lastEdited: Date.now(),
             failedHackCount: 0,
             successfulHackCount: 0,
             failedDriveCount: 0,
             successfulDriveCount: 0,
             failedGunCount: 0,
             successfulGunCount: 0,
             failedHeistsCount: 0,
             successfulHeistsCount: 0
          });
          await UserProfile.save().catch(err => console.log(err));
       }
       await UserWorkCount.findOneAndUpdate({ userID: message.author.id, guildID: message.guild.id }, { failedGunCount: UserProfile.failedGunCount + 1, lastEdited: Date.now() });
 
       return message.channel.send("🕵️ Sniper missed the shot. Spy got away with The Red Boxes.")
    }
 }).catch(err => {
    console.log(err);
 })


  },
};