'use client'
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext({})

export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState(null);

    useEffect(()=>{
      updateCart()
    }, [])
  
    const countInCart = (partId) => {
      let count = 0
      if(cart){
          cart.items.forEach((item) => {
              if(item.part_id === partId){
                  count = item.quantity
              }
          })
      }
      return count
    }

    const updateCart = ()=>{
      const cartCookie = document.cookie.split("; ").find((row) => row.startsWith("cart="))?.split("=")[1];
      if (cartCookie) {
        let localCart = JSON.parse(decodeURIComponent(cartCookie))
        setCart(localCart)
      }else{
        setCart(null)
      }
    }

    return (
      <CartContext.Provider value={{ cart, updateCart, countInCart }}>
        {children}
      </CartContext.Provider>
    );
  };

  export const useCartContext = () => {
    return useContext(CartContext);
  };