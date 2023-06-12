import React, { createContext, useContext, useEffect, useState } from "react";

import { saveOrder, getPastOrdersByUserUid } from "./cart.service"
import { AuthenticationContext } from "../../services/authentication/authentication.context";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const { user } = useContext(AuthenticationContext);
  const [cartItems, setCartItems] = useState([]);
  const [order, setOrder] = useState();

  const addToCart = (item, quantity = 1, shopUid) => {
    const existingItem = cartItems.find((cartItem) => cartItem.itemUid === item.itemUid);

    if (existingItem) {
      const updatedItems = cartItems.map((cartItem) =>
        cartItem.itemUid === item.itemUid ? { ...cartItem, quantity: cartItem.quantity + quantity } : cartItem
      );
      setCartItems(updatedItems);
    } else {
      setCartItems([...cartItems, { ...item, quantity, shopUid }]);
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const removeFromCart = (item) => {
    const updatedItems = cartItems.filter((cartItem) => cartItem.itemUid !== item.itemUid);
    setCartItems(updatedItems);
  };

  const checkout = async () => {
    try {
      save_Order();
      console.log("Checkout");
      console.log("cartItems :", cartItems);
      console.log("order : ", order);
      await saveOrder({ userUid: user.uid, orderDetails: order,orderTime:(new Date()).toLocaleTimeString() });
      clearCart(); // Clear the cart after a successful order
    } catch (error) {
      console.log("Error saving order:", error);
    }
  };

  const getPastOrders = () => {
    console.log("getPastOrdersByUserUid",user.uid);
    return(getPastOrdersByUserUid(user.uid));
  };

  const save_Order = () => {
    // const currentTime = new Date();
    // const formattedTime = currentTime.toLocaleTimeString(); // Format the time as desired
    const mergedOrder = cartItems.reduce((merged, item) => {
      const existingOrder = merged.find((orderItem) => orderItem.shopUid === item.shopUid);
      if (existingOrder) {
        existingOrder.cartItems.push({ ...item });
      } else {
        // console.log("formattedTimeformattedTimeformattedTimeformattedTimeformattedTimeformattedTime",formattedTime);
        merged.push({ shopUid: item.shopUid, orderStage: "fresh", orderOption: "TakeAway", locationToDeliver: "loc", deliveryLocation: "loc", cartItems: [{ ...item }] });
        console.log("mergedmergedmergedmergedmergedmergedmergedmergedmergedmergedmergedmergedmergedmerged",merged);
      }
      return merged;
    }, []);
    setOrder(mergedOrder);
  };
  

  const totalPrice = cartItems.reduce((total, item) => total + item.itemPrice * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        order,
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        checkout,
        totalPrice,
        getPastOrders,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
