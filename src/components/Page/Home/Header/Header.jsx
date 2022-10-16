import React from "react";
import "../Header/Header.css";
import TitleIcon from "../../../assets/Sketch-annotation-element-stroke-abstract-stars-plus-wink-filled.png";
import ArrowIcon from "../../../assets/Sketch-annotation-element-stroke-line-arrow-spiral-down-5.png";
import Heroimg from "../../../assets/Heroimg.png";
import SearchProduct from "../SearchProduct/SearchProduct";

const Header = () => {
  return (
    <div className="container">
      <div className="TitleWelcome">
        <h1>
          Discover Furniture With High Quality Wood
          <img src={TitleIcon} alt="WinkStar" />
        </h1>
        <div className="Linearrow">
          <img src={ArrowIcon} alt="LineArrow" />
        </div>
        <p>
        An affordable and high-quality furniture line that offers its customers a chance to save money while looking at high-quality furniture. The furniture line offers a variety of styles to suit your personal taste.
        </p>
      </div>

      <SearchProduct />

      <img src={Heroimg} alt="heroimg" className="imgheaderdesktop" />
    </div>
  );
};

export default Header;
