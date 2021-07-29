const Discord = require("discord.js");
module.exports = {
   name: 'server-info',
   desciption: 'Server\'s Information',
   aliases: ['s-i'],
   validChannels: '【🤖】bot-commands',
   cooldown: 5,
   guildOnly: true,
   args: false,
   execute(bot, message, args) {
      

      const guild = bot.guilds.cache.get(`628512144454975489`);
      
      let roleCount = message.guild.roles.cache.size;
      let emojiCount = message.guild.emojis.cache.size;
      let totalMember = guild.members.cache.size;
      let botCounts = guild.members.cache.filter(member => member.user.bot).size;
      let memberCounts = totalMember - botCounts;
      let onlineCount = (message.guild.members.cache.filter(member => member.presence.status !== "offline").size) - 9;
      var textChannel = message.guild.channels.cache.filter((c) => c.type === "text").size;
      var voiceChannel = message.guild.channels.cache.filter((c) => c.type === "voice").size;
      let totalChannel = textChannel + voiceChannel;
      let boostCount = message.guild.premiumSubscriptionCount;
      let boostLevel = message.guild.premiumTier;
      let ownerID = guild.ownerID;
   
      console.log(memberCounts);
      let serverEmbed = new Discord.MessageEmbed()
         .setTitle("Server Information")
         .setColor("#FF0000")
         .setThumbnail(message.guild.iconURL())
         .addFields(
            { name: `“Weakness is not in us, it is what we have outside.”`, value: '\u200B' },
            { name: "Owner ", value: `<@!${ownerID}>`, inline: true },
            //{ name: '\u200B', value: '\u200B', inline: true  },
            { name: 'Server Created', value: 'Tue Oct 01 2019', inline: true },
            { name: 'Nitro Boosts', value: `${boostCount} (Level ${boostLevel})` },
            { name: '\u200B', value: '\u200B', inline: true },
            { name: 'Roles', value: `${roleCount}`, inline: true },
            { name: 'Emotes', value: `${emojiCount}`, inline: true },
            { name: '\u200B', value: '\u200B', inline: true },
            { name: 'Total Members', value: `${totalMember} Members\n 🟢 ${onlineCount} Online \n${memberCounts} Humans\n${botCounts} Bots`, inline: true },
            { name: 'Total Channels', value: `${totalChannel} Total Channels : \n` + "**" + "   #" + "**" + ` ${textChannel} Text \n 🔊 ${voiceChannel} Voice`, inline: true },
            { name: `Server Bot`, value: `<@845633338891042826>` },
         )
         .setFooter(`${message.guild.name} | ${message.guild.id}`);
      message.channel.send(serverEmbed)
   },
};