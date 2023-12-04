import mongoose from "mongoose";
const userSchema =  mongoose.Schema({
    email : {
        type : String,
        unique : true,
        required : true,
    }, 
    password : {
        type : String,
        default : 'SC'
    },
    name : {
        type : String,
        required : true,
    },
    registertype : {
        type : String,
        default : "MANUAL" 
    }
})
const UserModel = mongoose.models.user_db ||  mongoose.model('user_db', userSchema)
export default UserModel