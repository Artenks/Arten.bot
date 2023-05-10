const getLevel = require("../../utils/getLevel");
const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "nivel",
  description: "Descubra o rank de um membro do servidor.",
  // devOnly: true,
  // testOnly: Boolean,
  options: [
    {
      name: "usuario",
      description: "descubra o rank de um usuário do servidor",
      type: ApplicationCommandOptionType.Mentionable,
    },
  ],

  callback: async (client, interaction) => {
    getLevel(interaction);
  },
};
