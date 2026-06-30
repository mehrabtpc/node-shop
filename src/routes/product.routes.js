// import express from "express";
// import {
//   createProduct,
//   getAllProducts,
//   getProductById,
//   updateProduct,
//   deleteProduct,
// } from "../controllers/product.controller.js";

// const router = express.Router();

// router.post("/", createProduct);
// router.get("/", getAllProducts);
// router.get("/:id", getProductById);
// router.put("/:id", updateProduct);
// router.delete("/:id", deleteProduct);

// export default router;

// user
import express from "express";
import {
  getProducts,
  getProductBySlug,
  getRelatedProducts
} from "../controllers/front/product.controller.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:slug", getProductBySlug);
router.get("/:slug/related", getRelatedProducts);

export default router;
