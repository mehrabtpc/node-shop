import mongoose from "mongoose";

const postCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, index: true },
    status: { type: String, enum: ["active", "inactive"], default: "active", index: true }
  },
  { timestamps: true }
);

const PostCategory = mongoose.model("PostCategory", postCategorySchema);
export default PostCategory;
