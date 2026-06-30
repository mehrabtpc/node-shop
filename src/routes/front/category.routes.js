// import express from "express";
// import {
//   createCategory,
//   getAllCategories,
//   deleteCategory,
// } from "../controllers/category.controller.js";
// import { protect, adminOnly } from "../middlewares/auth.middleware.js";

// const router = express.Router();

// router.get("/", getAllCategories);
// router.post("/", protect, adminOnly, createCategory);
// router.delete("/:id", protect, adminOnly, deleteCategory);

// export default router;

//user
import express from "express";
import {
  getCategories,
  getCategoryBySlug,
  getCategoryProducts
} from "../../controllers/front/category.controller.js";

const router = express.Router();

router.get("/", getCategories);
router.get("/:slug", getCategoryBySlug);
router.get("/:slug/products", getCategoryProducts);

export default router;

