import React from "react";
import "./../style/discountCard.css";

function DiscountCard() {
  return (
    <div className="discount-container">
      <div className="discount-left">
        <img
          src="https://websitedemos.net/electronic-store-04/wp-content/uploads/sites/1055/2022/03/electronic-store-promotional-banner-2.jpg"
          alt=""
        />
      </div>
      <div className="discount-right">
        <img
          src="https://websitedemos.net/electronic-store-04/wp-content/uploads/sites/1055/2022/03/electronic-store-promotional-banner-1.jpg"
          alt=""
        />
      </div>
    </div>
  );
}

export default DiscountCard;
