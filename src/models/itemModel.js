import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    description: {
      type: String,
      required: true,
      min: 3,
    },
    price: {
      type: String,
      min: 3,
      required: true,
    },
    category: {
      type: String,
      required: true,
      min: 3,
    },
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", itemSchema);

export default Item;
