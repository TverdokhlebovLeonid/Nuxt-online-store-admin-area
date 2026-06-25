# syntax=docker/dockerfile:1

FROM node:22-slim AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:22-slim AS runtime

WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

COPY --from=build /app/.output ./.output
COPY --from=build /app/server/database/migrations ./server/database/migrations
COPY --from=build /app/node_modules/@libsql/linux-x64-gnu ./.output/server/node_modules/@libsql/linux-x64-gnu

RUN mkdir -p .data public/uploads

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
