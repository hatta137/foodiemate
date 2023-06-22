FROM node:latest

RUN apt-get update

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm i express

RUN npm i mongoose

RUN npm i -g nodemon

COPY . .

EXPOSE 3000


CMD ["npm", "start"]