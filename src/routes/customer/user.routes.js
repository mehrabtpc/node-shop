import express from "express";
import {
  registerCustomer,
  loginCustomer,
  getCustomerProfile,
} from "../../controllers/customer/auth.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerCustomer);
router.post("/login", loginCustomer);
router.get("/profile", protect, getCustomerProfile);

export default router;
