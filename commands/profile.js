const Discord = require("discord.js")
const UserWorkCount = require('../models/WorkCount');
const TriviaCount = require('../models/trivia');
const mongoose = require('mongoose');
const { Client } = require('unb-api');
const client = new Client('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBfaWQiOiI3NTkzODk2MDE0NjczMzQ3NTUiLCJpYXQiOjE2MDExMjI5ODl9.lh8iK89-qjtrMMiFK24ZcrB15Bkii88P6dtYBJFqqPQ');
module.exports = {
   name: 'profile',
   desciption: 'profile of user',
   guildOnly: false,
   validChannels: '【🤖】bot-commands',
   usage: '<no args>',
   args: false,
   async execute(bot, message, args) {

      let searchUser = message.guild.member(message.mentions.users.first());
      if (!searchUser) return message.channel.send("Please mention the user.");
      if (searchUser) {
         let searchUserid = searchUser.id;
         let userId = searchUserid;
         let searchUser_user = message.mentions.members.first().user;
         let userIcon = searchUser_user.displayAvatarURL({ dynamic: true });
         console.log(searchUser);
         let userTag = searchUser.user.tag;

         const { total: totall } = await client.getUserBalance(message.guild.id, userId);

         let UserProfile = await UserWorkCount.findOne({ userID: userId, guildID: message.guild.id });
         let UserTriviaProfile = await TriviaCount.findOne({ userID: userId, guildID: message.guild.id });
         if (!UserProfile) {
            UserProfile = await new UserWorkCount({
               _id: mongoose.Types.ObjectId(),
               userID: userId,
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

         let profileEmbed = new Discord.MessageEmbed()
            .setColor("#FF0000")
            .setThumbnail(userIcon)
            .setDescription(`<@${userId}>\n\n` +
               `\*\*Denver Coins :\*\*  ${totall}\n\n` +
               `\*\*Trivia :\*\*  ${UserTriviaProfile.triviaFailed}/${UserTriviaProfile.triviaPassed}\n` +
               `\*\*Hacks :\*\*  ${UserProfile.failedHackCount}/${UserProfile.successfulHackCount}\n` +
               `\*\*Drive :\*\*  ${UserProfile.failedDriveCount}/${UserProfile.successfulDriveCount}\n` +
               `\*\*Gun :\*\*  ${UserProfile.failedGunCount}/${UserProfile.successfulGunCount}\n` +
               `\*\*Heists :\*\*  ${UserProfile.failedHeistsCount }/${UserProfile.successfulHeistsCount}\n`
               )
               .setFooter('Fail/Success')
         await message.channel.send(profileEmbed);
      }
      else {
         return message.channel.send("User Not Found.");
      }
   },
};