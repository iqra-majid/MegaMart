import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    orderId: {
      type: String,
      required: true,
    },
    paymentInfo: {
      type: String,
      default: "",
    },
    products: [
      {
        productId: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, default: 1 },
      },
    ],
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    phone: {
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
      default: "initiated", // Enclose the string in quotes
    },
    deliveryStatus: {
      type: String,
      required: true,
      default: "unshipped", // Enclose the string in quotes
    },
  },
  { timestamps: true }
);

// Use mongoose.models to check if the model already exists
const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
