import React, { useState, useEffect, createContext } from "react";
import { getAllShopCategories } from "./shopsCategorys.service";

export const ShopsCategorysContext = createContext();

export const ShopsCategorysContextProvider = ({ children }) => {
  const [shopsCategories, setShopCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchShopCategories = async () => {
      try {
        // Call the function to get shop categories
        const categories = await getAllShopCategories();
        setShopCategories(categories);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching shop categories:", error);
        setIsLoading(false);
      }
    };

    // Call the function to fetch shop categories when component mounts
    fetchShopCategories();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <ShopsCategorysContext.Provider
      value={{
        shopsCategories,
        isLoading,
      }}
    >
      {children}
    </ShopsCategorysContext.Provider>
  );
};
