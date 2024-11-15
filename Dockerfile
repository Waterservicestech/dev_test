# Base da imagem
FROM node:18-alpine

# Diretório de trabalho dentro do container
WORKDIR /app

# Copiar package.json e yarn.lock
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante do código
COPY . .

# Expor a porta que o servidor irá ouvir, nesse caso, porta 3000
EXPOSE 3000

# Iniciar a aplicação
CMD ["npm", "start"]