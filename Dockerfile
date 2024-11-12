FROM node:alpine

EXPOSE 3000

WORKDIR /opt/server

COPY ./src /opt/server/src
COPY *.json /opt/server/

ENV DB_HOST=localhost
ENV PORT=3000
ENV DB_USER=root
ENV DB_PASSWORD=senha
ENV DB_NAME=db

RUN npm i

CMD [ "npm", "start" ]