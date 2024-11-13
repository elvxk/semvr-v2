import prisma from "./../libs/prisma.js";

export const welcomerSetting = async (interaction) => {
  function formater(str) {
    let replacer = {
      "{user}": `<@${interaction.user.id}>`,
      "{user.username}": interaction.user.username,
      "{server.name}": interaction.guild.name,
      "{membercount}": interaction.guild.memberCount,
    };
    return str.replaceAll(
      /{membercount}|{server.name}{user}|{user.username}/gi,
      function (match) {
        return replacer[match];
      },
    );
  }
  const data = {
    server_id: interaction.guild.id,
    server_name: interaction.guild.name,
    channel: interaction.options.getChannel("channel").id,
    message: interaction.options.getString("message"),
    image: interaction.options.getString("imageurl"),
    greeting: interaction.options.getString("greeting"),
    greeting_msg: interaction.options.getString("greeting_message"),
    color: interaction.options.getString("color"),
    shadow: interaction.options.getBoolean("shadow"),
  };

  const checkServer = await prisma.welcomer.findFirst({
    where: { server_id: interaction.guild.id },
  });

  if (!checkServer) {
    await prisma.welcomer.create({ data });
    await interaction.reply(`
\`🍻\` Welcomer has been setted successfully
\`🍻\` Channel to send welcomer <#${data.channel}>
\`🍻\` \`/welcomer preview\` to preview the welcomer
\`🍻\` \`/welcomer toggle\` to enable/disable welcomer
`);
  } else {
    let rep = "**WELCOMER**";
    if (data.channel) {
      await prisma.welcomer.update({
        where: { server_id: interaction.guild.id },
        data: { channel: data.channel },
      });
      rep =
        rep + "\n" + "`🍻` Channel has been updated to <#" + data.channel + ">";
    }
    if (data.message) {
      await prisma.welcomer.update({
        where: { server_id: interaction.guild.id },
        data: { message: data.message },
      });
      rep = rep + "\n" + "`🍻` Message has been updated successfully";
    }
    if (data.image) {
      await prisma.welcomer.update({
        where: { server_id: interaction.guild.id },
        data: { image: data.image },
      });
      rep = rep + "\n" + "`🍻` Image has been updated successfully";
    }
    if (data.greeting) {
      await prisma.welcomer.update({
        where: { server_id: interaction.guild.id },
        data: { greeting: data.greeting },
      });
      rep = rep + "\n" + "`🍻` Greeting has been updated successfully";
    }
    if (data.greeting_msg) {
      await prisma.welcomer.update({
        where: { server_id: interaction.guild.id },
        data: { greeting_msg: data.greeting_msg },
      });
      rep = rep + "\n" + "`🍻` Greeting message has been updated successfully";
    }
    if (data.color) {
      await prisma.welcomer.update({
        where: { server_id: interaction.guild.id },
        data: { color: data.color },
      });
      rep = rep + "\n" + "`🍻` Color has been updated successfully";
    }
    if (data.shadow != checkServer.shadow && data.shadow != null) {
      await prisma.welcomer.update({
        where: { server_id: interaction.guild.id },
        data: { shadow: data.shadow },
      });
      rep =
        rep +
        "\n" +
        "`🍻` Shadow is " +
        `${data.shadow == true ? "enabled" : "disabled"}`;
    }
    await interaction.reply(rep);
  }
};
