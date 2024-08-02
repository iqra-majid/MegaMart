import React, { useState, useEffect } from "react";
// import Layout from "../../components/Layout";
import styles from "../../../styles/AddProduct.module.css";
import Head from "next/head";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Product from "@/models/Product";
import mongoose from "mongoose";

const Edit = ({ product }) => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [slug, setSlug] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [availableQty, setAvailableQty] = useState("");

  const {_id} = product

  useEffect(() => {
    // console.log(title, type, slug, desc, price, image, availableQty);
  }, []);

  
  const handleChange = async (e) => {
    if (e.target.name == "title") {
      setTitle(e.target.value);
    } else if (e.target.name == "type") {
      setType(e.target.value);
    } else if (e.target.name == "slug") {
      setSlug(e.target.value);
    } else if (e.target.name === "desc") {
      setDesc(e.target.value);
    } else if (e.target.name == "price") {
      setPrice(e.target.value);
    } else if (e.target.name == "image") {
      setImage(e.target.value);
    } else if (e.target.name == "availableQty") {
      setAvailableQty(e.target.value);
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const data = { title, type, slug, desc, price, image, availableQty ,_id};
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/updateproducts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const response = await res.json();
      console.log(response);

      if (res.ok) {
        toast.success("🦄 Your product edit successfully!", {
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

        setAvailableQty("");
        setDesc("");
        setType('');
        setSlug('');
        setTitle('');
        setImage('');
        setPrice('')
      } else {
        alert(form);
        toast.error("Failed to edit product !", {
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
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while adding the product");
    }
  };
  return (
    <div>
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
      <Head>
        <title>Edit product - MegaMart</title>
      </Head>
      <div className={styles.formContainer}>
        <h1 className="font-bold text-2xl py-7 px-9 text-center">
          Edit Product
        </h1>
        <form className={styles.form} encType="multipart/form-data">
          <div className={styles.formGroup}>
            <label htmlFor="title">Product Title</label>
            <input
              onChange={handleChange}
              value={title}
              type="text"
              id="title"
              name="title"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="name">Type</label>
            <input
              onChange={handleChange}
              value={type}
              type="text"
              id="type"
              name="type"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="name">Slug</label>
            <input
              onChange={handleChange}
              value={slug}
              type="text"
              id="slug"
              name="slug"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="desc">Description</label>
            <textarea
              id="desc"
              name="desc"
              rows="4"
              required
              onChange={handleChange}
              value={desc}
            ></textarea>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="price">Price</label>
            <input
              onChange={handleChange}
              value={price}
              type="number"
              id="price"
              name="price"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="image">Image </label>
            <input
              onChange={handleChange}
              value={image}
              type="file"
              id="image"
              name="image"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="availableQty">available Quantity </label>
            <input
              onChange={handleChange}
              value={availableQty}
              type="text"
              id="availableQty"
              name="availableQty"
              required
            />
          </div>
          <button
            onClick={submitForm}
            type="submit"
            className={styles.addProductButton}
          >
            Edit Product
          </button>
        </form>
      </div>

      {/* </Layout> */}
    </div>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("MongoDB connected ");
    // Use try-catch block to handle potential connection errors
  }

  const product = await Product.findOne({ _id: context.query.id });

  let error = null;
  if (product == null) {
    return {
      props: {
        error: 404,
      }, // will be passed to the page component as props
    };
  }

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    }, // will be passed to the page component as props
  };
}

export default Edit;
