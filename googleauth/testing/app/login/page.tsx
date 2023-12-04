'use client'
import React,{useEffect, useState} from 'react'
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
const Login = () => {

  const router = useRouter();
  const [email, setEmail] = useState('')
  const [password , setPassword] = useState('')
  const session = useSession();
  useEffect(() => {
    if(session?.status === 'authenticated') {
      router.replace('/dashboard')
    }
  }, [session, router])



  const handleSubmit =  async (e : any) => {
    e.preventDefault();
    try {
      const res = await signIn('credentials', {
        redirect : false,
         email, password
      });
      
      // console.log({res})
      if(res?.error) {
        // console.log({sls : res.error})
        alert(res.error);
        if(res?.url) router.replace('/dashboard');
      }else {
        // alert('lsdjfljsdkl')
      }
    } catch (error : any) {
      alert(`'from here'  ${error.response.data.msg}`);
    }
  }
  return (
    <div className=' text-center mt-8'>
    <form>
      <h1 className='text-2xl font-bold font-mono'>Login</h1>
      <input type="email" className='w-3/5 mt-2 px-2 py-2 rounded-xl' autoComplete='false' required placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
      <br />
      <input type="password" className='w-3/5 mt-2 px-2 py-2 rounded-xl' required placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />

      <button onClick={(e) => signIn('google')} className='w-3/5 rounded-xl text-white font-bold bg-black py-3 px-5 mt-2'>Continue with google</button>


      <button onClick={(e) => handleSubmit(e)} className='w-3/5 rounded-xl text-white font-bold bg-blue-500 py-3 px-5 mt-2'>Login</button>
    </form>


    <br />

    <Link href="/login">Don't have an account ?  Register</Link>
  </div>
  )
}

export default Login