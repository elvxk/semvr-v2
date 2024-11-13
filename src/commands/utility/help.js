import "dotenv/config";
import {
  Colors,
  EmbedBuilder,
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} from "discord.js";
import { footer } from "../../config.js";

export const data = new SlashCommandBuilder()
  .setName("help")
  .setDescription("☕ See the bot help");

export const execute = async (interaction) => {
  const embed = new EmbedBuilder();

  const docs = new ButtonBuilder()
    .setLabel("📃 Docs")
    .setURL("https://bit.ly/semvrdocs")
    .setStyle(ButtonStyle.Link);

  const discord = new ButtonBuilder()
    .setLabel("🏠 Discord")
    .setURL("https://bit.ly/semvrdc")
    .setStyle(ButtonStyle.Link);

  const support = new ButtonBuilder()
    .setLabel("🍩 Support")
    .setURL("https://saweria.co/elvxk")
    .setStyle(ButtonStyle.Link);

  const row = new ActionRowBuilder().addComponents(docs, discord, support);

  await interaction.reply({
    components: [row],
    embeds: [
      embed
        .setTitle("<a:gunungan:1096043083696701570> SEMVR Help")
        .setDescription(
          "SEMVR is a discord bot built by [elvxk](https://sandri.my.id) in 2023. This bot has many functions for your channel. made with love\n\n" +
            "[Documentation](https://bit.ly/semvrdocs) - [Discord](https://bit.ly/semvrdc) - [Support](https://saweria.co/elvxk)" +
            "\n\n`Available commands`",
        )
        .setFields(
          { name: " ", value: " " },
          { name: "`🍺` Administrator", value: "`leave`,`verify`,`welcomer`" },
          { name: "`🍨` Utility", value: "`help`,`ping`,`server`,`user`" },
          { name: "`🍻` Server", value: "`info`,`icon`" },
          { name: "`🍭` User", value: "`avatar`,`banner`,`info`" },
          { name: " ", value: " " },
        )
        .setColor(Colors.Gold)
        .setThumbnail(interaction.client.user.displayAvatarURL())
        .setFooter({
          text: footer,
          iconURL: interaction.client.user.displayAvatarURL(),
        }),
    ],
  });
};
