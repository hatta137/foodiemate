

import express from 'express'
import { router as recipesRouter } from "./routes/recipes.js";
import mongoose from "mongoose"

mongoose.connect("mongodb://database/foodiemate");



const app = express()
app.use(express.json())

const port = 3001


app.use("/recipe", recipesRouter);

app.listen(port, () => {
    console.log(`RECIPE_API listening at http://localhost:${port}`)
})