const { ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');

module.exports = {
  deleted: true,
  name: 'ban',
  description: 'Banir membros do servidor',
  devOnly: true,
  options: [
    {
      name: 'target-user',
      description: 'Usuário alvo.',
      require: true,
      type: ApplicationCommandOptionType.Mentionable,
    },
    {
      name: 'reason-target',
      description: 'Razão do ato.',
      type: ApplicationCommandOptionType.String,
    },
  ],
  PermissionsRequired: [PermissionFlagsBits.Administrator],
  botPermissions: [PermissionFlagsBits.Administrator],

  callback: (client, interaction) => {
    interaction.reply(`Eu não vou dar ban em ninguém não, verme.`)
  },
}