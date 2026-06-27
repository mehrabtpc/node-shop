import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    invoice: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invoice",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    method: {
      type: String,
      enum: ["online", "wallet", "cash_on_delivery"],
      required: true,
    },
    gateway: {
      type: String, // مثلاً ZarinPal, Mellat, Stripe
    },
    transactionId: {
      type: String, 
      unique: true,
      sparse: true, 
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending",
    },
    paidAt: {
      type: Date,
    }
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
