import {Router} from "express";
import Recipe from "../models/recipe.js";
import axios from "axios"
import jwt from 'jsonwebtoken'

// API-Key for Spoonacular-API
const apiKey = '0ce295988778430289ce5f05f03f0262';

const recipeUrl = 'https://api.spoonacular.com/recipes/analyze';

const router = Router()

router.get("/", async (req, res) => (
    res.send("recipe entry")
))

router.post('/new/', async (req, res) => {

    try {
        const { title, ingredients, instructions, image, drink } = req.body

        let token = req.cookies._auth;

        // Falls der Token nicht durch das react-auth-kit im Frontend gesetzt wurde --> für Postman
        if(!token) {
            token = req.cookies.token
        }

        const decoded = jwt.verify(token, 'sehr_geheimer_schluessel');

        const userId = decoded.userId;

        console.log("addRecipe")

        console.log(userId)

        const ingredientsListSpoon = []

        for (let ing of ingredients){
            ingredientsListSpoon.push(ing["name"])
        }

        const jsonReq = {
            "title": title,
            "servings": 1,
            "ingredients": ingredientsListSpoon,
            "instructions": instructions
        }

        // Contact the Spoonacular API for recipe analyses
        const response = await axios.post(recipeUrl, jsonReq, {
            params: {
                apiKey: apiKey
            }
        })

        const isVegan = response.data.vegan

        const isVegetarian = response.data.vegetarian

        const newRecipe = new Recipe({
            title,
            image,
            ingredients,
            instructions,
            drink,
            vegan: isVegan,
            vegetarian: isVegetarian
        })

        await newRecipe.save()

        try {
            // Call to user API an set Recipe to myRecipes
            const addUserRecipeUrl = `http://ss2023_wa_foodiemate_user_api:20063/users/addRecipe/${userId}`

            await axios.post(addUserRecipeUrl, { recipeId: newRecipe._id }, {
                headers: {
                    Cookie: `token=${token}`
                }
            })

            res.status(200).json({ message: 'Rezept erfolgreich angelegt', recipe: newRecipe })
        } catch (err) {
            console.error('Fehler bei Speicherung des Rezepts in User', err)
            res.status(500).json({ error: 'Serverfehler 1' })
        }

    } catch (err) {
        console.error('Fehler bei Anlegen', err)

        res.status(500).json({ error: 'Serverfehler 2' })
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

// this route is implemented for frontend rendering in Recipes.js
router.get('/recipeByCount', async (req, res) => {
    try {
        const count = req.query.count;

        const recipes = await Recipe.find().limit(count)

        if (!recipes) {
            return res.status(404).json({ error: 'Rezepte nicht gefunden' })
        }

        res.status(200).json({ recipes })
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

// API for external use
router.get('/recipesToDrink/:drink', async (req, res) => {
    try {
        const drink = req.params.drink;

        const recipes = await Recipe.find({ drink: drink });

        res.json(recipes);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal server error' });
    }
});

// API for external use
router.get('/recipeOfTheDay', async (req, res) => {
    try {
        const count = await Recipe.countDocuments();

        const randomIndex = Math.floor(Math.random() * count);

        const recipe = await Recipe.findOne().skip(randomIndex);

        res.json(recipe);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

export { router }
