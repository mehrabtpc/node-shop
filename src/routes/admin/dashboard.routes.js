import express from "express";
import { protect, adminOnly } from "../../middlewares/auth.middleware.js";

const router = express.Router();

export const adminDashboard = async (req, res) => {
  res.json({ message: "i'm admin" });
};

router.get("/", protect, adminOnly, adminDashboard);

export default router;
