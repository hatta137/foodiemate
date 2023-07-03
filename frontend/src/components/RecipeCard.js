import React from "react";

import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn, MDBTooltip
} from 'mdb-react-ui-kit';
import {useAuthHeader, useAuthUser} from "react-auth-kit";
import axios from "axios";

const RecipeCard = ({ recipe }) => {
    const authUser  = useAuthUser()
    
    const handleSaveToMyRecipes = async () => {
        try {
            console.log(recipe)
            const userId = authUser().userId
            const response = await axios.post(`http://194.94.204.27:20063/users/addRecipe/${userId}`, {
                recipeId: recipe._id
            }, {
                withCredentials: true
            })
            if (response.status === 200) {
                console.log('erfolgreich gespeichert')
            } else {
                console.log('Fehler bei Datenübertragung')
            }

        } catch (error) {
            
        }
    }
    
    
    return (
        <div>

            <MDBCard>
                <MDBCardBody>
                    <MDBCardTitle>{recipe.title}</MDBCardTitle>
                    <MDBCardText>Zutaten:</MDBCardText>
                    <MDBCardText><ul>
                            {recipe.ingredients.map((ingredient) => (
                                <li key={ingredient._id}>
                                    {ingredient.amount} {ingredient.unit} {ingredient.name}
                                </li>
                            ))}
                        </ul></MDBCardText>
                    <MDBCardText>Anleitung:</MDBCardText>
                    <MDBCardText>{recipe.instructions}</MDBCardText>
                    <MDBCardText>Drink: {recipe.drink}</MDBCardText>
                    <MDBCardText>Vegan: {recipe.vegan ? "Ja" : "Nein"}</MDBCardText>
                    <MDBCardText>Vegetarisch: {recipe.vegetarian ? "Ja" : "Nein"}</MDBCardText>
                    <MDBTooltip tag='a' wrapperProps={{ href: '#' }} title="Füge mich zu deiner Rezeptliste hinzu!">
                        <MDBBtn onClick={handleSaveToMyRecipes}>Speichern</MDBBtn>
                    </MDBTooltip>

                </MDBCardBody>
            </MDBCard>

        </div>
    );
};

export default RecipeCard;