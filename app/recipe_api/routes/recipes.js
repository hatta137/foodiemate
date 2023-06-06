import {Router} from "express";
import Recipe from "../models/recipe.js";
import axios from "axios"



const router = Router()

router.get("/", async (req, res) => (
    res.send("recipe entry")
))


router.post('/new/:userId', async (req, res) => {
    const { title, ingredients, instructions, image, drink } = req.body

    try {

        //const nutriScoreRes = await axios.get('https://', { params: {ingredients}})

        //const nutriScore = nutriScoreRes.data.score

        const newRecipe = new Recipe({
            title,
            image,
            ingredients,
            instructions,
            drink//,
            //nutriScore
        })
        await newRecipe.save()

        // Call to user API an set Recipe to myRecipes
        const userId = req.params.userId
        const addUserRecipeUrl = `http://user_api:3000/users/addRecipe/${userId}`
        await axios.post(addUserRecipeUrl, { recipeId: newRecipe._id })

        res.status(200).json({ message: 'Rezept erfolgreich angelegt', recipe: newRecipe })
    } catch (err) {
        console.error('Fehler bei Anlegen', err)
        res.status(500).json({ error: 'Serverfehler' })
    }
})


router.get('/allRecipes', async (req, res) => {
    try {
        const data = await Recipe.find()

        res.json(data)

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
});


router.get('/recipeByTitle', async (req, res) => {
    try {
        const title = req.query.title;

        const recipe = await Recipe.findOne({ title: title })

        if (!recipe) {
            return res.status(404).json({ error: 'Rezept nicht gefunden' })
        }

        res.status(200).json({ recipe })
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
});

export { router }
