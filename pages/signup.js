import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { ToastContainer, toast, Bounce } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const handleChange = (e) => {
    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "password") {
      setPassword(e.target.value);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formBody = { name, email, password };
    console.log(name,email,password);
    let res = await fetch("http://localhost:3000/api/signup", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formBody),
    });
    let response = await res.json();
    console.log(response);
    

    setEmail("");
    setName("");
    setPassword("");
    toast.success("🦄 You singedup seccessfully!", {
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
  };
  return (
    <div className="flex flex-col justify-center font-[sans-serif] text-[#333] sm:h-screen p-4">
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
transition= {Bounce}
/>
      <div className="max-w-md w-full mx-auto border border-gray-300 rounded-md p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-8">
            <h3 className="text-gray-800 text-3xl font-extrabold">Sign up</h3>
          </div>
          <div className="space-y-6">
            <div>
              <label className="text-sm mb-2 block">Name</label>
              <input
              value={name}
                onChange={handleChange}
                id="name"
                name="name"
                type="text"
                className="bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-pink-500"
                placeholder="Enter name"
              />
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <label className="text-sm mb-2 block">Email Id</label>
              <input
              value={email}
                onChange={handleChange}
                id="email"
                name="email"
                type="text"
                className="bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-pink-500"
                placeholder="Enter email"
              />
            </div>
            <div>
              <label className="text-sm mb-2 block">Password</label>
              <input
              value={password}
                onChange={handleChange}
                id="password"
                name="password"
                type="password"
                className="bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-pink-500"
                placeholder="Enter password"
              />
            </div>

            {/* <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 shrink-0 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-3 block text-sm">
                I accept the{" "}
                
                  Terms and Conditions
                
              </label>
            </div> */}
          </div>
          <div className="!mt-10">
            <button
              type="submit"
              className="w-full py-3 px-4 text-sm font-semibold rounded text-white bg-pink-500 hover:bg-pink-600 focus:outline-none"
            >
              Create an account
            </button>
          </div>
          <p className="text-sm mt-6 text-center">
            Already have an account?{" "}
            <Link
              href={"/login"}
              className="text-pink-600 font-semibold hover:underline ml-1"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
