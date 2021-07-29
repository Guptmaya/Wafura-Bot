const Discord = require("discord.js")
const HeistCount = require('../models/Heist');
const mongoose = require('mongoose');
const { Client } = require('unb-api');
const client = new Client('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBfaWQiOiI3NTkzODk2MDE0NjczMzQ3NTUiLCJpYXQiOjE2MDExMjI5ODl9.lh8iK89-qjtrMMiFK24ZcrB15Bkii88P6dtYBJFqqPQ');
module.exports = {
  name: 'get-hacking-device',
  desciption: 'hack test command',
  guildOnly: true,
  usage: '<no args>',
  validChannels: '【🤖】bot-commands',
  cooldown: 10,
  args: false,
  async execute(bot, message, args) {

    const hasEveryRole = roles => {
      return roles.every(roleid => message.member.roles.cache.some(role => role.id === roleid))
    }
    if (   (hasEveryRole(["769937235368738826"]))  ) return message.channel.send('You have already got the hacking device dumbass.');


    //code starts here
    function getRndInteger(mini, maxx) {
      return Math.floor(Math.random() * (maxx - mini + 1)) + mini;
    }

    let userIcon = message.author.displayAvatarURL();
    let userTag = message.author.tag;

    //final message to show when guns are chosen
    function embedCreate() {
      let description = 'Hacking Device Acquired.';
      let finalEmbed = new Discord.MessageEmbed()
        .setAuthor(userTag, `${userIcon}`)
        .setDescription(description)
      return finalEmbed;
    }

    //either buy,steal or luck
    let OptionEmbed = new Discord.MessageEmbed()
      .setTitle("Prep Task - Get Hacking Device")
      .setAuthor(userTag, `${userIcon}`)
      .setDescription(`You have two options to get hacking device.\n🔸Buy\n🔸Luck.\n\n Buy it from black market or get it from auction.\n`)
      .setFooter('Simply write down your option.For Example - Buy')
    message.channel.send(OptionEmbed);
    const filter = m => m.author.id === message.author.id;


    //taking input from user for BUY STEAL OR LUCK
    message.channel.awaitMessages(filter, { max: 1, time: 60000 }).then(async collected => {
      let checkAnswer = collected.first().content;
      checkAnswer = checkAnswer.toLowerCase();
      //if user chose to buy them
      if (checkAnswer === "buy" || checkAnswer === "1") {

        var role;

        //getting his money
        const { total: totall } = await client.getUserBalance(message.guild.id, message.author.id);

        if (totall > 5000) {
          role = message.member.guild.roles.cache.find(role => role.id === "769937235368738826");
          message.member.roles.add(role);
          client.editUserBalance(message.guild.id, message.author.id, { bank: -5000 });
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
          await HeistCount.findOneAndUpdate({ userID: message.author.id, guildID: message.guild.id }, { hacking_device: 'yes', lastEdited: Date.now() });
          return message.channel.send(embedCreate());
        }
      }

      //if user chose to luck them out
      else if (checkAnswer === "luck" || checkAnswer === "2") {

        let luckPoints = getRndInteger(1, 20);

        if (hasEveryRole(["743070440586608690"])) { //boomer
          luckPoints += 100;
        } else if (hasEveryRole(["693211450843332643"])) { //server-booster
          luckPoints += 100;
        } else if (hasEveryRole(["780526004984348704"])) { //pro-hacker
          luckPoints += 40;
        } else if (hasEveryRole(["710967923920994397"])) { //hacker
          luckPoints += 25;
        } else if (hasEveryRole(["780526001327177778"])) { //pro-driver
          luckPoints += 20;
        } else if (hasEveryRole(["780526004660994120"])) { //driver
          luckPoints += 15;
        } else if (hasEveryRole(["713654463629623338"])) { //pro-gunman
          luckPoints += 10;
        } else if (hasEveryRole(["710968213634285568"])) { //gunman
          luckPoints += 5;
        } if (hasEveryRole(["869979279922954312"])) { //luck multiplier
          luckPoints += 20;
        }

        console.log(luckPoints);
         if (luckPoints >= 65) {
          role = message.member.guild.roles.cache.find(role => role.id === "769937235368738826");
          message.member.roles.add(role);
          role = message.member.guild.roles.cache.find(role => role.id === "869979279922954312");
          message.member.roles.remove(role);
          
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
          await HeistCount.findOneAndUpdate({ userID: message.author.id, guildID: message.guild.id }, { hacking_device: 'yes', lastEdited: Date.now() });
          return message.channel.send(embedCreate());
        }
        else
        {
          role = message.member.guild.roles.cache.find(role => role.id === "869979279922954312");
          message.member.roles.remove(role);
          return message.channel.send('Looks like you lost the bid. Better luck next time.');
        }
      }
      else { return message.channel.send('Hmm, I doubt if that was even an option. Try doing it again and read what I\'m telling you.'); }
    }).catch(err => {
      console.log(err);
    })


  },
};