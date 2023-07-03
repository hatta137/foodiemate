'use strict'

import express from 'express'
import { router as cookingTogetherRouter } from "./routes/cookingTogether.js";
import mongoose from "mongoose"
import swaggerUi from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'

mongoose.connect("mongodb://ss2023_wa_foodiemate_database/foodiemate");



const app = express()
app.use(express.json())

const port = 20065


app.use("/cookingTogether", cookingTogetherRouter);


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
                url: "http://194.94.204.27:20061",
                description: "COOKINGTOGETHER_API",
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