import React, { useContext, useEffect } from 'react';
import { View, FlatList, Text } from 'react-native';
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
      <FlatList
        data={newOrders}
        keyExtractor={(item) => item.orderUid}
        renderItem={({ item }) => (
          <View key={item.orderUid}>
            <Text>Customer Uid: {item.userUid}</Text>
            <Text>shopUid: {item.shopUid}</Text>
            <Text>locationToDeliver: {item.orderDetails[0].locationToDeliver}</Text>
            <Text>orderStage: {item.orderDetails[0].orderStage}</Text>
            <Text>orderOption: {item.orderDetails[0].orderOption}</Text>
            <Text>deliveryLocation: {item.orderDetails[0].deliveryLocation}</Text>

            {item.orderDetails[0].cartItems.map((cartItem) => (
              <View key={cartItem.itemUid}>
                <Text>--- Cart Item ---</Text>
                <Text>itemName: {cartItem.itemName}</Text>
                <Text>itemCategory: {cartItem.itemCategory}</Text>
                <Text>itemAddition: {cartItem.itemAddition}</Text>
                <Text>itemPhoto: {cartItem.itemPhoto}</Text>
                <Text>itemPrice: {cartItem.itemPrice}</Text>
                <Text>itemUid: {cartItem.itemUid}</Text>
                <Text>quantity: {cartItem.quantity}</Text>
              </View>
            ))}
          </View>
        )}
      />
    </SafeAreaView>
  );
};