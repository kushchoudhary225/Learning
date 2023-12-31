import mongoose from "mongoose";

const schema = new mongoose.Schema({
    empid : {
        type:String,
        unique : true,
        required : true
    },
    name : {
        type:String,
        required : true
    },
    email : {
        type:String,
        unique : true,
        required : true
    },
    designation : {
        type:String,
        required : true
    },
    doj : {
        type:String,
        required : true
    },
    department: {
        type:String,
        enum: ['technical', 'hr', 'technical+hr', 'account', 'operation'],
        required : true
    },
    status: {
        type:Boolean,
        default : true
    },
    isAdmin: {
        type:Boolean,
        default : false
    },
    password: {
        type:String,
        required : true
    },
})

const UserModel = new mongoose.model('user', schema);

export default UserModel;