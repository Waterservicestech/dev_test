FROM node:lts-alpine

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

USER node

COPY --chown=node:node . .

EXPOSE 3000

CMD [ "npm", "run", "start" ]