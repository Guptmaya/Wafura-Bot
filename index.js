const Discord = require("discord.js");
const fs = require('fs');
const bot = new Discord.Client({
   disableEveryone: true,
   partials: ["MESSAGE", "CHANNEL", "REACTION"]
});
const config = require('./config.json');


bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const cooldowns = new Discord.Collection();

bot.on("ready", async () => {
   console.log(`${bot.user.username} is online`);
   let status;
   let statuses = [
      "Rise Of Kingdoms"
   ]
         bot.user.setActivity(status, { type: 'PLAYING' }).catch(console.error);
});


//Role Reaction 
   //Add Roles
   bot.on('messageReactionAdd', async (reaction, user) => {
      if (reaction.message.partial) await reaction.message.fetch();
      if (reaction.partial) await reaction.fetch();
      if (user.bot) return;
      if (!reaction.message.guild) return;
      if (reaction.message.id === '845805490960465930') {
         if (reaction.emoji.id === '845777557654601758') {
            await reaction.message.guild.members.cache.get(user.id).roles.add('834825205959360533')
            user.send('You have obtained \`56TA\` role!')
         }
         else if (reaction.emoji.id === '845777557184839711') {
            await reaction.message.guild.members.cache.get(user.id).roles.add('834825600652410890')
            user.send('You have obtained \`IF\` role!')
         }
         else if (reaction.emoji.id === '845777557232156734') {
            await reaction.message.guild.members.cache.get(user.id).roles.add('834825612580880414')
            user.send('You have obtained \`~RZN\` role!')
         }else if (reaction.emoji.id === '845777557449211934') {
            await reaction.message.guild.members.cache.get(user.id).roles.add('834838651795406868')
            user.send('You have obtained \`#One\` role!')
         }else if (reaction.emoji.id === '845777557444886548') {
            await reaction.message.guild.members.cache.get(user.id).roles.add('845788239956279316')
            user.send('You have obtained \`56CX\` role!')
         }
         else if (reaction.emoji.id === '845777557487222834') {
            await reaction.message.guild.members.cache.get(user.id).roles.add('839170191816523827')
            user.send('You have obtained \`56IA\` role!')
         }
         else if (reaction.emoji.id === '845777557827485716') {
            await reaction.message.guild.members.cache.get(user.id).roles.add('845789080105385994')
            user.send('You have obtained \`xRZN\` role!')
         }
         else if (reaction.emoji.id === '845777557709258782') {
            await reaction.message.guild.members.cache.get(user.id).roles.add('845789298871763005')
            user.send('You have obtained \`56Im\` role!')
         }
         else if (reaction.emoji.id === '845777557231501383') {
            await reaction.message.guild.members.cache.get(user.id).roles.add('845789519084257331')
            user.send('You have obtained \`OneB\` role!')
         }else if (reaction.emoji.id === '845777557579366472') {
            await reaction.message.guild.members.cache.get(user.id).roles.add('839170704040656999')
            user.send('You have obtained \`56ML\` role!')
         }else if (reaction.emoji.id === '845777557361655851') {
            await reaction.message.guild.members.cache.get(user.id).roles.add('845286045166600232')
            user.send('You have obtained \`56Ia\` role!')
         }else if (reaction.emoji.id === '845777557562458162') {
            await reaction.message.guild.members.cache.get(user.id).roles.add('845789869334724640')
            user.send('You have obtained \`OneC\` role!')
         }else if (reaction.emoji.id === '845777557717516288') {
            await reaction.message.guild.members.cache.get(user.id).roles.add('845790037102428160')
            user.send('You have obtained \`56Vn\` role!')
         }
         else if (reaction.emoji.id === '845777557592211497') {
            await reaction.message.guild.members.cache.get(user.id).roles.add('845791319032070144')
            user.send('You have obtained \`56MA\` role!')
         }
         else if (reaction.emoji.id === '845777557826961468') {
            await reaction.message.guild.members.cache.get(user.id).roles.add('839169794557214790')
            user.send('You have obtained \`56CC\` role!')
         }
         else if (reaction.emoji.id === '845777558032744488') {
            await reaction.message.guild.members.cache.get(user.id).roles.add('845791306906730556')
            user.send('You have obtained \`Others\` role!')
         }
      }
   })
   
   //Remove Roles
   bot.on('messageReactionRemove', async (reaction, user) => {
      if (reaction.message.partial) await reaction.message.fetch();
      if (reaction.partial) await reaction.fetch();
      if (user.bot) return;
      if (!reaction.message.guild) return;
      if (reaction.message.id === '845805490960465930') {
         if (reaction.emoji.id === '845777557654601758') {
            await reaction.message.guild.members.cache.get(user.id).roles.remove('834825205959360533')
            user.send(' \`56TA\`  role has been removed!')
         }
         else if (reaction.emoji.id === '845777557184839711') {
            await reaction.message.guild.members.cache.get(user.id).roles.remove('834825600652410890')
            user.send(' \`IF\`  role has been removed!')
         }
         else if (reaction.emoji.id === '845777557232156734') {
            await reaction.message.guild.members.cache.get(user.id).roles.remove('834825612580880414')
            user.send(' \`~RZN\`  role has been removed!')
         }else if (reaction.emoji.id === '845777557449211934') {
            await reaction.message.guild.members.cache.get(user.id).roles.remove('834838651795406868')
            user.send(' \`#One\`  role has been removed!')
         }else if (reaction.emoji.id === '845777557444886548') {
            await reaction.message.guild.members.cache.get(user.id).roles.remove('845788239956279316')
            user.send(' \`56CX\`  role has been removed!')
         }
         else if (reaction.emoji.id === '845777557487222834') {
            await reaction.message.guild.members.cache.get(user.id).roles.remove('839170191816523827')
            user.send(' \`56IA\`  role has been removed!')
         }
         else if (reaction.emoji.id === '845777557827485716') {
            await reaction.message.guild.members.cache.get(user.id).roles.remove('845789080105385994')
            user.send(' \`xRZN\`  role has been removed!')
         }
         else if (reaction.emoji.id === '845777557709258782') {
            await reaction.message.guild.members.cache.get(user.id).roles.remove('845789298871763005')
            user.send(' \`56Im\`  role has been removed!')
         }
         else if (reaction.emoji.id === '845777557231501383') {
            await reaction.message.guild.members.cache.get(user.id).roles.remove('845789519084257331')
            user.send(' \`OneB\`  role has been removed!')
         }else if (reaction.emoji.id === '845777557579366472') {
            await reaction.message.guild.members.cache.get(user.id).roles.remove('839170704040656999')
            user.send(' \`56ML\`  role has been removed!')
         }else if (reaction.emoji.id === '845777557361655851') {
            await reaction.message.guild.members.cache.get(user.id).roles.remove('845286045166600232')
            user.send(' \`56Ia\`  role has been removed!')
         }else if (reaction.emoji.id === '845777557562458162') {
            await reaction.message.guild.members.cache.get(user.id).roles.remove('845789869334724640')
            user.send(' \`OneC\`  role has been removed!')
         }else if (reaction.emoji.id === '845777557717516288') {
            await reaction.message.guild.members.cache.get(user.id).roles.remove('845790037102428160')
            user.send(' \`56Vn\`  role has been removed!')
         }
         else if (reaction.emoji.id === '845777557592211497') {
            await reaction.message.guild.members.cache.get(user.id).roles.remove('845791319032070144')
            user.send(' \`56MA\`  role has been removed!')
         }
         else if (reaction.emoji.id === '845777557826961468') {
            await reaction.message.guild.members.cache.get(user.id).roles.remove('839169794557214790')
            user.send(' \`56CC\`  role has been removed!')
         }
         else if (reaction.emoji.id === '845777558032744488') {
            await reaction.message.guild.members.cache.get(user.id).roles.remove('845791306906730556')
            user.send(' \`Others\`  role has been removed!')
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
   if (message.channel.id !== '845763197276389386' || message.channel.id !== '839174330931478568') {
      if (command.validChannels && (message.channel.name !== command.validChannels)) {
         let botChannel = message.guild.channels.cache.find(x => x.name === "bots");
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
      let professor = message.guild.channels.cache.find(x => x.id === "701885078581674157");
      professor.send(error);
      message.reply("Issue executing that command!\n Let Devs know bout this error.")
   }
});




bot.login(process.env.token);
//bot.login("");




