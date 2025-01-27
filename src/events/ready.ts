import { Events } from "discord.js";
import { createEvent } from "../lib/event";

createEvent(Events.ClientReady, ({ log, client }) => {
  log(`logged in as @${client.user?.username}`);
});
