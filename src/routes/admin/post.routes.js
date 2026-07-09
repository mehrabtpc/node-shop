import express from "express";
import {
  index,
  store,
  show,
  update,
  destroy
} from "../../controllers/admin/post.controller.js";


import { protect, adminOnly } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", protect, adminOnly, index);
router.post("/", protect, adminOnly, store);
router.get("/:id", protect, adminOnly, show);
router.put("/:id", protect, adminOnly, update);
router.delete("/:id", protect, adminOnly, destroy);

export default router;
