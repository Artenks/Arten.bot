module.exports = async (client, guildId) => {
  let applicationCommands = [];
  for (var i = 0; i < guildId.length;i++) {
    console.log(guildId[i]);
    if (guildId[i]) {
      const g = await client.guilds.fetch(guildId[i]);
      applicationCommands.push(g.commands);
    } else {
      applicationCommands.push(await client.application.commands);
    }
    await applicationCommands[i].fetch();
  }
  return applicationCommands;
};
