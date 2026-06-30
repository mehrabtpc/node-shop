import User from "../../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// فقط در صورت نیاز - توصیه می‌شود بعد از ساخت اولین ادمین، این مسیر غیرفعال یا محافظت شود
export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "کاربر قبلاً وجود دارد" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // ثبت کاربر با نقش ادمین
    const admin = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'admin', 
    });

    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      role: admin.role,
      token: generateToken(admin._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    
    // ۱. بررسی وجود کاربر
    if (!user) {
      return res.status(400).json({ message: "ایمیل یا رمز اشتباه است" });
    }

    // ۲. بررسی ادمین بودن (امنیت)
    if (user.role !== 'admin') {
      return res.status(403).json({ message: "دسترسی غیرمجاز: شما ادمین نیستید" });
    }

    // ۳. بررسی رمز
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "ایمیل یا رمز اشتباه است" });
    }

    res.json({
      _id: user._id,
      name: user.name,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
