import React from "react";
import CarouselImage from "../CarouselImage/CarouselImage";
import "../HeaderProduct/HeaderProduct.css";

const HeaderProduct = () => {
  return (
    <>
      <div className="headerProductContainer">
        <div className="headerTitle">
          <h1>Products</h1>
          <p>
            We display products based on the latest products we have, if you
            want to see our old products please enter the name of the item
          </p>
        </div>
      </div>
      <CarouselImage />
    </>
  );
};

export default HeaderProduct;
