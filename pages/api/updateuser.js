import User from "@/models/User";
import connectDb from "@/middleware/mongoose";
import jwt from "jsonwebtoken";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const {  name, address, phone, pincode } = req.body;
    let token = req.body.token;
    let user = jwt.verify(token, process.env.JWT_KEY);
    let dbuser = await User.findOneAndUpdate(
        { email: user.email },
        { name, address, phone, pincode }
    );
    res.status(200).json({success:true });
  } else {
    res.status(400).json({ error: "error" });
  }
};

export default connectDb(handler);
