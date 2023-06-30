import { useEffect, useState } from "react";
import axios from "axios";
import RecipeCard from "./RecipeCard";

const Recipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visibleRecipes, setVisibleRecipes] = useState(10);
    const [loadMore, setLoadMore] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:20064/recipe/recipeByCount", {
            params: {
                count: visibleRecipes, // Anzahl der Rezepte, die abgerufen werden sollen
            }})
            .then((response) => {
                setRecipes(response.data.recipes);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Fehler beim Abrufen der Rezepte:", error);
            });
    }, [visibleRecipes]);

    const handleLoadMore = () => {
        setVisibleRecipes((prevVisibleRecipes) => prevVisibleRecipes + 10);
        setLoadMore(true);
    };

    useEffect(() => {
        setLoadMore(false);
    }, [recipes]);

    if (loading) {
        return <div>Lade Rezepte...</div>;
    }

    return (
        <div className={"text-md-center"}>
            <div className={"Recipe-Container-HL"}>
                <h2>Alle Rezepte</h2>
                <div className={"Recipe-Card-HL"}>
                    {recipes.slice(0, visibleRecipes).map((recipe) => (
                        <RecipeCard key={recipe._id} recipe={recipe} />
                    ))}
                </div>


                {loadMore && (
                    <div className={"Recipe-Card-HL"}>
                        {recipes.slice(visibleRecipes, visibleRecipes + 10).map((recipe) => (
                            <RecipeCard key={recipe._id} recipe={recipe} />
                        ))}
                    </div>
                )}

                <div>
                    <button className="Load-More-Button-HL"  onClick={handleLoadMore}>
                        Mehr Laden
                    </button>
                </div>
            </div>
        </div>

    );
};

export default Recipes;