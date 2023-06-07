'use strict'

import express from 'express'
import usersRouter from "./routes/users.js"
import mongoose from "mongoose"
import swaggerUi from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'
import session from "express-session"

mongoose.connect("mongodb://database/foodiemate")



const app = express()
app.use(express.json())

const port = 3000


// Use the session middleware with some options
app.use(session({
    secret: "dflskd", // string to encrypt the session cookie
    name: "session", // cookie name
    resave: false, // avoid saving session if unmodified
    saveUninitialized: true, // save session even if empty
    cookie: {
        maxAge: 60 * 60 * 1000, // expiration time -> one hour
        secure: false, // needs to be true for HTTPS
    }
}))


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
                url: "http://localhost:3000",
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