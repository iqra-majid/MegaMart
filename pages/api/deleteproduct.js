import connectDb from "@/middleware/mongoose";
import Product from "@/models/Product";

const handler = async (req, res) => {
  if (req.method === "DELETE") {
    try {
      const { id } = req.query; // Get the product ID from the query parameters

      // Delete the product by its ID
      const deletedProduct = await Product.findByIdAndDelete(id);

      if (deletedProduct) {
        res.status(200).json({ success: "Product deleted successfully" });
      } else {
        res.status(404).json({ error: "Product not found" });
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ error: "Failed to delete product" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default connectDb(handler);
