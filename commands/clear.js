const Discord = require("discord.js")
module.exports ={
   name : 'clear',
   desciption : 'clear the messages',
   aliases: ['clean'],
   guildOnly: true,
   usage: '<number of messages>',
   args: true,
   execute(bot,message, args){
      
      let clearMessageEmbed = new Discord.MessageEmbed()
      .setColor("#FF0000")
      .setDescription(`🕵️ ${args[0]} messages have been cleared.`)

      if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("oof You don't have permissions");
    message.channel.bulkDelete(args[0]).then(()=>{
        message.channel.send(clearMessageEmbed).then(msg => msg.delete({timeout:5000}));
    });
   },
};