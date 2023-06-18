import React, { createContext, useContext, useState, useEffect } from "react";
import { saveOrder, getPastOrdersByUserUid } from "./cart.service";
import { AuthenticationContext } from "../../services/authentication/authentication.context";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const { user } = useContext(AuthenticationContext);
  const [pastOrders, setPastOrders] = useState([]);
  const [order, setOrder] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const l = {latitude: "32.750073", longitude: "35.346591"};
  const [location2Deliver, setLocation2Deliver] = useState(l);

  useEffect(() => {
    setTotalPrice(calculateTotalPrice(order));
  }, [order]);

  const addToCart = (shop, item, quantity = 1) => {
    const existingShop = order.find((orderItem) => orderItem.shop === shop);
    if (existingShop) {
      const existingItem = existingShop.cartItems.find(
        (cartItem) => cartItem.item === item
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
        existingShop.cartItems.push({ item, quantity });
        setOrder([...order]);
      }
    } else {
      const newShop = { shop, cartItems: [{ item, quantity }] };
      setOrder([...order, newShop]);
    }
  };

  const removeFromCart = (shop, item) => {
    const existingShop = order.find((orderItem) => orderItem.shop === shop);
    if (existingShop) {
      const updatedCartItems = existingShop.cartItems.filter(
        (cartItem) => cartItem.item !== item
      );
      if (updatedCartItems.length === 0) {
        // Remove shop if no cart items left
        const updatedOrder = order.filter((orderShop) => orderShop.shop !== shop);
        setOrder([...updatedOrder]);
      } else {
        existingShop.cartItems = updatedCartItems;
        setOrder([...order]);
      }
    }
  };

  const clearCart = () => {
    setOrder([]);
  };

  useEffect(() => {
    const unsubscribe = getPastOrdersByUserUid(user.uid, setPastOrders);
    return () => {
      unsubscribe();
    };
  }, [user.uid]);

  useEffect(() => {
    if (pastOrders) {
      console.log('Updated orders:', pastOrders);
    }
  }, [pastOrders]);

  const shopLengthCheck = () => {
    if (order.length > 1) {
      return false;
    }
    return true;
  };

  const checkout = async (orderDeliveryOptions) => {
    try {

      console.log("Checkout");
      console.log("order : ", order);
      const orderSelected = order[0];
      if (!orderSelected) {
        console.log("empty cart");
        return;
      }
      console.log("orderSelected : ", orderSelected);
      const cartItems = orderSelected.cartItems;
      console.log("cartItems : ", cartItems);
      await saveOrder({
        userUid: user.uid,
        cartItems,
        orderTime: new Date().toString(),
        deliveryTime: "00:15:00",
        preparationTime: orderSelected.shop.preparationTime,
        orderStage: "fresh",
        orderOption: orderDeliveryOptions,
        orderTotalPrice: totalPrice,
        payOption: "Cash",
        locationToDeliver: location2Deliver,
        deliveryLocation: "loc",
        shopUid: orderSelected.shop.shopUid,
      });
      clearCart(); // Clear the cart after a successful order
    } catch (error) {
      console.log("Error saving order:", error);
    }
  };

  const calculateTotalPrice = (order) => {
    let totalPrice = 0;
    for (const shop of order) {
      for (const cartItem of shop.cartItems) {
        totalPrice += cartItem.item.itemPrice * cartItem.quantity;
      }
    }
    return totalPrice;
  };

  return (
    <CartContext.Provider
      value={{
        order,
        pastOrders,
        addToCart,
        removeFromCart,
        clearCart,
        checkout,
        totalPrice,
        shopLengthCheck,
        location2Deliver,
        setLocation2Deliver,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
