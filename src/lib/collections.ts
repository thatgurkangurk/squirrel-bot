import type { ClientEvents } from "discord.js";
import type { Event } from "./event";
import type { Command } from "./command";

export const events = new Set<Event<keyof ClientEvents>>();
export const commands = new Map<string, Command>();
