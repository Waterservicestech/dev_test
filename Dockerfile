# Imagem oficial do Node.js como base
FROM node:16

# Diretório de trabalho no contêiner
WORKDIR /app

# Copia os arquivos de dependências para o contêiner
COPY package.json package-lock.json ./

# Instala as dependências da aplicação
RUN npm install

# Copia o restante do código para o contêiner
COPY . .

# Compila o código TypeScript para JavaScript
RUN npm run build

# Expoe a porta que a aplicação usará
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "dist/index.js"]
