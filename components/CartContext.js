import React, { useState, useEffect } from "react";
const { createContext } = require("react");
export const CartContext = createContext({});
export default function CartContextProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  useEffect(() => {
    if (cartProducts?.length > 0) {
      const serializedCart = JSON.stringify(cartProducts, replacer);
      ls?.setItem("cart", serializedCart);
    }
  }, [cartProducts]);

  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      const parsedCart = JSON.parse(ls.getItem("cart"));
      setCartProducts(parsedCart);
    }
  }, []);

  const addToCart = (productId) => {
    setCartProducts((prev) => [...prev, productId]);
    // console.log(product._id);
  };
  const removeFromCart = (productId) => {
    console.log(productId);
    setCartProducts((prev) => {
      const position = prev.indexOf(productId);
      console.log(position);
      if (position >= 0) {
        console.log(position);
        return prev.filter((value, index) => index !== position);
      }
      console.log(position);
      return prev;
    });
  };

  // Custom replacer function to handle circular references
  const replacer = (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (key === "exampleCircularProperty") {
        // Handle specific circular property or remove it
        return undefined;
      } else if (key === "exampleNestedObject") {
        // Handle nested objects with potential circular references
        return { ...value, circularProperty: undefined };
      }
    }
    return value;
  };
  console.log(cartProducts);
  return (
    <CartContext.Provider
      value={{ cartProducts, setCartProducts, addToCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
