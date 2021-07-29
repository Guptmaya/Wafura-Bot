const Discord = require("discord.js")
const easyTriviaFile = require("../json/easy-trivia-qa.json")
const hardTriviaFile = require("../json/hard-trivia-qa.json")
const { Client } = require('unb-api')
const TriviaCount = require('../models/trivia');
const mongoose = require('mongoose');
const client = new Client('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBfaWQiOiI3NTkzODk2MDE0NjczMzQ3NTUiLCJpYXQiOjE2MDExMjI5ODl9.lh8iK89-qjtrMMiFK24ZcrB15Bkii88P6dtYBJFqqPQ');

module.exports = {
   name: 'quiz',
   desciption: 'quiz command',
   aliases: ['trivia'],
   validChannels: '【🤖】bot-commands',
   guildOnly: true,
   cooldown: 5,
   args: false,
   async execute(bot, message, args) {

      let Difficulty = args[0];
      let userID = message.author.id;
      let guildID = message.guild.id;
      let sIcon = message.author.displayAvatarURL();
      let professor = message.guild.channels.cache.find(x => x.id === "773534884077240330");


      if (!Difficulty) {
         //instructions
         let instructionsEmbed = new Discord.MessageEmbed()
            .setTitle("Money Heist Tiriva Instructions")
            .setColor("#FF0000")
            .setDescription("\*\*1.\*\* There will be 5 questions in trivia.\n" +
               "\*\*2.\*\* You can choose difficulty level of trivia. \`p!trivia easy\` OR \`p!trivia hard\`\n" +
               "\*\*3.\*\* For Hard Level - You have to write the answer yourself, no options or help will be given.\n" +
               "\*\*4.\*\* For Easy Level - Only react to correct option which you think is the answer, no need to write anything.\n" +
               "\*\*5.\*\* You have 10 seconds to react or write your answer.\n" +
               "\*\*6.\*\* Your first reaction/answer will be counted as final answer to that question.\n" +
               "\*\*7.\*\* In hard trivias, you have to write only first name of character.\n" +
               "\*\*8.\*\* Each question, answered correctly will give you 5 Denver Coins.\n" +
               "\*\*9.\*\* If you answer all questions correctly you will get 5 bonus Denver Coins for easy difficulty and 10 for hard.\n")
            .setFooter("Good luck");
         message.channel.send(instructionsEmbed);
      }
      else {
         function report(coinsGiven, difficulty) {
            let reportEmbed = new Discord.MessageEmbed()
               .setTitle("Balance Updated")
               .setThumbnail(sIcon)
               .setColor("#83F52C")
               .setDescription("**" + "User : " + "**" +
                  `<@${userID}>` +
                  "**" + "\nAmount : " + "**" +
                  `Cash: ` + "`" + `+${coinsGiven}` + "`" +
                  " | " + "Bank: " + "`" + `-0` + "`" +
                  "**" + "\nReason : " + "**" + `#Trivia #${difficulty}`)
               .setTimestamp(message.createdAt);
            professor.send(reportEmbed);
         }

         Difficulty = Difficulty.toLowerCase();
         //random number for answer
         function getRndInteger(mini, maxx) {
            return Math.floor(Math.random() * (maxx - mini + 1)) + mini;
         }



         let uName = message.author.tag;
         let tIcon = message.author.displayAvatarURL();
         const failEmbed = new Discord.MessageEmbed()
            .setAuthor(uName, `${tIcon}`)
            .setColor("#fefeff")
            .setDescription("🕵️ You failed to answer question in 10 seconds.\n\n Thanks for playing Money Heist Trivia.")



         //options - Easy/Hard      
         if (Difficulty === "easy") {
            let arr = [];
            let arr2 = [];
            while (arr.length < easyTriviaFile.easy_Level.question.length) {
               var r = Math.floor(Math.random() * easyTriviaFile.easy_Level.question.length) + 1;
               if (arr.indexOf(r) === -1) {
                  arr.push(r);
                  arr2.push(r - 1);
               }
            }
            var howManyTimes = 1;
            function easyTrivia() {

               console.log("entered loop");
               //for number(index) of question to fetch from json

               console.log(arr2[howManyTimes - 1]);
               let description = "";

               console.log("before another loop");
               var answerPosition = getRndInteger(1, 4);
               answerPosition = answerPosition - 1;

               let emoteID = '';
               switch (answerPosition) {
                  case 0:
                     emoteID = "632282435614277643";
                     break;

                  case 1:
                     emoteID = "632283171819618304";
                     break;

                  case 2:
                     emoteID = "632283190228287488";
                     break;

                  case 3:
                     emoteID = "688190533679579182";
                     break;
               }

               console.log("ap a - " + answerPosition);
               let emote = "";
               for (var i = 0; i < 4; i++) {
                  switch (i) {
                     case 0:
                        emote = "<:MH_Part1:632282435614277643>";
                        break;

                     case 1:
                        emote = "<:MH_Part2:632283171819618304>";
                        break;

                     case 2:
                        emote = "<:MH_Part3:632283190228287488>";
                        break;

                     case 3:
                        emote = "<:MH_Part4:688190533679579182>";
                        break;
                  }
                  if (i === answerPosition) {
                     description += `${emote}. ${easyTriviaFile.easy_Level.answers[arr2[howManyTimes - 1]]}\n`;
                     console.log("answer option created");
                  }
                  else {
                     description += `${emote}. ${easyTriviaFile.easy_Level.fake_answers[(arr2[howManyTimes - 1]) * 4 + i]}\n`;
                     console.log("fake answerscreated");
                  }
                  console.log("loop exited");
               }
               let title = `Que - ${howManyTimes}. ${easyTriviaFile.easy_Level.question[arr2[howManyTimes - 1]]}`;
               let questionEmbed = new Discord.MessageEmbed()
                  .setTitle(title)
                  .setAuthor(uName, `${tIcon}`)
                  .setColor("#FF0000")
                  .setDescription(description)
               message.channel.send(questionEmbed).then(embed => {
                  embed.react(message.guild.emojis.cache.get('632282435614277643'))
                     .then(reaction => reaction.message.react('632283171819618304'))
                     .then(reaction => reaction.message.react('632283190228287488'))
                     .then(reaction => reaction.message.react('688190533679579182'))
                     .catch(err => console.error);


                  //embed.awaitReactions((reaction, user) => user.id === message.author.id && (reaction.emoji.name === '<:MH_Part2:632283171819618304>'),
                  embed.awaitReactions((reaction, user) => user.id === message.author.id,
                     { max: 1, time: 10000 }).then(async collected => {
                        if (collected.first().emoji.id === emoteID) {
                           howManyTimes++;
                           var coinsGiven = 5;
                           client.editUserBalance(guildID, userID, { cash: coinsGiven }).then(report(coinsGiven, "easy"));
                           if (howManyTimes < 6) {
                              console.log(howManyTimes);
                              easyTrivia();
                           }
                           else {
                              let UserTriviaDetails = await TriviaCount.findOne({ userID: message.author.id, guildID: message.guild.id });
                              if (!UserTriviaDetails) {
                                 UserTriviaDetails = await new TriviaCount({
                                    _id: mongoose.Types.ObjectId(),
                                    userID: message.author.id,
                                    guildID: message.guild.id,
                                 });
                                 await UserTriviaDetails.save().catch(err => console.log(err));
                              }
                              await TriviaCount.findOneAndUpdate({ userID: message.author.id, guildID: message.guild.id }, { triviaPassed: UserTriviaDetails.triviaPassed + 1 });

                              client.editUserBalance(guildID, userID, { cash: coinsGiven }).then(report(coinsGiven, "easy-bonus"));
                              const usageEmbed = new Discord.MessageEmbed()
                                 .setAuthor(uName, `${tIcon}`)
                                 .setColor("#fefeff")
                                 .setDescription("<:MH_Dali:628873741178372096> You passed the Money Heist Trivia successfully.")
                              return message.channel.send(usageEmbed);
                           }

                        }
                        else {
                           let UserTriviaDetails = await TriviaCount.findOne({ userID: message.author.id, guildID: message.guild.id });
                           if (!UserTriviaDetails) {
                              UserTriviaDetails = await new TriviaCount({
                                 _id: mongoose.Types.ObjectId(),
                                 userID: message.author.id,
                                 guildID: message.guild.id,
                              });
                              await UserTriviaDetails.save().catch(err => console.log(err));
                           }
                           await TriviaCount.findOneAndUpdate({ userID: message.author.id, guildID: message.guild.id }, { triviaFailed: UserTriviaDetails.triviaFailed + 1 });

                           let uName = message.author.tag;
                           let tIcon = message.author.displayAvatarURL();
                           const usageEmbed = new Discord.MessageEmbed()
                              .setAuthor(uName, `${tIcon}`)
                              .setColor("#fefeff")
                              .setDescription("🕵️ Unfortunately your answer was \*\*wrong\*\*.\n\n Thanks for playing Money Heist Trivia.")
                           return message.channel.send(usageEmbed);
                        }
                     }).catch(err => {
                        if (err) { console.log(err); message.channel.send(failEmbed) }
                        ;
                     });
               })

               console.log("after embed");
            }
            easyTrivia();


         }
         else if (Difficulty === "hard") {
            let arr = [];
            let arr2 = [];
            while (arr.length < hardTriviaFile.question.length) {
               var r = Math.floor(Math.random() * hardTriviaFile.question.length) + 1;
               if (arr.indexOf(r) === -1) {
                  arr.push(r);
                  arr2.push(r - 1);
               }
            }
            const filter = m => m.author.id === message.author.id;
            let answer = args.slice(1).join(" ");
            answer = answer.toLowerCase();
            var howManyTimes = 1;
            function hardTrivia() {

               console.log(arr2[howManyTimes - 1]);
               let correctAnswer = hardTriviaFile.answers[arr2[howManyTimes - 1]];
               console.log(correctAnswer);
               let title = `Que - ${howManyTimes}. ${hardTriviaFile.question[arr2[howManyTimes - 1]]}`;
               console.log(title);
               let questionEmbed = new Discord.MessageEmbed()
                  .setTitle(title)
                  .setAuthor(uName, `${tIcon}`)
                  .setColor("#FF0000")
               message.channel.send(questionEmbed).then(() => {
                  message.channel.awaitMessages(filter, { max: 1, time: 10000, errors: ['time'] })
                     .then(async collected => {
                        let answer = collected.first().content;
                        answer = answer.toLowerCase();
                        if (answer === correctAnswer.toLowerCase()) {
                           howManyTimes++;
                           var coinsGiven = 5;
                           client.editUserBalance(guildID, userID, { cash: coinsGiven }).then(report(coinsGiven, "hard"));
                           if (howManyTimes < 6) {
                              console.log(howManyTimes);
                              hardTrivia();
                           }
                           else {
                              let UserTriviaDetails = await TriviaCount.findOne({ userID: message.author.id, guildID: message.guild.id });
                              if (!UserTriviaDetails) {
                                 UserTriviaDetails = await new TriviaCount({
                                    _id: mongoose.Types.ObjectId(),
                                    userID: message.author.id,
                                    guildID: message.guild.id,
                                 });
                                 await UserTriviaDetails.save().catch(err => console.log(err));
                              }
                              await TriviaCount.findOneAndUpdate({ userID: message.author.id, guildID: message.guild.id }, { triviaPassed: UserTriviaDetails.triviaPassed + 1 });

                              coinsGiven = 10;
                              client.editUserBalance(guildID, userID, { cash: coinsGiven }).then(report(coinsGiven, "hard-bonus"));
                              const usageEmbed = new Discord.MessageEmbed()
                                 .setAuthor(uName, `${tIcon}`)
                                 .setColor("#fefeff")
                                 .setDescription("<:MH_Dali:628873741178372096> You passed the Money Heist Trivia successfully.")
                              return message.channel.send(usageEmbed);
                           }
                        }
                        else {
                           let UserTriviaDetails = await TriviaCount.findOne({ userID: message.author.id, guildID: message.guild.id });
                              if (!UserTriviaDetails) {
                                 UserTriviaDetails = await new TriviaCount({
                                    _id: mongoose.Types.ObjectId(),
                                    userID: message.author.id,
                                    guildID: message.guild.id,
                                 });
                                 await UserTriviaDetails.save().catch(err => console.log(err));
                              }
                              await TriviaCount.findOneAndUpdate({ userID: message.author.id, guildID: message.guild.id }, { triviaFailed: UserTriviaDetails.triviaFailed + 1 });

                           let uName = message.author.tag;
                           let tIcon = message.author.displayAvatarURL();
                           const usageEmbed = new Discord.MessageEmbed()
                              .setAuthor(uName, `${tIcon}`)
                              .setColor("#fefeff")
                              .setDescription("🕵️ Unfortunately your answer was \*\*wrong\*\*.\n\n Thanks for playing Money Heist Trivia.")
                           return message.channel.send(usageEmbed);
                        }
                     })
                     .catch(collected => {
                        message.channel.send(failEmbed);
                     });
               });
            }
            hardTrivia();
         }
         else {
            return message.channel.send("There are only two levels of difficulty.\n▫️ Easy - \`p!trivia easy\`\n▫️ Hard - \`p!trivia hard\`");
         }
      }



   },
};