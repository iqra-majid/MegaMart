import User from "@/models/User";
import connectDb from "@/middleware/mongoose";
import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      let token = req.body.token;
      let user = jwt.verify(token, process.env.JWT_KEY);
      let dbuser = await User.findOne({ email: user.email });
      const bytes = CryptoJS.AES.decrypt(dbuser.password, process.env.AES_SECRET);
      let decryptedPass = bytes.toString(CryptoJS.enc.Utf8);

      if (decryptedPass === req.body.password && req.body.npassword === req.body.cpassword) {
        dbuser.password = CryptoJS.AES.encrypt(req.body.npassword, process.env.AES_SECRET).toString();
        await dbuser.save();
        return res.status(200).json({ success: true });
      } else {
        return res.status(400).json({ success: false, error: "Passwords do not match or incorrect current password" });
      }
    } catch (error) {
      console.error("Server error:", error);
      return res.status(500).json({ success: false, error: "Server error" });
    }
  } else {
    res.status(400).json({ success: false, error: "Invalid request method" });
  }
};

export default connectDb(handler);
