'use strict'

import express from 'express'
import { router as usersRouter } from "./user_module/src/routes/users.js";
import mongoose from "mongoose";


const app = express()
app.use(express.json())

const port = 3000

mongoose.connect('mongodb://127.0.0.1:27017/foodiemate')

app.use("/users", usersRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})