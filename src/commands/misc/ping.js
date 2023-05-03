module.exports = {
  name: 'ping',
  description: 'Teste de conexão',
  // devOnly: Boolean,
  // testOnly: Boolean,
  // options: Object[],
  // deleted: Boolean,

  callback: (client, interaction) => {
    interaction.reply(`Pong! ~  *${client.ws.ping}ms*`)
  },
}