import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {toggleLogin} from './slice'

const Login = () => {
  const isLogin = useSelector(state => state.isLogin);
  const dispatch = useDispatch()
  return (
    <div>
        <h1>
            Login
            </h1>
        <button onClick={() => dispatch(toggleLogin())}> Login</button>
    </div>
  )
}

export default Login