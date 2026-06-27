import React, { useEffect, useState } from 'react';
import '../pageStyles/ProductDetails.css';
import PageTitle from '../components/PageTitle';
import Navbar from '../components/Navbar';
import Rating from '@mui/material/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createReview, getProductDetails, removeErrors, removeSuccess } from '../features/products/productSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { AddItemsToCart, removeMessage ,removeError} from '../features/cart/cartSlice';

function ProductDetails() {
    const [userRating, setUserRating] = useState(0);
    const [comment, setComment] = useState("");
    const [quantity, setQuantity] = useState(1);

    const { loading, error, product, reviewSuccess, reviewLoading} = useSelector((state) => state.product);
    const {loading:cartLoading, error: cartError, success, message, cartItems} = useSelector((state)=>state.cart) 

    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {

        if(id){
            dispatch(getProductDetails(id));
        }

        return ()=>{
            dispatch(removeErrors());
            dispatch(removeError());
        };

    },[dispatch,id]);

    useEffect(() => {
        if (error) {
            toast.error(error.message, {
                position: 'top-center',
                autoClose: 3000,
            });

            dispatch(removeErrors());
        }
    }, [dispatch, error]);

    useEffect(() => {

        if(cartError){

            toast.error(cartError,{
                position:'top-center',
                autoClose:3000
            });

            dispatch(removeError());

        }

    },[cartError,dispatch]);



    useEffect(() => {
        if (success) {
            toast.success(message, {
                position: 'top-center',
                autoClose: 3000,
            });

            dispatch(removeMessage());
        }
    }, [dispatch, success, message]);

    const increaseQuantity = ()=>{
        if(quantity >= product.stock){
            toast.error("Can't exceed available stock",
                {position:'top-center',autoClose:3000}
            );
            dispatch(removeErrors());
            return;
        }
        setQuantity(qty => qty+1);
    }
    const decreaseQuantity = ()=>{
        if( quantity <= 1){
            toast.error("Quantity Can't be less than 1",
                {position:'top-center',autoClose:3000}
            );
            dispatch(removeErrors());
            return;
        }
        setQuantity(qty => qty-1);
    }

    const addToCart = ()=>{
    dispatch(AddItemsToCart({id,quantity}));
    setQuantity(1);
    }

    const handleReviewSubmit = (e) =>{
        e.preventDefault();
        if(!userRating){
            toast.error('Please select a rating', {position: 'top-center',autoClose: 3000,});
            return;
        }
        dispatch(createReview({
            rating:userRating,
            comment,
            productId:id
        }));
    }

    useEffect(()=>{
        if(reviewSuccess){
            toast.success('Review submitted successfully', {position: 'top-center',autoClose: 3000,});
            setUserRating(0);
            setComment("")
            dispatch(removeSuccess())
            dispatch(getProductDetails(id))
        }
    },[reviewSuccess, id, dispatch])

        if (loading) {
        return <Loader />;
    }

    if (error || !product) {
        return (
            <>
                <PageTitle title="Product Details" />
                <div className="error-container">
                    Product not found
                </div>
            </>
        );
    }


    return (
        <>
            <PageTitle title={`${product.name} - Details`} />

            <Navbar />

            <div className="product-details-container">
                <div className="product-detail-container">

                    <div className="product-image-container">
                        <img
                            src={product.images[0].url.replace('./', '/')}
                            alt={product.name}
                            className="product-detail-image"
                        />
                    </div>

                    <div className="product-info">
                        <h2>{product.name}</h2>

                        <p className="product-description">
                            {product.description}
                        </p>

                        <p className="product-price">
                            Price : ₹ {product.price} /-
                        </p>

                        <div className="product-rating">
                            <Rating
                                value={product.rating}
                                readOnly
                            />
                            <br />

                            <span className="productCardSpan">
                                ({product.numOfReviews}{' '}
                                {product.numOfReviews === 1
                                    ? 'Review'
                                    : 'Reviews'}
                                )
                            </span>
                        </div>

                        <div className="stock-status">
                            <span
                                className={
                                    product.stock > 0
                                        ? 'in-stock'
                                        : 'out-of-stock'
                                }
                            >
                                {product.stock > 0
                                    ? `In Stock (${product.stock} available)`
                                    : 'Out of Stock'}
                            </span>
                        </div>

                        {product.stock > 0 && (
                            <>
                                <div className="quantity-controls">
                                    <span className="quantity-label">
                                        Quantity :
                                    </span>

                                    <button onClick={decreaseQuantity} className="quantity-button">
                                        -
                                    </button>

                                    <input
                                        type="text"
                                        value={quantity}
                                        className="quantity-value"
                                        readOnly
                                    />

                                    <button onClick={increaseQuantity} className="quantity-button">
                                        +
                                    </button>
                                </div>

                                <button 
                                    onClick={addToCart} 
                                    className="add-to-cart-btn"
                                    disabled={cartLoading}
                                >
                                {
                                    cartLoading ? (
                                        <>
                                            Adding to Cart
                                            <span className="cart-loader"></span>
                                        </>
                                    ) : (
                                        "Add to Cart"
                                    )
                                }
                                </button>
                            </>
                        )}

                        <form className="review-form" onSubmit={handleReviewSubmit}>
                            <h3>Write a Review</h3>

                            <Rating
                                value={userRating}
                                onChange={(event, newValue) => {
                                setUserRating(newValue);
                                }}
                            />

                            <textarea
                                placeholder="Write your review here..."
                                className="review-input"
                                value={comment}
                                onChange={(e)=>setComment(e.target.value)}
                                required
                            ></textarea>
                            <button 
                                type="submit" 
                                className="submit-review-btn"
                                disabled={reviewLoading}
                                >
                                {reviewLoading ? (
                                    <>
                                        Please wait..
                                        <span className="loader"></span>
                                    </>
                                ) : (
                                    "Submit Review"
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <hr />
            <br />

            {/* Reviews Section */}
            <div className="review-container">
                <h3 className='header'>Customer Reviews</h3>

                {product.reviews && product.reviews.length > 0 ? (
                    <div className="reviews-section">

                        {product.reviews.map((review, index) => (
                            <div
                                className="review-item"
                                key={index}
                            >
                                <div className="review-header">
                                    <Rating
                                        value={review.rating}
                                        readOnly
                                    />
                                </div>

                                <p className="review-comment">
                                    {review.comment}
                                </p>

                                <p className="review-name">
                                    By : {review.name}
                                </p>
                            </div>
                        ))}

                    </div>
                ) : (
                    <p className="no-reviews">
                        No reviews yet. Be the first to review this product!
                    </p>
                )}
            </div>

        </>
    );
}

export default ProductDetails;