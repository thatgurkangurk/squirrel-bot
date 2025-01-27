import type { Awaitable, ClientEvents } from "discord.js";
import type { ExtendedClient } from "./client";
import { events } from "./collections";

type Event<K extends keyof ClientEvents> = {
  name: K;
  options?: { once?: boolean };
  callback: (
    props: {
      client: ExtendedClient;
      log: (from: string, ...args: unknown[]) => void;
    },
    ...args: ClientEvents[K]
  ) => Awaitable<unknown>;
};

function createEvent<K extends keyof ClientEvents>(
  name: Event<K>["name"],
  callback: Event<K>["callback"],
  options?: Event<K>["options"]
) {
  events.add({
    name,
    options,
    callback: callback,
  } as Event<keyof ClientEvents>);
}

export type { Event };
export { createEvent };
