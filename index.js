const Discord = require("discord.js");
const fs = require('fs');
const mongoose = require( `./database/mongoose`);
const bot = new Discord.Client({
   disableEveryone: true,
   partials: ["MESSAGE", "CHANNEL", "REACTION"]
});
const config = require('./config.json');
const { Client } = require('unb-api');
const lcdpServerMembers = require('./json/members.json');
const client = new Client('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBfaWQiOiI3NTkzODk2MDE0NjczMzQ3NTUiLCJpYXQiOjE2MDExMjI5ODl9.lh8iK89-qjtrMMiFK24ZcrB15Bkii88P6dtYBJFqqPQ');
//const data = require("./models/data.js");

//models
//const Data = require("./models/data.js");


bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const cooldowns = new Discord.Collection();

bot.on("ready", async () => {
mongoose.init();
   console.log(`${bot.user.username} is online`);
   let status;
   let statuses = [
      "Money Heist",
      "MH Season 1",
      "MH Season 2",
      "MH Season 3",
      "MH Season 4",
      "Waiting For Season 5",
      "MH Youtube Videos",
      "p!help",
      "Bella Ciao",
      "My Life is Going On",
      "Heist"
   ]
   setInterval(function () {
      status = statuses[Math.floor(Math.random() * statuses.length)];
      console.log(status);
      if (status === "Bella Ciao" || status === "My Life is Going On") {
         bot.user.setActivity(status, { type: 'LISTENING' }).catch(console.error);
      }
      else if (status === "p!help" || status === "Heist") {
         bot.user.setActivity(status, { type: 'PLAYING' }).catch(console.error);
      }
      else {
         bot.user.setActivity(status, { type: 'WATCHING' }).catch(console.error);
      }
   }, 30000)

});

/*(async() =>{
   connection = await require("./database/db");
})
*/

//Voice Channel Creation
/*bot.on('voiceStateUpdate', (oldMember, newMember) => {
   const guild = bot.guilds.cache.get(`628512144454975489`);
   //newUserChannel stores channel id of voice channel joined
   let newUserChannel = newMember.channelID;
   let oldUserChannel = oldMember.channelID;
   console.log(newUserChannel);

   //if user joines create vc voice channel
   if (newUserChannel === "779356512107495424") {

      //User Joins create vc
      console.log("Joined create vc");
      let userId = oldMember.id;

      //user
      const User = bot.users.cache.find(user => user.id === userId);
      let memberr = guild.member(User);
      console.log(memberr);

      //everyone role data
      const everyoneRole = guild.roles.cache.find(role => role.name === "@everyone");
      //channel Name for user
      let newlyCreatedVoiceChannelName = `【🔈】${User.username}`;
      let newlyCreatedTextChannelName = `【📝】${User.username}-${User.discriminator}`;

      //find category channel
      let category = guild.channels.cache.find(x => x.id === "628512144454975492");

      //creating a new voice channel for user
      guild.channels.create(newlyCreatedVoiceChannelName, {
         type: 'voice',
         parent: category,
         lockPermissions: false,
         userLimit: 10,
         bitrate: 128000,
         permissionOverwrites: [
            {
               id: guild.id,
               deny: ['VIEW_CHANNEL'],
            },
            {
               id: User.id,
               allow: ['VIEW_CHANNEL', 'CONNECT', 'MOVE_MEMBERS', 'DEAFEN_MEMBERS', 'MUTE_MEMBERS', 'STREAM', 'PRIORITY_SPEAKER', 'CONNECT']
            },
         ]
      })       //when channel is created move it
         .then((channel) => {
            memberr.voice.setChannel(channel);
            console.log(channel);
            let professor = guild.channels.cache.find(x => x.id === "773534884077240330");
            professor.send(`Channel Creation Report #VCCR\n\n\*\*Voice Channel\*\* : ${channel.name}\n\*\*Created by\*\* : <@{User.id}>.\n \*\*UserLimit\*\* : 10\n \*\*Bitrate\*\*: 128`);
         })

      guild.channels.create(newlyCreatedTextChannelName, {
         type: 'text',
         parent: category,
         lockPermissions: false,
         permissionOverwrites: [
            {
               id: guild.id,
               deny: ['VIEW_CHANNEL'],
            },
            {
               id: User.id,
               allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS', 'ATTACH_FILES', 'USE_EXTERNAL_EMOJIS', 'EMBED_LINKS'],
            },
         ],
      })
         .then((channel) => {
            let professor = guild.channels.cache.find(x => x.id === "773534884077240330");
            professor.send(`Channel Creation Report #TCCR\n\n\*\*Text Channel\*\* : ${channel.name}\n\*\*Created by\*\* : <@{User.id}>.\n \*\*UserLimit\*\* : 10\n \*\*Bitrate\*\*: 128`);

         })

   }
   else {
      // User leaves a voice channel
      console.log("Left create vc");
   }
});

bot.on('voiceStateUpdate', async (oldMember, newMember) => {
   const guild = bot.guilds.cache.get(`628512144454975489`);
   //newUserChannel stores channel id of voice channel joined
   let newUserChannel = newMember.channelID;
   let oldUserChannel = oldMember.channelID;
   console.log(newUserChannel);
   
   let userId = oldMember.id;
   const User = bot.users.cache.find(user => user.id === userId);
   let memberr = guild.member(User);

   let voiceChannelName = `【🔈】${memberr.username}`;
   let textChannelName = `【📝】${memberr.username}-${memberr.discriminator}`;
   let voiceChannel = await guild.channels.cache.find(x => x.name === voiceChannelName);
   let textChannel = await guild.channels.cache.find(x => x.name === textChannelName);
   
   if (voiceChannel) {
      if (oldUserChannel === voiceChannel.id) {
         //do nthg if user joins the his own vc
      }
      else {
         // User leaves a voice channel
         voiceChannel.delete();
         textChannel.delete();
      }
   }

});
*/


