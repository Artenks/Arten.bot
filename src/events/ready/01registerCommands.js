const { testServer } = require("../../../config.json");
const areCommandsDifferent = require("../../utils/areCommandsDifferent");
const getApplicationCommands = require("../../utils/getApplicationCommands");
const getLocalCommands = require("../../utils/getLocalCommands");

module.exports = async (client) => {
  try {
    const localCommands = getLocalCommands();
    const applicationCommand = await getApplicationCommands(client, testServer);

    for (const localCommand of localCommands) {
      const { name, description, options } = localCommand;

      const existingCommand = await applicationCommand.cache.find(
        (cmd) => cmd.name === name
      );

      if(existingCommand){
        if(localCommand.deleted){
          await applicationCommand.delete(existingCommand.id);
          console.log(`Comando deletado: ${name}`)
          continue;
        }

        if(areCommandsDifferent(existingCommand, localCommand)){
          await applicationCommand.edit(existingCommand.id, {
            description, 
            options,
          });

          console.log(`Comando editado: ${name}`);
        }
      } else{
        if(localCommand.deleted){
          console.log(`Skip > comando registrado setado para deletar: ${name}`)
          continue;
        }

        await applicationCommand.create({
          name,
          description,
          options,
        })

        console.log(`Comando registrado: ${name}`);
      }
    }

  } catch (error) {
    console.log(`Algo deu errado: ${error}`);
  }
};
