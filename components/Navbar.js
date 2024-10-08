import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { GrCart } from "react-icons/gr";
import { AiFillCloseSquare } from "react-icons/ai";
import { AiFillPlusCircle } from "react-icons/ai";
import { AiFillMinusCircle } from "react-icons/ai";
import { IoBagCheckSharp } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { useRouter } from "next/router";
const Navbar = ({
  logout,
  user,
  cart,
  addToCart,
  removeFromCart,
  subTotal,
  clearCart,
}) => {
  // console.log(user.value);

  const [dropdown, setDropdown] = useState(false);

  const toggledropdown = () => {
    setDropdown(!dropdown);
  };

  const toggleClick = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
    } else if (!ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-0");
      ref.current.classList.add("translate-x-full");
    }
  };
  const ref = useRef();

  const router = useRouter();
  const { pathname } = router;
  const isAdminPage = pathname.startsWith("/admin");
  return (
    <>
      {!isAdminPage && (
        <div className="navbar flex flex-col md:flex-row md:justify-start justify-center items-center py-2 shadow-xl sticky top-0 bg-white z-50 ">
          <div className="logo md:mx-8 mr-auto ml-4 my-4 ">
            <Link href={"/"}>
              <Image
                src="/logo.png"
                alt="logo"
                width={150}
                height={40}
                layout="fixed"
              />
            </Link>
          </div>
          <div className="nav">
            <ul className="flex items-center space-x-6 font-bold my-4 md:text-md">
              <Link href={"/tshirt"} className="hover:text-pink-600">
                <li>Tshirts</li>
              </Link>
              <Link href={"/mugs"} className="hover:text-pink-600">
                <li>Mugs</li>
              </Link>
              <Link href={"/hoodies"} className="hover:text-pink-600">
                <li>Hoodies</li>
              </Link>
              <Link href={"/stickers"} className="hover:text-pink-600">
                <li>Stickers</li>
              </Link>
              
            </ul>
          </div>
         
          <div className="cart absolute items-center right-0 top-4 mx-5 my-4 flex cursor-pointer">
            <div className="relative inline-block">
              {user.value && (
                <MdAccountCircle
                  className="text-xl md:text-3xl mx-2 mb-4 cursor-pointer"
                  onClick={toggledropdown}
                />
              )}

              {dropdown && (
                <div className="absolute lg:right-8 right-5 bg-white shadow-lg border top-4 py-4 px-5 rounded-md w-40">
                  <ul>
                    <Link href="/myaccount">
                      <li className="py-1 hover:text-pink-700 text-sm font-bold cursor-pointer">
                        My Account
                      </li>
                    </Link>
                    <Link href="/orders">
                      <li className="py-1 hover:text-pink-700 text-sm font-bold cursor-pointer">
                        My Orders
                      </li>
                    </Link>
                    <li
                      onClick={logout}
                      className="py-1 hover:text-pink-700 text-sm font-bold cursor-pointer"
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {!user.value && (
              <Link href="/login">
                <button className="bg-pink-600 px-2 py-1 round-md text-sm text-white mx-2 mb-4">
                  Login
                </button>
              </Link>
            )}

            {!user.value && (
              <Link href="/signup">
                <button className="bg-pink-600 px-2 py-1 round-md text-sm text-white mx-4 mb-4">
                  Signup
                </button>
              </Link>
            )}

            <button>
              <GrCart
                onClick={toggleClick}
                className="text-xl md:text-3xl mb-4"
              />
            </button>
          </div>

          <div
            ref={ref}
            className="sidecart overflow-y-scroll  absolute top-0 right-0 text-black bg-pink-100 p-10 transform transition-transform translate-x-full"
          >
            <h2 className="font-bold text-md">Shopping cart</h2>
            <span
              onClick={toggleClick}
              className="absolute top-2 right-2 cursor-pointer text-xl text-pink-500"
            >
              <AiFillCloseSquare />
            </span>
            <ol className="list-decimal font-semibold ">
              {Object.keys(cart).length == 0 && (
                <div className="my-4 font-normal">No itmes in the cart</div>
              )}
              {Object.keys(cart).map((k) => {
                return (
                  <li key={k}>
                    <div className="item flex my-3">
                      <div className="w-2/3 font-medium">{cart[k].name}</div>
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

            <div className="flex">
              <Link href={"/checkout"}>
                <button
                  disabled={Object.keys(cart).length === 0}
                  className="disabled:bg-pink-300 flex mx-auto mt-14 text-white bg-pink-500 border-0 py-2 px-4 md:px-8 focus:outline-none hover:bg-pink-600 rounded text-lg"
                >
                  <IoBagCheckSharp className="m-1" />
                  Checkout
                </button>
              </Link>

              <button
                disabled={Object.keys(cart).length === 0}
                onClick={clearCart}
                className="disabled:bg-pink-300 mx-2  mt-14 text-white bg-pink-500 py-2 px-4 md:px-8 focus:outline-none hover:bg-pink-600 rounded text-lg "
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
