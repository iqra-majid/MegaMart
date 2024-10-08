
import connectDb from "@/middleware/mongoose";
import Product from "@/models/Product";
import upload from "@/middleware/upload"; // Ensure this is correctly set up to handle file uploads

export const config = {
  api: {
    bodyParser: false, // Disable bodyParser to allow multer to handle form data
  },
};

// Create an API route handler
const handler = async (req, res) => {
  if (req.method === "POST") {
    // Use the upload middleware to handle file upload
    upload.single('image')(req, res, async (err) => {
      if (err) {
        console.error("Error uploading file:", err);
        return res.status(500).json({ error: "File upload failed" });
      }

      // Extract file and other form data
      const { file } = req;
      const { title, slug, desc, type, price, availableQty } = req.body;

      // Build product data
      const productData = {
        title,
        slug,
        desc,
        img: req.file ? `/uploads/${req.file.filename}` : '',
        category: type,
        price,
        availableQty: availableQty || 0, // Default to 0 if not provided
      };

      try {
        // Create and save product
        const product = new Product(productData);
        await product.save();
        res.status(200).json({ success: "Product saved successfully" });
      } catch (error) {
        console.error("Error saving product:", error);
        res.status(500).json({ error: "Failed to save product" });
      }
    });
  } else {
    res.status(400).json({ error: "Method not allowed" });
  }
};

export default connectDb(handler);





