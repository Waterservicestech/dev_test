#TODO Configure o Dockerfile
FROM node:22

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

ENV PORT 3000

EXPOSE $PORT

CMD [ "npm", "run", "dev" ]
