import React, { useState } from 'react'
import { MdOutlineEventAvailable } from "react-icons/md";
import { ImCross } from "react-icons/im";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaTasks } from "react-icons/fa";
import './sidebar.scss';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [user, setUser] = useState({
        name: 'kush Choudhary',
        email: 'kushc225@gmail.com',
        URL: 'data:image/jpeg;base64,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'
    })
    const [open, setOpen] = useState(false);
    return (
        <>
            {open ?
                <div className='sidebar-container'>
                    <div>

                        <div className="sidebar-icon"><ImCross  onClick={() => setOpen(!open)} className='sidebar-cross-icon cursor-pointer' color='white' /></div>
                        <div className="sidebar-profile">
                            <div className='sidebar-img'>
                                <img className='cursor-pointer' src={user.URL} alt="profile image" />
                            </div>

                            <div className='sidebar-desc'>
                                <span>{user.name}</span>
                                <span>{user.email}</span>
                            </div>
                        </div>

                        <div className="sidebar-nav-links">
                            <ul>
                                <li className='cursor-pointer'>
                                    <FaTasks color='white' />
                                    <Link style={{ marginLeft: '6px' }} to="/getallusers">Get All User</Link>
                                </li>
                                <li className='cursor-pointer'>
                                    <MdOutlineEventAvailable color='white' />
                                    <Link  style={{ marginLeft: '6px' }} to="/activeusers">
                                        Get Active User</Link></li>
                                <li className='cursor-pointer'>
                                    <MdOutlineEventAvailable color='white' />
                                    <Link  style={{ marginLeft: '6px' }} to="/newuser">
                                        Get Active User</Link></li>

                            </ul>
                        </div>
                    </div>
                </div>
                :
                <div className='sidebar-container sidebar-container-sm '>
                    <div className="sidebar-icon"><RxHamburgerMenu  onClick={() => setOpen(!open)} className='sidebar-cross-icon cursor-pointer ' color='white' /></div>
                    <div className="sidebar-profile">
                        <div className='sidebar-img'>
                            <img src={user.URL} alt="profile image" />
                        </div>
                    </div>

                    <div className="sidebar-nav-links">
                        <ul>
                            <li className='cursor-pointer'>
                              <Link to='/getallusers'>
                                <FaTasks color='white' />
                              </Link>
                               
                            </li>
                            <li className='cursor-pointer'>
                                <Link to='/activeusers'>
                                <MdOutlineEventAvailable color='white' />
                                </Link>
                                </li>
                            <li className='cursor-pointer'>
                                <Link to='/newuser'>
                                <MdOutlineEventAvailable color='white' />
                                </Link>
                                </li>
                        </ul>
                    </div>
                </div>}




        </>
    )


}
export default Sidebar;