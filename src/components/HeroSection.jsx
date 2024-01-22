import React from "react";
import HeroBg from "./../assets/images/Herobg.jpg";
import "./../style/Herosection.css";
import Logo from "./../assets/images/logo.webp";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <div
      className="hero-section"
      style={{
        backgroundImage: `url(${HeroBg})`,
      }}
    >
      <div className="hero-card">
        <div className="hero-top">
          <img src={Logo} alt="" />
          <span>ShopTop</span>
        </div>
        <h1>The best home entertainment system is here</h1>
        <p>
          Chaque trésor âme bonheur décor ce, âme soucieux que dans de beauté
          suborneur regarde,.
        </p>
        <Link to={'/allproducts'}>
          <button>shop now</button>
        </Link>
      </div>
      <div></div>
      <div className="hero-description">
        <div className="hero-desc__card">
          <span className="material-symbols-outlined">local_shipping</span>
          <div>
            <p>Free Shipping</p>
            <p>Muß von die doch deinen die doch, du oft.</p>
          </div>
        </div>
        <div className="hero-desc__card ">
          <span className="material-symbols-outlined">chat</span>
          <div>
            <p>We are available 24/7</p>
            <p>Need help? contact us.</p>
          </div>
        </div>
        <div className="hero-desc__card">
          <span className="material-symbols-outlined">cached</span>
          <div>
            <p>Satisfied or return</p>
            <p>Product isn't as aspected? Just return it.</p>
          </div>
        </div>
        <div className="hero-desc__card">
          <span className="material-symbols-outlined">credit_card</span>
          <div>
            <p>100% secure payment.</p>
            <p>Visa, Mastercard, Stripe, PayPal</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
