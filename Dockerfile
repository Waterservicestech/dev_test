#TODO Configure o Dockerfile
FROM node:latest

# use this folder as the working directory (like a CD command)
WORKDIR /usr/src

# copy the current directory to the workdir
COPY . .

# "expose" port 3000
EXPOSE 3000

# install dependencies
RUN npm install

# compile ts to js
RUN npm run build

# run the app
CMD ["npm", "start"]