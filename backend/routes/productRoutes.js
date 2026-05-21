import express from "express";
import {getAllProducts, createProducts, updateProduct, deleteProduct, getOneProduct} from "../controllers/productController.js";
import { roleBasedAccess, verifyUserAuth } from "../middleware/userAuth.js";

const router = express.Router();

router.route("/products")
    .get(verifyUserAuth,getAllProducts)
    .post(verifyUserAuth, roleBasedAccess("admin"),createProducts);

router.route("/product/:id")
    .get(verifyUserAuth,getOneProduct)
    .put(verifyUserAuth, roleBasedAccess("admin"),updateProduct)
    .delete(verifyUserAuth, roleBasedAccess("admin"),deleteProduct);

export default router;