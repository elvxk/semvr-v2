import { PermissionsBitField, SlashCommandBuilder } from "discord.js";
import { welcomerSetting } from "../../util/welcomerSetting.js";
import { welcomerPreview } from "../../util/welcomerPreview.js";
import { welcomerToggle } from "../../util/welcomerToggle.js";

export const data = new SlashCommandBuilder()
  .setName("welcomer")
  .setDescription("🎉 Welcomer message")
  .addSubcommand((subcommand) =>
    subcommand
      .setName("setting")
      .setDescription("🎉 Set welcomer message")
      .addChannelOption((input) =>
        input
          .setName("channel")
          .setDescription("select channel to send welcome message")
          .setRequired(true),
      )
      .addStringOption((input) =>
        input.setName("message").setDescription("input welcome message"),
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
    subcommand.setName("preview").setDescription("🎉 Preview welcomer message"),
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName("toggle")
      .setDescription("🎉 enable/disable welcomer")
      .addBooleanOption((input) =>
        input
          .setName("onoff")
          .setDescription("enable/disable welcomer")
          .setRequired(true),
      ),
  );

export const execute = async (interaction) => {
  const isAdmin = interaction.guild.members.cache
    .get(interaction.user.id)
    .permissions.has(PermissionsBitField.Flags.Administrator);

  if (isAdmin) {
    if (interaction.options.getSubcommand() === "setting") {
      welcomerSetting(interaction);
    } else if (interaction.options.getSubcommand() === "preview") {
      welcomerPreview(interaction);
    } else if (interaction.options.getSubcommand() === "toggle") {
      welcomerToggle(interaction);
    }
  } else {
    await interaction.reply({
      content: "You don't have permission to use this command",
      ephemeral: true,
    });
  }
};
