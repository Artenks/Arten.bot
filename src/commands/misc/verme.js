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

    if(client.user.username === interaction.options.get("usuario").user.username){
      interaction.reply(":face_with_monocle: ?")
      return;
    }
    if(interaction.options.get("usuario").user.username === "artenks"){
      interaction.reply("não.")
      return;
    }
    interaction.reply(`${interaction.options.get('usuario').member} **VERME** :rat: `)
  },
};
