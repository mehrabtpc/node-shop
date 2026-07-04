import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from "../../controllers/admin/product.controller.js";

import { protect, adminOnly } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", protect, adminOnly, getAllProducts);
router.post("/", protect, adminOnly, createProduct);
router.get("/:id", protect, adminOnly, getProductById);
router.put("/:id", protect, adminOnly, updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

export default router;
