# Etapa 1: Construir a aplicação
FROM node:18 AS build

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copie o package.json e o package-lock.json (se existir)
COPY package*.json ./

# Instale as dependências da aplicação
RUN npm install

# Copie o restante do código fonte para dentro do contêiner
COPY . .

# Etapa 2: Criar o contêiner final para produção
FROM node:18-slim

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copie o diretório node_modules da etapa anterior
COPY --from=build /usr/src/app/node_modules /usr/src/app/node_modules

# Copie o código da aplicação da etapa anterior
COPY --from=build /usr/src/app /usr/src/app

# Expõe a porta que a aplicação vai rodar
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "start"]