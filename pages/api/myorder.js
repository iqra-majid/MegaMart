import connectDb from "@/middleware/mongoose";
import Order from "@/models/Order";
import jwt from "jsonwebtoken";

const handler = async (req, res) => {
  const token = req.body.token;
  const data = jwt.verify(token, process.env.JWT_KEY);

  let orders = await Order.find({ email: data.email,status:'paid' });
  res.status(200).json({ orders });
};

export default connectDb(handler);
