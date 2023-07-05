FROM node:latest

RUN apt-get update

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 20065

CMD ["npm", "start"]