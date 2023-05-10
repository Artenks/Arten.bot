const {
  ApplicationCommandOptionType, PermissionFlagsBits
} = require("discord.js");
const guildDefineLog = require("../../utils/guildDefineLog");

module.exports = {
  name: "definir-log",
  description: "Comando para definir log em que o comunicará seus eventos.",
  options: [
    {
      name: "canal",
      description: "Endereço do canal.",
      required: true,
      type: ApplicationCommandOptionType.Channel,
    },
  ],

  PermissionsRequired: [PermissionFlagsBits.Administrator],
  botPermissions: [PermissionFlagsBits.Administrator],

  callback: (client, interaction) => {
    if(interaction.options.get("canal").channel.type != 0){
      interaction.reply("**Calma aí!** eu preciso de um canal de texto para esse comando. :face_with_monocle:")
      return;
    }
    guildDefineLog(interaction);
  },
};
