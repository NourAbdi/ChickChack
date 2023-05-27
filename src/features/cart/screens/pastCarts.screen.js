import React, { useContext, useState, useEffect } from "react";
import { View, Text, Button, Image, ScrollView, TouchableOpacity } from "react-native";
import { SafeArea } from "../../../components/utility/safe-area.component";

import { CartContext } from "../../../services/cart/cart.context";

export const PastCartsScreen = () => {

  const { getPastOrders } = useContext(CartContext);
  const [pastOrders, setPastOrders] = useState(null);

  useEffect(() => {
    if (!pastOrders) {
      getUserPastOrders();
    } else {
      console.log("pastOrders changed:", pastOrders);
    }
  }, [pastOrders]);

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
        </View>
        {pastOrders &&
          pastOrders.map((order, index) => (
            <View key={index} style={{ marginVertical: 10 }}>
              <Text>Order ID: {order.orderId}</Text>
              <Text>User: {order.userUid}</Text>
              {/* Render other order details */}
            </View>
          ))}
      </ScrollView>
    </SafeArea>
  );
};
