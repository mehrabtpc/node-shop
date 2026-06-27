import Order from "../models/order.model.js";
import Cart from "../models/cart.model.js";

export const createOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "سبد خرید خالی است"
      });
    }

    const orderItems = cart.items.map((item) => ({
      product: item.product._id,
      name: item.product.name,
      quantity: item.quantity,
      price: item.price,
      image: item.product.main_image
    }));

    const totalPrice = cart.items.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      total_price: totalPrice,
      shipping_address: req.body.shipping_address,
      payment_method: req.body.payment_method,
      status: "pending"
    });

    cart.items = [];
    cart.total_price = 0;
    await cart.save();

    res.status(201).json({
      success: true,
      message: "سفارش با موفقیت ثبت شد",
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "خطا در ثبت سفارش",
      error: error.message
    });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "خطا در دریافت سفارش‌ها",
      error: error.message
    });
  }
};

export const getMyOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "سفارش پیدا نشد"
      });
    }

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "خطا در دریافت جزئیات سفارش",
      error: error.message
    });
  }
};
