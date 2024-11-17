#TODO Configure o Dockerfile
FROM node:20-alpine AS build

WORKDIR /usr/app

COPY package.json package-lock.json* ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]