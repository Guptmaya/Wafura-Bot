const Discord = require("discord.js")
module.exports = {
   name: 'bellaciao',
   desciption: 'bellaciao song link',
   aliases: ['bella-ciao'],
   validChannels: '【🤖】bot-commands',
   guildOnly: true,
   usage: '<no args>',
   cooldown: 10,
   args: false,
   execute(bot, message, args) {

      let argsYesorNo = args[0];
      let sIcon = message.author.displayAvatarURL({ dynamic: true });
      let uName = message.author.tag;

      if (argsYesorNo) {
         argsYesorNo = argsYesorNo.toLowerCase();
         if (argsYesorNo === "song") {
            message.channel.send("Bella Ciao Song - https://youtu.be/4CI3lhyNKfo");
         }
         else if (argsYesorNo === "dj") {
            message.channel.send("Bella Ciao Dj Version - https://youtu.be/0bmE9XY3sOc");
         }
         else if (argsYesorNo === "history") {
            message.channel.send("Bella Ciao History - https://youtu.be/c9d1ycuCoVg");
         }
         else {
            let embed = new Discord.MessageEmbed()
               .setAuthor(uName, `${sIcon}`)
               .setColor("#fefeff")
               .setDescription("Invalid Option")
            message.channel.send(embed);
         }
      }
      else {
         let bellaCiaoOrignale = "https://youtu.be/4CI3lhyNKfo";
         let bellaCaioDj = "https://youtu.be/0bmE9XY3sOc";
         let bellaCiaoHistroy = "https://youtu.be/c9d1ycuCoVg";
         let embed = new Discord.MessageEmbed()
            .setAuthor(uName, `${sIcon}`)
            .setColor("#FF0000")
            .setDescription(`\*\*Bella Ciao Song\*\* - [Link](${bellaCiaoOrignale})\n` +
               `\*\*Bella Ciao DJ Version\*\* - [Link](${bellaCaioDj})\n` +
               `\*\*Bella Ciao History\*\* - [Link](${bellaCiaoHistroy})\n`)
            .setFooter("You can play song in Music Channel using r!play Bella Ciao")
         message.channel.send(embed);

      }

   },
};