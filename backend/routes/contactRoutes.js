import express from "express";
import { submitInquiry } from "../controllers/contactController.js";

const router = express.Router();

router.route("/contact").post(submitInquiry);

export default router;
