import express from 'express'
import env from 'dotenv';
import dbConnect from './conn/dbConnect.js';
import userRoute from './routes/userRoute.js'
import bodyParser from 'body-parser';
import cors from 'cors'
const app = express();

app.use(cors());
env.config()
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

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