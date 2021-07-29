const Discord = require("discord.js")
const { Client } = require('unb-api')
const client = new Client('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBfaWQiOiI3NTkzODk2MDE0NjczMzQ3NTUiLCJpYXQiOjE2MDExMjI5ODl9.lh8iK89-qjtrMMiFK24ZcrB15Bkii88P6dtYBJFqqPQ');
const guildID = '628512144454975489';
module.exports = {
   name: 'rps',
   desciption: 'rock paper scissor command',
   guildOnly: true,
   validChannels: 'test',
   validChannels: '【🤖】bot-commands',
   usage: '<rock/[paper/scissor]]>',
   cooldown: 5,
   args: true,
   execute(bot, message, args) {
      let userID = message.author.id;
      let bots = ["Tokyo","Helsinki","Berlin","Moscow","Nairobi","Denver","Rio","Monica","Raquel","Arturo"];
      
      function getRndInteger(mini, maxx) {
         return Math.floor(Math.random() * (maxx - mini + 1)) + mini;
      }

      let chooseBot = getRndInteger(0,bots.length-1);
      let rpsEmbed;
      let duanjianchannel = message.guild.channels.cache.find(x => x.name === "professor");
      let result1 = getRndInteger(1, 3);
      let hand1;
      let hand2 = args[0];
         hand2 = hand2.toLowerCase();
         switch (result1) {
            case 1:
               {
                  hand1 = "Rock";
                  break;
               }
            case 2:
               {
                  hand1 = "Paper";
                  break;
               }
            case 3:
               {
                  hand1 = "Scissor";
                  break;
               }

         }
         switch (hand2) {
            case "rock":
            case "Rock":
            case "r":
               {
                  hand2 = "Rock";
                  break;
               }
            case "Paper":
            case "paper":
            case "p":
               {
                  hand2 = "Paper";
                  break;
               }
            case "Scissor":
            case "Scissors":
            case "scissor":
            case "scissors":
            case "s":
               {
                  hand2 = "Scissor";
                  break;
               }
            default:
               { hand2 = "invalid"; break; }

         }


         let pay = 50;
         
         if (hand2 === "invalid") return message.channel.send("Don't invent your own new game XD");
         if ((hand1 === "Rock" && hand2 === "Rock") || (hand1 === "Paper" && hand2 === "Paper") || (hand1 === "Scissor" && hand2 === "Scissor")) {
            rpsEmbed = new Discord.MessageEmbed()
               .setTitle("Rock Paper Scissor")
               .setColor("#ffae19")
               .setDescription("**" + `\n${bots[chooseBot]} :` + "**" + ` ${hand1}\n` +
                  "**" + `${message.author.username} :` + "**" + ` ${hand2}\n\n` +
                  "**" + `🤩 Tie` + "**");
         }
         else if ((hand1 === "Rock" && hand2 === "Scissor") || (hand1 === "Paper" && hand2 === "Rock") || (hand1 === "Scissor" && hand2 === "Paper")) {
            rpsEmbed = new Discord.MessageEmbed()
               .setTitle("Rock Paper Scissor")
               .setColor("#ffae19")
               .setDescription("**" + `\n${bots[chooseBot]} :` + "**" + ` ${hand1}\n` +
                  "**" + `${message.author.username} :` + "**" + ` ${hand2}\n\n` +
                  "**" + `${bots[chooseBot]} won 🥳` + "**");
         }
         else {
            rpsEmbed = new Discord.MessageEmbed()
               .setTitle("Rock Paper Scissor")
               .setColor("#ffae19")
               .setDescription("**" + `\n${message.author.username} :` + "**" + ` ${hand2}\n` +
                  "**" + `${bots[chooseBot]} :` + "**" + ` ${hand1}\n\n` +
                  "**" + `${message.author.username} won 🥳` + "**");
            client.editUserBalance(guildID, userID, { cash: pay }).then(duanjianchannel.send(`${message.author.username}/${message.author.id} - ${pay} Denver Coins added for RPS`));
         }

         message.channel.send(rpsEmbed);
      

   },
};