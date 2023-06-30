import mongoose from "mongoose"

const { Schema } = mongoose



const recipeSchema = new Schema({

    title:{
        type: String,
        required: true
    },
    image:{
        type: String
    },
    ingredients: [
        {
            amount: String,
            unit: String,
            name: String,
        }
    ],
    instructions: String,
    drink:{
        type: String,
        required: true
    },
    vegan: Boolean,
    vegetarian: Boolean
})





export default mongoose.model("Recipe", recipeSchema)
