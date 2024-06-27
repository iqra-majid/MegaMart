const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  products: [
    {
      productId: { type: String },
      quantity: { type: number, default: 1 },
    },
  ],
  address: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: pending,
  },
},{timestamps:true});
mongoose.model={}

export default mongoose.model("Order",orderSchema);
