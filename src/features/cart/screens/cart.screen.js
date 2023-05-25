import React, { useContext, useState } from "react";
import { View, Text, Button, Image, ScrollView, TouchableOpacity } from "react-native";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { CartContext } from "../../../services/cart/cart.context";
import { styles } from "../components/cart.styles";

export const CartScreen = () => {
  const { cartItems, addToCart, removeFromCart, clearCart } = useContext(CartContext);

  const totalPrice = cartItems.reduce(
    (accumulator, item) => accumulator + parseFloat(item.price) * item.quantity,
    0
  );

  const handleCheckout = () => {
    // Implement the logic to initiate the checkout process
    // This could involve navigation to a checkout screen or API calls
  };

  const handleClearCart = () => {
    clearCart();
  };

  const incrementQuantity = (item) => {
    addToCart(item, 1); // Pass the item and quantity as 1
    console.log("quantity: ", 1);
  };

  const decrementQuantity = (item) => {
    if (item.quantity > 1) {
      removeFromCart(item); // Remove one quantity of the item
    }
  };

  const groupedCartItems = cartItems.reduce((groups, item) => {
    const shopName = item.shop?.name;
    groups[shopName] = groups[shopName] || [];
    groups[shopName].push(item);
    return groups;
  }, {});

  const [selectedOptions, setSelectedOptions] = useState({});

  const handleOptionChange = (shopName, option) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [shopName]: option,
    }));
  };

  return (
    <SafeArea>
      <View style={styles.container}>
        <Text style={styles.title}>Your Cart</Text>
        <ScrollView style={styles.scrollContainer}>
          {Object.entries(groupedCartItems).map(([shopName, items]) => {
            const shop = items[0].shop;
            const shopOptions = shop?.takeOrder;
            const { Takeaway, DineIn, Delivery } = shopOptions || {};

            return (
              <View key={shopName} style={styles.shopContainer}>
                <Text style={styles.shopName}>Shop: {shopName}</Text>
                <View style={styles.shopOptionsContainer}>
                  {Takeaway && (
                    <TouchableOpacity
                      onPress={() => handleOptionChange(shopName, "Takeaway")}
                      style={[
                        styles.optionButton,
                        selectedOptions[shopName] === "Takeaway" && styles.optionButtonHighlighted,
                      ]}
                    >
                      <Text style={styles.optionLabel}>Take Away</Text>
                    </TouchableOpacity>
                  )}
                  {DineIn && (
                    <TouchableOpacity
                      onPress={() => handleOptionChange(shopName, "DineIn")}
                      style={[
                        styles.optionButton,
                        selectedOptions[shopName] === "DineIn" && styles.optionButtonHighlighted,
                      ]}
                    >
                      <Text style={styles.optionLabel}>Dine In</Text>
                    </TouchableOpacity>
                  )}
                  {Delivery && (
                    <TouchableOpacity
                      onPress={() => handleOptionChange(shopName, "Delivery")}
                      style={[
                        styles.optionButton,
                        selectedOptions[shopName] === "Delivery" && styles.optionButtonHighlighted,
                      ]}
                    >
                      <Text style={styles.optionLabel}>Delivery</Text>
                    </TouchableOpacity>
                  )}
                </View>
                {items.map((item, index) => {
                  const { photo, name, quantity } = item;
                  return (
                    <View key={index} style={styles.itemContainer}>
                      <Image source={{ uri: photo }} style={styles.itemImage} />
                      <View style={styles.itemInfoContainer}>
                        <Text style={styles.itemName}>{name}</Text>
                        <View style={styles.quantityContainer}>
                          <Button title="-" onPress={() => decrementQuantity(item)} />
                          <Text style={styles.itemQuantity}>{quantity}</Text>
                          <Button title="+" onPress={() => incrementQuantity(item)} />
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
            );
          })}
        </ScrollView>
        <View style={styles.totalContainer}>
          <Text style={styles.totalPrice}>Total Price: {totalPrice.toFixed(2)}₪</Text>
          <Button title="Checkout" onPress={handleCheckout} />
          <Button title="Clear" onPress={handleClearCart} />
        </View>
      </View>
    </SafeArea>
  );
};
