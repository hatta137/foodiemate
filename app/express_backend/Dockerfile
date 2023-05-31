FROM node

RUN apt-get update

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm i --save express

RUN npm i mongoose

RUN npm i bcryptjs

RUN npm i --save jsonwebtoken

COPY . .

EXPOSE 3000


CMD ["npm", "start"]