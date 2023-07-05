'use strict'

import express from 'express'
import usersRouter from "./routes/users.js"
import mongoose from "mongoose"
import swaggerUi from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'
import session from "express-session"
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import cors from "cors";
process.env.TZ = 'Europe/Berlin';
mongoose.connect("mongodb://ss2023_wa_foodiemate_database/foodiemate")



const app = express()
const allowedOrigins = [
    'http://localhost:20061',
    'http://localhost:20062',
    'http://localhost:20063',
    'http://localhost:20064',
    'http://localhost:20065',
    'http://194.94.204.27:20061',
    'http://194.94.204.27:20062',
    'http://194.94.204.27:20063',
    'http://194.94.204.27:20064',
    'http://194.94.204.27:20065',
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

app.use(express.json())

const port = 20063


/*app.use(function (req, res, next) {
    const allowedOrigins = [
        'http://localhost:20061',
        'http://localhost:20062',
        'http://localhost:20064',
        // Füge hier weitere erlaubte Ursprünge hinzu
    ];
    const { origin } = req.headers;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});*/





const sessionStore = MongoStore.create({
    mongoUrl: 'mongodb://ss2023_wa_foodiemate_database/foodiemate', // MongoDB-Verbindungs-URL
    collectionName: 'sessions', // Name der MongoDB-Sessions-Sammlung
    ttl: 3600 // Ablaufzeit der Session in Sekunden
});
const hour = 60 * 60 * 1000 * 4; // Eine Stunde in Millisekunden
const expirationDate = new Date(Date.now() + hour); // Berechne das Ablaufdatum (eine Stunde ab jetzt)

// Use the session middleware with some options
// app.use(cors({ origin: true, credentials: true }));
app.use(session({
    secret: "dflskd",
    name: "session",
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        expires: expirationDate,
        secure: false,
        sameSite: 'none'
    }
}));
app.use(express.json());
app.use(cookieParser());

app.use("/users", usersRouter);
console.log('curren working dir', process.cwd())

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
                url: "http://localhost:20063/users",
                description: "USER_API",
            },
        ],
    },
    apis: ["./*.yml"],
};

const specs = swaggerJsDoc(swaggerOptions);

//Swagger Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs)
);



app.listen(port, () => {
    console.log(`USER_API listening at http://localhost:${port}`)
})