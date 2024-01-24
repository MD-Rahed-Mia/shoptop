import React, { useEffect, useState } from "react";
import "./../style/Navbar.css";
import { Link } from "react-router-dom";
import { useFirebase } from "../contexts/context";
import { IoMdMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { BsCart4 } from "react-icons/bs";

function Navbar() {
  const firebaseAuth = useFirebase();

  //logout function trigger context from here
  const loggoutUser = () => {
    console.log("signout");
    firebaseAuth.signOutUser();
  };

  //set menu status
  const [menu, setMenu] = useState(false);

  //handle menu status
  function handleMenu() {
    setMenu(!menu);
  }

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
          <ul className={menu ? "active" : ""}>
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
          <div className="cart-icon-mobile">
            <Link to={"/cart"}>
              <BsCart4 />
            </Link>
          </div>
          <div className="menu-btn" onClick={() => handleMenu()}>
            {menu ? <RxCross2 /> : <IoMdMenu />}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
