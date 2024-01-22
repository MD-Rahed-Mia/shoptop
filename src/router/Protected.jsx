import React from "react";
import { useFirebase } from "../contexts/context";
import { Navigate } from "react-router-dom";

function Protected({ children }) {
  const firebase = useFirebase();

  const logginUserId = JSON.parse(localStorage.getItem("userId"));

  if (logginUserId == null) {
    return (
      <Navigate to={"/login?unauthorized=true"} replace />

    );
  } else {
    return children;
  }
}

export default Protected;
