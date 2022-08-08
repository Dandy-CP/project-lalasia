import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./components/Page/Home/Home";
import Product from "./components/Page/Product/Product";
import ServicePage from "./components/Page/ServicePage/ServicePage";
import About from "./components/Page/About/About";
import NoPage from "./components/Page/NoPage404/NoPage";
import Routing from "./utils/routing";
import ProductDetails from "./components/Page/Product/ListProduct/ProductDetails/ProductDetails";
import RelatedDetails from "./components/Page/Product/ListProduct/ProductDetails/ProductRelated/RelatedDetails";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Routing />}>
            <Route index element={<Home />} />
            <Route path="product" element={<Product />} />
            <Route path="product/:productId/:id" element={<ProductDetails />} />
            <Route path="related/:productId/:id" element={<RelatedDetails />} />
            <Route path="service" element={<ServicePage />} />
            <Route path="about" element={<About />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
