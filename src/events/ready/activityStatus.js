const { ActivityType } = require('discord.js');

module.exports = (client) => {
  client.user.setActivity({
    name: '~ Desenvolvido por @Artenks 🐀',
    type: ActivityType.Watching,
  })
};