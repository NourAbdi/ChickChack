// shops.context.js
import React, { useState, useEffect, createContext, useContext } from "react";

import { getShopsByCityName } from "./shops.service";
import { LocationContext } from "../location/location.context";

export const ShopsContext = createContext();

export const ShopsContextProvider = ({ children }) => {
  const [shops, setShops] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isShopsLoading, setIsShopsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cityName, setCityName] = useState(null);
  const [swiperPhoto, setSwiperPhoto] = useState([]);
  const { selectedCity } = useContext(LocationContext);

  useEffect(() => {
    const fetchShops = async () => {
      setIsLoading(true);
      setIsShopsLoading(true);
      try {
        if (selectedCity) {
          setCityName(selectedCity.cityName);
          setIsLoading(false);
          if (selectedCity.swiperPhoto) {
            setSwiperPhoto(selectedCity.swiperPhoto);
          }
          const fetchedShops = await getShopsByCityName(selectedCity.cityName);
          setShops(fetchedShops);
          setIsShopsLoading(false);
        }
        // console.log(isLoading, selectedCity);
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
        isShopsLoading,
        error,
        cityName,
        swiperPhoto,
      }}
    >
      {children}
    </ShopsContext.Provider>
  );
};