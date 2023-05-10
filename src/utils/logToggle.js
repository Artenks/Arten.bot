const guildsInfo = require("../models/guildsInfo");

module.exports = async (interaction) => {
  const valueBool = interaction.options.get("escolha").value;

  try {
    await guildsInfo.findOne({ _id: 1 }).then((guilds) => {
      guilds.Guilds.map(async (g) => {
        if (g?._id === interaction.guildId) {
          g.enable = valueBool;
          guilds.save();
        }
      });
    });
  } catch (err) {
    interaction.reply(`**Peraí!** antes de tudo você precisa definir o canal dos logs com */definir-log*`)
    return;
  }

  if(valueBool){
    interaction.reply(`Log de eventos foi **ativado**`);
  }
  else{
    interaction.reply(`Log de eventos foi **desativado**`);
  }
};
