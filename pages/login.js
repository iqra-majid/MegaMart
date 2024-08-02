import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";

import { ToastContainer, toast, Bounce } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const router = useRouter();

  useEffect (() => {
   if(localStorage.getItem('token')){
    router.push('/')
   }
  
  }, [router]); // Add router as a dependency here
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 
  const handleChange = (e) => {
    if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "password") {
      setPassword(e.target.value);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formBody = {  email, password };
    // console.log(email,password);
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formBody),
    });
    let response = await res.json();
    console.log(response);
    
   
if(response.success){
  localStorage.setItem('userEmail', response.email);
  localStorage.setItem('token',response.token)
  setEmail("");
  setPassword("");
  toast.success("🦄 You are loggedin seccessfully!", {
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
  setTimeout(() => {
    router.push('/')
    
  }, 1000);
}else{
 
  toast.error(response.error, {
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
    
    
  };
  return (
    <div className="font-[sans-serif] min-h-screen flex items-center justify-center">
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
<Head>
      <title>Login - MegaMart</title>
    </Head>
      <div className=" min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)]">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="mb-8">
              <h3 className="text-gray-800 text-3xl font-extrabold">Sign in</h3>
              <p className="text-gray-500 text-sm mt-4 leading-relaxed">
                Sign in to your account and explore a world of possibilities.
                Your journey begins here.
              </p>
            </div>

            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                Email
              </label>
              <div className="relative flex items-center">
                <input
                onChange={handleChange}
                value={email}
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-pink-600"
                  placeholder="Enter email"
                />
              
              </div>
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                Password
              </label>
              <div className="relative flex items-center">
                <input
                value={password}
                onChange={handleChange}
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-pink-600"
                  placeholder="Enter password"
                />
               
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
             

              <div className="text-sm">
                <Link
                  href={"/forgot"}
                  className="text-pink-600 hover:underline font-semibold"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div className="!mt-8">
              <button
                type="submit"
                className="w-full shadow-xl py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-pink-600 hover:bg-pink-700 focus:outline-none"
              >
                Log in
              </button>
            </div>

            <p className="text-sm !mt-8 text-center text-gray-800">
              Don&apos;t have an account ?
              <Link
                href={"/signup"}
                className="text-pink-600 font-semibold hover:underline ml-1 whitespace-nowrap"
              >
                Signup
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
