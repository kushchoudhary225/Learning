import React, { useEffect, useState } from 'react'
import './activeuser.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getOnlyActiveUser } from '../../slices/empSlices';
import UserList from '../../utils/userList/UserList';
import { fetchData, fetchOnlyActiveUser } from '../../API/collection';

const ActiveUser = () => {
  const dispatch = useDispatch()
  const activeEmp = useSelector(state => state.activeEmp)
  useEffect(()=> {
    dispatch(fetchOnlyActiveUser())
  },[])
  const [render, setRender] = useState(true);
  return (
    <div className='user-list-container'>
      <h1 className='list_heading'> Showing Only Active users</h1>  
      {
        activeEmp && <>
         <UserList data={activeEmp} render={true} />
        </>
      } 
    </div>
  )
}

export default ActiveUser