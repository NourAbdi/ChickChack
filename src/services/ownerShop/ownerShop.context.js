import React, { useState, useEffect, createContext, useContext } from "react";
import { getShopDetails, updateShopDetails } from "./ownerShop.service";
import { AuthenticationContext } from "../authentication/authentication.context";

export const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
  const { user } = useContext(AuthenticationContext);
  const [shop, setShop] = useState(null);
  const [ownerUid, setOwnerUid] = useState(user ? user.uid : null);
  const [shopUid, setShopUid] = useState(null);

  useEffect(() => {
    const fetchShopDetails = async () => {
        try {
          // Make an API request to get the shop details based on ownerUid
          const response = await getShopDetails(ownerUid);
          console.log("Fetching shop details:", response);
          const { shopUid, name, location, type, address, isOpen, menu, workingHours, takeOrder, icon, headerBackground } = response;
          setShop({ name, location, type, address, isOpen, menu, workingHours, takeOrder, icon, headerBackground });
          setShopUid(shopUid); // Set the shop UID
        } catch (error) {
          console.log("Error fetching shop details:", error);
        }
      };      

    if (ownerUid) {
      fetchShopDetails();
    }
  }, [ownerUid]);

  const updateShop = async (newWorkingHours, newIsOpen) => {
    try {
      // Make an API request to update the shop details
      await updateShopDetails(shopUid, { workingHours: newWorkingHours, isOpen: newIsOpen });
      // Update the shop state with the new values
      setShop(prevShop => ({ ...prevShop, workingHours: newWorkingHours, isOpen: newIsOpen }));
    } catch (error) {
      console.log("Error updating shop details:", error);
    }
  };

  return (
    <ShopContext.Provider value={{
        shopUid,
         shop, 
         updateShop }}>
      {children}
    </ShopContext.Provider>
  );
};
