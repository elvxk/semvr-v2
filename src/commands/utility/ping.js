import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("🏓 Ping the bot!");

export const execute = async (interaction) => {
  const sent = await interaction.reply({
    content: "`🏓` Pinging...",
    fetchReply: true,
  });

  interaction.editReply(
    "`🍻` " +
      "Roundtrip Latency is `" +
      (sent.createdTimestamp - interaction.createdTimestamp) +
      " ms`\n" +
      "`🍻` " +
      "API Latency is `" +
      `${Math.round(interaction.client.ws.ping)} ms` +
      "`",
  );
};
