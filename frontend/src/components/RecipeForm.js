import React, { useState } from "react";
import axios from "axios";
import {useIsAuthenticated} from 'react-auth-kit';

const RecipeForm = () => {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [instructions, setInstructions] = useState("");
    const [drink, setDrink] = useState("");


    const isAuthenticated = useIsAuthenticated()
    const handleTitleChange = (e) => {setTitle(e.target.value)};

    const handleImageChange = (e) => {setImage(e.target.value)};

    const handleDrinkChange = (e) => {setDrink(e.target.value)};

    const handleIngredientChange = (e, index, field) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients[index][field] = e.target.value;
        setIngredients(updatedIngredients);
    };

    const handleAddIngredient = () => {
        setIngredients((prevIngredients) => [
            ...prevIngredients,
            { amount: "", unit: "", name: "" },
        ]);
    };

    const handleRemoveIngredient = (index) => {
        setIngredients((prevIngredients) => {
            const updatedIngredients = [...prevIngredients];
            updatedIngredients.splice(index, 1);
            return updatedIngredients;
        });
    };

    const handleInstructionsChange = (e) => {setInstructions(e.target.value)};

    const handleSubmit = async (e) => {
        e.preventDefault();

        const recipeData = {
            title,
            image,
            ingredients,
            instructions,
            drink,
        };



        try {

            if (isAuthenticated()) {

                const response = await axios.post("http://localhost:20064/recipe/new/", recipeData, {
                    withCredentials: true
                });


            } else {
                // Der Benutzer ist nicht authentifiziert
                console.log('Benutzer ist nicht authentifiziert');
            }

            // Erfolgreiches Absenden, ggf. Weiterleitung oder Benachrichtigung anzeigen
        } catch (error) {
            console.error("Fehler beim Speichern des Rezepts:", error);
            // Fehlerbehandlung, z.B. Fehlermeldung anzeigen
        }

        setTitle("");
        setImage("");
        setIngredients([]);
        setInstructions("");
        setDrink("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title:</label>
                <input type="text" value={title} onChange={handleTitleChange} />
            </div>

            <div>
                <label>Image URL:</label>
                <input type="text" value={image} onChange={handleImageChange} />
            </div>

            <div>
                <label>Drink:</label>
                <input type="text" value={drink} onChange={handleDrinkChange} />
            </div>

            <div>
                <h4>Ingredients:</h4>
                {ingredients.map((ingredient, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            value={ingredient.amount}
                            onChange={(e) => handleIngredientChange(e, index, "amount")}
                        />
                        <input
                            type="text"
                            value={ingredient.unit}
                            onChange={(e) => handleIngredientChange(e, index, "unit")}
                        />
                        <input
                            type="text"
                            value={ingredient.name}
                            onChange={(e) => handleIngredientChange(e, index, "name")}
                        />
                        <button
                            type="button"
                            onClick={() => handleRemoveIngredient(index)}
                        >
                            Remove
                        </button>
                    </div>
                ))}
                <button type="button" onClick={handleAddIngredient}>
                    Add Ingredient
                </button>
            </div>

            <div>
                <label>Instructions:</label>
                <textarea value={instructions} onChange={handleInstructionsChange} />
            </div>

            <button type="submit">Save Recipe</button>
        </form>
    );
};
export default RecipeForm;
