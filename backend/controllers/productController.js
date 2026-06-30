import mongoose from "mongoose";
import Product from "../models/productModel.js";
import HandleError from "../utils/handleError.js";
import handleAsyncError from "../middleware/handleAsyncError.js";
import APIFunctionality from "../utils/apiFunctionality.js";
import { getLogger } from "nodemailer/lib/shared/index.js";
import {v2 as cloudinary} from 'cloudinary'
import fs from "fs";


// 1️⃣ Create Product
export const createProducts = handleAsyncError(async (req, res, next) => {
    const imageLinks = [];

    if(req.files && req.files.length > 0){

        for(let i = 0; i < req.files.length; i++){
            const filePath = req.files[i].path;
            const result = await cloudinary.uploader.upload(
                req.files[i].path,
                {
                    folder:"products"
                }
            );
            // delete local file after cloudinary upload
            if(fs.existsSync(filePath)){
                fs.unlinkSync(filePath);
            }
            imageLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            });
        }
    }
    req.body.images = imageLinks;
    req.body.user = req.user.id;

    const product = await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    });

});


// 2️⃣ Get All Products
export const getAllProducts = handleAsyncError(async (req, res, next) => {
    const resultsPerPage = 4;
    const apiFeatures = new APIFunctionality(Product.find(), req.query).search().filter();
    
    // getting filtered query before pagination
    const filteredQuery = apiFeatures.query.clone();
    const productCount = await filteredQuery.countDocuments();


    // calculate total pages as per filtered query.
    const totalPages = Math.ceil(productCount/resultsPerPage);
    const page = Number(req.query.page) ||1;

    if(page > totalPages && productCount>0){
        return next(new HandleError("This page doesn't exist", 404));
    }
    
    // applying pagination
    apiFeatures.pagination(resultsPerPage);
    const products = await apiFeatures.query;

   if(!products || products.length === 0){
    return next(new HandleError("No Product Found", 404));
   }

    res.status(200).json({
        success: true,
        products,
        productCount,
        resultsPerPage,
        totalPages,
        currentPage:page

    });

});


// 3️⃣ Update Product
export const updateProduct = handleAsyncError(async (req, res, next) => {

    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new HandleError("Product Not Found", 404));
    }

    let imageLinks = [];

    // If new images are uploaded
    if (req.files && req.files.length > 0) {

        // Delete old images from Cloudinary
        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.uploader.destroy(
                product.images[i].public_id
            );
        }

        // Upload new images
        for (let i = 0; i < req.files.length; i++) {

            const filePath = req.files[i].path;

            const result = await cloudinary.uploader.upload(
                filePath,
                {
                    folder: "products"
                }
            );

            // Remove local file
            if(fs.existsSync(filePath)){
                fs.unlinkSync(filePath);
            }

            imageLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            });
        }

        req.body.images = imageLinks;
    }

    product = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true
        }
    );

    res.status(200).json({
        success: true,
        product
    });

});


// 4️⃣ Delete Product
export const deleteProduct = handleAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new HandleError("Product Not Found", 404));
    }
    // Delete images from Cloudinary
    if (product.images && product.images.length > 0) {

        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.uploader.destroy(
                product.images[i].public_id
            );
        }

    }
    // Delete product from database
    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        message: "Product deleted successfully"
    });
});


// 5️⃣ Get One Product
export const getOneProduct = handleAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new HandleError("Product Not Found", 404));
    }

    res.status(200).json({
        success: true,
        product
    });

});

// 6️⃣ Creating and Updating reviews
export const createAndUpdateProductReview = handleAsyncError(async (req, res, next) => {

    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    };

    const product = await Product.findById(productId);

    if (!product) {
        return next(new HandleError("Product not found", 404));
    }

    const reviewExists = product.reviews.find(
        rev => rev.user && rev.user.toString() === req.user.id
    );

    if (reviewExists) {

        product.reviews.forEach(rev => {

            if (rev.user && rev.user.toString() === req.user.id) {

                rev.rating = Number(rating);
                rev.comment = comment;
            }
        });

    } else {

        product.reviews.push(review);

    }
    product.numOfReviews = product.reviews.length;

    //  showing average rating
    let sum = 0;
    product.reviews.forEach(review =>{
        sum += review.rating;
    })
    product.rating =product.reviews.length > 0 ? sum/product.reviews.length : 0;


    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        product
    });

});

// 7️⃣ Getting the reviews
export const getProductReviews = handleAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    if(!product){
        return next(new HandleError("Product not Found",400));
    }

    res.status(200).json({
        success:true,
        reviews: product.reviews
    })
});

// 8️⃣ Deleting the reviews
export const deleteReviews = handleAsyncError(async (req, res, next) => {

    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(new HandleError("Product not Found", 400));
    }

    // remove selected review
    const reviews = product.reviews.filter(
        review => review._id.toString() !== req.query.id.toString()
    );

    // calculate average rating
    let sum = 0;

    reviews.forEach(review => {
        sum += review.rating;
    });
    const ratings = reviews.length > 0 ? sum / reviews.length:0;
    const numOfReviews = reviews.length;

    // update product
    await Product.findByIdAndUpdate(
        req.query.productId,
        {
            reviews,
            ratings,
            numOfReviews
        },
        {
            returnDocument: "after",
            runValidators: true
        }
    );

    res.status(200).json({
        success: true,
        message: "Review Deleted Successfully"
    });

});

// 9️⃣ Admin - Getting all products
export const getAdminProducts = handleAsyncError(async (req, res, next) => {
    const products = await Product.find();

    res.status(200).json({
        success: true,
        products
    })
})
