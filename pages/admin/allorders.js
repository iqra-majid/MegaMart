import React from 'react'
import Layout from '../../components/Layout';
import styles from '../../styles/ProductList.module.css';
import Order from "@/models/Order";
import mongoose from "mongoose";
import Head from "next/head";

const Allorders = ({orders}) => {
  return (
    <div>
      <Head>
<title>All orders - MegaMart</title>
      </Head>
      {/* <Layout> */}
      <div className={styles.container}>
      <h1 className="font-bold text-2xl py-7 px-9 text-center text-gray-600">Orders</h1>
      <table className={styles.styledTable}>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Status</th>
            <th>Email</th>
            <th>Address</th>
            
          </tr>
        </thead>
        <tbody>
          

        {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.orderId}</td>
                <td>{order.status}</td>
                <td>${order.email}</td>
                <td>{order.address}</td>
              </tr>
            ))}

        </tbody>
      </table>
    </div>
     {/* </Layout> */}
    </div>
  )
}

export default Allorders

export async function getServerSideProps(context) {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("MongoDB connected");
    } else {
      console.log("MongoDB already connected");
    }

    const orders = await Order.find();
    // console.log("Fetched products:", products);

    return {
      props: {
        orders: JSON.parse(JSON.stringify(orders)),
      },
    };
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}