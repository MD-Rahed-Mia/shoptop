import React, { useState, useEffect } from "react";

import { useFirebase } from "../contexts/context";

function ProfileTab() {
  //getting context
  const firebaseData = useFirebase();

  const { name, email, phone, gender, birthday } = firebaseData.userData;

  return (   
    <>
      <h1>Personal Information</h1>
      <div className="profile-tab">
        <div>
          <span>Full Name</span>
          <p>{name}</p>
        </div>
        <div>
          <span>Email Address</span>
          <span>change</span>
          <p>{email}</p>
        </div>
        <div>
          <span>Phone Number</span>
          <span>change</span>
          <p>{phone}</p>
        </div>
        <div>
          <span>Birthday</span>
          <span>change</span>
          <p>{birthday}</p>
        </div>
        <div>
          <span>Gender</span>
          <span>change</span>
          <p>{gender}</p>
        </div>
      </div>
    </>
  );
}

export default ProfileTab;
