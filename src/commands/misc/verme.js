const {
  ApplicationCommandOptionType
} = require("discord.js");

module.exports = {
  name: "verme",
  description: "Verme maldito.",
  // devOnly: true,
  options: [
    {
      name: "usuario",
      description: "menção do verme maldito.",
      required: true,
      type: ApplicationCommandOptionType.Mentionable,
    },
  ],

  callback: (client, interaction) => {
    interaction.reply(`${interaction.options.get('usuario').member} *8VERME** :rat: `)
  },
};
