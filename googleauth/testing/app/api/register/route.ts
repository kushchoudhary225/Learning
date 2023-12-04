import UserModel  from '@/models/UserModel.js'
import dbConnect from '@/utils/dbConnect'
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'

export async function POST(req : any) {
    const {name, email, password } = await req.json();
    try {
        await dbConnect();
        const existingUser = await UserModel.findOne({email});
        if(existingUser) {
            return NextResponse.json({success : false, msg : 'email already in use please login'}, {status : 403})
        }
        const secPass = await bcrypt.hash(password, 8);
        const newuser = await UserModel.create({email, name, password : secPass});
        return NextResponse.json({success : true, newuser, msg : 'user created successfully...'}, {status : 201})

    } catch (error : any) {
        return NextResponse.json({success : false, msg : error.message}, {status: 500})
    }
}