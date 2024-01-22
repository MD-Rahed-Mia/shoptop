//
import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import HeroSection from "../components/HeroSection";
import ProductCategory from "../components/ProductCategory";
import DiscountCard from "../components/DiscountCard";
import Productdisplay from "../components/Productdisplay";

function Home() {
  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=10")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setProduct(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {}, [product]);

  return (
    <>
      <Layout>
        <HeroSection />
        <ProductCategory />
        <DiscountCard />
        {isLoading ? (
          <p>loading...</p>
        ) : (
          <Productdisplay
            data={product}
            productItem="Men's collection"
            categoryName="Topdeal today"
          />
        )}
        {isLoading ? (
          <p>loading...</p>
        ) : (
          <Productdisplay
            data={product}
            productItem="air conditionar"
            categoryName="New Arrival"
          />
        )}
        {isLoading ? (
          <p>loading...</p>
        ) : (
          <Productdisplay
            data={product}
            productItem="air conditionar"
            categoryName="Best selling"
          />
        )}

       
      </Layout>
    </>
  );
}

export default Home;
