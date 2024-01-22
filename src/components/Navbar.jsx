import React, { useEffect, useState } from "react";
import "./../style/Navbar.css";
import { Link } from "react-router-dom";
import { useFirebase } from "../contexts/context";
function Navbar() {
  const firebaseAuth = useFirebase();

  //logout function trigger context from here
  const loggoutUser = () => {
    console.log("signout");
    firebaseAuth.signOutUser();
  };

  const [cartItem, setCartItem] = useState("0");

  useEffect(() => {
    const cartIt = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItem(cartIt.length);
  }, []);

  return (
    <div>
      <nav>
        <div className="nav-top">
          <div className="nav-left">
            <Link to={"/"}>
              <img
                src="https://cdn3.iconfinder.com/data/icons/branding-2/64/3._shop_banner_design_advertising_brand_print-128.png"
                alt="logo"
                className="nav-logo"
              />
              <span>ShopTop</span>
            </Link>
          </div>
          <div className="nav-right">
            <input
              type="text"
              name="search"
              placeholder="search product"
              id="search-container"
            />
            <span className="material-symbols-outlined">search</span>
          </div>
        </div>
        <div className="nav-bottom container">
          <ul>
            <li>
              <Link to={"/allproducts"}>All products</Link>
            </li>
            <li>Men's Collection</li>
            <li>Wemon's Collection</li>
            <li>Juwelary</li>
            <li>Electronics</li>
            <li>New Arrivals</li>
            <li>
              <Link to={"/gift-cards"}>Gifts Cards</Link>
            </li>
            <li className="cart-icon">
              <Link to={"/cart"}>
                <span className="material-symbols-outlined">shopping_bag</span>
                <div className="cart-count">{cartItem}</div>
              </Link>
            </li>
            <li>
              {firebaseAuth.loggedUser == null ? (
                <Link to={"/login"}>Log in</Link>
              ) : (
                <button className="logout-btn" onClick={() => loggoutUser()}>
                  Log out
                </button>
              )}
            </li>
            <li>
              <Link to={"/profile"}>Profile</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
