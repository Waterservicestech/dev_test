#TODO Configure o Dockerfile
#node:latest
FROM node:18-alpine

WORKDIR /api
COPY . .

RUN npm install --quiet --no-optional --no-fund --loglevel=error

RUN npm run build
EXPOSE 3000

CMD ["npm", "run", "start"]