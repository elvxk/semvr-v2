import { SlashCommandBuilder } from "discord.js";
import { userAvatar } from "../../util/userAvatar.js";
import { userBanner } from "../../util/userBanner.js";
import { userInfo } from "../../util/userInfo.js";

export const data = new SlashCommandBuilder()
  .setName("user")
  .setDescription("Get user information")
  .addSubcommand((subcommand) =>
    subcommand
      .setName("avatar")
      .setDescription("🎭 Get user avatar")
      .addUserOption((option) =>
        option.setName("user").setDescription("🎭 Display avatar target user."),
      ),
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName("info")
      .setDescription("🎭 Get user information")
      .addUserOption((option) =>
        option
          .setName("user")
          .setDescription("🎭 Display information target user."),
      ),
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName("banner")
      .setDescription("🎭 Get user banner")
      .addUserOption((option) =>
        option.setName("user").setDescription("🎭 Display banner target user."),
      ),
  );

export const execute = async (interaction) => {
  if (interaction.options.getSubcommand() === "avatar") {
    userAvatar(interaction);
  } else if (interaction.options.getSubcommand() === "banner") {
    userBanner(interaction);
  } else if (interaction.options.getSubcommand() === "info") {
    userInfo(interaction);
  }
};
