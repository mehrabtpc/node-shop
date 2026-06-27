import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
      index: true
    },
    image: {
      type: String,
      default: null
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
      index: true
    }
  },
  {
    timestamps: true
  }
);

categorySchema.index({ name: 1, parent: 1 }, { unique: true });

const Category = mongoose.model("Category", categorySchema);

export default Category;
