import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Authorized = ({ children, requireAuth = true }) => {
  const { authUser, isCheckingAuth } = useAuthStore();
  if (isCheckingAuth) return null;
  if (requireAuth && !authUser) {
    return <Navigate to="/login" replace />;
  }
  if (!requireAuth && authUser) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default Authorized;
