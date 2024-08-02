import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Order from "@/models/Order";
import mongoose from "mongoose";
import Head from "next/head";

const MyOrder = ({ order }) => {
  let products = order.products;
  const router = useRouter();
  const [date, setDate] = useState();
  useEffect(() => {
    const d = new Date(order.createdAt);
    setDate(d)
  }, [order]);

  return (
    <div>
      <Head>
      <title>Order Details - MegaMart</title>
    </Head>
      <section className="text-gray-600 body-font overflow-hidden min-h-screen">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                BRAND NAME
              </h2>
              <h1 className="text-gray-900  text-xl md:text-3xl title-font font-medium mb-4">
                Order ID : #{order.orderId}
              </h1>
              <div className="leading-relaxed mb-4">
                Your order has been successfully placed!
                <br />
                Order placed on : {date && date.toLocaleDateString('en-IN',{weekday:'long',year:'numeric',month:'long',day:'numeric'})}
                <br />
                Your payment status is: <b>{order.status}</b>
              </div>

              <div className="flex mb-4">
                <a className="flex-grow text-center py-2 text-lg px-1">
                  Item description
                </a>
                <a className="flex-grow text-center border-gray-300 py-2 text-lg px-1">
                  Quantity
                </a>
                <a className="flex-grow text-center border-gray-300 py-2 text-lg px-1">
                  Item total
                </a>
              </div>

              {Object.keys(products).map((key) => (
                <div className="flex border-t border-gray-200 py-2" key={key}>
                  <span className="text-gray-500">{products[key].name}</span>
                  <span className="m-auto text-gray-900">
                    {products[key].quantity}
                  </span>
                  <span className="m-auto text-gray-900">
                    {products[key].price} X {products[key].quantity} =  {products[key].price * products[key].quantity}
                  </span>
                </div>
              ))}

              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">
                  SubTotal: ${order.amount}
                </span>
                <button className="flex ml-auto text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">
                  Track order
                </button>
              </div>
            </div>
            {/* <Image
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src="https://dummyimage.com/400x400"
              width={400} // specify the width
              height={400} // specify the height
            /> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export async function getServerSideProps(context) {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } else {
    console.log("MongoDB already connected");
  }

  // Convert the string id to a MongoDB ObjectId
  const { id } = context.query;

  // Check if the id is a valid ObjectId
  const isValidObjectId = mongoose.Types.ObjectId.isValid(id);

  let order;

  if (isValidObjectId) {
    order = await Order.findById(id);
  } else {
    order = await Order.findOne({ orderId: id });
  }

  return {
    props: {
      order: JSON.parse(JSON.stringify(order)),
    },
  };
}

export default MyOrder;
