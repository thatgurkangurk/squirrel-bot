import * as v from "valibot";

const BaseSchema = v.object({
  ip: v.string(),
  port: v.number(),
  hostname: v.optional(v.string()),
  debug: v.object({
    ping: v.boolean(),
    query: v.boolean(),
    bedrock: v.boolean(),
    srv: v.boolean(),
    querymismatch: v.boolean(),
    ipinsrv: v.boolean(),
    cnameinsrv: v.boolean(),
    animatedmotd: v.boolean(),
    cachehit: v.boolean(),
    cachetime: v.number(),
    cacheexpire: v.number(),
    apiversion: v.number(),
  }),
});

const ProtocolSchema = v.object({
  version: v.number(),
  name: v.string(),
});

const MapSchema = v.object({
  raw: v.string(),
  clean: v.string(),
  html: v.string(),
});

const PlayerSchema = v.object({
  name: v.string(),
  uuid: v.string(),
});

const PlayersSchema = v.object({
  online: v.number(),
  max: v.number(),
  list: v.optional(v.array(PlayerSchema)),
});

const MotdInfoSchema = v.object({
  raw: v.array(v.string()),
  clean: v.array(v.string()),
  html: v.array(v.string()),
});

const PluginModSchema = v.object({
  name: v.string(),
  version: v.string(),
});
const OnlineSchema = v.object({
  ...BaseSchema.entries,
  online: v.literal(true),
  version: v.string(),
  protocol: v.optional(ProtocolSchema),
  icon: v.optional(v.string()),
  software: v.optional(v.string()),
  map: MapSchema,
  gamemode: v.optional(v.string()),
  serverid: v.optional(v.string()),
  eula_blocked: v.boolean(),
  motd: MotdInfoSchema,
  players: PlayersSchema,
  plugins: v.optional(v.array(PluginModSchema)),
  mods: v.optional(v.array(PluginModSchema)),
  info: v.optional(MotdInfoSchema),
});

const OfflineSchema = v.object({
  ...BaseSchema.entries,
  online: v.literal(false),
});

export { OfflineSchema, OnlineSchema };
