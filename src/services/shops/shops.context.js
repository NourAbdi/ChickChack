// shops.context.js
import React, { useState, useEffect, createContext, useContext } from "react";

import { getShopsByCityName } from "./shops.service";
import { LocationContext } from "../location/location.context";

export const ShopsContext = createContext();

export const ShopsContextProvider = ({ children }) => {
  const [shops, setShops] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cityName, setCityName] = useState(null);
  const [swiperPhoto, setSwiperPhoto] = useState([]);
  const { selectedCity } = useContext(LocationContext);

  useEffect(() => {
    const fetchShops = async () => {
      setIsLoading(true);
      try {
        if (selectedCity) {
          if (selectedCity.swiperPhoto) {
            setSwiperPhoto(selectedCity.swiperPhoto);
          }
          const fetchedShops = await getShopsByCityName(selectedCity.cityName);
          setShops(fetchedShops);
          setCityName(selectedCity.cityName);
          setIsLoading(false);
        }
      } catch (error) {
        setError(error.message);
      }
    };
    fetchShops();
  }, [selectedCity]);

  return (
    <ShopsContext.Provider
      value={{
        shops,
        isLoading,
        error,
        cityName,
        swiperPhoto,
      }}
    >
      {children}
    </ShopsContext.Provider>
  );
};