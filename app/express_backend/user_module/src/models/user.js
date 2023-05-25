import mongoose from "mongoose"
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    userName: String,
    emailAddress: String,
    password: String,
})


export default mongoose.model("User", userSchema)
