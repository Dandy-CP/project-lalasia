import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./components/context/authContext";
import ProtectedRoute from "./utils/ProtectedRoute";

import Home from "./components/Page/Home/Home";
import Product from "./components/Page/Product/Product";
import ServicePage from "./components/Page/ServicePage/ServicePage";
import About from "./components/Page/About/About";
import NoPage from "./components/Page/NoPage404/NoPage";
import Routing from "./utils/routing";
import ProductDetails from "./components/Page/Product/ListProduct/ProductDetails/ProductDetails";
import RelatedDetails from "./components/Page/Product/ListProduct/ProductDetails/ProductRelated/RelatedDetails";
import LogIn from "./components/Page/User/Login"
import SignUp from "./components/Page/User/Signup"
import Profile from "./components/Page/User/Profile";
import CartUser from "./components/Page/User/CartUser";

import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthContextProvider>
          <Routes>
            <Route path ="login" element={<LogIn />} />
            <Route path ="signup" element={<SignUp />} />

            <Route path="/" element={<Routing />}>
              <Route index element={<Home />} />
              <Route path="product" element={<Product />} />
              <Route path="product/:productId/:id" element={<ProductDetails />} />
              <Route path="related/:productId/:id" element={<RelatedDetails />} />

            <Route path ="profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path ="cart" element={
              <ProtectedRoute>
                <CartUser />
              </ProtectedRoute>
            } />          

              <Route path="service" element={<ServicePage />} />
              <Route path="about" element={<About />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
