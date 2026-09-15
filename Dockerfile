ARG NODE_IMAGE=node:22-bookworm-slim@sha256:83f487e0a63425e5b4d146fb5e5be574bcbe1b7b843d3ebafdd95eaf7767a7e5
FROM ${NODE_IMAGE} AS base
RUN apt-get update \
    && apt-get install -y --no-install-recommends openssl dumb-init \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /app

FROM base AS build
ENV NUXT_TELEMETRY_DISABLED=1
COPY package.json package-lock.json ./
# Nuxt prepare needs project files; run it explicitly after copying the source.
RUN npm ci --ignore-scripts --no-audit --no-fund
COPY . .
RUN npx prisma generate && npm run postinstall && npm run build

FROM base AS runtime
ENV NODE_ENV=production HOST=0.0.0.0 PORT=3000
COPY --from=build --chown=node:node /app/.output /app/.output
USER node
EXPOSE 3000
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", ".output/server/index.mjs"]
