const Discord = require("discord.js")
module.exports = {
   name: 'lock',
   desciption: 'lock command',
   guildOnly: true,
   usage: '<on/off>',
   cooldown: 10,
   args: true,
   execute(bot, message, args) {

      if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("oof You don't have permissions");
      const channels = message.guild.channels.cache.filter(ch => ch.type !== 'category');
      if (args[0] === 'on') {
         channels.forEach(channel => {
            channel.updateOverwrite(message.guild.roles.everyone, {
               SEND_MESSAGES: false
            }).then(() => {
               channel.setName(channel.name += `🔒`)
            })
         })
         return message.channel.send('locked all channels');
      } else if (args[0] === 'off') {
         channels.forEach(channel => {
            channel.updateOverwrite(message.guild.roles.everyone, {
               SEND_MESSAGES: true
            }).then(() => {
               channel.setName(channel.name.replace('🔒', ''))
            }
            )
         })
         let firstchannel = message.guild.channels.cache.find(x => x.name === "【❓】server-info");
         let secondchannel = message.guild.channels.cache.find(x => x.name === "【🔨】role-setup");
         let thirdchannel = message.guild.channels.cache.find(x => x.name === "【💬】updates");
         let fourthchannel = message.guild.channels.cache.find(x => x.name === "【📢】announcements");
         let fifthchannel = message.guild.channels.cache.find(x => x.name === "【📺】mh-edits");
         let sixthchannel = message.guild.channels.cache.find(x => x.name === "【📝】suggestions");

         console.log(firstchannel);
         if (firstchannel && secondchannel && thirdchannel && fourthchannel && fifthchannel && sixthchannel) {
            firstchannel.updateOverwrite(message.guild.roles.everyone, {
               SEND_MESSAGES: false
            })
            secondchannel.updateOverwrite(message.guild.roles.everyone, {
               SEND_MESSAGES: false
            })
            thirdchannel.updateOverwrite(message.guild.roles.everyone, {
               SEND_MESSAGES: false
            })
            fourthchannel.updateOverwrite(message.guild.roles.everyone, {
               SEND_MESSAGES: false
            })
            fifthchannel.updateOverwrite(message.guild.roles.everyone, {
               SEND_MESSAGES: false
            })
            sixthchannel.updateOverwrite(message.guild.roles.everyone, {
               SEND_MESSAGES: false
            })
         }
         message.channel.send('unlocked all channels');
      }
   },
};