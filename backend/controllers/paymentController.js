import handleAsyncError from '../middleware/handleAsyncError.js';
import {instance} from '../server.js';
import crypto from 'crypto';

export const processPayment = handleAsyncError(async(req, res)=>{

    console.log("BODY:", req.body);

    const amountInPaise = Math.round(Number(req.body.amount) * 100);

    console.log("RUPEES:", req.body.amount);
    console.log("PAISE:", amountInPaise);

    const options = {
        amount: amountInPaise,
        currency:'INR'
    }

    console.log("OPTIONS:", options);

    const order = await instance.orders.create(options)

    res.status(200).json({
        success:true,
        order
    })
})

// send API KEY

export const sendAPIKey = handleAsyncError(async(req, res)=>{
    res.status(200).json({
        key:process.env.RAZORPAY_API_KEY
    })
})

// Payment verification

export const paymentVerification = handleAsyncError(async(req, res)=>{
    const {razorpay_payment_id,razorpay_order_id,razorpay_signature} = req.body;
    
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac('sha256',process.env.RAZORPAY_API_SECRET).update(body.toString()).digest("hex");
    const isAuthentic = expectedSignature === razorpay_signature;
    if(isAuthentic){
        return res.status(200).json({
            success:true,
            message:'Payment verified successfully',
            reference: razorpay_payment_id
            })
    }else{
        return res.status(200).json({
            success:false,
            message:'Payment verification failed',
            })
    }
})