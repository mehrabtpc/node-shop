import mongoose from "mongoose";

const attributeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true }, // مثلاً: "رنگ" یا "سایز" یا "حافظه"
    type: { 
      type: String, 
      enum: ["text", "color", "number"], 
      default: "text" 
    },
    status: { type: String, enum: ["active", "inactive"], default: "active" }
  },
  { timestamps: true }
);

const Attribute = mongoose.model("Attribute", attributeSchema);
export default Attribute;
