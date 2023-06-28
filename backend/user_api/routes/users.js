import {Router} from "express";
import User from "../models/user.js";
import bcrypt from 'bcryptjs'
import Session from "express-session/session/session.js";

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
        console.log(password)
        console.log(userName)

        const user = await User.findOne({ userName });
        if (!user) {
            console.log("Benutzer nicht gefunden")
            return res.status(401).json({ error: 'Benutzer nicht gefunden' });
        }

        // Überprüfe das Passwort
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            console.log("Passwort falsch")
            return res.status(401).json({ error: 'Ungültige Benutzerdaten' });
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






router.get("/userStatus", async (req, res) => {

    console.log(req.body)
    console.log(req.session)
    try {
        if (!req.session.userId) {
            console.log('keine userId')
            console.log(req.session.userId)
            return res.status(401).json({ message: 'Unautorisierter Zugriff' });

        } else {

            console.log(req.session.userId)
            const user = await User.findOne({ _id: req.session.userId }, { _id: false, passwordHash: false, __v: false });
            return res.status(200).json({ message: 'user eingeloggt', user });
        }

    }catch (err) {
        console.log('Serverfehler')
        console.log(req.session.userId)
        console.error('Fehler bei Status Check', err);
        res.status(500).json({ error: 'Serverfehler' });
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

router.get('/getByUserName', async (req, res) => {
    try {
        const name = req.query.userName;

        const user = await User.findOne({ userName: name })

        if (!user) {
            return res.status(404).json({ error: 'User nicht gefunden' })
        }

        res.status(200).json({ user })
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
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

router.get('/getEmailAddress/:userId', async (req, res) => {
    const userId = req.params.userId

    try {

        const userEmail = await User.findById(userId)

        if (userEmail) {
            res.status(200).json({ message: 'Email-Adresse erfolgreich abgerufen', email: userEmail.emailAddress })
        } else {
            res.status(404).json({ message: 'Benutzer nicht gefunden' })
        }


    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

router.get('/getUserCTG', async (req, res) => {
    const date = req.params.date

    try {

        const users = await User.find( {cookingTogetherDate: { $ne: null } } ).select('-password')

        if (users) {
            res.status(200).json({ message: 'Folgende User wurden gefunden', users: users })
        } else {
            res.status(404).json({ message: 'keine User gefunden' })
        }

    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
})
export default router