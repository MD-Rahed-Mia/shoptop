import React from "react";
import "./../style/Footer.css";
import { FaGlobe } from "react-icons/fa6";
function Footer() {
  return (
    <footer className="footer">
      <span>&copy; 2023 shoptop.com</span>
      <span className="language-box">
        <span>
          <FaGlobe />
        </span>
        <span>English(default)</span>
      </span>
    </footer>
  );
}

export default Footer;
