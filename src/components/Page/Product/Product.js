import React from "react";
import HeaderProduct from "./HeaderProduct/HeaderProduct";
import ProductList from "./ListProduct/ProductList";
import SearchProduct from "./SearchProduct/SearchProduct";

function Product() {
  return (
    <div className="Product">
      <HeaderProduct />
      {/* <SearchProduct /> */}
      <ProductList />
    </div>
  );
}

export default Product;
