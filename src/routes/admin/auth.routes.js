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

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/profile", profileAdmin);
router.post("/logout", logoutAdmin);
app.get("/test", (req, res) => {
  res.send("auth route works");
});
export default router;
