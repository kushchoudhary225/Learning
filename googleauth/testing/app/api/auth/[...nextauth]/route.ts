import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'
import  CredentialsProvider  from "next-auth/providers/credentials";
import dbConnect from "@/utils/dbConnect";
import {Account, User as AuthUser, User} from 'next-auth'
import UserModel from "@/models/UserModel";
import bcrypt from 'bcryptjs'

export const authOptions = {
  providers: [
    CredentialsProvider({
        id : 'credentials',
        name : 'Credentials',
        credentials : {
            Name : {label : 'Name', type : 'text'},
            email : {label : 'Email', type : 'email'},
            password : {label : 'Password', type : 'password'},
        }, 
        async authorize(credentials : any) {
            await dbConnect();
            try {
                const user = await UserModel.findOne({email: credentials.email});
                if(user.password === 'SC') {
                   throw new Error(`Please Continue with ${user.registertype.toLowerCase()} Account` );
                }
                if(user) {
                    const isValid = await bcrypt.compare(credentials.password, user.password)
                    if(isValid){
                        return user;
                    }
                }
            } catch (error : any) {
                throw new Error(error);
            }
        }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    
  ],

  callbacks : {
    async signIn({user, account} : {user : User, account : Account}) {
        if(account?.provider === 'credentials') {
            return true;
        }
        if(account?.provider === 'google') {
            await dbConnect();
            try {
                const existinguser = await UserModel.findOne({email : user.email})
                if(!existinguser) {
                    await UserModel.create({
                        name : user.name,
                        email : user.email,
                        registertype : 'GOOGLE'
                    })
                    return true;
                }
                return true;
            } catch (error : any) {
                console.log(error.message)
            }
        }
    }
  }
}

export const hanlder =  NextAuth(authOptions)
export {hanlder as GET, hanlder as POST};