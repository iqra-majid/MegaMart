import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
const ResetPassword = () => {
const [npassword, setNpassword] = useState('')
const [cpassword, setCpassword] = useState('')
const [error, setError] = useState("");
const router = useRouter();
const { token } = router.query;

const handleChange = (e)=>{
    if (e.target.name == "npassword") {
        setNpassword(e.target.value);
      }
      if (e.target.name == "cpassword") {
        setCpassword(e.target.value);
      }
}

const handleSubmit =async (e)=>{
    e.preventDefault();
    
    const response = await fetch("/api/resetpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, npassword }),
      });
      const res = await response.json();
      if (res.success) {
        console.log("Password reset successfully.");
        router.push("/login");
      } else {
        console.log("Error resetting password.");
      }
}

  return (
    <div>
        <Head>
        <title>Reset Password - MegaMart</title>
      </Head>
      <div className=" min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)]">
          <form className="space-y-4">
            <div className="mb-8">
              <h3 className="text-gray-800 text-3xl font-extrabold">Reset password</h3>
            </div>

            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                New password
              </label>
              <div className="relative flex items-center">
                <input
                onChange={handleChange}
                value={npassword}
                  id="npassword"
                  name="npassword"
                  type="password"
                  required
                  className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-pink-600"
                  placeholder="Enter new password"
                />
              </div>
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                Confirm Password
              </label>
              <div className="relative flex items-center">
                <input
                value={cpassword}
                onChange={handleChange}
                  id="cpassword"
                  name="cpassword"
                  type="password"
                  required
                  className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-pink-600"
                  placeholder="Enter password"
                />
               
              </div>
            </div>

            
            <div className="!mt-8">
              <button
              onClick={handleSubmit}
                type="submit"
                className="w-full shadow-xl py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-pink-600 hover:bg-pink-700 focus:outline-none"
              >
                Submit
              </button>
            </div>
            {npassword != cpassword && <span className="text-red-600">Passwords do not match</span>}
          </form>
        </div>
        </div>
     
     
    </div>
  );
};

export default ResetPassword;
