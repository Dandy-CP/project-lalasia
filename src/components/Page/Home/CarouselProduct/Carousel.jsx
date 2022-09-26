import React, { Component } from "react";
import Slider from "react-slick";
import "../CarouselProduct/Carousel.css";
import CarouselCard from "./CarouselCard";
import { API_URL } from "../../../../utils/databaseapi";
import axios from "axios";

export default class Carousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "products" /* + "?_limit=5" */)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    console.log(this.state.menus);
    const { menus } = this.state;
    const randomItem = menus.sort(() => 0.5 - Math.random());

    var settings = {
      dots: true,
      infinite: true,
      autoplay: true,
      pauseOnFocus: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      arrows: false,
      responsive: [
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 1,
          },
        },
        {
          breakpoint: 375,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };

    return (
      <div className="carousel">
        <div className="titlecarousel">
          <h5>Product</h5>
          <h1>Our popular product</h1>
          <div className="desccarausel">
            <p>
              Pellentesque etiam blandit in tincidunt at donec. Eget ipsum
              dignissim placerat nisi, adipiscing mauris non purus parturient.
            </p>
          </div>
        </div>
        <Slider {...settings}>
          {randomItem &&
            randomItem
              .slice(0, 6)
              .map((menu) => <CarouselCard key={menu.id} menu={menu} />)}
        </Slider>
      </div>
    );
  }
}
