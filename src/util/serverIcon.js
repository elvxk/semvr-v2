import "dotenv/config";
import { Colors, EmbedBuilder } from "discord.js";
import { footer } from "../config.js";

export const serverIcon = async (interaction) => {
  const embed = new EmbedBuilder();
  await interaction.reply({
    embeds: [
      embed
        .setTitle(`${interaction.guild.name}'s icon`)
        .setImage(interaction.guild.iconURL({ size: 1024, dynamic: true }))
        .setFooter({
          text: footer,
          iconURL: interaction.client.user.displayAvatarURL(),
        })
        .setColor(Colors.Gold),
    ],
  });
};
