FROM node:21 as base
COPY package.json ./
RUN npm install
COPY src ./src
COPY tsconfig.json ./tsconfig.json
RUN npm run build
COPY init.sql .
CMD ["npm", "run", "start"]