import { useNavigate } from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";

const Recipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get("http://localhost:3001/recipe/recipeByCount", {
                    params: {
                        count: 10, // Anzahl der Rezepte, die abgerufen werden sollen
                    },
                });
                setRecipes(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Fehler beim Abrufen der Rezepte:", error);
            }
        };

        fetchRecipes();
    }, []);


    if (loading) {
        return <div>Lade Rezepte...</div>;
    }

    console.log(recipes);

    return (
        <div>
            <h2>Rezeptliste</h2>
            {recipes.map((recipe) => (
                <div key={recipe._id}>
                    <h3>{recipe.title}</h3>
                    <hr />
                </div>
            ))}
        </div>
    );
};


export default Recipes;
