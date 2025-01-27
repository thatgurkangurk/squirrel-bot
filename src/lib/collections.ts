import type { ClientEvents } from "discord.js";
import type { Event } from "./event";

export const events = new Set<Event<keyof ClientEvents>>();
