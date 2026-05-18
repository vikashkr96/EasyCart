import mongoose from "mongoose";
import Product from "../models/productModel.js";
import HandleError from "../utils/handleError.js";
import handleAsyncError from "../middleware/handleAsyncError.js";
import APIFunctionality from "../utils/apiFunctionality.js";


// 1️⃣ Create Product
export const createProducts = handleAsyncError(async (req, res, next) => {

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    });

});


// 2️⃣ Get All Products
export const getAllProducts = handleAsyncError(async (req, res, next) => {
    const resultsPerPage = 3;
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

    const product = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true
        }
    );

    if (!product) {
        return next(new HandleError("Product Not Found", 404));
    }

    res.status(200).json({
        success: true,
        product
    });

});


// 4️⃣ Delete Product
export const deleteProduct = handleAsyncError(async (req, res, next) => {

    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
        return next(new HandleError("Product Not Found", 404));
    }

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