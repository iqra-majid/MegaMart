import React, { useEffect, useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { AiFillMinusCircle } from "react-icons/ai";
import { IoBagCheckSharp } from "react-icons/io5";
import Link from "next/link";
import { useRouter } from "next/router";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";

const Checkout = ({ cart, clearCart, subTotal, addToCart, removeFromCart }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let router = useRouter();

  useEffect(() => {
    // Retrieve user email and token from localStorage
    const storedEmail = localStorage.getItem("userEmail");
    const token = localStorage.getItem("token");
    if (storedEmail) {
      setEmail(storedEmail);
      setIsLoggedIn(true);
      fetchData(token);
    } else {
      setIsLoggedIn(false);
      setEmail("");
    }
  }, []);

  const fetchData = async (token) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      const res = await response.json();
      // console.log("API Response:", res);

      if (res.success) {
        setAddress(res.address || "");
        setName(res.name || "");
        setPincode(res.pincode || "");
        setPhone(res.phone || "");
        getpincode(res.pincode)

      
      } else {
        console.error("Failed to fetch user data:", res.error);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const getpincode = async (pin)=>{
    try {
      let response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/pincode`
      );
      let pinJson = await response.json();

      if (Object.keys(pinJson).includes(pin)) {
        setCity(pinJson[pin][0]);
        setState(pinJson[pin][1]);
      } else {
        setCity("");
        setState("");
      }
    } catch (error) {
      console.error("Error fetching pincode data:", error);
      // Handle error fetching data
    }
  }


  const handleChange = async (e) => {
    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "address") {
      setAddress(e.target.value);
    } else if (e.target.name === "phone") {
      setPhone(e.target.value);
    } else if (e.target.name == "pincode") {
      setPincode(e.target.value);
      if (e.target.value.length === 4) {
       getpincode(e.target.value);
      } else {
        setCity("");
        setState("");
      }
    }
  };

  // Effect to update disabled  based on form validation
  useEffect(() => {
    // console.log(state,city);
    if (
      name.trim() !== "" &&
      email.trim() !== "" &&
      address.trim() !== "" &&
      phone.trim() !== "" &&
      pincode.trim() !== ""
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [name, email, address, phone, pincode]);

  const initiatePayment = async () => {
    const oid = Math.floor(Math.random() * Date.now());
    // const data = { cart, subTotal, oid, email, name, address, pincode, phone ,city,state};
const data = {email,name,oid,cart,address,city,state,pincode,phone,subTotal}
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/create-payment-intent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to initiate payment");
      }

      setClientSecret(result.clientSecret);

      // Simulate payment confirmation
      setTimeout(async () => {
        try {
          const updateResponse = await fetch(
            `${process.env.NEXT_PUBLIC_HOST}/api/update-order-status`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ orderId: oid }),
            }
          );

          if (!updateResponse.ok) {
            throw new Error("Failed to update order status");
          }

          const updateResult = await updateResponse.json();
          // console.log("Order updated successfully:", updateResult);

          // Redirect to the order page after backend work completes
          router.push(`/order?id=${oid}`);
          clearCart();
        } catch (error) {
          console.error("Error updating order status:", error);
        }
      }, 2000);

      console.log("Payment initiated successfully");
    } catch (error) {
      // clearCart();
      toast.error(error.message, {
        position: "top-left",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      console.error("Error initiating payment:", error);
    }
  };

  return (
    <div className="min-h-screen container  text-black m-auto px-40">
      <ToastContainer
        position="top-left"
        autoClose={5000}
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
<title>Checkout - MegaMart</title>
      </Head>
      <h1 className="font-bold text-3xl  my-8 text-center ">checkout</h1>
      <h2 className="font-normal text-xl ">Delivery Details</h2>
      <div className="flex mx-auto my-2">
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">
              Name
            </label>
            <input
              onChange={handleChange}
              value={name}
              type="text"
              id="name"
              name="name"
              className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>

       <div className="px-2 w-full sm:w-1/2">

          <div className="mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input
              readOnly={isLoggedIn} // Conditionally render readOnly attribute
              onChange={handleChange}
              value={email}
              type="email"
              id="email"
              name="email"
              className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>
      <div className="px-2 w-full">
        <div className=" mb-4">
          <label htmlFor="address" className="leading-7 text-sm text-gray-600">
            Address
          </label>
          <textarea
            onChange={handleChange}
            value={address}
            name="address"
            id="address"
            cols="30"
            rows="2 "
            className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          ></textarea>
        </div>
        <div className="flex mx-auto my-2">
        <div className="px-2 w-full sm:w-1/2">

            <div className=" mb-4">
              <label
                htmlFor="phone"
                className="leading-7 text-sm text-gray-600"
              >
                Phone
              </label>
              <input
                placeholder="11 digit phone number"
                onChange={handleChange}
                value={phone}
                type="text"
                id="phone"
                name="phone"
                className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>

          <div className="px-2 w-full sm:w-1/2">

            <div className="mb-4">
              <label
                htmlFor="Pincode"
                className="leading-7 text-sm text-gray-600"
              >
                PinCode
              </label>
              <input
                placeholder="4 digit pincode"
                onChange={handleChange}
                value={pincode}
                type="text"
                id="pincode"
                name="pincode"
                className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
        </div>

        <div className="flex mx-auto my-2">
          <div className="px-2 w-1/2">
            <div className=" mb-4">
              <label
                htmlFor="province"
                className="leading-7 text-sm text-gray-600"
              >
                Province
              </label>
              <input
                onChange={handleChange}
                value={state}
                type="text"
                id="province"
                name="province"
                className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>

          <div className="px-2 w-1/2">
            <div className="mb-4">
              <label htmlFor="city" className="leading-7 text-sm text-gray-600">
                City
              </label>
              <input
                onChange={handleChange}
                value={city}
                type="text"
                id="city"
                name="city"
                className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
        </div>
      </div>

      <h2 className="font-normal text-xl">Review cart items</h2>

      <div className="sidecart  text-black bg-pink-100 p-6 my-4 ">
        <ol className="list-decimal font-semibold ">
          {Object.keys(cart).length == 0 && (
            <div className="my-4 font-normal">No itmes in the cart</div>
          )}
          {Object.keys(cart).map((k) => {
            return (
              <li key={k}>
                <div className="item flex my-3">
                  <div className="w-1/3 font-medium">{cart[k].name}</div>
                  <div className="w-1/3 font-medium flex items-center">
                    <AiFillMinusCircle
                      onClick={() => {
                        removeFromCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].size,
                          cart[k].variant
                        );
                      }}
                      className="mx-3 text-3xl text-pink-500 cursor-pointer"
                    />
                    <span className="text-sm">{cart[k].qty}</span>
                    <AiFillPlusCircle
                      onClick={() => {
                        addToCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].size,
                          cart[k].variant
                        );
                      }}
                      className="mx-3 text-3xl text-pink-500 cursor-pointer"
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
        <span className="total font-bold ">Subtotal : {subTotal}</span>
      </div>

      <div className="mx-4">
        <Link href={"/checkout"}>
          <button
            onClick={initiatePayment}
            disabled={disabled}
            className="disabled:bg-pink-300 flex text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg"
          >
            <IoBagCheckSharp className="m-1" />
            Pay RS {subTotal}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Checkout;
