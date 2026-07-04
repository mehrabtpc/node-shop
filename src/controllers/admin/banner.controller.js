import Banner from "../../models/banner.model.js";

export const index = async (req, res) => {
  try {
    const { status, position, search, page = 1, limit = 10 } = req.query;

    const filter = {};

    if (status) {
      filter.status = status;
    }

    if (position) {
      filter.position = position;
    }

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    const skip = (Number(page) - 1) * Number(limit);

    const total = await Banner.countDocuments(filter);
    const banners = await Banner.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.json({
      message: "لیست بنرها",
      data: banners,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "خطا در دریافت لیست بنرها",
      error: error.message
    });
  }
};

export const store = async (req, res) => {
  try {
    const { title, image, link, position, status } = req.body;

    const banner = await Banner.create({
      title,
      image,
      link,
      position,
      status
    });

    res.status(201).json({
      message: "بنر با موفقیت ایجاد شد",
      data: banner
    });
  } catch (error) {
    res.status(500).json({
      message: "خطا در ایجاد بنر",
      error: error.message
    });
  }
};

export const show = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({
        message: "بنر پیدا نشد"
      });
    }

    res.json({
      message: "جزئیات بنر",
      data: banner
    });
  } catch (error) {
    res.status(500).json({
      message: "خطا در دریافت بنر",
      error: error.message
    });
  }
};

export const update = async (req, res) => {
  try {
    const { title, image, link, position, status } = req.body;

    const banner = await Banner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({
        message: "بنر پیدا نشد"
      });
    }

    if (title !== undefined) banner.title = title;
    if (image !== undefined) banner.image = image;
    if (link !== undefined) banner.link = link;
    if (position !== undefined) banner.position = position;
    if (status !== undefined) banner.status = status;

    await banner.save();

    res.json({
      message: "بنر با موفقیت بروزرسانی شد",
      data: banner
    });
  } catch (error) {
    res.status(500).json({
      message: "خطا در بروزرسانی بنر",
      error: error.message
    });
  }
};

export const destroy = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({
        message: "بنر پیدا نشد"
      });
    }

    await banner.deleteOne();

    res.json({
      message: "بنر با موفقیت حذف شد"
    });
  } catch (error) {
    res.status(500).json({
      message: "خطا در حذف بنر",
      error: error.message
    });
  }
};
