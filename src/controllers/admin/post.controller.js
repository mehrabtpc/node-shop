import Post from "../../models/post.model.js";

export const index = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "name email")
      .populate("category", "name slug")
      .sort({ createdAt: -1 });

    res.json({ message: "لیست پست‌ها", data: posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const store = async (req, res) => {
  try {
    const post = await Post.create({
      ...req.body,
      author: req.user._id
    });

    res.status(201).json({ message: "پست ایجاد شد", data: post });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const show = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("author", "name email")
      .populate("category", "name slug");

    if (!post) return res.status(404).json({ message: "پست پیدا نشد" });

    res.json({ message: "جزئیات پست", data: post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!post) return res.status(404).json({ message: "پست پیدا نشد" });

    res.json({ message: "پست بروزرسانی شد", data: post });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const destroy = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) return res.status(404).json({ message: "پست پیدا نشد" });

    res.json({ message: "پست حذف شد" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
