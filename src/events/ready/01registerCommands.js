const { testServer } = require("../../../config.json");
const areCommandsDifferent = require("../../utils/areCommandsDifferent");
const getApplicationCommands = require("../../utils/getApplicationCommands");
const getLocalCommands = require("../../utils/getLocalCommands");

module.exports = async (client) => {
  let applicationId;

  try {
    const applicationCommand = await getApplicationCommands(client, testServer);
    const localCommands = getLocalCommands();
    
    for (const application of applicationCommand) {
      for (const localCommand of localCommands) {
        const { name, description, options } = localCommand;
        application.cache.find(async (guild) => {
          applicationId = guild.guild.name;
        });
        
        const existingCommand = await application.cache.find(
          (cmd) => cmd.name === name
        );

        if (existingCommand) {
          if (localCommand.deleted) {
            await application.delete(existingCommand.id);
            console.log(`${applicationId}/Comando deletado: ${name}`);
            continue;
          }

          if (areCommandsDifferent(existingCommand, localCommand)) {
            await application.edit(existingCommand.id, {
              description,
              options,
            });

            console.log(`${applicationId}/Comando editado: ${name}`);
          }
        } else {
          if (localCommand.deleted) {
            console.log(
              `${applicationId}/Skip > comando registrado setado para deletar: ${name}`
            );
            continue;
          }

          await application.create({
            name,
            description,
            options,
          });

          console.log(`${applicationId}/Comando registrado: ${name}`);
        }
      }
    }
  } catch (error) {
    console.log(`${applicationId}/Algo deu errado: ${error}`);
  }
};
