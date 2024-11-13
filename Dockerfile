#TODO Configure o Dockerfile
FROM node:18-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3000

EXPOSE 3000

CMD ["npm", "run", "dev"]