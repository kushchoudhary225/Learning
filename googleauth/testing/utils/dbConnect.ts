import mongoose  from 'mongoose'
const dbConnect = async () => {
   try {
     await mongoose.connect('mongodb://localhost:27017')
     console.log("connected succesfully...")
   } catch (error : any) {
    console.log(error.message)
    throw  new Error(error);
   }
}

export default dbConnect;