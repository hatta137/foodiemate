import React, { useEffect, useState } from "react";
import axios from "axios";
import RecipeCard from "./RecipeCard";
import { useNavigate } from "react-router-dom";

const ipAddr = process.env.REACT_APP_IP_ADDR

const MyRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("http://ipAddr:20063/users/getMyRecipes", {
                withCredentials: true,
            })
            .then((response) => {

                if (response.status === 200) {
                    setRecipes(response.data.myRecipes);

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
                        {recipes.map((recipe) => (
                                <RecipeCard key={recipe._id} recipe={recipe} />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default MyRecipes;
