#TODO Configure o Dockerfile

#ETAPA 1: Usar uma imagem bese do Node.js
FROM node:18-alpine AS builder

#Definir o diretorio de trabalho dentro do container
WORKDIR /app

#Copiar os arquivos de configuração e dependências
COPY package*.json ./

#Intalar as dependências do projeto
RUN npm install

#Copiar o restante dos arquivos da aplicação para o container
COPY . .

#Compilar o código TypeScript para JavaScript
RUN npm run build

#ETAPA 2: Construir a imagem final para execução
FROM node:18-alpine

#Definir o diretorio de trabalho para o container
WORKDIR /app

#Copiar apenas os arquivos necessários do estágio de build anterior
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

#Instalar apenas as dependências de produção
RUN npm install --omit=dev

#Expor a porta que a aplicação utiliza
EXPOSE 3000

#Comando para iniciar a aplicação
CMD [ "node", "dist/index.js" ]
