import Product from "@/models/Product";
import connectDb from "@/middleware/mongoose";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      // console.log("Fetching products...");
      const products = await Product.find({});
      // console.log("Products fetched successfully:", products);

      // Simplify the logic to directly return the products
      res.status(200).json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Failed to fetch products" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default connectDb(handler);
