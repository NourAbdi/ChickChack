import React, { useContext, useState, useEffect } from "react";
import { View, Text, Button, Image, ScrollView, TouchableOpacity } from "react-native";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { styles } from "../components/cart.styles";

import { CartContext } from "../../../services/cart/cart.context";

export const CartScreen = () => {
  const { order, addToCart, removeFromCart, clearCart, checkout, totalPrice, shopLengthCheck } = useContext(CartContext);
  const [availableOptions, setAvailableOptions] = useState([]);

  useEffect(() => {
    getAvailableOptions();
  }, [order]);

  const getAvailableOptions = () => {
    const options = order.map((orderShop) => {
      const shop = orderShop.shop;
      const availableOptions = [];
      if (shop.takeOrder.Delivery) {
        availableOptions.push("Delivery");
      }
      if (shop.takeOrder.DineIn) {
        availableOptions.push("DineIn");
      }
      if (shop.takeOrder.TakeAway) {
        availableOptions.push("TakeAway");
      }
      return {
        shopUid: shop.shopUid,
        options: availableOptions,
        selectedOption: null,
      };
    });
    setAvailableOptions(options);
  };

  const selectOption = (shopUid, selectedOption) => {
    setAvailableOptions((prevOptions) =>
      prevOptions.map((option) => {
        if (option.shopUid === shopUid) {
          return {
            ...option,
            selectedOption: selectedOption,
          };
        }
        return option;
      })
    );
  };

  const increaseQuantity = (shop, item) => {
    addToCart(shop, item, 1);
  };

  const decreaseQuantity = (shop, item) => {
    addToCart(shop, item, -1);
  };

  const handleCheckout = () => {
    if (!shopLengthCheck()) {
      console.log("CAN'T CHECKOUT WITH ORDER FROM MULTIPLE SHOPS!");
      return;
    }
  
    console.log("selectedOption", availableOptions);
  
    // Check if any options are not selected for a shop
    for (const option of availableOptions) {
      if (!option || !option.selectedOption) {
        console.log("Please select an option for the shop");
        return;
      }
    }
  
    // All options are selected, proceed with the checkout
    console.log("Checkout process initiated", availableOptions[0]?.selectedOption);
    // Call the `checkout` function from the `CartContext` if needed
    checkout(availableOptions[0]?.selectedOption);
  };
  

  return (
    <SafeArea>
      <View style={styles.container}>
        <Text style={styles.title}>Your Cart</Text>
        <ScrollView style={styles.scrollContainer}>
          {order.map((orderShop) => (
            <View key={orderShop.shop.shopUid}>
              <Text style={styles.shopName}>Shop ID: {orderShop.shop.shopUid}</Text>
              {orderShop.cartItems.map((cartItem) => (
                <View key={cartItem.item.itemUid} style={styles.itemContainer}>
                  <Image source={{ uri: cartItem.item.itemPhoto }} style={styles.itemImage} />
                  <View style={styles.itemDetails}>
                    <Text style={styles.itemName}>{cartItem.item.itemName}</Text>
                    <View style={styles.quantityContainer}>
                      <TouchableOpacity onPress={() => decreaseQuantity(orderShop.shop, cartItem.item)}>
                        <Text style={styles.quantityButton}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.itemQuantity}>{cartItem.quantity}</Text>
                      <TouchableOpacity onPress={() => increaseQuantity(orderShop.shop, cartItem.item)}>
                        <Text style={styles.quantityButton}>+</Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => removeFromCart(orderShop.shop, cartItem.item)}>
                      <Text style={styles.removeButton}>Remove</Text>
                    </TouchableOpacity>
                    <Text style={styles.itemPrice}>Price: {cartItem.item.itemPrice}₪</Text>
                  </View>
                </View>
              ))}
              <Text style={styles.availableOptions}>Available Options:</Text>
              <View style={styles.shopOptionsContainer}>
                {availableOptions.map((option) => {
                  if (option.shopUid === orderShop.shop.shopUid) {
                    return option.options.map((opt) => (
                      <TouchableOpacity
                        key={opt}
                        onPress={() => selectOption(option.shopUid, opt)}
                        style={[
                          styles.optionButton,
                          option.selectedOption === opt ? styles.selectedOption : null,
                        ]}
                      >
                        <Text style={styles.optionText}>{opt}</Text>
                      </TouchableOpacity>
                    ));
                  }
                  return null;
                })}
              </View>
            </View>
          ))}
        </ScrollView>
        <View style={styles.totalContainer}>
          <Text style={styles.totalPrice}>Total Price: {totalPrice.toFixed(2)}₪</Text>
          <Button title="Checkout" onPress={() => handleCheckout()} />
          <Button title="Clear" onPress={clearCart} />
        </View>
      </View>
    </SafeArea>
  );
};