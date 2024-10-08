import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";

const MyAccount = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [npassword, setNpassword] = useState("");

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
    }

    const storedEmail = localStorage.getItem("userEmail");

    if (storedEmail) {
      setEmail(storedEmail);
      setIsLoggedIn(true);
      fetchData();
    } else {
      setIsLoggedIn(false);
      setEmail("");
    }
  }, [router]);

  const handleChange = async (e) => {
    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "address") {
      setAddress(e.target.value);
    } else if (e.target.name === "phone") {
      setPhone(e.target.value);
    } else if (e.target.name == "pincode") {
      setPincode(e.target.value);
    } else if (e.target.name == "password") {
      setPassword(e.target.value);
    } else if (e.target.name == "cpassword") {
      setCpassword(e.target.value);
    }else if (e.target.name == "npassword") {
      setNpassword(e.target.value);
    }
  };

  const fetchData = async () => {
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage
    if (!token) {
      // Handle the case where the token is not available
      console.error("No token found");
      return;
    }
    let data = { token: token }; // Use the retrieved token
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/getuser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const res = await response.json();
    console.log(res);
    if (res.success) {
      setAddress(res.address || "");
      setName(res.name || "");
      setPincode(res.pincode || "");
      setPhone(res.phone || "");
    } 
  };

  const handleUserSubmit = async () => {
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage
    if (!token) {
      // Handle the case where the token is not available
      console.error("No token found");
      return;
    }

    let data = { token: token, name, address, phone, pincode }; // Use the retrieved token
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/updateuser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();
    // console.log(result);
    toast.success("successfully updated Details", {
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
  };

  const handlePasswordSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }
  
    let res;
    try {
      if (npassword === cpassword) {
        let data = { token: token, password, cpassword, npassword };
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updatepassword`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
  
        // Check if the response is OK (status in the range 200-299)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        res = await response.json();
      } else {
        res = { success: false };
      }
  
      if (res.success) {
        toast.success("Successfully updated Password", {
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
      } else {
        toast.error("Error updating Password", {
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
      }
      setCpassword('')
      setNpassword('')
      setPassword('')
    } catch (error) {
      console.error("Error during password update:", error);
      toast.error("An error occurred while updating password", {
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
    }
  };
  


  return (
    <div className="container mx-auto my-9  ">
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
      <h1 className="text-3xl text-center font-bold mb-6">Update your Account</h1>
      <h2 className="font-normal text-xl ml-3">Delivery Details</h2>
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

        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600 whitespace-nowrap">
              Email (Can not be updated)
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
          <div className="px-2 w-1/2">
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

          <div className="px-2 w-1/2">
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
      </div>
      <button
        onClick={handleUserSubmit}
        className="m-2 disabled:bg-pink-300 flex mb-5 text-white bg-pink-500 border-0 py-2 px-4 focus:outline-none hover:bg-pink-600 rounded text-lg"
      >
        Submit
      </button>
      <h2 className="font-normal text-xl ml-3">Change password</h2>
      <div className="flex mx-auto my-2">
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label
              htmlFor="password"
              className="leading-7 text-sm text-gray-600"
            >
              Password
            </label>
            <input
              onChange={handleChange}
              value={password}
              type="password"
              id="password"
              name="password"
              className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out autofill-fix"
            />
          </div>
        </div>

        

        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label
              htmlFor="npassword"
              className="leading-7 text-sm text-gray-600 whitespace-nowrap"
            >
              New password
            </label>
            <input
              onChange={handleChange}
              value={npassword}
              type="password"
              id="npassword"
              name="npassword"
              className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>

        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label
              htmlFor="cpassword"
              className="leading-7 text-sm text-gray-600 whitespace-nowrap"
            >
              Confirm New password
            </label>
            <input
              onChange={handleChange}
              value={cpassword}
              type="password"
              id="cpassword"
              name="cpassword"
              className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>
      <button onClick={handlePasswordSubmit} className="m-2 disabled:bg-pink-300 flex mb-5 text-white bg-pink-500 border-0 py-2 px-4 focus:outline-none hover:bg-pink-600 rounded text-lg">
        Submit
      </button>
    </div>
  );
};

export default MyAccount;
