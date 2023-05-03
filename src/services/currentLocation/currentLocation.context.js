import React, { useState, createContext } from "react";

export const locationContext = createContext();

export const LocationContextProvider = ({ children }) => {
    const [location, setLocation] = useState(null);
    const onLocation = (location) => {
        setLocation(location);
      };

    return (
        <locationContext.Provider
            value={{
                isLocated: !!location,
                location,
                onLocation,
            }}
        >
            {children}
        </locationContext.Provider>
    );
};
