import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
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
import Profile from "./User/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import UpdateProfile from "./User/UpdateProfile";
import UpdatePassword from "./User/UpdatePassword";
import ForgotPassword from "./User/ForgotPassword";
import ResetPassword from "./User/ResetPassword";
import Cart from "./Cart/Cart";
import Shipping from "./Cart/Shipping";
import OrderConfirm from "./Cart/OrderConfirm";
import Payment from "./Cart/Payment";
import PaymentSuccess from "./Cart/PaymentSuccess";
import MyOrders from "./Orders/MyOrders";
import OrderDetails from "./Orders/OrderDetails";
import Dashboard from "./Admin/Dashboard";
import ProductsList from "./Admin/ProductsList";
import CreateProducts from "./Admin/CreateProducts";

// Small wrapper so we can use useLocation() inside the Router
function AppContent() {
  const { isAuthenticated, user, isLoadingUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  console.log("Authenticated User:", isAuthenticated, user);

  // true for any /admin/... route
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
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
          <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
          <Route path="/profile/update" element={<ProtectedRoute element={<UpdateProfile />} />} />
          <Route path="/password/update" element={<ProtectedRoute element={<UpdatePassword />} />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/reset/:token" element={<ResetPassword />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/shipping" element={<ProtectedRoute element={<Shipping />} />} />
          <Route path="/order/confirm" element={<ProtectedRoute element={<OrderConfirm />} />} />
          <Route path="/process/payment" element={<ProtectedRoute element={<Payment />} />} />
          <Route path="/paymentSuccess" element={<ProtectedRoute element={<PaymentSuccess />} />} />
          <Route path="/orders/user" element={<ProtectedRoute element={<MyOrders />} />} />
          <Route path="/order/:orderId" element={<ProtectedRoute element={<OrderDetails />} />} />

          {/* admin routes  */}

          <Route path="/admin/dashboard" element={<ProtectedRoute element={<Dashboard />} adminOnly={true} />} />
          <Route path="/admin/products" element={<ProtectedRoute element={<ProductsList />} adminOnly={true} />} />
          <Route path="/admin/product/create" element={<ProtectedRoute element={<CreateProducts />} adminOnly={true} />} />

        </Routes>
        {!isLoadingUser && isAuthenticated && !isAdminRoute && <UserDashboard user={user} />}
      </main>

      {!isAdminRoute && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;