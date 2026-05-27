import express from "express";
import {getAllProducts, createProducts, updateProduct, deleteProduct, getOneProduct, getAdminProducts} from "../controllers/productController.js";
import { roleBasedAccess, verifyUserAuth } from "../middleware/userAuth.js";

const router = express.Router();

// routes
router.route("/products")
    .get(getAllProducts);


router.route("/admin/products")
    .get(verifyUserAuth, roleBasedAccess("admin"), getAdminProducts);
    

router.route("/admin/product/create").post(verifyUserAuth, roleBasedAccess("admin"),createProducts);

router.route("/admin/product/:id")
    .put(verifyUserAuth, roleBasedAccess("admin"),updateProduct)
    .delete(verifyUserAuth, roleBasedAccess("admin"),deleteProduct);

router.route("/product/:id").get(getOneProduct);

export default router;