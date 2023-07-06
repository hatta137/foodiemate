import {Router} from "express";
import User from "../models/user.js";
import Recipe from "../models/recipe.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import isAuthenticated from '../auth.js'

const router = Router();

router.get("/", async (req, res) => {
    res.send("user entry")
})

router.get("/allUsers", async (_req, res) => {
    const data = await User.find()
    res.json(data)
})

router.post("/login", async (req, res) => {
    try {
        const { userName, password } = req.body;

        console.log(password);

        console.log(userName);

        const user = await User.findOne({ userName });

        if (!user) {
            console.log("Benutzer nicht gefunden");

            return res.status(401).json({ error: 'Benutzer nicht gefunden' });
        }

        // Überprüfe das Passwort
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            console.log("Passwort falsch");

            return res.status(401).json({ error: 'Ungültige Benutzerdaten' });
        }

        // Erzeuge das JWT-Token
        const token = jwt.sign({ userId: user._id }, 'sehr_geheimer_schluessel');

        console.log(token)

        return res.cookie("token", token).json({success:true,message:'LoggedIn Successfully', userId: user._id, token: token})
        //return res.status(200).json({ message: "welcome back", token: token });
    } catch (err) {
        console.error('Fehler beim Login', err);

        res.status(500).json({ error: 'Serverfehler' });
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
        });

        await newUser.save();

        res.status(200).json({ message: 'User erfolgreich angelegt', user: newUser });
    } catch (err) {
        console.error('Fehler bei Registrierung', err);

        res.status(500).json({ error: 'Serverfehler' });
    }
});

