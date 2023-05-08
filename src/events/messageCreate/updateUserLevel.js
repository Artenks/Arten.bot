const gainXp = require("../../utils/gainXp");

module.exports = (client, arg) => {
  if(arg.author.bot) return;

  gainXp(client, arg.author, arg);
}