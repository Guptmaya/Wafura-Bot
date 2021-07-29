const { prefix1 } = require('../config.json');
const Discord = require("discord.js")
module.exports = {
   name: 'help',
   description: 'List all of my commands or info about a specific command.',
   aliases: ['commands'],
   usage: '[help module name]',
   guildOnly: false,
   cooldown: 5,
   args: false,
   execute(bot, message, args) {

      let helpEmbed = new Discord.MessageEmbed()
         .setTitle("Help")
         .setColor("#FF0000")
         .setDescription(`\*\*Heist Commands\*\*\n`+
         `p!start-heist, p!call-professor, p!get-cars, p!get-guns,  p!get-hacking-device, p!get-crew,  p!get-cars,  p!heist-equipment, p!heist-tasks, p!profile\n\n`+
         `\*\*Economy Commands\*\*\n`+
         `p!balance, p!rps, p!work, p!trivia\n\n`+
         `\*\*Misc Commands\*\*\n`+
         `p!bot-info, p!clear, p!delete-messages, p!getlink, p!lock, p!meme, p!nick, p!ping, p!server-info, p!s-m-a, p!suggest`)
         .setFooter(`${message.guild.name} | ${message.guild.id}`);
         message.channel.send(helpEmbed);
   },
};