import React from "react";
import { Navigate } from "react-router-dom";

function Protected({ children }) {
  const logginUserId = JSON.parse(localStorage.getItem("userId"));

  if (logginUserId == null) {
    return <Navigate to={"/login?unauthorized=true"} replace />;
  } else {
    return children;
  }
}

export default Protected;
