import mongoose from 'mongoose';

// Define the main Product schema without variants
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    availableQty: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

// Check if the model is already registered to avoid re-compiling error in development
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
