import express from 'express'
import env from 'dotenv';
import dbConnect from './conn/dbConnect.js';
import userRoute from './routes/userRoute.js'
import cors from 'cors'
const app = express();

app.use(cors());
env.config()
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use('/api/v1/user', userRoute)
const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    try {
        dbConnect();
    console.log(`server is running at port number ${port}`)
    } catch (error) {
        console.log(error.message)
    }
})