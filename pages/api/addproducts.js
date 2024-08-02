// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
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




// import connectDb from "@/middleware/mongoose";
// import Product from "@/models/Product";
// import upload from "@/middleware/upload";

// export const config = {
//   api: {
//     bodyParser: false, // Disable bodyParser to allow multer to handle form data
//   },
// };

// const handler = async (req, res) => {
//   if (req.method === "POST") {
//     try {

//       const productData = req.body;
      
//       const product = new Product({
//         title: productData.title,
//         slug: productData.slug,
//         desc: productData.desc,
//         img: productData.image,
//         category: productData.type,
//         price: productData.price,
//         availableQty: productData.availableQty || 0, // Default to 0 if not provided
//       });
//         await product.save();
     
//       res.status(200).json({ success: "Products saved successfully" });
//     } catch (error) {
//       console.error("Error saving products:", error);
//       res.status(500).json({ error: "Failed to save products" });
//     }
//   } else {
//     res.status(400).json({ error: "Method not allowed" });
//   }
// };

// export default connectDb(handler);
