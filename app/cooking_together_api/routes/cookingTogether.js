import {Router} from "express";

const router = Router()

router.get("/", async (req, res) => (
    res.send("cookingTogether entry")
))

router.get("/findCookingBuddy", (req, res) => {
    //Suche nach Benutzern in DB mit CTG-Date != null
    //gebe benutzer zurück
})

router.get("/inviteCookingBuddy/:userId", (req, res) => {
    //Suche nach Benutzer mit userID
    //nehme Kontaktdaten von der einladenden Person entgegen
    //schreibe email an User mit kontaktdaten (externe API)
})


export { router }