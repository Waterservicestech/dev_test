# Etapa 1: Definir a imagem base
FROM node:18-alpine

# Etapa 2: Definir diretório de trabalho dentro do contêiner
WORKDIR /app

# Etapa 3: Copiar os arquivos package.json e package-lock.json para o contêiner
COPY package*.json ./

# Etapa 4: Instalar as dependências da aplicação
RUN npm install

# Etapa 5: Copiar o código da aplicação para o contêiner
COPY . .

# Etapa 6: Expor a porta em que a aplicação vai rodar
EXPOSE 3000

# Etapa 7: Comando para iniciar a aplicação
CMD ["npm", "run", "start"]