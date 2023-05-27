import React, { useContext } from "react";
import { View, Text, Button, Image, ScrollView, TouchableOpacity } from "react-native";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { styles } from "../components/cart.styles";

import { CartContext } from "../../../services/cart/cart.context";
import { ShopContext } from "../../../services/shop/shop.context";

export const CartScreen = () => {
  const { cartItems, addToCart, removeFromCart, clearCart, checkout, totalPrice, save_Order } = useContext(CartContext);
  const { selectedShop, setSelectedShop, menu, isLoading } = useContext(ShopContext);

  const increaseQuantity = (item) => {
    addToCart(item, 1);
  };

  const decreaseQuantity = (item) => {
    if (item.quantity > 1) {
      addToCart(item, -1);
    }
  };

  // Group cart items by shopUid
  const groupedCartItems = cartItems.reduce((result, item) => {
    const { shopUid } = item;
    if (!result[shopUid]) {
      result[shopUid] = [];
    }
    result[shopUid].push(item);
    return result;
  }, {});

  return (
    <SafeArea>
      <View style={styles.container}>
        <Text style={styles.title}>Your Cart</Text>
        <ScrollView style={styles.scrollContainer}>
          {Object.entries(groupedCartItems).map(([shopUid, items]) => (
            <View key={shopUid}>
              <Text style={styles.shopName}>Shop ID: {shopUid}</Text>
              {items.map((item) => (
                <View key={item.itemUid} style={styles.itemContainer}>
                  <Image source={{ uri: item.itemPhoto }} style={styles.itemImage} />
                  <View style={styles.itemDetails}>
                    <Text style={styles.itemName}>{item.itemName}</Text>
                    <View style={styles.quantityContainer}>
                      <TouchableOpacity onPress={() => decreaseQuantity(item)}>
                        <Text style={styles.quantityButton}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.itemQuantity}>{item.quantity}</Text>
                      <TouchableOpacity onPress={() => increaseQuantity(item)}>
                        <Text style={styles.quantityButton}>+</Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => removeFromCart(item)}>
                      <Text style={styles.removeButton}>Remove</Text>
                    </TouchableOpacity>
                    <Text style={styles.itemPrice}>Price: {item.itemPrice}₪</Text>
                  </View>
                </View>
              ))}
            </View>
          ))}
        </ScrollView>
        <View style={styles.totalContainer}>
          <Text style={styles.totalPrice}>Total Price: {totalPrice.toFixed(2)}₪</Text>
          <Button title="Checkout" onPress={checkout} />
          <Button title="Save Order" onPress={save_Order} />
          <Button title="Clear" onPress={clearCart} />
        </View>
      </View>
    </SafeArea>
  );
};
