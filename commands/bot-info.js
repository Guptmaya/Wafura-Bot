const Discord = require("discord.js");
module.exports = {
   name: 'bot-info',
   desciption: 'Bot\'s Information',
   aliases: ['b-i'],
   validChannels: '【🤖】bot-commands',
   cooldown: 60,
   guildOnly: true,
   args: false,
   execute(bot, message, args) {

      botIcon = message.client.user.displayAvatarURL();
      
      let botembed = new Discord.MessageEmbed()
         .setTitle("Bot Information")
         .setColor("#FF0000")
         .setThumbnail(botIcon)
         .addField("Bot Name", bot.user.username)
         .addField("Created On", bot.user.createdAt)
         .addField("Created by", "<@!541467870819778562>" )
         .setFooter(`${message.guild.name} | ${message.guild.id}`);
      return message.channel.send(botembed);

   },
};