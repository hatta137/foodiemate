FROM node

RUN apt-get update

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000 - 30001


CMD ["npm", "start"]