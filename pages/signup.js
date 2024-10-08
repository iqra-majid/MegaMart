import React, { useState ,useEffect} from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {


  const router = useRouter();

  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [phone, setPhone] = useState(''); 

  const handleChange = (e) => {
    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "password") {
      setPassword(e.target.value);
    } else if (e.target.name == "address") {
      setAddress(e.target.value);
    } else if (e.target.name == "pincode") {
      setPincode(e.target.value);
    } else if (e.target.name == "phone") {
      setPhone(e.target.value);
    }
  };

  useEffect (() => {
    if(localStorage.getItem('token')){
     router.push('/')
    }
    
   }, [router]); // Add router as a dependency here

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formBody = { name, email, password,address,phone,pincode };
    // console.log(name,email,password);
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signup`, {
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
    setAddress('');
    setPhone("");
    setPincode('');

    if (res.status === 200 && response.success) {
      toast.success("🦄 You singedup successfully!", {
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
        router.push('/login')
        
      }, 1000);
    }else{
      toast.error("Error signing you up!", {
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
<title>Signup to MegaMart</title>
      </Head>
      <div className=" max-w-md w-full my-28 mx-auto border border-gray-300 rounded-lg p-6 min-h-screen shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)]">
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

            <div className="space-y-6">
            <div>
              <label className="text-sm mb-2 block">Address</label>
              <input
              value={address}
                onChange={handleChange}
                id="address"
                name="address"
                type="text"
                className="bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-pink-500"
                placeholder="Enter address"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-sm mb-2 block">Pincode</label>
              <input
              value={pincode}
                onChange={handleChange}
                id="pincode"
                name="pincode"
                type="text"
                className="bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-pink-500"
                placeholder="Enter pincode"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-sm mb-2 block">Phone</label>
              <input
              value={phone}
                onChange={handleChange}
                id="phone"
                name="phone"
                type="text"
                className="bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-pink-500"
                placeholder="Enter phone number"
              />
            </div>
          </div>

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
