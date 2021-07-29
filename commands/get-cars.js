const Discord = require("discord.js")
const HeistCount = require('../models/Heist');
const mongoose = require('mongoose');
const { Client } = require('unb-api');
const client = new Client('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBfaWQiOiI3NTkzODk2MDE0NjczMzQ3NTUiLCJpYXQiOjE2MDExMjI5ODl9.lh8iK89-qjtrMMiFK24ZcrB15Bkii88P6dtYBJFqqPQ');
module.exports = {
  name: 'get-cars',
  desciption: 'hack test command',
  guildOnly: true,
  validChannels: '【🤖】bot-commands',
  usage: '<no args>',
  cooldown: 10,
  args: false,
  async execute(bot, message, args) {

    const hasEveryRole = roles => {
      return roles.every(roleid => message.member.roles.cache.some(role => role.id === roleid))
    }
    if ((hasEveryRole(["870007957474123806"])) || (hasEveryRole(["870007879300681828"]))) return message.channel.send('You have already got cars for this heist.');


    //code starts here
    function getRndInteger(mini, maxx) {
      return Math.floor(Math.random() * (maxx - mini + 1)) + mini;
    }

    let userIcon = message.author.displayAvatarURL();
    let userTag = message.author.tag;

    //final message to show when guns are chosen
    function embedCreate(des) {
      let description = 'Cars Acquired - ' + '\*\*' + des + '\*\*';
      let finalEmbed = new Discord.MessageEmbed()
        .setAuthor(userTag, `${userIcon}`)
        .setDescription(description)
      return finalEmbed;
    }

    //either buy,steal or luck
    let OptionEmbed = new Discord.MessageEmbed()
      .setTitle("Prep Task - Get Cars")
      .setAuthor(userTag, `${userIcon}`)
      .setDescription(`You have two options to get cars.\n🔸Buy\n🔸Steal.\n\n Buy and Steal are as the name say,buy them from black market or steal them from there.\n`)
      .setFooter('Simply write down your option.For Example - Buy')
    message.channel.send(OptionEmbed);
    const filter = m => m.author.id === message.author.id;


    //taking input from user for BUY STEAL
    message.channel.awaitMessages(filter, { max: 1, time: 60000 }).then(async collected => {
      let checkAnswer = collected.first().content;
      checkAnswer = checkAnswer.toLowerCase();
      //if user chose to buy them
      if (checkAnswer === "buy" || checkAnswer === "1") {
        let buyEmbed = new Discord.MessageEmbed()
          .setTitle("Get Cars - Buying")
          .setAuthor(userTag, `${userIcon}`)
          .setDescription(`Variety of Cars to choose from eh.\n\n🔹Classic_Cars (<:MH_aaaaaa:638802960998072329>5000) - Classic ones are best if you know manual that is.\n🔹Sports_Cars (<:MH_aaaaaa:638802960998072329>10000) - Guess Sports ones would be the best,though they are costly.\n\n Keep in mind these are your gataway vehicles.\n`)
          .setFooter('Simply write down your option.For Example - 1')
        message.channel.send(buyEmbed);

        //input for buy option
        message.channel.awaitMessages(filter, { max: 1, time: 24000 }).then(async collected => {
          let checkAnswer = collected.first().content;
          checkAnswer = checkAnswer.toLowerCase();

          var role; //which weapon he will choose

          //getting his money
          const { total: totall } = await client.getUserBalance(message.guild.id, message.author.id);


          //if user chose to buy them
          if (checkAnswer === "classic_cars" || checkAnswer === "1") {
            if (totall >= 5000) {
              role = message.member.guild.roles.cache.find(role => role.id === "870007879300681828");
              message.member.roles.add(role);
              client.editUserBalance(message.guild.id, message.author.id, { bank: -5000 });
              let UserHeistDetails = await HeistCount.findOne({ userID: message.author.id, guildID: message.guild.id });
              if (!UserHeistDetails) {
                UserHeistDetails = await new HeistCount({
                  _id: mongoose.Types.ObjectId(),
                  userID: message.author.id,
                  guildID: message.guild.id,
                  lastEdited: Date.now()
                });
                await UserHeistDetails.save().catch(err => console.log(err));
              }
              await HeistCount.findOneAndUpdate({ userID: message.author.id, guildID: message.guild.id }, { cars: 'Classic Cars', lastEdited: Date.now() });
              return message.channel.send(embedCreate('Classic Cars'));
            }
            else {
              return message.channel.send('You do not have enough money to buy these cars.\nCome back later when you have money.');
            }

          }
          else if (checkAnswer === "sports_cars" || checkAnswer === "2") {
            if (totall >= 10000) {
              role = message.member.guild.roles.cache.find(role => role.id === "870007957474123806");
              message.member.roles.add(role);
              client.editUserBalance(message.guild.id, message.author.id, { bank: -10000 });
              let UserHeistDetails = await HeistCount.findOne({ userID: message.author.id, guildID: message.guild.id });
              if (!UserHeistDetails) {
                UserHeistDetails = await new HeistCount({
                  _id: mongoose.Types.ObjectId(),
                  userID: message.author.id,
                  guildID: message.guild.id,
                  lastEdited: Date.now()
                });
                await UserHeistDetails.save().catch(err => console.log(err));
              }
              await HeistCount.findOneAndUpdate({ userID: message.author.id, guildID: message.guild.id }, { cars: 'Weapons 1.0', lastEdited: Date.now() });
              return message.channel.send(embedCreate('Sports Cars'));
            }
            else {
              return message.channel.send('You do not have enough money to buy these cars.\nCome back later when you have money.');
            }

          }
          else {
            return message.channel.send('I don\'t think that was an option.\nDo it again carefully.');
          }
        }).catch(err => {
          console.log(err);
        })



      }

      //if user chose to steal them
      else if (checkAnswer === "steal" || checkAnswer === "2") {

        var carCounter = 0;
        //first user has to shoot down the delievery van
        //deliever the van to base of operations
        function delieverWeapons() {
          let descriptionn = "Deliever the Cars to Base of Operations 🏠\n Use a,s,w,d for navigations. Directions are respective to car.\nType \`stop\` to stop delievering";
          let embeddd = new Discord.MessageEmbed()
            .setTitle("Get Cars - Delievering Gataway Vehicles")
            .setAuthor(userTag, `${userIcon}`)
            .setDescription(descriptionn)
          message.channel.send(embeddd).then(r => r.delete({ timeout: 10000 }));

          setTimeout(function () {

            let carNumber = getRndInteger(0, 1);

            function getPattern(xCoordinateofCar, yCoordinateofCar, xCoordinateofParking, yCoordinateofParking, carNumber, carPosition) {
              let newPattern = '';
              let cars = [];
              let cars2 = [];

              if (carCounter == 0) {
                cars = ['🚕', '🚙'];
                cars2 = ['🚕', '🚙'];
              }
              else{ 
                cars = ['🏎️', '🚗'];
                cars2 = ['🏎️', '🚗'];
              }

              for (var i = 0; i <= 9; i++) {
                for (var j = 0; j <= 12; j++) {
                  if (i === 0 || i === 9) {
                    newPattern += '🟪';
                  }
                  else if (j === 0 || j === 12) {
                    newPattern += '🟪';
                  }
                  else if (i === xCoordinateofCar && j === yCoordinateofCar) {
                    if (carPosition === "horizontal") {
                      newPattern += cars[carNumber];
                    }
                    else {
                      newPattern += cars2[carNumber];
                    }

                  }
                  else if (i === xCoordinateofParking && j === yCoordinateofParking) {
                    newPattern += '🏠';
                  }
                  else {
                    newPattern += '⬛';
                  }
                }
                newPattern += "\n";
              }
              return newPattern;
            }
            function getXdirections(xDistance) {
              let answer1 = '';
              if (xDistance < 0) { answer1 += 'd'; }
              else if (xDistance === 0) { answer1 += '-'; }
              else {
                answer1 += 'a';
              }
              return answer1;
            }
            function getYdirections(yDistance) {
              let answer2 = '';
              if (yDistance < 0) { answer2 += 's'; }
              else if (yDistance === 0) { answer2 += '-'; }
              else {
                answer2 += 'w';
              }
              return answer2;
            }
            function getnewPattern(newPattern) {
              let userIcon = message.author.displayAvatarURL();
              let userTag = message.author.tag;
              let embedd = new Discord.MessageEmbed()
                .setAuthor(userTag, `${userIcon}`)
                .setDescription(newPattern)
                .setFooter("Directions are represented by a,s,w,d.");
              message.channel.send(embedd);
            }
            function bumpedWall(userTag, userIcon) {
              let embed = new Discord.MessageEmbed()
                .setAuthor(userTag, `${userIcon}`)
                .setColor('#fefeff')
                .setFooter("You crashed into Wall.\n Be Careful next time.");
              return message.channel.send(embed);

            }

            //corrdinate system
            let answer1 = '';
            let answer2 = '';
            let answer = '';
            var xCoordinateofParking = getRndInteger(1, 8);
            var yCoordinateofParking = getRndInteger(1, 11);
            console.log("P - " + xCoordinateofParking + "-" + yCoordinateofParking);

            var xCoordinateofCar = getRndInteger(1, 8);
            var yCoordinateofCar = getRndInteger(1, 11);
            console.log("C - " + xCoordinateofCar + "-" + yCoordinateofCar);

            var xDistance = yCoordinateofCar - yCoordinateofParking;
            var yDistance = xCoordinateofCar - xCoordinateofParking;
            console.log("x distance - " + xDistance);
            console.log("y distance - " + yDistance);

            //pattern formation
            let newPattern = getPattern(xCoordinateofCar, yCoordinateofCar, xCoordinateofParking, yCoordinateofParking, carNumber, "horizontal");

            //assigning directions
            answer1 = getXdirections(xDistance);
            answer2 = getYdirections(yDistance);

            //special cases
            if (answer1 === "-" && answer2 !== "-") {
              answer = answer2;
            }
            else if (answer1 !== "-" && answer2 === "-") {
              answer = answer1;
            }
            else {
              answer = `${answer1}${answer2}`;
            }
            console.log(answer);

            if (xCoordinateofCar === xCoordinateofParking && yCoordinateofCar === yCoordinateofParking) {
              getEmbed();
            }

            //interface
            let embedd = new Discord.MessageEmbed()
              .setAuthor(userTag, `${userIcon}`)
              .setDescription(newPattern)
              .setFooter("Directions are represented by a,s,w,d.");
            message.channel.send(embedd);


            const collector = message.channel.createMessageCollector(filter);

            collector.on('collect', async m => {
              let check = m.content;
              check = check.toLowerCase();
              switch (check) {
                case 'a':
                  {
                    yCoordinateofCar = yCoordinateofCar - 1;
                    newPattern = getPattern(xCoordinateofCar, yCoordinateofCar, xCoordinateofParking, yCoordinateofParking, carNumber, "vertical");
                    getnewPattern(newPattern);
                    break;
                  } case 'd':
                  {
                    yCoordinateofCar = yCoordinateofCar + 1;
                    newPattern = getPattern(xCoordinateofCar, yCoordinateofCar, xCoordinateofParking, yCoordinateofParking, carNumber, "vertical");
                    getnewPattern(newPattern);
                    break;
                  } case 'w':
                  {
                    xCoordinateofCar = xCoordinateofCar - 1;
                    newPattern = getPattern(xCoordinateofCar, yCoordinateofCar, xCoordinateofParking, yCoordinateofParking, carNumber, "horizontal");
                    getnewPattern(newPattern);
                    break;
                  } case 's':
                  {
                    xCoordinateofCar = xCoordinateofCar + 1;
                    newPattern = getPattern(xCoordinateofCar, yCoordinateofCar, xCoordinateofParking, yCoordinateofParking, carNumber, "horizontal");
                    getnewPattern(newPattern);
                    break;
                  } case 'stop':
                  {
                    let embed = new Discord.MessageEmbed()
                      .setAuthor(userTag, `${userIcon}`)
                      .setColor('#fefeff')
                      .setDescription("Delievery Stopped.")
                    message.channel.send(embed);
                    collector.stop();
                    break;
                  } default:
                  {
                    let incorectEmbed = new Discord.MessageEmbed()
                      .setAuthor(userTag, `${userIcon}`)
                      .setColor('#fefeff')
                      .setDescription("Incorrect input.\n Type \`a\` or \`w\` or \`s\` or \`d\`")
                    return message.channel.send(incorectEmbed);
                  }
              }
              for (var i = 0; i < 10; i++) {
                var j = 0;
                if (xCoordinateofCar === j && yCoordinateofCar === i) {
                  collector.stop();
                  bumpedWall(userTag, userIcon);
                }
                j = 9;
                if (xCoordinateofCar === j && yCoordinateofCar === i) {
                  collector.stop();
                  bumpedWall(userTag, userIcon);
                }
              }
              for (var i = 0; i < 10; i++) {
                var j = 0;
                if (xCoordinateofCar === i && yCoordinateofCar === j) {
                  collector.stop();
                  bumpedWall(userTag, userIcon);
                }
                j = 12;
                if (xCoordinateofCar === i && yCoordinateofCar === j) {
                  collector.stop();
                  bumpedWall(userTag, userIcon);
                }
              }
              if (xCoordinateofCar === xCoordinateofParking && yCoordinateofCar === yCoordinateofParking) {
                collector.stop();

                if (carCounter == 0) {
                  message.channel.send('First Car delivered successfully. Now onto second one.');
                }
                else {
                  role = message.member.guild.roles.cache.find(role => role.id === "870007879300681828");
                  message.member.roles.add(role);
                  let UserHeistDetails = await HeistCount.findOne({ userID: message.author.id, guildID: message.guild.id });
                  if (!UserHeistDetails) {
                    UserHeistDetails = await new HeistCount({
                      _id: mongoose.Types.ObjectId(),
                      userID: message.author.id,
                      guildID: message.guild.id,
                      lastEdited: Date.now()
                    });
                    await UserHeistDetails.save().catch(err => console.log(err));
                  }
                  await HeistCount.findOneAndUpdate({ userID: message.author.id, guildID: message.guild.id }, { cars: 'Classic Cars', lastEdited: Date.now() });
                  return message.channel.send(embedCreate('Classic Cars'));
                }
                carCounter++;


                delieverWeapons();

              }

            });

          }, 3000)

        }
        delieverWeapons();


      }

      else { return message.channel.send('Hmm, I doubt if that was even an option. Try doing it again and read what I\'m telling you.'); }
    }).catch(err => {
      console.log(err);
    })


  },
};