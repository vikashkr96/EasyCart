import React, { useEffect } from 'react'
import '../OrderStyles/OrderDetails.css'
import PageTitle from '../components/PageTitle'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails, removeErrors } from '../features/order/orderSlice';
import Loader from '../components/Loader';

function OrderDetails() {
    const {orderId} = useParams();
    const { order, loading, error } = useSelector(state => state.order);
    
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getOrderDetails(orderId));
        if(error){
            toast.error(error, {position:'top-center', autoClose: 3000});
            dispatch(removeErrors());
        }
    },[dispatch,error,orderId]);

    const {
        shippingInfo={},
        orderItems=[],
        paymentInfo={},
        orderStatus,
        totalPrice,
        taxPrice,
        shippingPrice,
        discount,
        itemPrice,
        paidAt
    } = order;

    const paymentStatus = paymentInfo?.status?.toLowerCase() === "paid" ? "Paid" : "Not Paid";
    const finalOrderStatus = paymentStatus === 'Not Paid' ? 'Cancelled' : orderStatus ;
    const orderStatusClass = finalOrderStatus === 'Delivered'?'status-tag delivered':`status-tag ${finalOrderStatus.toLowerCase()}`
    const paymentStatusClass = `pay-tag ${paymentStatus?.toLowerCase() === 'paid' ? 'paid' : 'not-paid'}`;
  return (
    <>
    <PageTitle title={orderId} />
    <br />
    {loading?(<Loader/>):(<div className="order-box">
        {/* order items table */}
        <div className="table-block">
            <h2 className="table-title">Order Items</h2>
            <table className="table-main">
            <thead>
                <tr className='table-row'>
                    <th className="head-cell">Image</th>
                    <th className="head-cell">Name</th>
                    <th className="head-cell">Quantity</th>
                    <th className="head-cell">Price</th>
                </tr>
            </thead>
            
            <tbody>
                {orderItems.map((item)=>(
                    <tr className='table-row'>
                    <td className="table-cell"><img src={item.image} alt={item.name} className='item-img' /></td>
                    <td className="table-cell">{item.name}</td>
                    <td className="table-cell">{item.quantity}</td>
                    <td className="table-cell">{item.price?.toFixed(2) || "0.00"}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>

        {/* Shipping info Table */}
        <div className="table-block">
            <h2 className="table-title">Shipping Info</h2>
            <table className="table-main">
                <tbody>
                    <tr className="table-row">
                        <th className="table-cell">Address</th>
                        <td className="table-cell">{shippingInfo.address}, {shippingInfo.city}, {shippingInfo.state}, {shippingInfo.country}, {shippingInfo.pinCode}</td>
                    </tr>
                    <tr className="table-row">
                        <th className="table-cell">Phone</th>
                        <td className="table-cell">{shippingInfo.phoneNo}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        {/* Order Summary */}
        <div className="table-block">
            <h2 className="table-title">Order Summary</h2>
            <table className="table-main">
                <tbody>
                    <tr className="table-row">
                        <th className="table-cell">Order Status</th>
                        <td className="table-cell">
                            <span className={orderStatusClass}>{finalOrderStatus}</span>
                        </td>
                    </tr>
                    <tr className="table-row">
                        <th className="table-cell">Payment Status</th>
                        <td className="table-cell">
                            <span className={paymentStatusClass}>{paymentStatus}</span>
                        </td>
                    </tr>
                    {paidAt && (<tr className="table-row">
                        <th className="table-cell">Paid At</th>
                        <td className="table-cell">
                            {new Date(paidAt).toLocaleString()}
                        </td>
                    </tr>)}
                    <tr className="table-row">
                        <th className="table-cell">Item Price</th>
                        <td className="table-cell">
                            {itemPrice?.toFixed(2) || "0.00"}
                        </td>
                    </tr>
                    <tr className="table-row">
                        <th className="table-cell">Tax Price</th>
                        <td className="table-cell">
                            {taxPrice?.toFixed(2) || "0.00"}
                        </td>
                    </tr>
                    <tr className="table-row">
                        <th className="table-cell">Shipping Price</th>
                        <td className="table-cell">
                            {shippingPrice?.toFixed(2) || "0.00"}
                        </td>
                    </tr>
                    <tr className="table-row">
                        <th className="table-cell">Discount</th>
                        <td className="table-cell">
                            {discount?.toFixed(2) || "0.00"}
                        </td>
                    </tr>
                    <tr className="table-row">
                        <th className="table-cell">Total Price</th>
                        <td className="table-cell">
                            {totalPrice?.toFixed(2) || "0.00"}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>)}
    </>
  )
}

export default OrderDetails