// pages/api/create-payment-intent.js

import connectDb from "@/middleware/mongoose";
import Order from "@/models/Order";
import Product from "@/models/Product";
import pincodes from "../../pincodes.json";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const {
      email,
      name,
      oid,
      cart,
      address,
      city,
      state,
      pincode,
      phone,
      subTotal,
    } = req.body;

    let product,
      sumTotal = 0;

    if (subTotal <= 0) {
      return res.status(200).json({
        success: false,
        error: "Cart empty! Please build your cart and try again",
      });
    }

    // Check if the items are out of stock

    for (let item in cart) {
      product = await Product.findOne({ slug: item });
      if (product.availableQty < cart[item].qty) {
        res.status(200).json({
          success: false,
          error: "Some items in your cart went out of stock !",
        });
      }

      // Check if the pincode is serviceable
      if (!Object.keys(pincodes).includes(req.body.pincode)) {
        return res.status(200).json({
          success: false,
          error: "The pincode you have entered is not serviceable !",
        });
      }

      // Check if there is cart tempering
      if (!product || product.price != cart[item].price) {
        return res.status(200).json({
          success: false,
          error: "The price of some items from the cart have changed !",
        });
      }
      sumTotal += cart[item].price * cart[item].qty;
    }

    if (sumTotal !== subTotal) {
      return res.status(200).json({
        success: false,
        error: "The price of some items from the cart have changed",
      });
    }

    // Check if the details are valid
    // || !Number.isInteger(phone)

    if (phone.length !== 11 || !Number.isInteger(Number(phone))) {
      return res.status(200).json({
        success: false,
        error: "Please enter your 11 digit phone number",
      });
    }

    if (pincode.length !== 4 || !Number.isInteger(Number(pincode))) {
      return res.status(200).json({
        success: false,
        error: "Please enter your 4 digit pincode",
      });
    }

    // intiate a order corresponding to this order id
    // Transform the cart object into an array of product objects
    const products = Object.keys(cart).map((key) => ({
      productId: key, // Use the key as productId
      name: cart[key].name, // Include product name
      price: cart[key].price, // Include product price
      quantity: cart[key].qty, // Include product quantity
    }));

    // Create a new order
    let order = new Order({
      email: email,
      name: name,
      orderId: oid,
      products: products,
      address: address,
      city: city,
      state: state,
      amount: subTotal,
      phone: phone,
      pincode:pincode
    });
    // console.log("Order to save:", order);
    await order.save();

    try {
      const { subTotal } = req.body;
      // Mock response similar to what a real payment gateway would return
      const mockClientSecret = "mock_client_secret_" + subTotal;
      res.status(200).json({ clientSecret: mockClientSecret, success: true });
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};

export default connectDb(handler);
