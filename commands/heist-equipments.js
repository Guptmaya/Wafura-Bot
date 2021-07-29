const Discord = require("discord.js")
const HeistCount = require('../models/Heist');
const mongoose = require('mongoose');
const { Client } = require('unb-api');
const client = new Client('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBfaWQiOiI3NTkzODk2MDE0NjczMzQ3NTUiLCJpYXQiOjE2MDExMjI5ODl9.lh8iK89-qjtrMMiFK24ZcrB15Bkii88P6dtYBJFqqPQ');
module.exports = {
  name: 'heist-equipment',
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
    if ((hasEveryRole(["769937231967420427"]))) return message.channel.send('You have already got Necessary Equipment dumbass.');

    const filter = m => m.author.id === message.author.id;
    //code starts here
    function getRndInteger(mini, maxx) {
      return Math.floor(Math.random() * (maxx - mini + 1)) + mini;
    }

    let userIcon = message.author.displayAvatarURL();
    let userTag = message.author.tag;

    //final message to show when guns are chosen
    function embedCreate() {
      let description = 'Necessary Equipment Acquired.';
      let finalEmbed = new Discord.MessageEmbed()
        .setAuthor(userTag, `${userIcon}`)
        .setDescription(description)
      return finalEmbed;
    }
    function embedCreate2() {
      let description = 'Optional Equipment Acquired.';
      let finalEmbed = new Discord.MessageEmbed()
        .setAuthor(userTag, `${userIcon}`)
        .setDescription(description)
      return finalEmbed;
    }


    let OptionEmbed = new Discord.MessageEmbed()
      .setTitle("Prep Task - Get Necessary/Optional Equipment")
      .setAuthor(userTag, `${userIcon}`)
      .setDescription(`You have three options.\n\n🔸\*\*Get Necessary Equipment - \*\*Includes Maintenance Wear, Metal Cutting Lasers,City Maps.You must get them for heist.\n🔸\*\*Get Optional Equipment -\*\* Explosives,Blind Folds,Wires,Digging Tools,Vault Keycards.It's upto you whether you wanna get them or not.They might help in some situations, you never know.\n🔸\*\*Get Both Equipment - \*\*I know a guy who can get you both Necessary and Optional Equipment on discount.`)
      .setFooter('Simply write down your option.For Example - 1')
    message.channel.send(OptionEmbed);


    message.channel.awaitMessages(filter, { max: 1, time: 60000 }).then(async collected => {
      let checkAnswer0 = collected.first().content;
      checkAnswer0 = checkAnswer0.toLowerCase();
      if (checkAnswer0 === "1") {
        let OptionEmbed1 = new Discord.MessageEmbed()
          .setTitle("Prep Task - Get Necessary Equipment")
          .setAuthor(userTag, `${userIcon}`)
          .setDescription(`You have two options.\n\n🔸Buy\n🔸Luck`)
          .setFooter('Simply write down your option.For Example - Buy')
        message.channel.send(OptionEmbed1);
        message.channel.awaitMessages(filter, { max: 1, time: 60000 }).then(async collected => {
          let checkAnswer = collected.first().content;
          checkAnswer = checkAnswer.toLowerCase();
          //if user chose to buy them
          if (checkAnswer === "buy" || checkAnswer === "1") {

            var role;

            //getting his money
            const { total: totall } = await client.getUserBalance(message.guild.id, message.author.id);

            if (totall > 15000) {
              role = message.member.guild.roles.cache.find(role => role.id === "769937231967420427");
              message.member.roles.add(role);
              client.editUserBalance(message.guild.id, message.author.id, { bank: -15000 });
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
              await HeistCount.findOneAndUpdate({ userID: message.author.id, guildID: message.guild.id }, { necessary_equip: 'yes', lastEdited: Date.now() });
              return message.channel.send(embedCreate());
            }
            else {
              return message.channel.send('You do not have enough money.');
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
            } if (hasEveryRole(["769937234026692648"])) { //luck multiplier
              luckPoints += 60;
            }

            console.log(luckPoints);

            if (luckPoints >= 85) {
              role = message.member.guild.roles.cache.find(role => role.id === "769937231967420427");
              message.member.roles.add(role);

              role = message.member.guild.roles.cache.find(role => role.id === "869979279922954312");
              message.member.roles.remove(role);

              role = message.member.guild.roles.cache.find(role => role.id === "769937234026692648");
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
              await HeistCount.findOneAndUpdate({ userID: message.author.id, guildID: message.guild.id }, { necessary_equip: 'yes', lastEdited: Date.now() });
              return message.channel.send(embedCreate());
            }
            else {
              role = message.member.guild.roles.cache.find(role => role.id === "869979279922954312");
              message.member.roles.remove(role);

              role = message.member.guild.roles.cache.find(role => role.id === "769937234026692648");
              message.member.roles.remove(role);
              return message.channel.send('Looks like you lost the bid. Better luck next time.');
            }
          }
          else { return message.channel.send('Hmm, I doubt if that was even an option. Try doing it again and read what I\'m telling you.'); }
        }).catch(err => {
          console.log(err);
        })

      }
      else if (checkAnswer0 === "2") {
        let OptionEmbed1 = new Discord.MessageEmbed()
          .setTitle("Prep Task - Get Optional Equipment")
          .setAuthor(userTag, `${userIcon}`)
          .setDescription(`You have two options.\n\n🔸Buy\n🔸Luck`)
          .setFooter('Simply write down your option.For Example - Buy')
        message.channel.send(OptionEmbed1);
        message.channel.awaitMessages(filter, { max: 1, time: 60000 }).then(async collected => {
          let checkAnswer = collected.first().content;
          checkAnswer = checkAnswer.toLowerCase();
          //if user chose to buy them
          if (checkAnswer === "buy" || checkAnswer === "1") {

            var role;

            //getting his money
            const { total: totall } = await client.getUserBalance(message.guild.id, message.author.id);

            if (totall > 7500) {
              role = message.member.guild.roles.cache.find(role => role.id === "769937231976464395");
              message.member.roles.add(role);
              client.editUserBalance(message.guild.id, message.author.id, { bank: -7500 });
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
              await HeistCount.findOneAndUpdate({ userID: message.author.id, guildID: message.guild.id }, { optional_equip: 'yes', lastEdited: Date.now() });
              return message.channel.send(embedCreate2());
            }
            else {
              return message.channel.send('You do not have enough money.');
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
            } if (hasEveryRole(["769937234026692648"])) { //luck multiplier
              luckPoints += 60;
            }

            console.log(luckPoints);

            if (luckPoints >= 85) {
              role = message.member.guild.roles.cache.find(role => role.id === "769937231976464395");
              message.member.roles.add(role);

              role = message.member.guild.roles.cache.find(role => role.id === "869979279922954312");
              message.member.roles.remove(role);

              role = message.member.guild.roles.cache.find(role => role.id === "769937234026692648");
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
              await HeistCount.findOneAndUpdate({ userID: message.author.id, guildID: message.guild.id }, { optional_equip: 'yes', lastEdited: Date.now() });
              return message.channel.send(embedCreate());
            }
            else {
              role = message.member.guild.roles.cache.find(role => role.id === "869979279922954312");
              message.member.roles.remove(role);

              role = message.member.guild.roles.cache.find(role => role.id === "769937234026692648");
              message.member.roles.remove(role);
              return message.channel.send('Looks like you lost the bid. Better luck next time.');
            }
          }
          else { return message.channel.send('Hmm, I doubt if that was even an option. Try doing it again and read what I\'m telling you.'); }
        }).catch(err => {
          console.log(err);
        })

      }
      else if (checkAnswer0 === "3") {
        let OptionEmbed1 = new Discord.MessageEmbed()
          .setTitle("Prep Task - Get Necessary & Optional Equipment")
          .setAuthor(userTag, `${userIcon}`)
          .setDescription(`You have only one option.\n\n🔸Buy`)
          .setFooter('Simply write down your option.For Example - Buy')
        message.channel.send(OptionEmbed1);
        message.channel.awaitMessages(filter, { max: 1, time: 60000 }).then(async collected => {
          let checkAnswer = collected.first().content;
          checkAnswer = checkAnswer.toLowerCase();
          //if user chose to buy them
          if (checkAnswer === "buy" || checkAnswer === "1") {

            var role;

            //getting his money
            const { total: totall } = await client.getUserBalance(message.guild.id, message.author.id);

            let discount = getRndInteger(1, 30);
            console.log(discount);
            let discountedMoney = 22500;
            discountedMoney -= ((discountedMoney * discount) / 100);
            console.log(discountedMoney);
            if (totall > discountedMoney) {
              role = message.member.guild.roles.cache.find(role => role.id === "769937231976464395");
              message.member.roles.add(role);
              role = message.member.guild.roles.cache.find(role => role.id === "769937231967420427");
              message.member.roles.add(role);
              client.editUserBalance(message.guild.id, message.author.id, { bank: -discountedMoney });
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
              await HeistCount.findOneAndUpdate({ userID: message.author.id, guildID: message.guild.id }, { necessary_equip: 'yes', optional_equip: 'yes', lastEdited: Date.now() });
               message.channel.send(embedCreate());
              return message.channel.send(embedCreate2());
            }
            else {
              return message.channel.send('You do not have enough money.');
            }
          }

          else { return message.channel.send('Hmm, I doubt if that was even an option. Try doing it again and read what I\'m telling you.'); }
        }).catch(err => {
          console.log(err);
        })

      }
    }).catch(err => {
      console.log(err);
    })




  },
};