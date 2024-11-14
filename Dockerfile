# Etapa de construção
FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

# Compile o código TypeScript
RUN npm run build

# Execute o aplicativo
CMD ["npm", "start"]
