import React, { useState, useEffect } from "react";
import { useFirebase } from "../contexts/context";

function AddressTab() {
  //getting firebaseContext
  const firebaseContext = useFirebase();

  //toggle address
  const [toggleAddress, setToggleAddress] = useState(false);
  const [fullName, setFullName] = useState("");
  const [hangleMobileNum, setMobileNum] = useState("");
  const [hangleProvince, setProvince] = useState("");
  const [hangleCity, setCity] = useState("");
  const [handleArea, setarea] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [city, setCity2] = useState("");
  const [area, setArea2] = useState("");
  const [province, setProvince2] = useState("");

  //add new address function
  function addNewAddress() {
    setToggleAddress(!toggleAddress);
  }

  //handle update userAddress
  function handleAddressForm(event) {
    event.preventDefault();
    firebaseContext.updateBillingAddress(
      fullName,
      hangleMobileNum,
      hangleProvince,
      hangleCity,
      handleArea
    );
  }

  useEffect(() => {
    // //distruce firebase User billing address
    // setName(firebaseContext.userData.billing_address.name);

    if (firebaseContext.userData.billing_address != undefined) {
      const { name, city, mobile, province, area } =
        firebaseContext.userData.billing_address;
      setName(name);
      setMobile(mobile);
      setArea2(area);
      setProvince2(province);
      setCity2(city);
    }
  }, [firebaseContext.userData.billing_address]);

  return (
    <>
      <h1>Address</h1>
      <div className="address-tab">
        <button className="new-add_btn" onClick={() => addNewAddress()}>
          add new address
        </button>
        <div className="address-tab__card">
          <p>
            Full Name:
            <span>{name}</span>
          </p>
          <p>
            Phone Number: <span>{mobile}</span>
          </p>
          <p>
            Address:{" "}
            <span>
              {area}
              {city},{province},{" "}
            </span>
          </p>
          <p>Address type: Billing address</p>
        </div>

        <div
          className={
            toggleAddress ? "add-address_form active" : "add-address_form"
          }
        >
          {" "}
          <form action="" onSubmit={(event) => handleAddressForm(event)}>
            <div>
              <h3>Add new address</h3>
            </div>
            <div>
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="enter full name"
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="mobile">Mobile Number</label>
              <input
                type="number"
                minLength={11}
                maxLength={11}
                name="mobile"
                id="mobile"
                placeholder="enter your phone number"
                onChange={(e) => setMobileNum(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="province">Province</label>
              <input
                type="text"
                name="province"
                id="province"
                placeholder="province"
                onChange={(e) => setProvince(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="city">city</label>
              <input
                type="text"
                name="city"
                id="city"
                placeholder="city"
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="area">area</label>
              <input
                type="text"
                name="area"
                id="area"
                placeholder="area"
                onChange={(e) => setarea(e.target.value)}
                required
              />
            </div>
            <div>
              <button type="submit" className="save-address_btn">
                save address
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddressTab;
