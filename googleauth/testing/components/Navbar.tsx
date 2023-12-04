'use client'
import Link from 'next/link'
import React from 'react'
import { signOut, useSession } from 'next-auth/react'

const Navbar = () => {
  const {data : session} : any  = useSession();
  return (
    <div className=' h-20 bg-blue-500 '>
        <ul className='p-12 flex space-x-3 justify-end pr-4 h-full items-center '>
            <li>
                <Link className='text-white' href='/dashboard'>Dashboard</Link>
            </li>
            {
              !session ?
               <>
              <li>
                <Link className='text-white' href='/register'>Register</Link>
            </li>
            <li>

                <Link className='text-white' href='/login'>Login</Link>
            </li> </> : 
            <>
            <li>
                {session.user?.email}
            </li>
            <li >
                <button onClick={() => signOut()}>
                  Logout
                </button>
            </li> 
          </>
            }
        </ul>
    </div>
  )
}

export default Navbar