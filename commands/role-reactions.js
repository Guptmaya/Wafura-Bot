const Discord = require("discord.js");
module.exports = {
  name: 'roles-reaction',
  desciption: 'hello command',
  guildOnly: true,
  //validChannels: '【📢】announcements',
  usage: '<no args>',
  //cooldown: 10,
  args: false,
  async execute(bot, message, args) {
    


      
        let questionEmbed = new Discord.MessageEmbed()
          .setTitle("Alliance Role")
          .setColor("#FF0000")
          .setDescription(`Get your alliance role.\n\n \*\*React to give yourself a role.\*\*\n\n` +
            "<:56TA:845777557654601758> 56TA\n" +
            "<:IF:845777557184839711> IF\n" +
            "<:RZN:845777557232156734> ~RZN\n" +
            "<:One:845777557449211934> #One\n" +
            "<:56CX:845777557444886548> 56CX\n" + 
            "<:56IA:845777557487222834> 56IA\n" +
            "<:xRZN:845777557827485716> xRZN\n" +
            "<:56Im:845777557709258782> 56Im\n" +
            "<:OneB:845777557231501383> OneB\n" +
            "<:56ML:845777557579366472> 56ML\n" +
            "<:56Iaa:845777557361655851> 56Ia\n" +
            "<:OneC:845777557562458162> OneC\n" +
            "<:56Vn:845777557717516288> 56Vn\n" +
            "<:56MA:845777557592211497> 56MA\n" +
            "<:56CC:845777557826961468> 56CC\n" +
            "<:OO:845777558032744488> Others\n"
            )
          .setFooter("Reacting will give you role, Unreacting will remove your role.")
          message.channel.send(questionEmbed).then(embed => {
          embed.react(message.guild.emojis.cache.get('845777557654601758'))
            .then(reaction => reaction.message.react('845777557184839711'))
            .then(reaction => reaction.message.react('845777557232156734'))
            .then(reaction => reaction.message.react('845777557449211934'))
            .then(reaction => reaction.message.react('845777557444886548'))
            .then(reaction => reaction.message.react('845777557487222834'))
            .then(reaction => reaction.message.react('845777557827485716'))
            .then(reaction => reaction.message.react('845777557709258782'))
            .then(reaction => reaction.message.react('845777557231501383'))
            .then(reaction => reaction.message.react('845777557579366472'))
            .then(reaction => reaction.message.react('845777557361655851'))
            .then(reaction => reaction.message.react('845777557562458162'))
            .then(reaction => reaction.message.react('845777557717516288'))
            .then(reaction => reaction.message.react('845777557592211497'))
            .then(reaction => reaction.message.react('845777557826961468'))
            .then(reaction => reaction.message.react('845777558032744488'))
            .catch(err => console.error);
        })
      
  
   
  },
}; 