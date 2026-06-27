import mongoose from "mongoose";

const storySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    link: { type: String, default: null }, // لینک مستقیم به محصول داخل استوری
    expires_at: { type: Date, default: null }, // تاریخ انقضای استوری
    status: { type: String, enum: ["active", "inactive"], default: "active", index: true }
  },
  { timestamps: true }
);

const Story = mongoose.model("Story", storySchema);
export default Story;
