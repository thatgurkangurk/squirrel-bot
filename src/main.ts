import { GatewayIntentBits } from "discord.js";
import { ExtendedClient } from "./lib/client";

const client = new ExtendedClient({
  intents: [GatewayIntentBits.Guilds],
});

client.start(Bun.env.TOKEN);
