import React, { useState } from "react";
import Layout from "../../components/Layout";
import styles from "../../styles/AddProduct.module.css";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";

const Add = () => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [slug, setSlug] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [availableQty, setAvailableQty] = useState("");

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
      setImage(e.target.files[0]);
    } else if (e.target.name == "availableQty") {
      setAvailableQty(e.target.value);
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    // Create a FormData object
    const formData = new FormData();
    formData.append("title", title);
    formData.append("type", type);
    formData.append("slug", slug);
    formData.append("desc", desc);
    formData.append("price", price);
    formData.append("availableQty", availableQty);
    // Append the image file if it exists
    if (image) {
      formData.append("image", image);
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/addproducts`,
        {
          method: "POST",

          body: formData,
        }
      );

      const response = await res.json();
      console.log(response);
      if (res.ok) {
        toast.success("🦄 Your product saved successfully!", {
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
        setType("");
        setSlug("");
        setTitle("");
        setImage("");
        setPrice("");
      } else {
        toast.error("Failed to save products", {
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
        <title>Add product - MegaMart</title>
      </Head>
      <div className={styles.formContainer}>
        <h1 className="font-bold text-2xl py-7 px-9 text-center">
          Add New Product
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
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleChange}
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
            Add Product
          </button>
        </form>
      </div>

      {/* </Layout> */}
    </div>
  );
};

export default Add;
