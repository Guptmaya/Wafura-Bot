const Discord = require("discord.js")

function report(message,coinsGiven,hashTag) {
  
   let professor = message.guild.channels.cache.find(x => x.id === "773534884077240330");

   let reportEmbed = new Discord.MessageEmbed()
      .setTitle("Balance Updated")
      .setThumbnail(message.author.displayAvatarURL())
      .setColor("#83F52C")
      .setDescription("**" + "User : " + "**" +
         `<@${message.author.id}>` +
         "**" + "\nAmount : " + "**" +
         `Cash: ` + "`" + `+${coinsGiven}` + "`" +
         " | " + "Bank: " + "`" + `-0` + "`" +
         "**" + "\nReason : " + "**" + `${hashTag}`)
      .setTimestamp(message.createdAt);
   professor.send(reportEmbed);
}
module.exports={report}