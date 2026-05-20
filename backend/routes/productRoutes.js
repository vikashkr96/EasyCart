import express from "express";
import {getAllProducts, createProducts, updateProduct, deleteProduct, getOneProduct} from "../controllers/productController.js";
import { verifyUserAuth } from "../middleware/userAuth.js";

const router = express.Router();

router.route("/products")
    .get(verifyUserAuth,getAllProducts)
    .post(createProducts);

router.route("/product/:id")
    .get(getOneProduct)
    .put(updateProduct)
    .delete(deleteProduct);

export default router;