//add the roles - role reaction 
//part roles
//ping roles
bot.on('messageReactionAdd', async (reaction, user) => {
   if (reaction.message.partial) await reaction.message.fetch();
   if (reaction.partial) await reaction.fetch();
   if (user.bot) return;
   if (!reaction.message.guild) return;
   if (reaction.message.id === '788441303896948766') {
      if (reaction.emoji.name === '🎮') {
         await reaction.message.guild.members.cache.get(user.id).roles.add('701487271043661824')
         user.send('You have obtained \`Gamer Ping\` role!')
      }
      else if (reaction.emoji.id === '689280975955427373') {
         await reaction.message.guild.members.cache.get(user.id).roles.add('697580353639940107')
         user.send('You have obtained \`Events Ping\` role!')
      }
      else if (reaction.emoji.name === '🤖') {
         await reaction.message.guild.members.cache.get(user.id).roles.add('788434225036001281')
         user.send('You have obtained \`Bot Updates Ping\` role!')
      }
      else if (reaction.emoji.name === '🏛️') {
         await reaction.message.guild.members.cache.get(user.id).roles.add('792134261204582421')
         user.send('You have obtained \`Minecraft Ping\` role!')
      }
   }
})

//removes the roles - role reaction
//part roles

//ping roles
bot.on('messageReactionRemove', async (reaction, user) => {
   if (reaction.message.partial) await reaction.message.fetch();
   if (reaction.partial) await reaction.fetch();
   if (user.bot) return;
   if (!reaction.message.guild) return;
   if (reaction.message.id === '788441303896948766') {
      if (reaction.emoji.name === '🎮') {
         await reaction.message.guild.members.cache.get(user.id).roles.remove('701487271043661824')
         user.send('\`Gamer Ping\` role has been removed!')
      }
      else if (reaction.emoji.id === '689280975955427373') {
         await reaction.message.guild.members.cache.get(user.id).roles.remove('697580353639940107')
         user.send('\`Events Ping\` role has been removed!')
      }
      else if (reaction.emoji.name === '🤖') {
         await reaction.message.guild.members.cache.get(user.id).roles.remove('788434225036001281')
         user.send('\`Bot Updates Ping\` role has been removed!')
      }
      else if (reaction.emoji.name === '🏛️') {
         await reaction.message.guild.members.cache.get(user.id).roles.remove('792134261204582421')
         user.send('\`Minecraft Ping\` role has been removed!')
      }
   }
})
for (const files of commandFiles) {
   const command = require(`./commands/${files}`);
   bot.commands.set(command.name, command);
}


