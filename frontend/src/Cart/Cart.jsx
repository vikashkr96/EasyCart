import React from 'react'
import '../CartStyles/Cart.css'
import PageTitle from '../components/PageTitle'
import CartItem from './CartItem'
import { useSelector } from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'


function Cart() {

    const {cartItems} = useSelector(state=>state.cart)

    const subTotal = cartItems.reduce((acc, item)=> acc+item.price*item.quantity, 0);
    const tax = subTotal*0.18 ;
    const shipping = subTotal > 500 ? 0 : 50;
    const discount = subTotal < 2000 ? 0 : subTotal*0.10; 
    const total = subTotal + shipping + tax - discount;
    const navigate = useNavigate();
    const checkoutHandler = ()=>{
        navigate(`/login?redirect=/shipping`)
    }
    
  return (
    <>
    <PageTitle title='Your Cart'/>
    {cartItems.length===0?(
        <div className="empty-cart-container">
            <p className="empty-cart-message">Your Cart is empty</p>
            <Link className="viewProducts" to='/products'>View Products</Link>
        </div>
    ): (<>
    
    <div className="cart-page">
        <div className="cart-items">
            <div className="cart-items-heading">Your Cart <img className='cart-img' src="/images/shopping-cart.png" alt="" height='35px' width='35px'/></div>
            <div className="cart-table">
                <div className="cart-table-header">
                    <div className="header-product">Product</div>
                    <div className="header-quantity">Quantity</div>
                    <div className="header-total item-total-heading">Item Total</div>
                    <div className="header-action item-total-heading">Actions</div>
                </div>
                {/* Cart items */}
                {cartItems && cartItems.map((item)=>(<CartItem item={item} key={item.name} />))}  
            </div>
        </div>

        {/* Price Summary */}

        <div className="price-summary">
            <h3 className="price-summary-heading">Price Summary</h3>
            <div className="summary-item">
                <p className="summary-label">Subtotal</p>
                <p className="summary-value">{subTotal}</p>
            </div>
            <div className="summary-item">
                <p className="summary-label">+ 18% GST</p>
                <p className="summary-value">{tax}</p>
            </div>
            <div className="summary-item">
                <p className="summary-label">+ Shipping</p>
                <p className="summary-value">{shipping}</p>
            </div>

            <div className="summary-item">
                <p className="summary-label">- Discount {subTotal > 2000?"(10%)":"(if any)"}</p>
                <p className="summary-value">{discount}</p>
            </div>

            <div className="summary-total">
                <p className="summary-label">Total</p>
                <p className="summary-value">{total}</p>
            </div>
            <button onClick={checkoutHandler} className="checkout-btn">Proceed to Checkout</button>
        </div>

    </div>
    </>)}</>
  )
}

export default Cart