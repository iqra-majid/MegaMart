import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/");
    }
  }, [router]); // Add router as a dependency here

  const handleChange = (e) => {
    if (e.target.name == "email") {
      setEmail(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous error message
      const response = await fetch("/api/forgot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const res = await response.json();
      if (res.success) {
        console.log("Password reset email sent.");
      } else {
        
        setError(res.error)
      }
    
  };

  return (
    <div className="min-h-screen font-[sans-serif] flex items-start  pt-28 px-4 justify-center">
      <Head>
        <title>Forgot Password - MegaMart</title>
      </Head>
      <div className="flex flex-col items-center justify-center py-6 px-4">
        <div className="border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)]">
          <form  className="space-y-4">
            <div className="mb-8">
              <h3 className="text-gray-800 text-3xl font-extrabold">
                Forgot password
              </h3>
              <p className="text-sm mt-6 text-center">
                <Link
                  href={"/login"}
                  className="text-pink-600 font-semibold hover:underline ml-1"
                >
                  Login here
                </Link>
              </p>
            </div>

            <div>
              <label className="text-gray-800 text-sm mb-2 block">Email</label>
              <div className="relative flex items-center">
                <input
                  placeholder="Enter your email"
                  onChange={handleChange}
                  value={email}
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-pink-600"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-[18px] h-[18px] absolute right-4"
                  viewBox="0 0 24 24"
                >
                  <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                  <path
                    d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                    data-original="#000000"
                  ></path>
                </svg>
              </div>
            </div>

            <div className="!mt-8">
              <button
              onClick={handleSubmit}
                type="button"
                className="w-full shadow-xl py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-pink-600 hover:bg-pink-700 focus:outline-none"
              >
                Continue
              </button>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Forgot;
