const got = require('got');
const Discord = require("discord.js")
module.exports = {
   name: 'meme',
   desciption: 'meme command',
   guildOnly: true,
   validChannels: '【🤖】bot-commands',
   usage: '<no args>',
   cooldown: 3,
   args: false,
   execute(bot, message, args) {

      message.channel.send("🕵️ Searching subreddit for memes");
      function getMeme() {
         const embed = new Discord.MessageEmbed();
         got('https://www.reddit.com/r/LaCasaDePapel/random/.json').then(response => {
            let content = JSON.parse(response.body);
            if (content[0].data.children[0].data.post_hint === 'image' && content[0].data.children[0].data.link_flair_text === 'Meme') {
               //message.delete();
               message.channel.bulkDelete(1);
               let permalink = content[0].data.children[0].data.permalink;
               let memeUrl = `https://reddit.com${permalink}`;
               let memeImage = content[0].data.children[0].data.url;
               let memeTitle = content[0].data.children[0].data.title;
               let memeUpvotes = content[0].data.children[0].data.ups;
               let memeAuthor = content[0].data.children[0].data.author;
               let memeNumComments = content[0].data.children[0].data.num_comments;
               embed.setTitle(`${memeTitle}`);
               embed.setURL(`${memeUrl}`)
               .setColor("#FF0000")
               embed.setImage(memeImage);
               embed.setDescription(`\*\*Author\*\* : ${memeAuthor}`);
               embed.setFooter(`👍 ${memeUpvotes} 💬 ${memeNumComments}`);
               message.channel.send(embed);
               console.log("image found.");
               console.log(`image and meme - https://reddit.com${content[0].data.children[0].data.permalink}`);
            }
            else if(content[0].data.children[0].data.post_hint === 'image'){
               console.log("image found but it was not meme.Running Function again.");
               console.log(`https://reddit.com${content[0].data.children[0].data.permalink}`);
               getMeme();
            }
            else {
               console.log("image not found.Running Function again.");
               console.log(`https://reddit.com${content[0].data.children[0].data.permalink}`);
               getMeme();
            }
         }).catch(console.error);
      }
      getMeme();
   },
};