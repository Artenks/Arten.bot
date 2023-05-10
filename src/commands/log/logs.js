const {
  ApplicationCommandOptionType,
  PermissionFlagsBits,
} = require("discord.js");
const logToggle = require("../../utils/logToggle");

module.exports = {
  name: "logs",
  description: "Comando para desativar ou reativar os logs.",
  options: [
    {
      name: "escolha",
      description: "Escolha entre ativar ou desativar os logs",
      required: true,
      type: ApplicationCommandOptionType.Boolean,
      choices: [
        {
          name: "ativar",
          value: true,
        },
        {
          name: "desativar",
          value: false,
        },
      ],
    },
  ],

  PermissionsRequired: [PermissionFlagsBits.Administrator],
  botPermissions: [PermissionFlagsBits.Administrator],

  callback: (client, interaction) => {
    logToggle(interaction);
  },
};
