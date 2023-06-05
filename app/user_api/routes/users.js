import {Router} from "express";
import User from "../models/user.js";
import bcrypt from 'bcryptjs'

const router = Router();



/**
 *
 */
router.get("/", async (req, res) => {
    res.send("users entry")
})





/**
 *
 */
router.get("/allUsers", async (_req, res) => {
    const data = await User.find()
    res.json(data)
})





/**
 * @swagger
 * /login:
 *   post:
 *     summary: Benutzeranmeldung
 *     description: Authentifiziert den Benutzer und gibt ein JWT-Token zurück.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Erfolgreiche Anmeldung
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Eingeloggt
 *       401:
 *         description: Ungültige Anmeldeinformationen
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Ungültige Anmeldeinformationen
 *       500:
 *         description: Serverfehler
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Serverfehler
 */
//TODO @HendrikToken zurückgeben
router.post("/login", async (req, res) => {
    try {
        const { userName, password } = req.body;

        // Überprüfen, ob der Benutzername und das Passwort korrekt sind
        const user = await User.findOne({ userName });

        if (!user || !user.comparePassword(password)) {
            // Benutzer nicht gefunden oder Passwort stimmt nicht überein
            return res.status(401).json({ message: "Ungültige Anmeldeinformationen" });
        }

        // Erzeugen Sie ein JWT-Token für den authentifizierten Benutzer
        //const token = generateToken(user);

        // Senden Sie das Token als Antwort an den Client
        res.status(200).json("eingeloggt" );
        //res.status(200).json({token});
    } catch (err) {
        console.error('Fehler beim Login', err);
        res.status(500).json({ error: 'Serverfehler' });
    }
});




/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registrierung eines neuen Benutzers
 *     description: Registriert einen neuen Benutzer mit den angegebenen Daten.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: Vorname des Benutzers.
 *               lastName:
 *                 type: string
 *                 description: Nachname des Benutzers.
 *               userName:
 *                 type: string
 *                 description: Benutzername des Benutzers.
 *               emailAddress:
 *                 type: string
 *                 format: email
 *                 description: E-Mail-Adresse des Benutzers.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Passwort des Benutzers.
 *     responses:
 *       200:
 *         description: Erfolgreiche Registrierung.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Erfolgsmeldung.
 *                 user:
 *                   type: object
 *                   description: Informationen über den neu registrierten Benutzer.
 *                   properties:
 *                     firstName:
 *                       type: string
 *                       description: Vorname des Benutzers.
 *                     lastName:
 *                       type: string
 *                       description: Nachname des Benutzers.
 *                     userName:
 *                       type: string
 *                       description: Benutzername des Benutzers.
 *                     emailAddress:
 *                       type: string
 *                       format: email
 *                       description: E-Mail-Adresse des Benutzers.
 *       500:
 *         description: Serverfehler bei der Registrierung.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Fehlernachricht.
 */
router.post("/register", async (req, res) => {
    const data = req.body
    const saltRounds = 10

    try {
        const password = data["password"]

        const newUser = new User({
            firstName: data["firstName"],
            lastName: data["lastName"],
            userName: data["userName"],
            emailAddress: data["emailAddress"],
            password: await bcrypt.hash(password, saltRounds)
        })
        await newUser.save()
        res.status(200).json({ message: 'User erfolgreich angelegt', user: newUser })
    } catch (err) {
        console.error('Fehler bei Registrierung', err)
        res.status(500).json({ error: 'Serverfehler' })
    }
})





/**
 * @swagger
 * /update/{userId}:
 *   put:
 *     summary: Aktualisiert die Daten eines Benutzers
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: Die ID des Benutzers, dessen Daten aktualisiert werden sollen
 *         schema:
 *           type: string
 *       - in: body
 *         name: updateData
 *         required: true
 *         description: Die zu aktualisierenden Daten des Benutzers
 *         schema:
 *           type: object
 *           properties:
 *             firstName:
 *               type: string
 *             lastName:
 *               type: string
 *             userName:
 *               type: string
 *             emailAddress:
 *               type: string
 *     responses:
 *       200:
 *         description: Erfolgreiche Aktualisierung der Benutzerdaten
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: Benutzer nicht gefunden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Serverfehler
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.put("/update/:userId", async (req, res) => {
    try {
        const userId = req.params.userId
        const updateData = req.body

        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true })

        if (updatedUser) {
            res.status(200).json({ message: 'Daten erfolgreich aktualisiert', user: updatedUser })
        } else {
            res.status(404).json({ message: 'Benutzer nicht gefunden' })
        }
    } catch (err) {
        console.error('Fehler bei Aktualisierung der Daten', err)
        res.status(500).json({ error: 'Serverfehler' })
    }
})


/**
 * UserId → ID von dem User der jemandem folgen möchte
 * FollowerId → ID von der Person der gefolgt werden soll
 */
router.post('/:userId/follow', async (req, res) => {
    try {
        const userId = req.params["userId"]
        const followerId = req.body["followerId"]

        // User dem der Follower hinzugefügt werden soll
        const user = await User.findById(userId)

        if(!user) {
            return res.status(404).json({message: 'User nicht gefunden'})
        }

        const follower = await User.findById(followerId)

        if(!follower) {
            return res.status(404).json({message: 'Follower nicht gefunden'})
        }

        if(user.followers.includes(followerId)) {
            return res.status(404).json({message: 'Follower bereits existent'})
        }
        await user.followers.push(follower)

        await user.save()

        res.status(200).json({ message: 'Follower erfolgreich hinzugefügt' })



    } catch (err) {
        console.error('Fehler beim Hinzufügen des Followers', err)
        res.status(500).json({ error: 'Serverfehler' })
    }
})




router.get('/:userId/followers', async (req, res) => {
    try {
        const userId = req.params["userId"]

        const user = await User.findById(userId).populate('followers')

        if(!user) {
            return res.status(404).json({ message: 'Benutzer nicht gefunden' })
        }

        const followers = user.followers

        res.status(200).json({ followers })
    } catch (err) {
        console.error('Fehler beim Abrufen der Follower', err)
    }
})




router.post('/:userId/unfollow', async (req, res) => {
    const userId = req.params['userId']
    const followerId = req.body['followerId']

    try {
        const user = await User.findById(userId)

        if(!user) {
            return res.status(404).json({ message: 'Benutzer nicht gefunden' })
        }

        if (!user.followers.includes(followerId)) {
            return res.status(404).json({ message: 'Benutzer ist nicht unter der Followern' })
        }

        user.followers.pop(followerId)

        await user.save()

        res.status(200).json({ message: 'Unfollow erfolgreich' })
    } catch(err) {
        console.error('Fehler beim Unfollow', error)
        res.status(500).json({ error: 'Serverfehler' })
    }

})





/**
 *
 */
router.delete("/deleteUser/:userId", async (req, res) => {
    const userId = req.params.userId

    User.findByIdAndDelete(userId)
        .then((updatedUser) => {
            if (updatedUser){
                res.status(200).json({message: 'Daten erfolgreich gelöscht'})
            }else{
                res.status(404).json({message: 'Benutzer nicht gefunden'})
            }
        })
        .catch((err) => {
            console.error('Fehler bei Aktualisierung der Daten', err)
            res.status(500).json({error: 'Serverfehler'})
        })
    res.send(userId)
})


// TODO newRecipe
// post newRecipe

export { router }
