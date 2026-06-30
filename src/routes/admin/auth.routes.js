import express from "express";
import {
  registerAdmin,
  loginAdmin,
  profileAdmin,
  logoutAdmin
} from "../../controllers/admin/auth.controller.js";

const router = express.Router();
const app = express();

router.get("/test", (req, res) => {
  res.send("auth route works");
});

router.post("/admin/register", registerAdmin);
router.post("/admin/login", loginAdmin);
router.get("/admin/profile", profileAdmin);
router.post("/admin/logout", logoutAdmin);
app.get("/test", (req, res) => {
  res.send("auth route works");
});
export default router;
