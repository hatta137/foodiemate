import mongoose from "mongoose"
import bcrypt from 'bcryptjs'
const { Schema } = mongoose



const userSchema = new Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    emailAddress: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

    followers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],

    myRecipes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Recipe'
        }
    ]
})




userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}
export default mongoose.model("User", userSchema)
