# ss_2023_wa_foodieamte



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

## Frontend
```
http://localhost:20061/
```

## Datenbank
```
http://localhost:20062/  
```

## user_api
```
API:        http://localhost:20063/users
Swagger:    http://localhost:20063/api-docs
```

## recipe_api
```
API:        http://localhost:20064/recipe
Swagger:    http://localhost:20064/api-docs
```

## cooking_together_api
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








