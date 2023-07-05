import React, { useState } from "react";
import axios from "axios";
import {useIsAuthenticated} from 'react-auth-kit';

import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardLink,
    MDBListGroup,
    MDBListGroupItem, MDBIcon
} from 'mdb-react-ui-kit';
import {Link} from "react-router-dom";

const ipAddr = process.env.REACT_APP_IP_ADDR

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

                const response = await axios.post(`http://${ipAddr}:20064/recipe/new/`, recipeData, {
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
        <div className={"New-Recipe-Card-HL"}>
            <MDBCard>
                <MDBCardBody>
                    <MDBCardTitle>Neues Rezept anlegen</MDBCardTitle>
                    <MDBCardText>Neu angelegte Rezepte werden automatisch deinem Profil zugewiesen!</MDBCardText>
                </MDBCardBody>
                <MDBListGroup>
                    <MDBListGroupItem>Titel: <input type="text" value={title} onChange={handleTitleChange} /></MDBListGroupItem>
                    <MDBListGroupItem>Bild Url: <input type="text" value={image} onChange={handleImageChange} /></MDBListGroupItem>
                    <MDBListGroupItem>Getränk: <input type="text" value={drink} onChange={handleDrinkChange} /></MDBListGroupItem>
                </MDBListGroup>
                <MDBListGroup>
                    <MDBListGroupItem>Zutaten:</MDBListGroupItem>
                    <MDBListGroupItem>
                        {ingredients.map((ingredient, index) => (
                            <div className={"Ingredient-Container-HL"} key={index}>
                                <input
                                    type="text"
                                    value={ingredient.amount}
                                    placeholder={'Menge'}
                                    onChange={(e) => handleIngredientChange(e, index, "amount")}
                                />
                                <input
                                    type="text"
                                    value={ingredient.unit}
                                    placeholder={'Einheit'}
                                    onChange={(e) => handleIngredientChange(e, index, "unit")}
                                />
                                <input
                                    type="text"
                                    value={ingredient.name}
                                    placeholder={'Name'}
                                    onChange={(e) => handleIngredientChange(e, index, "name")}
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveIngredient(index)}
                                >
                                    <MDBIcon fas icon="trash" />
                                </button>

                            </div>
                        ))}
                        <button type="button" onClick={handleAddIngredient}>
                            Add Ingredient
                        </button>
                    </MDBListGroupItem>
                </MDBListGroup>
                <MDBListGroup>
                    <MDBListGroupItem>
                        Anleitung:
                        <div className={'New-Recipe-Card-Instruction-Text-HL'}>
                            <label>Instructions:</label>
                            <textarea value={instructions} onChange={handleInstructionsChange} />
                        </div>
                    </MDBListGroupItem>
                </MDBListGroup>
                <MDBCardBody>
                    <MDBCardLink onClick={handleSubmit} href='/newRecipe'>Speichern</MDBCardLink>
                </MDBCardBody>
            </MDBCard>
        </div>
    );
};
export default RecipeForm;
