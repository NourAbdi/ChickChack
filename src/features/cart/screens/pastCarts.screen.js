import React, { useContext, useState, useEffect } from "react";
import { View, Text, Button, Image, ScrollView, TouchableOpacity } from "react-native";
import { SafeArea } from "../../../components/utility/safe-area.component";

import { CartContext } from "../../../services/cart/cart.context";

export const PastCartsScreen = () => {
  const { getPastOrders } = useContext(CartContext);
  const [pastOrders, setPastOrders] = useState([]);

  useEffect(() => {
    getUserPastOrders();
  }, []);

  const getUserPastOrders = async () => {
    const orders = await getPastOrders();
    setPastOrders(orders);
  };

  return (
    <SafeArea>
      <ScrollView>
        <View>
          <TouchableOpacity onPress={() => getUserPastOrders()}>
            <Text>Get Past Orders</Text>
          </TouchableOpacity>
          {pastOrders.length > 0 ? (
            pastOrders.map((order) => (
              <View key={order.orderId}>
                <Text>Order ID: {order.orderId}</Text>
                <Text>Order Total Price: {order.orderTotalPrice} ₪</Text>
                <Text>Delivery Location: {order.deliveryLocation}</Text>
                <Text>Location to Deliver: {order.locationToDeliver}</Text>
                <Text>Order Option: {order.orderOption}</Text>
                <Text>Pay Option: {order.payOption}</Text>
                <Text>Order Stage: {order.orderStage}</Text>
                <Text>Order Time: {order.orderTime}</Text>
                <Text>Preparation Time: {order.preparationTime}</Text>
                <Text>Delivery Time: {order.deliveryTime}</Text>
                <Text>Shop UID: {order.shopUid}</Text>
                <Text>User UID: {order.userUid}</Text>
                <Text>Cart Items:</Text>
                {order.cartItems.map((item) => (
                  <View key={item.item.itemUid}>
                    <Text>Item UID: {item.item.itemUid}</Text>
                    <Text>Item Name: {item.item.itemName}</Text>
                    {item.item.itemPhoto && (
                      <Image source={{ uri: item.item.itemPhoto }} style={{ width: 100, height: 100 }} />
                    )}
                    <Text>Quantity: {item.quantity}</Text>
                  </View>
                ))}
              </View>
            ))
          ) : (
            <Text>No past orders found.</Text>
          )}
        </View>
      </ScrollView>
    </SafeArea>
  );
};
