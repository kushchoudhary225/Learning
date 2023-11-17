import mongoose from "mongoose";

const dbConnect = async () =>{
    try {
        await mongoose.connect(process.env.DB_URL) 
        console.log("db connected")
    } catch (err) {
        console.log(err.message);
    }
}

export default dbConnect;