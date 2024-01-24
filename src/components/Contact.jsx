import React from "react";
import "./../style/Contact.css";
import { FaFacebook, FaLinkedin, FaWhatsapp, FaYoutube } from "react-icons/fa6";

function Contact() {
  return (
    <div className="contact-container">
      <div className="contact-box">
        <h3>About shoptop</h3>
        <ul>
          <li>Our Team</li>
          <li>Our Story</li>
          <li>Privacy policy</li>
          <li>terms & policy</li>
        </ul>
      </div>
      <div className="contact-box">
        <h3>Customer Service</h3>
        <ul>
          <li>Contact Us</li>
          <li>FAQ</li>
        </ul>
      </div>
      <div className="contact-box">
        <h3>Our Products</h3>
        <ul>
          <li>Ecommerce</li>
          <li>Real State & Housing</li>
          <li>Parcel & Courier</li>
          <li>Other's</li>
        </ul>
      </div>
      <div className="contact-box">
        <h3>Join Us</h3>
        <ul className="social-container">
          <li>
            <FaFacebook />
          </li>
          <li>
            <FaYoutube />{" "}
          </li>
          <li>
            <FaLinkedin />
          </li>
          <li>
            <FaWhatsapp />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Contact;
