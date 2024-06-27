// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDb from "@/middleware/mongoose";
import User from "@/models/User";
import CryptoJS from "crypto-js";
const secretKey = process.env.SECRET_KEY || "your-secret-key";
const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      //   console.log(req.body);

      const { name, email } = req.body;
      let u = new User({
        name,
        email,
        password: CryptoJS.AES.encrypt(req.body.password, secretKey).toString(),
      });
      await u.save();

      res.status(200).json({ success: "success" });
    } catch (error) {
      console.error("Error :", error);
      res.status(500).json({ error: "Failed" });
    }
  } else {
    res.status(400).json({ error: "Method not allowed" });
  }
};

export default connectDb(handler);