router.put("/update", isAuthenticated, async (req, res) => {
    const saltRounds = 10
    try {
        let token = req.cookies._auth;

        // Falls der Token nicht durch das react-auth-kit im Frontend gesetzt wurde --> für Postman
        if(!token) {
            token = req.cookies.token
        }

        const decoded = jwt.verify(token, 'sehr_geheimer_schluessel');
        const userId = decoded.userId;

        let updateData = req.body;
        const unHash = req.body.passwordUnhash;

        if (unHash) {
            console.log(unHash)
            updateData['password'] = await bcrypt.hash(unHash, saltRounds);
        }


        console.log(updateData)
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

router.get('/getByUserName/', async (req, res) => {
    try {
        const name = req.query.userName;
        console.log(name)
        const user = await User.findOne({ userName: name })
        console.log(user)
        if (!user) {
            return res.status(404).json({ error: 'User nicht gefunden' })
        }

        res.status(200).json({ user })
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
});

router.get('/getUser', isAuthenticated, async (req, res) => {
    try {
        let token = req.cookies._auth;

        // Falls der Token nicht durch das react-auth-kit im Frontend gesetzt wurde --> für Postman
        if(!token) {
            token = req.cookies.token
        }

        const decoded = jwt.verify(token, 'sehr_geheimer_schluessel');
        const userId = decoded.userId;

        const user = await User.findById(userId).populate('followers')

        if (!user) {
            return res.status(404).json({ error: 'User nicht gefunden' })
        }


        res.status(200).json({ user: user })
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
});

/**
 * UserId → ID von dem User der jemandem folgen möchte
 * FollowerId → ID von der Person der gefolgt werden soll
 */
router.post('/follow', isAuthenticated, async (req, res) => {
    try {

        let token = req.cookies._auth;

        // Falls der Token nicht durch das react-auth-kit im Frontend gesetzt wurde --> für Postman
        if(!token) {
            token = req.cookies.token
        }
        const decoded = jwt.verify(token, 'sehr_geheimer_schluessel');
        const userId = decoded.userId;

        const followerId = req.body.followerId

        const user = await User.findById(followerId);

        if (!user) {
            console.log("Benutzer nicht gefunden");
            return res.status(401).json({ error: 'Benutzer nicht gefunden' });
        }

        if(!user) {
            return res.status(404).json({message: 'User nicht gefunden'})
        }

        const follower = await User.findById(userId)

        if(!follower) {
            return res.status(404).json({message: 'Follower nicht gefunden'})
        }

        if(user.followers.includes(followerId)) {
            return res.status(404).json({message: 'Follower bereits existent'})
        }
        await user.followers.push(follower)

        await user.save()

        res.status(200).json({ message: 'Follower erfolgreich hinzugefügt'})



    } catch (err) {
        console.error('Fehler beim Hinzufügen des Followers', err)
        res.status(500).json({ error: 'Serverfehler' })
    }
})

router.get('/getfollowers', isAuthenticated, async (req, res) => {
    try {
        let token = req.cookies._auth;

        // Falls der Token nicht durch das react-auth-kit im Frontend gesetzt wurde --> für Postman
        if(!token) {
            token = req.cookies.token
        }
        const decoded = jwt.verify(token, 'sehr_geheimer_schluessel');
        const userId = decoded.userId;

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

router.post('/unfollow', isAuthenticated, async (req, res) => {
    // Id von dem Benutzer dessen Follower der angemeldete User ist und dem dieser Follower entzogen wird
    const userId = req.body.userId;


    let token = req.cookies._auth;

    // Falls der Token nicht durch das react-auth-kit im Frontend gesetzt wurde --> für Postman
    if(!token) {
        token = req.cookies.token
    }
    const decoded = jwt.verify(token, 'sehr_geheimer_schluessel');
    const followerId = decoded.userId;



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

router.delete("/deleteUser", isAuthenticated, async (req, res) => {
    let token = req.cookies._auth;

    // Falls der Token nicht durch das react-auth-kit im Frontend gesetzt wurde --> für Postman
    if(!token) {
        token = req.cookies.token
    }

    const decoded = jwt.verify(token, 'sehr_geheimer_schluessel');
    const userId = decoded.userId;

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
})

router.post('/addRecipe/:userId', async (req, res) => {

    try {

        const recipeId = req.body.recipeId
        const userId = req.params.userId

        console.log(userId)

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

router.post('/dropRecipe/:userId', async (req, res) => {
    const recipeId = req.body.recipeId
    const userId = req.params.userId

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

router.put('/setCookingTogetherDate', isAuthenticated, async (req, res) => {


    let token = req.cookies._auth;

    // Falls der Token nicht durch das react-auth-kit im Frontend gesetzt wurde --> für Postman
    if(!token) {
        token = req.cookies.token
    }

    const decoded = jwt.verify(token, 'sehr_geheimer_schluessel');
    const userId = decoded.userId;

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

router.delete('/removeCookingTogetherDate', isAuthenticated, async (req, res) => {
    let token = req.cookies._auth;

    // Falls der Token nicht durch das react-auth-kit im Frontend gesetzt wurde --> für Postman
    if(!token) {
        token = req.cookies.token
    }
    const decoded = jwt.verify(token, 'sehr_geheimer_schluessel');
    const userId = decoded.userId;

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

router.get('/getUserNameById/:userId', async (req, res)=> {

    try {
        const userId = req.params.userId;

        const userName = User.findById(userId).select('userName')

        if (userName) {
            res.status(200).json({ message: 'Folgender Username wurden gefunden', users: usersName })
        } else {
            res.status(404).json({ message: 'keine User mit dieser ID' })
        }
    }catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

router.get('/getMyRecipes', isAuthenticated, async (req, res) => {
    try {
        let token = req.cookies._auth;
        console.log(token)
        // Falls der Token nicht durch das react-auth-kit im Frontend gesetzt wurde --> für Postman
        if (!token) {
            token = req.cookies.token
            console.log(token)
        }
        const decoded = jwt.verify(token, 'sehr_geheimer_schluessel');
        const userId = decoded.userId;
        console.log(userId)

        const user = await User.findById(userId).populate('myRecipes');
        console.log('user')
        console.log(user)

        if (user) {
            res.status(200).json({ message: 'Folgende Rezepte gefunden:', myRecipes: user.myRecipes });
        } else {
            res.status(404).json({ message: 'Keine Rezepte bei diesem User gefunden.' });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router