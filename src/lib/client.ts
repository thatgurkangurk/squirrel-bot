import { directoryImport } from "directory-import";
import { Client, REST, Routes } from "discord.js";
import { commands, events } from "./collections";
import { createConsola, type ConsolaInstance } from "consola";

class ExtendedClient extends Client {
  logger: ConsolaInstance = createConsola();

  async start(token?: string) {
    this.logger.wrapConsole();
    this.loadEvents();
    await this.login(token);

    await this.loadCommands();
  }

  async loadCommands() {
    if (!this.token) throw new Error("you need to run this after logging in");
    if (!this.application?.id) throw new Error("no application id was found");

    try {
      directoryImport("../commands");
    } catch (err) {
      this.logger.error(err);
    }

    const rest = new REST({ version: "10" }).setToken(this.token);

    const commandsArray = [...commands].map(([_name, value]) => ({
      ...value.data,
    }));

    if (Bun.env.DEV === "1") {
      if (!Bun.env.DEV_SERVER_ID)
        throw new Error("you need to provide a dev server id");
      await rest.put(
        Routes.applicationGuildCommands(
          this.application.id,
          Bun.env.DEV_SERVER_ID
        ),
        {
          body: [...commandsArray],
        }
      );

      this.logger.success(
        `published application commands to guild ${Bun.env.DEV_SERVER_ID}`
      );

      return;
    }

    await rest.put(Routes.applicationCommands(this.application.id), {
      body: [...commandsArray],
    });

    this.logger.success("published application commands globally");
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
