# BUILD STAGE
FROM node:18.0.0-slim AS builder
WORKDIR /usr/src/app
COPY --chown=node:node package*.json .
RUN npm ci 
COPY --chown=node:node . .
RUN npm run build
USER node

# PRODUCTION STAGE
FROM node:18.0.0-slim

ENV DOCKERIZE_VERSION=v0.8.0
ENV NODE_ENV=production

RUN apt-get update \
    && apt-get install -y wget \
    && wget -O - https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz | tar xzf - -C /usr/local/bin \
    && apt-get autoremove -yqq --purge wget && rm -rf /var/lib/apt/lists/*

USER node

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=builder /usr/src/app/dist ./dist

RUN npm ci --omit=dev

EXPOSE 3000

ENTRYPOINT [ "dockerize", "-wait", "tcp://db:3306", "-timeout", "20s" ]
CMD [ "npm", "run", "start" ]