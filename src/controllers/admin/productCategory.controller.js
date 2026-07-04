import Category from "../../models/category.model.js";

export const index = async (req, res) => {
  try {
    const { status, parent, search, page = 1, limit = 10 } = req.query;

    const filter = {};

    if (status) {
      filter.status = status;
    }

    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    if (parent === "null") {
      filter.parent = null;
    } else if (parent) {
      filter.parent = parent;
    }

    const skip = (Number(page) - 1) * Number(limit);

    const total = await Category.countDocuments(filter);

    const categories = await Category.find(filter)
      .populate("parent", "name slug")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.json({
      message: "لیست دسته‌بندی محصولات",
      data: categories,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "خطا در دریافت دسته‌بندی‌ها",
      error: error.message
    });
  }
};

export const store = async (req, res) => {
  try {
    const { name, slug, parent, image, status } = req.body;

    if (parent) {
      const parentCategory = await Category.findById(parent);
      if (!parentCategory) {
        return res.status(404).json({
          message: "دسته‌بندی والد پیدا نشد"
        });
      }
    }

    const category = await Category.create({
      name,
      slug,
      parent: parent || null,
      image,
      status
    });

    res.status(201).json({
      message: "دسته‌بندی با موفقیت ایجاد شد",
      data: category
    });
  } catch (error) {
    res.status(500).json({
      message: "خطا در ایجاد دسته‌بندی",
      error: error.message
    });
  }
};

export const show = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate("parent", "name slug");

    if (!category) {
      return res.status(404).json({
        message: "دسته‌بندی پیدا نشد"
      });
    }

    res.json({
      message: "جزئیات دسته‌بندی",
      data: category
    });
  } catch (error) {
    res.status(500).json({
      message: "خطا در دریافت دسته‌بندی",
      error: error.message
    });
  }
};

export const update = async (req, res) => {
  try {
    const { name, slug, parent, image, status } = req.body;

    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "دسته‌بندی پیدا نشد"
      });
    }

    if (parent) {
      if (parent === req.params.id) {
        return res.status(400).json({
          message: "دسته‌بندی نمی‌تواند والد خودش باشد"
        });
      }

      const parentCategory = await Category.findById(parent);
      if (!parentCategory) {
        return res.status(404).json({
          message: "دسته‌بندی والد پیدا نشد"
        });
      }
    }

    if (name !== undefined) category.name = name;
    if (slug !== undefined) category.slug = slug;
    if (parent !== undefined) category.parent = parent || null;
    if (image !== undefined) category.image = image;
    if (status !== undefined) category.status = status;

    await category.save();

    res.json({
      message: "دسته‌بندی با موفقیت بروزرسانی شد",
      data: category
    });
  } catch (error) {
    res.status(500).json({
      message: "خطا در بروزرسانی دسته‌بندی",
      error: error.message
    });
  }
};

export const destroy = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "دسته‌بندی پیدا نشد"
      });
    }

    const children = await Category.findOne({ parent: category._id });

    if (children) {
      return res.status(400).json({
        message: "این دسته‌بندی دارای زیر‌دسته است و قابل حذف نیست"
      });
    }

    await category.deleteOne();

    res.json({
      message: "دسته‌بندی با موفقیت حذف شد"
    });
  } catch (error) {
    res.status(500).json({
      message: "خطا در حذف دسته‌بندی",
      error: error.message
    });
  }
};
