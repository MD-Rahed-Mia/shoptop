import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import "./../style/ProductDetails.css";
import { CiStar } from "react-icons/ci";
import { useParams } from "react-router-dom";
import { useFirebase } from "../contexts/context";

function ProductDetails() {
  //initial product variable
  const [product, setProduct] = useState([]);
  //getting products object from url
  const productResponse = useParams("productid");

  //getting product id from params
  const productId = productResponse.productid;

  //initail quantity of order
  const [quantity, setQuantity] = useState(1);

  //getting context of update cart
  const context = useFirebase();

  //handle add to cart item
  const handleAddToCart = (id, image, title, price, quantity) => {
    //execute update from context
    context.updateCart(id, image, title, price, quantity);
  };

  //fetching data from json
  useEffect(() => {
    const fetchProduct = async () => {
      const fet = await fetch("https://fakestoreapi.com/products");
      const res = await fet.json();

      //filtering item based on product id
      const filterProduct = res.filter((element, index) => {
        return element.id == productId;
      });

      //set product after filtering
      setProduct(filterProduct);
    };

    //calling fetch function here
    fetchProduct();
  }, []);

  //increase quantity
  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  //handle decrease quantity
  const handleDecrease = () => {
    if (quantity == 0) {
      return false;
    } else {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <Layout>
      <div>
        {product.map((element, index) => {
          return (
            <div key={index} className="product-details_container">
              <div className="pd-left">
                <img src={element.image} alt="" />
              </div>
              <div className="pd-right">
                <div>
                  <h2>{element.title}</h2>
                  <p>{element.description}</p>
                </div>
                <div className="pd-rating">
                  <ul>
                    <CiStar />
                    <CiStar />
                    <CiStar />
                    <CiStar />
                    <CiStar />
                  </ul>
                </div>
                <div>
                  <span>Brand: No brand.</span>
                </div>
                <div className="pd-price">
                  <h1>${element.price}</h1>
                </div>
                <div className="pd-quantity">
                  <button onClick={() => handleDecrease()}>-</button>
                  <p>{quantity}</p>
                  <button onClick={() => handleIncrease()}>+</button>
                </div>
                <div className="pd-buy_btn">
                  <button>Buy Now</button>
                  <button
                    onClick={() =>
                      handleAddToCart(
                        element.id,
                        element.image,
                        element.title,
                        element.price,
                        quantity
                      )
                    }
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}

export default ProductDetails;
