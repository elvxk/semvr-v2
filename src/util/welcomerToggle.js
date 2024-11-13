import prisma from "./../libs/prisma.js";

export const welcomerToggle = async (interaction) => {
  const checkServer = await prisma.welcomer.findFirst({
    where: { server_id: interaction.guild.id },
  });

  if (!checkServer) {
    return await interaction.reply(
      "`🍻` Welcomer is not setup on this server." +
        "\n" +
        "`🍻` Use `/welcomer setting` to set up.",
    );
  } else {
    if (interaction.options.getBoolean("onoff")) {
      await prisma.welcomer.update({
        where: { server_id: interaction.guild.id },
        data: { enabled: true },
      });
      return await interaction.reply("`🍻` Welcomer has been enabled.");
    } else {
      await prisma.welcomer.update({
        where: { server_id: interaction.guild.id },
        data: { enabled: false },
      });
      return await interaction.reply("`🍻` Welcomer has been disabled.");
    }
  }
};
