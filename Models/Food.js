import mongoose from 'mongoose';

const foodSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Food title is required"],
    },
    description: {
      type: String,
      required: [true, "Food description is required"],
    },
    price: {
      type: Number,
      required: [true, "Food price is required"],
    },
    imageUrl: {
      type: String,
      default: "https://picsum.photos/400/200?random=1",
    },
    foodTags: {
      type: String,
    },
    category: {
      type: String,
    },
    code: {
      type: String,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    restaurant: {
      type: mongoose.Schema.ObjectId,
      ref: "Restaurant",
    },
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },
    ratingCount: {
      type: String,
    },
  },
  { timeStamps: true }
);


export const Food = mongoose.model("Food",foodSchema);

