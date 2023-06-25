import React, { useState, createContext, useEffect } from "react";


export const SettingsContext = createContext();

export const SettingsContextProvider = ({ children }) => {



    return (
        <SettingsContext.Provider
            value={{
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
};
