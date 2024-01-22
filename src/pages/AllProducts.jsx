import React, { useEffect, useState } from "react";
import "./../style/Allproducts.css";
import Layout from "../Layout";
import { Link } from "react-router-dom";
import name from "./../assets/images/logo.webp";

function AllProducts() {
  const [product, setProduct] = useState([]);
  const [title, setTitle] = useState("All");
  const [allProductStore, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/")
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setAllProducts(data);
      });
  }, []);

  function displayByCategory(category) {
    setTitle(category);

    const filterProducts = allProductStore.filter((element) => {
      return element.category == category;
    });
    if (category == "all") {
      setProduct(allProductStore);
    } else {
      setProduct(filterProducts);
    }
  }

  useEffect(() => {
    console.log(product);
  }, [product]);

  return (
    <Layout>
      <div className="all-products_container">
        <div className="all-products_left">
          <h1>Categories</h1>
          <ul>
            <li onClick={() => displayByCategory("all")}>All Products</li>
            <li onClick={() => displayByCategory("men's clothing")}>
              Men Cloths
            </li>
            <li onClick={() => displayByCategory("women's clothing")}>
              Women Cloths
            </li>
            <li onClick={() => displayByCategory("electronics")}>
              Electronics
            </li>
            <li onClick={() => displayByCategory("jewelery")}>Jewelery</li>
          </ul>
        </div>
        <div className="all-products_right">
          <h1>{title}</h1>
          <div className="all-products-cards">
            {product.map((element, index) => {
              return (
                <div className="all-products-card" key={index}>
                  <img src={element.image} alt="" />
                  <h4>{element.title}</h4>
                  <h1 className="pr">$230</h1>
                  <button>add to cart</button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AllProducts;
