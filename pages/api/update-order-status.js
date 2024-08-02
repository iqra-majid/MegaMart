
import connectDb from "@/middleware/mongoose";
import Order from "@/models/Order";
import Product from "@/models/Product";

const handler = async (req, res) => {
    try {
        const { orderId } = req.body;
  
        // Find the order by orderId and update the status to 'paid'
        let order = await Order.findOneAndUpdate(
          { orderId: orderId },
          { status: 'paid' },
          { new: true } // Return the updated document
        );

        let products = order.products;
        // Decrease the available quantity of the products
    for (let item of products) {
      await Product.findOneAndUpdate(
        { slug: item.productId },
        { $inc: { availableQty: -item.quantity } }
      );
    }
  
        if (!order) {
          return res.status(404).json({ message: "Order not found" });
        }
  
        res.status(200).json({ message: "Order updated successfully", order });
        
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
}

export default connectDb(handler);
