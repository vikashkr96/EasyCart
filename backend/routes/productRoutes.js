import express from "express";
import {getAllProducts, createProducts, updateProduct, deleteProduct, getOneProduct, getAdminProducts, createAndUpdateProductReview, getProductReviews, deleteReviews} from "../controllers/productController.js";
import {roleBasedAccess, verifyUserAuth} from "../middleware/userAuth.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.route("/products").get(getAllProducts);

router.route("/product/:id").get(getOneProduct);

router.route("/admin/products").get(verifyUserAuth, roleBasedAccess("admin"), getAdminProducts);

router.route("/admin/product/create").post(verifyUserAuth, roleBasedAccess("admin"), upload.array("image",10), createProducts);

router.route("/admin/product/:id")
    .get(verifyUserAuth, roleBasedAccess("admin"), getOneProduct)
    .put(verifyUserAuth, roleBasedAccess("admin"), upload.array("image",10), updateProduct)
    .delete(verifyUserAuth, roleBasedAccess("admin"), deleteProduct);

router.route("/review").put(verifyUserAuth, createAndUpdateProductReview);

router.route("/reviews").get(getProductReviews).delete(verifyUserAuth, deleteReviews);

export default router;