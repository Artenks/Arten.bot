const usersLevel = require("../models/usersLevel");

module.exports = async (interaction, especifcId) => {
  let userId;
  let username;
  let guildId;
  let level;
  let xp;

  if (especifcId == null) {
    await usersLevel
      ?.findOne({ _id: interaction.user.id })
      .then(async (user) => {
        userId = user?._id;
        username = user?.username;
        user?.Guild.map(async (guild) => {
          if (guild?._id == interaction.guildId) {
            guildId = guild?._id;
            level = guild?.level;
            xp = guild?.xp;
          }
        });
      });

    return {
      userId: userId,
      username: username,
      guildId: guildId,
      level: level,
      xp: xp,
    };
  }

  await usersLevel?.findOne({ _id: especifcId }).then(async (user) => {
    userId = user?._id;
    username = user?.username;
    user?.Guild.map(async (guild) => {
      if (guild?._id == interaction.guildId) {
        guildId = guild?._id;
        level = guild?.level;
        xp = guild?.xp;
      }
    });
  });

  return {
    userId: userId,
    username: username,
    guildId: guildId,
    level: level,
    xp: xp,
  };
};
