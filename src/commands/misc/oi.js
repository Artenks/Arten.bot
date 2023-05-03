module.exports = {
  name: 'oi',
  description: ':)',
  // devOnly: Boolean,
  // testOnly: Boolean,
  // options: Object[],
  // deleted: Boolean,

  callback: (client, interaction) => {
    interaction.reply(`Oi ${interaction.member}`)
  },
}