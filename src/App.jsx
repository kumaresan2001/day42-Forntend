import React, { createContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Food from "./components/User/Food";
import Cart from "./components/User/Cart";
import Dashboard from "./components/Admin/Dashboard";
import FoodManagement from "./components/Admin/FoodManagement";
import OrderItem from "./components/Admin/OrderItem";
import Success from "./components/User/Success";
import OrderDetails from "./components/User/OrderDetails";
import Orders from "./components/User/Order";
import Payment from "./components/User/Payment";
// export const API_URL = "http://localhost:8000";
export const API_URL = "https://food-app-defr.onrender.com";
export const cartContext = createContext();
export const addressContext = createContext();

function App() {
  let [cart, setCart] = useState([]);
  let [address, setAddress] = useState([]);

  return (
    <>
      <BrowserRouter>
        <cartContext.Provider value={{ cart, setCart }}>
          <addressContext.Provider value={{ address, setAddress }}>
            <Routes>
              <Route path="/" element={<Login />} />

              <Route path="/signup" element={<Signup />} />
              <Route path="/food" element={<Food />} />
              <Route path="/user-cart" element={<Cart />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/food-management" element={<FoodManagement />} />
              <Route path="/dashboard/:id" element={<OrderItem />} />
              <Route path="/order/success/:id" element={<Success />} />
              <Route path="/order-details/:id" element={<OrderDetails />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="*" element={<Login />} />
            </Routes>
          </addressContext.Provider>
        </cartContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
