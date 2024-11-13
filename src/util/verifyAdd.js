import "dotenv/config";
import prisma from "./../libs/prisma.js";
import {
  Colors,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} from "discord.js";
import { checkRolePos } from "./checkRolePos.js";
import { role_name } from "../config.js";

export const verifyAdd = async (interaction) => {
  const embed = new EmbedBuilder();
  const role_id = interaction.options.getRole("role").id;
  const channel_id = interaction.options.getChannel("channel").id;
  const channel = interaction.guild.channels.cache.get(channel_id);
  const title = interaction.options.getString("title");
  const desc = interaction.options.getString("desc");
  const btn_text = interaction.options.getString("btn_text");
  const message_after = interaction.options.getString("message");

  const btn_verify = new ButtonBuilder()
    .setCustomId("verify")
    .setLabel(btn_text)
    .setStyle(ButtonStyle.Success);
  const row = new ActionRowBuilder().addComponents(btn_verify);

  let message_id;
  const check_pos = checkRolePos(
    interaction,
    interaction.options.getRole("role"),
    role_name,
  );

  if (check_pos) {
    await channel
      .send({
        embeds: [
          embed.setTitle(title).setDescription(desc).setColor(Colors.Gold),
        ],
        components: [row],
      })
      .then((send) => (message_id = send.id));

    const data = {
      message_id,
      role_id,
      message_after,
    };

    await prisma.verify.create({ data });

    await await interaction.reply("`🍻` Verification message has been sent.");
  } else {
    await await interaction.reply(
      "`🍻` Please move the role of the bot to the top.",
    );
  }
};
