const Discord = require("discord.js")
module.exports = {
  name: 'talent-tree',
  desciption: 'gives you link for commander`s talent trees',
  aliases: ['t-t'],
  guildOnly: true,
  usage: '<commander-name>',
  //cooldown: 10,
  args: false,
  async execute(bot, message, args) {

    let commanderToSearch = args[0];

    let link = `https://rok.guide/talent-guide/#${commanderToSearch}-talent-tree-builds`;

    let commander="a";
    if(commanderToSearch){
      commander = commanderToSearch.toUpperCase();
      const talenttrees = new Discord.MessageEmbed()
      .setColor("#FF0000")
      .setDescription(
        `\`${commander}'s\` Talent Tree\n
        [Click Me](${link})`)
      .setFooter("Source - https://rok.guide")
    message.channel.send(talenttrees);
    }
    
    
  },
};