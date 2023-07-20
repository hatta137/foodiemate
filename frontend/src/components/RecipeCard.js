import React, {useState} from "react";

import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCollapse, MDBTooltip, MDBListGroup, MDBListGroupItem
} from 'mdb-react-ui-kit';
import {useAuthHeader, useAuthUser} from "react-auth-kit";
import axios from "axios";

const ipAddr = process.env.REACT_APP_IP_ADDR

const RecipeCard = ({ recipe }) => {
    const authUser  = useAuthUser()

    const [showShow, setShowShow] = useState(false);

    const toggleShow = () => setShowShow(!showShow);
    
    const handleSaveToMyRecipes = async () => {
        try {
            console.log(recipe)
            const userId = authUser().userId
            const response = await axios.post(`http://${ipAddr}:20063/users/addRecipe/${userId}`, {
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
                    <MDBListGroup>

                                {recipe.ingredients.map((ingredient) => (
                                    <MDBListGroupItem key={ingredient._id}>
                                        {ingredient.amount} {ingredient.unit} {ingredient.name}
                                    </MDBListGroupItem>
                                ))}

                        </MDBListGroup>
                    <MDBCardText>Anleitung:</MDBCardText>
                    <button className={"button-HL"} onClick={toggleShow}> Zeig Her </button>
                    <MDBCollapse show={showShow}>


                    <MDBCardText>{recipe.instructions}</MDBCardText>
                    <MDBCardText>Drink: {recipe.drink}</MDBCardText>
                    <MDBCardText>Vegan: {recipe.vegan ? "Ja" : "Nein"}</MDBCardText>
                    <MDBCardText>Vegetarisch: {recipe.vegetarian ? "Ja" : "Nein"}</MDBCardText>

                    </MDBCollapse>
                    <MDBTooltip tag='a' wrapperProps={{ href: '#' }} title="Füge mich zu deiner Rezeptliste hinzu!">
                        <button className={"button-HL"} onClick={handleSaveToMyRecipes}>Speichern</button>
                    </MDBTooltip>
                </MDBCardBody>
            </MDBCard>

        </div>
    );
};

export default RecipeCard;