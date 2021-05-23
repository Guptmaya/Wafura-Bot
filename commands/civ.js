const Discord = require("discord.js")
module.exports = {
  name: 'civ',
  desciption: 'gives you civilization info',
  guildOnly: true,
  usage: '<civilization name>',
  //cooldown: 10,
  args: false,
  async execute(bot, message, args) {

    let civToSearch = args[0];

    function createEmbed(civName,commanderName,specialUnit,buff1,buff2,buff3)
      { 
      let image = civName;
      civName = civName.toUpperCase();
      const civinfo = new Discord.MessageEmbed()
      .setColor("#FF0000")
      .attachFiles([`./images/${image}.jpg`])
      .setImage(`attachment://${image}.jpg`)
      .setDescription(
        ` \*\*${civName}\*\*\n\n`+
        `Starting Commander = \`${commanderName}\`\n` +
        `Special Unit = \`${specialUnit}\`\n\n` +
        `\*\*Traits\*\*\n` +
        `> ${buff1}\n > ${buff2}\n > ${buff3}\n\n`)
      .setFooter("Source - ROK")
    message.channel.send(civinfo);
    }
    if(civToSearch==="byzantium"){
      createEmbed("byzantium","Belisarius","Cataphract","Hospital Capacity +5%","Stone Gathering +10%","Cavalry Health +5%");
    }
    else if(civToSearch==="ottoman"){
      createEmbed("ottoman","Osman","Janissary","Troop Marching Speed +5%","Archer Health +5%","Active Skill Damage +5%");
    }
    else if(civToSearch==="arabia"){
      createEmbed("arabia","Baibars","Mamluk","Damage Dealt by Rallied Armies +5%","Archer HealthDamage Dealt by Rallied Armies +10%","Calvary Attack +5%");
    }
    else if(civToSearch==="korea"){
      createEmbed("korea","Eulji Mundeok","Hwarang","Hospital Capacity +15%","Research speed +3%","Archer defense +5%");
    }
    else if(civToSearch==="japan"){
      createEmbed("japan","Kusunoki Masashige","Samurai","Scout March Speed +30%","Resource Gathering Speed +5%","Troop Attack +3%");
    }
    else if(civToSearch==="china"){
      createEmbed("china","Sun Tzu","Chu-Ko-Nu","Building speed +5%","Actually point recovery +5%","Troop Defense +3%");
    }
    else if(civToSearch==="spain"){
      createEmbed("spain","Pelagius","Conquistador","Resource Production +20%","XP Gained from Barbarians and Neutral Units +10%","Calvary Defense +5%");
    }
    else if(civToSearch==="france"){
      createEmbed("france","Joan of Arc","Throwing Axeman","Hospital Healing Speed +20%","Wood Gathering Speed +10%","Troop HP +3%");
    }
    else if(civToSearch==="britain"){
      createEmbed("britain","Boudica","Longbowman","Ally Garrison Capacity +20%","Training speed +5%","Archer attack +5%");
    }
    else if(civToSearch==="germany"){
      createEmbed("germany","Herman","Teutonic Knight","Action point recovery +10%","Troop Training Speed +5%","Cavalry Attacked +5%");
    }
    else if(civToSearch==="rome"){
      createEmbed("rome","Scipio Africanus","Legionary","Troop Marching Speed +5%","Food Gathering Speed +10%","Infantry Defense +5%");
    }
    else {
      message.channel.send("Please write correct civilization name.");
    }

  },
};