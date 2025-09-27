import mongoose from "mongoose";

const OrdersSchema = mongoose.Schema(
  {
    foods: [{ type: mongoose.Schema.Types.ObjectId, ref: "Food" }],
    payment: {},
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["preparing", "prepared", "on the way", "delivered"],
      default: "preparing",
    },
  },
  { timeStamps: true }
);

export const Orders = mongoose.model("Orders", OrdersSchema);
