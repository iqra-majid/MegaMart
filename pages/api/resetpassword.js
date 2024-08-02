import User from "@/models/User";
import connectDb from "@/middleware/mongoose";
import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { token, newPassword } = req.body;
    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      const email = decoded.email;

      // Update the user's password in the database
      const encryptedPassword = CryptoJS.AES.encrypt(
        newPassword,
        process.env.AES_SECRET
      ).toString();
      await User.findOneAndUpdate({ email }, { password: encryptedPassword });
      res.status(200).json({ success: true, message: "Password reset successfully." });
    } catch (error) {
        res.status(400).json({ error: "Invalid or expired token." });
    }
  }else {
    res.status(400).json({ error: "Bad Request" });
  }
};

export default connectDb(handler);
