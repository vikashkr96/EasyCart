import React, { useEffect, useRef, useState } from "react";
import '../AdminStyles/ReviewsList.css'
import PageTitle from '../components/PageTitle'
import { Delete, Close } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAdminProducts, fetchProductReviews, deleteReview } from '../features/admin/adminSlice'
import { toast } from 'react-toastify'
import { removeErrors } from '../features/admin/adminSlice'
import Loader from '../components/Loader.jsx'

function ReviewsList() {
    const {products, loading, error, reviews} = useSelector(state => state.admin);

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showReviewsModal, setShowReviewsModal] = useState(false);
    const [loadingProductId, setLoadingProductId] = useState(null);
    const [deletingReviewId, setDeletingReviewId] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAdminProducts());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            toast.error(error, { position: 'top-center', autoClose: 3000 });
            dispatch(removeErrors());
        }
    }, [dispatch, error]);

    const handleViewReviews = async (productId) => {
        setSelectedProduct(productId);
        setLoadingProductId(productId);

        try {
            await dispatch(fetchProductReviews(productId)).unwrap();
            setShowReviewsModal(true);
        } catch (err) {
            console.log(err);
        } finally {
            setLoadingProductId(null);
        }
    };

    const closeModal = () => {
        setShowReviewsModal(false);
        setSelectedProduct(null);
    };

    const handleDeleteReview = async (reviewId) => {
        if (!window.confirm("Are you sure you want to delete this review?")) return;

        setDeletingReviewId(reviewId);
        try {
            await dispatch(deleteReview({ reviewId, productId: selectedProduct })).unwrap();
            toast.success("Review deleted successfully", { position: 'top-center', autoClose: 3000 });
            dispatch(fetchAdminProducts()); 
        } catch (err) {
            toast.error(err?.message || "Failed to delete review", { position: 'top-center', autoClose: 3000 });
        } finally {
            setDeletingReviewId(null);
        }
    };

    if (!products || products.length === 0) {
        return (
            <div className="reviews-list-container">
                <h1 className="reviews-list-title">Admin Reviews</h1>
                <p>No Product Found</p>
            </div>
        )
    }

    const selectedProductData = products.find(p => p._id === selectedProduct);

    return (
        <>
        <PageTitle title="All Reviews"/>
        <div className="reviews-list-container">
            <br />
            <h1 className="reviews-list-title">All Products</h1>
            <table className="reviews-table">
                <thead>
                    <tr>
                        <th>S No.</th>
                        <th>Product Name</th>
                        <th>Product Image</th>
                        <th>No. of Reviews</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={product._id}>
                        <td>{index+1}</td>
                        <td>{product.name}</td>
                        <td>
                            <img src={product.images[0].url} alt={product.name} className='product-image'/>
                        </td>
                        <td>{product.numOfReviews}</td>
                        <td>
                            <button
                                className="action-btn view-btn"
                                disabled={
                                    product.numOfReviews === 0 ||
                                    loadingProductId === product._id
                                }
                                onClick={() => handleViewReviews(product._id)}
                            >
                                {loadingProductId === product._id
                                    ? "Please wait..."
                                    : "View Reviews"}
                            </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {showReviewsModal && (
            <div className="reviews-modal-overlay" onClick={closeModal}>
                <div className="reviews-modal" onClick={(e) => e.stopPropagation()}>
                    <div className="reviews-modal-header">
                        <h2>Reviews {selectedProductData ? `— ${selectedProductData.name}` : ""}</h2>
                        <button className="modal-close-btn" onClick={closeModal}>
                            <Close />
                        </button>
                    </div>

                    <div className="reviews-modal-body">
                        {loading ? (
                            <Loader />
                        ) : !reviews || reviews.length === 0 ? (
                            <p className="no-review-selected">No reviews found</p>
                        ) : (
                            reviews.map((review) => (
                                <div className="review-card" key={review._id}>
                                    <div className="review-card-header">
                                        <span className="review-user">{review.name}</span>
                                        <span className="review-rating">⭐ {review.rating}</span>
                                    </div>
                                    <p className="review-comment">{review.comment}</p>
                                    <button
                                        className="action-btn delete-review-btn"
                                        disabled={deletingReviewId === review._id}
                                        onClick={() => handleDeleteReview(review._id)}
                                    >
                                        <Delete fontSize="small" />
                                        {deletingReviewId === review._id ? "Deleting..." : "Delete"}
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        )}
        </>
    )
}

export default ReviewsList