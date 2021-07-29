const Discord = require("discord.js")
module.exports ={
   name : 'social_media_accounts',
   desciption : 'social media accounts command',
   aliases: ['s-m-a','s_m_a','social-media-accounts'],
   guildOnly: true,
  validChannels: '【🤖】bot-commands',
   usage: '<no args>',
   cooldown: 10,
   args: false,
   execute(bot,message, args){

      let sIcon = message.author.displayAvatarURL();
      let uName = message.author.tag;
      botIcon = message.client.user.displayAvatarURL();
      let netflixLink = "https://www.netflix.com/title/80192098";
      let youtubeLink = "https://www.youtube.com/channel/UCI9tBPaYZ8kJEU0PaQLWfEw";
      let instagramLink = "https://instagram.com/lacasadepapel?igshid=1aplyuki1x0it";
      let facebookLink = "https://www.facebook.com/lacasadepapelnetflix";
      let twitterLink = "https://twitter.com/lacasadepapel";
      let discordLink = "https://discord.gg/uA5m5GE";
      let wikiaLink1 = "https://money-heist.fandom.com";
      let wikiaLink2 = "https://la-casa-de-papel.fandom.com/fr/wiki/Wiki_La_Casa_de_Papel";
      let redditLink = "https://www.reddit.com/r/LaCasaDePapel/";


      let embed = new Discord.MessageEmbed()
      .setColor("#FF0000")
      .setAuthor(uName, `${sIcon}`)
      .setThumbnail(botIcon)
      .setTitle("Money Heist Social Media Links")
      .setDescription("\*\*\nOfficials\*\*\n"+
      `<:netlfix:777200863429132288> - [Netflix](${netflixLink})\n`+
      `<:youtube:777200925135077407> - [Youtube](${youtubeLink})\n`+
      `<:instagram:777200815093579816> - [Instagram](${instagramLink})\n`+
      `<:facebook:777200370279514152> - [Facebook](${facebookLink})\n`+
      `<:twitter:777200887835262986> - [Twitter](${twitterLink})\n\n`+
      `\*\*UnOfficials\*\*\n`+
      `<:discord:777200787192545290> - [Discord](${discordLink})\n`+
      `<:wikia:777200908232687616> - [Wikia 1](${wikiaLink1}), [Wikia 2](${wikiaLink2})\n`+
      `<:reddit:777200838354403369> - [Reddit](${redditLink})\n`)
      message.channel.send(embed);
   },
};