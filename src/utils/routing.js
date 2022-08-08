import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Page/Home/Navbar/Navbar";
import Footer from "../components/Page/Home/Footer/Footer";

function Routing() {
  return (
    <React.Fragment>
      <Navbar />

      <Outlet />

      <hr width="86%" color="#ECE4DE" />
      <Footer />
    </React.Fragment>
  );
}

export default Routing;