//for commands
bot.on("message", message => {
   let prefix1 = config.prefix1;
   let prefix2 = config.prefix2;

   if (message.author.bot) return;

   function getRndInteger(mini, maxx) {
      return Math.floor(Math.random() * (maxx - mini + 1)) + mini;
   }
  
   if (!message.content.startsWith(prefix1) && !message.content.startsWith(prefix2)) return;

   //for me only
   //if (message.author.id != "541467870819778562") return;
   //if (!message.member.hasPermission("ADMINISTRATOR")) return;

   const args = message.content.slice(prefix1.length).trim().split(/ +/);
   const commandName = args.shift().toLowerCase();

   const command = bot.commands.get(commandName)
      || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
   if (!command) return;

   //check the channel

   bot.validChannels = new Discord.Collection();
   if (message.channel.id !== '758622361321865247' || message.channel.id !== '753568394548346900') {
      if (command.validChannels && (message.channel.name !== command.validChannels)) {
         let botChannel = message.guild.channels.cache.find(x => x.name === "【🤖】bot-commands");
         let incorrectChannelEmbed = new Discord.MessageEmbed()
            .setColor("#fefeff")
            .setDescription(`🕵️ Incorrect Channel.\n Head over to ${botChannel}`)
         return message.channel.send(incorrectChannelEmbed);
      }
   }


   //cooldown starts here
   if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Discord.Collection());
   }
   const now = Date.now();
   const timestamps = cooldowns.get(command.name);
   const cooldownAmount = (command.cooldown || 3) * 1000;
   let uName = message.author.tag;
   let tIcon = message.author.displayAvatarURL();
   const cooldownEmbed = new Discord.MessageEmbed()
      .setColor("#fefeff")
      .setAuthor(uName, `${tIcon}`)

   if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
      if (now < expirationTime) {
         const timeLeft = (expirationTime - now) / 1000;
         var seconds = timeLeft
         const hoursLeft = Math.floor(seconds / 3600);
         seconds %= 3600;
         minutesLeft = Math.floor(seconds / 60);
         secondsLeft = seconds % 60;
         if ((hoursLeft > 0) && (minutesLeft > 0) && (secondsLeft > 0)) {
            cooldownEmbed.setDescription(`⏳ You cannot use \`${command.name}\` for ${hoursLeft.toFixed(0)} hours , ${minutesLeft.toFixed(0)} minutes and ${secondsLeft.toFixed(0)} seconds`);
         }
         if (!minutesLeft) { cooldownEmbed.setDescription(`⏳ You cannot use \`${command.name}\` for ${secondsLeft.toFixed(0)} seconds`); }
         else if (!hoursLeft) { cooldownEmbed.setDescription(`⏳ You cannot use \`${command.name}\` for ${minutesLeft.toFixed(0)} minutes and ${secondsLeft.toFixed(0)} seconds`); }
         return message.channel.send(cooldownEmbed).then(msg => msg.delete({ timeout: 5000 }));
      }
   }
   timestamps.set(message.author.id, now);
   setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
   //cooldown ends here

   //usage starts here
   const usageEmbed = new Discord.MessageEmbed()
      .setAuthor(uName, `${tIcon}`)
      .setColor("#fefeff")

   if (command.guildOnly && message.channel.type === 'dm') {
      return message.reply(`I can\'t execute ${command.name} command inside DMs!`);
   }

   if (command.args && !args.length) {
      let reply = `🕵️ Too few arguments given.`;
      if (command.usage) {
         reply += `\n\nUsage:\n \`${prefix1}${command.name} ${command.usage}\``;
         usageEmbed.setDescription(reply);
         return message.channel.send(usageEmbed);
      }
   }
   try {
      command.execute(bot, message, args);
   }
   catch (error) {
      console.error(error);
      let professor = message.guild.channels.cache.find(x => x.id === "788445384799813702");
      professor.send(error);
      message.reply("Issue executing that command!\n Let Devs know bout this error.")
   }
});




bot.login(process.env.token);





