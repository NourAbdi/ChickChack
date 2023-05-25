import React, { useState, useContext, createContext, useEffect } from "react";

import { getShopsByCityName, getShopMenu } from "./shops.service";
import { LocationContext } from "../location/location.context";

export const ShopsContext = createContext();

export const ShopsContextProvider = ({ children }) => {

  const [shops, setShops] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { city } = useContext(LocationContext);

  useEffect(() => {
    const fetchShops = async () => {
      setIsLoading(true);
      try {
        if (city) {
          const fetchedShops = await getShopsByCityName(city.cityName);
          setShops(fetchedShops);
          setIsLoading(false);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchShops();
  }, [city]);

  useEffect(() => {
    console.log("ShopsContext, shops changed:", JSON.stringify(shops, null, 2));
  }, [shops]);

  return (
    <ShopsContext.Provider
      value={{
        shops,
        getShopMenu,
        isLoading,
        error,
      }}
    >
      {children}
    </ShopsContext.Provider>
  );
};
