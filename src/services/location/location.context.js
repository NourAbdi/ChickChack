import React, { useState, useEffect, useContext } from "react";
import { AuthenticationContext } from "../authentication/authentication.context";
import { getAllCities, saveLastLocation, getLastLocation } from "./location.service";

export const LocationContext = React.createContext();

export const LocationContextProvider = ({ children }) => {
  const { user } = useContext(AuthenticationContext);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState();
  const [currentLocation, setCurrentLocation] = useState({
    location: null,
    focused: false,
  });

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const citiesData = await getAllCities();
        setCities(citiesData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCities();
  }, []);

  useEffect(() => {
    if (currentLocation.location) {
      saveLastLocation(user.uid, currentLocation.location);
    }
  }, [currentLocation.location, user]);

  useEffect(() => {
    if (user) {
      getLastLocation(user.uid, setCurrentLocation);
    }
  }, [user]);

  return (
    <LocationContext.Provider
      value={{
        selectedCity,
        setSelectedCity,
        cities,
        currentLocation,
        setCurrentLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
