import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";


export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const [user, setUser] = useState({value:null})
  const [key, setKey] = useState(0)
  const router = useRouter();
  useEffect(() => {
    // Runs when we reload the page
    try {
      // The if statement checks if there is indeed a value stored under the key "cart" in localStorage.
      if (localStorage.getItem("cart")) {
        // This line parses the JSON string retrieved from localStorage into a JavaScript object.
        setCart(JSON.parse(localStorage.getItem("cart")));
        saveCart(JSON.parse(localStorage.getItem("cart")));
      }
    } catch (error) {
      console.log(error);
      localStorage.clear();
    }

    const token = localStorage.getItem('token');
    // console.log('Retrieved token:', token);
    if(token){
      setUser({user:token})
      setKey(Math.random())
      console.log(user);
    }

  }, [router.query]);

  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart));
    let subt = 0;
    let keys = Object.keys(myCart);
    for (let i = 0; i < keys.length; i++) {
      subt += myCart[keys[i]].price * myCart[keys[i]].qty;
    }
    setSubTotal(subt);
  };

  const addToCart = (itemCode, qty, price, name, size, variant) => {
    let newCart = cart; // Create a new reference to the existing cart state

    // Check if the itemCode already exists in the cart
    if (itemCode in cart) {
      // If itemCode exists, update the quantity
      newCart[itemCode].qty = cart[itemCode].qty + qty;
    } else {
      // If itemCode doesn't exist, add a new entry for this item
      newCart[itemCode] = { qty: 1, price, name, size, variant };
    }
    // Update the state with the newCart object
    setCart(newCart);
    
    // Save the updated cart to localStorage or another persistence mechanism
    saveCart(newCart);
    // Show the toast notification
    
  };

  const buyNow = (itemCode, qty, price, name) => {
    let newCart = {itemCode:{ qty: 1, price, name }};

    setCart(newCart);

    saveCart(newCart);
    router.push("/checkout");
  };

  const clearCart = () => {
    setCart({});
    // We use {} instead of cart state bcz it takes time to set setCart
    saveCart({});
    console.log("cart has been cleared");
  };

  const removeFromCart = (itemCode, qty) => {
    // Deep copy Creates a new object that is a complete copy of the original object, including all nested objects.
    let newCart = JSON.parse(JSON.stringify(cart)); // Create a new reference to the existing cart state

    // Check if the itemCode already exists in the cart
    if (itemCode in cart) {
      // If itemCode exists, update the quantity
      newCart[itemCode].qty = cart[itemCode].qty - qty;
    }
    if (newCart[itemCode]["qty"] <= 0) {
      delete newCart[itemCode];
    }
    // Update the state with the newCart object
    setCart(newCart);
    // Save the updated cart to localStorage or another persistence mechanism
    saveCart(newCart);
  };

  const logout  = ()=>{
    localStorage.removeItem('token');
    setUser({value:null})
    setKey(Math.random())
  }

  return (
    <>
      {/* Passing these methods to navbar and components so we can use them  */}
      <Navbar
      logout={logout}
      key={key}
      user={user}
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        subTotal={subTotal}
      />
      <Component
        buyNow={buyNow}
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        subTotal={subTotal}
        {...pageProps}
      />
      <Footer />
      
    </>
  );
}
