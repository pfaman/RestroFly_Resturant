import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Category is required"],
    },
    imageUrl: {
      type: String,
      default: "https://picsum.photos/400/200?random=1",
    },
  },
  {
    timestamps: true,
  }
);

export const Category = mongoose.model("Category",categorySchema);