const Discord = require("discord.js")
const HeistCount = require('../models/Heist');
const mongoose = require('mongoose');
module.exports = {
  name: 'start-heist',
  desciption: 'Starts the heist',
  guildOnly: true,
  usage: '<no args>',
  validChannels: '【🤖】bot-commands',
  cooldown: 10,
  args: false,
  async execute(bot, message, args) {

    message.channel.send("So you are the one who wanna rob the Bank of Spain.\nEven though I have retired but since you are tokyo's relative so I will help you.\n We will need a base of operations. Buy one and then call me.\np!call-professor.");
    
    let UserHeistDetails = await HeistCount.findOne({ userID: message.author.id, guildID: message.guild.id });
    if (!UserHeistDetails) {
      UserHeistDetails = await new HeistCount({
        _id: mongoose.Types.ObjectId(),
        userID: message.author.id,
        guildID: message.guild.id,
        lastEdited: Date.now(),
        guns: String,
        cars: String,
        hacking_device: String,
        necessary_equip: String,
        optional_equip: String,
        driver: String,
        gunman: String,
        hacker: String
      });
      await UserHeistDetails.save().catch(err => console.log(err));
    }    

  },
};