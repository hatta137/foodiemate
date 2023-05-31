import mongoose from "mongoose"
import bcrypt from 'bcryptjs'
const { Schema } = mongoose



const userSchema = new Schema({

    firstName: String,
    lastName: String,
    userName: String,
    emailAddress: String,
    password: String,

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




userSchema.methods.comparePassword = function (passwordHash){
    return bcrypt.compare(passwordHash, this.password)
}
export default mongoose.model("User", userSchema)
