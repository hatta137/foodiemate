import mongoose from "mongoose"
const { Schema } = mongoose;

//TODO @Hendrik Followerstruktur abbilden
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
    ]
})




userSchema.methods.comparePassword = function (passwordX){
    return passwordX === this.password;
}
export default mongoose.model("User", userSchema)
