import React, { useContext } from "react";
import "./../style/productdisplay.css";
import { useFirebase } from "../contexts/context";
import { useEffect } from "react";
import { Link } from "react-router-dom";

//product display cart here
function Productdisplay(props) {
  const context = useFirebase();
  function addToCart(id, image, title, price, quantity = 1) {
    context.updateCart(id, image, title, price, quantity);
  }

  return (
    <div className="product-display_container border-shadow">
      <h1>{props.categoryName}</h1>
      <span className="see-more-btn">see more..</span>

      <div className="product-cards">
        {props.data.map((element, index) => {
          return (
            <Link to={`/productDetails/${element.id}`}>
              <div className="product-card" key={index}>
                <div className="product-card_img">
                  <img src={element.image} alt="" />
                </div>
                <div className="product-card_desc">
                  <h3>{element.title}</h3>
                  <div>
                    <h4>${element.price}</h4>
                    <h4>${element.price}</h4>
                  </div>
                </div>
                <div className="add-to-card_btn">
                  <button
                    onClick={() =>
                      addToCart(
                        element.id,
                        element.image,
                        element.title,
                        element.price
                      )
                    }
                  >
                    add to cart
                  </button>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Productdisplay;
