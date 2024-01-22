import React, { useEffect, useState } from "react";
import "./../style/Allproducts.css";
import Layout from "../Layout";
import { useFirebase } from "../contexts/context";

function AllProducts() {
  //storing products
  const [product, setProduct] = useState([]);

  //context
  const context = useFirebase();

  //title of pages
  const [title, setTitle] = useState("All");
  const [allProductStore, setAllProducts] = useState([]);
  //check loading state
  const [loading, setLoading] = useState(true);

  //fetching products using effect
  useEffect(() => {
    fetch("https://fakestoreapi.com/products/")
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setAllProducts(data);
        setLoading(false)
      }).catch(err => {
        console.log(err.message);
      })
  }, []);

  //display by cateogy filter json file here
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

  //add to cart from this
  function handleAddToCart(productId, image, title, price) {
    context.updateCart(productId, image, title, price, 1);
  }

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
            {loading ? (
              <h1>Loading</h1>
            ) : (
              product.map((element, index) => {
                return (
                  <div className="all-products-card" key={index}>
                    <img src={element.image} alt="" />
                    <h4>{element.title}</h4>
                    <h1 className="pr">$230</h1>
                    <button
                      onClick={() =>
                        handleAddToCart(
                          element.id,
                          element.image,
                          element.title,
                          element.price,
                          1
                        )
                      }
                    >
                      add to cart
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AllProducts;
