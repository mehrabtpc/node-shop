import Product from "../models/product.model.js";
import Category from "../models/category.model.js";

export const getProducts = async (req, res) => {
  try {
    const {
      category,
      search,
      minPrice,
      maxPrice,
      page = 1,
      limit = 12
    } = req.query;

    const query = {
      status: "available"
    };

    if (search) {
      query.$text = { $search: search };
    }

    if (minPrice || maxPrice) {
      query.base_price = {};
      if (minPrice) query.base_price.$gte = Number(minPrice);
      if (maxPrice) query.base_price.$lte = Number(maxPrice);
    }

    if (category) {
      const foundCategory = await Category.findOne({ slug: category, status: "active" });
      if (foundCategory) {
        query.categories = foundCategory._id;
      }
    }

    const skip = (Number(page) - 1) * Number(limit);

    const products = await Product.find(query)
      .populate("categories", "name slug")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Product.countDocuments(query);

    res.status(200).json({
      success: true,
      data: products,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "خطا در دریافت محصولات",
      error: error.message
    });
  }
};

export const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({
      slug: req.params.slug,
      status: "available"
    })
      .populate("categories", "name slug")
      .populate("brand", "name");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "محصول پیدا نشد"
      });
    }

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "خطا در دریافت محصول",
      error: error.message
    });
  }
};

export const getRelatedProducts = async (req, res) => {
  try {
    const product = await Product.findOne({
      slug: req.params.slug,
      status: "available"
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "محصول پیدا نشد"
      });
    }

    const relatedProducts = await Product.find({
      _id: { $ne: product._id },
      categories: { $in: product.categories },
      status: "available"
    })
      .limit(8)
      .sort({ rating: -1 });

    res.status(200).json({
      success: true,
      data: relatedProducts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "خطا در دریافت محصولات مشابه",
      error: error.message
    });
  }
};
