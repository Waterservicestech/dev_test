# Selecionando o node.js
FROM node:18

# Selecionando o diretório no container
WORKDIR /app

# Copiando os arquivos package.json e o package-lock.json
COPY package*.json ./

# Instalando as dependências
RUN npm install

# Copiando o resto do código da aplicação
COPY . .

# Construindo o código do TypeScript
RUN npm run build

# Expondo a porta onde a aplicação é executada
EXPOSE 3000

# Executando o aplicativo
CMD ["npm", "start"]