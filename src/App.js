import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./components/context/authContext";
import ProtectedRoute from "./utils/ProtectedRoute";

import Home from "./components/Page/Home/Home";
import Product from "./components/Page/Product/Product";
import NoPage from "./components/Page/NoPage404/NoPage";
import Routing from "./utils/routing";
import ProductDetails from "./components/Page/Product/ListProduct/ProductDetails/ProductDetails";
import LogIn from "./components/Page/User/Login"
import SignUp from "./components/Page/User/Signup"
import Profile from "./components/Page/User/Profile";
import Cart from "./components/Page/User/Cart";
import Checkout from "./components/Page/User/CheckOut";
import CheckoutSuccess from "./components/Page/User/CheckoutSuccess";
import OrderList from "./components/Page/User/OrderList";
import Invoice from "./components/Page/User/Invoice";

import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthContextProvider>
          <Routes>
            <Route path ="login" element={<LogIn />} />
            <Route path ="signup" element={<SignUp />} />

            <Route path="checkout" element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            } />

            <Route path="invoice/:invoice" element={
              <ProtectedRoute>
                <Invoice />
              </ProtectedRoute>
            } />

            <Route path="*" element={<NoPage />} />

            <Route path="/" element={<Routing />}>
              <Route index element={<Home />} />
              <Route path="product" element={<Product />} />
              <Route path="product/:productId/:id" element={<ProductDetails />} />

            <Route path="profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />

            <Route path="orderList" element={
              <ProtectedRoute>
                <OrderList />
              </ProtectedRoute>
            } />
            
            <Route path="cart" element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            } />

            <Route path="success/:orderid" element={
              <ProtectedRoute>
                <CheckoutSuccess />
              </ProtectedRoute>
            } />
            </Route>
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
