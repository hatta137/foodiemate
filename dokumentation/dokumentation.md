# Projektgruppe: ss_2023_wa_foodieamte
## Maris Engel & Hendrik Lendeckel



## Installation

1. git clone https://git.ai.fh-erfurt.de/ma4163sp1/wa/ss23/ss_2023_wa_foodieamte.git
2. Projekt öffnen
3. Im Projekt ein Terminal öffnen und docker compose up ausführen:
```
docker compose up
```

## Bug-fixing wenn docker compose up fehlschlägt
1. /node_modules - Ordner in den folgenden Ordnern löschen und "npm install" in diesen Ordnern ausführen (Terminal):
* cooking_together_api
* recipe_api
* user_api
* frontend

## Verwendete Bibliotheken und Frameworks
### Backend und Datenbank 
* nodeJS-Bibliothek: Mongoose https://mongoosejs.com/docs/
* JavaScript-Bibliothek: Axios https://axios-http.com/docs/intro
* DB-connection: conect-mongo https://www.npmjs.com/package/connect-mongo
* Encryption: bcryptjs https://github.com/dcodeIO/bcrypt.js/blob/master/README.md
* Authentication: JWT-Token: https://jwt.io/
* Navigation: react-router-dom: https://reactrouter.com/en/main
* cookie-parser
### Frontend
* Bootstrap: MDBootstrap https://mdbootstrap.com/docs/react/
* Authentication: React-AuthKit: https://authkit.arkadip.dev/installation/



## Container
### Frontend
```
http://localhost:20061/
```

### Datenbank
```
http://localhost:20062/  
```

### user_api
```
API:        http://localhost:20063/users
Swagger:    http://localhost:20063/api-docs
```

### recipe_api
```
API:        http://localhost:20064/recipe
Swagger:    http://localhost:20064/api-docs
```

### cooking_together_api
```
API:        http://localhost:20065/cookingTogether
Swagger:    http://localhost:20065/api-docs
```

# API´s welche von FoodieMate angeboten werden
## findCookingBuddy

Die "findCookingBuddy" - API liefert eine Liste von Benutzern zurück, die bereit sind, 
sich mit anderen Menschen zum Kochen zu verabreden. Zurückgegeben werden userName und E-Mailadresse. Diese kann in der
"inviteCookingBuddy" - API genutzt werden.

```
GET http://localhost:20065/cookingTogether/findCookingBuddy
```

## inviteCookingBuddy
Die "inviteCookingBuddy" - API schickt eine E-Mail an die angegebene Adresse. Man kann in den Body die Kontaktdaten hinterlegen, 
bei denen sich der FoodieMate-User melden kann.

```
POST http://localhost:20065/cookingTogether/inviteCookingBuddy

Body:
{
    "email": "max@mustermann.de",
    "contactData": "Meine Kontaktdaten"
}
```

## Backup package-json
### frontend
```
{
  "name": "react_frontend",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@fortawesome/fontawesome-free": "^6.4.0",
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "axios": "^1.4.0",
    "bcryptjs": "^2.4.3",
    "bootstrap": "^5.3.0",
    "mdb-react-ui-kit": "^6.1.0",
    "mdb-ui-kit": "^6.4.0",
    "react": "^18.2.0",
    "react-auth-kit": "^2.12.3",
    "react-bootstrap": "^2.7.4",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.13.0",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "PORT=20061 react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```
### user_api
```
{
  "name": "user_api",
  "version": "1.0.0",
  "description": "",
  "main": "server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "bcrypt-nodejs": "^0.0.3",
    "bcryptjs": "^2.4.3",
    "connect-mongo": "^5.0.0",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "express-session": "^1.17.3",
    "jsonwebtoken": "^9.0.0",
    "mongoose": "^7.2.4",
    "swagger-jsdoc": "^6.2.8",
    "swagger-ui-express": "^4.6.3"
  },
  "type": "module"
}
```

### recipe_api
```
{
  "name": "recipe_api",
  "version": "1.0.0",
  "description": "",
  "main": "server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "axios": "^1.4.0",
    "connect-mongo": "^5.0.0",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "express-session": "^1.17.3",
    "jsonwebtoken": "^9.0.0",
    "mongoose": "^7.2.4",
    "swagger-jsdoc": "^6.2.8",
    "swagger-ui-express": "^4.6.3"
  },
  "type": "module"
}
```
### cooking_together_api
```
{
  "name": "cooking_together_api",
  "version": "1.0.0",
  "description": "",
  "main": "server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@sendgrid/mail": "^7.7.0",
    "axios": "^1.4.0",
    "express": "^4.18.2",
    "express-session": "^1.17.3",
    "mongoose": "^7.2.4",
    "swagger-jsdoc": "^6.2.8",
    "swagger-ui-express": "^4.6.3"
  },
  "type": "module"
}
```

## Quellen
### Bilder
https://www.pexels.com/de-de/
### ChatGPT
https://chat.openai.com/
ChatGPT wurde benutzt um ein grobes Besispiel SChema zu erzeugen für die Routen im Backend. Dieses wurde als Grundlage für alle Routen im Backend genutzt:
* Prompt: "gib mir ein Schema für eine node.js route für den Login einer users"
* Antwort:
```
// POST-Anfrage für den Login
router.post('/login', (req, res) => {
  // Benutzername und Passwort aus der Anfrage extrahieren
  const { username, password } = req.body;

  // Überprüfung der Benutzeranmeldeinformationen
  if (username === 'admin' && password === 'pass123') {
    // Authentifizierung erfolgreich
    res.status(200).json({ message: 'Login erfolgreich' });
  } else {
    // Authentifizierung fehlgeschlagen
    res.status(401).json({ message: 'Ungültige Anmeldeinformationen' });
  }
});
```








