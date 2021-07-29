const Discord = require("discord.js");
const UserWorkCount = require('../models/WorkCount');
const mongoose = require('mongoose');
const cities = require("../json/names.json")
const { Client } = require('unb-api')
const client = new Client('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBfaWQiOiI3NTkzODk2MDE0NjczMzQ3NTUiLCJpYXQiOjE2MDExMjI5ODl9.lh8iK89-qjtrMMiFK24ZcrB15Bkii88P6dtYBJFqqPQ');

module.exports = {
   name: 'work',
   desciption: 'work command',
   guildOnly: true,
   
   validChannels: '【🤖】bot-commands',
   usage: '<no args>',
   args: false,
  async execute(bot, message, args) {
      function getRndInteger(mini, maxx) {
         return Math.floor(Math.random() * (maxx - mini + 1)) + mini;
      }

      var coinsGiven;

      const filter = m => m.author.id === message.author.id;
      let guildID = message.guild.id;
      let guild = bot.guilds.cache.get(guildID);

      const hasEveryRole = roles => {
         return roles.every(roleName => message.member.roles.cache.some(role => role.name === roleName))
      }

      let uName = message.author.tag;
      let userID = message.author.id;
      let sIcon = message.author.displayAvatarURL();
      let professor = message.guild.channels.cache.find(x => x.id === "773534884077240330");

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

      if (!args[0]) {
         coinsGiven = getRndInteger(100, 250);
         client.editUserBalance(guildID, userID, { cash: coinsGiven }).then(report(coinsGiven, "none", "none"));
         message.channel.send(`You worked for <@!292953664492929025>'s Devs. Here some ${coinsGiven} Denver coins for you.`);
      }
      else {
         let lowered = args[0].toLowerCase();
         if (lowered === "hacker") {
            var whichHack = getRndInteger(1, 3);
            if (whichHack === 1) {
               var count = 0;
               function recurssiveShit() {
                  var arr = [];
                  var i;
                  let hackString = "";
                  function getRndInteger(mini, maxx) {
                     return Math.floor(Math.random() * (maxx - mini + 1)) + mini;
                  }
                  let I_Or_D = getRndInteger(1, 2);
                  //create a unique 4 digits array
                  while (arr.length < 4) {
                     var r = Math.floor(Math.random() * 9) + 1;
                     if (arr.indexOf(r) === -1) arr.push(r);
                  }
                  console.log(arr);



                  if (I_Or_D === 1) {
                     //sort the array in increasing order
                     order = "increasing";
                  }
                  else {
                     //sort the array in decreasing order
                     order = "decreasing";
                  }

                  //show the array to be sorted
                  const showOrder10 = new Discord.MessageEmbed()
                     .setTitle(`\nWrite it in ${order} order.\n` +
                        `\`${arr[0]},${arr[1]},${arr[2]},${arr[3]},\``)
                     .setDescription(`Time Left : 10 secs`)
                     .attachFiles([`./images/ar.png`])
                     .setImage(`attachment://ar.png`)
                     .setFooter("Example - 1234")

                  const showOrder8 = new Discord.MessageEmbed()
                     .setTitle(`\nWrite it in ${order} order.\n` +
                        `\`${arr[0]},${arr[1]},${arr[2]},${arr[3]},\``)
                     .setDescription(`Time Left : 8 secs`)
                  showOrder8.attachFiles([`./images/ar.png`])
                  showOrder8.setImage(`attachment://ar.png`)
                     .setFooter("Example - 1234")

                  const showOrder6 = new Discord.MessageEmbed()
                     .setTitle(`\nWrite it in ${order} order.\n` +
                        `\`${arr[0]},${arr[1]},${arr[2]},${arr[3]},\``)
                     .setDescription(`Time Left : 6 secs`)
                  showOrder6.attachFiles([`./images/ar.png`])
                  showOrder6.setImage(`attachment://ar.png`)
                     .setFooter("Example - 1234")

                  const showOrder4 = new Discord.MessageEmbed()
                     .setTitle(`\nWrite it in ${order} order.\n` +
                        `\`${arr[0]},${arr[1]},${arr[2]},${arr[3]},\``)
                     .setDescription(`Time Left : 4 secs`)
                  showOrder4.attachFiles([`./images/ar.png`])
                  showOrder4.setImage(`attachment://ar.png`)
                     .setFooter("Example - 1234")

                  const showOrder2 = new Discord.MessageEmbed()
                     .setTitle(`\nWrite it in ${order} order.\n` +
                        `\`${arr[0]},${arr[1]},${arr[2]},${arr[3]},\``)
                     .setDescription(`Time Left : 2 secs`)
                  showOrder2.attachFiles([`./images/ar.png`])
                  showOrder2.setImage(`attachment://ar.png`)
                     .setFooter("Example - 1234")

                  const showOrder0 = new Discord.MessageEmbed()
                     .setTitle(`\nWrite it in ${order} order.\n` +
                        `\`${arr[0]},${arr[1]},${arr[2]},${arr[3]},\``)
                     .setDescription(`Time Left : 0 secs`)
                  showOrder0.attachFiles([`./images/ar.png`])
                  showOrder0.setImage(`attachment://ar.png`)
                     .setFooter("Example - 1234")

                  message.channel.send(showOrder10).then((msg) => {
                     setTimeout(function () {
                        msg.edit(showOrder8).then((msg) => {
                           setTimeout(function () {
                              msg.edit(showOrder6).then((msg) => {
                                 setTimeout(function () {
                                    msg.edit(showOrder4).then((msg) => {
                                       setTimeout(function () {
                                          msg.edit(showOrder2).then((msg) => {
                                             setTimeout(function () {
                                                msg.edit(showOrder0);
                                             }, 2000)
                                          })
                                       }, 2000)
                                    })
                                 }, 2000)
                              })
                           }, 2000)
                        })
                     }, 1000)
                  })


                  if (I_Or_D === 1) {
                     //sort the array in increasing order
                     arr.sort((a, b) => a - b);
                  }
                  else {
                     //sort the array in decreasing order
                     arr.sort((a, b) => b - a);
                  }
                  //store the sorted array as string
                  for (i = 0; i < 4; i++) {
                     hackString += arr[i];
                  }

                  //check is user's input is same as sorted array
                  message.channel.awaitMessages(filter, { max: 1, time: 15000 }).then(async collected =>  {
                     let check = collected.first().content;
                     if (check === hackString) {
                        message.channel.send("Hack Successful\n");
                        if (++count !== 3) { // increment counter, than check if it equals three
                           recurssiveShit();
                        } else {
                           message.delete();
                           coinsGiven = getRndInteger(500, 750);
                           let finalEmbed = new Discord.MessageEmbed()
                              .setTitle("3 Hacks Successful.\nDoor Unlocked.")
                              .attachFiles([`./images/arg.png`])
                              .setImage(`attachment://arg.png`)
                              .setDescription(`Denver Coins : ${coinsGiven}`)
                           client.editUserBalance(guildID, userID, { cash: coinsGiven }).then(report(coinsGiven, "hacker", "asc-desc"));
                           
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
                           await UserWorkCount.findOneAndUpdate({ userID: message.author.id, guildID: message.guild.id }, { successfulHackCount: UserProfile.successfulHackCount + 1, lastEdited: Date.now() });
                           return message.channel.send(finalEmbed);
                        }
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
                           await UserWorkCount.findOneAndUpdate({ userID: message.author.id, guildID: message.guild.id }, { failedHackCount: UserProfile.failedHackCount + 1, lastEdited: Date.now() });
                          
                        let finalEmbed = new Discord.MessageEmbed()
                           .setTitle("Incorrect, Hack Failed.")
                           .attachFiles([`./images/ard.png`])
                           .setImage(`attachment://ard.png`)
                        return message.channel.send(finalEmbed);
                     }
                  }).catch(async err => {
                     console.log(err);
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
                           await UserWorkCount.findOneAndUpdate({ userID: message.author.id, guildID: message.guild.id }, { failedHackCount: UserProfile.failedHackCount + 1, lastEdited: Date.now() });
                     let finalEmbed = new Discord.MessageEmbed()
                        .setTitle("Time ran out, Hack Failed.")
                        .attachFiles([`./images/ard.png`])
                        .setImage(`attachment://ard.png`)
                     return message.channel.send(finalEmbed);
                  })
                  console.log(hackString);
               }

               recurssiveShit();
            }
            else if (whichHack === 2) {
               var arr = [];
               while (arr.length < 5) {
                  var r = Math.floor(Math.random() * 9) + 0;
                  if (arr.indexOf(r) === -1) arr.push(r);
               }

               let numbers = [":one:", ":two:", ":three:", ":four:", ":five:", ":six:", ":seven:", ":eight:", ":nine:", ":asterisk:", ":zero:", ":hash:"];
               let mobile = "⬜⬜⬜\n" +
                  "⬜⬜⬜\n" +
                  `${numbers[0]}${numbers[1]}${numbers[2]}\n` +
                  `${numbers[3]}${numbers[4]}${numbers[5]}\n` +
                  `${numbers[6]}${numbers[7]}${numbers[8]}\n` +
                  `${numbers[9]}${numbers[10]}${numbers[11]}\n`;



               function getImage(imageNumber) {
                  let ImagetoShow;
                  switch (imageNumber) {
                     case 1:
                        ImagetoShow = "⬜⬜⬜\n" +
                           "⬜⬜⬜\n" +
                           `🟥${numbers[1]}${numbers[2]}\n` +
                           `${numbers[3]}${numbers[4]}${numbers[5]}\n` +
                           `${numbers[6]}${numbers[7]}${numbers[8]}\n` +
                           `${numbers[9]}${numbers[10]}${numbers[11]}\n`;
                        break;
                     case 2:
                        ImagetoShow = "⬜⬜⬜\n" +
                           "⬜⬜⬜\n" +
                           `${numbers[0]}🟥${numbers[2]}\n` +
                           `${numbers[3]}${numbers[4]}${numbers[5]}\n` +
                           `${numbers[6]}${numbers[7]}${numbers[8]}\n` +
                           `${numbers[9]}${numbers[10]}${numbers[11]}\n`;
                        break;
                     case 3:
                        ImagetoShow = "⬜⬜⬜\n" +
                           "⬜⬜⬜\n" +
                           `${numbers[0]}${numbers[1]}🟥\n` +
                           `${numbers[3]}${numbers[4]}${numbers[5]}\n` +
                           `${numbers[6]}${numbers[7]}${numbers[8]}\n` +
                           `${numbers[9]}${numbers[10]}${numbers[11]}\n`;
                        break;
                     case 4:
                        ImagetoShow = "⬜⬜⬜\n" +
                           "⬜⬜⬜\n" +
                           `${numbers[0]}${numbers[1]}${numbers[2]}\n` +
                           `🟥${numbers[4]}${numbers[5]}\n` +
                           `${numbers[6]}${numbers[7]}${numbers[8]}\n` +
                           `${numbers[9]}${numbers[10]}${numbers[11]}\n`;
                        break;
                     case 5:
                        ImagetoShow = "⬜⬜⬜\n" +
                           "⬜⬜⬜\n" +
                           `${numbers[0]}${numbers[1]}${numbers[2]}\n` +
                           `${numbers[3]}🟥${numbers[5]}\n` +
                           `${numbers[6]}${numbers[7]}${numbers[8]}\n` +
                           `${numbers[9]}${numbers[10]}${numbers[11]}\n`;
                        break;
                     case 6:
                        ImagetoShow = "⬜⬜⬜\n" +
                           "⬜⬜⬜\n" +
                           `${numbers[0]}${numbers[1]}${numbers[2]}\n` +
                           `${numbers[3]}${numbers[4]}🟥\n` +
                           `${numbers[6]}${numbers[7]}${numbers[8]}\n` +
                           `${numbers[9]}${numbers[10]}${numbers[11]}\n`;
                        break;
                     case 7:
                        ImagetoShow = "⬜⬜⬜\n" +
                           "⬜⬜⬜\n" +
                           `${numbers[0]}${numbers[1]}${numbers[2]}\n` +
                           `${numbers[3]}${numbers[4]}${numbers[5]}\n` +
                           `🟥${numbers[7]}${numbers[8]}\n` +
                           `${numbers[9]}${numbers[10]}${numbers[11]}\n`;
                        break;
                     case 8:
                        ImagetoShow = "⬜⬜⬜\n" +
                           "⬜⬜⬜\n" +
                           `${numbers[0]}${numbers[1]}${numbers[2]}\n` +
                           `${numbers[3]}${numbers[4]}${numbers[5]}\n` +
                           `${numbers[6]}🟥${numbers[8]}\n` +
                           `${numbers[9]}${numbers[10]}${numbers[11]}\n`;
                        break;
                     case 9:
                        ImagetoShow = "⬜⬜⬜\n" +
                           "⬜⬜⬜\n" +
                           `${numbers[0]}${numbers[1]}${numbers[2]}\n` +
                           `${numbers[3]}${numbers[4]}${numbers[5]}\n` +
                           `${numbers[6]}${numbers[7]}🟥\n` +
                           `${numbers[9]}${numbers[10]}${numbers[11]}\n`;
                        break;
                     case 0:
                        ImagetoShow = "⬜⬜⬜\n" +
                           "⬜⬜⬜\n" +
                           `${numbers[0]}${numbers[1]}${numbers[2]}\n` +
                           `${numbers[3]}${numbers[4]}${numbers[5]}\n` +
                           `${numbers[6]}${numbers[7]}${numbers[8]}\n` +
                           `${numbers[9]}🟥${numbers[11]}\n`;
                        break;
                  }
                  return ImagetoShow;
               }

               let secondImageNumber = arr[0];
               console.log(secondImageNumber);
               let thirdImageNumber = arr[1];
               console.log(thirdImageNumber);
               let fourthImageNumber = arr[2];
               console.log(fourthImageNumber);
               let fifthImageNumber = arr[3];
               console.log(fifthImageNumber);
               let sixthImageNumber = arr[4];
               console.log(sixthImageNumber);


               let mainMessage = `\`${uName}\`, Figure out the code.`;
               let mainEmbed = new Discord.MessageEmbed()
                  .setDescription(mobile);
               let secondEmbed = new Discord.MessageEmbed()
                  .setDescription(getImage(secondImageNumber))
               let thirdEmbed = new Discord.MessageEmbed()
                  .setDescription(getImage(thirdImageNumber))
               let fourthEmbed = new Discord.MessageEmbed()
                  .setDescription(getImage(fourthImageNumber))
               let fifthEmbed = new Discord.MessageEmbed()
                  .setDescription(getImage(fifthImageNumber))
               let sixthEmbed = new Discord.MessageEmbed()
                  .setDescription(getImage(sixthImageNumber))

               message.channel.send(mainMessage);
               setTimeout(function () {
                  message.channel.send(mainEmbed).then(async msg => {
                     setTimeout(function () {
                        msg.edit(secondEmbed).then(async msg => {
                           setTimeout(function () {
                              msg.edit(thirdEmbed).then(async msg => {
                                 setTimeout(function () {
                                    msg.edit(fourthEmbed).then(async msg => {
                                       setTimeout(function () {
                                          msg.edit(fifthEmbed).then(async msg => {
                                             setTimeout(function () {
                                                msg.edit(sixthEmbed).then(async msg => {
                                                   setTimeout(function () {
                                                      msg.edit(mainEmbed);
                                                   }, 1000)
                                                });
                                             }, 1000)
                                          });
                                       }, 1000)
                                    });
                                 }, 1000)
                              });
                           }, 1000)
                        });
                     }, 1000)
                  });
               }, 3000)

               let answer = `${arr[0]}${arr[1]}${arr[2]}${arr[3]}${arr[4]}`;
               message.channel.awaitMessages(filter, { max: 1, time: 20000 }).then(async collected => {
                  let checkAnswer = collected.first().content;
                  if (checkAnswer === answer) {
                     coinsGiven = getRndInteger(500, 750);
                     client.editUserBalance(guildID, userID, { cash: coinsGiven }).then(report(coinsGiven, "hacker", "mobile"));
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
                     await UserWorkCount.findOneAndUpdate({ userID: message.author.id, guildID: message.guild.id }, { successfulHackCount: UserProfile.successfulHackCount + 1, lastEdited: Date.now() });
               
                     return message.channel.send(`🕵️ System Hacked Successfully.\n Denver Coins : ${coinsGiven}`)
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
                     await UserWorkCount.findOneAndUpdate({ userID: message.author.id, guildID: message.guild.id }, { failedHackCount: UserProfile.failedHackCount + 1, lastEdited: Date.now() });
               
                     return message.channel.send("🕵️ System Hack Failed.")
                  }
               }).catch(err => {
                  console.log(err);
               })

            }
            else if (whichHack === 3) {
               function getRndInteger(mini, maxx) {
                  return Math.floor(Math.random() * (maxx - mini + 1)) + mini;
               }
               let cityNumber = getRndInteger(0, cities.name.length - 1);
               const filter = m => m.author.id === message.author.id;

               console.log(cities.name[cityNumber]);
               let stringToSend = '';
               let answer = '';
               for (var i = 0; i < 10; i++) {
                  let ascii = getRndInteger(97, 122);
                  stringToSend += String.fromCharCode(ascii);
                  if (cities.name[cityNumber][i]) {
                     answer += cities.name[cityNumber][i];
                     stringToSend += cities.name[cityNumber][i];
                  }
               }

               console.log(stringToSend);



               let sIcon = message.author.displayAvatarURL({ dynamic: true });
               let uName = message.author.tag;

               let embed = new Discord.MessageEmbed()
                  .setAuthor(uName, `${sIcon}`)
                  .setDescription(`Figure out the code.You have 15 seconds.\n\n` +
                     `Code - \`${stringToSend}\``)
                  .setFooter(`Hint - It's name of a city.`)
               message.channel.send(embed);

               message.channel.awaitMessages(filter, { max: 1, time: 15000 }).then(async collected => {
                  let checkAnswer = collected.first().content;
                  checkAnswer = checkAnswer.toLowerCase();

                  if (checkAnswer === answer) {
                     coinsGiven = getRndInteger(500, 750);
                     client.editUserBalance(guildID, userID, { cash: coinsGiven }).then(report(coinsGiven, "hacker", "city-name"));
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
                     await UserWorkCount.findOneAndUpdate({ userID: message.author.id, guildID: message.guild.id }, { successfulHackCount: UserProfile.successfulHackCount + 1, lastEdited: Date.now() });
               
                     return message.channel.send(`🕵️ System Hacked Successfully.\nDenver Coins : ${coinsGiven}`)
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
                     await UserWorkCount.findOneAndUpdate({ userID: message.author.id, guildID: message.guild.id }, { failedHackCount: UserProfile.failedHackCount + 1, lastEdited: Date.now() });
               
                     return message.channel.send("🕵️ System Hack Failed.")
                  }
               }).catch(err => {
                  console.log(err);
               })

            }
         }
         else if (lowered === "driver") {
            var whichdrive = getRndInteger(1, 2);
            if (whichdrive === 1) {

               let answer = '';
               var coinsGiven;
               let arr = [];
               let arr2 = [];
               while (arr.length < 6) {
                  var r = Math.floor(Math.random() * 6) + 1;
                  if (arr.indexOf(r) === -1) {
                     arr.push(r);
                     arr2.push(r - 1);
                  }
               }
               console.log(arr);
               console.log(arr2);

               let sIcon = message.author.displayAvatarURL();
               let professor = message.guild.channels.cache.find(x => x.id === "773534884077240330");

               const introEmbed = new Discord.MessageEmbed()
                  .setTitle("Signal Test ")
                  .setDescription("Couple of traffic signals will be shown.\n Remember the sequence.")
                  .setFooter("Hint - Two same signals can come together.")

               /*const embed1 = new Discord.MessageEmbed()
                  .setTitle("Signal Test ")
                  .setImage(`https://i.imgur.com/We6quFu.png`);*/

               const embed1 = new Discord.MessageEmbed()
                  .setTitle("Signal Test ")
                  .setImage('https://i.imgur.com/Bw4B6Um.png');
               const embed2 = new Discord.MessageEmbed()
                  .setTitle("Signal Test ")
                  .setImage(`https://i.imgur.com/NP7ShER.png`);
               const embed3 = new Discord.MessageEmbed()
                  .setTitle("Signal Test ")
                  .setImage(`https://i.imgur.com/T0181FC.png`);

               const finalEmbed = new Discord.MessageEmbed()
                  .setTitle("Signal Test")
                  .setDescription("r - Red Signal\ny - Yellow Signal\ng - Green Signal\n\nWrite the correct sequence.\n For example - rrgygy")
                  .setFooter('Tip - Never Send a message while signal is flashing to avoid accidents.')

               let embeds = [embed1, embed2, embed3, embed1, embed2, embed3];

               message.channel.send(introEmbed).then((msg) => {
                  setTimeout(async function () {
                     await msg.edit(embeds[arr2[0]]).then((msg) => {
                        setTimeout(async function () {
                           await msg.edit(embeds[arr2[1]]).then((msg) => {
                              setTimeout(async function () {
                                 await msg.edit(embeds[arr2[2]]).then((msg) => {
                                    setTimeout(async function () {
                                       await msg.edit(embeds[arr2[3]]).then((msg) => {
                                          setTimeout(async function () {
                                             await msg.edit(embeds[arr2[4]]).then((msg) => {
                                                setTimeout(async function () {
                                                   await msg.edit(embeds[arr2[5]]).then((msg) => {
                                                      setTimeout(async function () {
                                                         await msg.edit(finalEmbed);
                                                      }, 3000)
                                                   })
                                                }, 3000)
                                             })
                                          }, 3000)
                                       })
                                    }, 3000)
                                 })
                              }, 3000)
                           })
                        }, 3000)
                     })
                  }, 4000)
               })

               for (var j = 0; j < arr2.length; j++) {
                  if (arr2[j] === 0) {
                     answer += 'r';
                  }
                  else if (arr2[j] === 1) {
                     answer += 'y';
                  }
                  else if (arr2[j] === 2) {
                     answer += 'g';
                  }
                  else if (arr2[j] === 3) {
                     answer += 'r';
                  }
                  else if (arr2[j] === 4) {
                     answer += 'y';
                  }
                  else if (arr2[j] === 5) {
                     answer += 'g';
                  }
               }
               console.log(answer);

               message.channel.awaitMessages(filter, { max: 1, time: 60000 }).then(async collected => {
                  let checkAnswer = collected.first().content;
                  if (checkAnswer === answer) {
                     coinsGiven = getRndInteger(500, 750);
                     let embed = new Discord.MessageEmbed()
                        .setAuthor(uName, `${sIcon}`)
                        .setDescription(`🏎️ Signal Test Passed.\n\n \*\*Denver Coins\*\* : ${coinsGiven}`)
                     client.editUserBalance(guildID, userID, { cash: coinsGiven }).then(report(coinsGiven, "driver", "signal-test"));
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
                     await UserWorkCount.findOneAndUpdate({ userID: message.author.id, guildID: message.guild.id }, { successfulDriveCount: UserProfile.successfulDriveCount + 1, lastEdited: Date.now() });
               
                     return message.channel.send(embed);
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
                     await UserWorkCount.findOneAndUpdate({ userID: message.author.id, guildID: message.guild.id }, { failedDriveCount: UserProfile.failedDriveCount + 1, lastEdited: Date.now() });
               
                     return message.channel.send("Signal Test Failed.");
                  }
               }).catch(err => {
                  console.log(err);
               })
            }
            else if (whichdrive === 2) {
               let descriptionn = "Park the Car to 🅿️\n Use a,s,w,d for navigations. Directions are respective to car.\nType \`stop\` to stop parking";
               let embeddd = new Discord.MessageEmbed()
                  .setTitle("Parking Test")
                  .setAuthor(uName, `${sIcon}`)
                  .setDescription(descriptionn)
               message.channel.send(embeddd).then(r => r.delete({ timeout: 10000 }));

               setTimeout(function () {
                  function getRndInteger(mini, maxx) {
                     return Math.floor(Math.random() * (maxx - mini + 1)) + mini;
                  }
                  let carNumber = getRndInteger(1, 2);

                  function getPattern(xCoordinateofCar, yCoordinateofCar, xCoordinateofParking, yCoordinateofParking, carNumber, carPosition) {
                     let newPattern = '';
                     let cars = ['🚘', '🚖', '🚔'];
                     let cars2 = ['🚙', '🚕', '🚓'];

                     for (var i = 0; i <= 9; i++) {
                        for (var j = 0; j <= 12; j++) {
                           if (i === 0 || i === 9) {
                              newPattern += '🟪';
                           }
                           else if (j === 0 || j === 12) {
                              newPattern += '🟪';
                           }
                           else if (i === xCoordinateofCar && j === yCoordinateofCar) {
                              if (carPosition === "horizontal") {
                                 newPattern += cars[carNumber];
                              }
                              else {
                                 newPattern += cars2[carNumber];
                              }

                           }
                           else if (i === xCoordinateofParking && j === yCoordinateofParking) {
                              newPattern += '🅿️';
                           }
                           else {
                              newPattern += '⬛';
                           }
                        }
                        newPattern += "\n";
                     }
                     return newPattern;
                  }
                  function getXdirections(xDistance) {
                     let answer1 = '';
                     if (xDistance < 0) { answer1 += 'd'; }
                     else if (xDistance === 0) { answer1 += '-'; }
                     else {
                        answer1 += 'a';
                     }
                     return answer1;
                  }
                  function getYdirections(yDistance) {
                     let answer2 = '';
                     if (yDistance < 0) { answer2 += 's'; }
                     else if (yDistance === 0) { answer2 += '-'; }
                     else {
                        answer2 += 'w';
                     }
                     return answer2;
                  }
                  function getnewPattern(newPattern) {
                     let sIcon = message.author.displayAvatarURL();
                     let uName = message.author.tag;
                     let embedd = new Discord.MessageEmbed()
                        .setAuthor(uName, `${sIcon}`)
                        .setDescription(newPattern)
                        .setFooter("Directions are represented by a,s,w,d.");
                     message.channel.send(embedd);
                  }
                  function bumpedWall(uName, sIcon) {
                     let embed = new Discord.MessageEmbed()
                        .setAuthor(uName, `${sIcon}`)
                        .setColor('#fefeff')
                        .setFooter("You crashed into Wall.\n Be Careful next time.");
                     return message.channel.send(embed);

                  }



                  function getRndInteger(mini, maxx) {
                     return Math.floor(Math.random() * (maxx - mini + 1)) + mini;
                  }

                  let sIcon = message.author.displayAvatarURL();
                  let uName = message.author.tag;
                  let userID = message.author.id;
                  let professor = message.guild.channels.cache.find(x => x.id === "773534884077240330");


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

                  //corrdinate system
                  let answer1 = '';
                  let answer2 = '';
                  let answer = '';
                  var xCoordinateofParking = getRndInteger(1, 8);
                  var yCoordinateofParking = getRndInteger(1, 11);
                  console.log("P - " + xCoordinateofParking + "-" + yCoordinateofParking);

                  var xCoordinateofCar = getRndInteger(1, 8);
                  var yCoordinateofCar = getRndInteger(1, 11);
                  console.log("C - " + xCoordinateofCar + "-" + yCoordinateofCar);

                  var xDistance = yCoordinateofCar - yCoordinateofParking;
                  var yDistance = xCoordinateofCar - xCoordinateofParking;
                  console.log("x distance - " + xDistance);
                  console.log("y distance - " + yDistance);

                  //pattern formation
                  let newPattern = getPattern(xCoordinateofCar, yCoordinateofCar, xCoordinateofParking, yCoordinateofParking, carNumber, "horizontal");

                  //assigning directions
                  answer1 = getXdirections(xDistance);
                  answer2 = getYdirections(yDistance);

                  //special cases
                  if (answer1 === "-" && answer2 !== "-") {
                     answer = answer2;
                  }
                  else if (answer1 !== "-" && answer2 === "-") {
                     answer = answer1;
                  }
                  else {
                     answer = `${answer1}${answer2}`;
                  }
                  console.log(answer);

                  if (xCoordinateofCar === xCoordinateofParking && yCoordinateofCar === yCoordinateofParking) {
                     getEmbed();
                  }

                  //interface
                  let embedd = new Discord.MessageEmbed()
                     .setAuthor(uName, `${sIcon}`)
                     .setDescription(newPattern)
                     .setFooter("Directions are represented by a,s,w,d.");
                  message.channel.send(embedd);


                  const filter = m => m.author.id === message.author.id;
                  const collector = message.channel.createMessageCollector(filter);

                  collector.on('collect', async m => {
                     let check = m.content;
                     check = check.toLowerCase();
                     switch (check) {
                        case 'a':
                           {
                              yCoordinateofCar = yCoordinateofCar - 1;
                              newPattern = getPattern(xCoordinateofCar, yCoordinateofCar, xCoordinateofParking, yCoordinateofParking, carNumber, "vertical");
                              getnewPattern(newPattern);
                              break;
                           }
                        case 'd':
                           {
                              yCoordinateofCar = yCoordinateofCar + 1;
                              newPattern = getPattern(xCoordinateofCar, yCoordinateofCar, xCoordinateofParking, yCoordinateofParking, carNumber, "vertical");
                              getnewPattern(newPattern);
                              break;
                           } case 'w':
                           {
                              xCoordinateofCar = xCoordinateofCar - 1;
                              newPattern = getPattern(xCoordinateofCar, yCoordinateofCar, xCoordinateofParking, yCoordinateofParking, carNumber, "horizontal");
                              getnewPattern(newPattern);
                              break;
                           } case 's':
                           {
                              xCoordinateofCar = xCoordinateofCar + 1;
                              newPattern = getPattern(xCoordinateofCar, yCoordinateofCar, xCoordinateofParking, yCoordinateofParking, carNumber, "horizontal");
                              getnewPattern(newPattern);
                              break;
                           }
                        case 'stop':
                           {
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
                              await UserWorkCount.findOneAndUpdate({ userID: message.author.id, guildID: message.guild.id }, { failedDriveCount: UserProfile.failedDriveCount + 1, lastEdited: Date.now() });
                        
                              let embed = new Discord.MessageEmbed()
                                 .setAuthor(uName, `${sIcon}`)
                                 .setColor('#fefeff')
                                 .setDescription("Parking Stopped.")
                              message.channel.send(embed);
                              collector.stop();
                              break;
                           }
                        default:
                           {
                              let incorectEmbed = new Discord.MessageEmbed()
                                 .setAuthor(uName, `${sIcon}`)
                                 .setColor('#fefeff')
                                 .setDescription("Incorrect input.\n Type \`a\` or \`w\` or \`s\` or \`d\`")
                              return message.channel.send(incorectEmbed);
                           }
                     }
                     for (var i = 0; i < 10; i++) {
                        var j = 0;
                        if (xCoordinateofCar === j && yCoordinateofCar === i) {
                           collector.stop();
                           bumpedWall(uName, sIcon);
                        }
                        j = 9;
                        if (xCoordinateofCar === j && yCoordinateofCar === i) {
                           collector.stop();
                           bumpedWall(uName, sIcon);
                        }
                     }
                     for (var i = 0; i < 10; i++) {
                        var j = 0;
                        if (xCoordinateofCar === i && yCoordinateofCar === j) {
                           collector.stop();
                           bumpedWall(uName, sIcon);
                        }
                        j = 12;
                        if (xCoordinateofCar === i && yCoordinateofCar === j) {
                           collector.stop();
                           bumpedWall(uName, sIcon);
                        }
                     }
                     if (xCoordinateofCar === xCoordinateofParking && yCoordinateofCar === yCoordinateofParking) {
                        collector.stop();

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
                        await UserWorkCount.findOneAndUpdate({ userID: message.author.id, guildID: message.guild.id }, { successfulDriveCount: UserProfile.successfulDriveCount + 1, lastEdited: Date.now() });
                  
                        let guildID = '628512144454975489';
                        let coinsGiven = getRndInteger(500, 750);
                        let finalEmbed = new Discord.MessageEmbed()
                           .setAuthor(uName, `${sIcon}`)
                           .setDescription(" 🏎️  Car Parked.\n\n\*\*Denver Coins : \*\* " + coinsGiven)
                        client.editUserBalance(guildID, userID, { cash: coinsGiven }).then(report(coinsGiven, "driver", "parking-test"));
                        return message.channel.send(finalEmbed);

                     }

                  });

               }, 3000)
            }
            //asdfghjklzxcvbnmqwertyuiop
            //global payment
            //y8hr

         }
         else if (lowered === "gunman") {
            message.channel.send("Coming Soon.");
         }
         else if (lowered === "list") {
            let embed = new Discord.MessageEmbed()
               .setAuthor(uName, `${sIcon}`)
               .setDescription("Avaiable Jobs\n" +
                  "🕵 Hacker\n" +
                  "🏎️ Driver\n" +
                  "<:MH_gun:628887246874869790> Gunman")
               .setFooter("p!work <work as>")
            message.channel.send(embed);
         }
         else {
            return message.channel.send("🕵️ Invalid argument.\nExecute \`p!work list\` to view all available jobs.")
         }
      }
   },
};