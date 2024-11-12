FROM node:20.18

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g ts-node typescript

COPY . .

EXPOSE 3000

CMD ["ts-node", "src/index.ts"]
