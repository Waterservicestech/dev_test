# Use a imagem oficial do Node.js como imagem base
FROM node:18-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia package.json e package-lock.json para instalar as dependências primeiro
COPY package*.json ./

# Instala as dependências necessárias
RUN npm install

# Copia o restante do código da aplicação para o container
COPY . .

# Expõe a porta que a aplicação irá utilizar
EXPOSE 3000

# Inicia a aplicação
CMD ["npm", "run", "start"]