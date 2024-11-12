FROM node:18-alpine

WORKDIR /src

COPY package*.json ./
COPY tsconfig.json ./

RUN npm i

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]