import React from "react";

import Header from "../Home/Header/Header";
import Benefits from "../Home/Benefits/Benefits";
import Carousel from "../Home/CarouselProduct/Carousel";
import OurProduct from "../Home/OurProduct/OurProduct";
import Testimoni from "../Home/Testimoni/Testimoni";
import { TabTitle } from "../../../utils/tabTitlePage";

function Home() {
  TabTitle("Lalasia | Home");

  return (
    <div className="Home">
      <Header />
      <Benefits />
      <Carousel />
      <OurProduct />
      <Testimoni />
    </div>
  );
}

export default Home;
