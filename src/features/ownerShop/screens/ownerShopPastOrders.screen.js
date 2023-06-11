import React, { useContext, useEffect } from 'react';
import { View, Button, FlatList, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { OwnerShopContext } from '../../../services/ownerShop/ownerShop.context';

export const OwnerShopPastOrdersScreen = ({ navigation }) => {
  const { shop, pastOrders } = useContext(OwnerShopContext);

  useEffect(() => {
    if (pastOrders) {
      console.log("pastOrders", JSON.stringify(pastOrders));
    }

  }, [pastOrders]);

  return (
    <SafeAreaView>
      <FlatList
        data={pastOrders}
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