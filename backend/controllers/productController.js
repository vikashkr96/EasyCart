import mongoose from "mongoose";
import Product from "../models/productModel.js";

// 1️⃣ Create Product
export const createProducts = async (req, res) => {
    try {

        const product = await Product.create(req.body);

        return res.status(201).json({
            success: true,
            product
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// 2️⃣ Get All Products
export const getAllProducts = async (req, res) => {
    try {

        const products = await Product.find();

        return res.status(200).json({
            success: true,
            products
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// 3️⃣ Update Product
export const updateProduct = async (req, res) => {
    try {

        // Validating ObjectId
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Product ID"
            });
        }

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        return res.status(200).json({
            success: true,
            product
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// 4️⃣ Delete Product
export const deleteProduct = async (req, res) => {
    try {

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Product ID"
            });
        }

        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// 5️⃣ Get One Product
export const getOneProduct = async (req, res) => {
    try {

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Product ID"
            });
        }

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        return res.status(200).json({
            success: true,
            product
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};