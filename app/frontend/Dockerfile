FROM node

RUN apt-get update

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm i express

RUN npm i mongoose

RUN npm i bcryptjs

RUN npm i jsonwebtoken

RUN npm i -g nodemon

COPY . .

EXPOSE 3003


CMD ["npm", "start"]