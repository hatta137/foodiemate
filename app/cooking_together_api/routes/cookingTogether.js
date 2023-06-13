import {Router} from "express";
import axios from "axios"

const router = Router()

router.get("/", async (req, res) => (
    res.send("cookingTogether entry")
))

router.get("/findCookingBuddy",async (req, res) => {
    try {

        const response = await axios.get('http://users_api:3000/users/getUserCTG')
        const users = response.data.users

        // Extrahiere Datum und Benutzernamen
        const filteredUsers = users.map(user => ({
            date: user.cookingTogetherDate,
            username: user.username
        }));

        res.status(200).json({ users: response });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get("/inviteCookingBuddy/:userId", (req, res) => {
    //Suche nach Benutzer mit userID
    //nehme Kontaktdaten von der einladenden Person entgegen
    //schreibe email an User mit kontaktdaten (externe API)
})


export { router }