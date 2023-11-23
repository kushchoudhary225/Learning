import React from "react";
import {useLocation} from 'react-router-dom'
import { Navigate, Outlet } from "react-router-dom";
const ProtectedRoute = ({
  isLogin = false,
  isAdmin = false,
  children
}) => {

  const location = useLocation()
  // console.log('from protected routes ', {isLogin, isAdmin}, 'pathname' , location.pathname)
  if (!isLogin || !isAdmin ) {
    return <Navigate to={'/login'} />
  }
  // console.log("never called")
  if(location.pathname === '/login' && isLogin) return <Navigate to={'/getallusers'} />
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
