const guildsInfo = require("../models/guildsInfo");

module.exports = async (interaction) => {
  const data = await guildsInfo?.findOne({ _id: "1" });

  const channel = interaction.options.get("canal").value;
  const guildId = interaction.guildId;

  if (data == null) {
    console.log("Criando data de guildsInfo");
    await guildsInfo.create({
      _id: 1,
      Guilds: [
        {
          _id: guildId,
          enable: true,
          channelLog: channel,
        },
      ],
    });
    return;
  }

  await guildsInfo.findOne({ _id: 1 }).then((guilds) => {
    guilds.Guilds.map(async (g) => {
      if (g._id === guildId) {
        g.channelLog = channel;
        guilds.save();
      } else {
        guilds.Guilds.push({
          _id: guildId,
          enable: true,
          channelLog: channel,
        });
        guilds.save();
      }
    });
  });

  interaction.reply(`Log de eventos definido para <#${channel}>`);
};
