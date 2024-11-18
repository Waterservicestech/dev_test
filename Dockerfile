FROM node:18-alpine

WORKDIR /usr/src/app

RUN apk add --no-cache python3 make g++

COPY package*.json ./

RUN npm install
RUN npm install axios @types/axios

COPY tsconfig.json ./
COPY src/ ./src/

RUN npm run build

EXPOSE 3000

ENV NODE_ENV=production
ENV DB_HOST=db
ENV DB_USER=root
ENV DB_PASSWORD=password
ENV DB_NAME=test_db
ENV PORT=3000

CMD ["npm", "start"]