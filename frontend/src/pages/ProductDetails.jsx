import React, { useEffect, useState } from 'react';

import '../pageStyles/ProductDetails.css';
import PageTitle from '../components/PageTitle';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Rating from '@mui/material/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductDetails, removeErrors } from '../features/products/productSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

function ProductDetails() {
    const [userRating, setUserRating] = useState(0);
    
    const handleRatingChange = (newRating)=>{
    setUserRating(newRating);
    }

    const {loading , error, product}=useSelector((state)=>state.product);
    const dispatch = useDispatch();
    const {id} = useParams();
    useEffect(()=>{
        if(id){
            dispatch(getProductDetails(id));
        }
        return ()=>{
            dispatch(removeErrors())
        }
    },[dispatch, id])

    useEffect(()=>{
        if(error){
        toast.error(error.message, {position:'top-center', autoClose: 3000});
        dispatch(removeErrors());
        }
    },[dispatch, error])

    if(loading){
        return(
            <>
            <Loader/>
            </>
        )
    }

    if(error || !product){
        return(
            <>
           <PageTitle title="Product Details"/>
            </>
        )
    }

    

  return (
    <>
    <PageTitle title={`${product.name} - Details`}/>

    <div className="product-details-container">
        <div className="product-detail-container">
            <div className="product-image-container">
                <img src={product.images[0].url.replace('./','/')} alt={product.name} className='product-detail-image' />
            </div>
            <div className="product-info">
                <h2>{product.name}</h2>
                <p className="product-description">{product.description}</p>
                <p className="product-price">Price : ₹ {product.price} /-</p>
                <div className="product-rating">
                    <Rating
                    value={product.rating}
                    disabled={true}
                    /> <br />
                    <span className="productCardSpan">({product.numOfReviews} {product.numOfReviews === 1 ? "Review": "Reviews"} )</span>
                </div>
                <div className="stock-status">
                    <span className="in-stock">In Stock (8 available)</span>
                </div>
                <div className="quantity-controls">
                    <span className="quantity-label">Quantity :</span>
                    <button className="quantity-button">-</button>
                    <input type="text" value={1} className="quantity-value" readOnly />
                    <button className="quantity-button">+</button>
                </div>
                <button className="add-to-cart-btn">Add to Cart</button>

                <form  className="review-form">
                    <h3>Write a Review</h3>
                    <Rating
                    value={0}
                    disabled={false}
                    onRatingChange = {handleRatingChange}
                    />
                    <textarea placeholder='Write your review here..' className="review-input"></textarea>
                    <button className="submit-review-btn">Submit Review</button>
                </form>
            </div>
        </div>
    </div>

    <div className="review-container">
        <h3>Customer Reviews</h3>
        <div className="reviews-section">
            <div className="review-item">
                <div className="review-header">
                    <Rating
                    value={1}
                    disabled={true}
                    />
                </div>
                <p className="review-comment">Review Comment</p>
                <p className="review-name">By : Vikash</p>
            </div>
        </div>
    </div>
    </>
  )
}

export default ProductDetails