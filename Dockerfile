# #TODO Configure o Dockerfile
# # Use uma imagem base oficial do Node.js
# FROM node:20

# # Define o diretório de trabalho dentro do container
# WORKDIR /app

# # Copia os arquivos necessários para o container
# COPY package*.json ./
# COPY tsconfig.json ./
# COPY src ./src

# # Instala as dependências
# RUN npm install

# # Copiar todos os arquivos do projeto para dentro do container
# COPY . .


# # Compila o TypeScript
# RUN npm run build

# # Definir a porta que a aplicação vai expor
# EXPOSE 3000

# # Define o comando para iniciar a aplicação
# CMD ["node", "app/dist/index.js", "start", "npm"]

# Etapa de construção
FROM node:20 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build  
#Certifique-se de que o build está sendo executado

# Etapa de execução
FROM node:20

WORKDIR /app
COPY --from=build /app/dist /app/dist 

#Copie o dist da etapa de build para a etapa final
COPY package*.json ./
RUN npm install --only=production

CMD ["node", "dist/index.js"]  
#Altere isso se seu arquivo de entrada for diferente