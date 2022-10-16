import React, { Component } from "react";
import Slider from "react-slick";
import "../Testimoni/Testimoni.css";
import TestimoniCard from "./TestimoniCard";
import Avatar from "../../../assets/avatar.png";

export default class Testimoni extends Component {
  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      arrows: false,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
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
      <div className="Testimoni">
        <div className="titletesti">
          <div className="nametesti">
            <p>Testimonials</p>
            <h1>What Our Costumer Say</h1>
          </div>
          <div className="desctesti">
            <h3>
            Our custom furniture is made with you in mind. Our furniture is designed for comfort and quality. Our chairs are designed with your comfort in mind and the perfect balance of style and comfort.
            </h3>
          </div>
        </div>
        <Slider {...settings}>
          <div>
            <TestimoniCard
              testi="Pellentesque etiam blandit in tincidunt at donec. Eget ipsum dignissim placerat nisi, adipiscing mauris non. "
              avatar={Avatar}
              name="Jane Cooper"
              rating="4.3"
            />
          </div>
          <div>
            <TestimoniCard
              testi="Pellentesque etiam blandit in tincidunt at donec. Eget ipsum dignissim placerat nisi, adipiscing mauris non. "
              avatar={Avatar}
              name="Jane Cooper"
              rating="4.3"
            />
          </div>
          <div>
            <TestimoniCard
              testi="Pellentesque etiam blandit in tincidunt at donec. Eget ipsum dignissim placerat nisi, adipiscing mauris non. "
              avatar={Avatar}
              name="Jane Cooper"
              rating="4.3"
            />
          </div>
          <div>
            <TestimoniCard
              testi="Pellentesque etiam blandit in tincidunt at donec. Eget ipsum dignissim placerat nisi, adipiscing mauris non. "
              avatar={Avatar}
              name="Jane Cooper"
              rating="4.3"
            />
          </div>
          <div>
            <TestimoniCard
              testi="Pellentesque etiam blandit in tincidunt at donec. Eget ipsum dignissim placerat nisi, adipiscing mauris non. "
              avatar={Avatar}
              name="Jane Cooper"
              rating="4.3"
            />
          </div>
        </Slider>
      </div>
    );
  }
}
