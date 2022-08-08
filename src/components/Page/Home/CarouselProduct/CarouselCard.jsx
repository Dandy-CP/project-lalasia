import React from "react";
import { numberWithCommas } from "../../../../utils/numberWithCommas";
import { useNavigate } from "react-router-dom";

import "../CarouselProduct/CarouselCard.css";

const CarouselCard = ({ menu }) => {
  const navigate = useNavigate();

  return (
    <div className="CarouselCard">
      <a onClick={() => navigate(`product/${menu.category.id}/${menu.id}`)}>
        <img src={menu.gambar} alt="products" />
        <p>{menu.category.nama}</p>
        <h1>{menu.nama}</h1>
        <p>{menu.tagline}</p>
        <h2>Rp.{numberWithCommas(menu.harga)}</h2>
      </a>
    </div>
  );
};

export default CarouselCard;
