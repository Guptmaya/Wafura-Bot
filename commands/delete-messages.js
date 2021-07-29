const Discord = require("discord.js")
module.exports = {
  name: 'delete-messages',
  desciption: 'hello command',
  aliases: ['d-m'],
  guildOnly: true,
  usage: '<user> <amount of messages> <reason>',
  cooldown: 3600,
  args: true,
  async execute(bot, message, args) {
   
    
   if(!message.guild.members.cache.get(message.author.id).roles.cache.some(role => role.id === '710968213634285568')) return message.channel.send('You must have \`Gunman\` role to run this command.');
    

    //Fail Embeds - If user doesnt use the command correctly.
    function failEmbed(reply) {
      let uName = message.author.tag;
      let tIcon = message.author.displayAvatarURL();
      let embed = new Discord.MessageEmbed()
        .setAuthor(uName, `${tIcon}`)
        .setColor("#fefeff")
        .setDescription(reply);
      message.channel.send(embed).then(r => r.delete({ timeout: 5000 }));
    }

    //getting the user - through mention or id
    const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    if (!user) return failEmbed(`🕵️ Invalid User.`); //if user not found return
    //getting the amount of messages to delete
    var amount = parseInt(args[1]);
    if (!amount) return failEmbed(`🕵️ Too few arguments given.\nUsage:\n\`p!delete-messages <user> <amount of messages> <reason>\``);
    //setting the range form 0 to 100
    if (amount > 100) return failEmbed(`🕵️ Maximum limit reached.\n Please mention a number lesser than 100.`);
    if (amount <= 0) return failEmbed(`🕵️ Minimum limit reached.\n Please mention a number higher than 0.`)

    //getting the reason to delete the messages
    let reason = args.slice(2).join(' ');
    if (!reason) return failEmbed(`🕵️ Too few arguments given.\nUsage:\n\`p!delete-messages <user> <amount of messages> <reason>\``);


    //fetch the user's messages and delete them
    message.channel.messages.fetch({ limit: amount })
      .then((messages) => {
        //filter messages based on user's id
        messages = messages.filter(m => m.author.id === user.id);
        //delete the messages
        message.channel.bulkDelete(messages).catch(error => console.log(error.stack));

        //sending embed that messages has been deleted to user.
        let uName = message.author.tag;
        let tIcon = message.author.displayAvatarURL();
        let embed = new Discord.MessageEmbed()
          .setAuthor(uName, `${tIcon}`)
          .setColor("#FF0000")
          .setDescription(`${messages.size} messages by ${user.nickname} has been deleted.`);
        message.channel.send(embed).then(r => r.delete({ timeout: 5000 }));

        //sending details of action in log channel
        let professor = message.guild.channels.cache.find(x => x.id === "773534884077240330");
        let secondemebed = new Discord.MessageEmbed()
         .setColor("#FF0000")
          .setTitle("Message Deletion Report")
          .addField("Action Performed by :", `<@${message.author.id}> \*\*-\*\* ${message.author.id}`)
          .addField("Action Performed on :", `<@${user.id}> \*\*-\*\* ${user.id}`)
          .addField("Number of Messages :", messages.size)
          .addField("Reason :", reason)
          .addField("In-Channel :", message.channel.name)
          .setTimestamp(message.createdAt);
        professor.send(secondemebed);
      })
      .catch(console.error);

  },
};