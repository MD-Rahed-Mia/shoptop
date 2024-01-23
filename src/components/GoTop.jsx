import React from "react";
import "./../style/Tools/GoTop.css";
import { FaArrowUp } from "react-icons/fa";

function GoTop() {
  //handle go top function
  function handleGoTop() {
    window.scrollTo(0, 0);
  }

  return (
    <div className="goToTop" onClick={() => handleGoTop()}>
      <FaArrowUp />
    </div>
  );
}

export default GoTop;
