import { useEffect, useState } from "react";
import axios from "axios";

const Recipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("http://localhost:3001/recipe/recipeByCount", {

                count: 10, // Anzahl der Rezepte, die abgerufen werden sollen
            })
            .then((response) => {
                setRecipes(response.data.recipes);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Fehler beim Abrufen der Rezepte:", error);
            });
    }, []);

    if (loading) {
        return <div>Lade Rezepte...</div>;
    }

    console.log(recipes)
    return (
        <div>
            <h2>Rezeptliste</h2>
            {recipes.map((recipe) => (
                <div key={recipe._id}>
                    <h3>{recipe.title}</h3>
                    {/*<img src={recipe.image} alt={recipe.title} />*/}
                    <h4>Zutaten:</h4>
                    <ul>
                        {recipe.ingredients.map((ingredient) => (
                            <li key={ingredient._id}>
                                {ingredient.amount} {ingredient.unit} {ingredient.name}
                            </li>
                        ))}
                    </ul>
                    <h4>Anleitung:</h4>
                    <p>{recipe.instructions}</p>
                    <p>Drink: {recipe.drink}</p>
                    <p>Vegan: {recipe.vegan ? "Ja" : "Nein"}</p>
                    <p>Vegetarisch: {recipe.vegetarian ? "Ja" : "Nein"}</p>
                    <hr />
                </div>
            ))}
        </div>
    );
};

export default Recipes;
