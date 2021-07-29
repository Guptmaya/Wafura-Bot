const Discord = require("discord.js")
module.exports ={
   name : 'ping',
   desciption : 'ping command',
   
   cooldown: 10,
   guildOnly:false,
   args: false,
   execute(bot,message, args){
      message.channel.send("Pinging...").then(m =>{
           var ping = m.createdTimestamp - message.createdTimestamp;

           var embed = new Discord.MessageEmbed()
           .setColor("#FF0000")
           .setAuthor(`Your ping is ${ping}`)

           m.edit(embed)
         });
      }
};