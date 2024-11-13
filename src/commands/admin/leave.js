import { PermissionsBitField, SlashCommandBuilder } from "discord.js";
import { leaveSetting } from "../../util/leaveSetting.js";
import { leavePreview } from "../../util/leavePreview.js";
import { leaveToggle } from "../../util/leaveToggle.js";

export const data = new SlashCommandBuilder()
  .setName("leave")
  .setDescription("🎉 Welcomer leave")
  .addSubcommand((subcommand) =>
    subcommand
      .setName("setting")
      .setDescription("🎉 Set leave message")
      .addChannelOption((input) =>
        input
          .setName("channel")
          .setDescription("select channel to send leave message")
          .setRequired(true),
      )
      .addStringOption((input) =>
        input.setName("message").setDescription("input leave message"),
      )
      .addStringOption((input) =>
        input.setName("imageurl").setDescription("input url image background"),
      )
      .addStringOption((input) =>
        input.setName("greeting").setDescription("input image greeting"),
      )
      .addStringOption((input) =>
        input
          .setName("greeting_message")
          .setDescription("input image greeting message"),
      )
      .addStringOption((input) =>
        input.setName("color").setDescription("input color decoration"),
      )
      .addBooleanOption((input) =>
        input.setName("shadow").setDescription("enable/disable shadow"),
      ),
  )
  .addSubcommand((subcommand) =>
    subcommand.setName("preview").setDescription("🎉 Preview leave message"),
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName("toggle")
      .setDescription("🎉 enable/disable leave")
      .addBooleanOption((input) =>
        input
          .setName("onoff")
          .setDescription("enable/disable leave")
          .setRequired(true),
      ),
  );

export const execute = async (interaction) => {
  const isAdmin = interaction.guild.members.cache
    .get(interaction.user.id)
    .permissions.has(PermissionsBitField.Flags.Administrator);

  if (isAdmin) {
    if (interaction.options.getSubcommand() === "setting") {
      leaveSetting(interaction);
    } else if (interaction.options.getSubcommand() === "preview") {
      leavePreview(interaction);
    } else if (interaction.options.getSubcommand() === "toggle") {
      leaveToggle(interaction);
    }
  } else {
    await interaction.reply({
      content: "You don't have permission to use this command",
      ephemeral: true,
    });
  }
};
