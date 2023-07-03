'use strict'

import express from 'express'
import { router as recipesRouter } from "./routes/recipes.js";
import mongoose from "mongoose"
import swaggerUi from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'
import session from "express-session"
import MongoStore from 'connect-mongo';
import cors from "cors";
import cookieParser from 'cookie-parser'

mongoose.connect("mongodb://ss2023_wa_foodiemate_database/foodiemate");


const app = express()


const port = 20064


app.use(function (req, res, next) {
    const allowedOrigins = [
        'http://194.94.204.27:20061',
        'http://194.94.204.27:20062',
        'http://194.94.204.27:20063',
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
});

app.use(express.json())
app.use(cookieParser());





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
                url: "http://194.94.204.27:20064",
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
    console.log(`RECIPE_API listening at http://194.94.204.27:${port}`)
})