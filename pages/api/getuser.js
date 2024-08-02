import User from "@/models/User";
import connectDb from "@/middleware/mongoose";
import jwt from "jsonwebtoken";

const handler = async (req, res) => {
  if (req.method === "POST") {
    let token = req.body.token;
    let user = jwt.verify(token, process.env.JWT_KEY);
    let dbuser = await User.findOne({ email: user.email });
    const { name, email, address, pincode ,phone} = dbuser;
    res.status(200).json({success:true, name, email, address, pincode ,phone});
  } else {
    res.status(400).json({ error: "error" });
  }
};

export default connectDb(handler);
