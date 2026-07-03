import React, { useEffect, useState } from 'react'
import '../AdminStyles/UpdateOrder.css'
import PageTitle from '../components/PageTitle.jsx'
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {getOrderDetails} from '../features/order/orderSlice.js'
import Loader from '../components/Loader.jsx'
import {toast} from 'react-toastify'
import { removeErrors, removeSuccess, updateOrderStatus } from '../features/admin/adminSlice.js'

function UpdateOrder() {
    const [status, setStatus] = useState("");
    const {orderId} = useParams();
    const {order,loading:orderLoading} = useSelector(state=>state.order);
    const {success, updateLoading , error} = useSelector(state=>state.admin);
    
    const loading = orderLoading || updateLoading;
    
    const dispatch = useDispatch();

    useEffect(()=>{
        if(orderId){
        dispatch(getOrderDetails(orderId));
    }
    },[dispatch])

    const {
        shippingInfo={},
        orderItems=[],
        paymentInfo={},
        orderStatus="",
        totalPrice=0
    }=order;

    const handleStatusUpdate = () => {
        if (!status) {
            toast.error("Please Select a Status", {
                position: "top-center",
                autoClose: 3000
            });
            return;
        }

        dispatch(
            updateOrderStatus({
                orderId,
                status
            })
        );
    };

    useEffect(() => {
        if (error) {
            toast.error(error, {
                position: "top-center",
                autoClose: 3000
            });
            dispatch(removeErrors());
        }
        if (success) {
            toast.success("Order Status Updated Successfully", {
                position: "top-center",
                autoClose: 3000
            });
            dispatch(removeSuccess());
            dispatch(getOrderDetails(orderId)); 
            setStatus("");
        }
    }, [dispatch, error, success, orderId]);

  return (
    <>
    <PageTitle title="Update Order"/>
    {loading?(<Loader/>):(<div className="order-container">
        <h1 className='order-title'>Update Order</h1>
        <div className="order-details">
            <h2>Order Information</h2>
            <p><strong>Order ID: </strong>{orderId}</p>
            <p><strong>Shipping Address: </strong>{shippingInfo.address}, {shippingInfo.city}, {shippingInfo.state}, {shippingInfo.country}-{shippingInfo.pinCode}</p>
            <p><strong>Phone No: </strong>{shippingInfo.phoneNo}</p>
            <p><strong>Order Status: </strong>{orderStatus}</p>
            <p><strong>Payment Status: </strong>{paymentInfo.status || "Not Paid"}</p>
            <p><strong>Total Price: </strong>₹{totalPrice.toLocaleString('en-IN', {minimumFractionDigits: 2,maximumFractionDigits: 2 })}</p>
        </div>
        <div className="order-items">
            <h2>Order Items</h2>
            <table className="order-table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {orderItems.map((item)=>(
                        <tr key={item._id}>
                        <td><img src={item.image} alt={item.name} className='order-item-image' /></td>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>₹{item.price.toLocaleString('en-IN', {minimumFractionDigits: 2,maximumFractionDigits: 2 })}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <div className="order-status">
            <h2>Update Status</h2>
            <select className="status-select" value={status} onChange={(e)=>setStatus(e.target.value)}>
                <option value="">Select Status</option>
                <option value="Shipped">Shipped</option>
                <option value="On The Way">On The Way</option>
                <option value="Delivered">Delivered</option>
            </select>
            <button className="update-button" onClick={handleStatusUpdate} disabled={updateLoading}>
            {updateLoading ? ( 
                <>
               Updating...<span className="loader"></span>
                </>          ) : (
               "Update Status"   )}
            </button>
        </div>
    </div>)}
    </>
  )
}

export default UpdateOrder