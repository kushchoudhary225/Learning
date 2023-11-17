import React from 'react'
import './alluserlist.scss';
import UserList from '../../utils/userList/UserList';
import './alluserlist.scss';
import { useSelector} from 'react-redux';
const AllUserList = () => {
  const emps = useSelector(state => state.emps)
  return (
    <>
    <div className='user-list-container'>
      <h1>Showing all the users</h1>
      <UserList  data={emps}/>
    </div>
    </>
  )
}

export default AllUserList