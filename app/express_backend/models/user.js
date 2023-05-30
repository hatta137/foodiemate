import mongoose from "mongoose"
const { Schema } = mongoose;

const userSchema = new Schema({

    firstName: String,
    lastName: String,
    userName: String,
    emailAddress: String,
    password: String,
})




userSchema.methods.comparePassword = function (passwordX){
    return passwordX === this.password;
}
export default mongoose.model("User", userSchema)
