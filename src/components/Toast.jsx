import React from "react";
import "./../style/Toast.css";
function Toast(props) {
  return (
    <div className="toast-container">
      <p>{props.title}</p>
    </div>
  );
}

export default Toast;
