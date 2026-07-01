import User from "../../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
};

export const registerCustomer = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "کاربر قبلاً ثبت شده است"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const customer = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role: "customer"
    });

    res.status(201).json({
      message: "ثبت‌نام با موفقیت انجام شد",
      data: {
        _id: customer._id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        role: customer.role,
        token: generateToken(customer._id)
      }
    });

  } catch (error) {
    res.status(500).json({
      message: "خطا در ثبت‌نام",
      error: error.message
    });
  }
};

export const loginCustomer = async (req, res) => {
  try {
    const { email, password } = req.body;

    const customer = await User.findOne({ email });

    if (!customer) {
      return res.status(400).json({
        message: "ایمیل یا رمز عبور اشتباه است"
      });
    }

    if (customer.role !== "customer") {
      return res.status(403).json({
        message: "دسترسی غیرمجاز"
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      customer.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "ایمیل یا رمز عبور اشتباه است"
      });
    }

    res.json({
      message: "ورود موفق",
      data: {
        _id: customer._id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        role: customer.role,
        token: generateToken(customer._id)
      }
    });

  } catch (error) {
    res.status(500).json({
      message: "خطا در ورود",
      error: error.message
    });
  }
};

export const getCustomerProfile = async (req, res) => {
  try {
    const customer = await User.findById(req.user._id)
      .select("-password");

    if (!customer) {
      return res.status(404).json({
        message: "کاربر پیدا نشد"
      });
    }

    res.json({
      message: "پروفایل کاربر",
      data: customer
    });

  } catch (error) {
    res.status(500).json({
      message: "خطا در دریافت پروفایل",
      error: error.message
    });
  }
};

export const logoutCustomer = async (req, res) => {
  try {
    res.status(200).json({
      message: "خروج با موفقیت انجام شد"
    });

  } catch (error) {
    res.status(500).json({
      message: "خطا در خروج",
      error: error.message
    });
  }
};
