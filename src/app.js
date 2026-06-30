import express from "express";
import bodyParser from "body-parser";

import customerRoutes from "./routes/customer/user.routes.js";
import categoryRoutes from "./routes/front/category.routes.js";
import productRoutes from "./routes/front/product.routes.js";
import cartRoutes from "./routes/front/cart.routes.js";
import orderRoutes from "./routes/customer/order.routes.js";
import adminRoutes from "./routes/admin/admin.routes.js";
import authRoutes from "./routes/admin/auth.routes.js";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/users", customerRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);

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
