FROM node:14 AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

FROM node:14-alpine AS production

WORKDIR /usr/src/app

COPY --from=build /usr/src/app .

RUN npm install --only=production

EXPOSE 3000

ENV NODE_ENV=production

CMD ["npm", "start"]