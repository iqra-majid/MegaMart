// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDb from "@/middleware/mongoose";
import User from "@/models/User";
import CryptoJS from "crypto-js";
const secretKey = process.env.AES_SECRET ;

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { name, email, password, address, pincode, phone } = req.body;
      
      let u = new User({
        name,
        email,
        password: CryptoJS.AES.encrypt(password, secretKey).toString(),
        address,
        pincode,
        phone,
      });

      await u.save();
      res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error :", error);
      // Send error as JSON
      res.status(500).json({success:false, error: "Failed to sign up. Please try again later." });
    }
  } else {
    res.status(400).json({success: false, error: "Method not allowed" });
  }
};

export default connectDb(handler);
