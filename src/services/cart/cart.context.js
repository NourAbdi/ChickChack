import React, { createContext, useContext, useState, useEffect } from "react";
import { saveOrder, getPastOrdersByUserUid } from "./cart.service";
import { AuthenticationContext } from "../../services/authentication/authentication.context";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const { user } = useContext(AuthenticationContext);
  const [order, setOrder] = useState([]);
  const l = {latitude: "32.750073", longitude: "35.346591"};
  const [location2Deliver, setLocation2Deliver] = useState(l);

  const addToCart = (shop, item, quantity = 1,additions={}) => {
    const existingShop = order.find((orderItem) => orderItem.shop === shop);
    if (existingShop) {
      const existingItem = existingShop.cartItems.find(
        (cartItem) => cartItem.item === item && JSON.stringify(cartItem.additions) === JSON.stringify(additions) 
      );
      if (existingItem) {
        existingItem.quantity += quantity;
        if (existingItem.quantity < 1) {
          // Don't update anything if quantity is less than 1
          existingItem.quantity -= quantity;
          return;
        } else {
          setOrder([...order]);
        }
      } else {
        existingShop.cartItems.push({ item, quantity,additions });
        setOrder([...order]);
      }
    } else {
      const newShop = { shop, cartItems: [{ item, quantity,additions }] };
      setOrder([...order, newShop]);
    }
  };

  const removeFromCart = (shop, item,additions) => {
    const existingShop = order.find((orderItem) => orderItem.shop === shop);
    if (existingShop) {
      const updatedCartItems = existingShop.cartItems.filter(
        (cartItem) => cartItem.item !== item || JSON.stringify(cartItem.additions) !== JSON.stringify(additions)
      );
      if (updatedCartItems.length === 0) {
        // Remove shop if no cart items left
        const updatedOrder = order.filter((orderShop) => orderShop.shop.shopUid !== shop.shopUid);
        setOrder([...updatedOrder]);
      } else {
        existingShop.cartItems = updatedCartItems;
        setOrder([...order]);
      }
    }
  };

  const removeShopFromCart = (shopUid) => {
    const existingShop = order.find((orderItem) => orderItem.shop.shopUid === shopUid);
    if (existingShop) {
      const updatedOrder = order.filter((orderShop) => orderShop.shop.shopUid !== shopUid);
      setOrder([...updatedOrder]);
    }
  };

  const clearCart = () => {
    setOrder([]);
  };

  const shopLengthCheck = () => {
    if (order.length > 1) {
      return false;
    }
    return true;
  };

  const checkout = async (orderDeliveryOptions,shopUid) => {
    try {
      const orderSelected = order.find(item => item.shop.shopUid === shopUid);
      if (!orderSelected) {
        console.log("empty cart");
        return;
      }
      const cartItems = orderSelected.cartItems;
      await saveOrder({
        userUid: user.uid,
        cartItems,
        orderTime: new Date().toString(),
        deliveryTime: "00:15:00",
        preparationTime: orderSelected.shop.preparationTime,
        orderStage: "fresh",
        orderOption: orderDeliveryOptions,
        orderTotalPrice: calculateTotalPrice(shopUid),
        payOption: "Cash",
        locationToDeliver: location2Deliver,
        deliveryLocation: "loc",
        shopLocation: orderSelected.shop.shopLocation,
        shopUid: orderSelected.shop.shopUid,
      });
      removeShopFromCart(shopUid)
      } catch (error) {
      console.log("Error saving order:", error);
    }
  };

  const calculateTotalPrice = (shopUid) => {
    const existingShop = order.find((orderItem) => orderItem.shop.shopUid === shopUid);
    let totalPrice = 0;
    let additionsPrice =0;
    for (const cartItem of existingShop.cartItems) {
      additionsPrice =  Object.values(cartItem.additions).reduce((sum, price) => sum + price, 0);
      totalPrice += cartItem.item.itemPrice * cartItem.quantity + additionsPrice * cartItem.quantity;
    }
    return totalPrice;
  };

  return (
    <CartContext.Provider
      value={{
        order,
        getPastOrdersByUserUid,
        addToCart,
        removeFromCart,
        removeShopFromCart,
        clearCart,
        checkout,
        calculateTotalPrice,
        shopLengthCheck,
        location2Deliver,
        setLocation2Deliver,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
