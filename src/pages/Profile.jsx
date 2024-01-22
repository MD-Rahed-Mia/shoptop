import React, { useState } from "react";
import Layout from "../Layout";
import "./../style/Profile.css";
import ProfileTab from "../components/ProfileTab";
import AddressTab from "../components/AddressTab";

function Profile() {

  //toggle active tab
  const [toggleTab, setToggleTab] = useState("profile");

  //toggle active tab content
  function toggleTabItem(params) {
    setToggleTab(params);
  }

  return (
    <Layout>
      <div className="container">
        <div className="profile-container">
          <div className="profile-left">
            <h3>Profile management</h3>
            <ul>
              <li
                className={toggleTab == 'profile' ? "active-tabs" : ''}
                onClick={() => toggleTabItem("profile")}
              >
                Profile
              </li>
              <li className={toggleTab == 'address-book' ? "active-tabs" : ''} onClick={() => toggleTabItem("address-book")}>
                Address Book
              </li>
              <li className={toggleTab == 'payment-method' ? "active-tabs" : ''} onClick={() => toggleTabItem("payment-method")}>
                Payment method
              </li>
            </ul>
          </div>
          <div className="profile-right">
            <div
              className={
                toggleTab == "profile"
                  ? "tab-content active-content"
                  : "tab-content"
              }
            >
              <ProfileTab />
            </div>
            <div
              className={
                toggleTab == "address-book"
                  ? "tab-content active-content"
                  : "tab-content"
              }
            >
              <AddressTab />
            </div>
            <div
              className={
                toggleTab == "payment-method"
                  ? "tab-content active-content"
                  : "tab-content"
              }
            >
              payment method
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
