import errorHanlder from "../utils/error.js";
import UserModel from '../model/UserModel.js';
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
        const newuser = await UserModel.create({empid, ...req.body});
        return res.status(201).json({success : true, newuser})
    } catch (e) {
        errorHanlder(res,e.message);
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