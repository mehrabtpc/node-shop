import Category from "../models/category.model.js";
import Product from "../models/product.model.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ status: "active" }).sort({ name: 1 });

    res.status(200).json({
      success: true,
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "خطا در دریافت دسته‌بندی‌ها",
      error: error.message
    });
  }
};

export const getCategoryBySlug = async (req, res) => {
  try {
    const category = await Category.findOne({
      slug: req.params.slug,
      status: "active"
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "دسته‌بندی پیدا نشد"
      });
    }

    res.status(200).json({
      success: true,
      data: category
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "خطا در دریافت دسته‌بندی",
      error: error.message
    });
  }
};

export const getCategoryProducts = async (req, res) => {
  try {
    const category = await Category.findOne({
      slug: req.params.slug,
      status: "active"
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "دسته‌بندی پیدا نشد"
      });
    }

    const products = await Product.find({
      categories: category._id,
      status: "available"
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: {
        category,
        products
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "خطا در دریافت محصولات دسته‌بندی",
      error: error.message
    });
  }
};
