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
          breakpoint: 480,
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
            This popular furniture product is an all-purpose piece of furniture that is sturdy and reliable. It's made of a strong and sturdy wood and it can be used as a dining room table, or a coffee table, or a desk. It's also a great option for a game room, or a family room.
            </p>
          </div>
        </div>
        <div className="sliderProduct">
          <Slider {...settings}>
            {randomItem &&
              randomItem
                .slice(0, 6)
                .map((menu) => <CarouselCard key={menu.id} menu={menu} />)}
          </Slider>
        </div>
      </div>
    );
  }
}
