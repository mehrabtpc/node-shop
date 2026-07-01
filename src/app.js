import express from "express";
import bodyParser from "body-parser";

import customerUserRoutes from "./routes/customer/user.routes.js";
import frontCategoryRoutes from "./routes/front/category.routes.js";
import frontProductRoutes from "./routes/front/product.routes.js";
import frontCartRoutes from "./routes/front/cart.routes.js";
import customerOrderRoutes from "./routes/customer/order.routes.js";
import adminAdminRoutes from "./routes/admin/admin.routes.js";
import adminAuthRoutes from "./routes/admin/auth.routes.js";
import adminDashboardRoutes from "./routes/admin/dashboard.routes.js";


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/customer/users", customerUserRoutes);
app.use("/api/front/categories", frontCategoryRoutes);
app.use("/api/front/products", frontProductRoutes);
app.use("/api/front/cart", frontCartRoutes);
app.use("/api/customer/orders", customerOrderRoutes);
app.use("/api/admin/admins", adminAdminRoutes);
app.use("/api/admin/auth", adminAuthRoutes);
app.use("/api/admin/dashboard", adminDashboardRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: {
      type: "Not Found",
      message: "404 test msg",
    },
  });
});

export default app;
