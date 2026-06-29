import React from 'react'
import '../AdminStyles/Dashboard.css'
import PageTitle from '../components/PageTitle.jsx'
import {AddBox,  AttachMoney,  CheckCircle,Error,  Dashboard as DashboardIcon, Instagram, Inventory, LinkedIn, People, ShoppingBag, YouTube} from '@mui/icons-material'
import { Link } from 'react-router-dom'
import ReviewsIcon from '@mui/icons-material/Reviews';


function Dashboard() {
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
                    <Link to="/admin/reviewId">
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
                    <p>4</p>
                </div>
                <div className="stat-box">
                    <ShoppingBag className='icon'/>
                    <h3>Total Orders</h3>
                    <p>6</p>
                </div>
                <div className="stat-box">
                    <AttachMoney className='icon'/>
                    <h3>Total Revenue</h3>
                    <p>1500</p>
                </div>
                <div className="stat-box">
                    <ReviewsIcon className='icon'/>
                    <h3>Total Reviews</h3>
                    <p>14</p>
                </div>
                
                <div className="stat-box">
                    <Error className='icon'/>
                    <h3>Out of Stock</h3>
                    <p>1</p>
                </div>
                <div className="stat-box">
                    <CheckCircle className='icon'/>
                    <h3>In Stock</h3>
                    <p>15</p>
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