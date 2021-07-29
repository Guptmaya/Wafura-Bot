const Discord = require("discord.js")
const HeistCount = require('../models/Heist');
const mongoose = require('mongoose');
const { Client } = require('unb-api');
const client = new Client('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBfaWQiOiI3NTkzODk2MDE0NjczMzQ3NTUiLCJpYXQiOjE2MDExMjI5ODl9.lh8iK89-qjtrMMiFK24ZcrB15Bkii88P6dtYBJFqqPQ');
module.exports = {
  name: 'get-guns',
  desciption: 'hack test command',
  guildOnly: true,
  usage: '<no args>',
  validChannels: '【🤖】bot-commands',
  cooldown: 10,
  args: false,
  async execute(bot, message, args) {

    const hasEveryRole = roles => {
      return roles.every(roleid => message.member.roles.cache.some(role => role.id === roleid))
    }
    if ((hasEveryRole(["665284350459248643"])) || (hasEveryRole(["665284401952980993"])) || (hasEveryRole(["665284448723402765"]))) return message.channel.send('You have already got guns for this heist.');


    //code starts here
    function getRndInteger(mini, maxx) {
      return Math.floor(Math.random() * (maxx - mini + 1)) + mini;
    }

    let userIcon = message.author.displayAvatarURL();
    let userTag = message.author.tag;

    //final message to show when guns are chosen
    function embedCreate(des) {
      let description = 'Guns Acquired - ' + '\*\*' + des + '\*\*';
      let finalEmbed = new Discord.MessageEmbed()
        .setAuthor(userTag, `${userIcon}`)
        .setDescription(description)
      return finalEmbed;
    }

    //either buy,steal or luck
    let OptionEmbed = new Discord.MessageEmbed()
      .setTitle("Prep Task - Get Guns")
      .setAuthor(userTag, `${userIcon}`)
      .setDescription(`You have three options to get guns.\n🔸Buy\n🔸Steal\n🔸Luck.\n\n Buy and Steal are as the name say,buy them from black market or steal them from there.\n` +
        `However for Luck, you can bid and see if your luck helps you get those guns or not for less price than buying them.`)
      .setFooter('Simply write down your option.For Example - Buy')
    message.channel.send(OptionEmbed);
    const filter = m => m.author.id === message.author.id;


    //taking input from user for BUY STEAL OR LUCK
    message.channel.awaitMessages(filter, { max: 1, time: 60000 }).then(async collected => {
      let checkAnswer = collected.first().content;
      checkAnswer = checkAnswer.toLowerCase();
      //if user chose to buy them
      if (checkAnswer === "buy" || checkAnswer === "1") {
        let buyEmbed = new Discord.MessageEmbed()
          .setTitle("Get Guns - Buying")
          .setAuthor(userTag, `${userIcon}`)
          .setDescription(`Your gunman comes with variety of weapons I guess.\n\n🔹Fake_Weapons (<:MH_aaaaaa:638802960998072329>1000) - Well if you wanna risk your life go for it.\n🔹Weapons1.0 (<:MH_aaaaaa:638802960998072329>5000) - Cheap and Better than fake atleast.\n🔹Weapons2.0 (<:MH_aaaaaa:638802960998072329>10000) - Higher You Pay, Better you get.\n\n Keep in mind the weapons will decide the course of action if you were to be found out while robbing the bank.\n`)
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
          if (checkAnswer === "fake_weapons" || checkAnswer === "1") {
            if (totall >= 1000) {
              role = message.member.guild.roles.cache.find(role => role.id === "665284350459248643");
              message.member.roles.add(role);
              client.editUserBalance(message.guild.id, message.author.id, { bank: -1000 });
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
              await HeistCount.findOneAndUpdate({ userID: message.author.id, guildID: message.guild.id }, { guns: 'Fake Weapons', lastEdited: Date.now() });
              return message.channel.send(embedCreate('Fake Weapons'));
            }
            else {
              return message.channel.send('You do not have enough money to buy these weapons.\nCome back later when you have money.');
            }

          }
          else if (checkAnswer === "weapons1.0" || checkAnswer === "2") {
            if (totall >= 5000) {
              role = message.member.guild.roles.cache.find(role => role.id === "665284401952980993");
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
              await HeistCount.findOneAndUpdate({ userID: message.author.id, guildID: message.guild.id }, { guns: 'Weapons 1.0', lastEdited: Date.now() });
              return message.channel.send(embedCreate('Weapons 1.0'));
            }
            else {
              return message.channel.send('You do not have enough money to buy these weapons.\nCome back later when you have money.');
            }

          }
          else if (checkAnswer === "weapons2.0" || checkAnswer === "3") {
            if (totall >= 10000) {
              role = message.member.guild.roles.cache.find(role => role.id === "665284448723402765");
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
              await HeistCount.findOneAndUpdate({ userID: message.author.id, guildID: message.guild.id }, { guns: 'Weapons 2.0', lastEdited: Date.now() });
              return message.channel.send(embedCreate('Weapons 2.0'));
            }
            else {
              return message.channel.send('You do not have enough money to buy these weapons.\nCome back later when you have money.');
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


        //first user has to shoot down the delievery van
        function shootDownDelieveryVan() {
          let trees = ['🌲', '🌳']; //types of trees
          let mountains = ['🗻', '🏔️']; //types of mountains
          let roadBlock = ['🔳', '🚓']; //types of mountains
          let isSpy = false; //wheather wanna show spy or not
          //position of spy (x,y)
          let xCoordinateofSpy = getRndInteger(0, 2);
          let yCoordinateofSpy = getRndInteger(0, 8);
          //make the basic pattern to show
          function getPattern(isSpy, xCoordinateofSpy, yCoordinateofSpy) {

            //final format of message
            let finalPattern = '';

            let Spy = '🚌';
            let isSpyTF = isSpy;

            //title of message. To make the emojis smaller
            let title = ["\*\*Shoot down the Delievery Van\*\*\n\n", "\*\*Shoot down the Delievery Van\*\*\nWrite position(Example - a1)\n\n"];
            if (isSpyTF) {
              finalPattern += title[1];
            }
            else {
              finalPattern += title[0];
            }

            let xCoordinateofSpyy = xCoordinateofSpy;
            let yCoordinateofSpyy = yCoordinateofSpy;

            for (var i = 0; i < 3; i++) {
              for (var j = 0; j <= 9; j++) {
                if (isSpyTF && (i == xCoordinateofSpyy && j == yCoordinateofSpyy)) {
                  finalPattern += Spy;
                }
                else {
                  if (i == 0 && j < 10) {
                    finalPattern += mountains[getRndInteger(0, 1)];
                  }
                  else if (i == 1 && j < 10) {
                    let chancesOfCar = getRndInteger(1, 100);
                    if (chancesOfCar >= 1 && chancesOfCar <= 80) { finalPattern += roadBlock[0]; }
                    else { finalPattern += roadBlock[1]; }
                  }
                  if (i == 2) {

                    finalPattern += trees[getRndInteger(0, 1)];
                  }
                  else if (j == 9 && j < 10) {
                    finalPattern += '\n';
                  }
                }
              }
            }
            return finalPattern;
          }


          let introEmbed = new Discord.MessageEmbed()
            .setAuthor(userTag, `${userIcon}`)
            .setDescription(`Shoot down the van thats delivering the weapons to a Private Facility.\n` +
              `You will have 10 seconds to tell the position of van to sniper.\n\n` +
              `Write the \`position(x y)\` coordinates of spy(🚌) when you see him.\n` +
              `x - can be a,b or c depending upon the row\n` +
              `y - can be 1 to 9 depending upon the column\n\n` +
              `\*\*For Example : \*\*a5 \*\*or\*\* b7 \*\*or\*\* c1`)
            .setFooter(`ps - Just like in Chess`)


          let embed = new Discord.MessageEmbed()
            .setDescription(getPattern(isSpy, xCoordinateofSpy, yCoordinateofSpy))

          let embed2 = new Discord.MessageEmbed()
            .setDescription(getPattern(isSpy, xCoordinateofSpy, yCoordinateofSpy))

          let embed3 = new Discord.MessageEmbed()
            .setDescription(getPattern(isSpy, xCoordinateofSpy, yCoordinateofSpy))

          let embed4 = new Discord.MessageEmbed()
            .setDescription(getPattern('true', xCoordinateofSpy, yCoordinateofSpy))



          console.log(xCoordinateofSpy);
          console.log(yCoordinateofSpy);

          message.channel.send(introEmbed).then((msg) => {
            setTimeout(async function () {
              await msg.edit(embed).then((msg) => {
                setTimeout(async function () {
                  await msg.edit(embed2).then((msg) => {
                    setTimeout(async function () {
                      await msg.edit(embed3).then((msg) => {
                        setTimeout(async function () {
                          await msg.edit(embed4);
                        }, 1000)
                      })
                    }, 1000)
                  })
                }, 1000)
              })
            }, 5000)
          })

          let answer0 = '';
          if (xCoordinateofSpy == 0) {
            answer0 += 'a';
          } else if (xCoordinateofSpy == 1) {
            answer0 += 'b';
          } else if (xCoordinateofSpy == 2) {
            answer0 += 'c';
          }

          //taking input from user
          message.channel.awaitMessages(filter, { max: 1, time: 30000 }).then(async collected => {
            yCoordinateofSpy++;
            answer0 += yCoordinateofSpy;
            console.log(answer0);

            let checkAnswer3 = collected.first().content;
            checkAnswer3 = checkAnswer3.toLowerCase();

            if (checkAnswer3 === answer0) {

             message.channel.send(`Well done, now take those weapons to your base of operations.`)


              //deliever the van to base of operations
              function delieverWeapons() {

                let descriptionn = "Deliever the Weapons to Base of Operations 🏠\n Use a,s,w,d for navigations. Directions are respective to van.\nType \`stop\` to stop delievering";
                let embeddd = new Discord.MessageEmbed()
                  .setTitle("Get Guns - Delievering Weapons")
                  .setAuthor(userTag, `${userIcon}`)
                  .setDescription(descriptionn)
                message.channel.send(embeddd).then(r => r.delete({ timeout: 20000 }));
      
                setTimeout(function () {
      
                  let carNumber = getRndInteger(1, 2);
      
                  function getPattern(xCoordinateofCar, yCoordinateofCar, xCoordinateofParking, yCoordinateofParking, carNumber, carPosition) {
                    let newPattern = '';
                    let cars = ['🚌', '🚌', '🚌'];
                    let cars2 = ['🚌', '🚌', '🚌'];
      
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
                        }case 'd':
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
                        }case 'stop':
                        {
                          let embed = new Discord.MessageEmbed()
                            .setAuthor(userTag, `${userIcon}`)
                            .setColor('#fefeff')
                            .setDescription("Delievery Stopped.")
                          message.channel.send(embed);
                          collector.stop();
                          break;
                        }default:
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
                      
                      role = message.member.guild.roles.cache.find(role => role.id === "665284401952980993");
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
                      await HeistCount.findOneAndUpdate({ userID: message.author.id, guildID: message.guild.id }, { guns: 'Weapons 1.0', lastEdited: Date.now() });
                      return message.channel.send(embedCreate('Weapons 1.0'));
      
                    }
      
                  });
      
                }, 13000)
      
              }
              delieverWeapons();
            }
            else {
              return message.channel.send("🕵️ Sniper missed the shot. Van delievered the weapons to facility.")
            }
          }).catch(err => {
            console.log(err);
          })
        }
        shootDownDelieveryVan();
        

      }

      //if user chose to luck them out
      else if (checkAnswer === "luck" || checkAnswer === "3") {

        let luckPoints = getRndInteger(1, 20);

        if (hasEveryRole(["743070440586608690"])) { //boomer
          luckPoints += 100;
        } else if (hasEveryRole(["693211450843332643"])) { //server-booster
          luckPoints += 100;
        } else if (hasEveryRole(["780526004984348704"])) { //pro-hacker
          luckPoints += 40;
        } else if (hasEveryRole(["710967923920994397"])) { //hacker
          luckPoints += 25;
        } else if (hasEveryRole(["780526001327177778"])) { //pro-driver
          luckPoints += 20;
        } else if (hasEveryRole(["780526004660994120"])) { //driver
          luckPoints += 15;
        } else if (hasEveryRole(["713654463629623338"])) { //pro-gunman
          luckPoints += 10;
        } else if (hasEveryRole(["710968213634285568"])) { //gunman
          luckPoints += 5;
        } if (hasEveryRole(["869979279922954312"])) { //luck multiplier
          luckPoints += 20;
        }

        console.log(luckPoints);
        if (luckPoints >= 18 && luckPoints <= 44) {
          role = message.member.guild.roles.cache.find(role => role.id === "665284350459248643");
          message.member.roles.add(role);
          
          role = message.member.guild.roles.cache.find(role => role.id === "869979279922954312");
          message.member.roles.remove(role);

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
          await HeistCount.findOneAndUpdate({ userID: message.author.id, guildID: message.guild.id }, { guns: 'Fake Weapons', lastEdited: Date.now() });
          return message.channel.send(embedCreate('Fake Weapons'));
        }
        else if (luckPoints >= 45 && luckPoints <= 80) {
          role = message.member.guild.roles.cache.find(role => role.id === "665284401952980993");
          message.member.roles.add(role);
          role = message.member.guild.roles.cache.find(role => role.id === "869979279922954312");
          message.member.roles.remove(role);
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
          await HeistCount.findOneAndUpdate({ userID: message.author.id, guildID: message.guild.id }, { guns: 'Weapons 1.0', lastEdited: Date.now() });
          return message.channel.send(embedCreate('Weapons 1.0'));
        }
        else if (luckPoints >= 100) {
          role = message.member.guild.roles.cache.find(role => role.id === "665284448723402765");
          message.member.roles.add(role);
          role = message.member.guild.roles.cache.find(role => role.id === "869979279922954312");
          message.member.roles.remove(role);
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
          await HeistCount.findOneAndUpdate({ userID: message.author.id, guildID: message.guild.id }, { guns: 'Weapons 2.0', lastEdited: Date.now() });
          return message.channel.send(embedCreate('Weapons 2.0'));
        }
        else
        {
          return message.channel.send('Looks like you lost the bid. Better luck next time.');
        }
      }
      else { return message.channel.send('Hmm, I doubt if that was even an option. Try doing it again and read what I\'m telling you.'); }
    }).catch(err => {
      console.log(err);
    })


  },
};