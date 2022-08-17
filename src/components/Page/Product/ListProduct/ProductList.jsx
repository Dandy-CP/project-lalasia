import React, { useState, useEffect } from "react";
import { API_URL } from "../../../../utils/databaseapi";
import axios from "axios";
import Pagination from "./Pagination";
import ItemProduct from "./ItemProduct";
import ListCategories from "./ListCategories";
import "../../Home/SearchProduct/SearchProduct.css";
import "./ProductList.css";

const ProductList = () => {
  const [product, setProduct] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeProduct, setActiveProduct] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage] = useState(6);
  const [searchProduct, setSearchProduct] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const res = await axios.get(API_URL + "products");
      setProduct(res.data);
      setFiltered(res.data);
      setLoading(false);
    };
    fetchProduct();
  }, []);

  const indexOfLastPage = currentPage * productPerPage;
  const indexOfFirstPage = indexOfLastPage - productPerPage;
  const currentOfPage = filtered.slice(indexOfFirstPage, indexOfLastPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <React.Fragment>
      <div className="productPageSearchbar">
        <form className="productPageSearchbox">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search Property"
            onChange={(event) => {
              setSearchProduct(event.target.value);
            }}
          />
        </form>
      </div>

      <ListCategories
        product={product}
        setFiltered={setFiltered}
        activeProduct={activeProduct}
        setActiveProduct={setActiveProduct}
      />

      <div className="productList">
        {currentOfPage &&
          currentOfPage
            .filter((val) => {
              if (searchProduct == "") {
                return val;
              } else if (
                val.nama.toLowerCase().includes(searchProduct.toLowerCase())
              ) {
                return val;
              }
            })
            .map((product) => (
              <ItemProduct
                key={product.id}
                product={product}
                loading={loading}
              />
            ))}
      </div>

      <Pagination
        productPerPage={productPerPage}
        totalProduct={product.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </React.Fragment>
  );
};

export default ProductList;
