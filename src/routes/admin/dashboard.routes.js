import express from "express";
import { protect, adminOnly } from "../../middlewares/auth.middleware.js";
import { dashboard } from "../../controllers/admin/dashboard.controller.js";

const router = express.Router();


router.get("/", protect, adminOnly, dashboard);

export default router;
