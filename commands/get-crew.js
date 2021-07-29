const Discord = require("discord.js")
const HeistCount = require('../models/Heist');
const mongoose = require('mongoose');
module.exports = {
   name: 'get-crew',
   description: 'Choose Options',
   guildOnly: true,
   validChannels: '【🤖】bot-commands',
   args: false,
   async execute(bot, message, args) {

      let userIcon = message.author.displayAvatarURL();
      let userTag = message.author.tag;

      let guildID = message.guild.id;
      let guild = bot.guilds.cache.get(guildID);
      

      //functions
      function addRole(roleName) {
         const role = guild.roles.cache.find(role => role.name === roleName);
         message.member.roles.add(role);
      }

      const hasEveryRole = roles => {
         return roles.every(roleName => message.member.roles.cache.some(role => role.name === roleName))
      }

      function embedCreate(des) {
         let description = 'Crew Recruited - ' + '\*\*' + des + '\*\*';
         let finalEmbed = new Discord.MessageEmbed()
            .setAuthor(userTag, `${userIcon}`)
            .setDescription(description)
         return finalEmbed;
      }

      //filter
      const filter = m => m.author.id === message.author.id;

      //option 
      let option = args[0];
      
      //if option is driver
      if (option === 'driver') {
         if ((hasEveryRole(["Driver 1"])) || (hasEveryRole(["Driver 2"]))) return message.reply("You have already chose a driver.");

         let buyEmbed = new Discord.MessageEmbed()
            .setTitle("Task - Get Driver")
            .setAuthor(userTag, `${userIcon}`)
            .setDescription(`You got two options.\n\n🔹Driver 1 - Getaway Vehicles - Cars - Cut(5% DC).\n🔹Driver 2 - Getaway Vehicles - Customized Cars - Cut(7% DC).\n\n Well better the vehicles, faster we disappear.\n`)
            .setFooter('Simply write down your option.For Example - 1')
         message.channel.send(buyEmbed);

         message.channel.awaitMessages(filter, { max: 1, time: 60000 }).then(async collected => {

            let optionChoosen = collected.first().content;
            let lowered = optionChoosen.toLowerCase();

            if (lowered === '1') {
               addRole('Driver 1');
               let UserHeistDetails = await HeistCount.findOne({ userID: message.author.id, guildID: message.guild.id });
               if (!UserHeistDetails) {
                  UserHeistDetails = await new HeistCount({
                     _id: mongoose.Types.ObjectId(),
                     userID: message.author.id,
                     guildID: message.guild.id,
                     lastEdited: Date.now()
                  });
                  await UserHeistDetails.save().catch(err => console.log(err));
               }
               await HeistCount.findOneAndUpdate({ userID: message.author.id, guildID: message.guild.id }, { driver: 'Driver 1', lastEdited: Date.now() });
               message.channel.send(embedCreate('Driver 1'));
            }
            else if (lowered === '2') {
               addRole('Driver 2');
               let UserHeistDetails = await HeistCount.findOne({ userID: message.author.id, guildID: message.guild.id });
               if (!UserHeistDetails) {
                  UserHeistDetails = await new HeistCount({
                     _id: mongoose.Types.ObjectId(),
                     userID: message.author.id,
                     guildID: message.guild.id,
                     lastEdited: Date.now()
                  });
                  await UserHeistDetails.save().catch(err => console.log(err));
               }
               await HeistCount.findOneAndUpdate({ userID: message.author.id, guildID: message.guild.id }, { driver: 'Driver 2', lastEdited: Date.now() });

               message.channel.send(embedCreate('Driver 2'));
            }
            else {
               return message.channel.send('Invalid Option.');
            }
         }).catch(err => {
            message.channel.send("You ran out of time.");
            console.log(err);
         })
      } else if (option === "gunman") {
         if ((hasEveryRole(["Gunman 1"])) || (hasEveryRole(["Gunman 2"]))) return message.reply("You have already chose a gunman.");

         let buyEmbed = new Discord.MessageEmbed()
            .setTitle("Task - Get Gunman")
            .setAuthor(userTag, `${userIcon}`)
            .setDescription(`You got two options.\n\n🔹Gunman 1 - Experience - Newbie - Cut(3% DC).\n🔹Gunman 2 - Experience - Completed Several Heists - Cut(7% DC).\n\n We will need Gunman with good weapons if things will get aggressive in there.\n`)
            .setFooter('Simply write down your option.For Example - 1')
         message.channel.send(buyEmbed);

         message.channel.awaitMessages(filter, { max: 1, time: 60000 }).then(async collected => {

            let optionChoosen = collected.first().content;
            let lowered = optionChoosen.toLowerCase();

            if (lowered === '1') {
               addRole('Gunman 1');
               let UserHeistDetails = await HeistCount.findOne({ userID: message.author.id, guildID: message.guild.id });
               if (!UserHeistDetails) {
                  UserHeistDetails = await new HeistCount({
                     _id: mongoose.Types.ObjectId(),
                     userID: message.author.id,
                     guildID: message.guild.id,
                     lastEdited: Date.now()
                  });
                  await UserHeistDetails.save().catch(err => console.log(err));
               }
               await HeistCount.findOneAndUpdate({ userID: message.author.id, guildID: message.guild.id }, { gunman: 'Gunman 1', lastEdited: Date.now() });
               message.channel.send(embedCreate('Gunman 1'));
            }
            else if (lowered === '2') {
               addRole('Gunman 2');
               let UserHeistDetails = await HeistCount.findOne({ userID: message.author.id, guildID: message.guild.id });
               if (!UserHeistDetails) {
                  UserHeistDetails = await new HeistCount({
                     _id: mongoose.Types.ObjectId(),
                     userID: message.author.id,
                     guildID: message.guild.id,
                     lastEdited: Date.now()
                  });
                  await UserHeistDetails.save().catch(err => console.log(err));
               }
               await HeistCount.findOneAndUpdate({ userID: message.author.id, guildID: message.guild.id }, { gunman: 'Gunman 2', lastEdited: Date.now() });

               message.channel.send(embedCreate('Gunman 2'));
            }
            else {
               return message.channel.send('Invalid Option.');
            }
         }).catch(err => {
            message.channel.send("You ran out of time.");
            console.log(err);
         })
      } else if (option === "hacker") {
         if ((hasEveryRole(["Hacker 1"])) || (hasEveryRole(["Hacker 2"]))) return message.reply("You have already chose a hacker.");

         let buyEmbed = new Discord.MessageEmbed()
            .setTitle("Task - Get Hacker")
            .setAuthor(userTag, `${userIcon}`)
            .setDescription(`You got two options.\n\n🔹Hacker 1 - Experience - Newbie - Cut(5% DC).\n🔹Hacker 2 - Experience - Rio's Pupil - Cut(7% DC).\n\n Better Hacker will give us more time in vault.\n`)
            .setFooter('Simply write down your option.For Example - 1')
         message.channel.send(buyEmbed);

         message.channel.awaitMessages(filter, { max: 1, time: 60000 }).then(async collected => {

            let optionChoosen = collected.first().content;
            let lowered = optionChoosen.toLowerCase();

            if (lowered === '1') {
               addRole('Hacker 1');
               let UserHeistDetails = await HeistCount.findOne({ userID: message.author.id, guildID: message.guild.id });
               if (!UserHeistDetails) {
                  UserHeistDetails = await new HeistCount({
                     _id: mongoose.Types.ObjectId(),
                     userID: message.author.id,
                     guildID: message.guild.id,
                     lastEdited: Date.now()
                  });
                  await UserHeistDetails.save().catch(err => console.log(err));
               }
               await HeistCount.findOneAndUpdate({ userID: message.author.id, guildID: message.guild.id }, { hacker: 'Hacker 1', lastEdited: Date.now() });
               message.channel.send(embedCreate('Hacker 1'));
            }
            else if (lowered === '2') {
               addRole('Hacker 2');
               let UserHeistDetails = await HeistCount.findOne({ userID: message.author.id, guildID: message.guild.id });
               if (!UserHeistDetails) {
                  UserHeistDetails = await new HeistCount({
                     _id: mongoose.Types.ObjectId(),
                     userID: message.author.id,
                     guildID: message.guild.id,
                     lastEdited: Date.now()
                  });
                  await UserHeistDetails.save().catch(err => console.log(err));
               }
               await HeistCount.findOneAndUpdate({ userID: message.author.id, guildID: message.guild.id }, { hacker: 'Hacker 2', lastEdited: Date.now() });

               message.channel.send(embedCreate('Hacker 2'));
            }
            else {
               return message.channel.send('Invalid Option.');
            }
         }).catch(err => {
            message.channel.send("You ran out of time.");
            console.log(err);
         })
      } else {
         let defaultEmbed = new Discord.MessageEmbed()
            .setAuthor(userTag, `${userIcon}`)
            .setDescription(
               "p!get-crew driver\n" +
               "p!get-crew gunman\n" +
               "p!get-crew hacker\n")
            .setFooter("Please run these commands to get yourself a crew for heist.")
         message.channel.send(defaultEmbed);
      }




   },
};