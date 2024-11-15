#TODO Configure o Dockerfile

# Definindo a imagem base
FROM node:16-alpine

# Diretório de trabalho
WORKDIR /app

# Copiar os arquivos package.json e package-lock.json
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar o restante dos arquivos da aplicação
COPY . .

# Compilar os arquivos TypeScript
RUN npm run build

# Expor a porta que o app vai rodar
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "start"]
