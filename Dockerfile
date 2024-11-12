#TODO Configure o Dockerfile

# Etapa 1: Usar uma imagem base do Node.js
FROM node:18-alpine

# Etapa 2: Definir diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Etapa 3: Copiar o package.json e package-lock.json para o container
COPY package*.json ./

# Etapa 4: Instalar dependências no container
RUN npm install

# Etapa 5: Copiar o código-fonte da aplicação para dentro do container
COPY . .

# Garantir permissões de execução para os binários do npm
RUN chmod -R 777 /usr/src/app/node_modules/.bin

# Etapa 6: Compilar o TypeScript
RUN npm run build

# Etapa 7: Expôr a porta que o Express vai rodar (3000 por padrão)
EXPOSE 3000

# Etapa 8: Definir o comando para rodar a aplicação
CMD ["npm", "start"]