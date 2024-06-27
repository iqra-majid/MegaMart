import connectDb from "@/middleware/mongoose";
import Product from "@/models/Product";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      // Loop through req.body assuming it's an array of products
      for (let i = 0; i < req.body.length; i++) {
        // Update each product by its ID
        await Product.findByIdAndUpdate(req.body[i]._id, req.body[i], { new: true });
      }
      res.status(200).json({ success: "Products updated successfully" });
    } catch (error) {
      console.log("Error updating products:");
      res.status(500).json({ error: "Failed to update products" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default connectDb(handler);
