FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install -g typescript ts-node

RUN tsc --init

EXPOSE 3000

CMD ["npm", "run", "dev"]
