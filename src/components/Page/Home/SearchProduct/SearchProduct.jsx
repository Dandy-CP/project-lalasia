import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../../utils/databaseapi";
import { numberWithCommas } from "../../../../utils/numberWithCommas";
import { useNavigate } from "react-router-dom";
import "./SearchProduct.css";

const SearchProduct = () => {
  const navigate = useNavigate();
  const [productSearch, setProductSearch] = useState([]);
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    axios.get(API_URL + "products").then((res) => setProductSearch(res.data));
  }, []);

  const handleSearch = (event) => {
    const searchWord = event.target.value;
    const newFilter = productSearch.filter((value) => {
      return value.nama.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setSearchData([]);
    } else {
      setSearchData(newFilter);
    }
  };

  return (
    <div className="productSearchbar">
      <form className="productSearchbox">
        <input
          type="text"
          search="search"
          name="search"
          id="search"
          placeholder="Search Property"
          onChange={handleSearch}
        />
      </form>
      {searchData.length != 0 && (
        <div className="dataResult">
          {searchData.slice(0, 3).map((value) => {
            return (
              <a
                key={value.id}
                className="dataItem"
                onClick={() =>navigate(`product/${value.category.id}/${value.id}`)}>
                <img src={value.gambar} alt={value.nama} />
                <span>
                  <p>{value.category.nama}</p>
                  <h1>{value.nama}</h1>
                  <p>{value.tagline}</p>
                  <h2>Rp. {numberWithCommas(value.harga)}</h2>
                </span>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchProduct;
