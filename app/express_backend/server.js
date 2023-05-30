'use strict'

import express from 'express'
import { router as usersRouter } from "./routes/users.js";
import mongoose from "mongoose"

mongoose.connect("mongodb://database/example_db");



const app = express()
app.use(express.json())

const port = 3000


app.use("/users", usersRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})