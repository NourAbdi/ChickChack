import React, { useState, useEffect, createContext, useContext } from "react";
import {
  updateShopDetails,
  getShopByOwnerUid,
  getShopMenuByShopUid,
  getOrdersByShopUid,
  updateOrderStage,
} from "./ownerShop.service";
import { AuthenticationContext } from "../authentication/authentication.context";

export const OwnerShopContext = createContext();

export const OwnerShopContextProvider = ({ children }) => {
  const { user } = useContext(AuthenticationContext);
  const [shop, setShop] = useState(null);
  const [menu, setMenu] = useState(null);
  const [shopOrders, setShopOrders] = useState([]);
  const [pastOrders, setPastOrders] = useState([]);
  const [newOrders, setNewOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchShopDetails = async () => {
      setIsLoading(true);
      try {
        const response = await getShopByOwnerUid(user.uid);
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
  const fetchShopMenuAndOrders = async () => {
    if (shop) {
      try {
        const menu = await getShopMenuByShopUid(shop.shopUid);
        setMenu(menu);

        // Subscribe to real-time updates of the shop's orders
        const unsubscribe = getOrdersByShopUid(shop.shopUid, (orders) => {
          console.log("Orders Updated:", orders);
          // Handle the updated orders as required
          setShopOrders(orders);
        });

        return () => {
          // Unsubscribe from the real-time updates when component unmounts
          unsubscribe();
        };
      } catch (error) {
        console.log("Error fetching shop orders:", error);
      }
    }
  };

  fetchShopMenuAndOrders();
}, [shop]);

  useEffect(() => {
    const getPastAndNewOrders = () => {
      if (shopOrders) {
        const pastOrders = shopOrders.filter(
          (orders) =>
            orders.orderStage !== "fresh"
        );
        const newOrders = shopOrders.filter(
          (orders) =>
            orders.orderStage === "fresh"
        );
        setPastOrders(pastOrders);
        setNewOrders(newOrders);
        console.log("shopOrders:", shopOrders);
        console.log("newOrders:", newOrders);
        console.log("pastOrders:", pastOrders);
      }
    };

    getPastAndNewOrders();
  }, [shopOrders, shop]);

  const updateShop = async (workingHours, isTemporaryClose) => {
    if (shop) {
      try {
        console.log(
          "Trying to update shop details:",
          shop.shopUid,
          workingHours,
          isTemporaryClose
        );
        await updateShopDetails(shop.shopUid, {
          workingHours,
          isTemporaryClose,
        });
        setShop((prevShop) => ({
          ...prevShop,
          workingHours,
          isTemporaryClose,
        }));
        return true; // Return true if the update is successful
      } catch (error) {
        console.log("Error updating shop details:", error);
        return false; // Return false if there's an error
      }
    }
  };

  const updateOrder = (orderId,newPreparationTime, newStage)=>{
    return (updateOrderStage(orderId, newPreparationTime,newStage));
  }

  return (
    <OwnerShopContext.Provider
      value={{
        shop,
        menu,
        isLoading,
        updateShop,
        shopOrders,
        pastOrders,
        newOrders,
        updateOrder,
      }}
    >
      {children}
    </OwnerShopContext.Provider>
  );
};
