import React, { useContext, useEffect } from 'react';
import { View, Text, Button, Image, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

import { OwnerShopContext } from '../../../services/ownerShop/ownerShop.context';

export const OwnerShopNewOrdersScreen = ({ navigation }) => {
  const { newOrders } = useContext(OwnerShopContext);

  useEffect(() => {
    if (newOrders) {
      console.log("newOrders", JSON.stringify(newOrders));
    }
  }, [newOrders]);

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          {newOrders.length > 0 ? (
            newOrders.map((order) => (
              <View key={order.orderId}>
                <Text>Order ID: {order.orderId}</Text>
                <Text>orderTotalPrice: {order.orderTotalPrice} ₪</Text>
                <Text>deliveryLocation: {order.deliveryLocation}</Text>
                <Text>locationToDeliver: {order.locationToDeliver}</Text>
                <Text>orderOption: {order.orderOption}</Text>
                <Text>payOption: {order.payOption}</Text>
                <Text>orderStage: {order.orderStage}</Text>
                <Text>orderTime: {order.orderTime}</Text>
                <Text>preparationTime: {order.preparationTime}</Text>
                <Text>deliveryTime: {order.preparationTime}</Text>
                <Text>shopUid: {order.shopUid}</Text>
                <Text>userUid: {order.userUid}</Text>
                <Text>Cart Items :</Text>
                {order.cartItems.map((item) => (
                  <View key={item.itemUid}>
                    <Text>itemUid: {item.itemUid}</Text>
                    <Text>itemName: {item.itemName}</Text>
                    {item.itemPhoto && (
                      <Image source={{ uri: item.itemPhoto }} style={{ width: 100, height: 100 }} />
                    )}
                    <Text>quantity: {item.quantity}</Text>
                    <Text>itemPrice: {item.itemPrice} ₪</Text>
                    {/* Display other item details as needed */}
                  </View>
                ))}
                <Text>--------------------------------</Text>
                {/* Display other order details as needed */}
              </View>
            ))
          ) : (
            <Text>No new orders found.</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};