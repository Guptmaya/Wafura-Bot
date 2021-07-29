const Discord = require("discord.js")
const charactersFile = require("../json/characters.json")
const { Client } = require('unb-api');
const client = new Client('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBfaWQiOiI3NTkzODk2MDE0NjczMzQ3NTUiLCJpYXQiOjE2MDExMjI5ODl9.lh8iK89-qjtrMMiFK24ZcrB15Bkii88P6dtYBJFqqPQ');

module.exports = {
   name: 'whoami',
   desciption: 'command to get personal info',
   guildOnly: false,
   usage: '<no args>',
   validChannels: '【🤖】bot-commands',
   cooldown: 10,
   args: false,
  async execute(bot, message, args) {
   
      let guildID = "628512144454975489";
      let sIcon = message.author.displayAvatarURL({ dynamic: true });
      let uName = message.author.tag;
      let userID = message.author.id;
      let avatarlink = message.author.avatarURL({dynamic:true});
      console.log(avatarlink);
      var str = `hey ${message.member.joinedAt}`;
      var stringArray = str.split(/(\s+)/);
      let userJoinedServerAt = `${stringArray[4]} ${stringArray[6]} ${stringArray[8]}`

      const str2 = `hey ${message.author.createdAt}`;
      var stringArray2 = str2.split(/(\s+)/);
      let userJoinedDiscordAt = `${stringArray2[4]} ${stringArray2[6]} ${stringArray2[8]}`


      let roleName = message.member.roles.highest.name;
      let highestRole = message.guild.roles.cache.find(role => role.name === roleName);


      const { total: totall } = await client.getUserBalance(guildID, userID);

      let profileEmbed = new Discord.MessageEmbed()
         .setAuthor(uName, `${sIcon}`)
         .setColor("#FF0000")
         .setThumbnail(sIcon)
         .addFields(
            { name: 'Tag', value: `<@${message.author.id}>` },
            //{ name: '\u200B', value: '\u200B' },
            { name: 'Id', value: message.author.id, inline: false },
            { name: 'Denver Coins', value: `<:MH_aaaaaa:638802960998072329>${totall}`, inline: false },
            { name: 'Avatar', value: `[Link](${avatarlink})`, inline: false },
            { name: 'Joined Money Heist Server', value: userJoinedServerAt, inline: false },
            { name: 'Joined Discord', value: userJoinedDiscordAt, inline: false },
            { name: 'Highest Role In Server', value: `<@&${highestRole.id}>`, inline: false },
         )
      message.channel.send(profileEmbed);

   },
};