import connectDb from "@/middleware/mongoose";
import Product from "@/models/Product";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
     
      let  productData = req.body; 
  
      // Update product by its ID
      const updatedProduct = await Product.findByIdAndUpdate(productData._id, productData, { new: true });

      res.status(200).json({ success: "Product updated successfully", product: updatedProduct });
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ error: "Failed to update product" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default connectDb(handler);
