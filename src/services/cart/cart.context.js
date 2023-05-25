import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);


  return (
    <CartContext.Provider
      value={{
        cartItems,
        // addToCart,
        // clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
