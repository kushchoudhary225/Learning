'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const Register = () => {
  const router = useRouter();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password , setPassword] = useState('')
  const handleSubmit =  async (e : any) => {
    e.preventDefault();
    try {
      const {data} = await axios.post('/api/register',{email,password, name})
      router.push('/login')
    } catch (error : any) {
      if("email already in use please login" === error.response.data.msg) {
        router.push('/login');
      }
      // console.log(error)
    }
  }
  return (
    <div className='text-center mt-6'>
      <form>
        <h1 className='text-white text-2xl font-bold '>Registration Form</h1>
        <input type="text" className='w-2/3 mt-2 px-2 py-2 rounded-xl' required placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
        <br />
        <input type="email" className='w-2/3 mt-2 px-2 py-2 rounded-xl' required placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />
        <input type="password" className='w-2/3 mt-2 px-2 py-2 rounded-xl' required placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button onClick={(e) => handleSubmit(e)} className='w-2/3 font-serif rounded-xl text-white font-bold bg-blue-500 py-3 px-5 mt-2'>Register</button>
      </form>
      <Link className='text-white mt-2' href="/login">Already have an account? Login</Link>
    </div>
  )
}

export default Register