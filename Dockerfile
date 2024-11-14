# Etapa 1: Definir a imagem base
FROM node:18-alpine AS build

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar os arquivos de dependências
COPY package*.json ./

# Instalar as dependências do projeto
RUN npm install

# Copiar todo o código fonte para o container, incluindo os arquivos de teste
COPY . .

# Compilar o código TypeScript para JavaScript
RUN npm run build

# Etapa 2: Definir a imagem final
FROM node:18-alpine

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar os arquivos necessários da etapa anterior
COPY --from=build /app /app

# Instalar as dependências de produção
RUN npm install --only=production

# Definir o comando para iniciar a aplicação
CMD ["node", "dist/index.js"]

# Expor a porta que a aplicação estará escutando
EXPOSE 3000
