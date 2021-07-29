const Discord = require("discord.js")
module.exports ={
   name : 'nickname',
   desciption : 'changes your nickname',
   aliases: ['nick'],
   validChannels: '【🤖】bot-commands',
   guildOnly: true,
   usage: '<nickname>',
   cooldown: 10,
   args: true,
   execute(bot,message, args){
      if (message.member.hasPermission("ADMINISTRATOR")) return message.reply(`I'm not eligible to change your nickname.`);
      let guild = bot.guilds.cache.get('628512144454975489');
      let member = guild.member(message.author);
      let nicknameBefore = member ? member.displayName : null;
      let nicknameAfter = args.join(" ");
      let sIcon = message.author.displayAvatarURL({ dynamic: true });
      let uName = message.author.tag;
      

      let embed = new Discord.MessageEmbed()
         .setAuthor(uName, `${sIcon}`)
         .setColor("#FF0000")
         .setDescription(`🕵️ Nickname Changed!\n\*\*Previous Nickname\*\* - ${nicknameBefore}\n\*\*Current Nickname\*\* - ${nicknameAfter}`)
      member.setNickname(nicknameAfter).then(message.channel.send(embed));

      
   },
};