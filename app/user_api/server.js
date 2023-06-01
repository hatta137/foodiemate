'use strict'

import express from 'express'
import { router as usersRouter } from "./routes/users.js";
import mongoose from "mongoose"
import swaggerUi from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'

mongoose.connect("mongodb://database/foodiemate");



const app = express()
app.use(express.json())

const port = 3000


app.use("/users", usersRouter);


const options = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "Express API with Swagger",
            version: "0.1.0",
            description: "This is a simple CRUD API application made with Express and documented with Swagger",
        },
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Development server',
        },
    ],
    apis: ["./src/**/*.js"],
};

const specs = swaggerJsDoc(options);

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
);
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})