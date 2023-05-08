const { AttachmentBuilder } = require("discord.js");
const calculateLevelXp = require("../utils/calculateLevelXP");
const canvacord = require("canvacord");
const getData = require("../utils/getData");
const getGuildUsers = require("../utils/getGuildUsers");

module.exports = async (interaction) => {
  let data;

  let targetUserObject;
  let currentRank;
  let dataRank;
  let attachment;

  const haveAMention = interaction.options.get("usuario") ? true : false;

  const mentionId = await interaction.options.get("usuario")?.member.id;
  const userId = await interaction.member.id;
  const guildUsers = await getGuildUsers(interaction);

  setTimeout(async () => {
    if (mentionId == null) {
      await sendRank(userId);
    } else {
      await sendRank(mentionId);
    }
    if (haveAMention) {
      if ((await guildUsers.findIndex((lvl) => lvl._id == mentionId)) == -1) {
        interaction.reply(`<@${userId}> o usuário não está em meu registro 🐀`);
        return;
      }
    }

    if (mentionId == null && data == null) {
      interaction.reply(
        `<@${userId}> o usuário ainda não comentou no servidor. 🐀`
      );
      return;
    }

    if (data != null) {
      if (userId == mentionId) {
        interaction.reply({ files: [attachment] });
        return;
      }
      // interaction.reply(`<@${mentionId}> está no **nível ${await data?.id}**`);
      interaction.reply({ files: [attachment] });
      return;
    }
  }, 500);

  async function sendRank(id) {
    console.log(guildUsers);

    await guildUsers.sort((a, b) => {
      if (a.level === b.level) {
        return b.xp - a.xp;
      } else {
        return b.level - a.level;
      }
    });

    console.log(guildUsers);

    if (id == userId) {
      data = await getData(interaction, null);
      currentRank =
        (await guildUsers.findIndex((lvl) => lvl._id === userId)) + 1;
      targetUserObject = await interaction.guild.members.fetch(userId);
    } else {
      data = await getData(interaction, id);
      currentRank = (await guildUsers.findIndex((lvl) => lvl._id === id)) + 1;
      targetUserObject = await interaction.guild.members.fetch(id);
    }

    if (data.userId == null) return;

    let rank = new canvacord.Rank()
      .setAvatar(targetUserObject.user.displayAvatarURL({ size: 256 }))
      .setRank(currentRank)
      .setLevel(data?.level)
      .setCurrentXP(data?.xp)
      .setRequiredXP(calculateLevelXp(data?.level))
      .setStatus("idle")
      .setProgressBar("#ffb604", "COLOR")
      .setUsername(targetUserObject.user.username)
      .setOverlay("#0C0C0C")
      .setDiscriminator(targetUserObject.user.discriminator)
      .setBackground("COLOR", "#0C0C0C");

    dataRank = await rank.build();
    attachment = new AttachmentBuilder(dataRank);
  }
};
