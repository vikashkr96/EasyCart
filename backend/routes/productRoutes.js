import express from "express";
import {getAllProducts, createProducts, updateProduct, deleteProduct, getOneProduct} from "../controllers/productController.js";

const router = express.Router();

router.route("/products")
    .get(getAllProducts)
    .post(createProducts);

router.route("/product/:id")
    .get(getOneProduct)
    .put(updateProduct)
    .delete(deleteProduct);

export default router;