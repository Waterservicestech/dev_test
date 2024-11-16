# Usar a imagem Node.js Alpine, que é leve
FROM node:lts-alpine

# Definir o ambiente como produção
ENV NODE_ENV=production

# Definir o diretório de trabalho
WORKDIR /dev_test/dist

# Copiar apenas os arquivos necessários para instalar as dependências
COPY package*.json ./

# Instalar apenas as dependências de produção
RUN npm install --production --silent

# Copiar o restante do código
COPY . .

# Expor a porta da aplicação
EXPOSE 3000

# Garantir permissões adequadas para o usuário "node"
RUN chown -R node /dev_test/dist

# Alternar para o usuário "node" para executar a aplicação com segurança
USER node

# Comando para iniciar a aplicação
CMD ["npm", "start"]