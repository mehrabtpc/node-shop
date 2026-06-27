import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true
    },
    short_description: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    base_price: {
      type: Number,
      required: true,
      min: 0
    },
    discount: {
      type: Number,
      default: 0,
      min: 0
    },
    discount_type: {
      type: String,
      enum: ["percentage", "flat"],
      default: "percentage"
    },
    discount_until: {
      type: Date,
      default: null
    },
    inventory: {
      type: Number,
      default: 0,
      min: 0,
      index: true
    },
    is_in_stock: {
      type: Boolean,
      default: true,
      index: true
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        index: true
      }
    ],
    main_image: {
      type: String,
      required: true
    },
    images: [
      {
        type: String
      }
    ],
    attributes: [
      {
        title: {
          type: String,
          required: true,
          trim: true
        },
        value: {
          type: String,
          required: true,
          trim: true
        }
      }
    ],
    status: {
      type: String,
      enum: ["available", "out_of_stock", "discontinued", "draft"],
      default: "draft",
      index: true
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
      index: true
    },
    num_reviews: {
      type: Number,
      default: 0
    },
    sold_count: {
      type: Number,
      default: 0,
      index: true
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      index: true
    },
    tags: [
      {
        type: String,
        trim: true
      }
    ]
  },
  {
    timestamps: true
  }
);

productSchema.index({ name: "text", description: "text", short_description: "text" });
productSchema.index({ "attributes.title": 1, "attributes.value": 1 });

const Product = mongoose.model("Product", productSchema);

export default Product;
