import React, { Component } from "react";
import Slider from "react-slick";

import "../CarouselImage/CarouselImage.css";
import CarouselHeader from "./CarouselHeader";

import CarouselImg1 from "../../../assets/CarouselImage1.png";
import CarouselImg2 from "../../../assets/CarouselImage2.png";
import CarouselImg3 from "../../../assets/CarouselImage3.png";

export default class CarouselImage extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      arrows: false,
      pauseOnFocus: true,
    };
    return (
      <div className="CarouselImgContainer">
        <Slider {...settings}>
          <div>
            <CarouselHeader
              headerImg={CarouselImg1}
              title="Ramadhan Sale Offer"
              desc="Get 40% off for frist transaction on Lalasia"
            />
          </div>
          <div>
            <CarouselHeader
              headerImg={CarouselImg2}
              title="Aestetic Tabble Promo"
              desc="Get buy one get one on buy to Aestetic Table"
            />
          </div>
          <div>
            <CarouselHeader
              headerImg={CarouselImg3}
              title="Make Over Your Livingroom"
              desc="Get very comfy Sofa only on Lalasia"
            />
          </div>
        </Slider>
      </div>
    );
  }
}
