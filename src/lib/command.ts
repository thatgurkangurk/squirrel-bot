import type {
  Awaitable,
  CommandInteraction,
  SlashCommandBuilder,
} from "discord.js";
import type { ExtendedClient } from "./client";
import { commands } from "./collections";

type Command = {
  name: string;
  data: SlashCommandBuilder;
  execute: (props: {
    client: ExtendedClient;
    interaction: CommandInteraction;
    log: (from: string, ...args: unknown[]) => void;
  }) => Awaitable<unknown>;
};

function createCommand(command: Command) {
  commands.set(command.name, command);
}

export type { Command };
export { createCommand };
