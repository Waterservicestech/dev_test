FROM node:20.16.0-alpine3.20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build
RUN npm install --production

EXPOSE 3000

CMD ["npm", "run", "start"]