import React, { useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import './navbar.scss'
import { Link } from 'react-router-dom'
import { redirect } from "react-router-dom";
import axios from 'axios';
import { FaBarsStaggered } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { destroyAllState } from '../../slices/empSlices';


const Navbar = () => {
  const dispatch = useDispatch();
  const BASE_URL = useSelector(state => state.BASE_URL)
  const isLogin = useSelector(state => state.isLogin)
  const logout = async () => {
      try {      
          localStorage.removeItem('token');
          dispatch(destroyAllState())
          console.log("from logout called")
          return redirect('/login')
      } catch (error) {
        console.log(error.message)
      }
  }
  const [open, setOpen] = useState(false)
  const toggleNavbar = () => {
      setOpen(!open);
  }
  return (
    <>
    <div className="nav-container">
        <div className='nav-heading'>
            <h1>  iNotes</h1>
              {
                open ? <RxCross2 className='bar_icon cursor-pointer' onClick={toggleNavbar}/> : <FaBarsStaggered className='bar_icon cursor-pointer' onClick={toggleNavbar}/>
              }
        </div>
        
        <ul className='navbar_links'>
            <li><Link  to="/">Home</Link></li>
            <li><Link  to="/newuser  ">New User</Link></li>
            <li><Link  to="/activeusers">Active User</Link></li>
            <li><Link  to="/getallusers">All user</Link></li>
            {
              isLogin === true && <li><button className='cursor-pointer logoutbtn' onClick={logout}>Logout</button></li>
            }
        </ul>

    </div>
        {
          open && 
          <ul className='navbar_links_min_screen'>
          <li><Link onClick={() => setOpen(false)} to="/">Home</Link></li>
            <li><Link onClick={() => setOpen(false)} to="/newuser  ">New User</Link></li>
            <li><Link onClick={() => setOpen(false)} to="/activeusers">Active User</Link></li>
            <li><Link onClick={() => setOpen(false)} to="/getallusers">All user</Link></li>
          {
            isLogin === true && <li><button className='cursor-pointer logoutbtn_sm' onClick={logout}>Logout</button></li>
          }
      </ul>
        }
        </>
  )
}

export default Navbar