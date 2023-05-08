//calculo = baseValue * multiplicator * level

const usersLevel = require("../models/usersLevel");
const cooldowns = new Set();

let xpPerMessage = 10;
let multiplicatorPerLevel = 5;
let baseValueToReach = 5;

async function updateInfos(arg, author, level, xp) {
  let userExistInGuild;
  let userExist;
  await usersLevel.findOne({ _id: author.id }).then((user) => {
    user?.Guild.map((guild) => {
      if(user._id == author.id){
        userExist = true;
      }
      else{
        userExist = false;
      }
      if (guild._id == arg.guildId && user._id == author.id) {
        userExistInGuild = true;
      } else {
        userExistInGuild = false;
      }
    });
  });

  async function writeGuild(pushGuild) {

    if(pushGuild){
      await usersLevel.findOne({ _id: author.id }).then(async (user) => {
        user.Guild.push({
          _id: arg.guildId,
          xp: xp,
          level: level,
        })
        user.save();
      });
      return;
    }
    await usersLevel.findOne({ _id: author.id }).then(async (user) => {
      user.Guild.map((guild) => {
        if (guild._id == arg.guildId) {
          guild.level = level;
          guild.xp = xp;

          user.save();
        }
      });
    });
  }

  if (userExistInGuild) {
    await usersLevel.findOne({ _id: author.id }).then(async (user) => {
      user.username = author.username;
      user.save();
      await writeGuild(false);
    });
    return;
  }

  if(userExist){
    await usersLevel.findOne({ _id: author.id }).then(async (user) => {
      await writeGuild(true);
    });
    return;
  }
  
  await usersLevel.create({
    _id: author.id,
    username: author.username,
    Guild: {
      _id: arg.guildId,
      xp: xp,
      level: level,
    },
  });
}

async function guildInfo(author, arg) {
  let level;
  let xp;
  await usersLevel.findOne({ _id: author.id }).then(async (user) => {
    user.Guild.map(async (guild) => {
      if (guild._id == arg.guildId) {
        level = guild.level;
        xp = guild.xp;
      }
    });
  });
  return { level: level, xp: xp };
}

function newUser() {
  console.log("~ Usuário novo zerando sua pontuação");

  return { level: 0, xp: 0 };
}

async function xpMethod(client, author, arg) {
  await xpToGain(client, author, arg);
}
async function xpToGain(client, author, arg) {
  if (cooldowns.has(author.id)) return;

  let userExistInGuild;
  await usersLevel.findOne({ _id: author.id }).then((user) => {
    user?.Guild.map((guild) => {
      if (guild._id == arg.guildId && user._id == author.id) {
        userExistInGuild = true;
      } else {
        userExistInGuild = false;
      }
    });
  });

  let level = 0;
  let xp = 0;

  if (userExistInGuild) {
    console.log(`${author.username}: existe na lista de dados`);
    let user = await guildInfo(author, arg);

    xp = user.xp;
    level = user.level;
  } else {
    const user = await newUser();
    level = user.level;
    xp = user.xp;
  }
  let valueToReach = baseValueToReach * multiplicatorPerLevel * (level + 1);
  xp += xpPerMessage;
  console.log(`${xp}xp ~ +${xpPerMessage}`);
  if (xp >= valueToReach) {
    level++;
    console.log(`${author.username} upou seu level para ${level}`);
    const rightChannel = client.channels.cache.find(
      (channel) => channel.id === "1103190105595858975"
    );
    rightChannel.send(
      `<@${author.id}> >> **${level}Lvl ** *~ "${arg.content}*"`
    );
    xp = xp - valueToReach;
  }

  cooldowns.add(author.id);
  setTimeout(() => {
    cooldowns.delete(author.id);
  }, 1000);

  await updateInfos(arg, author, level, xp);
}

module.exports = (client, author, arg) => {
  xpMethod(client, author, arg);
};
