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
    const toastShown = useRef(false);


    useEffect(() => {
        console.log("ALL SESSION DATA:", sessionStorage);
        console.log("orderItem:", sessionStorage.getItem("orderItem"));
    }, []);


    useEffect(()=>{

    if(orderCreated.current) return;
    const storedOrder = sessionStorage.getItem("orderItem");
    if(!storedOrder){
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
                        pinCode:Number(shippingInfo.pinCode),
                        phoneNo:Number(shippingInfo.phoneNumber),
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
                        status:"Paid"
                    },

                    itemPrice:orderItem.itemPrice,
                    taxPrice:orderItem.taxPrice,
                    shippingPrice:orderItem.shippingPrice,
                    totalPrice:orderItem.totalPrice,
                    discount:orderItem.discount
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
        if(success && !toastShown.current){

            toastShown.current = true;

            toast.success('Order Placed',{
                position:'top-center',
                autoClose:3000
            });

            sessionStorage.removeItem('orderItem');
            sessionStorage.removeItem('shippingInfo');
            sessionStorage.removeItem('orderCreated');

            dispatch(clearCart());
            dispatch(removeSuccess());
        }

    },[dispatch, success])


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