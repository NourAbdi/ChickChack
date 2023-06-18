import React, { useContext, useState, useEffect } from "react";
import { View, Text, Button, Image, ScrollView, TouchableOpacity } from "react-native";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { styles } from "../components/cart.styles";
import { useNavigation } from "@react-navigation/native";

import { CartContext } from "../../../services/cart/cart.context";

export const CartScreen = () => {
  const { order, addToCart, removeFromCart, clearCart, checkout, totalPrice, shopLengthCheck, location2Deliver,setLocation2Deliver } = useContext(CartContext);
  const [availableOptions, setAvailableOptions] = useState([]);

  const navigation = useNavigation();


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

  const takePaymentInstrument = () => {
    return "Cash";
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
    console.log("selectedOption: ", availableOptions[0]?.selectedOption);
    if (availableOptions[0]?.selectedOption == "Delivery") {
      if(false){
        console.log("Please confirm location to deliver");
        return;
      }else{
        console.log("location2Deliver",location2Deliver);
      }
    }
    
    const paymentInstrument = takePaymentInstrument();

    // All options are selected, proceed with the checkout
    // checkout(availableOptions[0]?.selectedOption);

    console.log("checkout process finished successfully ...");
  };

  const handleLocationSelection = () => {
    navigation.navigate("CartLocationScreen");
  };

  return (
    <SafeArea>
      <View style={styles.container}>
        <Text style={styles.title}>Your Cart</Text>
        <ScrollView style={styles.scrollContainer}>
          {order.map((orderShop) => (
            <View key={orderShop.shop.shopUid}>
              <Text style={styles.shopName}>shop Name: {orderShop.shop.name}</Text>
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
          <TouchableOpacity onPress={handleLocationSelection} style={styles.locationButton}>
            <Text style={styles.locationButtonText}>Select Location</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeArea>
  );
};
