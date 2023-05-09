import React, { useState, useEffect,useContext } from "react";

import { locationRequest, locationTransform } from "./location.service";
import { currentLocationContext } from "../currentLocation/currentLocation.context";


export const LocationContext = React.createContext();


export const LocationContextProvider = ({ children }) => {
  
  // const { city } = useContext(currentLocationContext);
  const [keyword, setKeyword] = useState("kafr kanna");
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // console.log(city);
  
  const onSearch = (searchKeyword) => {
    setIsLoading(true);
    setKeyword(searchKeyword);
  };

  useEffect(() => {
    if (!keyword.length) {
      // don't do anything
      return;
    }
    locationRequest(keyword.toLowerCase())
      .then(locationTransform)
      .then((result) => {
        setError(null);
        setIsLoading(false);
        setLocation(result);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  }, [keyword]);

  return (
    <LocationContext.Provider
      value={{
        isLoading,
        error,
        location,
        search: onSearch,
        keyword,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
