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

  const mentionId = await interaction.options?.get("usuario")?.member?.id;
  const userId = await interaction?.member.id;
  const guildUsers = await getGuildUsers(interaction);

  setTimeout(async () => {
    if (mentionId == null) {
      await sendRank(userId);
    } else if (mentionId != null) {
      await sendRank(mentionId);
    }
    if (data.userId != null) {
      if (userId == mentionId) {
        interaction?.reply({ files: [await attachment] });
        return;
      }
      // interaction.reply(`<@${mentionId}> está no **nível ${await data?.id}**`);
      interaction?.reply({ files: [await attachment] });
      return;
    }

    async function sendRank(id) {
      await guildUsers?.sort((a, b) => {
        if (a.level === b.level) {
          return b.xp - a.xp;
        } else {
          return b.level - a.level;
        }
      });

      if (id == userId) {
        data = await getData(interaction, null);
        // currentRank = (await guildUsers?.findIndex((lvl) => lvl?._id === userId)) + 1;
        targetUserObject = await interaction?.guild.members.fetch(userId);
      } else {
        data = await getData(interaction, id);
        // currentRank = (await guildUsers?.findIndex((lvl) => lvl?._id === id)) + 1;
        targetUserObject = await interaction?.guild.members.fetch(id);
      }

      if (haveAMention) {
        if (
          (await guildUsers?.findIndex((lvl) => lvl?._id == mentionId)) == -1
        ) {
          if(mentionId == userId){
            interaction?.reply(
              `<@${userId}> **Calmaí!** você ainda não comentou no servidor. 🐀`
            );
            return;
          }
          interaction?.reply(
            `<@${userId}> **Calmaí!** o usuário não está em meu registro 🐀`
          );
          return;
        }
      }
      if (data?.userId == null) {
        interaction?.reply(
          `<@${userId}> **Peraí!** você ainda não comentou no servidor. 🐀`
        );
        return;
      }

      let status = await targetUserObject?.presence.status;
      let color;
      if (status === "dnd") {
        color = "#FF335B";
      }
      if (status === "idle") {
        color = "#ffb604";
      }
      if (status === "online") {
        color = "#B8FF52";
      }

      let rank = new canvacord.Rank()
        .setAvatar(targetUserObject?.user.displayAvatarURL({ size: 256 }))
        .setRank(0, "Rank", false)
        .setLevel(data?.level, "Nível", true)
        .setCurrentXP(data?.xp)
        .renderEmojis(true)
        .setRequiredXP(calculateLevelXp(data?.level))
        .setStatus(status, false, 5)
        .setProgressBar(color, "COLOR")
        .setUsername(targetUserObject?.user.username)
        .setOverlay("#0C0C0C")
        .setDiscriminator(targetUserObject?.user.discriminator)
        .setBackground("COLOR", "#0C0C0C");

      dataRank = await rank.build();
      attachment = new AttachmentBuilder(dataRank);
    }
  }, 500);
};
