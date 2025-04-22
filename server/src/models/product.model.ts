import mongoose, { Schema, model, Model } from "mongoose";
import { Category, IProduct } from "../types/type";

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: Object.values(Category),
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

export const Product: Model<IProduct> =
  mongoose.models.Product || model<IProduct>("Product", ProductSchema);
