import React, { createContext, useContext, useState } from "react";
import { saveOrder, getPastOrdersByUserUid } from "./cart.service";
import { AuthenticationContext } from "../../services/authentication/authentication.context";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const { user } = useContext(AuthenticationContext);
  const [cartItems, setCartItems] = useState([]);
  const [order, setOrder] = useState([]);

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
    setOrder([]);
  };

  const removeFromCart = (item) => {
    const updatedItems = cartItems.filter((cartItem) => cartItem.itemUid !== item.itemUid);
    setCartItems(updatedItems);
  };


  const getPastOrders = async () => {
    console.log("getPastOrdersByUserUid", user.uid);
    const pastOrders = await getPastOrdersByUserUid(user.uid);
    console.log("pastOrderspastOrderspastOrderspastOrders", pastOrders);
    return pastOrders;
  };

  const buildOrder = () => {
    return new Promise((resolve) => {
      const mergedOrder = cartItems.reduce((merged, item) => {
        const existingOrder = merged.find((orderItem) => orderItem.shopUid === item.shopUid);
        if (existingOrder) {
          existingOrder.cartItems.push({ ...item });
        } else {
          merged.push({
            shopUid: item.shopUid,
            
            cartItems: [{ ...item }],
          });
        }
        return merged;
      }, []);
      resolve(mergedOrder);
    });
  };
  
  const checkout = async () => {
    try {
      const mergedOrder = await buildOrder();
      console.log("Checkout");
      console.log("cartItems :", cartItems);
      console.log("order : ", mergedOrder);
      await saveOrder({ 
        userUid: user.uid, 
        cartItems: cartItems, 
        orderTime: new Date().toString(),
        deliveryTime: "00:15:00",
        orderStage: "fresh",
        orderOption: "TakeAway",
        orderTotalPrice: totalPrice,
        payOption: "Cash",
        locationToDeliver: "loc",
        deliveryLocation: "loc",
        shopUid: cartItems[0].shopUid
       });
      clearCart(); // Clear the cart after a successful order
    } catch (error) {
      console.log("Error saving order:", error);
    }
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
