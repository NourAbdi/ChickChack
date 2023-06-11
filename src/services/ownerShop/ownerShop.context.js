import React, { useState, useEffect, createContext, useContext } from "react";
import {
  updateShopDetails,
  getShopByOwnerUid,
  getShopMenuByShopUid,
  getOrdersByShopUid,
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

          // Subscribe to real-time updates of orders
          const unsubscribe = getOrdersByShopUid(shop.shopUid, (orders) => {
            console.log("New orders:", orders);
            setShopOrders(orders);
          });
        } catch (error) {
          console.log("Error fetching shop menu and orders:", error);
        }
      }
    };

    fetchShopMenuAndOrders();
  }, [shop]);

  useEffect(() => {
    const getPastAndNewOrders = () => {
      const pastOrders = shopOrders.filter(
        (orders) =>
          orders.orderDetails.some(
            (orderDetail) =>
              orderDetail.orderStage === "done" &&
              orderDetail.shopUid === shop.shopUid
          )
      );
      const newOrders = shopOrders.filter(
        (order) =>
          order.orderDetails.some(
            (orderDetail) =>
              orderDetail.orderStage !== "done" &&
              orderDetail.shopUid === shop.shopUid
          )
      );
      setPastOrders(pastOrders);
      setNewOrders(newOrders);
    };

    getPastAndNewOrders();
  }, [shopOrders, shop]);

  const updateShop = async (workingHours, isTemporaryClose) => {
    try {
      await updateShopDetails(shop.shopUid, workingHours, isTemporaryClose);
      setShop((prevShop) => ({
        ...prevShop,
        workingHours,
        isTemporaryClose,
      }));
    } catch (error) {
      console.log("Error updating shop details:", error);
    }
  };

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
      }}
    >
      {children}
    </OwnerShopContext.Provider>
  );
};
