import React, { useContext } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import UserContext from "../../contexts/UserContext";

const Auth = ({ allowedRoles }) => {
  const { currentUser } = useContext(UserContext);
  const location = useLocation();

  return currentUser && currentUser.role ? ( allowedRoles.find((role) => currentUser.role.includes(role)) ? (
    <Outlet />
  ) : (currentUser.name ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  ))) : <Navigate to="/login" state={{ from: location }} replace />;
};

export default Auth;