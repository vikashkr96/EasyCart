import React, { useEffect } from 'react'
import '../AdminStyles/Dashboard.css'
import PageTitle from '../components/PageTitle.jsx'
import {AddBox,  AttachMoney,  CheckCircle,Error,  Dashboard as DashboardIcon, Instagram, Inventory, LinkedIn, People, ShoppingBag, YouTube, Dialpad} from '@mui/icons-material'
import { Link } from 'react-router-dom'
import ReviewsIcon from '@mui/icons-material/Reviews';
import {useDispatch, useSelector} from 'react-redux';
import {fetchAllOrders, fetchAdminProducts} from '../features/admin/adminSlice.js'


function Dashboard() {
    const {products, orders, totalAmount} = useSelector(state=>state.admin);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchAdminProducts());
        dispatch(fetchAllOrders());
    },[dispatch])

    const totalProducts = products.length;
    const totalOrders = orders.length;
    const outOfStock = products.filter(product =>product.stock === 0).length;
    const inStock = products.filter(product =>product.stock > 0).length;
    const totalReviews = products.reduce((acc, product)=>acc+(product.reviews.length || 0),0);


  return (
    <>
    <div className="dashboard-container">

        <div className="sidebar">
            <div className="logo">
                <DashboardIcon className='logo-icon'/>
                Admin Dashboard
            </div>
            <nav className="nav-menu">
                <div className="nav-section">
                    <h3>Products</h3>
                    <Link to="/admin/products">
                    <Inventory className='nav-icon'/>
                    Manage All Products
                    </Link>
                    <Link to="/admin/product/create">
                    <AddBox className='nav-icon'/>
                    Create Product
                    </Link>
                </div>
                <div className="nav-section">
                    <h3>Users</h3>
                    <Link to="/admin/users">
                    <People className='nav-icon'/>
                    Manage All Users
                    </Link>
                </div>
                <div className="nav-section">
                    <h3>Orders</h3>
                    <Link to="/admin/orders">
                    <ShoppingBag className='nav-icon'/>
                    Manage All Orders 
                    </Link>
                </div>
                <div className="nav-section">
                    <h3>Reviews</h3>
                    <Link to="/admin/reviews">
                    <ReviewsIcon className='nav-icon'/>
                    All Reviews 
                    </Link>
                </div>
            </nav>
        </div>

        <div className="admin-main-content">
            <PageTitle title= "Admin Dashboard"/>
            <div className="stats-grid">
                <div className="stat-box">
                    <Inventory className='icon'/>
                    <h3>Total Products</h3>
                    <p>{totalProducts}</p>
                </div>
                <div className="stat-box">
                    <ShoppingBag className='icon'/>
                    <h3>Total Orders</h3>
                    <p>{totalOrders}</p>
                </div>
                <div className="stat-box">
                    <AttachMoney className='icon'/>
                    <h3>Total Revenue</h3>
                    <p>₹{totalAmount.toLocaleString('en-IN', {minimumFractionDigits: 2,maximumFractionDigits: 2 })}</p>
                </div>
                <div className="stat-box">
                    <ReviewsIcon className='icon'/>
                    <h3>Total Reviews</h3>
                    <p>{totalReviews}</p>
                </div>
                
                <div className="stat-box">
                    <Error className='icon'/>
                    <h3>Out of Stock</h3>
                    <p>{outOfStock}</p>
                </div>
                <div className="stat-box">
                    <CheckCircle className='icon'/>
                    <h3>In Stock</h3>
                    <p>{inStock}</p>
                </div>
            </div>
            <div className="social-stats">
                <div className="social-box instagram">
                    <Instagram/>
                    <h3>Instagram</h3>
                    <p>123k Followers</p>
                    <p>12 Posts</p>
                </div>
                <div className="social-box linkedin">
                    <LinkedIn/>
                    <h3>Linkedin</h3>
                    <p>55k Followers</p>
                    <p>20 Posts</p>
                </div>
                <div className="social-box youtube">
                    <YouTube/>
                    <h3>YouTube</h3>
                    <p>45k Followers</p>
                    <p>12 Posts</p>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Dashboard