// shop.context.js
import React, { useState, createContext } from "react";

export const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
  const [shop, setShop] = useState([]);
  const [menu, setMenu] = useState([]);

  return (
    <ShopContext.Provider
      value={{
        shop,
        setShop,
        menu,
        setMenu,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};