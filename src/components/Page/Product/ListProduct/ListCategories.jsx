import React, { useEffect } from "react";
import "./ListCategories.css";

const ListCategories = ({setActiveProduct, activeProduct, setFiltered, product}) => {
  useEffect(() => {
    if (activeProduct === 0) {
      setFiltered(product);
      return;
    }
    const filtered = product.filter((barang) => {
      return barang.category.id === activeProduct;
    });
    setFiltered(filtered);
  }, [activeProduct]);

  return (
    <div className="categories">
      <div className="tabs_wrap">
        <ul>
          <li className={activeProduct === 0 ? "active" : ""} onClick={() => setActiveProduct(0)}>
            All Product
          </li>

          <li className={activeProduct === 1 ? "active" : ""} onClick={() => setActiveProduct(1)}>
            Kursi
          </li>

          <li className={activeProduct === 2 ? "active" : ""} onClick={() => setActiveProduct(2)}>
            Meja
          </li>

          <li className={activeProduct === 3 ? "active" : ""} onClick={() => setActiveProduct(3)}>
            Lemari
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ListCategories;
