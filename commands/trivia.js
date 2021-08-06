const Discord = require("discord.js")
const easyTriviaFile = require("../json/easy-trivia-qa.json")
const hardTriviaFile = require("../json/hard-trivia-qa.json")
const { Client } = require('unb-api')
const TriviaCount = require('../models/trivia');
const mongoose = require('mongoose');
const client = new Client('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBfaWQiOiI3NTkzODk2MDE0NjczMzQ3NTUiLCJpYXQiOjE2MDExMjI5ODl9.lh8iK89-qjtrMMiFK24ZcrB15Bkii88P6dtYBJFqqPQ');
const createReport = require('../functions/triviaReport')
module.exports = {
   name: 'trivia',
   desciption: 'quiz command',
   validChannels: '【🤖】bot-commands',
   guildOnly: true,
   usage: '[easy/hard]',
   cooldown: 5,
   args: true,
   async execute(bot, message, args) {

      let Difficulty = args[0];
      Difficulty = Difficulty.toLowerCase();

      let userID = message.author.id;
      let guildID = message.guild.id;
      let uName = message.author.tag;
      let tIcon = message.author.displayAvatarURL();

      //generate random number
      function getRndInteger(mini, maxx) {
         return Math.floor(Math.random() * (maxx - mini + 1)) + mini;
      }

      //coins
      var coinsGiven = 25;

      //timer countdown         
      var total_seconds = 3000;

      let readyEmbed = new Discord.MessageEmbed()
         .setAuthor(uName, tIcon)
         .setDescription(`▫️ There will be 5 questions.\n` +
            `▫️ For Easy Mode - \n> \`React your answer\`\n> DC given : \`25\`\n` +
            `▫️ For Hard Mode - \n> \`Write your answer\`\n> DC given : \`50\`\n\n` +
            `<a:loading:871449694490988595> Get Ready... \*\*${total_seconds / 1000}\*\*`)
         .setFooter('Good Luck')
      let firstMessage = await message.channel.send(readyEmbed);
      let myVar = setInterval(async function () {
         total_seconds = total_seconds - 1000;
         if (total_seconds !== 0) {
            let readyEmbed2 = new Discord.MessageEmbed()
               .setAuthor(uName, tIcon)
               .setDescription(`▫️ There will be 5 questions.\n` +
                  `▫️ For Easy Mode - \n> \`React your answer\`\n> DC given : \`25\`\n` +
                  `▫️ For Hard Mode - \n> \`Write your answer\`\n> DC given : \`50\`\n` +
                  `<a:loading:871449694490988595> Get Ready... \*\*${total_seconds / 1000}\*\*`)
               .setFooter('Good Luck')

            firstMessage.edit(readyEmbed2);
         }
         else {
            clearInterval(myVar);
         }
      }, 1000);



      //fail embed
      const failEmbed = new Discord.MessageEmbed()
         .setAuthor(uName, `${tIcon}`)
         .setColor("#fefeff")
         .setDescription("🕵️ You failed to answer question in 10 seconds.\n\n Thanks for playing Money Heist Trivia.")


      //easy mode
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

            //for index of question to fetch from json
            let description = "";

            //which random position answer will be displayed at
            var answerPosition = getRndInteger(1, 4) - 1;

            //emote id for answer
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

            //emote itself
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

            //create question/answer embed
            let title = `Que - ${howManyTimes}. ${easyTriviaFile.easy_Level.question[arr2[howManyTimes - 1]]}`;
            let questionEmbed = new Discord.MessageEmbed()
               .setTitle(title)
               .setAuthor(uName, `${tIcon}`)
               .setColor("#FF0000")
               .setDescription(description)
               .setFooter("You have 10 seconds to react.")
            firstMessage.edit(questionEmbed).then(embed => {
               embed.react(message.guild.emojis.cache.get('632282435614277643'))
                  .then(reaction => reaction.message.react('632283171819618304'))
                  .then(reaction => reaction.message.react('632283190228287488'))
                  .then(reaction => reaction.message.react('688190533679579182'))
                  .catch(err => console.error);


               //check reactions
               embed.awaitReactions((reaction, user) => user.id === message.author.id,
                  { max: 1, time: 10000 }).then(async collected => {
                     if (collected.first().emoji.id === emoteID) {
                        //remove previous reactions
                        firstMessage.reactions.removeAll();

                        //increment questions asked
                        howManyTimes++;

                        if (howManyTimes < 6) {
                           //keep looping untill 5 questions havent been asked
                           easyTrivia();
                        }
                        else {
                           //remove previous reactions
                           firstMessage.reactions.removeAll();
                           //add +1 to trivia passed in database
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

                           //add coins to balance
                           client.editUserBalance(guildID, userID, { cash: coinsGiven }).then(createReport.report(message, coinsGiven, "#Trivia #Easy"));

                           //last successful embed
                           let usageEmbed = new Discord.MessageEmbed()
                              .setAuthor(uName, `${tIcon}`)
                              .setColor("#fefeff")
                              .setThumbnail(message.author.displayAvatarURL({ size: 64 }))
                              .setDescription("<:MH_Dali:628873741178372096> You passed the Money Heist Trivia.\n" +
                                 `DC Earned : ${coinsGiven}`)
                           return firstMessage.edit(usageEmbed);
                        }

                     }
                     else {
                        //remove previous reactions
                        firstMessage.reactions.removeAll();
                        //add +1 to trivia failed
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

                        //failed embed
                        let usageEmbed = new Discord.MessageEmbed()
                           .setAuthor(uName, `${tIcon}`)
                           .setColor("#fefeff")
                           .setDescription("🕵️ Unfortunately your answer was \*\*wrong\*\*.\n\n Thanks for playing Money Heist Trivia.")
                        return firstMessage.edit(usageEmbed);
                     }
                  }).catch(err => {
                     firstMessage.reactions.removeAll();
                     if (err) { console.log(err); firstMessage.edit(failEmbed) }
                     ;
                  });
            })

         }
         setTimeout(function () {
            easyTrivia();
         }, 4000);



      }

      //hard mode
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

         //main function
         function hardTrivia() {

            let correctAnswer = hardTriviaFile.answers[arr2[howManyTimes - 1]];
            let title = `Que - ${howManyTimes}. ${hardTriviaFile.question[arr2[howManyTimes - 1]]}`;
            console.log(correctAnswer);
            let questionEmbed = new Discord.MessageEmbed()
               .setTitle(title)
               .setAuthor(uName, `${tIcon}`)
               .setColor("#FF0000")
               .setFooter("You have 10 seconds to write your answer.")
            firstMessage.edit(questionEmbed).then(() => {
               message.channel.awaitMessages(filter, { max: 1, time: 10000, errors: ['time'] })
                  .then(async collected => {
                     let answer = collected.first().content;
                     answer = answer.toLowerCase();

                     if (answer === correctAnswer.toLowerCase()) {
                        howManyTimes++;

                        if (howManyTimes < 6) {
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

                           coinsGiven *= 2;
                           client.editUserBalance(guildID, userID, { cash: coinsGiven }).then(createReport.report(message, coinsGiven, "#Trivia #Hard"));
                           const usageEmbed = new Discord.MessageEmbed()
                              .setAuthor(uName, `${tIcon}`)
                              .setColor("#fefeff")
                              .setThumbnail(message.author.displayAvatarURL({ size: 64 }))
                              .setDescription("<:MH_Dali:628873741178372096> You passed the Money Heist Trivia.\n" +
                                 `DC Earned : ${coinsGiven}`)
                           return firstMessage.edit(usageEmbed);
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
                        return firstMessage.edit(usageEmbed);
                     }
                  })
                  .catch(collected => {
                     firstMessage.edit(failEmbed);
                  });
            });
         }
         setTimeout(function () {
            hardTrivia();
         }, 4000)

      }
   },
};