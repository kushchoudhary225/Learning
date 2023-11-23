import React, { useEffect } from 'react'
import './alluserlist.scss';
import UserList from '../../utils/userList/UserList';
import './alluserlist.scss';
import { useSelector} from 'react-redux';
import {useDispatch} from 'react-redux'
const AllUserList = () => {
  const dispatch = useDispatch();
  const emps = useSelector(state => state.emps)
  return (
    <div className='user-list-container'>
      <h1 className='list_heading'>Showing all the users</h1>
      <UserList  data={emps}/>
    </div>
  )
}

export default AllUserList