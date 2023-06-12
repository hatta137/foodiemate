import {Router} from "express";
import User from "../models/user.js";
import bcrypt from 'bcryptjs'


const router = Router();


router.get("/", async (req, res) => {
    res.send("users entry")
})


router.get("/allUsers", async (_req, res) => {
    const data = await User.find()
    res.json(data)
})


router.post("/login", async (req, res) => {
    try {
        const { userName, password } = req.body;

        // Überprüfen, ob der Benutzername und das Passwort korrekt sind
        const user = await User.findOne({ userName });

        console.log(password)
        console.log(userName)
        console.log(await user.comparePassword(password))

        const passwordCheck = await user.comparePassword(password)

        if (!user || !passwordCheck) {
            // Benutzer nicht gefunden oder Passwort stimmt nicht überein
            return res.status(401).json({ message: "Ungültige Anmeldeinformationen" });
        }

        //console.log(user)
        req.session.userId = user._id

        res.status(200).json("eingeloggt" );

    } catch (err) {
        console.error('Fehler beim Login', err);
        res.status(500).json({ error: 'Serverfehler' });
    }
});

//logout
router.post("/logout", (req, res) => {
    // Überprüfen, ob eine aktive Sitzung vorhanden ist
    if (req.session) {
        // Löschen Sie die Sitzungsdaten und beenden Sie die Sitzung
        req.session.destroy((err) => {
            if (err) {
                console.error('Fehler beim Logout', err);
                res.status(500).json({ error: 'Serverfehler' });
            } else {
                // Erfolgreich ausgeloggt
                res.status(200).json({ message: 'Erfolgreich ausgeloggt' });
            }
        });
    } else {
        // Keine aktive Sitzung vorhanden
        res.status(400).json({ message: 'Keine aktive Sitzung vorhanden' });
    }
});


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


router.put("/update/:userId", async (req, res) => {
    try {
        if (!req.session || req.session.userId !== req.params.userId) {
            return res.status(401).json({ message: 'Unautorisierter Zugriff' });
        }

        const userId = req.params.userId;
        const updateData = req.body;

        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true });

        if (updatedUser) {
            res.status(200).json({ message: 'Daten erfolgreich aktualisiert', user: updatedUser });
        } else {
            res.status(404).json({ message: 'Benutzer nicht gefunden' });
        }
    } catch (err) {
        console.error('Fehler bei Aktualisierung der Daten', err);
        res.status(500).json({ error: 'Serverfehler' });
    }
});


/**
 * UserId → ID von dem User der jemandem folgen möchte
 * FollowerId → ID von der Person der gefolgt werden soll
 */
router.post('/:userId/follow', async (req, res) => {
    try {
        const userId = req.params["userId"]
        const followerId = req.body["followerId"]

        if (!req.session || req.session.userId !== userId) {
            return res.status(401).json({ message: 'Unautorisierter Zugriff' });
        }

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

        if (!req.session || req.session.userId !== userId) {
            return res.status(401).json({ message: 'Unautorisierter Zugriff' });
        }

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

    if (!req.session || req.session.userId !== userId) {
        return res.status(401).json({ message: 'Unautorisierter Zugriff' });
    }

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


router.delete("/deleteUser", async (req, res) => {
    const userId = req.session.userId

    if (!req.session || req.session.userId !== userId) {
        return res.status(401).json({ message: 'Unautorisierter Zugriff' });
    }

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


router.post('/addRecipe/:userId', async (req, res) => {
    const recipeId = req.body.recipeId
    const userId = req.params.userId

    req.session.userId = userId

    console.log(userId)
    console.log(req.session.userId)
    console.log(req.session)

    if (!req.session || req.session.userId !== userId) {
        return res.status(401).json({ message: 'Unautorisierter Zugriff' });
    }

    try {
        const user = await User.findById(userId)

        if (!user) {
            return res.status(404).json({ error: 'Benutzer nicht gefunden' })
        }

        user.myRecipes.push(recipeId)

        await user.save()

        res.status(200).json({ message: 'Rezept wurde dem Benutzer hinzugefügt' })
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
})


router.post('/dropRecipe/', async (req, res) => {
    const recipeId = req.body.recipeId
    const userId = req.session.userId

    if (!req.session || req.session.userId !== userId) {
        return res.status(401).json({ message: 'Unautorisierter Zugriff' });
    }

    try {
        const user = await User.findById(userId)

        if (!user) {
            return res.status(404).json({ error: 'Benutzer nicht gefunden' })
        }

        user.myRecipes.pop(recipeId)

        await user.save()

        res.status(200).json({ message: 'Rezept wurde dem Benutzer entfernt' })
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

router.put('/setCookingTogetherDate', async (req, res) => {
    const userId = req.session.userId

    if (!req.session || req.session.userId !== userId) {
        return res.status(401).json({ message: 'Unautorisierter Zugriff' });
    }

    try {

        const updateDate = req.body

        const updatedUser = await User.findByIdAndUpdate(userId, updateDate, { new: true, runValidators: true })

        if (updatedUser) {
            res.status(200).json({ message: 'Daten erfolgreich aktualisiert', user: updatedUser })
        } else {
            res.status(404).json({ message: 'Benutzer nicht gefunden' })
        }

    } catch(err) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
})


router.delete('/removeCookingTogetherDate', async (req, res) => {
    const userId = req.session.userId

    if (!req.session || req.session.userId !== userId) {
        return res.status(401).json({ message: 'Unautorisierter Zugriff' })
    }

    try {
        const updateDate = { cookingTogetherDate: null }

        const updatedUser = await User.findByIdAndUpdate(userId, updateDate, { new: true, runValidators: true })

        if (updatedUser) {
            res.status(200).json({ message: 'Datum erfolgreich entfernt', user: updatedUser })
        } else {
            res.status(404).json({ message: 'Benutzer nicht gefunden' })
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
})


// Get Mail

router.get('/getEmailAddress/:userId', async (req, res) => {
    const userId = req.params.userId

    try {

        const userEmail = await User.findById(userId)

        if (userEmail) {
            res.status(200).json({ message: 'Datum erfolgreich entfernt', user: updatedUser })
        }


    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

// aber in CTG API!!
// GET alle User welche ein Datum bei CookingTogether gesetzt haben

// POST mit Kontaktdaten an User via email

export default router
