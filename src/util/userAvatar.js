import "dotenv/config";
import { Colors, EmbedBuilder } from "discord.js";
import { footer } from "../config.js";

export const userAvatar = async (interaction) => {
  const target = interaction.options.getUser("user");
  let member;
  if (target) {
    member = await interaction.guild.members.fetch(target.id);
  } else {
    member = await interaction.guild.members.fetch(interaction.user.id);
  }

  const embed1 = new EmbedBuilder()
    .setTitle(
      `${target ? target.username : interaction.user.username}'s avatar`,
    )
    .setImage(
      target
        ? target.avatarURL({ size: 1024, dynamic: true })
        : interaction.user.avatarURL({ size: 1024, dynamic: true }),
    )
    .setFooter({
      text: footer,
      iconURL: interaction.client.user.avatarURL(),
    })
    .setColor(Colors.Gold);

  const embed2 = member.avatarURL()
    ? new EmbedBuilder()
        .setTitle(
          `${target ? target.username : interaction.user.username}'s server avatar`,
        )
        .setImage(member.avatarURL({ size: 1024, dynamic: true }))
        .setFooter({
          text: footer,
          iconURL: interaction.client.user.avatarURL(),
        })
        .setColor(Colors.Gold)
    : null; // Jika member.avatarURL tidak ada, embed2 tidak akan dibuat

  await interaction.reply({
    embeds: embed2 ? [embed1, embed2] : [embed1],
  });
};
