import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import styles from "../../styles/ProductList.module.css";
import Product from "@/models/Product";
import mongoose from "mongoose";
import { useRouter } from 'next/router';
import Head from "next/head";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Allproducts = ({ products }) => {
 

  const router = useRouter();

  const handleEditClick = (id) => {
    router.push(`/admin/editproduct/${id}`); // Adjust the path to your edit product page
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        const res = await fetch(`/api/deleteproduct?id=${id}`, {
          method: "DELETE",
        });

        const data = await res.json();

        if (res.ok) {
          toast.success("🦄 Your produc deleted successfully!", {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
          // Optionally, you can refetch the product list or redirect
          router.reload(); // Reload the page to reflect changes
        } else {
          toast.error(data.error || "Failed to delete product.");
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        toast.error("An error occurred while deleting the product.");
      }
    }
  };

  return (
    <div>
      <Head>
<title>All products - MegaMart</title>
      </Head>
      {/* <Layout> */}
      <ToastContainer
        position="top-left"
        autoClose={12}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className={styles.container}>
        <h1 className="font-bold text-2xl py-7 px-9 text-center text-gray-600">
          View Products
        </h1>
        <table className={styles.styledTable}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Slug</th>
              <th>price</th>
              <th>Available quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.title}</td>
                <td>{product.slug}</td>
                <td>${product.price}</td>
                <td>{product.availableQty}</td>
                <td>
                  <button className={styles.editBtn} onClick={() => handleEditClick(product._id)}>Edit</button>
                  <button className={styles.deleteBtn} onClick={() => handleDelete(product._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* </Layout> */}
    </div>
  );
};

export default Allproducts;

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

    const products = await Product.find();
    // console.log("Fetched products:", products);

    return {
      props: {
        products: JSON.parse(JSON.stringify(products)),
      },
    };
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}
