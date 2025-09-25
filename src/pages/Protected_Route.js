import React from "react";
import { Navigate } from "react-router-dom";

function Protected_Route({ children}) {

  const isAuthenticated = !!localStorage.getItem("loggedInUser"); // check if user is logged in

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />; // redirect to login
  }

  return children; // allow access
}

export default Protected_Route;
