const Discord = require("discord.js")
const HeistCount = require('../models/Heist');
const mongoose = require('mongoose');
module.exports = {
  name: 'heist-tasks',
  desciption: 'hack test command',
  guildOnly: true,
  usage: '<no args>',
  validChannels: '【🤖】bot-commands',
  cooldown: 10,
  args: false,
  async execute(bot, message, args) {
    //869943036547854416 trailer

    let messge = `\*\*Heist Prep Tasks\*\*\n\n` +
      `🔸Scope the Bank - ✅\n`;
      
    let userIcon = message.author.displayAvatarURL();
    let userTag = message.author.tag;


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
    let prepGuns=UserHeistDetails.guns;
    let prepCars=UserHeistDetails.cars;
    let prephack=UserHeistDetails.hacking_device;
    let prepnece=UserHeistDetails.necessary_equip;
    let prepop=UserHeistDetails.optional_equip;
    let prepdriver=UserHeistDetails.driver;
    let prepgunman=UserHeistDetails.gunman;
    let prephacker=UserHeistDetails.hacker;
    if( (prepGuns=="Fake Weapons" ||prepGuns=="Weapons 1.0" ||prepGuns=="Weapons 2.0" ) &&  (prepCars=="Classic Cars" ||prepCars=="Sports Cars") &&  (prephack=="yes") ){
      messge+=`🔸Do three Prep Missions - ✅\n`;
    }
    else{
      messge+=`🔸Do three Prep Missions - ❎\n`;
    }
    if( prepnece=='yes'){
      messge+=`🔸Buy Necessary Equipments - ✅\n`;
    }
    else{
      messge+=`🔸Buy Necessary Equipments - ❎\n`;
    }
    
    if( prepop=='yes'){
      messge+=`🔸Buy Optional Equipments - ✅\n`;
    }
    else{
      messge+=`🔸Buy Optional Equipments - ❎\n`;
    }
    if(( prepdriver=='Driver 1') || ( prepdriver=='Driver 2') ){
      if(( prephacker=='Hacker 1') || ( prephacker=='Hacker 2') ){
        if(( prepgunman=='Gunman 1') || ( prepgunman=='Gunman 2') ){
      messge+=`🔸Recruit Crew - ✅\n`;}}
    }
    else{
      messge+=`🔸🔸Recruit Crew - ❎\n`;
    }

    function embedCreate(des) {
      let finalEmbed = new Discord.MessageEmbed()
        .setAuthor(userTag, `${userIcon}`)
        .setDescription(des)
      return finalEmbed;
    }
    await message.channel.send(embedCreate(messge));


  },
};