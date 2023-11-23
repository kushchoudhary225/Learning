import React from 'react'
import { useNavigate } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import {toggleLogin} from './slice'

const Logout = () => {
  const navigate = useNavigate();
  const isLogin = useSelector(state => state.isLogin);
  const dispatch = useDispatch()
  const sdd = () => {
    navigate('/login')
  }
  return (
    <div>
        <h1>Logout</h1>
        <button onClick={() => dispatch(toggleLogin())}> Login</button>
    </div>
  )
}

export default Logout