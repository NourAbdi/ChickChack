import React, { useState, useEffect,useContext } from "react";

import { locationRequest, locationTransform } from "./location.service";
import { currentLocationContext } from "../currentLocation/currentLocation.context";


export const LocationContext = React.createContext();


export const LocationContextProvider = ({ children }) => {
  
  // const { city } = useContext(currentLocationContext);
  const [city, setCity] = useState("kafr kanna");
  const [location, setLocation] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [currentlocation, setcurrentlocation] = useState(null);
  // console.log(city);
  
  const onCity = (searchCity) => {
    // setIsLoading(true);
    setCity(searchCity);
  };

  useEffect(() => {
    if (!city) {
      // don't do anything
      return;
    }
    locationRequest(city)
      .then(locationTransform)
      .then((result) => {
        setError(null);
        // setIsLoading(false);
        setLocation(result);
      })
      .catch((err) => {
        // setIsLoading(false);
        setError(err);
      });
  }, [city]);

  return (
    <LocationContext.Provider
      value={{
        // isLoading,
        error,
        location,
        // search: onSearch,
        // keyword,
        onCity,
        city,
        currentlocation
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
