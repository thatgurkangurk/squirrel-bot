FROM oven/bun:1.2.2-alpine AS base
LABEL org.opencontainers.image.source="https://github.com/thatgurkangurk/squirrelbot"
COPY . /app
WORKDIR /app

FROM base AS deps
RUN bun install --frozen-lockfile

FROM base
RUN addgroup --system --gid 1001 squirrelbot
RUN adduser --system --uid 1001 squirrelbot
ENV NODE_ENV production

COPY --from=deps --chown=squirrelbot:squirrelbot /app/node_modules /app/node_modules
COPY --chown=squirrelbot:squirrelbot ./src /app/src

CMD [ "bun", "run", "./src/main.ts" ]