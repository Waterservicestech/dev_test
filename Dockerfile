#TODO Configure o Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install
COPY . .
RUN chmod +x ./node_modules/.bin/tsc

RUN npm run build
EXPOSE 3000

CMD ["npm", "start"]