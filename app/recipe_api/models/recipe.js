import mongoose from "mongoose"

const { Schema } = mongoose



const recipeSchema = new Schema({

    title: String,
    image: String,
    ingredients: [
        {
            name: String,
            amount: String,
        }
    ],
    text: String,
    drink: String,
    nutriScore: String
})





export default mongoose.model("Recipe", recipeSchema)
