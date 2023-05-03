const { devs, testServer } = require("../../../config.json");
const getLocalCommands = require("../../utils/getLocalCommands");

module.exports = async (client, interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const localcommands = getLocalCommands();

  try {
    const commandObject = localcommands.find(
      (cmd) => cmd.name === interaction.commandName
    );

    if (!commandObject) return;
    if (commandObject.devOnly) {
      if (!devs.includes(interaction.member.id)) {
        interaction.reply({
          content: "Apenas o desenvolvedor tem permissão de uso do comando.",
          ephemeral: true,
        });
        return;
      }
    }

    if (commandObject.testOnly) {
      if (!interaction.guild.id === testServer) {
        interaction.reply({
          content: "O comando não pode ser usado nessa sala.",
          ephemeral: true,
        });
        return;
      }
    }

    if (commandObject.permissionsRequired?.length) {
      for (const permission of commandObject.permissionsRequired) {
        if (!interaction.member.permissions.has(permission)) {
          interaction.reply({
            content:
              "Você não possui permissão necessária para usar o comando.",
            ephemeral: true,
          });
          break;
        }
      }
    }

    if (commandObject.botPermissions?.length) {
      for (const permission of commandObject.botPermissions) {
        const bot = interaction.guild.members.me;

        if (!bot.permissions.has(permission)) {
          interaction.reply({
            content: "Eu não tenho permissão para utilizar esse comando.",
            ephemeral: true,
          });
          break;
        }
      }
    }

    await commandObject.callback(client, interaction);
  } catch (error) {
    console.log(`Algo deu errado neste commando: ${error}`);
  }
};
