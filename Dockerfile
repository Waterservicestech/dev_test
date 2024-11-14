FROM node:lts-alpine AS builder

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

FROM builder as development
EXPOSE 3000
CMD ["yarn", "run", "dev"]
