import { Colors, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { createCommand } from "../../lib/command";
import { OfflineSchema, OnlineSchema } from "../../lib/minecraft/status-schema";
import { is } from "valibot";

createCommand({
  name: "minecraft-status",
  data: new SlashCommandBuilder()
    .setName("minecraft-status")
    .setDescription("get the status for a minecraft server (java only)")
    .addStringOption((option) =>
      option.setName("ip").setRequired(true).setDescription("the server's ip")
    ),
  execute: async ({ interaction }) => {
    const ip = interaction.options.getString("ip", true);

    const data = await (
      await fetch(`https://api.mcsrvstat.us/3/${ip}`, {
        headers: {
          "User-Agent":
            "Squirrel Bot (contact hello@gurkz.me for any questions.)",
        },
      })
    ).json();

    if (is(OfflineSchema, data)) {
      return await interaction.reply({
        content: "that server is not online",
      });
    }

    if (!is(OnlineSchema, data)) {
      return await interaction.reply({
        content: "something went wrong",
      });
    }

    const embed = new EmbedBuilder()
      .setTitle(`status for server: ${ip}`)
      .setTimestamp()
      .addFields([
        {
          name: "version",
          value: data.version,
          inline: true,
        },
      ])
      .setFooter({
        text: "using https://api.mcsrvstat.us/. responses cached for 1 minute.",
      })
      .setColor(Colors.Blurple);

    embed.addFields({
      name: `players (${data.players.online}/${data.players.max})`,
      value:
        data.players.list?.map((player) => player.name).join(", ") ?? "none",
      inline: true,
    });

    return await interaction.reply({
      embeds: [embed],
    });
  },
});
