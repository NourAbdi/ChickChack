import React, { useState, useEffect,createContext } from "react";
import { getApplicationData } from "./application.service";

export const ApplicationContext = createContext();

export const ApplicationContextProvider = ({ children }) => {
    console.log("NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN")

  const [applicationData, setApplicationData] = useState([]);
 
  useEffect(() => {
    const getData = async () => {
      try {
        const citiesData = await getApplicationData();
        setApplicationData(citiesData);
        // setOrder([...order]);

        // console.log("WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWw")

        // console.log(applicationData)
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  return (
    <ApplicationContext.Provider
      value={{
        applicationData
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};
