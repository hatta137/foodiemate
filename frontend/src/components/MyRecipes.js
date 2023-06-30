import React, { useEffect, useState } from "react";
import axios from "axios";
import RecipeCard from "./RecipeCard";
import { useNavigate } from "react-router-dom";

const MyRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("http://localhost:20063/users/getMyRecipes", {
                withCredentials: true,
            })
            .then((response) => {
                console.log(response)
                console.log(response.data)
                if (response.status === 200) {
                    setRecipes(response.data.myRecipes);
                    console.log(recipes)
                } else {
                    // alert('Keine eigenen Rezepte gefunden')
                    navigate("/recipes");
                }

                setLoading(false);
            })
            .catch((error) => {
                // Handle error
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Lade Rezepte...</div>;
    }

    return (
        <div className={"text-md-center"}>
            <div className={"Recipe-Container-HL"}>
                <h2>Meine Rezepte</h2>
                <div className={"Recipe-Card-HL"}>
                    <ul>
                        {recipes && recipes.map((recipe) => (
                            <li key={recipe._id}>
                                <RecipeCard recipe={recipe} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MyRecipes;
