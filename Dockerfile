FROM node:lts-alpine

RUN apk add --no-cache bash


USER node

WORKDIR /node/app

ENTRYPOINT [ "./.docker/start.sh" ]

EXPOSE 3000