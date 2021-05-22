const Discord = require("discord.js")
module.exports = {
  name: 'hello',
  desciption: 'hello command',
  aliases: ['hi', 'hola'],
  guildOnly: true,
  usage: '<no args>',
  //cooldown: 10,
  args: false,
  async execute(bot, message, args) {
    message.channel.send("Hello");
  },
};