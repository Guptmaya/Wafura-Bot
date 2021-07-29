const Discord = require("discord.js")
const charactersFile = require("../json/characters.json")
const { Client } = require('unb-api');

const client = new Client('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBfaWQiOiI3NTkzODk2MDE0NjczMzQ3NTUiLCJpYXQiOjE2MDExMjI5ODl9.lh8iK89-qjtrMMiFK24ZcrB15Bkii88P6dtYBJFqqPQ');
module.exports = {
   name: 'whois',
   desciption: 'command to get character info',
   guildOnly: false,
   validChannels: '【🤖】bot-commands',
   usage: '<no args>',
   args: false,
   async execute(bot, message, args) {
      let sIcon = message.author.displayAvatarURL();
      let uName = message.author.tag;
      let guildID = message.guild.id;

      let searchUser = message.guild.member(message.mentions.users.first());
      
      if (searchUser) {
         let searchUserid = searchUser.id;
         let userID = searchUserid;
         let searchUser_user =message.mentions.members.first().user;
         let userIcon = searchUser_user.displayAvatarURL({ dynamic: true });
         console.log(searchUser);
         let userTag = searchUser.user.tag;
         const client = new Client('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBfaWQiOiI3NTkzODk2MDE0NjczMzQ3NTUiLCJpYXQiOjE2MDExMjI5ODl9.lh8iK89-qjtrMMiFK24ZcrB15Bkii88P6dtYBJFqqPQ');
         const { total: totall } = await client.getUserBalance(guildID, userID);

         var str = `hey ${searchUser.joinedAt}`;
         var stringArray = str.split(/(\s+)/);
         let userJoinedServerAt = `${stringArray[4]} ${stringArray[6]} ${stringArray[8]}`
         
         const str2 = `hey ${searchUser_user.createdAt}`;
         var stringArray2 = str2.split(/(\s+)/);
         let userJoinedDiscordAt = `${stringArray2[4]} ${stringArray2[6]} ${stringArray2[8]}`
         
         let roleName = searchUser.roles.highest.name;
         let highestRole = message.guild.roles.cache.find(role => role.name === roleName);


         let profileEmbed = new Discord.MessageEmbed()
            .setAuthor(userTag, `${userIcon}`)
            .setColor("#FF0000")
            .setThumbnail(userIcon)
            .setDescription(`\*\*Tag :\*\*  <@${searchUser.id}>\n`+
            `\*\*Id :\*\*  ${searchUser.id}\n`+
            `\*\*Denver Coins :\*\*  ${totall}\n`+
            `\*\*Avatar :\*\*  [Link](${userIcon})\n`+
            `\*\*Joined Server :\*\*  ${userJoinedServerAt}\n`+
            `\*\*Highest Role In Server :\*\*  <@&${highestRole.id}>\n`)
         message.channel.send(profileEmbed);
      }
      
      else {
         console.log("worked 2");

         if (!args[0]) {
            let description = " ";
            var i;
            var j = 1;
            for (i = 0; i < charactersFile.name.length; i = i + 2) {
               temp_desciption = `${j}. ${charactersFile.name[i]}\n`;
               description = description + temp_desciption;
               j++;
            }
            let embed = new Discord.MessageEmbed()
               .setColor("#FF0000")
               .setTitle("Characters Sheet")
               .setDescription(description)
               .setFooter("You can write either Whole Name or just First Name. But always Capitalize first character of a word.")
            message.author.send(embed);
            message.reply("Charcater Sheet has been sent to your DMs.");
         }
         
         else {
            var i;
            let toSearch;
            let CharacterIndex;
            let finalCharacterIndex;
            let found = "no";

            function showEmbed(CharacterIndex, finalCharacterIndex) {
               let description = `\n\*\*Title\*\* : ${charactersFile.title[finalCharacterIndex]}\n\n` +
                  `\*\*Appearance\*\* : Parts ${charactersFile.appearance[finalCharacterIndex]}\n\n` +
                  `\*\*Gender\*\* : ${charactersFile.Gender[finalCharacterIndex]}\n\n` +
                  `\*\*Potrayed By\*\* : ${charactersFile.PotrayedBy[finalCharacterIndex]}\n\n` +
                  `${charactersFile.description[finalCharacterIndex]}\n`;

               let characterEmbed = new Discord.MessageEmbed()
                  .setColor("#FF0000")
                  .setTitle(charactersFile.name[CharacterIndex])
                  .attachFiles([`./images/${charactersFile.image[finalCharacterIndex]}`])
                  .setThumbnail(`attachment://${charactersFile.image[finalCharacterIndex]}`)
                  .setDescription(description)
                  .setFooter(`${charactersFile.wikia[finalCharacterIndex]}`)
               message.channel.send(characterEmbed);
            }

            if (args[1]) {
               toSearch = args.join(" ");
               for (i = 0; i <= charactersFile.name.length; i++) {
                  if (charactersFile.name[i] === toSearch) {
                     CharacterIndex = i;
                     finalCharacterIndex = Math.floor(CharacterIndex / 2);
                     showEmbed(CharacterIndex, finalCharacterIndex);
                     return;
                  }
               } if (found === "no") {
                  let characterNotFoundEmbed = new Discord.MessageEmbed()
                     .setAuthor(uName, `${sIcon}`)
                     .setColor("#fefeff")
                     .setTitle("🕵️ Character Not Found In Database")
                     .setDescription(`Check the Character Sheet using \`p!whois\` command.\n` +
                        "If you don't see the character there and feel like it should be added to Database,\n DM <@!541467870819778562>");
                  message.channel.send(characterNotFoundEmbed);

               }
            }
            else {
               toSearch = args[0];
               for (i = 0; i <= charactersFile.name.length; i++) {
                  if (charactersFile.name[i] === toSearch) {
                     CharacterIndex = i;
                     finalCharacterIndex = Math.floor(CharacterIndex / 2);
                     showEmbed(CharacterIndex, finalCharacterIndex);
                     found = "yes";
                     return;
                  }

               }
               console.log(found);
               console.log("worked 3");
               console.log(CharacterIndex);
               console.log(finalCharacterIndex);
               if (found === "no") {
                  let characterNotFoundEmbed = new Discord.MessageEmbed()
                     .setAuthor(uName, `${sIcon}`)
                     .setColor("#fefeff")
                     .setTitle("🕵️ Character Not Found In Database")
                     .setDescription(`Check the Character Sheet using \`p!whois\` command.\n` +
                        "If you don't see the character there and feel like it should be added to Database,\n DM <@!541467870819778562>");
                  message.channel.send(characterNotFoundEmbed);

               }
            }
            console.log(found);

         }
      }



   },
};