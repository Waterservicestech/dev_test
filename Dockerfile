#TODO Configure o Dockerfile
FROM node:18

# Diretório de trabalho no contêiner
WORKDIR /usr/src/app

# Copiar arquivos de dependência
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar os arquivos da aplicação
COPY . .

# Compilar o TypeScript para JavaScript
RUN npm run build

# Expor a porta da aplicação
EXPOSE 3000

# Rodar o servidor
CMD ["node", "dist/index.js"]