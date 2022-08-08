import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./ItemProduct.css";
import { numberWithCommas } from "../../../../utils/numberWithCommas";
import { useNavigate } from "react-router-dom";

const ItemProduct = ({ product, loading }) => {
  const navigate = useNavigate();
  if (loading) {
    return <Skeleton count={5} />;
  }

  return (
    <div className="itemProduct">
      <div className="itemWraper">
        <a onClick={() => navigate(`${product.category.id}/${product.id}`)}>
          <img src={product.gambar} alt="ProductImage" />
          <p>{product.category.nama}</p>
          <h1>{product.nama}</h1>
          <p>{product.tagline}</p>
          <h2>Rp.{numberWithCommas(product.harga)}</h2>
        </a>
      </div>
    </div>
  );
};

export default ItemProduct;
