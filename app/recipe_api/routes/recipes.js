import {Router} from "express";
import Recipe from "../models/recipe.js";



const router = Router();

router.get("/", async (req, res) => (
    res.send("recipe entry")
))

// create Recipe and add to Profile

router.post('/new', async (req, res) => {
    const data = req.body

    const ingredients = data['ingredients']

    let nutriscore = "Test"
    // Hier Berechnung Nutri Score


    try {
        const newRecipe = new Recipe({
            title: data['title'],
            image: data['image'],
            ingredients: data['ingredients'],
            text: data['text'],
            drink: data['drink'],
            nutriScore: nutriscore
        })
        await newRecipe.save()
        res.status(200).json({ message: 'Rezept erfolgreich angelegt', recipe: newRecipe })
    } catch (err) {
        console.error('Fehler bei Anlegen', err)
        res.status(500).json({ error: 'Serverfehler' })
    }

    // Call to user API an set Recipe to myRecipes


})



// Get all Recipes

// Get Recipe by Title





export { router }