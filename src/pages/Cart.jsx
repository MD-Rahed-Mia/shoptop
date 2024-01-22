import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import "./../style/Cart.css";
import { MdDeleteForever } from "react-icons/md";

function Cart() {
  //discount rate
  const [discountRate, setDiscountRate] = useState(10);

  //calculate discount ammount
  const [calcDiscountAmount, setCalcDiscountAmount] = useState(0);

  //storing total value of cart item
  const [sumOfItem, setSumOfItem] = useState(0);

  //shipping fee
  const [shippingFee, setshippingFee] = useState(60);

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
    const updateArray = cart.filter((ele) => ele.productId !== productId);
    setCart(updateArray);
    localStorage.setItem("cart", JSON.stringify(updateArray));
  }

  //using reduce method getting total of items quantity and price
  const sumOf = cart.reduce((acc, ele) => {
    return (acc += ele.quantity * ele.price);
  }, 0);

  useEffect(() => {
    setSumOfItem(sumOf);
    setCalcDiscountAmount(((sumOfItem * 10) / 100).toFixed(2));
  });

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
                              className="deleteBtn"
                              onClick={() => deleteCartItem(element.productId)}
                            >
                              <MdDeleteForever />
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
        <div className="cart-right">
          {cartNull ? (
            ""
          ) : (
            <div className="cart-total">
              <h2>Order Summary</h2>
              <div className="qs-box">
                <span>Subtotal: </span> <span>{sumOfItem.toFixed(2)}</span>
              </div>
              <div className="qs-box">
                <span>Shipping Fee: </span> <span>{shippingFee}</span>
              </div>
              <div className="qs-box">
                <span>Discount: {discountRate}% </span>{" "}
                <span>{calcDiscountAmount}</span>
              </div>
              <div className="qs-box">
                <span>Total: </span>{" "}
                <span>
                  {((sumOfItem + shippingFee) - calcDiscountAmount).toFixed(2)}
                </span>
              </div>
              <div>
                <button className="checkout-btn">Procced to checkout</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Cart;
