import React, { useState, useEffect } from "react";
import { API_URL } from "../../../../utils/databaseapi";
import "./SearchProduct.css";

const SearchProduct = () => {
  const [searchProduct, setSearchProduct] = useState("");

  return (
    <div className="productSearchbar">
      <form className="productSearchbox">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search Property"
          onChange={(event) => {
            setSearchProduct(event.target.value);
          }}
        />
        <button>Search</button>
      </form>
    </div>
  );
};

export default SearchProduct;
