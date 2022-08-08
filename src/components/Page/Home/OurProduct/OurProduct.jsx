import React from "react";
import "../OurProduct/OurProduct.css";
import ImgOurProdut from "../../../assets/ImgOurProduct.png";
import ImgOurProduct2 from "../../../assets/ImgOurProduct2.png";

const OurProduct = () => {
  return (
    <div className="ContainerOurProduct">
      <div className="section1">
        <p>Our Product</p>
        <h2>Crafted by talented and high quality material</h2>
        <h3>
          Pellentesque etiam blandit in tincidunt at donec. Eget ipsum dignissim
          placerat nisi, adipiscing mauris non purus parturient. morbi
          fermentum, vivamus et accumsan dui tincidunt pulvinar
        </h3>
        <button>Learn More</button>
        <img src={ImgOurProdut} alt="ImgOurProduct" />
      </div>
      <div className="section2">
        <div className="profilecomp">
          <div className="profilecount">
            <h1>20+</h1>
            <p>Years Experience</p>
          </div>
          <div className="profilecount">
            <h1>483</h1>
            <p>Happy Client</p>
          </div>
          <div className="profilecount">
            <h1>150+</h1>
            <p>Project Finished</p>
          </div>
        </div>
        <img src={ImgOurProduct2} alt="ImgOurProduct" />
      </div>
    </div>
  );
};

export default OurProduct;
