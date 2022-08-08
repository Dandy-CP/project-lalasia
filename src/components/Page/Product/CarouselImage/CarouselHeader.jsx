import React from "react";
import "../CarouselImage/CarouselHeader.css";

const CarouselHeader = (props) => {
  return (
    <div className="HeaderImg">
      <img src={props.headerImg} alt="HeaderImg" />
      <div className="textcarousel">
        <div className="discountoffer">Discount</div>
        <h1>{props.title}</h1>
        <h2>{props.desc}</h2>
      </div>
    </div>
  );
};

export default CarouselHeader;
