import React from 'react'
import '../CartStyles/OrderConfirm.css'
import PageTitle from '../components/PageTitle'
import { useSelector } from 'react-redux'
import CheckoutPath from './CheckoutPath'
import { useNavigate } from 'react-router-dom'

function OrderConfirm() {
    const {shippingInfo, cartItems} = useSelector(state=>state.cart)
    const {user} = useSelector(state=>state.user)
    const subTotal = cartItems.reduce((acc,item)=> acc + item.price * item.quantity,0);
    const tax = Number((subTotal * 0.18).toFixed(2));
    const shipping = subTotal > 500 ? 0 : 50;
    const discount = Number((subTotal < 2000 ? 0 : subTotal * 0.10).toFixed(2));
    const total = Number((subTotal + shipping + tax - discount).toFixed(2));
    const navigate = useNavigate()

    const proceedToPayment = ()=>{

    const data = {
        shippingInfo:{
            ...shippingInfo,
            phoneNo: shippingInfo.phoneNumber
        },
        orderItems: cartItems,
        itemPrice: subTotal,
        taxPrice: tax,
        shippingPrice: shipping,
        discount,
        totalPrice: total
    }
    sessionStorage.setItem(
        "orderItem",
        JSON.stringify(data)
    );
    navigate('/process/payment');
    }
    
  return (
    <>
    <PageTitle title='Order Confirmation'/>
    <CheckoutPath activePath={1}/>
    <div className="confirm-container">
        <h1 className="confirm-header">Order Confirmation</h1>
        <div className="confirm-table-container">
            <table className="confirm-table">
            <caption>Shipping Details</caption>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Phone Number</th>
                    <th>Address</th> 
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{user.name}</td>
                    <td>{shippingInfo.phoneNumber}</td>
                    <td>{shippingInfo.address}, {shippingInfo.city}, {shippingInfo.state}, {shippingInfo.country}-{shippingInfo.pinCode}</td>
                </tr>
            </tbody>
            </table>

            <table className="confirm-table cart-table">
            <caption>Cart Items</caption>
            <thead>
                    <tr>
                    <th>Image</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                </tr>
            </thead>
            <tbody>
                {cartItems.map((item)=>(
                <tr key={item.product}>
                    <td><img src={item.image} alt={item.name} className='product-image' /></td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>{item.quantity*item.price}</td>
                    
                </tr>
                ))}
            </tbody>
            </table>

            <table className="confirm-table">
                <caption>Order Summary</caption>
                <thead>
                    <tr>
                        <th>Subtotal</th>
                        <th>Shipping Charges</th>
                        <th>GST</th>
                        <th>Discount</th>
                        <th>Total</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>{subTotal.toFixed(2)}</td>
                        <td>{shipping.toFixed(2)}</td>
                        <td>{tax.toFixed(2)}</td>
                        <td>{discount.toFixed(2)}</td>
                        <td>{total.toFixed(2)}</td>
                    </tr>
                </tbody>

            </table>

        </div>
        <br />
       <br />
        <button className="proceed-button" onClick={proceedToPayment}>Proceed to Payment</button>
        <br />
    </div>
    </>
  )
}

export default OrderConfirm 