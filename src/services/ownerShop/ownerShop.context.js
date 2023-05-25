import React, { useState, useEffect, createContext, useContext } from "react";
import { getShopByOwnerUid, getShopMenuByShopUid } from "./ownerShop.service";
import { AuthenticationContext } from "../authentication/authentication.context";

export const OwnerShopContext = createContext();

export const OwnerShopContextProvider = ({ children }) => {
  const { user } = useContext(AuthenticationContext);
  const [ shop, setShop ] = useState(null);
  const [ menu, setMenu ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(true);
  
  useEffect(() => {
    const fetchShopDetails = async () => {
      setIsLoading(true);
        try {
          const response = await getShopByOwnerUid(user.uid);
          console.log("Fetching shop details:", response);
          setShop(response); 
          setIsLoading(false);
        } catch (error) {
          console.log("Error fetching shop details:", error);
        }
      };      

    if (user) {
      fetchShopDetails();
    }
  }, [user]);

  useEffect(() => {
    const fetchShopMenu = async () => {
      // setIsLoading(true);
        try {
          // console.log("WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW", shop.shopUid);
          const response = await getShopMenuByShopUid(shop.shopUid);
          // console.log("UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU", response);
          setMenu(response); 
          // setIsLoading(false);
        } catch (error) {
          console.log("Error fetching shop menu:", error);
        }
      };      

    if (shop) {
      fetchShopMenu();
    }
  }, [shop]);

  return (
    <OwnerShopContext.Provider value={{
         shop, 
         menu,
         isLoading,

         }}>
      {children}
    </OwnerShopContext.Provider>
  );
};
