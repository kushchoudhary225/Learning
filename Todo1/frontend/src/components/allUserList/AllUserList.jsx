import React from 'react'
import './alluserlist.scss';
import UserList from '../../utils/userList/UserList';
import data from '../../fakejson.json'
import './alluserlist.scss';
const AllUserList = () => {
  return (
    <>
    <div className='user-list-container'>
      <h1>Showing all the users</h1>
      <UserList  data={data}/>
    </div>
    </>
  )
}

export default AllUserList