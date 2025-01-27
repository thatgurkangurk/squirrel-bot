import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { createCommand } from "../lib/command";

createCommand({
  name: "ping",
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("get the bot's ping"),
  execute: async ({ interaction, client }) => {
    const sent = await interaction.deferReply();

    const embed = new EmbedBuilder()
      .setTimestamp()
      .setTitle("pong")
      .setDescription(
        `my ping is \`${Math.round(
          sent.interaction.createdTimestamp - interaction.createdTimestamp
        )}ms\``
      );

    await interaction.editReply({
      embeds: [embed],
    });
  },
});
