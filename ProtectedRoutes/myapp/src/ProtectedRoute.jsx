import React from 'react'
import {Outlet} from 'react-router-dom'
import {Navigate} from 'react-router-dom'

const ProtectedRoute = ({isLogin, children}) => {
    // console.log("protected routes calls")
    console.log({isLogin})
    if(!isLogin) {
       return <Navigate to={'/login'}/>
    }
  return (
    <>
        children ? children : <Outlet/>
    </>
  )
}

export default ProtectedRoute