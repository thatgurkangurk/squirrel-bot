import { directoryImport } from "directory-import";
import { Client } from "discord.js";
import { events } from "./collections";

class ExtendedClient extends Client {
  async start(token?: string) {
    this.loadEvents();
    await this.login(token);
  }

  loadEvents() {
    try {
      directoryImport("../events");
    } catch (err) {
      console.error("couldn't import all events");
    }

    function log(from: string, ...args: unknown[]) {
      console.log(`[${from}]`, ...args);
    }

    for (const event of events) {
      if (event.options?.once) {
        this.once(event.name, (...args) => {
          event.callback(
            {
              client: this,
              log(...args) {
                log(event.name, ...args);
              },
            },
            ...args
          );
        });
      } else {
        this.on(event.name, (...args) => {
          event.callback(
            {
              client: this,
              log(...args) {
                log(event.name, ...args);
              },
            },
            ...args
          );
        });
      }
    }
  }
}

export { ExtendedClient };
