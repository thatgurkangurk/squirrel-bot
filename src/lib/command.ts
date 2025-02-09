import type {
  Awaitable,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  SlashCommandOptionsOnlyBuilder,
} from "discord.js";
import type { ExtendedClient } from "./client";
import { commands } from "./collections";

type Command = {
  name: string;
  data: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder;
  execute: (props: {
    client: ExtendedClient;
    interaction: ChatInputCommandInteraction;
    log: (from: string, ...args: unknown[]) => void;
  }) => Awaitable<unknown>;
};

function createCommand(command: Command) {
  commands.set(command.name, command);
}

export type { Command };
export { createCommand };
