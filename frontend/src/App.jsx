import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './pageStyles/Root.css';

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Products from "./pages/Products";
import Register from "./User/Register";
import Login from "./User/Login";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./features/user/userSlice";
import UserDashboard from './User/UserDashboard';

function App() {
  const {isAuthenticated, user} = useSelector((state)=>state.user);

  const dispatch = useDispatch();

  useEffect(()=>{
      if(isAuthenticated){
          dispatch(loadUser())
      }
  },[dispatch])
  console.log("Authenticated User:", isAuthenticated, user);

  return (
    <Router>
      <div className="app-layout">
        <Navbar />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:keyword" element={<Products />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />  
          </Routes>
          {isAuthenticated && <UserDashboard user={user}/>}
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;