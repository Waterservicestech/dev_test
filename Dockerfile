#TODO Configure o Dockerfile
#imagem oficial do Node.js como base
FROM node:20

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia o package.json e o package-lock.json para o contêiner
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos da aplicação para o contêiner
COPY . .

# Expõe a porta que o servidor usa
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["npx", "ts-node", "src/index.ts"]
