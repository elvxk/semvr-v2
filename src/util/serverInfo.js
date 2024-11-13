import "dotenv/config";
import { Colors, EmbedBuilder } from "discord.js";
import { footer } from "../config.js";

export const serverInfo = async (interaction) => {
  const embed = new EmbedBuilder();
  const born = new Date(interaction.guild.createdTimestamp);
  const age = Math.floor((new Date() - born) / 31536000000);

  const online = await interaction.guild.members
    .fetch({ withPresences: true })
    .then((res) => res.filter((member) => member.presence?.status === "online"))
    .catch((e) => console.log(e));

  await interaction.reply({
    embeds: [
      embed
        .setAuthor({
          name: interaction.guild.name,
          iconURL: interaction.guild.iconURL({ size: 1024 }),
        })
        .setThumbnail(interaction.guild.iconURL({ size: 1024 }))
        .setFields(
          { name: " ", value: " " },
          {
            name: "`🆔` **SERVER ID**",
            value: "`🆔` " + interaction.guild.id,
            inline: true,
          },
          {
            name: "`👑` **OWNER**",
            value: "`👑` " + `<@${interaction.guild.ownerId}>`,
            inline: true,
          },
          { name: " ", value: " " },
          {
            name: "`📅` **CREATED AT**",
            value:
              "`📅` `" + born.toUTCString() + " | " + age + " year(s) ago`",
          },
          { name: " ", value: " " },
          {
            name: "`👥` **MEMBERS**",
            value: "`👥` `" + interaction.guild.memberCount + " Members`",
            inline: true,
          },
          {
            name: "`🟢` **ONLINE**",
            value: "`🟢` `" + online.size + " Members`",
            inline: true,
          },
          { name: " ", value: " " },
          {
            name: "`🔮` **BOOST**",
            value:
              "`🔮` `Level " +
              interaction.guild.premiumTier +
              " with " +
              interaction.guild.premiumSubscriptionCount +
              " Boost`",
          },
          { name: " ", value: " " },
          {
            name: "`🎨` **ROLES**",
            value: "`🎨` `" + interaction.guild.roles.cache.size + " Roles`",
            inline: true,
          },
          {
            name: "`📢` **CHANNELS**",
            value:
              "`📢` `" + interaction.guild.channels.cache.size + " Channels`",
            inline: true,
          },
          { name: " ", value: " " },
          {
            name: "`💈` **EMOJIS**",
            value: "`💈` `" + interaction.guild.emojis.cache.size + " Emojis`",
            inline: true,
          },
        )
        .setFooter({
          text: footer,
          iconURL: interaction.client.user.displayAvatarURL(),
        })
        .setColor(Colors.Gold),
    ],
  });
};
