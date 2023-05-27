// shop.context.js
import React, { useState, createContext, useEffect } from "react";
import { getShopMenuByShopUid } from "./shop.service";

export const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
  const [selectedShop, setSelectedShop] = useState();
  const [menu, setMenu] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setIsLoading(true);
        if (selectedShop) {
          const menuData = await getShopMenuByShopUid(selectedShop.shopUid);
          setMenu(menuData);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };

    fetchMenu();
  }, [selectedShop]);

  return (
    <ShopContext.Provider
      value={{
        selectedShop,
        setSelectedShop,
        menu,
        setMenu,
        isLoading,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

