import { Events, MessageFlags } from "discord.js";
import { createEvent } from "../lib/event";
import { commands } from "../lib/collections";

createEvent(Events.InteractionCreate, ({ log, client }, interaction) => {
  if (interaction.isChatInputCommand()) {
    const command = commands.get(interaction.commandName);

    if (!command)
      return interaction.reply({
        content: "that command doesn't exist",
        flags: MessageFlags.Ephemeral,
      });

    command.execute({
      client,
      log(...args) {
        client.logger.info(`[${command.name}]`, ...args);
      },
      interaction,
    });
  }
});
