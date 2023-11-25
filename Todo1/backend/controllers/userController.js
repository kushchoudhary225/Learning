import errorHanlder from "../utils/error.js";
import UserModel from '../model/UserModel.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid';




export const singleUser = async (req, res) => {
    try {
        const {empid} = req.body;
        console.log(req.query)
        const user = await UserModel.findOne({empid});
        return res.status(200).json({success : true, user})
    } catch (e) {
        errorHanlder(res,e.message);
    }
}



export const createUser = async (req, res) =>{
    try {
        const empid = uuidv4();
        const {name, department, designation, doj, email, password} = req.body;
        let user = await UserModel.findOne({email});
        if(name === '' || department === '' || designation === '' || email === '' || password === '')  return res.status(200).json({success : false, msg : "All Field in required"})
        if(user) {
            return res.status(200).json({success : false, msg : "User already Exists..."})
        }

        const secPass = bcrypt.hashSync(password, 10);
            await UserModel.create({empid, name, department, doj, email, designation, password : secPass});

         const newuser = await UserModel.findOne({email},{password : 0})
         const payload = {
            id : newuser._id,
            empid : newuser.empid,
            name : newuser.email,
            email : newuser.email
         }
        const token = await jwt.sign(payload, process.env.SECRET_KEY) 

        // console.log({token})
        return res.status(200).json({success : true,  msg : "user created", newuser, token})
    } catch (e) {
        errorHanlder(res,"All field is required");
    }
} 


export const deleteUser = async (req, res) =>{
    try {
        const {ids} = req.body;
        const invlidId = [];
        for(const id of ids){
            if(await UserModel.findByIdAndUpdate(id, {status : false}) === null) {
                invlidId.push(id)
            }
        }
        if(invlidId.length !== 0) return res.status(401).json({success : false, msg : 'inavlid Ids', invlidId})
        return res.status(201).json({success : true, msg : 'user Deleted successfully.  '})
    } catch (e) {
        errorHanlder(res,e.message);
    }
} 

export const updateUser = async (req, res) =>{
    try {
        const {_id, name, department, designation, doj, status } = req.body;
        const updatedUser = await UserModel.findByIdAndUpdate(_id, {name, department, designation, doj, status}, { new: true })
        return res.status(201).json({success : true, updatedUser})
    } catch (e) {
        errorHanlder(res,e.message);
    }
} 


export const fetchUser = async (req, res) => {
    try {
        const alluser = await UserModel.find()
        return res.status(201).json({success : true,size: alluser.length,  alluser})
    } catch (e) {
        errorHanlder(res,e.message);
    }
}

export const fetchUserWithFilter = async (req, res) => {
    try {
        const alluser = await UserModel.find({status : true})
        return res.status(201).json({success : true,size: alluser.length,  alluser})
    } catch (e) {
        errorHanlder(res,e.message);
    }
}

export const login =  async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await UserModel.findOne({email})

        if(user.length === 0) {
            return errorHanlder(res, "User not found", 401);
        }
        const comPass = await bcrypt.compare(password, user.password);
        if(!comPass) {
            return errorHanlder(res, "Invalid Credentials", 401);
        }
       
        const payload = {
            id : user._id,
            empid : user.empid,
            name : user.email,
            email : user.email,
            isAdmin : user.isAdmin,
         }
    
        const token = await jwt.sign(payload, process.env.SECRET_KEY) 
        res.cookie( 'token', token,{ maxAge: 1000 * 60 * 10, httpOnly: false });
        return res.status(200).json({success : true, token, user})
    } catch (error) {
        errorHanlder(res, error.message)
    }
}