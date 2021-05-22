const Discord = require("discord.js")
module.exports = {
   name: 'server-info-channel-creationn',
   desciption: 'hello command',
   guildOnly: true,
   //validChannels: '【❓】server-info',
   //validChannels: '【🏛】mc-server-info',
   usage: '<no args>',
   //cooldown: 2,
   args: false,
   async execute(bot, message, args) {
      //message.channel.send('hello!');
      if (args[0] === "welcome") {
         let wikipedialink = "https://rok.lilithgames.com/en";
         let dtos = "https://discord.com/terms";

         if (args[1] === "0") {
            const showOrder10 = new Discord.MessageEmbed()
               .setColor("#FF0000")
               .attachFiles([`./images/welcome.png`])
               .setImage(`attachment://welcome.png`)
            message.channel.send(showOrder10);
         }
         else if (args[1] === "1") {
            const embed2 = new Discord.MessageEmbed()
               .setColor("#FF0000")
               .setThumbnail(message.guild.iconURL())
               .setTitle("Welcome to the #2256 Kingdom of Wafura Discord server!")
               .setDescription(
                  
                  `[Rise of Kingdoms](${wikipedialink}) is a staggeringly huge mobile game. You can play in a way that suits your style, whether that be reckless military adventurism and dreams of global dominance, or quiet and unobtrusive statecraft and dreams of a happy populace.\n\n`+
                  `> \*\*IMPORTANT:\*\* Make sure to read this entire channel to get better understanding of server.\n\n` +
                  `This server is discord server from one of the kingdoms in game (Kingdom of wafura #2256). Here, we intend to follow [Discord's Terms of Service](${dtos}). Any violation of these Terms of Service by any member will be taken upon by the staff team to review and implicate the necessary punishments. Please do read the terms carefully.`)
            message.channel.send(embed2);
         }
      }
      else if (args[0] === "roles") {
         if (args[1] === "0") {
            let channelsEmbed = new Discord.MessageEmbed()
               .setColor("#FF0000")
               .attachFiles([`./images/roles.png`])
               .setImage(`attachment://roles.png`)
            message.channel.send(channelsEmbed);
         }
         else if (args[1] === "1") {
            let channelsEmbed = new Discord.MessageEmbed()
               .setColor("#FF0000")
               .setTitle("Level-Up Roles")
               .setDescription(
                  "You can get these roles by ranking up in server.You can get 15-25 XPs by sending a message per minute.\n\n" +                  
                  `<@&845708458242342912>(Level 50+)\n` +
                  `<@&845708038794772481>(Level 35)\n` +
                  `<@&845708128430718976>(Level 20)\n` +
                  `<@&845707809524809769>(Level 10)\n` +
                  `<@&834825638376505364>(Level 0)\n`)
            message.channel.send(channelsEmbed);
         }
         
         else if (args[1] === "2") {
            let channelsEmbed = new Discord.MessageEmbed()
               .setColor("#FF0000")
               .setTitle("Alliance Roles")
               .setDescription(
                  "Roles related to alliances in Kingdom of Wafura.\n\n" +
                  `<@&834824971238506507> : These are leaders of top 25 alliances.\n` +
                  `Alliance Name Roles : You can get these roles by executing the self-role command. Only Top 15 Alliances have their own specfic role.\n`+
                  `<@&834825655874093067> : These are the bots of server.\n` )
            message.channel.send(channelsEmbed);
         }
      }
      else if (args[0] === "channels") {

         if (args[1] === "0") {
            let channelsEmbed = new Discord.MessageEmbed()
               .setColor("#FF0000")
               .attachFiles([`./images/channels.png`])
               .setImage(`attachment://channels.png`)
            message.channel.send(channelsEmbed);
         }
         else if (args[1] === "1") {
            let channelsEmbed = new Discord.MessageEmbed()
               .setColor("#FF0000")
               .setTitle("INFO")
               .setDescription(
                  "This category contains server's information, updates about game,kingdom and server.\n\n" +
                  "<#845702654826774539> : This channel contains all the rules and channels info.\n" +
                  "<#834826660233609287> : You will be updated here with **Server** announcements.\n"+
                  "<#841084570552369162> : Rok offical discord announcements are shown in this channel.\n"
                  )
            message.channel.send(channelsEmbed);
         }
         else if (args[1] === "2") {
            let channelsEmbed = new Discord.MessageEmbed()
               .setColor("#FF0000")
               .setTitle("COMMUNITY")
               .setDescription(
                  "This category contains general discussion channels.\n\n" +
                  "<#834823977343647827> : Just what you looking for. General discussions channel.\n" +
                  "<#834829009056956418> : Recruit players here.\n" +
                  "<#834832662052995082> : Reddit Feed of Rok will be shown here.\n" +
                  "<#839174330931478568> : All Bot commands work here.")
            message.channel.send(channelsEmbed);
         }

         else if (args[1] === "3") {
            let channelsEmbed = new Discord.MessageEmbed()
               .setColor("#FF0000")
               .setTitle("MY ALLIANCE")
               .setDescription(
                  "This category contains individual channels for top 15 alliances. Only channel of your own alliance will be shown here.\n\n")
            message.channel.send(channelsEmbed);
         }
           else if (args[1] === "4") {
            let channelsEmbed = new Discord.MessageEmbed()
               .setColor("#FF0000")
               .setTitle("═ VOICE CHANNELS【📻】═")
               .setDescription(
                  "Finally Voice Channels are here.\n\n" +
                  "【🎧】Lobby\n" +
                  "【🎧】General")
            message.channel.send(channelsEmbed);
         }

      }
      else if (args[0] === "faqs") {

         let formLink = "https://forms.gle/QMMate2Ur93pAswb7";
         let permanentLink = "https://discord.gg/rA2bAAZQaB";

         if (args[1] === "0") {
            let channelsEmbed = new Discord.MessageEmbed()
               .setColor("#FF0000")
               .attachFiles([`./images/links.png`])
               .setImage(`attachment://links.png`)
            message.channel.send(channelsEmbed);
         }

         else if (args[1] === "1") {
            let q1 = "https://discord.com/channels/834823977343647825/845702654826774539/845718529290534933";
            let q2 = "https://discord.com/channels/834823977343647825/845702654826774539/845718588156543027";
            let q3 = "https://discord.com/channels/834823977343647825/845702654826774539/845718735829991464";
            let q4 = "https://discord.com/channels/834823977343647825/845702654826774539/845718925072924723";
            let q5 = "https://discord.com/channels/628512144454975489/696971433384869888/782950841354420235";

            let channelsEmbed = new Discord.MessageEmbed()
            .setColor("#FF0000")
            .addField("Rok Google Play", `https://play.google.com/store/apps/details?id=com.lilithgame.roc.gp&hl=en_US`)
            .addField("Rok AppStore", `https://itunes.apple.com/app/id1354260888`)
            .addField("Rok Reddit", `https://www.reddit.com/r/RiseofKingdoms/`)
            .addField("Rok Twitter", `https://twitter.com/RiseofKingdoms`)
            .addField("Rok Discord", `https://discord.gg/riseofkingdoms`)
            .addField("Rok Wiki", `https://riseofkingdoms.fandom.com/wiki/Rise_of_Kingdoms_Wiki`)

            .addField("\nQuick Links", `[Welcome Screen](${q1})\n[Rules](${q2})\n[Roles Info](${q3})\n[Channels Info](${q4})\n\n`)
   
            message.channel.send(channelsEmbed);
         }
      }

      else if (args[0] === "rules") {

         if (args[1] === "0") {
            let channelsEmbed = new Discord.MessageEmbed()
               .setColor("#FF0000")
               .attachFiles([`./images/rules.png`])
               .setImage(`attachment://rules.png`)
            message.channel.send(channelsEmbed);
         }
         else if (args[1] === "1") {
            let channelsEmbed = new Discord.MessageEmbed()
               .setColor("#FF0000")
               .setDescription(
                  "\*\*Follow these rules & Discord's TOS and do not try to exploit any loophole in the rules.\*\*\n\n" +
                  "\*\*Behaviour\*\* : Treat everyone well.Do not harass or discriminate.\n\n" +
                  "\*\*Spam\*\* : Don't spam in any way you can think of.\n\n" +
                  "\*\*Nicknames & Profile Picture\*\* : No Blank,inappropriate,sexually explicit or offensive nicknames/profile picture.\n\n" +                  
                  "\*\*Swearing\*\* : Swearing is allowed so long as it isn't directed at another member. Keep overall searing it to minimum.\n\n" +                  
                  "\*\*Advertisment\*\* : No advertisment of any kind.\n\n" +
                  "\*\*Voice Channels\*\* : Don't Yell.\n\n" +
                  "\*\*Appropriate Channels\*\* : Don't go off-topic in channels that serve specific purpose.\n\n" +                  
                  "Do not try to argue with Staff. Staff reserves right to use their own discretion regardless of any rule.")
            message.channel.send(channelsEmbed);
         }
      }
   },
};