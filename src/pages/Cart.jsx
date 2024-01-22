import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import "./../style/Cart.css";

function Cart() {
  //set localstorage variable to cart variable
  const [cart, setCart] =
    useState(JSON.parse(localStorage.getItem("cart"))) || [];
  const [cartNull, setNullCart] = useState(false);

  //handle increase quantity
  function handleIncrease(productId) {
    const indexNumber = cart.findIndex((item) => item.productId == productId);

    if (indexNumber !== -1) {
      const updateArray = [...cart];
      updateArray[indexNumber].quantity += 1;
      localStorage.setItem("cart", JSON.stringify(cart));
      setCart(updateArray);
    }
  }

  //redendering when ever i update cart variable.
  useEffect(() => {
    if (cart.length == 0) {
      setNullCart(true);
    } else if (cart.length > 0) {
      setNullCart(false);
    }
  }, [cart]);

  //handle decrease quantity
  function handleDecrease(productId) {
    const updateArray = [...cart];
    const findIndex = updateArray.findIndex(
      (item) => item.productId == productId
    );

    if (findIndex !== -1) {
      if (updateArray[findIndex].quantity == 0) {
        return;
      } else {
        updateArray[findIndex].quantity -= 1;
        localStorage.setItem("cart", JSON.stringify(updateArray));
        setCart(updateArray);
      }
    }
    console.log(findIndex);
  }

  //handle delete cart item
  function deleteCartItem(productId) {
    const updateArray = [...cart];
    const findIndex = updateArray.findIndex(
      (item) => item.productId == productId
    );

    const filterItem = updateArray.filter((ele) => {
      return ele.productId !== productId;
    });
    localStorage.setItem("cart", JSON.stringify(filterItem));
    setCart(filterItem);
  }

  return (
    <Layout>
      <div className="cart-container">
        <div className="cart-left">
          <h1>Your cart have 2 items.</h1>
          <div className="cart-table">
            {cartNull ? (
              <h1>No Item in cart.</h1>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Sl No.</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cart &&
                    cart.map((element, index) => {
                      return (
                        <tr key={index}>
                          <td className="text-center">{index + 1}</td>
                          <td>
                            <div className="pr-details">
                              <img src={element.image} alt="" />
                              <div className="dt-container">
                                <h3>{element.title}</h3>
                                <p>
                                  Size: <span>Small</span>
                                </p>
                                <p>
                                  Color: <span>Red</span>
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="text-center">{element.price}</td>
                          <td>
                            <div className="qn-container">
                              <button
                                onClick={() =>
                                  handleDecrease(element.productId)
                                }
                              >
                                -
                              </button>
                              <p>{element.quantity}</p>
                              <button
                                onClick={() =>
                                  handleIncrease(element.productId)
                                }
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="text-center">
                            {element.price * element.quantity}
                          </td>
                          <td className="text-center">
                            <button
                              onClick={() => deleteCartItem(element.productId)}
                            >
                              delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            )}
          </div>
        </div>
        <div className="cart-right"></div>
      </div>
    </Layout>
  );
}

export default Cart;
