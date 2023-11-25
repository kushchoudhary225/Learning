import express from 'express'
import env from 'dotenv';
import dbConnect from './conn/dbConnect.js';
import userRoute from './routes/userRoute.js'
import cors from 'cors'
import session from 'express-session'
const app = express();

app.use(cors());
env.config()
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(session({secret : 'thisissecret'}))


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


app.get('/viewcount', (req, res)=> {
    if(req.session.count) {
        res.send(`count = ${++req.session.count}` );
    }else {
        req.session.count = 1;
        res.send(`count = ${req.session.count}` );
        
    }
})

app.get('/register', (req, res) => {
    const {username = 'unknown'} = req.query;
    req.session.username = username;
    res.redirect('/greet')
})

app.get('/greet', (req, res) => {
    const {username} = req.session;
    res.send(`welcome back ${username} `)
})

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