const Discord = require("discord.js");
module.exports = {
  name: 'roles-reaction',
  desciption: 'hello command',
  guildOnly: true,
  //validChannels: '【📢】announcements',
  usage: '<no args>',
  //cooldown: 10,
  args: false,
  async execute(bot, message, args) {
    


    if(args[0]=="1"){
      //let messageRetrived = await message.channel.messages.fetch("788441228550340618");
      /*setTimeout(function () {
        let channelsEmbed = new Discord.MessageEmbed()
          .setColor("#FF0000")
          .attachFiles([`./images/parts.png`])
          .setImage(`attachment://parts.png`)
        message.channel.send(channelsEmbed);
      }, 1000)*/
  
      setTimeout(function () {
        let questionEmbed = new Discord.MessageEmbed()
          .setTitle("Spoiler/Non-Spoilers Role")
          .setColor("#FF0000")
          .setDescription(`These roles will open <#688185706870341651>,<#632271811937173510>.\n\n \*\*React to give yourself a role.\*\*\n\n` +
            "<:MH_Part1:632282435614277643>. No-Spoilers\n\n" +
            "<:MH_Part4:688190533679579182>. Spoilers\n\n")
          .setFooter("Reacting will give you role, Unreacting will remove your role.")
          message.channel.send(questionEmbed).then(embed => {
          embed.react(message.guild.emojis.cache.get('632282435614277643'))
            .then(reaction => reaction.message.react('688190533679579182'))
            .catch(err => console.error);
        })
      }, 3000)
  
    }
  else  if(args[0]=="2"){
    console.log("logged");
    
    setTimeout(function () {
      let questionEmbed = new Discord.MessageEmbed()
        .setTitle("Pings Role")
        .setColor("#FF0000")
        .setDescription("These roles will be pinged occasionally when there is an update related to them in server.\n\n \*\*React to give yourself a role.\*\*\n\n" +
          "<:MH_origami:689280975955427373>. Events\n\n" +
          "🎮. Games\n\n" +
          "🤖. Bot Update\n\n"+
          "🏛️. Minecraft Updates\n\n")
        .setFooter("Reacting will give you role, Unreacting will remove your role.")
        message.channel.send(questionEmbed).then(embed => {
        embed.react(message.guild.emojis.cache.get('689280975955427373'))
          .then(reaction => reaction.message.react('🎮'))
          .then(reaction => reaction.message.react('🤖'))
          .then(reaction => reaction.message.react('🏛️'))
          .catch(err => console.error);
      })
    }, 1000)

  }
  message.delete({timeout:1000});
  },
}; 