import Story from "../../models/story.model.js";

export const index = async (req, res) => {
  try {
    const { status, search, page = 1, limit = 10 } = req.query;

    const filter = {};

    if (status) {
      filter.status = status;
    }

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    const skip = (Number(page) - 1) * Number(limit);

    const total = await Story.countDocuments(filter);
    const stories = await Story.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.json({
      message: "لیست استوری‌ها",
      data: stories,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "خطا در دریافت لیست استوری‌ها",
      error: error.message
    });
  }
};

export const store = async (req, res) => {
  try {
    const { title, image, link, expires_at, status } = req.body;

    const story = await Story.create({
      title,
      image,
      link,
      expires_at,
      status
    });

    res.status(201).json({
      message: "استوری با موفقیت ایجاد شد",
      data: story
    });
  } catch (error) {
    res.status(500).json({
      message: "خطا در ایجاد استوری",
      error: error.message
    });
  }
};

export const show = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);

    if (!story) {
      return res.status(404).json({
        message: "استوری پیدا نشد"
      });
    }

    res.json({
      message: "جزئیات استوری",
      data: story
    });
  } catch (error) {
    res.status(500).json({
      message: "خطا در دریافت استوری",
      error: error.message
    });
  }
};

export const update = async (req, res) => {
  try {
    const { title, image, link, expires_at, status } = req.body;

    const story = await Story.findById(req.params.id);

    if (!story) {
      return res.status(404).json({
        message: "استوری پیدا نشد"
      });
    }

    if (title !== undefined) story.title = title;
    if (image !== undefined) story.image = image;
    if (link !== undefined) story.link = link;
    if (expires_at !== undefined) story.expires_at = expires_at;
    if (status !== undefined) story.status = status;

    await story.save();

    res.json({
      message: "استوری با موفقیت بروزرسانی شد",
      data: story
    });
  } catch (error) {
    res.status(500).json({
      message: "خطا در بروزرسانی استوری",
      error: error.message
    });
  }
};

export const destroy = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);

    if (!story) {
      return res.status(404).json({
        message: "استوری پیدا نشد"
      });
    }

    await story.deleteOne();

    res.json({
      message: "استوری با موفقیت حذف شد"
    });
  } catch (error) {
    res.status(500).json({
      message: "خطا در حذف استوری",
      error: error.message
    });
  }
};
