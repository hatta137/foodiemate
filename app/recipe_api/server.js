'use strict'

import express from 'express'
import { router as recipesRouter } from "./routes/recipes.js";
import mongoose from "mongoose"
import swaggerUi from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'
import session from "express-session"
import MongoStore from 'connect-mongo';

mongoose.connect("mongodb://database/foodiemate");



const app = express()
app.use(express.json())

const port = 3001

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3003'); // URL deiner React-Anwendung
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true'); // Hinzufügen dieser Zeile, um Cookies über Cross-Origin-Anfragen zu ermöglichen
    next();
});


const sessionStore = MongoStore.create({
    mongoUrl: 'mongodb://database/foodiemate', // MongoDB-Verbindungs-URL
    collectionName: 'sessions', // Name der MongoDB-Sessions-Sammlung
    ttl: 3600 // Ablaufzeit der Session in Sekunden
});

// Use the session middleware with some options
app.use(session({
    secret: "dflskd", // string to encrypt the session cookie
    name: "session", // cookie name
    resave: false, // avoid saving session if unmodified
    saveUninitialized: true, // save session even if empty
    store: sessionStore,
    cookie: {
        maxAge: 60 * 60 * 1000, // expiration time -> one hour
        secure: false, // needs to be true for HTTPS
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
                url: "http://localhost:3000",
                description: "USER_API",
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