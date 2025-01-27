import { directoryImport } from "directory-import";
import { Client } from "discord.js";
import { events } from "./collections";
import { createConsola, type ConsolaInstance } from "consola";

class ExtendedClient extends Client {
  logger: ConsolaInstance = createConsola();

  async start(token?: string) {
    this.logger.wrapConsole();
    this.loadEvents();
    await this.login(token);
  }

  loadEvents() {
    try {
      directoryImport("../events");
    } catch (err) {
      this.logger.error(err);
    }

    const logger = this.logger;

    for (const event of events) {
      if (event.options?.once) {
        this.once(event.name, (...args) => {
          event.callback(
            {
              client: this,
              log(...args) {
                logger.info(`[${event.name}]`, ...args);
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
                logger.info(`[${event.name}]`, ...args);
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
