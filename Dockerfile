FROM node:18
WORKDIR /usr/src/app

COPY package*.json ./
COPY src ./src
COPY tsconfig.json ./

RUN npm install
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]