import { Events } from "discord.js";
import prisma from "./../libs/prisma.js";

export const name = Events.InteractionCreate;
export const execute = async (interaction) => {
  if (interaction.isChatInputCommand()) {
    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) {
      console.error(
        `No command matching ${interaction.commandName} was found.`,
      );
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      }
    }
  } else if (interaction.isButton()) {
    const button = interaction;
    if (!button) return;

    if (button.customId == "verify") {
      const check = await prisma.verify.findFirst({
        where: {
          message_id: button.message.id,
        },
      });
      if (check) {
        const check_server = interaction.guild.roles.cache.get(check.role_id);
        if (check_server) {
          const check_user = button.guild.members.cache
            .get(button.user.id)
            .roles.cache.has(check.role_id);

          if (!check_user) {
            try {
              button.guild.members.cache
                .get(button.user.id)
                .roles.add(check_server);
            } catch (error) {
              console.log(error);
            }
            await interaction.reply({
              content: `${check.message_after}`,
              ephemeral: true,
            });
          } else {
            await interaction.reply({
              content: "`🍻` " + `You already have the role.`,
              ephemeral: true,
            });
          }
        } else {
          await interaction.reply({
            content:
              "`🍻` The role for verification was not found. Please contact the server owner.",
            ephemeral: true,
          });
        }
      } else {
        await interaction.reply({
          content: "`🍻` This button is not valid.",
          ephemeral: true,
        });
      }
    }
  }
};
