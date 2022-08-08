import React from "react";
import { Outlet } from "react-router-dom";
import "../Header/Header.css";
import TitleIcon from "../../../assets/Sketch-annotation-element-stroke-abstract-stars-plus-wink-filled.png";
import ArrowIcon from "../../../assets/Sketch-annotation-element-stroke-line-arrow-spiral-down-5.png";
import Heroimg from "../../../assets/Heroimg.png";

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
          Pellentesque etiam blandit in tincidunt at donec. Eget ipsum dignissim
          placerat nisi, adipiscing mauris non. Purus parturient viverra nunc,
          tortor sit laoreet. Quam tincidunt aliquam adipiscing tempor.
        </p>
      </div>

      <div className="heroserachbar">
        <form className="searchbox">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search Property"
          />
          <button>Search</button>
        </form>
      </div>
      <img src={Heroimg} alt="heroimg" className="imgheaderdesktop" />
      <Outlet />
    </div>
  );
};

export default Header;
