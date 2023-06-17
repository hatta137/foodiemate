# Verwenden Sie eine offizielle Node.js-Alpine-Basis als Basisimage
FROM node:alpine

# Legen Sie das Arbeitsverzeichnis innerhalb des Containers fest
WORKDIR /usr/src/app

# Kopieren Sie das package.json- und package-lock.json-Dateien in das Arbeitsverzeichnis
COPY package*.json ./

# Installieren Sie die Abhängigkeiten
RUN npm install

# Kopieren Sie den gesamten Projektinhalt in das Arbeitsverzeichnis
COPY . .

# Bauen Sie das Projekt
RUN npm run build

# Setzen Sie den Port für den Container
EXPOSE 3003

# Starten Sie den React-Server
CMD ["npm", "start"]