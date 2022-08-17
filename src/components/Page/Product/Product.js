import React from "react";
import HeaderProduct from "./HeaderProduct/HeaderProduct";
import ProductList from "./ListProduct/ProductList";

function Product() {
  return (
    <div className="Product">
      <HeaderProduct />
      <ProductList />
    </div>
  );
}

export default Product;
