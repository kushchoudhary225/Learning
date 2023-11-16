import React from 'react'
import './navbar.scss'
const Navbar = () => {
  return (
    <div className="nav-container">
        <div className='nav-heading'>
            <h1>  iNotes</h1>
        </div>
        <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact Us</a></li>
        </ul>
    </div>
  )
}

export default Navbar