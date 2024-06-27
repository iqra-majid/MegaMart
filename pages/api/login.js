// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDb from "@/middleware/mongoose";
import User from "@/models/User";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

const secretKey = process.env.SECRET_KEY || "your-secret-key";
const jwtKey = process.env.JWT_KEY || "secret-key123";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      let user = await User.findOne({ email: req.body.email });
      const bytes = CryptoJS.AES.decrypt(user.password, secretKey);
      let decryptPass = bytes.toString(CryptoJS.enc.Utf8);
      console.log(decryptPass);
      if (user) {
        if (req.body.email == user.email && req.body.password == decryptPass) {
          let token = jwt.sign({ email: user.email, name: user.name }, jwtKey,{ expiresIn: '2d' });

          res.status(200).json({ success:true ,token });
        } else {
          res
            .status(400)
            .json({ success: false, error: "Invalid credentials" });
        }
      } else {
        res.status(400).json({ success: false, error: "User not found" });
      }
    } catch (error) {
      console.error("Error :", error);
      res.status(500).json({ error: "Failed to login" });
    }
  } else {
    res.status(400).json({ error: "Method not allowed" });
  }
};

export default connectDb(handler);
