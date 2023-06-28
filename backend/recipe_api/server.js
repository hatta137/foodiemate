'use strict'

import express from 'express'
import { router as recipesRouter } from "./routes/recipes.js";
import mongoose from "mongoose"
import swaggerUi from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'
import session from "express-session"
import MongoStore from 'connect-mongo';
import cors from "cors";

mongoose.connect("mongodb://database/foodiemate");

process.env.TZ = 'Europe/Berlin';

const app = express()
app.use(express.json())

const port = 20064

// app.use(function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:20061'); // URL deiner React-Anwendung
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     res.header('Access-Control-Allow-Credentials', 'true'); // Hinzufügen dieser Zeile, um Cookies über Cross-Origin-Anfragen zu ermöglichen
//     next();
// });
app.use(cors({ origin: true, withCredentials:true}));


const sessionStore = MongoStore.create({
    mongoUrl: 'mongodb://database/foodiemate', // MongoDB-Verbindungs-URL
    collectionName: 'sessions', // Name der MongoDB-Sessions-Sammlung
    ttl: 3600 // Ablaufzeit der Session in Sekunden
});
const hour = 60 * 60 * 1000; // Eine Stunde in Millisekunden
const expirationDate = new Date(Date.now() + hour); // Berechne das Ablaufdatum (eine Stunde ab jetzt)

// Use the session middleware with some options
app.use(session({
    secret: "dflskd", // string to encrypt the session cookie
    name: "session", // cookie name
    resave: false, // avoid saving session if unmodified
    saveUninitialized: true, // save session even if empty
    store: sessionStore,
    cookie: {
        expires: expirationDate, // expiration time -> one hour
        secure: false, // needs to be true for HTTPS
        SameSite: 'none'
    }
}))


app.use("/recipe", recipesRouter);


const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.1",
        info: {
            title: "Express API with Swagger",
            version: "0.1.0",
            description: "This is a simple CRUD API application made with Express and documented with Swagger",
        },
        servers: [
            {
                url: "http://localhost:20064",
                description: "RECIPE_API",
            },
        ],
    },
    apis: ["./*.yml"],
};

const specs = swaggerJsDoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs)
);



app.listen(port, () => {
    console.log(`RECIPE_API listening at http://localhost:${port}`)
})