import mongoose from "mongoose"

const { Schema } = mongoose



const recipeSchema = new Schema({

    title: String,
    image: String,
    ingredients: [
        {
            amount: String,
            unit: String,
            name: String,
        }
    ],
    instructions: String,
    drink: String,
    //nutriScore: String
})





export default mongoose.model("Recipe", recipeSchema)
