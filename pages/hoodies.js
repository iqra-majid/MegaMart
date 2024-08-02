import React from "react";
import Link from "next/link";
import Product from "@/models/Product";
import mongoose from "mongoose";
import Image from "next/image";
import Head from "next/head";

const Hoodies = ({ products }) => {
  // console.log("Products in component:", products);
  return (
    <div>
       <Head>
      <title>Hoodies - MegaMart</title>
    </Head>
      <section className="text-gray-600 body-font min-h-screen mx-5">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 justify-center">
            {products.length === 0 && <p>Sorry all the hoodies are out of stock .New stock coming soon !<b> Stay Tuned</b></p>}
            {products.map((product) => (
              <div
                key={product._id}
                className="lg:w-1/4 md:w-1/2 p-4 w-full shadow-md m-3"
              >
                <Link href={`/products/${product.slug}`} passHref className="block relative rounded overflow-hidden">
                  
                <Image
                    alt={product.title}
                    className="m-auto block"
                    src={product.img}
                    width={600} // Set an appropriate width
                    height={400} // Set an appropriate height
                    layout="intrinsic" // or layout="responsive" based on your needs
                  />
                  
                </Link>
                <div className="mt-4 text-center md:text-left">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                  Hoodies
                </h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    {product.title } 
                  </h2>
                  <p className="mt-1">${product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export async function getServerSideProps(context) {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGO_URI, {
        
      });
      console.log("MongoDB connected");
    }

    const products = await Product.find({ category: "hoodies" });
    // console.log("Fetched products:", products);


    return {
      props: {
        products: JSON.parse(JSON.stringify(products)),
      },
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      props: {
        products: [],
      },
    };
  }
}

export default Hoodies;



"https://i.pinimg.com/564x/49/9a/f9/499af93b917382f59d6addba8432b6aa.jpg"
