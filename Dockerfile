# Usando uma imagem oficial do Node.js
FROM node:14

# Definindo o diretório de trabalho
WORKDIR /app

# Copiando o package.json e instalando dependências
COPY package.json ./
RUN npm install

# Copiando o restante do código
COPY . .

# Compilando o código, se necessário (por exemplo, com TypeScript)
RUN npm run build   # Se você usa o comando npm run build para compilar seu código

# Expondo a porta para acessar o servidor
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
