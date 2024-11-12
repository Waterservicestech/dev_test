#TODO Configure o Dockerfile

FROM node:latest

# Definindo o diretório de trabalho
WORKDIR /usr/src/app

# Copiando os arquivos do projeto para o contêiner
COPY package*.json ./
COPY tsconfig.json ./

# Instalando as dependências
RUN npm install

# Copiando o restante dos arquivos do projeto
COPY . .

# Compilando o TypeScript
RUN npm run build

# Expondo a porta em que a aplicação irá rodar
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "start"]

