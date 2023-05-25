import { Router } from "express"
import User from "../models/user.js";


const router = Router()

router.get("/", async(req, res) => {

    res.send("users entry")

})

router.get("/allUsers", async (req, res) => {

    res.send("all users")
})

router.post("/login", async (req, res) => {

    res.send("login")
})

router.post("/register", async (req, res) => {

    res.send("register")
})

router.put("/changeMail", async (req, res) => {

    res.send("change Mail")
})

router.delete("/deleteUser", async (req, res) => {

    res.send("delete users")
})


export { router }