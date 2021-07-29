const Discord = require("discord.js")
const { Client } = require('unb-api')
const client = new Client('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBfaWQiOiI3NTkzODk2MDE0NjczMzQ3NTUiLCJpYXQiOjE2MDExMjI5ODl9.lh8iK89-qjtrMMiFK24ZcrB15Bkii88P6dtYBJFqqPQ');

module.exports = {
   name: 'balance',
   desciption: 'Shows Demon spirit coins',
   aliases: ['bal', 'dc'],
   validChannels: '【🤖】bot-commands',
   guildOnly: true,
   cooldown: 5,
   args: false,
   async execute(bot, message, args) {
      let guildID = message.guild.id;
      let userID = message.author.id;

      let sIcon = message.author.displayAvatarURL({ format: "jpg" }, { size: 64 });

      const { cash: cashh } = await client.getUserBalance(guildID, userID);
      const { bank: bankk } = await client.getUserBalance(guildID, userID);
      const { total: totall } = await client.getUserBalance(guildID, userID);

      let showEmbed = new Discord.MessageEmbed()
         .setTitle("Denver Coins <:MH_aaaaaa:638802960998072329>")
         .setThumbnail(sIcon)
         .setColor("#FF0000")
         .setDescription("**" + "User : " + "**" +
            `<@${message.author.id}>\n` +
            "**" + "\nCash : " + "**" +
            `\`${cashh}\`` +
            "**" + "\nBank : " + "**" +
            `\`${bankk}\`` +
            "**" + "\nTotal : " + "**" +
            `\`${totall}\``)
         .setTimestamp(message.createdAt);
      message.channel.send(showEmbed);
   },
};