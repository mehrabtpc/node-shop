import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    username: { type: String, required: true, trim: true, unique: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true, trim: true },
    phone: { type: String, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" }
  },
  {
    timestamps: true
  }
);

// ۱. متد Middleware برای هش کردن خودکار رمز عبور پیش از ذخیره‌سازی
userSchema.pre("save", async function (next) {
  // اگر پسورد تغییر نکرده بود، دوباره آن را هش نکن
  if (!this.isModified("password")) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// ۲. متد کمکی برای مقایسه پسورد ورودی با پسورد هش‌شده
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
