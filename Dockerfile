# Definir a imagem base para o Node.js (você pode especificar uma versão mais recente ou exata)
FROM node:16

# Definir o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copiar o arquivo package.json e package-lock.json (caso exista) para o diretório de trabalho
COPY package*.json ./

# Instalar as dependências do projeto
RUN npm install

# Copiar o restante do código-fonte para o diretório de trabalho no container
COPY . .

# Expor a porta 3000 para a aplicação
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
