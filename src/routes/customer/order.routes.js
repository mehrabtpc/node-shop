
//user
import express from "express";
import {
  createOrder,
  getMyOrders,
  getMyOrderById
} from "../../controllers/customer/order.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/my", protect, getMyOrders);
router.get("/my/:id", protect, getMyOrderById);

export default router;
