import React, { useState, useEffect,createContext } from "react";
import { getApplicationData } from "./application.service";

export const ApplicationContext = createContext();

export const ApplicationContextProvider = ({ children }) => {

  const [applicationData, setApplicationData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
 
  useEffect(() => {
    const getData = async () => {
      try {
        const citiesData = await getApplicationData();
        setApplicationData(citiesData);
        setIsLoading(false);
        
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  return (
    <ApplicationContext.Provider
      value={{
        applicationData,
        isLoading,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};
