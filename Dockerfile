FROM node:18 as base
WORKDIR /app

FROM base as deps
COPY package.json package-lock.json ./
RUN npm ci --only=production --frozen-lockfile

FROM deps as build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base as final
COPY --from=build /app/dist ./dist
COPY --from=deps /app/node_modules ./node_modules

EXPOSE 3000

CMD ["node", "dist/index.js"]

