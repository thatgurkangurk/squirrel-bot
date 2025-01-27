import { Client, Events, GatewayIntentBits } from "discord.js";

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.once(Events.ClientReady, () => {
  console.log("ready");
});

client.login(Bun.env.TOKEN);
