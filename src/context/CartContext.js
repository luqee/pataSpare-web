'use client'
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext({})

export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState(null);

    useEffect(()=>{
      updateCart()
    }, [])
  
    const updateCart = ()=>{
      const cartCookie = document.cookie.split("; ").find((row) => row.startsWith("cart="))?.split("=")[1];
      if (cartCookie) {
        let localCart = JSON.parse(decodeURIComponent(cartCookie))
        setCart(localCart)
      }
    }

    return (
      <CartContext.Provider value={{ cart, updateCart }}>
        {children}
      </CartContext.Provider>
    );
  };

  export const useCartContext = () => {
    return useContext(CartContext);
  };