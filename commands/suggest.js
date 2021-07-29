const Discord = require("discord.js")
const guildID = '628512144454975489';
module.exports = {
   name: 'suggest',
   desciption: 'suggestion command',
   usage:'<suggestion>',
   validChannels: '【🤖】bot-commands',
   guildOnly: true,
   cooldown: 60,
   args: true,
   async execute(bot, message, args) {

      let suggestionchannel = message.guild.channels.cache.find(x => x.name === "【📝】suggestions");
      let suggestion = args.join(" ");
      let tIcon = message.author.displayAvatarURL({ format: "jpg" }, { size: 64 });
      let uName = message.author.tag;
      
      message.delete();
      let response = new Discord.MessageEmbed()
      .setColor("#FF0000")
         .setDescription("🕵️ You suggestion has been sent.")
   
      let suggest = new Discord.MessageEmbed()
         .setTitle("Suggestion")
         .setColor("#FF0000")
         .setThumbnail(`${tIcon}`)
         .setDescription(suggestion+"\n\n"+"**"+"By : "+"**"+uName)
         let msgEmbed = await suggestionchannel.send(suggest)
      msgEmbed.react('⬆️')
         .then(reaction => reaction.message.react('⬇️'))
         .then(message.channel.send(response))
         .catch(err => console.error);
    },
};