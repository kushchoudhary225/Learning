import React from "react";
import { redirect, Outlet } from "react-router-dom";

const ProtectedRoute = ({
  isAuthenticated,
  children,
  adminRoute,
  isAdmin,
  // redirect = "/login",
  redirectAdmin = "/profile",
}) => {
  if (!isAuthenticated) {
    return redirect('/login')
  }

  if (adminRoute && !isAdmin) {
    return redirect('/profile')
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
