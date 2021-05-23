const Discord = require("discord.js")
module.exports = {
  name: 'talent-tree-syntax-message',
  desciption: 'hello command',
  aliases: ['t-t-s-m'],
  guildOnly: true,
  usage: '<no args>',
  //cooldown: 10,
  args: false,
  async execute(bot, message, args) {

    //talent tree embeds
    if (args[0] === 'talent') {
      if (args[1] === '0') {
        const talentinfo = new Discord.MessageEmbed()
          .setColor("#FF0000")
          .attachFiles([`./images/talent-tree.png`])
          .setThumbnail(`attachment://talent-tree.png`)
          .setTitle("General Talent Info")
          .setDescription(
            `Commander's max level = \`60\`\n` +
            `Max talent points per commander = \`74\`\n\n` +
            `Talents are taking effect for the \`Primary Commander\` only, not for the Secondary Commander.\n\n` +
            `Secondary Commander can only contribute the skills, not talents, during the battles.\n\n` +
            `If your skill levels are bad, your talents are pretty useless.\n\n`)
          .setFooter("Source - https://rok.guide")
        message.channel.send(talentinfo);
      }

      if (args[1] === '1') {
        const talentsearch = new Discord.MessageEmbed()
          .setColor("#FF0000")
          .attachFiles([`./images/talent-tree.png`])
          .setThumbnail(`attachment://talent-tree.png`)
          .setTitle("Search Talent Tree")
          .setDescription(
            `Check any commander's talent tree using following command.\n\n` +
            `\`w!talent-tree commander-name\`\n\n` +
            `\*\*For example\*\* :\n\`w!talent-tree aethelflaed\`\n\`w!t-t aethelflaed\`\n\`w!talent-tree yi-seong-gye\`\n\n`+
            `Go in <#839174330931478568> and try it.`)
        message.channel.send(talentsearch);

      }
    }

    //civilization embeds
    if (args[0] === 'civilization') {
      if (args[1] === '0') {
        const talentinfo = new Discord.MessageEmbed()
          .setColor("#FF0000")
          .attachFiles([`./images/civilizations.jpg`])
          .setThumbnail(`attachment://civilizations.jpg`)
          .setTitle("General Civilization Info")
          .setDescription(
            `Total Civilizations = \`11\`\n\n` +
            `Best \`Early\` Game Civilization = \`China\`\n` +
            `> 5% Building Speed Boost\n > 5% Action Point Recovery\n\n`+
            `Best \`Mid\` Game Civilization = \`Germany\`\n` +
            `> 5% Troop Training Speed \n > 10% Action Point Recovery\n\n`+
            `Best \`Late\` Game Civilization = \`Korea\`\n` +
            `> 3% Reasearch Speed Boost\n > 15% Hospital Capacity\n\n`
            )
          .setFooter("Source - https://rok.guide")
        message.channel.send(talentinfo);
      }

      if (args[1] === '1') {
        const talentsearch = new Discord.MessageEmbed()
          .setColor("#FF0000")
          .attachFiles([`./images/civilizations.jpg`])
          .setThumbnail(`attachment://civilizations.jpg`)
          .setTitle("Search Civilization")
          .setDescription(
            `Check any civilization's basic info.\n\n` +
            `\`w!civ civilization-name\`\n\n` +
            `\*\*For example\*\* :\n\`w!civ china\`\n\`w!civ germany\`\n\n`+
            `Go in <#839174330931478568> and try it.`)
        message.channel.send(talentsearch);

      }
    }

  },
};