import PostCategory from "../../models/postCategory.model.js";

export const index = async (req, res) => {
  try {
    const categories = await PostCategory.find().sort({ createdAt: -1 });
    res.json({ message: "لیست دسته‌بندی‌ها", data: categories });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const store = async (req, res) => {
  try {
    const category = await PostCategory.create(req.body);
    res.status(201).json({ message: "دسته‌بندی ایجاد شد", data: category });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const show = async (req, res) => {
  try {
    const category = await PostCategory.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "دسته‌بندی پیدا نشد" });
    res.json({ message: "جزئیات دسته‌بندی", data: category });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const category = await PostCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!category) return res.status(404).json({ message: "دسته‌بندی پیدا نشد" });
    res.json({ message: "بروزرسانی انجام شد", data: category });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const destroy = async (req, res) => {
  try {
    const category = await PostCategory.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ message: "دسته‌بندی پیدا نشد" });
    res.json({ message: "دسته‌بندی حذف شد" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
