#TODO Configure o Dockerfile

# Usa a img base do Node, baseada em Alpine Linux, que é bem mais leve
FROM node:18-alpine

# Diretório de trabalho dentro do container
WORKDIR /app

# Instala o MySQL Client
RUN apk add --no-cache mysql-client

# Copia os arquivos de dependencias do projeto
COPY package*.json ./

# Instala as dependencias do Node
RUN npm install

# Copia todos os arquivos do projeto para o container
COPY . .

# Builda o projeto 
RUN npm run build

# Expõe a porta 3000 para a comunicação externa
EXPOSE 3000

# Define o comando para indicar a aplicação quando o container for executado
CMD ["npm", "start"]

