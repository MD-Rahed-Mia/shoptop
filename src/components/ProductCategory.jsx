import React from "react";
import "./../style/productcategory.css";
import { category } from "../products/Product";

function ProductCategory() {
  return (
    <div className="container border-shadow product-category">
      <h1>Category</h1>
      <div className="category-cards">
        {category.map((element, index) => {
          return (
            <div className="category-card" key={index}>
              <div className="category-img">
                <img src={element.categoryImg} alt="" />
              </div>
              <div className="category-title">
                <h3>{element.categoryName}</h3>
                <p>more than 30+</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductCategory;
