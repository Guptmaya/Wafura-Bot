const Discord = require("discord.js")
module.exports = {
  name: 'getlink',
  desciption: 'hello command',
  guildOnly: true,
  validChannels: '【🤖】bot-commands',
  cooldown: 10,
  args: false,
  async execute(bot, message, args) {

    let serverinfoChannel = message.guild.channels.cache.find(x => x.id === "696971433384869888"); //server info channel
    let invitelogChannel = message.guild.channels.cache.find(x => x.id === "787743080764669992"); //logs channel
    
    let invite = await serverinfoChannel.createInvite({
      maxAge:1800, // maximum time for the invite, in milliseconds
      maxUses: 1 // maximum times it can be used
    })
  .catch(console.log);
    
  console.log(invite);
  console.log(invite.url);

    let embed = await new Discord.MessageEmbed()
      .setTitle("Server Invite Link")
      .setColor("#FF0000")
      .setThumbnail(message.guild.iconURL())
      .setDescription(`Invite Link - ${invite.url}\n\n`+
      `\*\*Invite's Max Age  - \*\*${invite.maxAge/60} minutes\n`+
      `\*\*Invite's Max Use - \*\*${invite.maxUses}\n`)
    message.channel.send(embed);


    let logEmbed = new Discord.MessageEmbed()
    .setTitle("Invite & Inviter's Info")
    .setDescription(`\*\*Invite Created By -\*\* <@${message.author.id}> / ${message.author.id}\n`+
    `\*\*Invite Url - \*\*${invite.url}\n`+
    `\*\*Invite Code - \*\*${invite.code}\n`+
    `\*\*Invite Channel - \*\*${invite.channel}\n`+
    `\*\*Invite's Max Age  - \*\*${invite.maxAge/60} minutes\n`+
    `\*\*Invite's Max Use - \*\*${invite.maxUses}\n`+
    `\*\*Invite created at - \*\*${invite.createdAt}\n`+
    `\*\*Invite's Max Use - \*\*${invite.expiresAt}\n`+
    `\*\*Invite's Deleteable - \*\*${invite.deletable}\n`+
    `\*\*Invite's Uses - \*\*${invite.uses}\n`)
    .setThumbnail(message.author.displayAvatarURL())
    .setTimestamp(message.createdAt);
    invitelogChannel.send(logEmbed);

  },
};