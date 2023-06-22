import React from "react";

const RecipeCard = ({ recipe }) => {
    return (
        <div>
            <h3>{recipe.title}</h3>
            {/*<img src={recipe.image} alt={recipe.title} />*/}
            <p>{recipe.instructions}</p>
            <hr />
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
    );
};

export default RecipeCard;