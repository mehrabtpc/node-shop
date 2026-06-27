import User from "../../models/user.model.js";
import Product from "../../models/product.model.js";
import Order from "../../models/order.model.js";

export const getDashboardStats = async (req, res) => {
  try {
    const usersCount = await User.countDocuments();
    const productsCount = await Product.countDocuments();
    const ordersCount = await Order.countDocuments();

    const orders = await Order.find();

    const totalSales = orders.reduce((sum, order) => sum + order.totalPrice, 0);

    res.json({
      usersCount,
      productsCount,
      ordersCount,
      totalSales,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "سفارش پیدا نشد" });
    }

    order.status = status || order.status;
    await order.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
