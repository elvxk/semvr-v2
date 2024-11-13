import { PermissionsBitField, SlashCommandBuilder } from "discord.js";
import { verifyAdd } from "../../util/verifyAdd.js";

export const data = new SlashCommandBuilder()
  .setName("verify")
  .setDescription("✅ Create message to verify")
  .addSubcommand((subcommand) =>
    subcommand
      .setName("add")
      .setDescription("✅ Set new verify message")
      .addChannelOption((input) =>
        input
          .setName("channel")
          .setDescription("select channel to send verify message")
          .setRequired(true),
      )
      .addRoleOption((input) =>
        input
          .setName("role")
          .setDescription("select role to add")
          .setRequired(true),
      )
      .addStringOption((input) =>
        input
          .setName("title")
          .setDescription("Set title to display on message")
          .setRequired(true),
      )
      .addStringOption((input) =>
        input
          .setName("desc")
          .setDescription("Set description to display on message")
          .setRequired(true),
      )
      .addStringOption((input) =>
        input
          .setName("message")
          .setDescription("Set message after press button")
          .setRequired(true),
      )
      .addStringOption((input) =>
        input
          .setName("btn_text")
          .setDescription("Set text to display on button")
          .setRequired(true),
      ),
  );
export const execute = async (interaction) => {
  const isAdmin = interaction.guild.members.cache
    .get(interaction.user.id)
    .permissions.has(PermissionsBitField.Flags.Administrator);

  if (isAdmin) {
    if (interaction.options.getSubcommand() === "add") {
      verifyAdd(interaction);
    }
  } else {
    await interaction.reply({
      content: "You don't have permission to use this command",
      ephemeral: true,
    });
  }
};
