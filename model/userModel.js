import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true,"please add user name"]
    },
    email:{
        type:String,
        required:[true,"please add user email address"],
        unique:[true,"Email already taken"]
    },
    password:{
        type:String,
        required:[true,"please add password"]
    }
},
{
    timestamps:true
}
)

export default mongoose.model('user',userSchema)