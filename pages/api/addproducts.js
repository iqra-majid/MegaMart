// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDb from "@/middleware/mongoose";
import Product from "@/models/Product";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      
      // Loop through req.body assuming it's an array of products
      for (let i = 0; i < req.body.length; i++) {
        const product = new Product({
          title: req.body[i].title,
          slug: req.body[i].slug,
          desc: req.body[i].desc,
          img: req.body[i].img,
          category: req.body[i].category,
          price: req.body[i].price,
          availableQty: req.body[i].availableQty, // Removed variants, added availableQty
        });
        await product.save();
      }
      res.status(200).json({ success: "Products saved successfully" });
    } catch (error) {
      console.error("Error saving products:", error);
      res.status(500).json({ error: "Failed to save products" });
    }
  } else {
    res.status(400).json({ error: "Method not allowed" });
  }
};

export default connectDb(handler);
