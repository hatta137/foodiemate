import React from "react";
import RecipeCard from "./RecipeCard";

const Feed = ({ recipes }) => {
    return (
        <div>
            <h2>Feed</h2>
            {recipes.map((recipe) => (
                <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
        </div>
    );
};

export default Feed;