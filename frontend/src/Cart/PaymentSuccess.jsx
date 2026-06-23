import React from 'react'
import '../CartStyles/PaymentSuccess.css'
import { useSearchParams, Link } from 'react-router-dom'

function PaymentSuccess() {

    const [searchParams] = useSearchParams();

    const reference = searchParams.get('reference');

    return (
        <div className="payment-success-container">

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
            <br /><br />

            <Link className="explore-btn" to="/">
                Explore More Products
            </Link>

        </div>
    )
}

export default PaymentSuccess;