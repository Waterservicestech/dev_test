# syntax=docker/dockerfile:1
FROM node:22.11.0
WORKDIR /code
COPY package*.json ./
RUN npm install
EXPOSE 3000
COPY . .
CMD ["npm", "run", "dev"]