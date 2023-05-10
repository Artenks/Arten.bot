const usersLevel = require("../models/usersLevel");

module.exports = async (interaction) => {
  try {
    let usersInGuild = []

    let _id;
    let username;
    let level;
    let xp;

    for (var user of interaction.member.guild.members.cache) {
      user.map(async (userInfo) => {
        if (userInfo?.user == null) return;

        getUser(userInfo.user.id, interaction).then(async () => {
          if (username != null) {
            usersInGuild.push({
                _id: _id,
                username: username,
                level: level,
                xp: xp,
            });
            return;
          }
        });
      });
    }

    async function getUser(userId, interaction) {
      await usersLevel?.findOne({ _id: userId }).then(async (user) => {
        username = user?.username;
        _id = user?._id;
        user?.Guild.map(async (guild) => {
          if (guild?._id == interaction.guildId) {
            level = guild?.level;
            xp = guild?.xp;
          }
        });
        if (level == null) {
          username = null;
          _id = null;
        }
      });
    }
    return await usersInGuild;
  } catch (err) {}
};
