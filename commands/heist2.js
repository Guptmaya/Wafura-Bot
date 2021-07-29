const Discord = require("discord.js")
const HackCount = require('../models/WorkCount');
const mongoose = require('mongoose');
module.exports = {
  name: 'call-professor',
  desciption: 'Calls the professor',
  guildOnly: true,
  usage: '<no args>',
  validChannels: '【🤖】bot-commands',
  cooldown: 10,
  args: false,
  async execute(bot, message, args) {
    
    if (message.member.roles.cache.has('869943036547854416')) {
      message.channel.send("Alright now that you have a mobile Operational base, let's get to work.");
    }
    else if (message.member.roles.cache.has('869944896864268369')) {
      message.channel.send("\nOh this base is closer to heist spot.Getting out of Bank will be easy later, let's get to work.");
    }
    else {
      return message.channel.send("Didn't I told you to get a base of operations first.");
    }

    setTimeout(async function () {
      message.channel.send(`There are going to be three parts to our heist. \n\*\*Scoping, Prepping and the Score.\*\*\n I have already scoped the Bank so that part is done. \nNow you have to gather equipments and prepare rest of necessary things for heist.\nI am sending you the list of equipments and necessary/optional prep missions.`)
    }, 4000)

    let messge=  `\*\*Tasks\*\*\n\n`+
    `🔸Scope the Bank - ✅\n`+
    `🔸Recruit Crew - ❎\n`+
    `🔸Do three Prep Missions - ❎\n`+
    `🔸Buy Necessary Equipments - ❎\n`+
    `🔸Buy Optional Equipments - ❎\n`;
    //rifle loadout, shotgun loadout
    setTimeout(async function () {
      message.author.send(messge)
    }, 8000)
  },
};