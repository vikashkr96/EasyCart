import React, { useEffect, useRef } from 'react'
import '../CartStyles/PaymentSuccess.css'
import { useSearchParams, Link } from 'react-router-dom'
import PageTitle from '../components/PageTitle'
import {useDispatch, useSelector} from 'react-redux';
import {toast} from 'react-toastify'
import { createOrder, removeErrors, removeSuccess } from '../features/order/orderSlice';
import { clearCart } from '../features/cart/cartSlice';

function PaymentSuccess() {

    const [searchParams] = useSearchParams();
    const reference = searchParams.get('reference');
    const {cartItems, shippingInfo} = useSelector(state =>state.cart);
    const {loading, success, error } = useSelector(state=>state.order)
    const dispatch = useDispatch();
    const orderCreated = useRef(false);


    useEffect(() => {
        console.log("ALL SESSION DATA:", sessionStorage);
        console.log("orderItem:", sessionStorage.getItem("orderItem"));
    }, []);


    useEffect(()=>{
        if(orderCreated.current) return;
        const alreadyCreated = sessionStorage.getItem("orderCreated");
        if(alreadyCreated){
            return;
        }
        orderCreated.current = true;
        const createOrderData = async()=>{
            try{
                const storedOrderItem = sessionStorage.getItem('orderItem');
                const orderItem = JSON.parse(storedOrderItem);
                const orderData = {
                    shippingInfo:{
                        address:shippingInfo.address,
                        city:shippingInfo.city,
                        state:shippingInfo.state,
                        country:shippingInfo.country,
                        pinCode:shippingInfo.pinCode,
                        phoneNo:shippingInfo.phoneNumber,
                    },
                    orderItems:cartItems.map((item)=>({
                        name:item.name,
                        price:item.price,
                        quantity:item.quantity,
                        image:item.image,
                        product:item.product
                    })),
                    paymentInfo:{
                        id:reference,
                        status:'succeeded'
                    },
                    itemPrice: orderItem?.subTotal || 0,
                    taxPrice: orderItem?.tax || 0,
                    shippingPrice: orderItem?.shipping || 0,
                    totalPrice: orderItem?.total || 0,
                    discount: orderItem?.discount || 0
                }

                console.log("sending data: ",orderData);
                dispatch(createOrder(orderData));
                sessionStorage.setItem(
                    "orderCreated",
                    "true"
                );
                
            }catch(error){
                toast.error(error.message || "Order Creation Error",{position:'top-center', autoClose:3000})
            }
        }
        createOrderData()
    },[dispatch, reference])

    useEffect(()=>{
        if(success){
            toast.success('Order Placed',{position:'top-center', autoClose:3000})
             sessionStorage.removeItem('orderItem');
             sessionStorage.removeItem('shippingInfo');
             dispatch(clearCart());
            dispatch(removeSuccess());
        }
    },[dispatch, success])

    useEffect(()=>{
        if(error){
            toast.error(error,{position:'top-center', autoClose:3000})
            dispatch(removeErrors());
        }
    },[dispatch, error])


    return (
        <>
        <PageTitle title='Payment Status'/>
        <div className="payment-success-container">
            <div className="success-content">
            <div className="success-icon">
                <div className="checkmark"></div>
            </div>

            <h1>Order Confirmed</h1>
            <br />

            <p>
                Your Payment was successful.
                Reference ID : 
                <strong> {reference}</strong>
            </p>
            <br />

            <Link className="explore-btn" to="/orders/user">
                View Orders
            </Link>

            </div>

        </div>
        </>
    )
}

export default PaymentSuccess;