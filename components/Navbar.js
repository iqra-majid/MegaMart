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

  const [dropdown, setDropdown] = useState(false);

  return (
    <div className="navbar flex flex-col md:flex-row md:justify-start justify-center items-center py-2 shadow-xl sticky top-0 bg-white z-10">
      <div className="logo md:mx-5 mr-auto my-4 ">
        <Link href={"/"}>
          <Image width={150} height={40} src="/logo.png" />
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
        <a
          onMouseOver={() => {
            setDropdown(true);
          }}
          onMouseLeave={() => {
            setDropdown(false);
          }}
        >
          {dropdown && (
            <div
              className="absolute right-5 bg-pink-400 top-9 px-5 rounded-md w-40"
              onMouseOver={() => {
                setDropdown(true);
              }}
              onMouseLeave={() => {
                setDropdown(false);
              }}
            >
              <ul>
                <li className="py-1 hover:text-pink-700 text-sm">My Account</li>
                <li className="py-1 hover:text-pink-700 text-sm">Orders</li>
                <li onClick={logout} className="py-1 hover:text-pink-700 text-sm">Logout</li>
              </ul>
            </div>
          )}
          {/* {user.value && ( */}
            <MdAccountCircle className="text-xl md:text-3xl mx-2" />
          {/* )} */}
        </a>

        {/* {!user.value && (
          <Link href="/login">
            <button className="bg-pink-600 px-2 py-1 round-md text-sm text-white mx-2">
              Login
            </button>
          </Link>
        )} */}

        <button>
          <GrCart onClick={toggleClick} className="text-xl md:text-3xl" />
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
            <button className="flex mx-auto mt-14 text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg">
              <IoBagCheckSharp className="m-1" />
              Checkout
            </button>
          </Link>

          <button
            onClick={clearCart}
            className="flex mx-2 mt-14 text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
