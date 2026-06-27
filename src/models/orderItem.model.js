import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  
  name: {
    type: String,
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
    min: [1, "تعداد نمی‌تواند کمتر از ۱ باشد"],
  },

  price: {
    type: Number,
    required: true,
  },

  totalPrice: {
    type: Number,
    required: true,
  }
});

export default orderItemSchema;
