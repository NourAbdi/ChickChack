import React, { useState, useEffect, useContext } from "react";

import { getCityByName } from "./location.service";

export const LocationContext = React.createContext();

export const LocationContextProvider = ({ children }) => {
  const [cityIsLoading, setCityIsLoading] = useState(true);
  const [city, setCity] = useState(null);
  const [cityName, setCityName] = useState("kafr kanna");

  
  useEffect(() => {
    const fetchCity = async () => {
      try {
        const data = await getCityByName(cityName);
        setCity(data);
        setCityIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCity();
  }, [cityName]);

  return (
    <LocationContext.Provider
      value={{
        cityIsLoading,
        city,
        cityName,
        setCityName,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
