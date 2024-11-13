import { SlashCommandBuilder } from "discord.js";
import { serverInfo } from "../../util/serverInfo.js";
import { serverIcon } from "../../util/serverIcon.js";

export const data = new SlashCommandBuilder()
  .setName("server")
  .setDescription("Get server information")
  .addSubcommand((subcommand) =>
    subcommand.setName("info").setDescription("🍺 Get server information"),
  )
  .addSubcommand((subcommand) =>
    subcommand.setName("icon").setDescription("🍺 Get server icon"),
  );

export const execute = async (interaction) => {
  if (interaction.options.getSubcommand() === "info") {
    serverInfo(interaction);
  } else if (interaction.options.getSubcommand() === "icon") {
    serverIcon(interaction);
  }
};
