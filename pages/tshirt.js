import React from "react";
import Link from "next/link";
import Product from "@/models/Product";
import mongoose from "mongoose";

const Tshirt = ({ products }) => {
  // console.log("Products in component:", products);
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 justify-center">
          {products.length === 0 && <p>Sorry all the tshirts are out of stock .New stock coming soon !<b> Stay Tuned</b></p>}

            {products.map((product) => (
              <div
                key={product._id}
                className="lg:w-1/4 md:w-1/2 p-4 w-full shadow-md m-3"
              >
                <Link href={`/products/${product.slug}`} passHref className="block relative rounded overflow-hidden">
                  
                    <img
                      alt={product.title}
                      className="m-auto h-[30vh] md:h-[36vh] block"
                      src={product.img}
                    />
                  
                </Link>
                <div className="mt-4 text-center md:text-left">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                  T-shirts
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

    const products = await Product.find({ category: "tshirt" });
    console.log("Fetched products:", products);


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

export default Tshirt;
