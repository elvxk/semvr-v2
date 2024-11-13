import prisma from "./../libs/prisma.js";

export const leaveToggle = async (interaction) => {
  const checkServer = await prisma.leave.findFirst({
    where: { server_id: interaction.guild.id },
  });

  if (!checkServer) {
    return await interaction.reply(
      "`🍻` Leave is not setup on this server." +
        "\n" +
        "`🍻` Use `/leave setting` to set up.",
    );
  } else {
    if (interaction.options.getBoolean("onoff")) {
      await prisma.leave.update({
        where: { server_id: interaction.guild.id },
        data: { enabled: true },
      });
      return await interaction.reply("`🍻` Leave has been enabled.");
    } else {
      await prisma.leave.update({
        where: { server_id: interaction.guild.id },
        data: { enabled: false },
      });
      return await interaction.reply("`🍻` Leave has been disabled.");
    }
  }
};
